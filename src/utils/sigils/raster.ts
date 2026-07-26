/**
 * Sigil rasterizer — turns a mark's raw inner SVG markup (the strings in
 * `sigil-paths.ts`) into a coverage bitmap, with no npm or native dependency.
 *
 * The sigil design law is about *rendered ink*: minimum feature width, minimum
 * void, ink coverage, silhouette distinctness. None of those can be read off the
 * path data, so the checker (`sigils:check`) and the contact sheet
 * (`sigils:sheet`) measure a raster instead. Keeping the rasterizer in-repo and
 * dependency-free keeps the CI gate cheap and platform-independent.
 *
 * Supported subset: `<path>` (all commands incl. arcs), `<circle>`, `<ellipse>`,
 * `<rect>`, `<polygon>`, `<polyline>`. Fills only — a mark that carries a
 * `stroke` is rejected by the checker before it ever gets here, because a stroke
 * is not mask-safe geometry (see the sigil law in the M10 milestone).
 */

export type Pt = readonly [number, number]

export interface Shape {
	/** Flattened closed contours in viewBox units. */
	contours: Pt[][]
	evenOdd: boolean
}

/** Coverage bitmap: `size * size` samples in 0..1, row-major. */
export interface Raster {
	size: number
	data: Float32Array
}

const NUM = /-?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g
/** Bezier flattening steps. Fixed: marks are drawn on a 32 grid, so 24 is smooth well past the sizes we measure at. */
const CURVE_STEPS = 24

function numbers(src: string): number[] {
	const out: number[] = []
	let m: RegExpExecArray | null
	NUM.lastIndex = 0
	while ((m = NUM.exec(src))) out.push(parseFloat(m[0]))
	return out
}

function attr(tag: string, name: string): string | undefined {
	const m = new RegExp(`${name}\\s*=\\s*"([^"]*)"`).exec(tag)
	return m ? m[1] : undefined
}

function num(tag: string, name: string, fallback = 0): number {
	const v = attr(tag, name)
	return v === undefined ? fallback : parseFloat(v)
}

// --- path data -------------------------------------------------------------

class ContourBuilder {
	contours: Pt[][] = []
	private current: Pt[] = []

	moveTo(x: number, y: number) {
		this.close()
		this.current = [[x, y]]
	}

	lineTo(x: number, y: number) {
		this.current.push([x, y])
	}

	cubicTo(
		x0: number,
		y0: number,
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		x3: number,
		y3: number,
	) {
		for (let i = 1; i <= CURVE_STEPS; i++) {
			const t = i / CURVE_STEPS
			const u = 1 - t
			const a = u * u * u
			const b = 3 * u * u * t
			const c = 3 * u * t * t
			const d = t * t * t
			this.current.push([
				a * x0 + b * x1 + c * x2 + d * x3,
				a * y0 + b * y1 + c * y2 + d * y3,
			])
		}
	}

	close() {
		if (this.current.length > 1) this.contours.push(this.current)
		this.current = []
	}
}

/** SVG endpoint-parameterised arc → a run of cubic segments (F.6.5 of the SVG spec). */
function arcToCubics(
	x0: number,
	y0: number,
	rxIn: number,
	ryIn: number,
	angleDeg: number,
	largeArc: boolean,
	sweep: boolean,
	x1: number,
	y1: number,
): number[][] {
	if (x0 === x1 && y0 === y1) return []
	let rx = Math.abs(rxIn)
	let ry = Math.abs(ryIn)
	if (rx === 0 || ry === 0) return [[x0, y0, x1, y1, x1, y1]]

	const phi = (angleDeg * Math.PI) / 180
	const cos = Math.cos(phi)
	const sin = Math.sin(phi)
	const dx2 = (x0 - x1) / 2
	const dy2 = (y0 - y1) / 2
	const x1p = cos * dx2 + sin * dy2
	const y1p = -sin * dx2 + cos * dy2

	const lambda = (x1p * x1p) / (rx * rx) + (y1p * y1p) / (ry * ry)
	if (lambda > 1) {
		const s = Math.sqrt(lambda)
		rx *= s
		ry *= s
	}

	const sign = largeArc === sweep ? -1 : 1
	const numerator =
		rx * rx * ry * ry - rx * rx * y1p * y1p - ry * ry * x1p * x1p
	const denom = rx * rx * y1p * y1p + ry * ry * x1p * x1p
	const coef = sign * Math.sqrt(Math.max(0, numerator / denom))
	const cxp = (coef * rx * y1p) / ry
	const cyp = (-coef * ry * x1p) / rx
	const cx = cos * cxp - sin * cyp + (x0 + x1) / 2
	const cy = sin * cxp + cos * cyp + (y0 + y1) / 2

	const angle = (ux: number, uy: number, vx: number, vy: number) => {
		const dot = ux * vx + uy * vy
		const len = Math.hypot(ux, uy) * Math.hypot(vx, vy)
		const a = Math.acos(Math.min(1, Math.max(-1, dot / len)))
		return ux * vy - uy * vx < 0 ? -a : a
	}
	const theta1 = angle(1, 0, (x1p - cxp) / rx, (y1p - cyp) / ry)
	let dTheta = angle(
		(x1p - cxp) / rx,
		(y1p - cyp) / ry,
		(-x1p - cxp) / rx,
		(-y1p - cyp) / ry,
	)
	if (!sweep && dTheta > 0) dTheta -= 2 * Math.PI
	if (sweep && dTheta < 0) dTheta += 2 * Math.PI

	const segments = Math.ceil(Math.abs(dTheta) / (Math.PI / 2))
	const delta = dTheta / segments
	const t = ((4 / 3) * Math.tan(delta / 4)) as number
	const out: number[][] = []
	let th = theta1
	let px = x0
	let py = y0
	for (let i = 0; i < segments; i++) {
		const th2 = th + delta
		const p = (a: number) => [
			cx + rx * Math.cos(a) * cos - ry * Math.sin(a) * sin,
			cy + rx * Math.cos(a) * sin + ry * Math.sin(a) * cos,
		]
		const d = (a: number) => [
			-rx * Math.sin(a) * cos - ry * Math.cos(a) * sin,
			-rx * Math.sin(a) * sin + ry * Math.cos(a) * cos,
		]
		const [ex, ey] = p(th2)
		const [d1x, d1y] = d(th)
		const [d2x, d2y] = d(th2)
		out.push([
			px + t * d1x,
			py + t * d1y,
			ex - t * d2x,
			ey - t * d2y,
			ex,
			ey,
		])
		px = ex
		py = ey
		th = th2
	}
	return out
}

/** Flatten one `d` attribute into closed contours. */
export function pathToContours(d: string): Pt[][] {
	const b = new ContourBuilder()
	const tokens = d.match(/[a-zA-Z]|-?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g)
	if (!tokens) return []

	let i = 0
	let cmd = ''
	let x = 0
	let y = 0
	let startX = 0
	let startY = 0
	let lastCx = 0
	let lastCy = 0
	let lastQx = 0
	let lastQy = 0
	let prevCmd = ''

	const next = () => parseFloat(tokens[i++])
	const flag = () => {
		// Arc flags may be packed without separators ("a1 1 0 011 1"); the
		// tokenizer splits them into a single number, so peel one digit off.
		const tok = tokens[i]
		if (tok.length > 1) {
			tokens[i] = tok.slice(1)
			return tok[0] === '1'
		}
		i++
		return tok === '1'
	}

	while (i < tokens.length) {
		if (/[a-zA-Z]/.test(tokens[i])) {
			cmd = tokens[i++]
		} else if (cmd === 'M') {
			cmd = 'L'
		} else if (cmd === 'm') {
			cmd = 'l'
		}
		const rel = cmd === cmd.toLowerCase()
		const ox = rel ? x : 0
		const oy = rel ? y : 0

		switch (cmd.toUpperCase()) {
			case 'M': {
				x = ox + next()
				y = oy + next()
				startX = x
				startY = y
				b.moveTo(x, y)
				break
			}
			case 'L': {
				x = ox + next()
				y = oy + next()
				b.lineTo(x, y)
				break
			}
			case 'H': {
				x = ox + next()
				b.lineTo(x, y)
				break
			}
			case 'V': {
				y = oy + next()
				b.lineTo(x, y)
				break
			}
			case 'C': {
				const c1x = ox + next()
				const c1y = oy + next()
				const c2x = ox + next()
				const c2y = oy + next()
				const ex = ox + next()
				const ey = oy + next()
				b.cubicTo(x, y, c1x, c1y, c2x, c2y, ex, ey)
				lastCx = c2x
				lastCy = c2y
				x = ex
				y = ey
				break
			}
			case 'S': {
				const smooth = 'CS'.includes(prevCmd.toUpperCase())
				const c1x = smooth ? 2 * x - lastCx : x
				const c1y = smooth ? 2 * y - lastCy : y
				const c2x = ox + next()
				const c2y = oy + next()
				const ex = ox + next()
				const ey = oy + next()
				b.cubicTo(x, y, c1x, c1y, c2x, c2y, ex, ey)
				lastCx = c2x
				lastCy = c2y
				x = ex
				y = ey
				break
			}
			case 'Q':
			case 'T': {
				let qx: number
				let qy: number
				if (cmd.toUpperCase() === 'Q') {
					qx = ox + next()
					qy = oy + next()
				} else {
					const smooth = 'QT'.includes(prevCmd.toUpperCase())
					qx = smooth ? 2 * x - lastQx : x
					qy = smooth ? 2 * y - lastQy : y
				}
				const ex = ox + next()
				const ey = oy + next()
				b.cubicTo(
					x,
					y,
					x + (2 / 3) * (qx - x),
					y + (2 / 3) * (qy - y),
					ex + (2 / 3) * (qx - ex),
					ey + (2 / 3) * (qy - ey),
					ex,
					ey,
				)
				lastQx = qx
				lastQy = qy
				x = ex
				y = ey
				break
			}
			case 'A': {
				const rx = next()
				const ry = next()
				const rot = next()
				const large = flag()
				const sweep = flag()
				const ex = ox + next()
				const ey = oy + next()
				for (const c of arcToCubics(x, y, rx, ry, rot, large, sweep, ex, ey)) {
					b.cubicTo(x, y, c[0], c[1], c[2], c[3], c[4], c[5])
					x = c[4]
					y = c[5]
				}
				x = ex
				y = ey
				break
			}
			case 'Z': {
				b.close()
				x = startX
				y = startY
				break
			}
			default:
				throw new Error(`unsupported path command "${cmd}"`)
		}
		prevCmd = cmd
	}
	b.close()
	return b.contours
}

function ellipseContour(cx: number, cy: number, rx: number, ry: number): Pt[] {
	const pts: Pt[] = []
	const steps = 96
	for (let i = 0; i < steps; i++) {
		const a = (i / steps) * 2 * Math.PI
		pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)])
	}
	return pts
}

/** Parse a mark's inner markup into fillable shapes. */
export function parseSigil(inner: string): Shape[] {
	const shapes: Shape[] = []
	const tags = inner.match(/<[a-z]+[^>]*\/?>/g) ?? []
	for (const tag of tags) {
		const name = /^<([a-z]+)/.exec(tag)?.[1]
		const evenOdd = attr(tag, 'fill-rule') === 'evenodd'
		switch (name) {
			case 'path': {
				const d = attr(tag, 'd')
				if (d) shapes.push({ contours: pathToContours(d), evenOdd })
				break
			}
			case 'circle':
				shapes.push({
					contours: [
						ellipseContour(
							num(tag, 'cx'),
							num(tag, 'cy'),
							num(tag, 'r'),
							num(tag, 'r'),
						),
					],
					evenOdd,
				})
				break
			case 'ellipse':
				shapes.push({
					contours: [
						ellipseContour(
							num(tag, 'cx'),
							num(tag, 'cy'),
							num(tag, 'rx'),
							num(tag, 'ry'),
						),
					],
					evenOdd,
				})
				break
			case 'rect': {
				const rx = num(tag, 'x')
				const ry = num(tag, 'y')
				const w = num(tag, 'width')
				const h = num(tag, 'height')
				shapes.push({
					contours: [
						[
							[rx, ry],
							[rx + w, ry],
							[rx + w, ry + h],
							[rx, ry + h],
						],
					],
					evenOdd,
				})
				break
			}
			case 'polygon':
			case 'polyline': {
				const n = numbers(attr(tag, 'points') ?? '')
				const pts: Pt[] = []
				for (let i = 0; i + 1 < n.length; i += 2) pts.push([n[i], n[i + 1]])
				if (pts.length > 2) shapes.push({ contours: [pts], evenOdd })
				break
			}
			default:
				throw new Error(`unsupported sigil element <${name}>`)
		}
	}
	return shapes
}

// --- scanline fill ---------------------------------------------------------

interface Edge {
	x0: number
	y0: number
	x1: number
	y1: number
	dir: number
}

function edgesOf(shape: Shape, scale: number): Edge[] {
	const edges: Edge[] = []
	for (const contour of shape.contours) {
		for (let i = 0; i < contour.length; i++) {
			const a = contour[i]
			const b = contour[(i + 1) % contour.length]
			if (a[1] === b[1]) continue
			edges.push({
				x0: a[0] * scale,
				y0: a[1] * scale,
				x1: b[0] * scale,
				y1: b[1] * scale,
				dir: b[1] > a[1] ? 1 : -1,
			})
		}
	}
	return edges
}

/**
 * Rasterize a mark's shapes at `size` px. Analytic in x, supersampled in y —
 * accurate enough that ink-coverage numbers are stable across sizes, and fast
 * enough to run the whole set through CI.
 */
export function rasterize(
	shapes: Shape[],
	size: number,
	viewBox = 32,
	subRows = 8,
): Raster {
	const data = new Float32Array(size * size)
	const scale = size / viewBox
	const weight = 1 / subRows

	for (const shape of shapes) {
		const edges = edgesOf(shape, scale)
		if (!edges.length) continue
		// Per-shape accumulation, then union into `data` — overlapping shapes
		// must not double-count coverage.
		const layer = new Float32Array(size * size)
		for (let row = 0; row < size; row++) {
			for (let sub = 0; sub < subRows; sub++) {
				const y = row + (sub + 0.5) / subRows
				const hits: { x: number; dir: number }[] = []
				for (const e of edges) {
					const yTop = Math.min(e.y0, e.y1)
					const yBot = Math.max(e.y0, e.y1)
					if (y < yTop || y >= yBot) continue
					const t = (y - e.y0) / (e.y1 - e.y0)
					hits.push({ x: e.x0 + t * (e.x1 - e.x0), dir: e.dir })
				}
				if (hits.length < 2) continue
				hits.sort((a, b) => a.x - b.x)
				let winding = 0
				for (let i = 0; i < hits.length - 1; i++) {
					winding += shape.evenOdd ? 1 : hits[i].dir
					const inside = shape.evenOdd
						? winding % 2 !== 0
						: winding !== 0
					if (!inside) continue
					addSpan(layer, size, row, hits[i].x, hits[i + 1].x, weight)
				}
			}
		}
		for (let i = 0; i < data.length; i++) {
			data[i] = Math.max(data[i], Math.min(1, layer[i]))
		}
	}
	return { size, data }
}

function addSpan(
	buf: Float32Array,
	size: number,
	row: number,
	xa: number,
	xb: number,
	weight: number,
) {
	const x0 = Math.max(0, xa)
	const x1 = Math.min(size, xb)
	if (x1 <= x0) return
	const base = row * size
	let px = Math.floor(x0)
	while (px < x1) {
		const left = Math.max(x0, px)
		const right = Math.min(x1, px + 1)
		buf[base + px] += (right - left) * weight
		px++
	}
}

/** Threshold a coverage raster into an ink mask. */
export function toMask(raster: Raster, threshold = 0.5): Uint8Array {
	const mask = new Uint8Array(raster.data.length)
	for (let i = 0; i < mask.length; i++) mask[i] = raster.data[i] >= threshold ? 1 : 0
	return mask
}

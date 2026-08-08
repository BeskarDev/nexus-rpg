/**
 * Drawing primitives for the sigils.
 *
 * Sigils are carved silhouettes: one solid `currentColor` mass per element, with
 * interior detail as real voids (even-odd) or separated subpaths. They are NOT
 * the ornament kit's "solid shape with detail carved back out in the surface
 * colour" — the navbar renders a mark through CSS `mask-image`, which resolves
 * an image source as ALPHA, so a surface-coloured overpaint is fully opaque and
 * would come back as ink. See the sigil law in the M10 milestone.
 *
 * Repeated geometry (ray fans, ribbons, star points, column rows) is generated
 * here rather than hand-authored, per ornament-craft §12: hand-typed arcs drift,
 * and parametric geometry keeps proportions honest when a size changes.
 *
 * All coordinates are in the 32-unit sigil viewBox.
 */

export type Pt = readonly [number, number]

/** Trim float noise so the generated path data stays diff-readable. */
const f = (n: number): string => {
	const r = Math.round(n * 100) / 100
	return Object.is(r, -0) ? '0' : String(r)
}

const pt = (p: Pt): string => `${f(p[0])} ${f(p[1])}`

/** Closed polygon subpath. */
export function polyD(points: Pt[]): string {
	return `M${pt(points[0])}${points
		.slice(1)
		.map((p) => `L${pt(p)}`)
		.join('')}Z`
}

/** A `<path>` element. Pass `evenOdd` when the subpaths punch voids in each other. */
export function path(d: string, evenOdd = false): string {
	return `<path${evenOdd ? ' fill-rule="evenodd"' : ''} d="${d}" />`
}

/** Axis-aligned block. */
export function boxD(x0: number, y0: number, x1: number, y1: number): string {
	return polyD([
		[x0, y0],
		[x1, y0],
		[x1, y1],
		[x0, y1],
	])
}

/** Full circle as arcs, so it can share a path (and a fill rule) with a void. */
export function circleD(cx: number, cy: number, r: number): string {
	return (
		`M${f(cx - r)} ${f(cy)}` +
		`A${f(r)} ${f(r)} 0 1 0 ${f(cx + r)} ${f(cy)}` +
		`A${f(r)} ${f(r)} 0 1 0 ${f(cx - r)} ${f(cy)}Z`
	)
}

/** Annulus: outer circle with a concentric void. Use inside an even-odd path. */
export function ringD(
	cx: number,
	cy: number,
	outer: number,
	inner: number,
): string {
	return circleD(cx, cy, outer) + circleD(cx, cy, inner)
}

/**
 * A band along part of a circle — a sundial's graduated arc, a collar. Angles in
 * degrees, clockwise from east, matching SVG's y-down axes.
 */
export function arcBandD(
	cx: number,
	cy: number,
	rOuter: number,
	rInner: number,
	startDeg: number,
	endDeg: number,
): string {
	const a0 = rad(startDeg)
	const a1 = rad(endDeg)
	const large = Math.abs(endDeg - startDeg) > 180 ? 1 : 0
	const p = (r: number, a: number): string =>
		`${f(cx + r * Math.cos(a))} ${f(cy + r * Math.sin(a))}`
	return (
		`M${p(rOuter, a0)}` +
		`A${f(rOuter)} ${f(rOuter)} 0 ${large} 1 ${p(rOuter, a1)}` +
		`L${p(rInner, a1)}` +
		`A${f(rInner)} ${f(rInner)} 0 ${large} 0 ${p(rInner, a0)}Z`
	)
}

/**
 * A leaf: a lens bounded by two circular arcs, pointed at both ends. An ellipse
 * is the wrong shape for foliage — it has no tip, so a row of them reads as a
 * string of beads rather than as growth.
 */
export function leafD(from: Pt, to: Pt, width: number): string {
	const len = Math.hypot(to[0] - from[0], to[1] - from[1])
	const sagitta = width / 2
	// Circular segment: radius from chord length and bulge depth.
	const r = (len * len) / (8 * sagitta) + sagitta / 2
	return (
		`M${pt(from)}` +
		`A${f(r)} ${f(r)} 0 0 1 ${pt(to)}` +
		`A${f(r)} ${f(r)} 0 0 1 ${pt(from)}Z`
	)
}

/** Ellipse as arcs. */
export function ellipseD(
	cx: number,
	cy: number,
	rx: number,
	ry: number,
): string {
	return (
		`M${f(cx - rx)} ${f(cy)}` +
		`A${f(rx)} ${f(ry)} 0 1 0 ${f(cx + rx)} ${f(cy)}` +
		`A${f(rx)} ${f(ry)} 0 1 0 ${f(cx - rx)} ${f(cy)}Z`
	)
}

// --- ribbons ---------------------------------------------------------------

function catmullRom(points: Pt[], samplesPerSegment: number): Pt[] {
	if (points.length < 3) return points
	const pts = [points[0], ...points, points[points.length - 1]]
	const out: Pt[] = []
	for (let i = 1; i < pts.length - 2; i++) {
		const [p0, p1, p2, p3] = [pts[i - 1], pts[i], pts[i + 1], pts[i + 2]]
		for (let s = 0; s < samplesPerSegment; s++) {
			const t = s / samplesPerSegment
			const t2 = t * t
			const t3 = t2 * t
			out.push([
				0.5 *
					(2 * p1[0] +
						(-p0[0] + p2[0]) * t +
						(2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
						(-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
				0.5 *
					(2 * p1[1] +
						(-p0[1] + p2[1]) * t +
						(2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
						(-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
			])
		}
	}
	out.push(points[points.length - 1])
	return out
}

/**
 * A solid band of given width swept along a centreline — the workhorse for
 * serpent bodies, blades, hafts, spirals and road edges. Width interpolates
 * along arc length, so `w1 < w0` gives a real taper rather than a scaled copy
 * (ornament-craft §4).
 */
export function ribbonD(
	centre: Pt[],
	w0: number,
	w1 = w0,
	samplesPerSegment = 10,
): string {
	const pts = centre.length > 2 ? catmullRom(centre, samplesPerSegment) : centre
	const lengths: number[] = [0]
	for (let i = 1; i < pts.length; i++) {
		lengths.push(
			lengths[i - 1] +
				Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]),
		)
	}
	const total = lengths[lengths.length - 1] || 1
	const left: Pt[] = []
	const right: Pt[] = []
	for (let i = 0; i < pts.length; i++) {
		const prev = pts[Math.max(0, i - 1)]
		const next = pts[Math.min(pts.length - 1, i + 1)]
		const tx = next[0] - prev[0]
		const ty = next[1] - prev[1]
		const len = Math.hypot(tx, ty) || 1
		const nx = -ty / len
		const ny = tx / len
		const half = (w0 + (w1 - w0) * (lengths[i] / total)) / 2
		left.push([pts[i][0] + nx * half, pts[i][1] + ny * half])
		right.push([pts[i][0] - nx * half, pts[i][1] - ny * half])
	}
	return polyD([...left, ...right.reverse()])
}

/**
 * A closed, smoothly rounded solid through the given hull points — hearts,
 * droplets, flames, leaf blades. The points are the silhouette itself, not a
 * centreline, so the result is one mass rather than a band.
 */
export function blobD(hull: Pt[], samplesPerSegment = 10): string {
	const n = hull.length
	const at = (i: number) => hull[((i % n) + n) % n]
	const out: Pt[] = []
	for (let i = 0; i < n; i++) {
		const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)]
		for (let s = 0; s < samplesPerSegment; s++) {
			const t = s / samplesPerSegment
			const t2 = t * t
			const t3 = t2 * t
			out.push([
				0.5 *
					(2 * p1[0] +
						(-p0[0] + p2[0]) * t +
						(2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
						(-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
				0.5 *
					(2 * p1[1] +
						(-p0[1] + p2[1]) * t +
						(2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
						(-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
			])
		}
	}
	return polyD(out)
}

/**
 * A band swept around a CLOSED centreline, as two concentric contours. Meant for
 * an even-odd path: the inner contour is the void.
 *
 * Separate from `ribbonD` because sweeping a closed loop as one polygon leaves a
 * hairline seam where the ends meet, which reads as two masses a fraction of a
 * unit apart — invisible on screen, but it is exactly the sub-minimum void the
 * design law exists to prevent.
 */
export function ribbonLoopD(
	centre: Pt[],
	width: number,
	samplesPerSegment = 10,
): string {
	const n = centre.length
	const at = (i: number) => centre[((i % n) + n) % n]
	const samples: Pt[] = []
	for (let seg = 0; seg < n; seg++) {
		const [p0, p1, p2, p3] = [at(seg - 1), at(seg), at(seg + 1), at(seg + 2)]
		for (let s = 0; s < samplesPerSegment; s++) {
			const t = s / samplesPerSegment
			const t2 = t * t
			const t3 = t2 * t
			const axis = (a: number, b: number, c: number, d: number) =>
				0.5 *
				(2 * b +
					(-a + c) * t +
					(2 * a - 5 * b + 4 * c - d) * t2 +
					(-a + 3 * b - 3 * c + d) * t3)
			samples.push([
				axis(p0[0], p1[0], p2[0], p3[0]),
				axis(p0[1], p1[1], p2[1], p3[1]),
			])
		}
	}
	const m = samples.length
	const outer: Pt[] = []
	const inner: Pt[] = []
	for (let i = 0; i < m; i++) {
		const prev = samples[(i - 1 + m) % m]
		const next = samples[(i + 1) % m]
		const tx = next[0] - prev[0]
		const ty = next[1] - prev[1]
		const len = Math.hypot(tx, ty) || 1
		const nx = (-ty / len) * (width / 2)
		const ny = (tx / len) * (width / 2)
		outer.push([samples[i][0] + nx, samples[i][1] + ny])
		inner.push([samples[i][0] - nx, samples[i][1] - ny])
	}
	return polyD(outer) + polyD(inner)
}

/** Straight tapered bar — the two-point case of a ribbon. */
export function barD(from: Pt, to: Pt, w0: number, w1 = w0): string {
	return ribbonD([from, to], w0, w1)
}

// --- radial ----------------------------------------------------------------

const rad = (deg: number) => (deg * Math.PI) / 180

/**
 * Tapered rays springing from a hub — a sun corona, a burst. Each ray is its own
 * closed triangle, so the fan unions cleanly with the disc it surrounds.
 */
export function rayFanD(
	cx: number,
	cy: number,
	rInner: number,
	rOuter: number,
	baseWidth: number,
	count: number,
	phaseDeg = 0,
): string {
	const half = Math.asin(Math.min(1, baseWidth / 2 / rInner))
	let d = ''
	for (let i = 0; i < count; i++) {
		const a = rad(phaseDeg) + (i * 2 * Math.PI) / count
		d += polyD([
			[cx + rInner * Math.cos(a - half), cy + rInner * Math.sin(a - half)],
			[cx + rOuter * Math.cos(a), cy + rOuter * Math.sin(a)],
			[cx + rInner * Math.cos(a + half), cy + rInner * Math.sin(a + half)],
		])
	}
	return d
}

/** Star polygon alternating between two radii. `concavity` < 1 hollows the flanks. */
export function starD(
	cx: number,
	cy: number,
	rOuter: number,
	rInner: number,
	points: number,
	phaseDeg = -90,
): string {
	const pts: Pt[] = []
	for (let i = 0; i < points * 2; i++) {
		const r = i % 2 === 0 ? rOuter : rInner
		const a = rad(phaseDeg) + (i * Math.PI) / points
		pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
	}
	return polyD(pts)
}

/**
 * A logarithmic-ish spiral drawn as a ribbon — the radius step per turn must
 * exceed band width + minimum void or the coils fuse into a disc.
 */
export function spiralD(
	cx: number,
	cy: number,
	rStart: number,
	rEnd: number,
	turns: number,
	width: number,
	phaseDeg = 0,
): string {
	const steps = Math.ceil(turns * 24)
	const centre: Pt[] = []
	for (let i = 0; i <= steps; i++) {
		const t = i / steps
		const a = rad(phaseDeg) + t * turns * 2 * Math.PI
		const r = rStart + (rEnd - rStart) * t
		centre.push([cx + r * Math.cos(a), cy + r * Math.sin(a)])
	}
	return ribbonD(centre, width, width, 1)
}

// --- repeated detail -------------------------------------------------------

/** A row of evenly spaced blocks — columns, teeth, tally marks. */
export function rowD(
	x0: number,
	x1: number,
	y0: number,
	y1: number,
	count: number,
	gap: number,
): string {
	const span = x1 - x0
	const w = (span - gap * (count - 1)) / count
	let d = ''
	for (let i = 0; i < count; i++) {
		const x = x0 + i * (w + gap)
		d += boxD(x, y0, x + w, y1)
	}
	return d
}

/**
 * An impressed cuneiform wedge: a triangle with a blunt head and a drawn-out
 * tail, which is what a reed stylus actually leaves.
 */
export function wedgeD(
	x: number,
	y: number,
	length: number,
	head: number,
	angleDeg = 0,
): string {
	const a = rad(angleDeg)
	const dx = Math.cos(a)
	const dy = Math.sin(a)
	const nx = -dy
	const ny = dx
	return polyD([
		[x + nx * (head / 2), y + ny * (head / 2)],
		[x + dx * length, y + dy * length],
		[x - nx * (head / 2), y - ny * (head / 2)],
	])
}

/**
 * Sigil checker (M10 S6) — `bun run sigils:check`, run in CI.
 *
 * Enforces the mechanical half of the sigil design law. Four rule classes:
 *
 *   markup      mask-safety and vocabulary: fills only, `currentColor` only,
 *               no `rx`, no round linecaps. A stroke or a surface-coloured
 *               overpaint is illegal because the navbar renders marks through
 *               `mask-image`, which resolves alpha, not luminance — an opaque
 *               "carve" becomes ink and the mark turns into a blob.
 *   geometry    min ink feature, min void, ink coverage, cap box — all measured
 *               on a raster, because the law is about ink at a rendered size.
 *   silhouette  pairwise distance between 8×8 coverage signatures at 14px:
 *               the only mechanical guard on "distinguishable when tiny".
 *   mapping     every PAGE_SIGIL / CHAPTER_SIGIL key resolves to a real doc, and
 *               every mark referenced anywhere exists in SIGIL_INNER.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import {
	SIGIL_INNER,
	SIGIL_VIEWBOX,
	SigilName,
} from '../../components/codex/sigil-paths'
import { CHAPTER_SIGIL, PAGE_SIGIL } from '../../components/codex/page-sigils'
import {
	CAP_BOX,
	CAP_BOX_SLACK,
	INK_COVERAGE_MAX,
	INK_COVERAGE_MIN,
	MIN_INK_FEATURE,
	MIN_SILHOUETTE_DISTANCE,
	MIN_VOID,
	REFERENCE_SIZE,
} from './constants'
import { parseSigil, rasterize, Shape, toMask } from './raster'
import {
	Component,
	components,
	coverage,
	difference,
	erode,
	dilate,
	Grid,
	inkBounds,
	open,
	signature,
	signatureDistance,
} from './metrics'

const ROOT = resolve(import.meta.dirname, '../../..')
const DOCS = resolve(ROOT, 'docs')

/**
 * Measurement resolution. High enough that a 2.5-unit feature is 20px wide, so
 * the morphology thresholds are not themselves quantisation-limited.
 */
const RES = 256
const UNIT = RES / SIGIL_VIEWBOX

/**
 * A tapered terminal (a blade point, a horn tip) legitimately disappears under
 * an opening — that is what a point is. So the min-feature rule fails on the
 * SIZE of what the opening removed, not on the fact that it removed something:
 * a point sheds a small triangle, a too-thin limb sheds a long ribbon.
 */
const MAX_LOST_BLOB_UNITS2 = 6

interface Failure {
	mark: string
	rule: string
	detail: string
}

const failures: Failure[] = []
function fail(mark: string, rule: string, detail: string) {
	failures.push({ mark, rule, detail })
}

// --- markup ----------------------------------------------------------------

function checkMarkup(name: string, inner: string) {
	if (/\bstroke\s*=/.test(inner)) {
		fail(
			name,
			'markup/no-stroke',
			'carries a stroke — sigils are solid fills; a stroke is not mask-safe geometry',
		)
	}
	if (/\brx\s*=|\bry\s*=/.test(inner)) {
		fail(name, 'markup/no-rounding', 'uses rx/ry — carved stone has vertices')
	}
	if (/linecap\s*=\s*"round"/.test(inner)) {
		fail(name, 'markup/no-round-caps', 'uses a round linecap on a terminal')
	}
	for (const m of inner.matchAll(/\bfill\s*=\s*"([^"]*)"/g)) {
		if (m[1] !== 'currentColor') {
			fail(
				name,
				'markup/currentcolor-only',
				`fill="${m[1]}" — a non-currentColor fill is opaque in a mask, so it becomes ink instead of a carve`,
			)
		}
	}
	if (/var\(--/.test(inner)) {
		fail(
			name,
			'markup/currentcolor-only',
			'references a CSS variable — surface-coloured overpaint is illegal for sigils (see the mask constraint)',
		)
	}
}

// --- geometry --------------------------------------------------------------

function checkGeometry(name: string, shapes: Shape[]) {
	const raster = rasterize(shapes, RES, SIGIL_VIEWBOX)
	const grid: Grid = { size: RES, mask: toMask(raster) }

	const ink = coverage(grid)
	if (ink < INK_COVERAGE_MIN || ink > INK_COVERAGE_MAX) {
		fail(
			name,
			'geometry/ink-coverage',
			`${(ink * 100).toFixed(1)}% ink, outside ${INK_COVERAGE_MIN * 100}–${INK_COVERAGE_MAX * 100}%`,
		)
	}

	const bounds = inkBounds(grid)
	if (!bounds) {
		fail(name, 'geometry/empty', 'no ink')
		return
	}
	const limit = CAP_BOX + CAP_BOX_SLACK
	const w = (bounds.x1 - bounds.x0) / UNIT
	const h = (bounds.y1 - bounds.y0) / UNIT
	if (w > limit || h > limit) {
		fail(
			name,
			'geometry/cap-box',
			`ink is ${w.toFixed(1)}×${h.toFixed(1)} units, over the ${limit}-unit cap box`,
		)
	}

	// Min ink feature: what an opening at half the minimum width removes.
	const opened = open(grid, (MIN_INK_FEATURE / 2) * UNIT)
	const lost = difference(grid, opened)
	const worst = components(lost).sort((a, b) => b.area - a.area)[0]
	if (worst && worst.area / (UNIT * UNIT) > MAX_LOST_BLOB_UNITS2) {
		const at = worst.pixels[0]
		fail(
			name,
			'geometry/min-ink-feature',
			`a feature thinner than ${MIN_INK_FEATURE} units near (${(
				(at % RES) /
				UNIT
			).toFixed(1)}, ${(Math.floor(at / RES) / UNIT).toFixed(
				1,
			)}) — ${(worst.area / (UNIT * UNIT)).toFixed(1)} sq units of ink is sub-minimum`,
		)
	}

	// Min gap between separate masses: a dilation that merges components means
	// the two masses sat closer than the minimum void.
	const masses = components(grid)
	const after = components(dilate(grid, (MIN_VOID / 2) * UNIT)).length
	if (after < masses.length) {
		fail(
			name,
			'geometry/min-void',
			`${masses.length - after} pair(s) of separate masses sit closer than ${MIN_VOID} units apart — closest: ${closestPair(masses)}`,
		)
	}

	// Enclosed holes must survive an opening at the minimum void too.
	const background: Grid = {
		size: RES,
		mask: grid.mask.map((v) => (v ? 0 : 1)) as Uint8Array,
	}
	const holes = components(background).filter((c) => !c.touchesBorder)
	for (const hole of holes) {
		const holeGrid: Grid = { size: RES, mask: new Uint8Array(grid.mask.length) }
		for (const p of hole.pixels) holeGrid.mask[p] = 1
		const survived = erode(holeGrid, (MIN_VOID / 2) * UNIT)
		if (!survived.mask.some((v) => v)) {
			const box = inkBounds(holeGrid)
			fail(
				name,
				'geometry/min-void',
				`an enclosed void is narrower than ${MIN_VOID} units — it will fill in and read as mud` +
					(box
						? ` (${((box.x1 - box.x0) / UNIT).toFixed(1)}×${(
								(box.y1 - box.y0) /
								UNIT
							).toFixed(1)} units at ${(box.x0 / UNIT).toFixed(1)}, ${(
								box.y0 / UNIT
							).toFixed(1)})`
						: ''),
			)
			break
		}
	}
}

/**
 * Name the two masses that sit closest, so a failure points at geometry instead
 * of just asserting that something is too tight. Sampled, because the exact
 * pairwise minimum over every boundary pixel is quadratic and this runs per mark.
 */
function closestPair(masses: Component[]): string {
	let best = Infinity
	let where = ''
	const sample = (c: Component) =>
		c.pixels.filter(
			(_, i) => i % Math.max(1, Math.floor(c.pixels.length / 400)) === 0,
		)
	for (let i = 0; i < masses.length; i++) {
		for (let j = i + 1; j < masses.length; j++) {
			for (const a of sample(masses[i])) {
				const ax = a % RES
				const ay = (a - ax) / RES
				for (const b of sample(masses[j])) {
					const bx = b % RES
					const by = (b - bx) / RES
					const d = Math.hypot(ax - bx, ay - by) / UNIT
					if (d < best) {
						best = d
						where = `(${(ax / UNIT).toFixed(1)}, ${(ay / UNIT).toFixed(1)}) to (${(
							bx / UNIT
						).toFixed(1)}, ${(by / UNIT).toFixed(1)})`
					}
				}
			}
		}
	}
	return `${best.toFixed(1)} units, ${where}`
}

// --- silhouette ------------------------------------------------------------

function checkSilhouettes(parsed: Map<SigilName, Shape[]>) {
	const names = [...parsed.keys()]
	const sigs = new Map<string, Float64Array>()
	for (const name of names) {
		const raster = rasterize(
			parsed.get(name) as Shape[],
			REFERENCE_SIZE * 4,
			SIGIL_VIEWBOX,
		)
		sigs.set(name, signature(raster.data, REFERENCE_SIZE * 4))
	}
	for (let i = 0; i < names.length; i++) {
		for (let j = i + 1; j < names.length; j++) {
			const d = signatureDistance(
				sigs.get(names[i]) as Float64Array,
				sigs.get(names[j]) as Float64Array,
			)
			if (d < MIN_SILHOUETTE_DISTANCE) {
				fail(
					names[i],
					'silhouette/collision',
					`too close to "${names[j]}" at ${REFERENCE_SIZE}px (distance ${d.toFixed(3)} < ${MIN_SILHOUETTE_DISTANCE})`,
				)
			}
		}
	}
}

// --- mapping ---------------------------------------------------------------

/** Every doc id in `docs/`, normalized the way page-sigils.ts normalizes keys. */
function docIds(): Set<string> {
	const ids = new Set<string>()
	const walk = (dir: string, prefix: string[]) => {
		for (const entry of readdirSync(dir)) {
			const full = resolve(dir, entry)
			if (statSync(full).isDirectory()) {
				walk(full, [...prefix, entry.replace(/^\d+-/, '')])
				ids.add([...prefix, entry.replace(/^\d+-/, '')].join('/'))
			} else if (/\.mdx?$/.test(entry)) {
				const base = entry.replace(/\.mdx?$/, '').replace(/^\d+-/, '')
				const id = [...prefix, base].join('/')
				ids.add(id.replace(/\/(index|overview)$/, ''))
			}
		}
	}
	walk(DOCS, [])
	return ids
}

function checkMapping() {
	const ids = docIds()
	for (const [key, mark] of Object.entries(PAGE_SIGIL)) {
		if (!ids.has(key)) {
			fail(mark, 'mapping/dead-key', `PAGE_SIGIL key "${key}" matches no doc`)
		}
		if (!(mark in SIGIL_INNER)) {
			fail(mark, 'mapping/unknown-mark', `PAGE_SIGIL["${key}"] is not a mark`)
		}
	}
	const chapterDirs = readdirSync(DOCS).filter((e) =>
		statSync(resolve(DOCS, e)).isDirectory(),
	)
	for (const [dir, mark] of Object.entries(CHAPTER_SIGIL)) {
		if (!chapterDirs.includes(dir)) {
			fail(
				mark,
				'mapping/dead-key',
				`CHAPTER_SIGIL key "${dir}" is not a chapter directory`,
			)
		}
		if (!(mark in SIGIL_INNER)) {
			fail(
				mark,
				'mapping/unknown-mark',
				`CHAPTER_SIGIL["${dir}"] is not a mark`,
			)
		}
	}
	const used = new Set<string>([
		...Object.values(PAGE_SIGIL),
		...Object.values(CHAPTER_SIGIL),
	])
	const cssSource = readFileSync(resolve(ROOT, 'src/css/custom.css'), 'utf8')
	const source = [
		readFileSync(resolve(ROOT, 'docusaurus.config.js'), 'utf8'),
		cssSource,
	].join('\n')
	for (const name of Object.keys(SIGIL_INNER)) {
		if (used.has(name)) continue
		if (source.includes(`sigil--${name}`)) continue
		if (isReferencedInComponents(name)) continue
		fail(name, 'mapping/orphan', 'mark is defined but never assigned')
	}
}

/** Marks used directly by a component (admonition types, creature traits, cards). */
let componentSources: string | undefined
function isReferencedInComponents(name: string): boolean {
	if (componentSources === undefined) {
		const files: string[] = []
		const walk = (dir: string) => {
			for (const entry of readdirSync(dir)) {
				const full = resolve(dir, entry)
				if (statSync(full).isDirectory()) walk(full)
				else if (/\.tsx?$/.test(entry) && !full.includes('sigil-paths'))
					files.push(readFileSync(full, 'utf8'))
			}
		}
		walk(resolve(ROOT, 'src/components'))
		walk(resolve(ROOT, 'src/theme'))
		walk(resolve(ROOT, 'src/pages'))
		componentSources = files.join('\n')
	}
	return new RegExp(`['"\`]${name}['"\`]`).test(componentSources)
}

// --- run -------------------------------------------------------------------

function main() {
	const names = Object.keys(SIGIL_INNER) as SigilName[]
	// Parse first, and drop anything unparseable from the later passes: a broken
	// mark should be reported by name alongside every other failure, not crash the
	// run with a stack trace halfway through.
	const parsed = new Map<SigilName, Shape[]>()
	for (const name of names) {
		const inner = SIGIL_INNER[name]
		checkMarkup(name, inner)
		try {
			parsed.set(name, parseSigil(inner))
		} catch (error) {
			fail(name, 'geometry/unparseable', (error as Error).message)
		}
	}
	for (const [name, shapes] of parsed) {
		try {
			checkGeometry(name, shapes)
		} catch (error) {
			fail(name, 'geometry/unparseable', (error as Error).message)
		}
	}
	checkSilhouettes(parsed)
	checkMapping()

	if (!failures.length) {
		console.log(`sigils:check — ${names.length} marks, all rules pass`)
		return
	}
	const byRule = new Map<string, Failure[]>()
	for (const f of failures) {
		byRule.set(f.rule, [...(byRule.get(f.rule) ?? []), f])
	}
	console.error(`sigils:check — ${failures.length} failure(s)\n`)
	for (const [rule, list] of [...byRule].sort()) {
		console.error(`  ${rule}`)
		for (const f of list) console.error(`    ${f.mark}: ${f.detail}`)
	}
	process.exit(1)
}

if (import.meta.main) main()

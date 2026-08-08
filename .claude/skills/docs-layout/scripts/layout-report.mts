/**
 * What the auto-columns plugin decided, and why.
 *
 * Run:
 *   node --experimental-strip-types .claude/skills/docs-layout/scripts/layout-report.mts
 *   node --experimental-strip-types .claude/skills/docs-layout/scripts/layout-report.mts docs/05-combat
 *   node --experimental-strip-types .claude/skills/docs-layout/scripts/layout-report.mts --worst 30
 *
 * NOT `bun`. Bun 1.2.x cannot resolve `unist-util-visit-parents/do-not-use-color`,
 * a subpath in remark's dependency tree; Node handles it. This is also why the
 * plugin imports `unist` with `import type`, so Node's stripper can load it.
 *
 * The report reuses the plugin's OWN exported functions rather than restating
 * its rules, so it cannot drift from what a build actually produces. What it
 * cannot see is the two transforms Docusaurus applies first — images become JSX
 * and the h1 becomes a `header` element — so a page whose layout depends on
 * those will read slightly differently here than in `build/`. Treat this as
 * triage; confirm anything surprising against a real build.
 */
import { readdirSync, statSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import {
	estimateLines,
	toSections,
	splitTallSections,
	packSections,
	spreadItems,
	shouldColumnise,
	type AutoColumnsOptions,
} from '../../../../src/remark/auto-columns-plugin/auto-columns-plugin.ts'

/** Mirrors the plugin's own defaults; override on the command line if tuning. */
const OPTIONS = {
	enabled: true,
	breakDepth: 1,
	charsPerLine: 65,
	minLines: 12,
	maxColumnLines: 72,
	minChildren: 2,
	maxDominance: 0.82,
	minSectionLines: 9,
	excludePaths: ['/analysis/', '\\analysis\\'],
} satisfies Required<AutoColumnsOptions>

const argv = process.argv.slice(2)
const worstFlag = argv.indexOf('--worst')
const worstCount = worstFlag >= 0 ? Number(argv[worstFlag + 1] ?? 20) : 0
// Guard the index check on the flag being PRESENT: with no `--worst`, `worstFlag`
// is -1 and `worstFlag + 1` is 0, which silently swallowed the path argument.
const roots = argv.filter(
	(a, i) => !a.startsWith('--') && !(worstFlag >= 0 && i === worstFlag + 1),
)
const ROOT = roots[0] ?? 'docs'

function walk(dir: string, out: string[] = []): string[] {
	for (const entry of readdirSync(dir)) {
		const full = join(dir, entry)
		if (statSync(full).isDirectory()) walk(full, out)
		else if (/\.mdx?$/.test(full)) out.push(full)
	}
	return out
}

/** The same node types the plugin treats as run-enders, minus what only exists post-MDX. */
function isBreaker(node: any): boolean {
	if (node?.type === 'heading' && node.depth <= OPTIONS.breakDepth) return true
	if (node?.type === 'mdxJsxFlowElement')
		return node.name === 'Columns' || node.name === 'header'
	if (node?.type === 'html' && /^<Columns[\s>]/.test(String(node.value ?? '')))
		return true
	if (
		node?.type === 'paragraph' &&
		node.children?.length === 1 &&
		node.children[0]?.type === 'image' &&
		String(node.children[0].alt ?? '').startsWith('banner-img')
	) {
		return true
	}
	return (
		node?.type === 'thematicBreak' ||
		node?.type === 'yaml' ||
		node?.type === 'mdxjsEsm'
	)
}

/** Why a packed spread was refused. Mirrors `shouldColumnise`'s order. */
function refusal(spread: any[]): string | undefined {
	const items = spreadItems(spread as any, OPTIONS)
	if (items.length < Math.max(2, OPTIONS.minChildren)) return 'too-few-boxes'
	// A floated portrait (`folk-img`) cannot live in a 32rem track.
	const floated = spread.some((s: any) =>
		s.nodes.some(
			(n: any) =>
				n?.type === 'paragraph' &&
				n.children?.length === 1 &&
				n.children[0]?.type === 'image' &&
				!String(n.children[0].alt ?? '').startsWith('banner-img'),
		),
	)
	if (floated) return 'floated-plate'
	const total = spread.reduce((sum, s) => sum + s.lines, 0)
	if (total < OPTIONS.minLines) return 'too-short'
	const lines = items.map((n: any) => estimateLines(n, OPTIONS.charsPerLine))
	const tallest = Math.max(...lines)
	if (tallest > OPTIONS.maxColumnLines) return 'box-taller-than-column'
	const sum = lines.reduce((a: number, b: number) => a + b, 0)
	if (tallest > sum * OPTIONS.maxDominance) return 'one-box-dominates'
	return undefined
}

type PageReport = {
	file: string
	spreads: number
	refused: { why: string; lines: number; boxes: number }[]
	tallestBox: number
}

const reports: PageReport[] = []

for (const file of walk(ROOT)) {
	if (OPTIONS.excludePaths.some((p) => file.includes(p.replace(/\\/g, '/'))))
		continue
	const tree: any = unified()
		.use(remarkParse)
		.use(remarkFrontmatter)
		.use(remarkGfm)
		.parse(readFileSync(file, 'utf8'))

	const report: PageReport = { file, spreads: 0, refused: [], tallestBox: 0 }
	let run: any[] = []

	const flush = () => {
		if (!run.length) return
		const sections = splitTallSections(toSections(run, OPTIONS), OPTIONS)
		for (const spread of packSections(sections, OPTIONS)) {
			const items = spreadItems(spread as any, OPTIONS)
			const lines = items.map((n: any) =>
				estimateLines(n, OPTIONS.charsPerLine),
			)
			report.tallestBox = Math.max(report.tallestBox, ...lines)
			if (shouldColumnise(spread as any, OPTIONS)) report.spreads++
			else {
				report.refused.push({
					why: refusal(spread as any) ?? 'unknown',
					lines: Math.round(spread.reduce((s, x) => s + x.lines, 0)),
					boxes: items.length,
				})
			}
		}
		run = []
	}

	for (const node of tree.children ?? []) {
		if (isBreaker(node)) flush()
		else run.push(node)
	}
	flush()
	reports.push(report)
}

const totals: Record<string, number> = {}
for (const r of reports)
	for (const x of r.refused) totals[x.why] = (totals[x.why] ?? 0) + 1

const spreadPages = reports.filter((r) => r.spreads > 0).length
const flatPages = reports.filter((r) => r.spreads === 0)

console.log(`\nauto-columns layout report — ${ROOT}`)
console.log('='.repeat(64))
console.log(`pages scanned      ${reports.length}`)
console.log(`pages with spreads ${spreadPages}`)
console.log(`pages fully flat   ${flatPages.length}`)
console.log(`total spreads      ${reports.reduce((s, r) => s + r.spreads, 0)}`)
console.log(`\nrefused runs by reason:`)
for (const [why, n] of Object.entries(totals).sort((a, b) => b[1] - a[1]))
	console.log(`  ${why.padEnd(24)} ${n}`)

console.log(`\npages with NO spread at all (${flatPages.length}):`)
for (const r of flatPages.slice(0, worstCount || 25)) {
	const why = r.refused.map((x) => `${x.why}(${x.lines}L)`).join(' ')
	console.log(`  ${r.file}\n      ${why || '<no runs — all breakers?>'}`)
}

if (worstCount) {
	console.log(`\nboxes closest to the ${OPTIONS.maxColumnLines}-line column limit:`)
	for (const r of [...reports]
		.sort((a, b) => b.tallestBox - a.tallestBox)
		.slice(0, worstCount)) {
		console.log(`  ${String(Math.round(r.tallestBox)).padStart(4)}  ${r.file}`)
	}
}
console.log('')

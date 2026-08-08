/**
 * content:gen (combat arts) — generate the Basic/Supreme combat art pages from
 * the frozen app JSON (`src/utils/data/json/combat-arts.json`), rendered through
 * `CombatArtCard` (README § game content architecture, M6). Canonical edits
 * happen in the JSON; this MDX is generated, committed, and never hand-edited
 * (staleness check guards it). Mirrors generate-spells.ts.
 *
 * Usage:
 *   bun src/utils/content-gen/generate-combat-arts.ts           regenerate
 *   bun src/utils/content-gen/generate-combat-arts.ts --check   staleness gate
 */
import fs from 'fs'
import path from 'path'
import {
	parseSpellEffect,
	normalizePlaceholder,
	type EffectNode,
} from './spell-effect-parser'

const REPO = path.resolve(__dirname, '../../..')
const JSON_FILE = path.join(REPO, 'src/utils/data/json/combat-arts.json')
const DOC_DIR = path.join(REPO, 'docs/05-combat/05-combat-arts')

const BANNER =
	'{/* GENERATED from src/utils/data/json/combat-arts.json by `bun run content:gen` — do not edit. Edit the JSON and regenerate. */}'

/** Categories in sidebar order. Each becomes one page. */
const CATEGORIES: { name: string; sidebarPosition: number }[] = [
	{ name: 'Basic', sidebarPosition: 1 },
	{ name: 'Supreme', sidebarPosition: 2 },
]

interface CombatArtRecord {
	name: string
	category: string
	weapons: string
	effect: string
}

function fail(context: string, reason: string): never {
	throw new Error(`[generate-combat-arts] ${context}: ${reason}`)
}

const KNOWN_CATEGORIES = new Set(CATEGORIES.map((c) => c.name))

function validateCombatArt(entry: unknown, context: string): CombatArtRecord {
	if (typeof entry !== 'object' || entry === null)
		fail(context, 'entry is not an object')
	const e = entry as Record<string, unknown>
	for (const field of ['name', 'category', 'weapons', 'effect'] as const) {
		if (typeof e[field] !== 'string')
			fail(context, `field "${field}" must be a string`)
		if ((e[field] as string).trim() === '')
			fail(context, `field "${field}" is empty`)
	}
	// An unknown category would silently drop the art from every page.
	if (!KNOWN_CATEGORIES.has(e.category as string))
		fail(
			context,
			`unknown category "${e.category}" (expected one of ${[...KNOWN_CATEGORIES].join(', ')})`,
		)
	return entry as CombatArtRecord
}

/** MDX-safe double-quoted attribute value. */
function attr(value: string): string {
	return JSON.stringify(normalizePlaceholder(value).replace(/\s+/g, ' ').trim())
}

function renderNodes(nodes: EffectNode[]): string {
	// Each node is its own block, blank-line separated, so markdown parses inside
	// the JSX card and keyword auto-links resolve.
	return nodes
		.map((n) =>
			n.kind === 'prose'
				? n.text
				: `<SuccessLevel level="${n.level}">${n.text}</SuccessLevel>`,
		)
		.join('\n\n')
}

function renderArt(art: CombatArtRecord): string {
	// Combat arts allow partial success runs: the prose above a run is the base
	// case that lands on any hit, and the tiers only add to it (see Deep Cut).
	const parsed = parseSpellEffect(art.effect, art.name, {
		allowPartialRuns: true,
	})
	return [
		`<CombatArtCard weapons=${attr(art.weapons)}>`,
		'',
		`### ${art.name}`,
		'',
		renderNodes(parsed.nodes),
		'',
		'</CombatArtCard>',
	].join('\n')
}

function renderPage(
	category: string,
	sidebarPosition: number,
	arts: CombatArtRecord[],
): string {
	const fm = [
		'---',
		`sidebar_position: ${sidebarPosition}`,
		'toc_max_heading_level: 3',
		'---',
	]
	// The h1 must immediately follow the frontmatter or Docusaurus's content-title
	// extraction fails and the sidebar label falls back to the lowercase doc id.
	const blocks = [
		fm.join('\n'),
		`# ${category}`,
		BANNER,
		...arts.map(renderArt),
	]
	return blocks.join('\n\n') + '\n'
}

function main() {
	const check = process.argv.slice(2).includes('--check')
	const entries: unknown[] = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'))
	const arts = entries.map((raw, i) =>
		validateCombatArt(raw, `combat-arts.json[${i}]`),
	)

	let stale = 0
	for (const { name, sidebarPosition } of CATEGORIES) {
		const outFile = path.join(DOC_DIR, `${name.toLowerCase()}.mdx`)
		const legacy = path.join(DOC_DIR, `${name.toLowerCase()}.md`)
		const inCategory = arts.filter((a) => a.category === name)
		const content = renderPage(name, sidebarPosition, inCategory)

		if (check) {
			const current = fs.existsSync(outFile)
				? fs.readFileSync(outFile, 'utf-8')
				: null
			if (current !== content) {
				stale++
				console.error(`STALE: ${path.relative(REPO, outFile)}`)
			}
			continue
		}

		fs.writeFileSync(outFile, content)
		// Retire the hand-written .md once the .mdx is generated.
		if (fs.existsSync(legacy)) fs.rmSync(legacy)
		console.log(
			`wrote ${path.relative(REPO, outFile)} (${inCategory.length} combat arts)`,
		)
	}

	if (check) {
		if (stale > 0) {
			console.error(
				`\ncontent:gen --check found ${stale} stale combat art page(s). Run \`bun run content:gen\` and commit.`,
			)
			process.exit(1)
		}
		console.log('content:gen --check: combat art pages up to date.')
	}
}

main()

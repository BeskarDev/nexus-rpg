/**
 * content:gen — generate spell discipline/tradition MDX pages from the frozen
 * app JSON (README § game content architecture, M6). Canonical edits happen in
 * `src/utils/data/json/*-spells.json`; these MDX files are generated, committed,
 * and never hand-edited (a staleness check guards that in Step 4).
 *
 * Usage:
 *   bun run content:gen              regenerate every spell page
 *   bun run content:gen evocation    regenerate only matching discipline/tradition files
 *   bun run content:gen --check      generate to memory and diff against disk (staleness gate)
 */
import fs from 'fs'
import path from 'path'
import {
	parseSpellEffect,
	validateSpellRecord,
	normalizePlaceholder,
	htmlToMarkdownBlocks,
	type EffectNode,
	type SpellRecord,
} from './spell-effect-parser'

const REPO = path.resolve(__dirname, '../../..')
const JSON_DIR = path.join(REPO, 'src/utils/data/json')

interface Source {
	json: string
	docDir: string
	catKey: 'discipline' | 'tradition'
}

const SOURCES: Source[] = [
	{
		json: 'arcane-spells.json',
		docDir: 'docs/07-magic/02-arcane-spells',
		catKey: 'discipline',
	},
	{
		json: 'mystic-spells.json',
		docDir: 'docs/07-magic/04-mystic-spells',
		catKey: 'tradition',
	},
]

// MDX uses {/* */} comments — HTML <!-- --> is a parse error in .mdx.
const BANNER =
	'{/* GENERATED from src/utils/data/json by `bun run content:gen` — do not edit. Edit the JSON and regenerate. */}'

/** Read `sidebar_position` from an existing page so the sidebar order is kept. */
function readSidebarPosition(file: string): number | null {
	if (!fs.existsSync(file)) return null
	const m = fs.readFileSync(file, 'utf-8').match(/^---\n([\s\S]*?)\n---/)
	if (!m) return null
	const pm = m[1].match(/sidebar_position:\s*(\d+)/)
	return pm ? Number(pm[1]) : null
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

function renderSpell(spell: SpellRecord): string {
	const parsed = parseSpellEffect(spell.effect, spell.name)
	const properties = normalizePlaceholder(spell.properties)
	const heightened = normalizePlaceholder(spell.heightened)

	const openTag =
		`<SpellCodexCard rank={${Number(spell.rank)}} focus={${Number(spell.focus)}} ` +
		`target=${attr(spell.target)} range=${attr(spell.range)}` +
		(properties ? ` properties=${attr(properties)}` : '') +
		'>'

	const parts = [openTag, '', `### ${spell.name}`, '', renderNodes(parsed.nodes)]
	if (heightened) {
		const hMd = htmlToMarkdownBlocks(spell.heightened, `${spell.name} (heightened)`)
			// A leading "(Rank N)" label becomes a rank cartouche chip.
			.split('\n\n')
			.map((line) =>
				line.replace(
					/^\*\*\(Rank (\d+)\)\*\*\s*/,
					(_m, n) => `<RankChip rank={${n}} compact /> `,
				),
			)
			.join('\n\n')
		parts.push('', '<SpellHeightened>', '', hMd, '', '</SpellHeightened>')
	}
	parts.push('', '</SpellCodexCard>')
	return parts.join('\n')
}

function renderPage(category: string, spells: SpellRecord[], sidebarPos: number | null): string {
	const byRank = new Map<number, SpellRecord[]>()
	for (const s of spells) {
		const r = Number(s.rank)
		if (!byRank.has(r)) byRank.set(r, [])
		byRank.get(r)!.push(s)
	}
	const ranks = [...byRank.keys()].sort((a, b) => a - b)

	const fm = ['---']
	if (sidebarPos !== null) fm.push(`sidebar_position: ${sidebarPos}`)
	fm.push('toc_max_heading_level: 2', '---')

	// The h1 must immediately follow the frontmatter or Docusaurus's content-title
	// extraction fails and the sidebar/label falls back to the lowercase doc id.
	// Banner goes just after the title.
	const blocks = [fm.join('\n'), `# ${category}`, BANNER]
	for (const rank of ranks) {
		blocks.push(`## Rank ${rank}`)
		for (const s of byRank.get(rank)!) blocks.push(renderSpell(s))
	}
	return blocks.join('\n\n') + '\n'
}

function categoryToFile(docDir: string, category: string): string {
	// Discipline/tradition file names are the lowercased category (evocation.md).
	return path.join(REPO, docDir, `${category.toLowerCase()}.mdx`)
}

function legacyMdFile(docDir: string, category: string): string {
	return path.join(REPO, docDir, `${category.toLowerCase()}.md`)
}

function main() {
	const args = process.argv.slice(2)
	const check = args.includes('--check')
	const filters = args.filter((a) => !a.startsWith('--')).map((a) => a.toLowerCase())

	let written = 0
	let stale = 0
	for (const src of SOURCES) {
		const entries: unknown[] = JSON.parse(
			fs.readFileSync(path.join(JSON_DIR, src.json), 'utf-8'),
		)
		const byCat = new Map<string, SpellRecord[]>()
		entries.forEach((raw, i) => {
			const rec = validateSpellRecord(raw, `${src.json}[${i}]`)
			const cat = (rec[src.catKey] ?? '').toString()
			if (!cat) throw new Error(`${src.json}[${i}] (${rec.name}) has no ${src.catKey}`)
			if (!byCat.has(cat)) byCat.set(cat, [])
			byCat.get(cat)!.push(rec)
		})

		for (const [category, spells] of byCat) {
			if (filters.length && !filters.includes(category.toLowerCase())) continue
			const outFile = categoryToFile(src.docDir, category)
			const legacy = legacyMdFile(src.docDir, category)
			const sidebarPos =
				readSidebarPosition(outFile) ?? readSidebarPosition(legacy)
			const content = renderPage(category, spells, sidebarPos)

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
			written++
			console.log(`wrote ${path.relative(REPO, outFile)} (${spells.length} spells)`)
		}
	}

	if (check) {
		if (stale > 0) {
			console.error(
				`\ncontent:gen --check found ${stale} stale page(s). Run \`bun run content:gen\` and commit.`,
			)
			process.exit(1)
		}
		console.log('content:gen --check: all generated pages up to date.')
	} else {
		console.log(`\ncontent:gen: wrote ${written} page(s).`)
	}
}

main()

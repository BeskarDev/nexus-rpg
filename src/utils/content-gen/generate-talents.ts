/**
 * content:gen (talents) — generate the per-skill talent pages from the frozen app
 * JSON (`src/utils/data/json/talents.json`), rendered through `TalentCard`
 * (README § game content architecture, M6). Canonical edits happen in the JSON;
 * this MDX is generated, committed, and never hand-edited (staleness check guards
 * it). Mirrors generate-spells.ts / generate-combat-arts.ts.
 *
 * Usage:
 *   bun src/utils/content-gen/generate-talents.ts           regenerate
 *   bun src/utils/content-gen/generate-talents.ts --check    staleness gate
 */
import fs from 'fs'
import path from 'path'
import { type EffectNode } from './spell-effect-parser'
import {
	parseTalentDescription,
	validateTalentRecord,
	type TalentRecord,
	type TalentRankSection,
} from './talent-description-parser'

const REPO = path.resolve(__dirname, '../../..')
const JSON_FILE = path.join(REPO, 'src/utils/data/json/talents.json')
const DOC_DIR = path.join(REPO, 'docs/03-statistics/06-talents')

const BANNER =
	'{/* GENERATED from src/utils/data/json/talents.json by `bun run content:gen` — do not edit. Edit the JSON and regenerate. */}'

/**
 * Skills in sidebar order, one page each. Listed explicitly rather than derived
 * from the data so an unknown / misspelled `skill requirement` fails the build
 * instead of silently dropping its talents off every page, and so the existing
 * `sidebar_position` of each page is preserved exactly.
 */
const SKILLS: { name: string; sidebarPosition: number }[] = [
	{ name: 'Arcana', sidebarPosition: 1 },
	{ name: 'Archery', sidebarPosition: 2 },
	{ name: 'Athletics', sidebarPosition: 3 },
	{ name: 'Crafting', sidebarPosition: 4 },
	{ name: 'Education', sidebarPosition: 5 },
	{ name: 'Fighting', sidebarPosition: 6 },
	{ name: 'Fortitude', sidebarPosition: 7 },
	{ name: 'Influence', sidebarPosition: 8 },
	{ name: 'Insight', sidebarPosition: 9 },
	{ name: 'Lore', sidebarPosition: 10 },
	{ name: 'Mysticism', sidebarPosition: 11 },
	{ name: 'Nature', sidebarPosition: 12 },
	{ name: 'Perception', sidebarPosition: 13 },
	{ name: 'Stealth', sidebarPosition: 14 },
	{ name: 'Streetwise', sidebarPosition: 15 },
	{ name: 'Survival', sidebarPosition: 16 },
]

const KNOWN_SKILLS = new Set(SKILLS.map((s) => s.name))

function fail(context: string, reason: string): never {
	throw new Error(`[generate-talents] ${context}: ${reason}`)
}

function renderNodes(nodes: EffectNode[]): string {
	// Each node is its own block, blank-line separated, so markdown parses inside
	// the JSX card and keyword auto-links resolve.
	return nodes
		.map((node) =>
			node.kind === 'prose'
				? node.text
				: `<SuccessLevel level="${node.level}">${node.text}</SuccessLevel>`,
		)
		.join('\n\n')
}

/**
 * The rank span shown on the name line, e.g. `1-3` or `4-5`.
 *
 * A plain ASCII hyphen, not an en dash: CLAUDE.md § writing style bars em/en
 * dashes from game content. Fails loudly on a gap in the ladder, because the
 * min-max label would then be a lie about what you can buy.
 */
function rankSpan(ranks: TalentRankSection[], context: string): string {
	const values = ranks.map((r) => r.rank)
	const lo = values[0]
	const hi = values[values.length - 1]
	if (values.length !== hi - lo + 1)
		fail(
			context,
			`rank ladder has a gap (${values.join(', ')}), so a span label would mislead`,
		)
	return lo === hi ? `${lo}` : `${lo}-${hi}`
}

function renderTalent(talent: TalentRecord): string {
	const parsed = parseTalentDescription(talent.description, talent.name)
	const blocks = [
		`<TalentCard ranks="${rankSpan(parsed.ranks, talent.name)}">`,
		`### ${talent.name}`,
	]
	if (parsed.preamble.length > 0) blocks.push(renderNodes(parsed.preamble))
	for (const section of parsed.ranks) {
		blocks.push(
			[
				`<TalentRank rank={${section.rank}}>`,
				'',
				renderNodes(section.nodes),
				'',
				'</TalentRank>',
			].join('\n'),
		)
	}
	blocks.push('</TalentCard>')
	return blocks.join('\n\n')
}

function renderPage(
	skill: string,
	sidebarPosition: number,
	talents: TalentRecord[],
): string {
	// h3 talent names are the only headings on the page, so the TOC lists them.
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
		`# ${skill}`,
		BANNER,
		...talents.map(renderTalent),
	]
	return blocks.join('\n\n') + '\n'
}

function main() {
	const check = process.argv.slice(2).includes('--check')
	const entries: unknown[] = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'))
	const talents = entries.map((raw, i) =>
		validateTalentRecord(raw, `talents.json[${i}]`),
	)

	for (const [i, talent] of talents.entries()) {
		if (!KNOWN_SKILLS.has(talent['skill requirement']))
			fail(
				`talents.json[${i}] (${talent.name})`,
				`unknown skill requirement "${talent['skill requirement']}" ` +
					`(expected one of ${[...KNOWN_SKILLS].join(', ')})`,
			)
	}

	let stale = 0
	for (const { name, sidebarPosition } of SKILLS) {
		const slug = name.toLowerCase()
		const outFile = path.join(DOC_DIR, `${slug}.mdx`)
		const legacy = path.join(DOC_DIR, `${slug}.md`)
		const forSkill = talents.filter((t) => t['skill requirement'] === name)
		if (forSkill.length === 0) fail(name, 'no talents found for this skill')
		const content = renderPage(name, sidebarPosition, forSkill)

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
			`wrote ${path.relative(REPO, outFile)} (${forSkill.length} talents)`,
		)
	}

	if (check) {
		if (stale > 0) {
			console.error(
				`\ncontent:gen --check found ${stale} stale talent page(s). Run \`bun run content:gen\` and commit.`,
			)
			process.exit(1)
		}
		console.log('content:gen --check: talent pages up to date.')
	}
}

main()

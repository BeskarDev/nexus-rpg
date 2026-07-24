/**
 * content:gen (conditions) — generate the Conditions page MDX from the frozen app
 * JSON (`src/utils/data/json/conditions.json`), rendered through `ConditionCard`
 * (README § game content architecture, M6). Canonical edits happen in the JSON;
 * this MDX is generated, committed, and never hand-edited (staleness check guards
 * it). Mirrors generate-spells.ts.
 *
 * Usage:
 *   bun src/utils/content-gen/generate-conditions.ts           regenerate
 *   bun src/utils/content-gen/generate-conditions.ts --check   staleness gate
 */
import fs from 'fs'
import path from 'path'
import { htmlToMarkdownLines } from './spell-effect-parser'

const REPO = path.resolve(__dirname, '../../..')
const JSON_FILE = path.join(REPO, 'src/utils/data/json/conditions.json')
const OUT_FILE = path.join(REPO, 'docs/05-combat/04-conditions.mdx')
const LEGACY_MD = path.join(REPO, 'docs/05-combat/04-conditions.md')

const BANNER =
	'{/* GENERATED from src/utils/data/json/conditions.json by `bun run content:gen` — do not edit. Edit the JSON and regenerate. */}'

// Editorial page preamble (not part of the per-condition data). The h1 must
// immediately follow the frontmatter so Docusaurus keeps the page title; the
// chapter-sigil plugin strips any leading emoji and adds the page sigil by slug.
const PREAMBLE = [
	'# Conditions',
	BANNER,
	'![banner-img](/img/banner/conditions-banner.png)',
	'You can suffer various conditions during the game. Each condition inflicts different effects on you. When you suffer a condition, the source also states how long it holds effect. When you suffer the same condition multiple times, you only are affected by it once. In the case of conditions with different potencies, such as bleeding, you only suffer the most potent version of the condition.',
]

interface ConditionRecord {
	name: string
	description: string
}

function fail(context: string, reason: string): never {
	throw new Error(`[generate-conditions] ${context}: ${reason}`)
}

function validateCondition(entry: unknown, context: string): ConditionRecord {
	if (typeof entry !== 'object' || entry === null) fail(context, 'entry is not an object')
	const e = entry as Record<string, unknown>
	for (const field of ['name', 'description'] as const) {
		if (typeof e[field] !== 'string') fail(context, `field "${field}" must be a string`)
		if ((e[field] as string).trim() === '') fail(context, `field "${field}" is empty`)
	}
	// Bullet runs must be split by <br/>. An inline " - " means the entry lost its
	// line breaks and would silently render as a run-on paragraph. Game content
	// never uses a spaced hyphen as punctuation (CLAUDE.md § writing style), so
	// this is always a data bug — fail loud and fix the JSON.
	if (/\s-\s/.test(e.description as string))
		fail(
			context,
			'description has an inline " - " bullet; separate bullets with <br/> so they render as a list',
		)
	return entry as ConditionRecord
}

/** Description HTML → markdown body, folding consecutive `- ` items into tight lists. */
function renderBody(description: string, context: string): string {
	const lines = htmlToMarkdownLines(description, context)
	const blocks: string[] = []
	let list: string[] = []
	const flushList = () => {
		if (list.length) {
			blocks.push(list.join('\n'))
			list = []
		}
	}
	for (const line of lines) {
		if (line.startsWith('- ')) list.push(line)
		else {
			flushList()
			blocks.push(line)
		}
	}
	flushList()
	return blocks.join('\n\n')
}

function renderCondition(c: ConditionRecord): string {
	return [
		'<ConditionCard>',
		'',
		`### ${c.name}`,
		'',
		renderBody(c.description, c.name),
		'',
		'</ConditionCard>',
	].join('\n')
}

function renderPage(conditions: ConditionRecord[]): string {
	const fm = ['---', 'sidebar_position: 4', 'toc_max_heading_level: 2', '---']
	const blocks = [fm.join('\n'), ...PREAMBLE, ...conditions.map(renderCondition)]
	return blocks.join('\n\n') + '\n'
}

function main() {
	const check = process.argv.slice(2).includes('--check')
	const entries: unknown[] = JSON.parse(fs.readFileSync(JSON_FILE, 'utf-8'))
	const conditions = entries.map((raw, i) => validateCondition(raw, `conditions.json[${i}]`))
	const content = renderPage(conditions)

	if (check) {
		const current = fs.existsSync(OUT_FILE) ? fs.readFileSync(OUT_FILE, 'utf-8') : null
		if (current !== content) {
			console.error(`STALE: ${path.relative(REPO, OUT_FILE)}`)
			console.error('content:gen --check found a stale conditions page. Run `bun run content:gen` and commit.')
			process.exit(1)
		}
		console.log('content:gen --check: conditions page up to date.')
		return
	}

	fs.writeFileSync(OUT_FILE, content)
	if (fs.existsSync(LEGACY_MD)) fs.rmSync(LEGACY_MD)
	console.log(`wrote ${path.relative(REPO, OUT_FILE)} (${conditions.length} conditions)`)
}

main()

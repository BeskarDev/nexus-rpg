/**
 * content:gen (combat actions) — regenerate the Actions, Skill Actions and
 * Quick Actions tables on the Combat Scenes page from their JSON.
 *
 * ## Why these three tables got a generator
 *
 * The combat quick reference used to be a PNG exported from Figma, so every row
 * of these tables existed twice: once as markdown a player reads, once as
 * artwork a player prints. They had drifted — the sheet still rolled Hide and
 * Distract on a skill the game renamed, and still gave Dash +1 Movement where
 * the page doubles it. The reference is now a print tool that reads the same
 * JSON these tables are built from, so a single edit moves both surfaces.
 *
 * ## Why region-based, like `generate-random-tables.ts` and unlike the rest
 *
 * Combat Scenes is prose first — surprise, initiative, fleeing — and only
 * incidentally three tables. The generator owns the marked regions and never
 * touches a byte outside them.
 *
 * ## What the JSON carries that the page does not
 *
 * Each record has a `quickRef` brief beside its full `effect`. The printed sheet
 * has one A4 column for ten Actions; Disarm's full effect alone is a success
 * level ladder. The brief is the sheet's wording, kept next to the rules text it
 * compresses so the two are edited together.
 *
 * Usage:
 *   bun src/utils/content-gen/generate-combat-actions.ts           regenerate
 *   bun src/utils/content-gen/generate-combat-actions.ts --check   staleness gate
 */
import fs from 'fs'
import path from 'path'

const REPO = path.resolve(__dirname, '../../..')
const DATA_DIR = path.join(REPO, 'src/utils/data/json')
const PAGE = path.join(REPO, 'docs/05-combat/01-combat-scenes.md')

const MARK_OPEN = (id: string) =>
	`{/* gen:combat:${id} — from src/utils/data/json/${id}.json by \`bun run content:gen\`. Do not edit: change the JSON. */}`
const MARK_CLOSE = '{/* /gen:combat */}'

interface ActionRecord {
	name: string
	trigger?: string
	effect: string
	quickRef: string
	quickRefTrigger?: string
}

interface Region {
	/** The data file, which is also the marker id. */
	id: 'combat-actions' | 'skill-actions' | 'quick-actions'
	header: string[]
	/** The cells of one row, in header order. */
	row: (record: ActionRecord) => string[]
}

const REGIONS: Region[] = [
	{
		id: 'combat-actions',
		header: ['Action', 'Effect'],
		row: (record) => [record.name, record.effect],
	},
	{
		id: 'skill-actions',
		header: ['Action', 'Effect'],
		row: (record) => [record.name, record.effect],
	},
	{
		id: 'quick-actions',
		header: ['Quick Action', 'Trigger', 'Effect'],
		row: (record) => [record.name, record.trigger ?? '', record.effect],
	},
]

function fail(context: string, reason: string): never {
	throw new Error(`[generate-combat-actions] ${context}: ${reason}`)
}

export function loadActions(id: string): ActionRecord[] {
	const file = path.join(DATA_DIR, `${id}.json`)
	if (!fs.existsSync(file)) fail(id, `no data file at ${file}`)
	const records = JSON.parse(fs.readFileSync(file, 'utf8')) as ActionRecord[]
	if (!Array.isArray(records) || records.length === 0)
		fail(id, 'the data file holds no records')
	for (const record of records) {
		for (const field of ['name', 'effect', 'quickRef'] as const) {
			if (typeof record[field] !== 'string' || record[field].trim() === '')
				fail(id, `"${record.name ?? '?'}" has no ${field}`)
		}
		// A cell is one line of a markdown table, so a literal newline would end
		// the row. The corpus uses `<br/>` and this is where that is enforced.
		if (record.effect.includes('\n'))
			fail(id, `"${record.name}" has a newline in its effect (use <br/>)`)
	}
	return records
}

function renderTable(region: Region, records: ActionRecord[]): string {
	return [
		`| ${region.header.join(' | ')} |`,
		`| ${region.header.map(() => '---').join(' | ')} |`,
		...records.map((record) => `| ${region.row(record).join(' | ')} |`),
	].join('\n')
}

/**
 * Replace each marked region, or claim an unmarked table the first time.
 *
 * The markers are stripped before matching, so a rerun is stable and a page that
 * has never been generated is adopted rather than duplicated.
 */
const TABLE_RE = /\|[^\n]*\n\|[ \-|]*\n(?:\|[^\n]*\n)*/g

function stripMarkers(source: string): string {
	return source
		.replace(/\{\/\* gen:combat:[^\n]*\*\/\}\n/g, '')
		.replace(/\{\/\* \/gen:combat \*\/\}\n/g, '')
}

function apply(pageSource: string): string {
	const blocks = pageSource.match(TABLE_RE) ?? []
	if (blocks.length !== REGIONS.length)
		fail(
			'01-combat-scenes.md',
			`page has ${blocks.length} tables, the generator owns ${REGIONS.length}. ` +
				'A table was added or removed by hand — give it a region, or restore it.',
		)
	let cursor = 0
	return pageSource.replace(TABLE_RE, () => {
		const region = REGIONS[cursor++]
		const records = loadActions(region.id)
		return `${MARK_OPEN(region.id)}\n${renderTable(region, records)}\n${MARK_CLOSE}\n`
	})
}

function main() {
	const check = process.argv.includes('--check')
	const current = fs.readFileSync(PAGE, 'utf8')
	const next = apply(stripMarkers(current))

	if (next === current) {
		console.warn(
			check
				? 'content:gen --check: combat actions up to date.'
				: 'content:gen: combat actions already up to date.',
		)
		return
	}
	if (check) {
		console.error(
			'content:gen --check: docs/05-combat/01-combat-scenes.md is stale or ' +
				'hand-edited. Run `bun run content:gen`.',
		)
		process.exit(1)
	}
	fs.writeFileSync(PAGE, next)
	console.warn('content:gen: rewrote docs/05-combat/01-combat-scenes.md.')
}

if (require.main === module) main()

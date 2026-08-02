/**
 * content:gen (random tables) — regenerate the GM-tools rolled tables from the
 * roller's own data (`src/components/AutoRoller/data/*.json`), which M14 D0 made
 * canonical.
 *
 * ## Why this generator is region-based, unlike its five siblings
 *
 * `generate-spells.ts` and the rest emit WHOLE pages, because those pages are
 * nothing but content. A random-table page is prose *and* tables, and the prose is
 * the part worth keeping — the rules for using the oracle, which no data file
 * knows. So this generator owns marked regions inside a hand-written page and
 * never touches a byte outside them.
 *
 * ## Why the tables were duplicated at all, and what it cost
 *
 * The roller read the JSON; the page carried the same rows as markdown. 160 tables,
 * ~4,000 rows, hand-maintained on both sides. By the time M14 looked they had
 * already drifted, in BOTH directions — the page rolled d10 over a 12-entry list
 * (Wand and Staff could never come up at the table), and the page's curse table
 * carried a whole column the JSON had never heard of. See
 * `.drafts/nexus-docusaurus-theme/milestone-14/findings.md`.
 *
 * ## The spec registry
 *
 * `random-tables/specs.json` names, for every table, the JSON path and the
 * rendering that reproduces it. It was not written by hand: it was PROVEN, by
 * rendering every array in the data every supported way and matching the result
 * byte-for-byte against the committed markdown. Two entries are declared
 * corrections rather than matches, and say so in their `note`.
 *
 * Usage:
 *   bun src/utils/content-gen/generate-random-tables.ts           regenerate
 *   bun src/utils/content-gen/generate-random-tables.ts --check   staleness gate
 */
import fs from 'fs'
import path from 'path'

const REPO = path.resolve(__dirname, '../../..')
const DATA_DIR = path.join(REPO, 'src/components/AutoRoller/data')
const DOCS_DIR = path.join(REPO, 'docs/10-gm-tools/01-random-tables')
const SPECS = path.join(__dirname, 'random-tables/specs.json')

const MARK_OPEN = (id: string) =>
	`{/* gen:table:${id} — from the roller data by \`bun run content:gen\`. Do not edit: change the JSON. */}`
const MARK_CLOSE = '{/* /gen:table */}'

type Spec = {
	page: string
	index: number
	header: string[]
	file: string
	path: string
	render:
		| 'strings'
		| 'd66'
		| 'paired'
		| 'object'
		| 'object-ranged'
		| 'gloss'
		| 'dict-columns'
	cols?: string[]
	keys?: string[]
	cap?: boolean
	bold?: boolean
	note?: string
}

function fail(context: string, reason: string): never {
	throw new Error(`[generate-random-tables] ${context}: ${reason}`)
}

/** The JSON stores sentence fragments; a table cell presents them as entries. */
const capitalise = (value: string) =>
	value ? value.charAt(0).toUpperCase() + value.slice(1) : value

function resolve(doc: unknown, dotted: string, context: string): unknown {
	if (dotted === '') return doc
	return dotted.split('.').reduce<unknown>((node, key) => {
		if (node === null || typeof node !== 'object')
			fail(context, `path "${dotted}" runs through a non-object at "${key}"`)
		const next = Array.isArray(node)
			? (node as unknown[])[Number(key)]
			: (node as Record<string, unknown>)[key]
		if (next === undefined) fail(context, `path "${dotted}" has no "${key}"`)
		return next
	}, doc)
}

function rowsFor(spec: Spec, doc: unknown, context: string): string[][] {
	const node = resolve(doc, spec.path, context)
	const tf = (value: string) => (spec.cap ? capitalise(value) : value)
	const label = (i: number) => (spec.bold ? `**${i + 1}**` : String(i + 1))

	switch (spec.render) {
		case 'strings': {
			const arr = node as string[]
			return arr.map((entry, i) => [label(i), tf(entry)])
		}
		case 'd66': {
			const arr = node as string[]
			if (arr.length !== 36)
				fail(context, `a d66 grid needs 36 entries, found ${arr.length}`)
			return Array.from({ length: 6 }, (_, i) => [
				label(i),
				...arr.slice(i * 6, i * 6 + 6).map(tf),
			])
		}
		case 'paired': {
			const arr = node as string[]
			const half = arr.length / 2
			if (!Number.isInteger(half))
				fail(context, `a paired table needs an even count, found ${arr.length}`)
			return Array.from({ length: half }, (_, i) => [
				label(i),
				tf(arr[i]),
				tf(arr[half + i]),
			])
		}
		case 'object': {
			const arr = node as Record<string, string>[]
			const cols = spec.cols ?? fail(context, 'object rendering needs cols')
			return arr.map((entry, i) => [
				label(i),
				...cols.map((key) => tf(entry[key])),
			])
		}
		case 'object-ranged': {
			const arr = node as Record<string, string>[]
			const cols = spec.cols ?? fail(context, 'ranged rendering needs cols')
			// The first column IS the row label — a range like `1-3`, not an index.
			return arr.map((entry) => [
				entry[cols[0]],
				...cols.slice(1).map((key) => tf(entry[key])),
			])
		}
		case 'gloss': {
			// The names page composes two arrays: the in-world word, with the English
			// it means in parentheses. Neither array can produce the table alone.
			const world = node as Record<string, string>[]
			const parentPath = spec.path.split('.').slice(0, -1).join('.')
			const parent = resolve(doc, parentPath, context) as Record<
				string,
				unknown
			>
			const english = parent.familyNames as Record<string, string>[]
			const cols = spec.cols ?? fail(context, 'gloss rendering needs cols')
			return world.map((entry, i) => [
				label(i),
				...cols.map((key) => `${entry[key]} (${english[i][key]})`),
			])
		}
		case 'dict-columns': {
			const dict = node as Record<string, string[]>
			const keys = spec.keys ?? fail(context, 'dict-columns needs keys')
			const height = dict[keys[0]].length
			return Array.from({ length: height }, (_, i) => [
				label(i),
				...keys.map((key) => tf(dict[key][i])),
			])
		}
		default:
			return fail(context, `unknown rendering "${spec.render}"`)
	}
}

function renderTable(spec: Spec, rows: string[][]): string {
	const width = spec.header.length
	for (const row of rows) {
		if (row.length !== width)
			fail(
				`${spec.page}#${spec.index}`,
				`row has ${row.length} cells, header has ${width}`,
			)
	}
	return [
		'<RollableTable>',
		`| ${spec.header.join(' | ')} |`,
		`| ${spec.header.map(() => '---').join(' | ')} |`,
		...rows.map((row) => `| ${row.join(' | ')} |`),
		'</RollableTable>',
	].join('\n')
}

const TABLE_RE =
	/<RollableTable>\n\|[^\n]*\n\|[ \-|]*\n(?:\|[^\n]*\n)*<\/RollableTable>/g

function apply(pageSource: string, specs: Spec[], page: string): string {
	const blocks = pageSource.match(TABLE_RE) ?? []
	if (blocks.length !== specs.length)
		fail(
			page,
			`page has ${blocks.length} tables, the registry has ${specs.length}. ` +
				`A table was added or removed by hand — add its spec, or restore it.`,
		)
	let cursor = 0
	return pageSource.replace(TABLE_RE, () => {
		const spec = specs[cursor++]
		const data = loadData(spec.file)
		const rows = rowsFor(spec, data, `${spec.page}#${spec.index}`)
		const id = `${spec.file}.${spec.path || 'root'}#${spec.index}`
		return `${MARK_OPEN(id)}\n${renderTable(spec, rows)}\n${MARK_CLOSE}`
	})
}

const dataCache = new Map<string, unknown>()
function loadData(file: string): unknown {
	if (!dataCache.has(file)) {
		const full = path.join(DATA_DIR, `${file}.json`)
		if (!fs.existsSync(full)) fail(file, `no data file at ${full}`)
		dataCache.set(full, JSON.parse(fs.readFileSync(full, 'utf8')))
		dataCache.set(file, dataCache.get(full))
	}
	return dataCache.get(file)
}

function stripMarkers(source: string): string {
	return source
		.replace(/\{\/\* gen:table:[^\n]*\*\/\}\n/g, '')
		.replace(/\{\/\* \/gen:table \*\/\}\n/g, '')
}

function main() {
	const check = process.argv.includes('--check')
	const specs: Spec[] = JSON.parse(fs.readFileSync(SPECS, 'utf8'))
	const byPage = new Map<string, Spec[]>()
	for (const spec of specs) {
		byPage.set(spec.page, [...(byPage.get(spec.page) ?? []), spec])
	}

	let stale = 0
	for (const [page, pageSpecs] of byPage) {
		const file = path.join(DOCS_DIR, page)
		const current = fs.readFileSync(file, 'utf8')
		// Regenerate from the page with its markers removed, so a rerun is stable.
		const next = apply(stripMarkers(current), pageSpecs, page)
		if (next === current) continue
		stale += 1
		if (check) {
			console.error(`content:gen --check: ${page} is stale or hand-edited.`)
		} else {
			fs.writeFileSync(file, next)
			console.warn(`content:gen: rewrote ${page} (${pageSpecs.length} tables).`)
		}
	}

	if (check) {
		if (stale > 0) {
			console.error(
				`content:gen --check: ${stale} random-table page(s) out of date. ` +
					`Run \`bun run content:gen\`.`,
			)
			process.exit(1)
		}
		console.warn('content:gen --check: random tables up to date.')
		return
	}
	if (stale === 0)
		console.warn('content:gen: random tables already up to date.')
}

main()

/**
 * Spell effect parser — M6 content track.
 *
 * The app JSON (`src/utils/data/json/*-spells.json`) is the frozen canonical
 * source. Its `effect` is a single HTML string: leading prose, then optional
 * `<strong>Weak.</strong> … <strong>Strong.</strong> … <strong>Critical.</strong> …`
 * runs, sometimes trailing prose. This module turns that string into the
 * structured shape the MDX generator renders, converting the inline HTML to
 * markdown along the way.
 *
 * Contract (README § Game Content Architecture, M6 § effect-string parsing):
 * all parsing happens at generation time and the parser FAILS LOUDLY on any
 * effect it cannot split cleanly — malformed entries get fixed in the JSON,
 * never papered over here. There are no silent fallbacks.
 */

export type SuccessLevelName = 'weak' | 'strong' | 'critical'

/**
 * The effect renders as an ordered sequence of nodes. Most spells are just
 * `prose → weak → strong → critical → prose`, but a few (e.g. Force Surge) have
 * several mode-labeled runs, so a flat ordered list is the honest model: prose
 * nodes become markdown children, success nodes become `<SuccessLevel>` rows,
 * and order is preserved exactly.
 */
export type EffectNode =
	| { kind: 'prose'; text: string }
	| { kind: 'success'; level: SuccessLevelName; text: string }

export interface ParsedEffect {
	nodes: EffectNode[]
}

const LEVEL_ORDER: SuccessLevelName[] = ['weak', 'strong', 'critical']

/** A chunk that opens with a `<strong>Weak.</strong>` style label. */
const LEVEL_LABEL = /^\s*<strong>\s*(Weak|Strong|Critical)\s*\.\s*<\/strong>/i

/** Raise a build-stopping error tagged with the offending entry. */
function fail(context: string, reason: string, offending?: string): never {
	const tail = offending ? `\n  in: ${JSON.stringify(offending)}` : ''
	throw new Error(`[spell-effect-parser] ${context}: ${reason}${tail}`)
}

/**
 * Convert an inline HTML fragment (no `<br/>` — those are split out first) to
 * markdown. `<strong>` → `**`, `<em>` → `*`; empty emphasis collapses. Throws
 * if any tag other than strong/em survives, so unexpected markup fails loudly.
 */
function inlineHtmlToMarkdown(html: string, context: string): string {
	// Emphasis can carry meaningful edge whitespace inside the tag
	// (`<strong>(Rank 2) </strong>Deal`). Markdown emphasis can't hold trailing
	// spaces, so move any edge whitespace outside the markers rather than drop it.
	const emphasize = (marker: string) => (_m: string, inner: string) => {
		const t = inner.trim()
		if (!t) return /\s/.test(inner) ? ' ' : ''
		const lead = /^\s/.test(inner) ? ' ' : ''
		const trail = /\s$/.test(inner) ? ' ' : ''
		return `${lead}${marker}${t}${marker}${trail}`
	}
	let s = html.replace(/<strong>([\s\S]*?)<\/strong>/gi, emphasize('**'))
	s = s.replace(/<em>([\s\S]*?)<\/em>/gi, emphasize('*'))
	const stray = s.match(/<[^>]+>/)
	if (stray) fail(context, `unexpected HTML tag ${stray[0]}`, html)
	return s.replace(/[ \t]+/g, ' ').trim()
}

/**
 * Convert a whole HTML field (e.g. `heightened`) to markdown: `<br/>`-separated
 * runs become blank-line-separated markdown blocks, strong/em become markdown.
 * Used for fields rendered as card children so their terms keyword-link.
 */
export function htmlToMarkdownBlocks(html: string, context = 'field'): string {
	return html
		.split(/<br\s*\/?>/i)
		.map((c) => inlineHtmlToMarkdown(c, context))
		.filter((line) => line !== '')
		.join('\n\n')
}

/** Join raw `<br/>`-split chunks into one markdown block. */
function chunksToMarkdown(chunks: string[], context: string): string {
	return chunks
		.map((c) => inlineHtmlToMarkdown(c, context))
		.filter((line) => line.length > 0)
		.join('\n')
		.trim()
}

/**
 * Parse a spell's `effect` HTML into an ordered list of prose / success nodes.
 *
 * Every contiguous run of success levels must be exactly weak→strong→critical;
 * a partial or scrambled run is a data bug and fails the build. Prose between
 * runs is preserved (a mode label like `**Slam.**` is just prose), so both
 * single-run and multi-run spells parse without special cases.
 *
 * @param effect  the raw JSON effect string
 * @param context a label (spell name) used in error messages
 */
export function parseSpellEffect(effect: string, context = 'spell'): ParsedEffect {
	if (typeof effect !== 'string' || effect.trim() === '')
		fail(context, 'effect is empty')

	const rawChunks = effect.split(/<br\s*\/?>/i)
	const nodes: EffectNode[] = []
	let proseBuf: string[] = []

	const flushProse = () => {
		if (proseBuf.length === 0) return
		const text = chunksToMarkdown(proseBuf, context)
		if (text !== '') nodes.push({ kind: 'prose', text })
		proseBuf = []
	}

	for (let i = 0; i < rawChunks.length; ) {
		const m = rawChunks[i].match(LEVEL_LABEL)
		if (!m) {
			proseBuf.push(rawChunks[i])
			i++
			continue
		}
		// Start of a success run — everything buffered so far is prose.
		flushProse()
		const run: SuccessLevelName[] = []
		const runNodes: EffectNode[] = []
		while (i < rawChunks.length) {
			const lm = rawChunks[i].match(LEVEL_LABEL)
			if (!lm) break
			const level = lm[1].toLowerCase() as SuccessLevelName
			const text = inlineHtmlToMarkdown(
				rawChunks[i].replace(LEVEL_LABEL, ''),
				`${context} (${level})`,
			)
			if (text === '') fail(context, `${level} success level has no text`, effect)
			run.push(level)
			runNodes.push({ kind: 'success', level, text })
			i++
		}
		if (run.length !== 3 || LEVEL_ORDER.some((lvl, k) => run[k] !== lvl))
			fail(
				context,
				`each success run must be weak→strong→critical, found (${run.join(', ')})`,
				effect,
			)
		nodes.push(...runNodes)
	}
	flushProse()

	return { nodes }
}

/** A `-` or empty placeholder becomes an empty string for display. */
export function normalizePlaceholder(value: string): string {
	const v = (value ?? '').trim()
	return v === '-' ? '' : v
}

/** The frozen spell record shape the generator consumes. */
export interface SpellRecord {
	name: string
	rank: string
	focus: string
	target: string
	range: string
	properties: string
	heightened: string
	effect: string
	discipline?: string
	tradition?: string
}

const REQUIRED_STRING_FIELDS: (keyof SpellRecord)[] = [
	'name',
	'rank',
	'focus',
	'target',
	'range',
	'properties',
	'heightened',
	'effect',
]

/**
 * Shape-check a raw JSON entry before it is rendered. Fails loudly on any
 * missing / wrong-typed field or non-numeric rank so bad data stops the build.
 */
export function validateSpellRecord(entry: unknown, context = 'spell'): SpellRecord {
	if (typeof entry !== 'object' || entry === null)
		fail(context, 'entry is not an object')
	const e = entry as Record<string, unknown>
	for (const field of REQUIRED_STRING_FIELDS) {
		if (typeof e[field] !== 'string')
			fail(context, `field "${field}" must be a string, got ${typeof e[field]}`)
		if ((e[field] as string).trim() === '' && field !== 'properties' && field !== 'heightened')
			fail(context, `field "${field}" is empty`)
	}
	if (!/^\d+$/.test((e.rank as string).trim()))
		fail(context, `rank must be a whole number, got ${JSON.stringify(e.rank)}`)
	if (!/^\d+$/.test((e.focus as string).trim()))
		fail(context, `focus must be a whole number, got ${JSON.stringify(e.focus)}`)
	if (typeof e.discipline !== 'string' && typeof e.tradition !== 'string')
		fail(context, 'entry needs a discipline (arcane) or tradition (mystic)')
	return entry as SpellRecord
}

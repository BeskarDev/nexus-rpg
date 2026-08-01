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
	return htmlToMarkdownLines(html, context).join('\n\n')
}

/**
 * Like {@link htmlToMarkdownBlocks} but returns the individual `<br/>`-split
 * markdown lines instead of joining them — lets a caller group them (e.g. fold
 * consecutive `- ` items into one tight list) before emitting.
 */
export function htmlToMarkdownLines(html: string, context = 'field'): string[] {
	return html
		.split(/<br\s*\/?>/i)
		.map((c) => inlineHtmlToMarkdown(c, context))
		.filter((line) => line !== '')
}

/**
 * A line that opens with a bolded label acting as a menu entry: `**Throw.**`,
 * `**Ritual (minutes).**`, `**1.**`. The label is short and ends in a period,
 * which is what separates it from a sentence that merely starts with emphasis.
 *
 * Both punctuation placements are accepted — `**AV.**` and `**HP**.` — because the
 * corpus mixes them inside a single menu (Life from Stone's trait list). Matching
 * only one form stranded the odd sibling above the folded list as loose prose,
 * which looked more broken than the run-on paragraph it replaced. A trailing
 * period is still required, so a bare `**Attacks**` heading stays prose.
 */
const MENU_LABEL =
	/^(?:\*\*(?:\d+\.|[A-Z][^*]{0,28}\.)\*\*|\*\*[A-Z][^*]{0,28}\*\*\.)\s/

/**
 * Fold a run of bold-labeled menu entries into a tight markdown list.
 *
 * Prose lines come from `<br/>`-split chunks and are joined with a plain newline,
 * which markdown collapses to a space. For consecutive sentences that reads fine
 * (better, even), but a spell or talent that offers a *menu* of modes — Glyph's
 * Explosion/Alarm/Spell Effect, Wild Overload's six d6 outcomes — collapsed into
 * one run-on paragraph and lost the structure entirely.
 *
 * Only a run of two or more labels folds; a lone bold label is just an emphasized
 * sentence. Non-label lines BETWEEN labels become lazy continuations of the entry
 * above them (Tempest's "If using this option on a large body of water…" belongs
 * to Flood), while lines before the first label and after the last stay ordinary
 * prose — that is how a closing note ("The plants last for a medium duration…")
 * avoids being swallowed into the final menu entry.
 */
function foldMenuList(lines: string[]): string[] {
	const labelAt = lines.map((line) => MENU_LABEL.test(line))
	if (labelAt.filter(Boolean).length < 2) return lines
	const first = labelAt.indexOf(true)
	const last = labelAt.lastIndexOf(true)

	const out: string[] = lines.slice(0, first)
	// Blank line so the list is its own block rather than interrupting the intro
	// paragraph.
	if (out.length > 0) out.push('')
	for (let i = first; i <= last; i++) {
		out.push(labelAt[i] ? `- ${lines[i]}` : `  ${lines[i]}`)
	}
	const tail = lines.slice(last + 1)
	if (tail.length > 0) out.push('', ...tail)
	return out
}

/** Join raw `<br/>`-split chunks into one markdown block. */
function chunksToMarkdown(chunks: string[], context: string): string {
	const lines = chunks
		.map((c) => inlineHtmlToMarkdown(c, context))
		.filter((line) => line.length > 0)
	return foldMenuList(lines).join('\n').trim()
}

export interface ParseEffectOptions {
	/**
	 * Accept a success run that omits leading levels (e.g. strong→critical).
	 *
	 * Off for spells, where every run must be the full weak→strong→critical and a
	 * gap means the data lost a line. Combat arts genuinely use partial runs: the
	 * prose above the run IS the base case that applies on any hit, and the tiers
	 * only add to it (see Deep Cut). Order and uniqueness stay enforced either
	 * way, so a scrambled or duplicated run still fails.
	 */
	allowPartialRuns?: boolean
}

/**
 * Parse a spell's `effect` HTML into an ordered list of prose / success nodes.
 *
 * Every contiguous run of success levels must be exactly weak→strong→critical;
 * a partial or scrambled run is a data bug and fails the build (relax the
 * partial case with {@link ParseEffectOptions.allowPartialRuns}). Prose between
 * runs is preserved (a mode label like `**Slam.**` is just prose), so both
 * single-run and multi-run spells parse without special cases.
 *
 * @param effect  the raw JSON effect string
 * @param context a label (spell name) used in error messages
 * @param options parser relaxations for non-spell content types
 */
export function parseSpellEffect(
	effect: string,
	context = 'spell',
	options: ParseEffectOptions = {},
): ParsedEffect {
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

	for (let i = 0; i < rawChunks.length;) {
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
			if (text === '')
				fail(context, `${level} success level has no text`, effect)
			run.push(level)
			runNodes.push({ kind: 'success', level, text })
			i++
		}
		// Strictly ascending through weak→strong→critical. Full runs must use all
		// three unless partials are allowed; either way the levels must climb, so
		// a repeat or a swapped pair is still a data bug.
		const ascends = run.every(
			(lvl, k) =>
				k === 0 || LEVEL_ORDER.indexOf(lvl) > LEVEL_ORDER.indexOf(run[k - 1]),
		)
		const complete = options.allowPartialRuns || run.length === 3
		if (!ascends || !complete)
			fail(
				context,
				options.allowPartialRuns
					? `each success run must ascend weak→strong→critical, found (${run.join(', ')})`
					: `each success run must be weak→strong→critical, found (${run.join(', ')})`,
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
export function validateSpellRecord(
	entry: unknown,
	context = 'spell',
): SpellRecord {
	if (typeof entry !== 'object' || entry === null)
		fail(context, 'entry is not an object')
	const e = entry as Record<string, unknown>
	for (const field of REQUIRED_STRING_FIELDS) {
		if (typeof e[field] !== 'string')
			fail(context, `field "${field}" must be a string, got ${typeof e[field]}`)
		if (
			(e[field] as string).trim() === '' &&
			field !== 'properties' &&
			field !== 'heightened'
		)
			fail(context, `field "${field}" is empty`)
	}
	if (!/^\d+$/.test((e.rank as string).trim()))
		fail(context, `rank must be a whole number, got ${JSON.stringify(e.rank)}`)
	if (!/^\d+$/.test((e.focus as string).trim()))
		fail(
			context,
			`focus must be a whole number, got ${JSON.stringify(e.focus)}`,
		)
	if (typeof e.discipline !== 'string' && typeof e.tradition !== 'string')
		fail(context, 'entry needs a discipline (arcane) or tradition (mystic)')
	return entry as SpellRecord
}

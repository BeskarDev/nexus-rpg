/**
 * Talent description parser — M6 content track.
 *
 * `src/utils/data/json/talents.json` is the frozen canonical source. Each entry's
 * `description` is a single HTML string: optional leading prose, then an ordered
 * ladder of rank sections, each opened by a `<strong>(Rank N)</strong>` label:
 *
 *   optional preamble …<br/><br/><strong>(Rank 1)</strong> …<br/><br/><strong>(Rank 2)</strong> …
 *
 * The rank ladder is what makes a talent structurally different from every other
 * migrated content type — a spell has success tiers, a talent has *purchase*
 * tiers — so it gets its own parser. Everything below the rank split (prose,
 * bullets, Weak/Strong/Critical runs) is delegated to
 * {@link parseSpellEffect}, which already models exactly that.
 *
 * Same contract as the spell parser (README § Game Content Architecture, M6):
 * all parsing happens at generation time and the parser FAILS LOUDLY on anything
 * it cannot split cleanly. Malformed entries get fixed in the JSON, never
 * papered over here.
 */
import { parseSpellEffect, type EffectNode } from './spell-effect-parser'

/** One rung of the ladder: the rank you buy and what it grants. */
export interface TalentRankSection {
	rank: number
	nodes: EffectNode[]
}

export interface ParsedTalent {
	/**
	 * Prose above the first rank label — a prerequisite line or a rule that spans
	 * every rank ("You can't gain this talent's armor bonus while…"). Empty for
	 * most talents.
	 */
	preamble: EffectNode[]
	ranks: TalentRankSection[]
}

/**
 * The canonical rank label. Tolerates whitespace inside the `<strong>` because
 * roughly half the corpus carries a trailing space there (`(Rank 2) </strong>`)
 * — that is presentation noise the generator absorbs. It does NOT tolerate the
 * label being structurally broken (paren outside the tag, a `<br/>` swallowed
 * inside it, no emphasis at all); those are data corruption and
 * {@link assertLabelsCanonical} fails the build on them.
 */
const RANK_LABEL = /<strong>\s*\(Rank (\d)\)\s*<\/strong>/g

/**
 * Any rank mention, canonical label or not. Deliberately anchored on the CLOSING
 * paren rather than the opening one: the commonest corruption is
 * `(<strong>Rank 1)</strong>`, where a tag sits between `(` and `Rank`, so a
 * pattern requiring `(Rank` would miss it and count zero mentions against zero
 * labels. Prose references another talent's rank as a bare `Rank 3` with no
 * paren, so this never false-positives (verified across the corpus).
 */
const ANY_RANK_MENTION = /Rank \d\)/g

const MIN_RANK = 1
const MAX_RANK = 5

function fail(context: string, reason: string, offending?: string): never {
	const tail = offending ? `\n  in: ${JSON.stringify(offending)}` : ''
	throw new Error(`[talent-description-parser] ${context}: ${reason}${tail}`)
}

/**
 * Every parenthesized `(Rank N)` must be a canonical label.
 *
 * This guard exists because the Notion export corrupted rank labels in four
 * distinct ways — `(<strong>Rank 1)</strong>`, `<strong><br/>(Rank 3)</strong>`,
 * `<strong>(Rank 3) +</strong>`, and one label with no emphasis at all — and each
 * one silently drops a whole rank section out of the ladder rather than producing
 * visibly broken output. Counting mentions against canonical matches is what
 * caught the unemphasized one. Talents reference other talents' ranks in prose
 * as bare `Rank 3` (no parens), so the parenthesized form is unambiguous.
 */
function assertLabelsCanonical(description: string, context: string): void {
	const mentions = description.match(ANY_RANK_MENTION)?.length ?? 0
	const canonical =
		description.match(new RegExp(RANK_LABEL.source, 'g'))?.length ?? 0
	if (mentions !== canonical)
		fail(
			context,
			`${mentions} "(Rank N)" mention(s) but only ${canonical} canonical ` +
				`<strong>(Rank N)</strong> label(s) — a rank label is malformed and its ` +
				`section would be silently swallowed`,
			description,
		)
}

/**
 * Parse a talent's `description` HTML into its preamble and rank ladder.
 *
 * Ranks must be strictly ascending and within 1–5. They need NOT start at 1:
 * capstone talents (Supernatural Mobility, Master Artisan, …) open at rank 4 and
 * carry an `<em>Requires …</em>` preamble instead.
 *
 * @param description the raw JSON description string
 * @param context     a label (talent name) used in error messages
 */
export function parseTalentDescription(
	description: string,
	context = 'talent',
): ParsedTalent {
	if (typeof description !== 'string' || description.trim() === '')
		fail(context, 'description is empty')

	assertLabelsCanonical(description, context)

	const labels = [...description.matchAll(new RegExp(RANK_LABEL.source, 'g'))]
	if (labels.length === 0)
		fail(context, 'no <strong>(Rank N)</strong> sections found', description)

	// Prose above the first label. Parsed through the same path as a rank body so
	// bullets and emphasis behave identically.
	const head = description.slice(0, labels[0].index)
	const preamble =
		head.trim() === ''
			? []
			: parseSpellEffect(head, `${context} (preamble)`).nodes

	const ranks: TalentRankSection[] = []
	labels.forEach((label, i) => {
		const rank = Number(label[1])
		if (rank < MIN_RANK || rank > MAX_RANK)
			fail(
				context,
				`rank ${rank} is outside ${MIN_RANK}–${MAX_RANK}`,
				description,
			)
		const prev = ranks[ranks.length - 1]
		if (prev && rank <= prev.rank)
			fail(
				context,
				`rank sections must ascend, found (Rank ${prev.rank}) then (Rank ${rank})`,
				description,
			)
		const start = (label.index as number) + label[0].length
		const end =
			i + 1 < labels.length
				? (labels[i + 1].index as number)
				: description.length
		const body = description.slice(start, end)
		if (body.replace(/<[^>]*>/g, '').trim() === '')
			fail(context, `(Rank ${rank}) has no rule text`, description)
		// Strict success runs: all 7 talents that use Weak/Strong/Critical use the
		// full trio, so a gap here means the data lost a line (unlike combat arts,
		// where partial runs are legitimate).
		ranks.push({
			rank,
			nodes: parseSpellEffect(body, `${context} (Rank ${rank})`).nodes,
		})
	})

	return { preamble, ranks }
}

/** The frozen talent record shape the generator consumes. */
export interface TalentRecord {
	name: string
	'skill requirement': string
	description: string
}

/**
 * Shape-check a raw JSON entry before it is rendered. Fails loudly on any
 * missing / wrong-typed / empty field, and on the `"-"` placeholder that marked
 * the junk `Untitled` row removed in this migration — so a stray empty Notion
 * row can never silently reappear as a blank card.
 */
export function validateTalentRecord(
	entry: unknown,
	context = 'talent',
): TalentRecord {
	if (typeof entry !== 'object' || entry === null)
		fail(context, 'entry is not an object')
	const e = entry as Record<string, unknown>
	for (const field of ['name', 'skill requirement', 'description'] as const) {
		if (typeof e[field] !== 'string')
			fail(context, `field "${field}" must be a string, got ${typeof e[field]}`)
		const value = (e[field] as string).trim()
		if (value === '') fail(context, `field "${field}" is empty`)
		if (value === '-')
			fail(
				context,
				`field "${field}" is the "-" placeholder (empty Notion row?)`,
			)
	}
	return entry as TalentRecord
}

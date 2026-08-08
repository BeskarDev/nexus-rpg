/**
 * The ability ledger's column tracks (M13 S8c).
 *
 * ## Two shapes, not one
 *
 * The first cut used ONE template for all four sections with `SpacerCell`s
 * standing in for the Skill and Rank tracks that only Talents fill — the call the
 * Items tab makes, where three item shapes share a single list and a single
 * vertical grid.
 *
 * The owner overruled it, and the difference is that ability categories are
 * **separate `ListSection`s**, each behind its own ruled header. Cross-section
 * alignment buys nothing a reader can perceive across that break, and it cost two
 * empty columns on three sections out of four — which read as holes rather than as
 * alignment. So Talents get the wider shape and everything else gets the narrow
 * one.
 *
 * ## What the row is for
 *
 * The NAME. The first cut spent 4.75rem writing out the action type and a 2fr
 * track on a description that clipped to `While …`, which left the name at `Cle…`
 * — the one fact the row exists to carry, and the only one that was unreadable.
 * The description is gone (it is the whole point of opening the row) and the
 * action type is a mark.
 */

/** The action mark: one glyph, centred, with its heading over it. */
const ACTION = '1.75rem'
/** The skill stamp. Talents only. Sized to the chip, not to the word. */
const SKILL = '7rem'
/** One numeral under a centred heading. */
const RANK = '2.75rem'

/** `Action | Name` — Combat Arts, Folk and Other. */
export const ABILITY_TEMPLATE = `${ACTION} minmax(0, 1fr)`

/** `Action | Name | Skill | Rank` — Talents, the only shape with either fact. */
export const TALENT_TEMPLATE = `${ACTION} minmax(0, 1fr) ${SKILL} ${RANK}`

export type AbilityHeading = { label: string; align: 'left' | 'center' }

const BASE_HEADINGS: AbilityHeading[] = [
	// Blank over the mark: a heading above a glyph column names a fact the glyph
	// already states, and `Action` at 1.75rem clips to `Ac…` anyway.
	{ label: '', align: 'center' },
	{ label: 'Name', align: 'left' },
]

export const ABILITY_HEADINGS: AbilityHeading[] = BASE_HEADINGS

export const TALENT_HEADINGS: AbilityHeading[] = [
	...BASE_HEADINGS,
	{ label: 'Skill', align: 'left' },
	{ label: 'Rank', align: 'center' },
]

/** Whether this category carries a skill and a rank. */
export const isTalentShape = (tag?: string) => tag === 'Talent'

export const abilityTemplateFor = (tag?: string) =>
	isTalentShape(tag) ? TALENT_TEMPLATE : ABILITY_TEMPLATE

export const abilityHeadingsFor = (tag?: string) =>
	isTalentShape(tag) ? TALENT_HEADINGS : ABILITY_HEADINGS

/**
 * The header repeats the row's tracks plus the chevron gutter the rows leave.
 *
 * Same 10px the Items and Spells ledgers use, for the measured reason recorded
 * there: the chevron occupies 18px beside the row, 8px of which is paid for by the
 * extra column gap this track introduces.
 */
export const abilityHeaderTemplate = (tag?: string) =>
	`${abilityTemplateFor(tag)} 10px`

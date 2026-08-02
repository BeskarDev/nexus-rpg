import type { SigilName } from './sigil-paths'
import { STAT_SIGIL, type StatSigilName } from './stat-sigils'

/**
 * The marks on a creature card's trait rows, and the stat marks they share a card
 * with (M13 S9, closing F7).
 *
 * ## Why this is its own file
 *
 * These five lived as a `const` inside `CreatureStatBlock.tsx`. That was already
 * the right table — F7's own finding was that a LOCAL glyph table had silently
 * assigned a mark `STAT_SIGIL` used for something else, and the fix was one table
 * per surface, not one table for everything.
 *
 * What a local const could not do is be CHECKED. `sigils:check` cannot import a
 * `.tsx` module (it would pull React and CSS modules into a bun script), so the
 * only guard on "no mark means two things in one card" was the comment beside
 * `Resistances` reminding the next reader to look. Moving the data to a plain
 * module makes the rule mechanical: `sigils:check` now reads both tables and
 * fails on a collision.
 *
 * ## The surface
 *
 * `CARD_STAT_MARKS` is what the stat panel of a creature card actually renders —
 * not all of `STAT_SIGIL`, only the five figures that appear above the trait rows.
 * That distinction is the whole point of the collision rule: a mark may mean two
 * things in the game, and `sigils:check` deliberately does not forbid that. What
 * it forbids is two meanings **in one view**, where a reader has to tell them
 * apart with no label to help.
 */
export const CREATURE_TRAIT_SIGIL: Record<string, SigilName> = {
	Skills: 'hand',
	// A shield stops a blow outright; a standing stone weathers it. That is the
	// Immunities/Resistances distinction, and it keeps Resistances off
	// `breastplate`, which `stat-sigils.ts` assigns to AV — the two would
	// otherwise render the same mark twice in one card meaning different things.
	Immunities: 'shield',
	Resistances: 'stele',
	Weaknesses: 'khopesh',
	// Companions only — no generated creature page emits a Movement row, so this key
	// is additive (M13 S8). `footprints` is the mark movement wants and is already
	// **Dodge**, which renders four cells above in the same card; the horse is the
	// period's own image of pace, and it is the mark the size rail uses for the same
	// figure, so the trade you choose and the row it lands in carry one glyph.
	Movement: 'horse',
}

/**
 * The stats a creature card draws in its figure panel, in render order: three
 * defenses, then vitality and armour. Kept beside the trait table because the
 * collision rule is about these two lists MEETING.
 */
export const CARD_STAT_FIGURES: StatSigilName[] = [
	'parry',
	'dodge',
	'resist',
	'hp',
	'av',
]

/** Those figures resolved to the marks actually drawn. */
export const CARD_STAT_MARKS: Record<string, SigilName> = Object.fromEntries(
	CARD_STAT_FIGURES.map((stat) => [stat, STAT_SIGIL[stat]]),
)

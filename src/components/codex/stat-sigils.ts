import { SigilName } from './sigil-paths'

/**
 * Per-stat sigil assignments for the character sheet and the creature stat
 * block — the same mapping idea as `page-sigils.ts`, for stat tiles instead of
 * doc pages.
 *
 * ## Why a mapping instead of bespoke marks
 *
 * These slots used to be drawn by a separate `StatGlyph` component: stroked
 * outlines on a 24 grid, a construction that predated the sigil law. Two
 * problems killed it (M9 S4). It read as a second icon pack sitting next to the
 * solid marks — visibly so inside `CreatureStatBlock`, which renders both a
 * stat row and a `scroll` lore toggle in one card. And hairline outlines simply
 * lose to solid silhouettes at the 13–15px a stat tile actually renders at,
 * which is the size the sigil law is written against.
 *
 * Once the two families merged, most slots turned out to be already drawn. The
 * marks are named after **what they depict**, per the law, so the game meaning
 * lives here rather than in the mark's name — which is what lets `flame` serve
 * both the Resolve rules page and the Resolve stat without either lying.
 *
 * Most of these double-duties are deliberate and semantically aligned:
 * `canopic-jar` already marks the Hit Points page, `flame` the Resolve page,
 * `footprints` distances-and-movement, `gem` magic items. A reader who learns a
 * mark in the rules meets the same mark on the sheet.
 */

/**
 * Every stat slot the sheet and the creature card label.
 *
 * `wound` is the *marked* state of an attribute's wound slot; an unwounded slot
 * shows `hp`'s intact vessel instead, so the pair reads as one vessel breaking.
 */
export type StatSigilName =
	// Defenses and vitals
	| 'parry'
	| 'dodge'
	| 'resist'
	| 'hp'
	| 'av'
	// Attributes
	| 'strength'
	| 'agility'
	| 'spirit'
	| 'mind'
	// Sheet resources
	| 'resolve'
	| 'fatigue'
	| 'wound'
	| 'coins'
	| 'load'
	| 'xp'
	| 'focus'
	| 'catalyst'
	| 'magic'

export const STAT_SIGIL: Record<StatSigilName, SigilName> = {
	// --- Defenses ---
	// "Strong arms to deflect" — melee and touch attacks. Parry is 7 + Fighting,
	// so the trained weapon is the instrument.
	parry: 'blades',
	// "Quick feet to evade" — the rules' own phrase. Covers area effects too, so
	// a mark about arrows alone would be too narrow.
	dodge: 'footprints',
	// Mental attacks, spell effects, and spotting what is hidden. An apotropaic
	// mask is the period's actual defense against malign influence — and unlike
	// a standing stone or an anvil it does not imply passive endurance, which
	// Resist is not.
	resist: 'votive-mask',

	// --- Vitals ---
	// The vessel of life. Already the mark on the Hit Points & Wounds page.
	hp: 'canopic-jar',
	// Worn body armour, which is what Armor Value sums. The Defenses page keeps
	// `shield`.
	av: 'breastplate',

	// --- Attributes ---
	// Physical power and fortitude; the bull stood for might across the whole
	// Bronze-Age Near East, and already marks the Attributes page.
	strength: 'bull-head',
	// Speed, precision, graceful movement — the attribute's own description names
	// ranged accuracy, so the bow states it. Three bespoke birds were drawn and
	// binned first: head-on they read as a crown and then as a plain up-arrow, in
	// profile as a feather sliver.
	agility: 'bow',
	// Awareness, intuition and perception — Spirit is the attribute that notices,
	// so it takes the eye. Mystic magic is Spirit-based.
	spirit: 'eye',
	// Knowledge, intelligence and deduction: the clay tablet, the period's whole
	// apparatus for recording and reasoning about what is known. Arcane magic is
	// Mind-based.
	mind: 'tablet',

	// --- Resources ---
	// The game already makes this association itself: `flame` is the Resolve
	// page's own mark.
	resolve: 'flame',
	fatigue: 'sweat-drop',
	wound: 'broken-jar',
	coins: 'ingots',
	// What the character is carrying.
	load: 'pack',
	// Progress counted in levels climbed.
	xp: 'ziggurat',
	// A spendable pool of magical power.
	focus: 'orb',
	// The reagent a spell consumes.
	catalyst: 'gem',
	// The four-pointed star, the ancient sign for the divine and its power.
	magic: 'sparkle',
}

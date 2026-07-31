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

/**
 * Non-stat sheet slots — the identity cards, item locations and party chrome
 * that PR E left on Material icons (M9 S8).
 *
 * Kept in this file rather than a third table on purpose: PR E found a real bug
 * where `CreatureStatBlock`'s own local glyph table silently assigned a mark
 * that `STAT_SIGIL` had already given a different meaning. `sigils:check`
 * enforces that marks are visually distinct, not that a mark carries one
 * meaning — one table per surface is what makes that checkable by reading.
 *
 * Every assignment here reuses the mark the corresponding RULES page already
 * carries (`page-sigils.ts`), so a reader who learns `hearth` on the Upbringing
 * page meets the same mark on the Upbringing card.
 */
export type SheetSigilName =
	| 'name'
	| 'folk'
	| 'upbringing'
	| 'background'
	| 'motivation'
	| 'specialization'
	| 'location-worn'
	| 'location-carried'
	| 'location-mount'
	| 'location-storage'
	| 'slot-head'
	| 'slot-neck'
	| 'slot-back'
	| 'slot-body'
	| 'slot-hands'
	| 'slot-ring'
	| 'slot-waist'
	| 'slot-feet'
	| 'party'
	| 'height'
	| 'weight'
	| 'age'
	| 'description'

export const SHEET_SIGIL: Record<SheetSigilName, SigilName> = {
	// The sign that literally means "this encloses a name" — the same reason PR D
	// made the sheet's card keystone a cartouche. `gm-tools/random-tables/random-name`
	// already uses it.
	name: 'cartouche',
	// `adventurers/folk`.
	folk: 'figure',
	// `adventurers/upbringing` — where you were raised.
	upbringing: 'hearth',
	// `adventurers/background` — the standing stone that records what you were.
	background: 'stele',
	// The guiding star, as on `basic-rules/character-progression`: what a
	// character steers by is also what they advance toward.
	motivation: 'ishtar-star',
	// `statistics/talents` — a specialization is a branch of the same growth.
	specialization: 'sprig',
	// The four places a thing can be (M13 S4d). Two existed; the other two were
	// text-only in a select whose neighbours all carried marks.
	//
	// Worn is the FIGURE rather than the breastplate: `breastplate` is already the
	// mark for armour value and for the body slot below, and "on your person" is a
	// statement about the person. Carried is the pack, the same mark `load` uses —
	// carried load IS what that mark counts, so the two agreeing is the point.
	'location-worn': 'figure',
	'location-carried': 'pack',
	// `creatures/mounts-companions` — the pack animal carrying the load.
	'location-mount': 'horse',
	// `scenes/resting` — the camp the rest of the gear is left at.
	'location-storage': 'tent',
	// The eight body slots (M13 S4d). All eight REUSE marks the set already has,
	// deliberately: eight new sigils for eight dropdown options is the fastest way
	// to spend the F7 budget on the least important surface on the sheet, and every
	// one of these has an existing mark that depicts the right thing.
	//
	// `sigils:check` enforces that marks are visually DISTINCT, not that a mark
	// carries one meaning — and a slot only ever appears in a list beside its seven
	// siblings, never beside the stat that shares its mark, so no reading is
	// ambiguous in place.
	'slot-head': 'cowl', // a hood is worn on the head
	'slot-neck': 'halo', // a ring of metal about the neck — a torc
	'slot-back': 'standard', // what hangs from the back: a banner, a cloak
	'slot-body': 'breastplate', // the same mark as armour value, for the same reason
	'slot-hands': 'hand',
	'slot-ring': 'gem', // a ring is a set stone
	'slot-waist': 'knot', // a tied sash or belt
	'slot-feet': 'footprints',
	// `adventurers/npc-relations` — the mark for people bound to each other.
	party: 'figure-pair',
	// The one mark drawn for this table (M9 S8). Nothing in the set stated
	// "measured extent of a person": `mountains` means terrain and `stele` means
	// a monument, and PR E's law is that a mark which misstates its subject is
	// worse than no mark. The surveyor's rod is the period's own answer.
	height: 'measuring-rod',
	// A balance beam is literally the instrument. `basic-rules/general-rulings`
	// carries it for weighing a ruling; the depiction is the same act.
	weight: 'scales',
	// `scenes/effect-durations` — elapsed time, which is what an age is.
	age: 'hourglass',
	// Cuneiform wedges: written text about the character. NOT `stylus`, which PR F
	// already spent on the RuleInfo gloss mark, and not `scroll`, which the header
	// and character list use to mean "a character sheet".
	description: 'wedges',
}

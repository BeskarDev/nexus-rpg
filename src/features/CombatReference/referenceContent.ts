/**
 * The combat reference's own content — everything on the sheet that is NOT a
 * row of `combat-actions.json`, `skill-actions.json`, `quick-actions.json` or
 * `conditions.json`.
 *
 * ## Why these entries are written here rather than read from a data file
 *
 * The four JSON files above are the canonical rules text for what they hold, and
 * the sheet reads them. The rest of the sheet condenses PROSE — the surprise and
 * initiative sequence, the shape of a turn, movement — which no data file knows,
 * and which no data file should: a page of rules narrows to a printed line by
 * being rewritten, not by being queried.
 *
 * ## The drift gate
 *
 * Every entry names the doc section it condenses, and
 * `tests/unit/combatReference.test.ts` reads those pages and asserts the facts
 * the sheet states are still the facts the rules state — the distance bands and
 * their areas, the five durations, the five success levels. That is what the PNG
 * this replaces had no way to do: it still rolled Hide on a skill the game had
 * renamed, and still gave Dash +1 Movement where the page doubles it.
 */

/** A line of the sheet: a term and the shortest true statement of it. */
export interface ReferenceLine {
	term: string
	text: string
}

/** A numbered sequence, where the order is the rule. */
export interface ReferenceStep {
	step: string
	detail?: string
}

/** docs/05-combat/01-combat-scenes.md — Starting Combat */
export const STARTING_COMBAT: ReferenceStep[] = [
	{
		step: 'Determine surprise',
		detail: 'Agility + Stealth vs. Resist. On a success, you are hidden.',
	},
	{
		step: 'Roll Initiative',
		detail:
			'Agility/Spirit + Perception. Act from highest to lowest. Adventurers act before enemies on a tie.',
	},
]

/** docs/05-combat/01-combat-scenes.md — Combat Turns */
export const COMBAT_TURN: ReferenceStep[] = [
	{ step: 'Resolve any "start of turn" effects' },
	{ step: 'Use 1 Action and 1 Movement, in any order' },
	{ step: 'Resolve any "end of turn" effects' },
	{ step: 'Regain your Quick Action' },
]

/** docs/05-combat/02-attacking.md — the attack table */
export const ATTACK_ROLLS: ReferenceLine[] = [
	{ term: 'Melee weapon', text: 'Strength + Fighting vs. Parry' },
	{ term: 'Ranged weapon', text: 'Agility + Archery vs. Dodge' },
	{ term: 'Mystic spell', text: "Spirit + Mysticism vs. the spell's defense" },
	{ term: 'Arcane spell', text: "Mind + Arcana vs. the spell's defense" },
]

/** docs/05-combat/02-attacking.md — Weapon Attacks */
export const WEAPON_SUCCESS_LEVELS: ReferenceLine[] = [
	{
		term: 'Blunder',
		text: 'Durability Check for your weapon, or a Supply Check for ammo or a bundle. If neither applies, +1 bane on your next attack.',
	},
	{ term: 'Failure', text: 'You miss your target.' },
	{ term: 'Weak', text: '1 x weapon damage.' },
	{ term: 'Strong', text: '2 x weapon damage.' },
	{
		term: 'Critical',
		text: '3 x weapon damage. The target rolls a Durability Check for their armor, helmet, or shield (their choice).',
	},
]

/** docs/05-combat/02-attacking.md — Damage, Ranged Attacks */
export const ATTACK_NOTES: string[] = [
	'Damage is 1/2 the attribute you rolled, plus weapon or spell damage, minus the target AV. Never below 1.',
	'+1 bane for cover, for shooting into or out of melee, and for each range band beyond medium (short for thrown).',
]

/** docs/05-combat/03-distances-movement.md — Distances */
export const DISTANCES: ReferenceLine[] = [
	{ term: 'Melee', text: 'touching or fighting distance, 0 areas' },
	{ term: 'Close', text: 'within a few steps, 0 areas' },
	{ term: 'Short', text: 'normal speaking distance, 1 area' },
	{ term: 'Medium', text: 'a short sprint, 2 areas' },
	{ term: 'Long', text: 'louder shouting distance, 3-4 areas' },
	{ term: 'Very Long', text: 'unhindered viewing distance, 5-8 areas' },
	{ term: 'Extreme', text: 'barely perceivable if at all, 9-16 areas' },
	{ term: 'Out of Range', text: 'too far away to perceive or interact with' },
]

/** docs/05-combat/03-distances-movement.md — Movement */
export const MOVEMENT: string[] = [
	'1 Movement moves you to one area within short distance.',
	'Difficult terrain costs 2 Movement to enter and 1 Movement to move a close distance. You can spend it over several turns.',
	'Crawling, crouching, climbing and swimming count as difficult terrain.',
	'Move into or out of melee range once per turn for free, then 1 Movement each time. Leaving melee provokes Opportunity Attacks.',
	'Unprovoked movement triggers no Opportunity Attack or other reaction.',
]

/** docs/06-scenes/02-effect-durations.md */
export const DURATIONS: ReferenceLine[] = [
	{ term: 'Briefly', text: 'until the end of your next encounter turn' },
	{ term: 'Short', text: 'until a short break, or one delving turn' },
	{ term: 'Medium', text: 'one hour, or one exploration turn' },
	{ term: 'Long', text: "until the end of a night's rest, or one travel turn" },
	{ term: 'Very Long', text: 'one downtime turn' },
]

/**
 * The escape hatch for a conditions half that will not fit. EMPTY, and it should
 * stay that way (owner ruling, 2026-09-11).
 *
 * The sheet carries the FULL rules text of EVERY condition, because a condition
 * is looked up mid-turn and a paraphrase is the wrong thing to hand someone at
 * that moment. `deprived` and `suffocating` were dropped for a page they were
 * expected not to fit on; measured, the half had room, and the owner's reason
 * for putting them back is the stronger one: **the rarely used condition is
 * exactly the one a player has to look up.** A sheet that carries only the
 * familiar entries answers the questions nobody was going to ask.
 *
 * So this list is the last resort, not the first. If the half overruns after an
 * edit, in order: cut nothing and check the type size against the table in
 * `combatReferenceStyles.css`; then shorten the rules text in `conditions.json`
 * itself, which fixes the docs page too; and only then name a condition here,
 * taking the one least likely to be inflicted BY a combatant.
 */
export const CONDITIONS_OFF_SHEET: readonly string[] = []

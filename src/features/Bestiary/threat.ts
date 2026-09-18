/**
 * The encounter difficulty model, as pure functions.
 *
 * This is an implementation of published RULES, not a heuristic the tool made
 * up: every number here is on the
 * [Building Encounters](../../../docs/10-gm-tools/02-builder-tools/12-building-encounters.md)
 * page, and a GM can reach the same total with a pencil. When the two disagree,
 * the page is right and this file is the bug.
 *
 * Kept separate from any component for the same reason the filters are: the
 * model will be revised once it meets real tables, and a revision has to be
 * testable without driving a UI.
 */

/**
 * What a category is made of, and therefore what it costs.
 *
 * Threat Points are DERIVED rather than picked: a creature's cost is how many
 * turns they get to take across the whole fight, times how much each of those
 * turns is worth.
 *
 *   TP = life pools × turns per round × quality
 *
 * **Life pools belong here and nowhere else.** A second pool is a second fight
 * against the same creature: the party spends twice as long, and the creature
 * spends that whole time acting. That is why an Elite is four Basics rather
 * than two — the durability is not a separate axis from the action economy, it
 * is a multiplier ON it. Feeding pools into the action multiplier as well would
 * count the same fact twice.
 *
 * `quality` is what a category carries beyond bodies and turns: Resolve to
 * re-roll with, a trigger that fires when a pool empties, conditions cleared on
 * every Wound, and Morale that does not break. Two for both ranks that have any
 * of it, because the difference between an Elite's one Resolve and a Lord's
 * three is already carried by the pools and turns beside it.
 */
export const CATEGORY_PARTS: Record<
	string,
	{ pools: number; turns: number; quality: number }
> = {
	Basic: { pools: 1, turns: 1, quality: 1 },
	Elite: { pools: 2, turns: 1, quality: 2 },
	// Three pools AND a second turn each round. The old model priced a Lord at 8,
	// which counted the turns and then treated the third pool as a rounding
	// detail; it is not, it is a third fight.
	Lord: { pools: 3, turns: 2, quality: 2 },
}

/** Threat Points for one creature, by category. */
export const CATEGORY_TP: Record<string, number> = Object.fromEntries(
	Object.entries(CATEGORY_PARTS).map(([name, part]) => [
		name,
		part.pools * part.turns * part.quality,
	]),
)

/** The smallest group the troop rules recognise. */
export const MIN_TROOP_SIZE = 3

export type Difficulty = 'Trivial' | 'Easy' | 'Moderate' | 'Hard' | 'Deadly'

/** Ordered weakest to strongest, so a circumstance step is an index shift. */
export const DIFFICULTIES: Difficulty[] = [
	'Trivial',
	'Easy',
	'Moderate',
	'Hard',
	'Deadly',
]

/**
 * Budget multipliers against party size. Trivial is anything under Easy.
 *
 * Anchored on the game's own statement, made in three places: **a single
 * creature of a given tier is a decent challenge for one adventurer of the same
 * level.** One at-tier creature per adventurer is therefore the STANDARD fight,
 * and Moderate is party size × 1.
 *
 * These used to run 1 / 2 / 3 / 4, which put that even match at Easy and every
 * band one step too generous. It took eight at-tier creatures against four
 * adventurers to reach Hard, when twice the party's number is plainly a fight
 * they might lose.
 */
const BUDGET_MULTIPLIER: Record<Exclude<Difficulty, 'Trivial'>, number> = {
	Easy: 0.5,
	Moderate: 1,
	Hard: 2,
	Deadly: 3,
}

/**
 * How much a tier of difference is worth, by tier difference.
 *
 * ## Why this curve is gentle
 *
 * The first version halved a creature's worth for every tier below the party
 * and zeroed it at three, which meant a party gaining ONE level turned a Hard
 * fight into an Easy one. Nothing in the game moves that fast.
 *
 * Creature tiers scale linearly by design (+1 weapon damage, +1 defense, +10 HP
 * a tier), and adventurers scale slower still: **+2 HP per level** past the
 * first, so a Champion runs 20 HP at Level 1 and 42 at Level 10. A single level
 * of party advancement is a small change in what the party can take, so a
 * single tier of creature difference has to be a small change in what they
 * cost. The steep curve came from D&D-style reasoning, where both sides scale
 * exponentially. This system does not.
 *
 * The values still fall away faster than they rise, because a creature below
 * the party loses on two axes at once (their attacks land less often AND their
 * own life is shorter), while one above gains on the same two.
 *
 * A creature five or more tiers below is the one honest zero: at that distance
 * their damage is inside the party's armor value and they cannot land a hit
 * that matters.
 */
const TIER_STEPS: Record<number, number> = {
	[-4]: 0.15,
	[-3]: 0.3,
	[-2]: 0.45,
	[-1]: 0.7,
	0: 1,
	1: 1.4,
	2: 1.9,
	3: 2.5,
	4: 3.2,
}

export function tierMultiplier(
	creatureTier: number,
	partyLevel: number,
): number {
	const difference = creatureTier - partyLevel
	if (difference <= -5) return 0
	if (difference >= 5) return 4
	return TIER_STEPS[difference]
}

/**
 * One line of an encounter: several of the same creature, together or apart.
 *
 * `troop` is a real mechanical difference rather than a display choice. A troop
 * acts once however many members it has, so it changes both the Threat Points
 * and the action count.
 */
export interface EncounterLine {
	tier: number
	category: string
	count: number
	troop?: boolean
}

/**
 * What a group costs before the tier multiplier.
 *
 * A troop costs three quarters of its members' separate cost, rounded down and
 * never below 2. It acts once instead of once per member and loses members to
 * any area effect, but it deals damage even on a failed roll, which is what
 * keeps low-tier creatures relevant against a high-level party.
 */
export function baseThreat(line: EncounterLine): number {
	const each = CATEGORY_TP[line.category] ?? 0
	const total = each * line.count
	if (!line.troop) return total
	// Only Basic creatures form troops (Creature Rules), so a "troop" of Elites
	// is a data fault rather than a discount to be honoured.
	if (line.category !== 'Basic' || line.count < MIN_TROOP_SIZE) return total
	return Math.max(2, Math.floor(total * 0.75))
}

/**
 * A group's Threat Points against a party of the given level.
 *
 * The multiplier applies to the GROUP, not to each creature. Applied per
 * creature, a Basic one tier below the party rounds to nothing and six of them
 * cost nothing at all, which is the "ten goblins are free" bug in a different
 * shape.
 */
export function lineThreat(line: EncounterLine, partyLevel: number): number {
	const multiplier = tierMultiplier(line.tier, partyLevel)
	if (multiplier === 0) return 0
	const base = baseThreat(line)
	// Nearest whole point, not floored. Flooring made six creatures at 0.15 each
	// cost nothing at all, which reads as the tool ignoring them rather than
	// pricing them low. A single creature that far below still rounds to zero,
	// which is the honest answer for one of them.
	return multiplier < 1
		? Math.round(base * multiplier)
		: Math.ceil(base * multiplier)
}

/**
 * Turns per round, which is what a GM counts at the table.
 *
 * Deliberately NOT weighted by life pools. A creature's durability is already
 * priced into their category (see `CATEGORY_PARTS`), and the action multiplier
 * asks a different question: how outnumbered is the party in any given round.
 * An Elite is one turn a round whether they are on their first pool or their
 * second.
 */
export function lineActions(line: EncounterLine): number {
	if (line.troop && line.category === 'Basic' && line.count >= MIN_TROOP_SIZE)
		return 1
	return line.count * (CATEGORY_PARTS[line.category]?.turns ?? 1)
}

/** The four budget thresholds for a party of this size. */
export function budgets(partySize: number): Record<string, number> {
	return Object.fromEntries(
		Object.entries(BUDGET_MULTIPLIER).map(([name, factor]) => [
			name,
			// Rounded up, so an odd-sized party's Easy band cannot land on a half
			// point no creature can cost.
			Math.ceil(partySize * factor),
		]),
	)
}

/**
 * The band a total falls in. Deadly has no ceiling: past four times party size
 * a fight is not "very deadly", it is simply the fight the party might lose.
 */
export function difficultyFor(total: number, partySize: number): Difficulty {
	const budget = budgets(partySize)
	if (total >= budget.Deadly) return 'Deadly'
	if (total >= budget.Hard) return 'Hard'
	if (total >= budget.Moderate) return 'Moderate'
	if (total >= budget.Easy) return 'Easy'
	return 'Trivial'
}

/** Step a band up or down for circumstance, clamped at both ends. */
export function shiftDifficulty(
	difficulty: Difficulty,
	steps: number,
): Difficulty {
	const index = DIFFICULTIES.indexOf(difficulty)
	return DIFFICULTIES[
		Math.min(DIFFICULTIES.length - 1, Math.max(0, index + steps))
	]
}

/**
 * The circumstances that move a fight a whole step, from the rules page.
 *
 * `step` is the direction from the PARTY's point of view: positive is harder
 * for them.
 */
export const CIRCUMSTANCES: { id: string; label: string; step: number }[] = [
	{ id: 'creature-ground', label: 'Creatures hold the ground', step: 1 },
	{ id: 'creature-surprise', label: 'Creatures surprise the party', step: 1 },
	{ id: 'party-worn', label: 'Party is wounded or fatigued', step: 1 },
	{ id: 'hazard', label: 'A hazard threatens both sides', step: 1 },
	{ id: 'party-ground', label: 'Party holds the ground', step: -1 },
	{ id: 'party-surprise', label: 'Party surprises the creatures', step: -1 },
	{ id: 'healer', label: 'Party has a dedicated healer', step: -1 },
]

/**
 * How much the fight's action economy multiplies its cost.
 *
 * Threat Points priced a creature's own danger and nothing else, which made a
 * crowd of at-tier creatures read as mild: eight Basics against four
 * adventurers came to 8 TP, a Moderate fight, while actually taking eight turns
 * a round against the party's four. The side with more effective actions
 * usually wins, and the budget could not see it — the old model could only put
 * a warning next to a number it knew was wrong.
 *
 * Applied to the encounter TOTAL rather than to a group, because it is a fact
 * about the whole fight. Never below 1: a solo boss's danger is already carried
 * by their category, and discounting them for being outnumbered would price a
 * Lord as a lesser threat the more minions the party has to chew through.
 */
export const ACTION_STEPS: { upToRatio: number; multiplier: number }[] = [
	{ upToRatio: 1, multiplier: 1 },
	{ upToRatio: 1.5, multiplier: 1.25 },
	{ upToRatio: 2, multiplier: 1.5 },
	{ upToRatio: 3, multiplier: 2 },
	{ upToRatio: Infinity, multiplier: 2.5 },
]

export function actionMultiplier(
	creatureActions: number,
	partySize: number,
): number {
	const ratio = creatureActions / Math.max(1, partySize)
	return ACTION_STEPS.find((step) => ratio <= step.upToRatio)?.multiplier ?? 2.5
}

export interface EncounterAssessment {
	/** After the action multiplier, which is the number a GM reads. */
	total: number
	/** Before it, so the panel can show the multiplier doing its work. */
	baseTotal: number
	actionMultiplier: number
	difficulty: Difficulty
	/** After circumstance steps, which is what the GM should actually read. */
	adjusted: Difficulty
	budgets: Record<string, number>
	creatureActions: number
	notes: string[]
}

/**
 * The whole fight, assessed.
 *
 * The notes are the part a bare number cannot carry. A total inside the budget
 * can still be a fight the party loses, and every note here is a case where
 * that is true.
 */
export function assessEncounter(
	lines: EncounterLine[],
	partySize: number,
	partyLevel: number,
	circumstanceSteps = 0,
): EncounterAssessment {
	const baseTotal = lines.reduce(
		(sum, line) => sum + lineThreat(line, partyLevel),
		0,
	)
	/**
	 * Only creatures who can threaten the party count their turns.
	 *
	 * A dozen creatures three tiers below the party cost nothing, so letting
	 * their turns multiply an Elite standing behind them would price a rabble as
	 * a boss fight. They cost nothing and they count nothing.
	 */
	const creatureActions = lines
		.filter((line) => tierMultiplier(line.tier, partyLevel) > 0)
		.reduce((sum, line) => sum + lineActions(line), 0)
	const multiplier = actionMultiplier(creatureActions, partySize)
	const total = Math.ceil(baseTotal * multiplier)
	const difficulty = difficultyFor(total, partySize)
	const notes: string[] = []

	// Counted before the multiplier zeroes them, or the note can never fire.
	const trivial = lines.filter(
		(line) => line.count > 0 && tierMultiplier(line.tier, partyLevel) === 0,
	)
	if (trivial.length > 0)
		notes.push(
			'Some of these creatures are three or more tiers below the party and cannot ' +
				'meaningfully threaten them. They cost nothing and change nothing.',
		)

	const overTier = lines.filter((line) => line.tier - partyLevel >= 3)
	if (overTier.length > 0)
		notes.push(
			'A creature three or more tiers above the party is boss territory. Expect ' +
				'the fight to turn on their abilities rather than on the arithmetic.',
		)

	// The multiplier is IN the total now, so the note explains the number rather
	// than warning that the number is wrong.
	if (multiplier > 1)
		notes.push(
			`The creatures take ${creatureActions} turns a round against the party's ` +
				`${partySize}, which multiplies the cost by ${multiplier}. The side with ` +
				'more effective actions usually wins.',
		)

	return {
		total,
		baseTotal,
		actionMultiplier: multiplier,
		difficulty,
		adjusted: shiftDifficulty(difficulty, circumstanceSteps),
		budgets: budgets(partySize),
		creatureActions,
		notes,
	}
}

import { describe, it, expect } from 'vitest'
import {
	CATEGORY_PARTS,
	CATEGORY_TP,
	actionMultiplier,
	assessEncounter,
	baseThreat,
	budgets,
	difficultyFor,
	lineActions,
	lineThreat,
	shiftDifficulty,
	tierMultiplier,
} from '../threat'

/**
 * Every expectation here is a number a GM can reach with a pencil from
 * `docs/10-gm-tools/02-builder-tools/12-building-encounters.md`. Where a test
 * cites the page, the page is the authority and this file is the check.
 */
const basic = (tier: number, count = 1) => ({ tier, category: 'Basic', count })

describe('threat points', () => {
	it('derives a category from pools, turns and quality', () => {
		// Not picked numbers: every category is its own parts multiplied out, so a
		// revision to the mechanics moves the price rather than being re-guessed.
		for (const [name, part] of Object.entries(CATEGORY_PARTS)) {
			expect(CATEGORY_TP[name]).toBe(part.pools * part.turns * part.quality)
		}
		expect(CATEGORY_TP.Basic).toBe(1)
		// A life pool is a whole fight: an Elite comes back to full HP and sheds
		// every condition on their first Wound, so the party fights them twice and
		// the Elite acts through both.
		expect(CATEGORY_TP.Elite).toBe(4)
		// Three pools AND a second turn each round.
		expect(CATEGORY_TP.Lord).toBe(12)
	})

	it('counts a life pool once, in the category and not in the turns', () => {
		// Durability is already a multiplier on the action economy inside the
		// category's own price. Weighting the per-round turn count by pools as
		// well would charge the same fact twice.
		expect(lineActions({ tier: 5, category: 'Elite', count: 1 })).toBe(1)
		expect(lineActions({ tier: 5, category: 'Lord', count: 1 })).toBe(2)
	})

	it('discounts a troop against its members counted separately', () => {
		// The rules page's table, row for row.
		const troop = (count: number) =>
			baseThreat({ tier: 1, category: 'Basic', count, troop: true })
		expect(troop(3)).toBe(2)
		expect(troop(4)).toBe(3)
		expect(troop(6)).toBe(4)
		expect(troop(8)).toBe(6)
		expect(troop(10)).toBe(7)
	})

	it('ignores a troop too small to be one', () => {
		// Creature Rules put the floor at three. Two creatures are two creatures.
		expect(
			baseThreat({ tier: 1, category: 'Basic', count: 2, troop: true }),
		).toBe(2)
	})

	it('refuses a troop of Elites rather than discounting it', () => {
		// Only Basic creatures form troops, so this is a data fault and must not
		// quietly make two Elites cheaper than two Elites.
		expect(
			baseThreat({ tier: 4, category: 'Elite', count: 2, troop: true }),
		).toBe(8)
	})
})

describe('tier difference', () => {
	it('falls away faster than it rises, and gently in both directions', () => {
		expect(tierMultiplier(5, 5)).toBe(1)
		expect(tierMultiplier(4, 5)).toBe(0.7)
		expect(tierMultiplier(3, 5)).toBe(0.45)
		expect(tierMultiplier(1, 5)).toBe(0.15)
		expect(tierMultiplier(0, 5)).toBe(0)
		expect(tierMultiplier(6, 5)).toBe(1.4)
		expect(tierMultiplier(7, 5)).toBe(1.9)
		expect(tierMultiplier(10, 5)).toBe(4)
	})

	it('does not let one party level collapse a fight', () => {
		// The curve's whole reason for being gentle. Adventurers gain 2 HP a
		// level, so one level of advancement cannot turn a Hard fight into an
		// Easy one. Each step down is one band at most.
		const bands = [1, 2, 3, 4].map(
			(level) => assessEncounter([basic(1, 6)], 4, level).difficulty,
		)
		expect(bands).toEqual(['Hard', 'Moderate', 'Moderate', 'Easy'])
	})

	it('applies to the group, never to each creature', () => {
		// Six Tier 2 creatures against a Level 3 party are 6 TP at 0.7, so 4.
		// Taken per creature they would each round to nothing and the whole band
		// would be free, which is the "ten goblins are free" bug.
		expect(lineThreat(basic(2, 6), 3)).toBe(4)
		expect(lineThreat(basic(2, 1), 3)).toBe(1)
	})

	it('rounds to the nearest point below 1, and up above it', () => {
		// Six creatures at 0.15 each used to floor to nothing, which reads as the
		// tool ignoring them rather than pricing them low.
		expect(lineThreat(basic(1, 6), 5)).toBe(1)
		// One creature that far below still rounds to zero, which is honest.
		expect(lineThreat(basic(1, 1), 5)).toBe(0)
		expect(lineThreat({ tier: 6, category: 'Elite', count: 1 }, 5)).toBe(6)
	})

	it('costs nothing for creatures the party has wholly outgrown', () => {
		// Five tiers of distance: their damage is inside the party's armor value.
		expect(lineThreat(basic(0, 20), 5)).toBe(0)
	})
})

describe('budgets', () => {
	it('scales on party size alone', () => {
		// Party level is already carried by the tier multiplier, so it must not be
		// counted twice.
		expect(budgets(4)).toEqual({ Easy: 2, Moderate: 4, Hard: 8, Deadly: 12 })
	})

	it('rounds a half point up', () => {
		// No creature costs half a point, so no band may sit on one.
		expect(budgets(5).Easy).toBe(3)
	})

	it('anchors Moderate on one at-tier creature per adventurer', () => {
		// The game says so in three places: a single creature of a given tier is a
		// decent challenge for one adventurer of the same level. That even match is
		// the standard fight, and everything else is measured from it.
		for (const size of [1, 2, 3, 4, 5, 6]) {
			const assessment = assessEncounter([basic(3, size)], size, 3)
			expect(assessment.difficulty).toBe('Moderate')
		}
	})

	it('calls being outnumbered two to one Deadly', () => {
		// Eight at-tier creatures against four adventurers: 8 TP of creatures
		// taking twice the party's turns. Under the old 1/2/3/4 budget this was
		// Hard, which is what sent us looking at the scale.
		const assessment = assessEncounter([basic(1, 8)], 4, 1)
		expect(assessment.total).toBe(12)
		expect(assessment.difficulty).toBe('Deadly')
	})

	it('bands a total against them', () => {
		expect(difficultyFor(1, 4)).toBe('Trivial')
		expect(difficultyFor(2, 4)).toBe('Easy')
		expect(difficultyFor(4, 4)).toBe('Moderate')
		expect(difficultyFor(8, 4)).toBe('Hard')
		expect(difficultyFor(40, 4)).toBe('Deadly')
	})

	it('steps a band for circumstance and clamps at both ends', () => {
		expect(shiftDifficulty('Moderate', 1)).toBe('Hard')
		expect(shiftDifficulty('Moderate', -1)).toBe('Easy')
		expect(shiftDifficulty('Deadly', 2)).toBe('Deadly')
		expect(shiftDifficulty('Trivial', -2)).toBe('Trivial')
	})
})

describe('action economy', () => {
	it('multiplies on the ratio of turns, never below 1', () => {
		// A solo boss is not cheaper for being outnumbered: their danger is already
		// carried by their category.
		expect(actionMultiplier(1, 4)).toBe(1)
		expect(actionMultiplier(4, 4)).toBe(1)
		expect(actionMultiplier(6, 4)).toBe(1.25)
		expect(actionMultiplier(8, 4)).toBe(1.5)
		expect(actionMultiplier(12, 4)).toBe(2)
		expect(actionMultiplier(20, 4)).toBe(2.5)
	})

	it('prices a crowd of at-tier creatures as the fight it is', () => {
		// The case the multiplier was added for. Eight Basics used to come to 8 TP
		// and read as a standard fight while taking twice the party's turns.
		const assessment = assessEncounter([basic(5, 8)], 4, 5)
		expect(assessment.baseTotal).toBe(8)
		expect(assessment.actionMultiplier).toBe(1.5)
		expect(assessment.total).toBe(12)
		expect(assessment.difficulty).toBe('Deadly')
	})

	it('hands the action economy back when the crowd forms troops', () => {
		// The same eight creatures, gathered. One turn a round each troop, so no
		// multiplier, and the troop discount on top.
		const assessment = assessEncounter(
			[
				{ tier: 5, category: 'Basic', count: 4, troop: true },
				{ tier: 5, category: 'Basic', count: 4, troop: true },
			],
			4,
			5,
		)
		expect(assessment.actionMultiplier).toBe(1)
		expect(assessment.total).toBe(6)
		// The same eight bodies, two bands quieter, because the party keeps the
		// action economy.
		expect(assessment.difficulty).toBe('Moderate')
	})

	it('ignores the turns of creatures who cannot threaten the party', () => {
		// A dozen creatures three tiers below cost nothing, so they must not
		// multiply the Elite standing behind them into a boss fight.
		const assessment = assessEncounter(
			[{ tier: 5, category: 'Elite', count: 1 }, basic(0, 12)],
			4,
			5,
		)
		expect(assessment.creatureActions).toBe(1)
		expect(assessment.actionMultiplier).toBe(1)
		expect(assessment.total).toBe(4)
	})

	it('explains the multiplier rather than warning the total is wrong', () => {
		const assessment = assessEncounter([basic(3, 8)], 4, 3)
		expect(assessment.notes.join(' ')).toMatch(/multiplies the cost by 1.5/)
	})
})

describe('the rules page worked examples', () => {
	// A party of four at Level 5, aiming for Hard (12 TP).
	it('prices the leader with an organised warband at 10', () => {
		const assessment = assessEncounter(
			[
				{ tier: 5, category: 'Elite', count: 1 },
				{ tier: 5, category: 'Basic', count: 4, troop: true },
				{ tier: 5, category: 'Basic', count: 4, troop: true },
			],
			4,
			5,
		)
		// Three turns a round against the party's four, so no multiplier.
		expect(assessment.actionMultiplier).toBe(1)
		expect(assessment.total).toBe(10)
		expect(assessment.difficulty).toBe('Hard')
	})

	it('prices the boss with minions well past Deadly', () => {
		const assessment = assessEncounter(
			[
				{ tier: 5, category: 'Lord', count: 1 },
				{ tier: 5, category: 'Basic', count: 4 },
			],
			4,
			5,
		)
		// 16 TP of creatures taking six turns a round against the party's four:
		// half again as many, so 16 becomes 20.
		expect(assessment.baseTotal).toBe(16)
		expect(assessment.total).toBe(20)
		expect(assessment.difficulty).toBe('Deadly')
	})

	it('prices a solo at-tier Lord as a deadly duel', () => {
		// Twelve points and two turns a round, so no multiplier. A climactic duel
		// against a Lord of the party's own tier is exactly the fight Deadly
		// describes: life-threatening, and retreat a reasonable choice.
		const assessment = assessEncounter(
			[{ tier: 5, category: 'Lord', count: 1 }],
			4,
			5,
		)
		expect(assessment.total).toBe(12)
		expect(assessment.difficulty).toBe('Deadly')
	})

	it('prices one Tier 7 Elite against a Level 5 party at 8', () => {
		expect(lineThreat({ tier: 7, category: 'Elite', count: 1 }, 5)).toBe(8)
	})
})

describe('action count', () => {
	it('counts a troop once and a Lord twice', () => {
		expect(
			lineActions({ tier: 1, category: 'Basic', count: 8, troop: true }),
		).toBe(1)
		expect(lineActions(basic(1, 8))).toBe(8)
		expect(lineActions({ tier: 5, category: 'Lord', count: 1 })).toBe(2)
	})

	it('counts the turns the creatures actually take', () => {
		const assessment = assessEncounter([basic(3, 6)], 4, 3)
		expect(assessment.creatureActions).toBe(6)
		expect(assessment.notes.join(' ')).toMatch(/more effective actions/)
	})
})

describe('notes', () => {
	it('says when creatures are beneath the party rather than hiding them', () => {
		const assessment = assessEncounter([basic(0, 10)], 4, 5)
		expect(assessment.total).toBe(0)
		expect(assessment.notes.join(' ')).toMatch(/cannot meaningfully threaten/)
	})

	it('flags boss territory', () => {
		const assessment = assessEncounter(
			[{ tier: 8, category: 'Lord', count: 1 }],
			4,
			5,
		)
		// Two turns against four adventurers, so the multiplier leaves it alone.
		expect(assessment.total).toBe(30)
		expect(assessment.difficulty).toBe('Deadly')
		expect(assessment.notes.join(' ')).toMatch(/boss territory/)
	})

	it('reports the adjusted band beside the raw one', () => {
		// Two troops of six: 4 TP each, two turns a round, so no multiplier and a
		// clean 8 TP Hard for a party of four.
		const assessment = assessEncounter(
			[
				{ tier: 5, category: 'Basic', count: 6, troop: true },
				{ tier: 5, category: 'Basic', count: 6, troop: true },
			],
			4,
			5,
			1,
		)
		expect(assessment.total).toBe(8)
		expect(assessment.difficulty).toBe('Hard')
		expect(assessment.adjusted).toBe('Deadly')
	})
})

import { describe, it, expect } from 'vitest'
import { createReviewMockCharacter, getMockCharacters } from '../mockData'
import { ABILITY_TAGS } from '@site/src/types/AbilityTag'
import { ACTION_TYPES } from '@site/src/types/ActionType'

/**
 * The review fixture covers what it claims to (M13 S8c).
 *
 * The three characters before it grew one feature at a time and drifted: between
 * them they had no `Folk` ability, no `Other` ability, one Combat Art, no
 * `actionType` on anything, and — the one that mattered most — **no
 * `quickRefSelections` at all**, so Quick Ref could only ever be reviewed as its
 * empty state. A fixture whose whole job is coverage needs its coverage asserted,
 * or it rots the same way.
 */

const review = createReviewMockCharacter()
const abilities = review.skills.abilities

describe('the review character', () => {
	it('fills every ability category', () => {
		const covered = new Set(abilities.map((ability) => ability.tag))
		expect([...ABILITY_TAGS].filter((tag) => !covered.has(tag))).toEqual([])
	})

	it('puts at least two rows in every category', () => {
		// One row cannot show alignment, alternating rules, or a reserved track.
		const thin = [...ABILITY_TAGS].filter(
			(tag) => abilities.filter((a) => a.tag === tag).length < 2,
		)
		expect(thin).toEqual([])
	})

	it('exercises every action type', () => {
		const covered = new Set(abilities.map((ability) => ability.actionType))
		expect([...ACTION_TYPES].filter((type) => !covered.has(type))).toEqual([])
	})

	it('spans the talent rank range and includes an unassigned talent', () => {
		const talents = abilities.filter((a) => a.tag === 'Talent')
		const ranks = talents.map((t) => t.rank ?? 0)
		expect(Math.min(...ranks)).toBe(1)
		expect(Math.max(...ranks)).toBe(5)
		// The skill-less talent, so the unassigned case and the talent-point
		// warning both have something to report.
		expect(talents.some((t) => !t.skill)).toBe(true)
	})

	it('pins something of every kind in Quick Ref', () => {
		const pinned = review.skills.quickRefSelections
		expect(pinned).toBeDefined()
		expect(pinned!.abilities.length).toBeGreaterThan(0)
		expect(pinned!.weapons.length).toBeGreaterThan(0)
		expect(pinned!.items.length).toBeGreaterThan(0)
		expect(pinned!.spells.length).toBeGreaterThan(0)
	})

	it('pins ids that actually resolve', () => {
		// A pinned id that matches nothing renders no row while still counting
		// toward the header total — the live bug the survey found in Quick Ref.
		const pinned = review.skills.quickRefSelections!
		const has = (ids: string[], pool: { id: string }[]) =>
			ids.filter((id) => !pool.some((entry) => entry.id === id))

		expect(has(pinned.abilities, abilities)).toEqual([])
		expect(has(pinned.weapons, review.items.weapons)).toEqual([])
		expect(has(pinned.items, review.items.items)).toEqual([])
		expect(has(pinned.spells, review.spells.spells)).toEqual([])
	})

	/*
	 * The printed sheet's worst case (M17).
	 *
	 * Every limit on the four printed pages is a claim about a maximum — twelve
	 * skills is a game rule, five weapons is the extreme case, twenty-four carried
	 * items is what page two measurably holds. Those claims are only worth
	 * something if a fixture exercises them, and before M17 none did: the base
	 * character has nine skills, ONE weapon, three items and no equipment slot
	 * assigned anywhere, so the print layout had to be measured against a
	 * throwaway JSON file instead.
	 *
	 * These assert the fixture stays at the maxima. If a limit on the sheet
	 * changes, one of these fails and says so, rather than the fixture quietly
	 * drifting under it and the layout going untested again.
	 */
	describe('fills the printed sheet', () => {
		it('holds exactly the twelve skills the printed grid is built for', () => {
			// Twelve is a cap, not a convention (M17 D2), so the grid has no empty
			// place at the maximum.
			expect(review.skills.skills).toHaveLength(12)
			expect(review.skills.skills.every((skill) => skill.name)).toBe(true)
		})

		it('gives the two-column ability block thirty entries', () => {
			expect(abilities.length).toBeGreaterThanOrEqual(30)
		})

		it('carries the five weapons the printed block reserves', () => {
			const worn = review.items.weapons.filter((w) => w.location === 'worn')
			expect(worn).toHaveLength(5)
			// A nameless weapon is an editor row, not a weapon, and the sheet filters
			// them out — so a fixture full of them would prove nothing.
			expect(worn.every((weapon) => weapon.name)).toBe(true)
		})

		it('fills all eight worn equipment slots', () => {
			const filled = new Set(
				review.items.items
					.filter((item) => item.location === 'worn' && item.slot)
					.map((item) => item.slot),
			)
			expect(filled.size).toBe(8)
		})

		it('wears one thing with no slot, which the panel has to place', () => {
			// The printed worn panel grows past its eight fixed slots to hold these
			// (M17, owner review). Before, they fell through into carried inventory.
			const unslotted = review.items.items.filter(
				(item) => item.location === 'worn' && !item.slot,
			)
			expect(unslotted.length).toBeGreaterThan(0)
		})

		it('gives worn kit the properties, load and cost the panel prints', () => {
			// The panel's second line would look correct and prove nothing against a
			// fixture of empty arrays and zeroes.
			const worn = review.items.items.filter(
				(item) => item.location === 'worn' && item.slot,
			)
			expect(worn.every((item) => (item.properties?.length ?? 0) > 0)).toBe(
				true,
			)
			expect(worn.every((item) => (item.cost ?? 0) > 0)).toBe(true)
		})

		it('shows every state of a carried item wear track', () => {
			// Three pips, so four states: untouched through fully used up.
			const states = new Set(
				review.items.items
					.filter((item) => item.location === 'carried')
					.map((item) => item.uses),
			)
			expect([...states].sort()).toEqual([0, 1, 2, 3])
		})

		it('carries exactly the twenty-four items page two holds', () => {
			// On the boundary on purpose: the next item added is the one the block
			// has to report in its overflow note rather than show.
			const carried = review.items.items.filter((i) => i.location === 'carried')
			expect(carried).toHaveLength(24)
		})

		it('knows enough spells to fill the spell table', () => {
			expect(review.spells.spells.length).toBeGreaterThanOrEqual(11)
			// The printed Damage cell is empty for a spell that deals none — the
			// column-shifting bug the M16 rebuild fixed needs both cases present.
			const spells = review.spells.spells
			expect(spells.some((spell) => spell.dealsDamage)).toBe(true)
			expect(spells.some((spell) => !spell.dealsDamage)).toBe(true)
		})

		it('prints a state, not just numbers', () => {
			// The three values the sheet renders as a condition: the wounded word
			// under an attribute die, and the two pools a pencil goes over.
			const stats = review.statistics
			const attributes = [
				stats.strength,
				stats.agility,
				stats.spirit,
				stats.mind,
			]
			expect(attributes.some((attribute) => attribute.wounded)).toBe(true)
			expect(stats.health.temp).toBeGreaterThan(0)
			expect(stats.fatigue!.current).toBeGreaterThan(0)
		})
	})

	it('is offered alongside the others, under its own id', () => {
		const all = getMockCharacters()
		const ids = all.map((character) => character.docId)
		expect(ids).toContain('mock-character-review')
		expect(new Set(ids).size).toBe(ids.length)
	})
})

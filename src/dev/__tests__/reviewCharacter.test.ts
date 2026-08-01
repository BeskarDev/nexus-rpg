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

	it('is offered alongside the others, under its own id', () => {
		const all = getMockCharacters()
		const ids = all.map((character) => character.docId)
		expect(ids).toContain('mock-character-review')
		expect(new Set(ids).size).toBe(ids.length)
	})
})

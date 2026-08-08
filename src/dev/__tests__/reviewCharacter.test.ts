import { describe, it, expect } from 'vitest'
import { createReviewMockCharacter, getMockCharacters } from '../mockData'
import { ABILITY_TAGS } from '@site/src/types/AbilityTag'
import { ACTION_TYPES } from '@site/src/types/ActionType'
import talentData from '@site/src/utils/data/json/talents.json'
import combatArtData from '@site/src/utils/data/json/combat-arts.json'
import folkData from '@site/src/utils/data/json/folk.json'

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

/**
 * The fixture's abilities have to be REAL CONTENT (M20).
 *
 * Everything above asserts SHAPE — the categories, the counts, the action types.
 * All of it stayed green while the thirty abilities were invented one-liners,
 * which is how three faults survived: talents summarised to one sentence (so a
 * deck printing the real rank ladder looked like it was losing text), three
 * combat arts carrying action types no combat art can have, and a
 * `personal.folk` of `Akashic` — not a folk, not a culture, and in no document
 * under `docs/`.
 *
 * Shape is not enough for a fixture whose job is to show the real thing. These
 * assert the CONTENT.
 */
describe('the review character is built from the catalogues', () => {
	const talents = new Map(
		(
			talentData as {
				name: string
				'skill requirement': string
				description: string
			}[]
		).map((talent) => [talent.name, talent]),
	)
	const arts = new Map(
		(combatArtData as { name: string; effect: string }[]).map((art) => [
			art.name,
			art,
		]),
	)
	const folk = (
		folkData as {
			name: string
			abilities: { name: string; description: string }[]
		}[]
	).find((entry) => entry.name === review.personal.folk)

	it('names a folk that exists', () => {
		expect(
			folk,
			`personal.folk "${review.personal.folk}" is not in folk.json`,
		).toBeDefined()
	})

	it('copies every talent verbatim, ladder and skill requirement included', () => {
		const rows = abilities.filter((ability) => ability.tag === 'Talent')
		expect(rows.length).toBeGreaterThan(0)
		rows.forEach((ability) => {
			const talent = talents.get(ability.title)
			expect(talent, `"${ability.title}" is not in talents.json`).toBeDefined()
			// The WHOLE ladder, because that is what `buildTalentFields` copies onto
			// a real character (M20 F3).
			expect(ability.description, ability.title).toBe(talent!.description)
			// One talent drops its skill on purpose, for the unassigned case. Any
			// other must carry the catalogue's own requirement.
			if (ability.skill) {
				expect(ability.skill, ability.title).toBe(talent!['skill requirement'])
			}
		})
	})

	it('copies every combat art verbatim, and every one of them is an Action', () => {
		const rows = abilities.filter((ability) => ability.tag === 'Combat Art')
		expect(rows.length).toBeGreaterThan(0)
		rows.forEach((ability) => {
			const art = arts.get(ability.title)
			expect(art, `"${ability.title}" is not in combat-arts.json`).toBeDefined()
			expect(ability.description, ability.title).toBe(art!.effect)
			// Every art in the corpus is a rider on an attack, so no combat art can
			// be Passive, Free or Triggered however convenient that is for coverage.
			expect(ability.actionType, ability.title).toBe('Action')
		})
	})

	it("copies the folk's own abilities verbatim", () => {
		const rows = abilities.filter((ability) => ability.tag === 'Folk')
		expect(rows.length).toBeGreaterThan(0)
		rows.forEach((ability) => {
			const source = folk!.abilities.find(
				(entry) => entry.name === ability.title,
			)
			expect(
				source,
				`"${ability.title}" is not an ability of ${folk!.name}`,
			).toBeDefined()
			expect(ability.description, ability.title).toBe(source!.description)
		})
	})

	it('leaves only Other hand-written, which has no catalogue and never will', () => {
		// M20 F2: the sheet's free-text bucket. Nothing generates it, so nothing
		// can be checked against — that is what the bucket IS, not a gap.
		const rows = abilities.filter((ability) => ability.tag === 'Other')
		expect(rows.length).toBeGreaterThan(0)
		rows.forEach((ability) => {
			expect(talents.has(ability.title)).toBe(false)
			expect(arts.has(ability.title)).toBe(false)
		})
	})
})

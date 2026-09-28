import { describe, expect, it } from 'vitest'
import { deriveCharacter } from '../deriveCharacter'
import { migrateCharacterData } from '../characterMigration'
import { staleDerivedFields } from '../../hooks/useSyncDerivedCharacter'
import { getItemLoad } from '../../CharacterSheetTabs/02_Items/utils/itemUtils'
import { createDerivationFixture } from './deriveCharacterFixture'

describe('deriveCharacter', () => {
	const derived = deriveCharacter(createDerivationFixture())

	describe('level', () => {
		it('comes from spent XP (the sum of skill XP), not total XP', () => {
			expect(derived.spentXp).toBe(35)
			// 60 total XP would read as level 7.
			expect(derived.level).toBe(5)
		})

		it('ignores a stale stored spend', () => {
			const char = createDerivationFixture()
			char.skills.xp.spend = 0
			expect(deriveCharacter(char).level).toBe(5)
		})
	})

	describe('skill ranks', () => {
		it('come from each skill XP, not the stored rank', () => {
			expect(derived.skillRanks).toEqual({
				Fighting: 3,
				Athletics: 2,
				Perception: 1,
				Mysticism: 2,
			})
		})
	})

	describe('HP', () => {
		it('derives the talent bonus when health.auto is missing', () => {
			expect(derived.hp.auto).toBe(2)
		})

		it('adds base, level bonus, auto and modifier', () => {
			expect(derived.hp).toMatchObject({
				base: 22,
				levelBonus: 8,
				modifier: 1,
				max: 33,
			})
		})

		it('takes 2 per Fatigue off the effective maximum', () => {
			expect(derived.hp.fatiguePenalty).toBe(4)
			expect(derived.hp.effectiveMax).toBe(29)
		})

		it('ignores a stale stored health.auto', () => {
			const char = createDerivationFixture()
			char.statistics.health.auto = 10
			expect(deriveCharacter(char).hp.max).toBe(33)
		})

		it('grants Pact of Divinity (Protection) 2 HP per Mysticism rank', () => {
			const char = createDerivationFixture()
			char.skills.abilities = [
				{
					id: 'pact',
					title: 'Pact of Divinity',
					description: 'Choose a pact: Protection.',
					tag: 'Talent',
					rank: 1,
				},
			]
			// Mysticism 6 XP is rank 2, although it is stored as rank 0.
			expect(deriveCharacter(char).hp.auto).toBe(4)
		})
	})

	describe('defences', () => {
		it('derives Parry from Fighting, level and shield, keeping other', () => {
			expect(derived.parry).toEqual({
				base: 10,
				levelBonus: 2,
				shieldBonus: 0,
				other: 1,
				total: 13,
			})
		})

		it('reads a legacy total with no details as the truth', () => {
			expect(derived.dodge).toEqual({
				base: 9,
				levelBonus: 2,
				other: 2,
				total: 13,
			})
		})

		it('ignores stale stored base and level bonus', () => {
			expect(derived.resist).toEqual({
				base: 9,
				levelBonus: 2,
				other: 0,
				total: 11,
			})
		})
	})

	describe('AV', () => {
		it('derives armor from the worn kit and the folk bonus from abilities', () => {
			expect(derived.av).toEqual({
				armor: 2,
				helmet: 0,
				shield: 0,
				auto: 1,
				other: 1,
				total: 4,
			})
		})
	})

	describe('Focus', () => {
		it('derives max Focus with the talent bonus and the derived rank', () => {
			expect(derived.focus).toEqual({ auto: 2, modifier: 1, max: 13 })
		})

		it('is 0 without a magic skill', () => {
			const char = createDerivationFixture()
			char.spells.magicSkill = ''
			expect(deriveCharacter(char).focus.max).toBe(0)
		})
	})

	describe('load', () => {
		it('sums items that hold only load, times their amount', () => {
			expect(derived.load.current).toBe(11)
		})

		it('counts per location, with mount and storage apart', () => {
			expect(derived.load.byLocation).toEqual({
				worn: 3,
				carried: 8,
				mount: 5,
				storage: 0,
			})
		})

		it('derives capacity from Strength and the carry modifier', () => {
			expect(derived.load.carryCapacity).toBe(13)
			expect(derived.load.maxCapacity).toBe(26)

			const char = createDerivationFixture()
			char.items.encumbrance.carryModifier = 2
			expect(deriveCharacter(char).load.carryCapacity).toBe(15)
		})
	})
})

describe('getItemLoad', () => {
	it('reads load times amount', () => {
		const base = createDerivationFixture().items.items[0]
		expect(getItemLoad({ ...base, load: 2, amount: 3 })).toBe(6)
		expect(getItemLoad({ ...base, load: 0, amount: 1 })).toBe(0)
		expect(getItemLoad({ ...base, load: undefined, amount: 4 })).toBe(0)
	})

	it('counts a weapon once, whatever its ammunition amount', () => {
		const dagger = createDerivationFixture().items.weapons[1]
		expect(getItemLoad(dagger)).toBe(1)
	})
})

describe('migrateCharacterData', () => {
	it('renames a legacy item weight to load', () => {
		const char = createDerivationFixture()
		const legacy = {
			...char.items.items[0],
			name: 'Waterskin',
			load: undefined,
		}
		char.items.items = [{ ...legacy, weight: 2 } as typeof legacy]
		const [waterskin] = migrateCharacterData(char).items.items
		expect(waterskin.load).toBe(2)
		expect(waterskin).not.toHaveProperty('weight')
	})

	it('creates legacy defence details that keep the stored total', () => {
		const char = createDerivationFixture()
		const before = deriveCharacter(char).dodge.total
		const migrated = migrateCharacterData(char)
		expect(migrated.statistics.dodgeDetails).toEqual({
			base: 9,
			levelBonus: 2,
			other: 2,
		})
		expect(deriveCharacter(migrated).dodge.total).toBe(before)
	})
})

describe('staleDerivedFields', () => {
	it('lists every stored copy that disagrees with the derivation', () => {
		const char = createDerivationFixture()
		const update = staleDerivedFields(char, deriveCharacter(char))
		expect(update).toMatchObject({
			skills: { xp: { spend: 35 } },
			statistics: {
				health: { auto: 2 },
				av: { armor: 2, helmet: 0, shield: 0, auto: 1 },
				parryDetails: { base: 10, levelBonus: 2, shieldBonus: 0 },
				resistDetails: { base: 9, levelBonus: 2 },
				parry: 13,
				resist: 11,
			},
			spells: { focus: { auto: 2, total: 13 } },
			items: {
				encumbrance: {
					currentLoad: 11,
					encumberedAt: 13,
					overencumberedAt: 26,
				},
			},
		})
		// A legacy dodge total already reads what the derivation reads.
		expect(update?.statistics?.dodge).toBeUndefined()
	})

	it('is null once the copies are current', () => {
		const char = createDerivationFixture()
		const derived = deriveCharacter(char)
		const synced = {
			...char,
			skills: { ...char.skills, xp: { ...char.skills.xp, spend: 35 } },
			statistics: {
				...char.statistics,
				health: { ...char.statistics.health, auto: 2 },
				av: { ...char.statistics.av, armor: 2, helmet: 0, shield: 0, auto: 1 },
				parryDetails: {
					...char.statistics.parryDetails!,
					base: 10,
					levelBonus: 2,
					shieldBonus: 0,
				},
				resistDetails: {
					...char.statistics.resistDetails!,
					base: 9,
					levelBonus: 2,
				},
				parry: 13,
				resist: 11,
			},
			spells: {
				...char.spells,
				focus: { ...char.spells.focus, auto: 2, total: 13 },
			},
			items: {
				...char.items,
				encumbrance: {
					...char.items.encumbrance,
					currentLoad: 11,
					encumberedAt: 13,
					overencumberedAt: 26,
				},
			},
		}
		expect(staleDerivedFields(synced, derived)).toBeNull()
	})
})

import { describe, it, expect } from 'vitest'
import { calculateMaxHp } from '../calculateHp'
import { calculateTalentHpBonus } from '../calculateTalentHpBonus'
import { calculateFolkAvBonus } from '../calculateFolkAvBonus'

describe('Stat Bonuses Separation', () => {
	describe('HP Calculations', () => {
		it('should calculate max HP with both user modifier and talent bonus', () => {
			// d8 STR at level 1 with no modifiers
			const baseMaxHp = calculateMaxHp(8, 0, 0, 0)
			expect(baseMaxHp).toBe(20) // Base HP for d8 STR

			// With user modifier only
			const withUserModifier = calculateMaxHp(8, 0, 5, 0)
			expect(withUserModifier).toBe(25) // 20 + 5

			// With talent bonus only
			const withTalentBonus = calculateMaxHp(8, 0, 0, 4)
			expect(withTalentBonus).toBe(24) // 20 + 4

			// With both modifiers
			const withBoth = calculateMaxHp(8, 0, 5, 4)
			expect(withBoth).toBe(29) // 20 + 5 + 4
		})

		it('should keep user modifier and talent bonus independent', () => {
			// User sets maxHpModifier to 3
			const userModifier = 3
			// Talents grant 4 HP
			const talentBonus = 4

			// Total should be base + userModifier + talentBonus
			const total = calculateMaxHp(8, 0, userModifier, talentBonus)

			// If user changes their modifier, talent bonus should be unaffected
			const newUserModifier = 0
			const totalAfterUserChange = calculateMaxHp(
				8,
				0,
				newUserModifier,
				talentBonus,
			)
			expect(totalAfterUserChange).toBe(24) // 20 + 0 + 4

			// If talents change, user modifier should be unaffected
			const newTalentBonus = 0
			const totalAfterTalentChange = calculateMaxHp(
				8,
				0,
				userModifier,
				newTalentBonus,
			)
			expect(totalAfterTalentChange).toBe(23) // 20 + 3 + 0
		})

		it('should calculate talent HP bonus from abilities', () => {
			// Character with Bulky talent (rank 1 = +2 HP)
			const abilitiesWithBulky = [
				{
					id: '1',
					title: 'Bulky',
					description: '(Rank 1) Gain +2 HP. Add +2 to your carrying capacity.',
					tag: 'Talent' as const,
					rank: 1,
				},
			]
			expect(calculateTalentHpBonus(abilitiesWithBulky, 0)).toBe(2)

			// Character with Bulky talent (rank 2 = +4 HP)
			const abilitiesWithBulkyRank2 = [
				{
					id: '1',
					title: 'Bulky',
					description:
						'(Rank 1) Gain +2 HP. Add +2 to your carrying capacity.\n\n(Rank 2) Gain +2 HP. Add +3 to your carrying capacity instead.',
					tag: 'Talent' as const,
					rank: 2,
				},
			]
			expect(calculateTalentHpBonus(abilitiesWithBulkyRank2, 0)).toBe(4)

			// Character with no HP-granting talents
			const abilitiesWithoutHpTalent = [
				{
					id: '1',
					title: 'Quick Draw',
					description: 'You can draw weapons quickly.',
					tag: 'Talent' as const,
					rank: 1,
				},
			]
			expect(calculateTalentHpBonus(abilitiesWithoutHpTalent, 0)).toBe(0)
		})

		it('should parse HP bonus from rank descriptions flexibly', () => {
			// Test with the example from the user (Bulky rank 3)
			const bulkyRank3 = [
				{
					id: '1',
					title: 'Bulky',
					description:
						'(Rank 1) Gain +2 HP. Add +2 to your carrying capacity.\n\n' +
						'(Rank 2) Gain +2 HP. You gain the following abilities:\n' +
						'- Add +3 to your carrying capacity instead.\n' +
						'- When you are moving through difficult terrain or otherwise are required to spend extra Movement, you can use your Quick Action to move without spending extra Movement for the rest of your turn.\n\n' +
						'(Rank 3) Gain +2 HP. You gain the following abilities:\n' +
						'- Add +4 to your carrying capacity instead.\n' +
						'- While grappling, being grappled, or restrained, you count as a creature one Size larger than normal.',
					tag: 'Talent' as const,
					rank: 3,
				},
			]
			expect(calculateTalentHpBonus(bulkyRank3, 0)).toBe(6) // +2 HP per rank = 6 total

			// Test with rank 2 of the same talent
			const bulkyRank2 = [
				{
					id: '1',
					title: 'Bulky',
					description:
						'(Rank 1) Gain +2 HP. Add +2 to your carrying capacity.\n\n' +
						'(Rank 2) Gain +2 HP. You gain the following abilities:\n' +
						'- Add +3 to your carrying capacity instead.',
					tag: 'Talent' as const,
					rank: 2,
				},
			]
			expect(calculateTalentHpBonus(bulkyRank2, 0)).toBe(4) // +2 HP for rank 1 and 2 = 4 total

			// Test with different HP bonus amounts (if ever needed)
			const variableHpBonus = [
				{
					id: '1',
					title: 'Test Talent',
					description:
						'(Rank 1) Gain +3 HP. Some ability.\n\n(Rank 2) Gain +4 HP. Better ability.',
					tag: 'Talent' as const,
					rank: 2,
				},
			]
			expect(calculateTalentHpBonus(variableHpBonus, 0)).toBe(7) // +3 + +4 = 7

			// Test with talent that has HP bonus in only some ranks
			const partialHpBonus = [
				{
					id: '1',
					title: 'Partial HP',
					description:
						'(Rank 1) Gain +2 HP. Some ability.\n\n(Rank 2) You gain better abilities but no HP.',
					tag: 'Talent' as const,
					rank: 2,
				},
			]
			expect(calculateTalentHpBonus(partialHpBonus, 0)).toBe(2) // Only rank 1 has HP bonus
		})
	})

	describe('AV Calculations', () => {
		it('should calculate folk AV bonus from abilities', () => {
			// Character with Stoneskin folk ability (+1 AV)
			const abilitiesWithStoneskin = [
				{
					id: '1',
					title: 'Stoneskin',
					description: 'Your skin is tough as stone.',
					tag: 'Folk' as const,
				},
			]
			expect(calculateFolkAvBonus(abilitiesWithStoneskin, false)).toBe(1)

			// Character with Thick Scales folk ability (+3 AV without armor)
			const abilitiesWithThickScales = [
				{
					id: '1',
					title: 'Thick Scales',
					description: 'Your scales provide natural protection.',
					tag: 'Folk' as const,
				},
			]
			expect(calculateFolkAvBonus(abilitiesWithThickScales, false)).toBe(3)

			// Thick Scales with armor equipped (+1 AV instead)
			expect(calculateFolkAvBonus(abilitiesWithThickScales, true)).toBe(1)
		})

		it('should return 0 for characters without AV-granting folk abilities', () => {
			const abilitiesWithoutAvBonus = [
				{
					id: '1',
					title: 'Darkvision',
					description: 'You can see in darkness.',
					tag: 'Folk' as const,
				},
			]
			expect(calculateFolkAvBonus(abilitiesWithoutAvBonus, false)).toBe(0)
		})
	})

	describe('User Override Preservation', () => {
		it('should allow independent user overrides for HP', () => {
			// Scenario: User has a custom HP modifier and adds a talent
			const initialUserModifier = 3
			const initialTalentBonus = 0

			// Initial HP calculation
			const initialHp = calculateMaxHp(8, 0, initialUserModifier, initialTalentBonus)
			expect(initialHp).toBe(23) // 20 + 3 + 0

			// User adds Bulky talent (rank 1)
			const newTalentBonus = 2

			// HP should increase by talent bonus, user modifier remains
			const newHp = calculateMaxHp(8, 0, initialUserModifier, newTalentBonus)
			expect(newHp).toBe(25) // 20 + 3 + 2

			// User's modifier is still preserved
			expect(newHp - newTalentBonus - 20).toBe(initialUserModifier)
		})

		it('should allow independent user overrides for AV', () => {
			// User has set av.other to 2 for a magic ring effect
			const userAvOther = 2

			// Folk bonus is calculated separately
			const abilitiesWithStoneskin = [
				{
					id: '1',
					title: 'Stoneskin',
					description: 'Your skin is tough as stone.',
					tag: 'Folk' as const,
				},
			]
			const folkBonus = calculateFolkAvBonus(abilitiesWithStoneskin, false)

			// Total AV "other" sources = user override + folk bonus
			const totalOtherAv = userAvOther + folkBonus
			expect(totalOtherAv).toBe(3) // 2 (user) + 1 (folk)

			// If user changes their override, folk bonus is unaffected
			const newUserAvOther = 0
			const newTotalOtherAv = newUserAvOther + folkBonus
			expect(newTotalOtherAv).toBe(1) // 0 (user) + 1 (folk)
		})
	})
})

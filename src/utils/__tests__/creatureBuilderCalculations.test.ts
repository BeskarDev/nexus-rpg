import { describe, it, expect } from 'vitest'
import {
	getTierData,
	getArchetypeData,
	getSizeData,
	calculateHP,
	calculateAV,
	calculateDefense,
	getMaxAttribute,
	getWeaponDamage,
	validateTier,
	calculateBaseDamage,
	formatDamageString,
} from '../creatureBuilderCalculations'

describe('creatureBuilderCalculations', () => {
	describe('getTierData', () => {
		it('should return tier data for valid tier', () => {
			const tier0 = getTierData(0)
			expect(tier0).toBeDefined()
			expect(tier0?.tier).toBe(0)
			expect(tier0?.hp).toBe(5)

			const tier5 = getTierData(5)
			expect(tier5).toBeDefined()
			expect(tier5?.tier).toBe(5)
			expect(tier5?.hp).toBe(50)
		})

		it('should return null for invalid tier', () => {
			expect(getTierData(-1)).toBeNull()
			expect(getTierData(11)).toBeNull()
		})
	})

	describe('getArchetypeData', () => {
		it('should return archetype data for valid archetype', () => {
			const standard = getArchetypeData('Standard')
			expect(standard).toBeDefined()
			expect(standard?.name).toBe('Standard')
			expect(standard?.hpModifier).toBe(0)

			const bruiser = getArchetypeData('Bruiser')
			expect(bruiser).toBeDefined()
			expect(bruiser?.hpModifier).toBe(1)
		})

		it('should return null for invalid archetype', () => {
			expect(getArchetypeData('InvalidArchetype')).toBeNull()
		})
	})

	describe('getSizeData', () => {
		it('should return size data for valid size', () => {
			const medium = getSizeData('Medium')
			expect(medium).toBeDefined()
			expect(medium?.name).toBe('Medium')
			expect(medium?.modifier).toBe(0)

			const large = getSizeData('Large')
			expect(large).toBeDefined()
			expect(large?.modifier).toBe(1)
		})

		it('should return null for invalid size', () => {
			expect(getSizeData('InvalidSize')).toBeNull()
		})
	})

	describe('calculateHP', () => {
		it('should calculate basic HP correctly', () => {
			const result = calculateHP(4, 'Standard', 'Basic')
			expect(result.display).toBe('40')
			expect(result.base).toBe(40)
		})

		it('should calculate elite HP correctly', () => {
			const result = calculateHP(4, 'Standard', 'Elite')
			expect(result.display).toBe('2×40')
			expect(result.base).toBe(40)
		})

		it('should calculate lord HP correctly', () => {
			const result = calculateHP(4, 'Standard', 'Lord')
			expect(result.display).toBe('3×40')
			expect(result.base).toBe(40)
		})

		it('should apply archetype HP modifier', () => {
			const bruiser = calculateHP(4, 'Bruiser', 'Basic')
			expect(bruiser.base).toBe(50) // Tier 5 HP (4 + 1 modifier)

			const defender = calculateHP(4, 'Defender', 'Basic')
			expect(defender.base).toBe(60) // Tier 6 HP (4 + 2 modifier)
		})

		it('should use custom HP when provided', () => {
			const result = calculateHP(4, 'Standard', 'Elite', 100)
			expect(result.display).toBe('2×100')
			expect(result.base).toBe(100)
		})
	})

	describe('calculateAV', () => {
		it('should calculate light armor AV', () => {
			const av = calculateAV(4, 'Standard', 'Medium')
			expect(av).toBe('4')
		})

		it('should calculate heavy armor AV', () => {
			const av = calculateAV(4, 'Defender', 'Medium')
			expect(av).toBe('8')
		})

		it('should apply size modifier', () => {
			const large = calculateAV(4, 'Standard', 'Large')
			expect(large).toBe('5') // 4 + 1 size modifier

			const small = calculateAV(4, 'Standard', 'Small')
			expect(small).toBe('3') // 4 - 1 size modifier
		})

		it('should use custom AV when provided', () => {
			const av = calculateAV(4, 'Standard', 'Medium', 15)
			expect(av).toBe('15')
		})
	})

	describe('calculateDefense', () => {
		it('should calculate base defense', () => {
			const parry = calculateDefense(4, 'Standard', 'Medium', 'parry')
			expect(parry).toBe(10) // Base defense for tier 4
		})

		it('should apply archetype modifiers', () => {
			const bruiser = calculateDefense(4, 'Bruiser', 'Medium', 'parry')
			expect(bruiser).toBe(12) // Tier 6 defense (4 + 2 parry modifier)

			const ambusher = calculateDefense(4, 'Ambusher', 'Medium', 'dodge')
			expect(ambusher).toBe(12) // Tier 6 defense (4 + 2 dodge modifier)
		})

		it('should apply size modifiers', () => {
			const large = calculateDefense(4, 'Standard', 'Large', 'parry')
			expect(large).toBe(11) // Tier 5 defense (4 + 1 size modifier)

			const largeDodge = calculateDefense(4, 'Standard', 'Large', 'dodge')
			expect(largeDodge).toBe(9) // Tier 3 defense (4 - 1 size modifier)
		})

		it('should use custom defense when provided', () => {
			const defense = calculateDefense(4, 'Standard', 'Medium', 'parry', 15)
			expect(defense).toBe(15)
		})
	})

	describe('getMaxAttribute', () => {
		it('should return correct attribute die for tier', () => {
			expect(getMaxAttribute(0)).toBe('d6')
			expect(getMaxAttribute(2)).toBe('d8')
			expect(getMaxAttribute(4)).toBe('d10')
			expect(getMaxAttribute(6)).toBe('d12')
			expect(getMaxAttribute(8)).toBe('d12+1')
			expect(getMaxAttribute(10)).toBe('d12+2')
		})
	})

	describe('getWeaponDamage', () => {
		it('should return correct weapon damage for tier', () => {
			expect(getWeaponDamage(0, 'Standard')).toBe(2)
			expect(getWeaponDamage(4, 'Standard')).toBe(6)
			expect(getWeaponDamage(10, 'Standard')).toBe(12)
		})

		it('should apply archetype damage modifier', () => {
			expect(getWeaponDamage(4, 'Artillery')).toBe(7) // Tier 5 damage (4 + 1)
			expect(getWeaponDamage(4, 'Horde')).toBe(4) // Tier 2 damage (4 - 2)
		})
	})

	describe('validateTier', () => {
		it('should validate creature stats within tier range', () => {
			const result = validateTier(4, 40, 4, 10, 10, 10)
			expect(result.valid).toBe(true)
			expect(result.warnings).toHaveLength(0)
		})

		it('should warn about HP outside tier range', () => {
			const result = validateTier(4, 100, 4, 10, 10, 10)
			expect(result.valid).toBe(false)
			expect(result.warnings.length).toBeGreaterThan(0)
			expect(result.warnings[0]).toContain('HP')
		})

		it('should warn about AV outside tier range', () => {
			const result = validateTier(4, 40, 25, 10, 10, 10)
			expect(result.valid).toBe(false)
			expect(result.warnings.length).toBeGreaterThan(0)
			expect(result.warnings[0]).toContain('AV')
		})

		it('should warn about defense average outside tier range', () => {
			const result = validateTier(4, 40, 4, 20, 20, 20)
			expect(result.valid).toBe(false)
			expect(result.warnings.length).toBeGreaterThan(0)
			expect(result.warnings[0]).toContain('defense')
		})
	})

	describe('calculateBaseDamage', () => {
		it('should calculate base damage from attribute die', () => {
			expect(calculateBaseDamage('d4')).toBe(2)
			expect(calculateBaseDamage('d6')).toBe(3)
			expect(calculateBaseDamage('d8')).toBe(4)
			expect(calculateBaseDamage('d10')).toBe(5)
			expect(calculateBaseDamage('d12')).toBe(6)
			expect(calculateBaseDamage('d12+1')).toBe(7)
			expect(calculateBaseDamage('d12+2')).toBe(8)
		})
	})

	describe('formatDamageString', () => {
		it('should format damage string correctly', () => {
			const damage = formatDamageString(5, 6)
			expect(damage).toBe('11/17/23')
			// weak: 5 + 6 = 11
			// strong: 5 + 12 = 17
			// critical: 5 + 18 = 23
		})
	})
})

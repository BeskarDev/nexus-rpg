import { AttributeType } from '../../../types/Character'
import { calculateCharacterLevel } from './calculateCharacterLevel'

/**
 * Calculate the base HP value from Strength attribute
 * Based on the table: d4=16, d6=18, d8=20, d10=22, d12=24
 */
export const calculateBaseHpFromStrength = (
	strength: AttributeType,
): number => {
	const baseHpMap: Record<AttributeType, number> = {
		4: 16, // d4 -> 16 HP
		6: 18, // d6 -> 18 HP
		8: 20, // d8 -> 20 HP
		10: 22, // d10 -> 22 HP
		12: 24, // d12 -> 24 HP
	}

	return baseHpMap[strength] || 16 // Default to d4 value if invalid
}

/**
 * Calculate maximum HP using the formula: 12 + STR + (2 × Level) + Modifier
 * Note: The docs say "12 + Strength" but the table shows d4=16, d6=18, etc.
 * This suggests the formula is actually just: STR_VALUE + (2 × (Level - 1)) + Modifier
 * where STR_VALUE comes from the table (16, 18, 20, 22, 24)
 *
 * @param strength - The character's strength attribute die
 * @param totalXp - Total XP for calculating level bonus
 * @param maxHpModifier - User-defined modifier (custom override)
 * @param talentHpBonus - Auto-calculated bonus from talents (optional, defaults to 0)
 */
export const calculateMaxHp = (
	strength: AttributeType,
	totalXp: number,
	maxHpModifier: number = 0,
	talentHpBonus: number = 0,
): number => {
	const level = calculateCharacterLevel(totalXp)
	const baseHp = calculateBaseHpFromStrength(strength)
	const levelBonus = (level - 1) * 2 // Level 1 = no bonus, Level 2 = +2, etc.

	return baseHp + levelBonus + maxHpModifier + talentHpBonus
}

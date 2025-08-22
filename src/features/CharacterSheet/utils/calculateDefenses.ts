import { AttributeType, Character } from '@site/src/types/Character'
import { calculateCharacterLevel } from './calculateCharacterLevel'
import { extractShieldParryBonus } from '../CharacterSheetTabs/02_Items/utils/itemUtils'
import { organizeItemsByLocation } from '../CharacterSheetTabs/02_Items/utils/itemUtils'

/**
 * Convert attribute die value to the numeric value used in calculations
 * d4=2, d6=3, d8=4, d10=5, d12=6
 */
export const getAttributeValue = (attributeDie: AttributeType): number => {
	const attributeValueMap: Record<AttributeType, number> = {
		4: 2,  // d4 -> 2
		6: 3,  // d6 -> 3
		8: 4,  // d8 -> 4
		10: 5, // d10 -> 5
		12: 6, // d12 -> 6
	}
	return attributeValueMap[attributeDie] || 2 // Default to d4 value if invalid
}

/**
 * Get the rank of a skill from the character's skills array
 */
export const getSkillRank = (character: Character, skillName: string): number => {
	const skill = character.skills.skills.find(
		s => s.name.toLowerCase() === skillName.toLowerCase()
	)
	return skill?.rank || 0
}

/**
 * Calculate level bonus for defenses: +1 at levels 3, 5, 7, 9
 */
export const calculateDefenseLevelBonus = (totalXp: number): number => {
	const level = calculateCharacterLevel(totalXp)
	
	// +1 to all defenses for each odd level starting at level 3
	let bonus = 0
	if (level >= 3) bonus++
	if (level >= 5) bonus++
	if (level >= 7) bonus++
	if (level >= 9) bonus++
	
	return bonus
}

/**
 * Calculate base Parry defense: 7 + Fighting skill rank
 */
export const calculateParryBase = (character: Character): number => {
	const fightingRank = getSkillRank(character, 'Fighting')
	return 7 + fightingRank
}

/**
 * Calculate base Dodge defense: 5 + ½ Agility
 */
export const calculateDodgeBase = (character: Character): number => {
	const agilityValue = getAttributeValue(character.statistics.agility.value)
	return 5 + Math.floor(agilityValue / 2)
}

/**
 * Calculate base Resist defense: 5 + ½ max(Spirit, Mind)
 */
export const calculateResistBase = (character: Character): number => {
	const spiritValue = getAttributeValue(character.statistics.spirit.value)
	const mindValue = getAttributeValue(character.statistics.mind.value)
	const maxAttribute = Math.max(spiritValue, mindValue)
	return 5 + Math.floor(maxAttribute / 2)
}

/**
 * Migrate old character defense values to new detailed defense structures.
 * This function preserves the original manual values by calculating the discrepancy
 * between old values and auto-calculated values, putting the difference in the "other" fields.
 */
export const migrateCharacterDefenses = (character: Character) => {
	// Get auto-calculated values
	const autoParryBase = calculateParryBase(character)
	const autoDodgeBase = calculateDodgeBase(character)
	const autoResistBase = calculateResistBase(character)
	const autoLevelBonus = calculateDefenseLevelBonus(character.skills.xp.total)
	
	// Get shield bonus for parry
	const itemsByLocation = organizeItemsByLocation(character.items.weapons, character.items.items)
	const autoShieldBonus = extractShieldParryBonus(itemsByLocation)
	
	// Get old manual values
	const oldParry = character.statistics.parry
	const oldDodge = character.statistics.dodge
	const oldResist = character.statistics.resist
	
	// Calculate discrepancies (what was manually adjusted beyond auto-calculation)
	const parryOther = oldParry - (autoParryBase + autoLevelBonus + autoShieldBonus)
	const dodgeOther = oldDodge - (autoDodgeBase + autoLevelBonus)
	const resistOther = oldResist - (autoResistBase + autoLevelBonus)
	
	return {
		parryDetails: {
			base: autoParryBase,
			levelBonus: autoLevelBonus,
			shieldBonus: autoShieldBonus,
			other: parryOther
		},
		dodgeDetails: {
			base: autoDodgeBase,
			levelBonus: autoLevelBonus,
			other: dodgeOther
		},
		resistDetails: {
			base: autoResistBase,
			levelBonus: autoLevelBonus,
			other: resistOther
		}
	}
}
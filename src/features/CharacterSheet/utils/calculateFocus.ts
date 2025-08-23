import { CharacterDocument } from '@site/src/types/Character'

/**
 * Calculate the base max Focus based on attributes and magic skill
 * Formula: (Mind/Spirit - 2) + (2 × Arcana/Mysticism rank)
 */
export const calculateMaxFocus = (
	character: CharacterDocument,
	modifier: number = 0
): number => {
	const { magicSkill } = character.spells
	const { skills } = character.skills
	const { mind, spirit } = character.statistics

	// If no magic skill learned, Focus is 0
	if (!magicSkill || magicSkill === '') {
		return 0
	}

	// Find the magic skill rank
	const magicSkillData = skills.find(skill => skill.name === magicSkill)
	const skillRank = magicSkillData ? magicSkillData.rank : 0

	let baseAttribute = 0
	if (magicSkill === 'Arcana') {
		// Use Mind attribute for Arcana
		baseAttribute = mind.value
	} else if (magicSkill === 'Mysticism') {
		// Use Spirit attribute for Mysticism
		baseAttribute = spirit.value
	}

	// Calculate base Focus: (Attribute - 2) + (2 × Skill Rank)
	const baseFocus = Math.max(0, (baseAttribute - 2) + (2 * skillRank))
	
	return baseFocus + modifier
}

/**
 * Get the magic skill rank for a character
 */
export const getMagicSkillRank = (character: CharacterDocument): number => {
	const { magicSkill } = character.spells
	const { skills } = character.skills
	
	if (!magicSkill || magicSkill === '') {
		return 0
	}
	
	const magicSkillData = skills.find(skill => skill.name === magicSkill)
	return magicSkillData ? magicSkillData.rank : 0
}

/**
 * Get the relevant attribute value for the magic school
 */
export const getMagicAttribute = (character: CharacterDocument): number => {
	const { magicSkill } = character.spells
	const { mind, spirit } = character.statistics
	
	if (magicSkill === 'Arcana') {
		return mind.value
	} else if (magicSkill === 'Mysticism') {
		return spirit.value
	}
	
	return 0
}
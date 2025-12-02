import { Ability } from '../../../types/Character'

/**
 * Pattern to match HP bonus text in talent descriptions
 * Matches variations like "Gain +2 HP", "gain +2 HP", "+2 HP", etc.
 */
const HP_BONUS_PATTERN = /(?:gain\s+)?\+(\d+)\s+HP/gi

/**
 * Special case: Pact of Divinity grants +2 HP per Mysticism rank, not per talent rank
 * This needs to be calculated differently based on the Mysticism skill rank
 */
const PACT_OF_DIVINITY_TALENT = 'Pact of Divinity'

/**
 * Folk abilities that grant HP bonuses by name
 * These don't follow the rank description pattern
 */
const HP_GRANTING_FOLK_ABILITIES = [
	"Giant's Blood", // +2 HP (Hune, Minotaur)
] as const

/**
 * Extracts HP bonus from a single rank's description text
 * @param rankText - The text for a specific rank
 * @returns The HP bonus amount (e.g., 2 for "+2 HP"), or 0 if none found
 */
const extractHpBonusFromRankText = (rankText: string): number => {
	const matches = [...rankText.matchAll(HP_BONUS_PATTERN)]
	if (matches.length > 0) {
		// Return the first match (usually "Gain +2 HP" at the start of rank)
		return parseInt(matches[0][1], 10)
	}
	return 0
}

/**
 * Parses talent description to find HP bonuses per rank
 * Handles multi-rank talents where each rank has its own description
 * @param description - Full talent description with rank information
 * @param currentRank - Current rank of the talent
 * @returns Total HP bonus across all ranks up to currentRank
 */
const calculateHpBonusFromDescription = (
	description: string,
	currentRank: number,
): number => {
	let totalBonus = 0
	
	// Split by rank markers like "(Rank 1)", "(Rank 2)", etc.
	const rankPattern = /\(Rank\s+(\d+)\)/gi
	const parts = description.split(rankPattern)
	
	// If no rank markers found, check the entire description
	if (parts.length === 1) {
		return extractHpBonusFromRankText(description)
	}
	
	// Process each rank up to currentRank
	// parts array structure: [text before rank 1, "1", rank 1 text, "2", rank 2 text, ...]
	for (let i = 1; i < parts.length; i += 2) {
		const rankNumber = parseInt(parts[i], 10)
		const rankText = parts[i + 1] || ''
		
		if (rankNumber <= currentRank) {
			totalBonus += extractHpBonusFromRankText(rankText)
		}
	}
	
	return totalBonus
}

/**
 * Calculates the total HP modifier from talents and folk abilities that grant HP bonuses
 *
 * @param abilities - Array of character abilities (including talents and folk abilities)
 * @param mysticismRank - Optional Mysticism skill rank for Pact of Divinity calculation
 * @returns Total HP modifier from all HP-granting talents and folk abilities
 */
export const calculateTalentHpBonus = (
	abilities: Ability[],
	mysticismRank: number = 0,
): number => {
	let totalHpBonus = 0

	// Filter for talents
	const talents = abilities.filter((ability) => ability.tag === 'Talent')

	talents.forEach((talent) => {
		const talentName = talent.title.trim()
		const currentRank = talent.rank || 1

		// Special case: Pact of Divinity (Protection)
		if (talentName === PACT_OF_DIVINITY_TALENT) {
			// Check if description contains "Protection" pact
			if (talent.description.includes('Protection')) {
				totalHpBonus += mysticismRank * 2 // +2 HP per Mysticism rank
			}
		} else {
			// Parse the description to find HP bonuses
			const hpBonus = calculateHpBonusFromDescription(
				talent.description,
				currentRank,
			)
			totalHpBonus += hpBonus
		}
	})

	// Filter for folk abilities
	const folkAbilities = abilities.filter((ability) => ability.tag === 'Folk')

	folkAbilities.forEach((folkAbility) => {
		const abilityName = folkAbility.title.trim()

		// Check if this is an HP-granting folk ability
		if (HP_GRANTING_FOLK_ABILITIES.includes(abilityName as any)) {
			totalHpBonus += 2 // Folk abilities grant flat +2 HP
		}
	})

	return totalHpBonus
}

/**
 * Checks if a talent grants HP bonuses by examining its description
 *
 * @param description - Talent description text
 * @returns True if the talent grants HP bonuses
 */
export const isHpGrantingTalent = (description: string): boolean => {
	return HP_BONUS_PATTERN.test(description)
}

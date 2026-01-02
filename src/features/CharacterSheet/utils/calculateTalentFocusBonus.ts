import { Ability } from '../../../types/Character'

/**
 * Pattern to match Focus bonus text in talent descriptions
 * Matches variations like "Gain +2 Focus", "gain +2 Focus", "+2 Focus", etc.
 */
const FOCUS_BONUS_PATTERN = /(?:gain\s+)?\+(\d+)\s+Focus/gi

/**
 * Extracts Focus bonus from a single rank's description text
 * @param rankText - The text for a specific rank
 * @returns The Focus bonus amount (e.g., 2 for "+2 Focus"), or 0 if none found
 */
const extractFocusBonusFromRankText = (rankText: string): number => {
	// Reset regex state before use
	FOCUS_BONUS_PATTERN.lastIndex = 0
	const match = FOCUS_BONUS_PATTERN.exec(rankText)
	if (match) {
		// Return the first match (usually "Gain +2 Focus" at the start of rank)
		return parseInt(match[1], 10)
	}
	return 0
}

/**
 * Parses talent description to find Focus bonuses per rank
 * Handles multi-rank talents where each rank has its own description
 * @param description - Full talent description with rank information
 * @param currentRank - Current rank of the talent
 * @returns Total Focus bonus across all ranks up to currentRank
 */
const calculateFocusBonusFromDescription = (
	description: string,
	currentRank: number,
): number => {
	let totalBonus = 0
	
	// Split by rank markers like "(Rank 1)", "(Rank 2)", etc.
	const rankPattern = /\(Rank\s+(\d+)\)/gi
	const parts = description.split(rankPattern)
	
	// If no rank markers found, check the entire description
	if (parts.length === 1) {
		return extractFocusBonusFromRankText(description)
	}
	
	// Process each rank up to currentRank
	// parts array structure: [text before rank 1, "1", rank 1 text, "2", rank 2 text, ...]
	for (let i = 1; i < parts.length; i += 2) {
		const rankNumber = parseInt(parts[i], 10)
		const rankText = parts[i + 1] || ''
		
		if (rankNumber <= currentRank) {
			totalBonus += extractFocusBonusFromRankText(rankText)
		}
	}
	
	return totalBonus
}

/**
 * Calculates the total Focus modifier from talents that grant Focus bonuses
 *
 * @param abilities - Array of character abilities (including talents and folk abilities)
 * @returns Total Focus modifier from all Focus-granting talents
 */
export const calculateTalentFocusBonus = (
	abilities: Ability[],
): number => {
	let totalFocusBonus = 0

	// Filter for talents
	const talents = abilities.filter((ability) => ability.tag === 'Talent')

	talents.forEach((talent) => {
		const currentRank = talent.rank || 1

		// Parse the description to find Focus bonuses
		const focusBonus = calculateFocusBonusFromDescription(
			talent.description,
			currentRank,
		)
		totalFocusBonus += focusBonus
	})

	return totalFocusBonus
}

/**
 * Checks if a talent grants Focus bonuses by examining its description
 *
 * @param description - Talent description text
 * @returns True if the talent grants Focus bonuses
 */
export const isFocusGrantingTalent = (description: string): boolean => {
	return FOCUS_BONUS_PATTERN.test(description)
}

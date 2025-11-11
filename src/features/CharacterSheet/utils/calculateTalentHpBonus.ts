import { Ability } from '../../../types/Character'

/**
 * List of talent names that grant +2 HP per rank
 */
const HP_GRANTING_TALENTS = [
	'Bulky',
	'Body of Bronze',
	'Enduring',
	'Hard to Kill',
	'Second Wind',
	'Tough Stomach',
	'Knowledgeable Wanderer',
] as const

/**
 * Special case: Pact of Divinity grants +2 HP per Mysticism rank, not per talent rank
 * This needs to be calculated differently based on the Mysticism skill rank
 */
const PACT_OF_DIVINITY_TALENT = 'Pact of Divinity'

/**
 * Folk abilities that grant HP bonuses
 */
const HP_GRANTING_FOLK_ABILITIES = [
	"Giant's Blood", // +2 HP (Hune, Minotaur)
] as const

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

		// Check if this is a standard HP-granting talent
		if (HP_GRANTING_TALENTS.includes(talentName as any)) {
			const rank = talent.rank || 1
			totalHpBonus += rank * 2 // +2 HP per rank
		}
		// Special case: Pact of Divinity (Protection)
		else if (talentName === PACT_OF_DIVINITY_TALENT) {
			// Check if description contains "Protection" pact
			if (talent.description.includes('Protection')) {
				totalHpBonus += mysticismRank * 2 // +2 HP per Mysticism rank
			}
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
 * Checks if a talent grants HP bonuses
 *
 * @param talentName - Name of the talent to check
 * @returns True if the talent grants HP bonuses
 */
export const isHpGrantingTalent = (talentName: string): boolean => {
	const normalizedName = talentName.trim()
	return (
		HP_GRANTING_TALENTS.includes(normalizedName as any) ||
		normalizedName === PACT_OF_DIVINITY_TALENT
	)
}

import { Ability } from '../../../types/Character'

/**
 * Folk abilities that grant AV bonuses
 */
const AV_GRANTING_FOLK_ABILITIES = {
	Stoneskin: 1, // Dwarf - +1 AV
	'Thick Scales': 3, // Lizardfolk - +3 AV (or +1 if wearing armor)
} as const

/**
 * Calculates the total AV modifier from folk abilities
 *
 * @param abilities - Array of character abilities (including folk abilities)
 * @param hasArmorEquipped - Whether the character has armor equipped (for Thick Scales calculation)
 * @returns Total AV modifier from folk abilities
 */
export const calculateFolkAvBonus = (
	abilities: Ability[],
	hasArmorEquipped: boolean = false,
): number => {
	let totalAvBonus = 0

	// Filter for folk abilities only
	const folkAbilities = abilities.filter((ability) => ability.tag === 'Folk')

	folkAbilities.forEach((folkAbility) => {
		const abilityName = folkAbility.title.trim()

		// Check for specific AV-granting abilities
		if (abilityName === 'Stoneskin') {
			totalAvBonus += 1
		} else if (abilityName === 'Thick Scales') {
			// Thick Scales grants +3 AV if no armor, or +1 AV if wearing armor
			totalAvBonus += hasArmorEquipped ? 1 : 3
		}
	})

	return totalAvBonus
}

/**
 * Checks if a folk ability grants AV bonuses
 *
 * @param abilityName - Name of the ability to check
 * @returns True if the ability grants AV bonuses
 */
export const isAvGrantingFolkAbility = (abilityName: string): boolean => {
	const normalizedName = abilityName.trim()
	return normalizedName in AV_GRANTING_FOLK_ABILITIES
}

import { Ability, Weapon } from '../../../types/Character'
import { v4 as uuidv4 } from 'uuid'

/**
 * Natural weapon definitions from folk abilities
 */
const NATURAL_WEAPON_ABILITIES = {
	'Sharp Claws': {
		name: 'Claws',
		damage: 2,
		properties: 'light, slash',
		description: 'Your natural claws. Can be used as a brawling weapon instead of unarmed attacks. (Catfolk)',
	},
	'Reptile Jaws': {
		name: 'Bite',
		damage: 3,
		properties: 'crush',
		description: 'Your reptilian bite. Can be used as a brawling weapon instead of unarmed attacks. (Lizardfolk)',
	},
	'Horns': {
		name: 'Horns',
		damage: 3,
		properties: 'crush',
		description: 'Your natural horns. Can be used as a brawling weapon instead of unarmed attacks. (Minotaur)',
	},
} as const

/**
 * Creates natural weapon objects from folk abilities that grant them
 * 
 * @param abilities - Array of character abilities (including folk abilities)
 * @returns Array of weapon objects for natural weapons
 */
export const createNaturalWeapons = (abilities: Ability[]): Weapon[] => {
	const naturalWeapons: Weapon[] = []

	// Filter for folk abilities
	const folkAbilities = abilities.filter((ability) => ability.tag === 'Folk')

	folkAbilities.forEach((folkAbility) => {
		const abilityName = folkAbility.title.trim()

		// Check if this ability grants a natural weapon
		if (abilityName in NATURAL_WEAPON_ABILITIES) {
			const weaponDef = NATURAL_WEAPON_ABILITIES[abilityName as keyof typeof NATURAL_WEAPON_ABILITIES]

			naturalWeapons.push({
				id: uuidv4(),
				name: weaponDef.name,
				damage: {
					base: 'STR',
					weapon: weaponDef.damage,
					other: 0,
					otherWeak: 0,
					otherStrong: 0,
					otherCritical: 0,
					type: 'physical',
				},
				properties: weaponDef.properties,
				description: weaponDef.description,
				cost: 0, // Natural weapons have no cost
				load: 0, // Natural weapons have no load
				location: 'worn',
				mountInfo: '',
				storageInfo: '',
				uses: 0,
				durability: '',
				quality: 2, // Standard quality
			})
		}
	})

	return naturalWeapons
}

/**
 * Checks if a folk ability grants a natural weapon
 * 
 * @param abilityName - Name of the ability to check
 * @returns True if the ability grants a natural weapon
 */
export const isNaturalWeaponAbility = (abilityName: string): boolean => {
	const normalizedName = abilityName.trim()
	return normalizedName in NATURAL_WEAPON_ABILITIES
}

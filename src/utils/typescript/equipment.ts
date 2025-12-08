import { Character, Item } from '../types/Character'

/**
 * Maximum number of rings a character can wear
 */
export const MAX_RINGS = 3

/**
 * Gets the number of rings currently equipped by a character
 */
export function getEquippedRingCount(character: Character): number {
	return character.items.items.filter(
		(item) => item.location === 'worn' && item.slot === 'ring',
	).length
}

/**
 * Checks if a character can equip another ring
 */
export function canEquipRing(character: Character): boolean {
	return getEquippedRingCount(character) < MAX_RINGS
}

/**
 * Gets the slot options available for an item based on character's current equipment
 */
export function getAvailableSlotOptions(
	character: Character,
	currentItem?: Item,
): string[] {
	const slotOptions = [
		'',
		'head',
		'neck',
		'back',
		'body',
		'hands',
		'ring',
		'waist',
		'feet',
	]

	// If this is a ring slot and the character already has 3 rings equipped
	// (and this isn't one of those rings being edited), disable the ring option
	if (!canEquipRing(character)) {
		const isCurrentItemARing =
			currentItem?.slot === 'ring' && currentItem?.location === 'worn'
		if (!isCurrentItemARing) {
			return slotOptions.filter((slot) => slot !== 'ring')
		}
	}

	return slotOptions
}

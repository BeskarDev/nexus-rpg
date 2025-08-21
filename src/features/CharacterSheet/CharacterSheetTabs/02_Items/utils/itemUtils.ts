import { Item, Weapon } from '../../../../../types/Character'
import { ItemLocation } from '../../../../../types/ItemLocation'

export interface OrganizedItems {
	worn: (Item | Weapon)[]
	carried: (Item | Weapon)[]
	mount: (Item | Weapon)[]
	storage: (Item | Weapon)[]
}

/**
 * Organizes items and weapons by their location with migration logic for legacy data
 */
export const organizeItemsByLocation = (
	weapons: Weapon[],
	items: Item[],
): OrganizedItems => {
	const organized: OrganizedItems = {
		worn: [],
		carried: [],
		mount: [],
		storage: [],
	}

	// Add weapons to their locations (default to 'worn' if missing)
	weapons.forEach((weapon) => {
		const location: ItemLocation = weapon.location
			? (weapon.location as ItemLocation)
			: 'worn'
		organized[location].push(weapon)
	})

	// Add items to their locations (default to 'carried' unless container is 'worn')
	items.forEach((item) => {
		let location: ItemLocation
		if (item.location) {
			location = item.location as ItemLocation
		} else if (item.container === 'worn') {
			location = 'worn'
		} else {
			location = 'carried'
		}
		organized[location].push(item)
	})

	return organized
}

/**
 * Calculates the total load for a specific location
 */
export const calculateLocationLoad = (
	locationItems: (Item | Weapon)[],
): number => {
	const weaponLoad = locationItems
		.filter((item) => 'damage' in item)
		.map((w) => (w as Weapon).load)
		.reduce((sum, load) => sum + load, 0)

	const itemLoad = locationItems
		.filter((item) => !('damage' in item))
		.map((i) => (i as Item).load * (i as Item).amount)
		.reduce((sum, load) => sum + load, 0)

	return weaponLoad + itemLoad
}

/**
 * Calculates the current carried load (worn + carried items only)
 */
export const calculateCurrentLoad = (
	itemsByLocation: OrganizedItems,
): number => {
	const carriedWeapons = [
		...itemsByLocation.worn.filter((item) => 'damage' in item),
		...itemsByLocation.carried.filter((item) => 'damage' in item),
	] as Weapon[]

	const weaponLoad = carriedWeapons
		.map((w) => w.load)
		.reduce((sum, load) => sum + load, 0)

	const carriedItems = [
		...itemsByLocation.worn.filter((item) => !('damage' in item)),
		...itemsByLocation.carried.filter((item) => !('damage' in item)),
	] as Item[]

	const itemLoad = carriedItems
		.map((i) => i.load * i.amount)
		.reduce((sum, load) => sum + load, 0)

	return weaponLoad + itemLoad
}

/**
 * Extracts AV values from equipped items and weapons
 */
export const extractArmorValues = (itemsByLocation: OrganizedItems) => {
	let armorAV = 0
	let helmetAV = 0
	let shieldAV = 0

	// Check equipped gear for armor and helmet
	const equippedGear = itemsByLocation.worn as Item[]
	equippedGear.forEach((item) => {
		if (item.properties && !('damage' in item)) {
			// Look for both "AV +X" and "+X AV" patterns
			const avMatch = item.properties.match(/(?:AV\s*\+(\d+)|\+(\d+)\s*AV)/i)
			if (avMatch) {
				const av = parseInt(avMatch[1] || avMatch[2])
				if (item.slot === 'body') {
					armorAV = av
				} else if (item.slot === 'head') {
					helmetAV = av
				}
			}
		}
	})

	// Check equipped weapons for shields
	const equippedWeapons = itemsByLocation.worn.filter(
		(item) => 'damage' in item,
	) as Weapon[]
	equippedWeapons.forEach((weapon) => {
		if (weapon.properties) {
			// Look for shield indicators in properties or name
			const isShield =
				weapon.properties.toLowerCase().includes('shield') ||
				weapon.name.toLowerCase().includes('shield')

			if (isShield) {
				// Look for both "AV +X" and "+X AV" patterns
				const avMatch = weapon.properties.match(
					/(?:AV\s*\+(\d+)|\+(\d+)\s*AV)/i,
				)
				if (avMatch) {
					shieldAV = parseInt(avMatch[1] || avMatch[2])
				}
			}
		}
	})

	return { armorAV, helmetAV, shieldAV }
}

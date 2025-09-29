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
		.map((i) => {
			const item = i as Item
			// Use weight if available, fallback to 0
			const weight = (item as any).weight || 0
			return weight * item.amount
		})
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
		.map((i) => {
			// Use weight if available, fallback to 0
			const weight = (i as any).weight || 0
			return weight * i.amount
		})
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
			// Handle properties as array (for Items) - join to string for matching
			const propertiesString = Array.isArray(item.properties) 
				? item.properties.join(', ') 
				: item.properties
			
			// Look for both "AV +X" and "+X AV" patterns
			const avMatch = propertiesString.match(/(?:AV\s*\+(\d+)|\+(\d+)\s*AV)/i)
			if (avMatch) {
				const av = parseInt(avMatch[1] || avMatch[2])
				
				// Determine if it's body armor or helmet based on name/properties
				const itemName = item.name.toLowerCase()
				const isHelmet = itemName.includes('helmet') || itemName.includes('cap') || itemName.includes('hood')
				const isBodyArmor = itemName.includes('armor') || itemName.includes('mail') || itemName.includes('leather') || itemName.includes('plate')
				
				if (isHelmet) {
					helmetAV = av
				} else if (isBodyArmor) {
					armorAV = av
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

/**
 * Extracts Parry defense bonus from equipped shields
 */
export const extractShieldParryBonus = (
	itemsByLocation: OrganizedItems,
): number => {
	let shieldParryBonus = 0

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
				// Look for parry bonus patterns: "Parry +X", "+X Parry", "Defense +X", "+X Defense"
				const parryMatch = weapon.properties.match(
					/(?:(?:Parry|Defense)\s*\+(\d+)|\+(\d+)\s*(?:Parry|Defense))/i,
				)
				if (parryMatch) {
					shieldParryBonus = parseInt(parryMatch[1] || parryMatch[2])
				}
			}
		}
	})

	return shieldParryBonus
}

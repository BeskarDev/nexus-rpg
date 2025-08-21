import { DurabilityDie, Item, Weapon } from '../../../../../types/Character'

/**
 * Determines the appropriate durability die for an item based on its properties
 * According to Equipment docs:
 * - d4: glass, ceramic, cloth
 * - d6: light or normal weapons, light armor, wood, leather  
 * - d8: heavy or two-handed weapons, heavy armor, metal, stone
 */
export function getDurabilityForItem(item: Item | Weapon): DurabilityDie {
	const properties = item.properties?.toLowerCase() || ''
	const name = item.name?.toLowerCase() || ''
	const description = item.description?.toLowerCase() || ''
	
	const allText = `${properties} ${name} ${description}`

	// Check for d4 materials (most fragile)
	if (
		allText.includes('glass') ||
		allText.includes('ceramic') ||
		allText.includes('cloth') ||
		allText.includes('fragile')
	) {
		return 'd4'
	}

	// For weapons, check weapon-specific properties
	if ('damage' in item) {
		// d8 for heavy/two-handed weapons
		if (
			properties.includes('heavy') ||
			properties.includes('two-handed') ||
			allText.includes('heavy') ||
			allText.includes('two-handed') ||
			allText.includes('metal') ||
			allText.includes('stone')
		) {
			return 'd8'
		}
		
		// d6 for light/normal weapons
		if (
			properties.includes('light') ||
			allText.includes('light') ||
			allText.includes('wood') ||
			allText.includes('leather') ||
			// Default for weapons unless specified otherwise
			(!allText.includes('heavy') && !allText.includes('two-handed'))
		) {
			return 'd6'
		}
	} else {
		// For non-weapons (items)
		// d6 for light armor, wood, leather items first
		if (
			allText.includes('light armor') ||
			allText.includes('light') ||
			allText.includes('wood') ||
			allText.includes('leather') ||
			allText.includes('backpack') ||
			allText.includes('rope') ||
			allText.includes('gear')
		) {
			return 'd6'
		}
		
		// d8 for heavy armor, metal, stone items
		if (
			allText.includes('heavy armor') ||
			allText.includes('heavy') ||
			allText.includes('metal') ||
			allText.includes('stone') ||
			allText.includes('armor')
		) {
			return 'd8'
		}
	}

	// Default to d6 for most items
	return 'd6'
}

/**
 * Check if an item is damaged (when uses >= 3)
 */
export function isItemDamaged(uses: number): boolean {
	return uses >= 3
}
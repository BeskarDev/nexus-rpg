// Chip mappings for different content types
export interface ChipMapping {
	[key: string]: {
		color: string
		type: string
		displayText?: string
	}
}

export const chipMappings: ChipMapping = {
	// Damage Types (9 total) - Vibrant saturated colors
	acid: { color: 'acid-vibrant', type: 'damage' },
	blast: { color: 'blast-vibrant', type: 'damage' },
	fire: { color: 'fire-vibrant', type: 'damage' },
	frost: { color: 'frost-vibrant', type: 'damage' },
	lightning: { color: 'lightning-vibrant', type: 'damage' },
	necrotic: { color: 'necrotic-vibrant', type: 'damage' },
	poison: { color: 'poison-vibrant', type: 'damage' },
	psychic: { color: 'psychic-vibrant', type: 'damage' },
	radiant: { color: 'radiant-vibrant', type: 'damage' },

	// Skills (16 total) - Vibrant saturated colors with better distribution
	Athletics: { color: 'athletics-vibrant', type: 'skill' },
	Crafting: { color: 'crafting-vibrant', type: 'skill' },
	Nature: { color: 'nature-vibrant', type: 'skill' },
	Survival: { color: 'survival-vibrant', type: 'skill' },
	Fighting: { color: 'fighting-vibrant', type: 'skill' },
	Fortitude: { color: 'fortitude-vibrant', type: 'skill' },
	Perception: { color: 'perception-vibrant', type: 'skill' },
	Arcana: { color: 'arcana-vibrant', type: 'skill' },
	Influence: { color: 'influence-vibrant', type: 'skill' },
	Lore: { color: 'lore-vibrant', type: 'skill' },
	Mysticism: { color: 'mysticism-vibrant', type: 'skill' },
	Insight: { color: 'insight-vibrant', type: 'skill' },
	Stealth: { color: 'stealth-vibrant', type: 'skill' },
	Streetwise: { color: 'streetwise-vibrant', type: 'skill' },
	Education: { color: 'education-vibrant', type: 'skill' },
	Archery: { color: 'archery-vibrant', type: 'skill' },

	// Weapon Categories (9 total) - Distinct vibrant colors
	Axe: { color: 'axe-vibrant', type: 'weapon' },
	Blade: { color: 'blade-vibrant', type: 'weapon' },
	Bow: { color: 'bow-vibrant', type: 'weapon' },
	Brawling: { color: 'brawling-vibrant', type: 'weapon' },
	Crossbow: { color: 'crossbow-vibrant', type: 'weapon' },
	Mace: { color: 'mace-vibrant', type: 'weapon' },
	Polearm: { color: 'polearm-vibrant', type: 'weapon' },
	Shield: { color: 'shield-vibrant', type: 'weapon' },
	Thrown: { color: 'thrown-vibrant', type: 'weapon' },

	// Attributes (4 total) - New colors as requested: STR -> red, AGI -> green, SPI -> light purple, MND -> blue
	Strength: { color: 'red', type: 'attribute' },
	STR: { color: 'red', type: 'attribute' },
	Agility: { color: 'green', type: 'attribute' },
	AGI: { color: 'green', type: 'attribute' },
	Spirit: { color: 'light-purple', type: 'attribute' },
	SPI: { color: 'light-purple', type: 'attribute' },
	Mind: { color: 'blue', type: 'attribute' },
	MND: { color: 'blue', type: 'attribute' },
}

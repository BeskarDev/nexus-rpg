// Official languages from the documentation, categorized by type
export const COMMON_LANGUAGES = [
	'Catspeech',
	'Dwarvish',
	'Elvish',
	'Giant',
	'Gnomish',
	'Goblin',
	'Lizardspeech',
	'Orc',
	'Tradespeak',
] as const

export const ANCIENT_LANGUAGES = [
	'Celestial',
	'Dark Tongue',
	'Draconic',
	'Primordial',
] as const

// All languages combined, sorted alphabetically
export const ALL_LANGUAGES = [
	...COMMON_LANGUAGES,
	...ANCIENT_LANGUAGES,
].sort() as string[]

// Default language that all characters start with
export const DEFAULT_LANGUAGE = 'Tradespeak' as const

// Color mapping for language chips - using colors from the skills constants with varied selection
export const getLanguageChipColor = (language: string): string => {
	const colorMap: Record<string, string> = {
		// Common languages - using varied skill colors
		Catspeech: '#3FA769', // Athletics green
		Dwarvish: '#B1642F', // Fighting brown
		Elvish: '#3E9B4E', // Nature green
		Giant: '#A14646', // Fortitude red
		Gnomish: '#4B91C0', // Perception blue
		Goblin: '#777777', // Stealth gray
		Lizardspeech: '#48A06C', // Survival green
		Orc: '#9C5635', // Streetwise brown
		Tradespeak: '#3C6FA8', // Education blue (primary for default language)

		// Ancient languages - using more mystical/powerful skill colors
		Celestial: '#8E3F66', // Arcana purple
		'Dark Tongue': '#914C70', // Mysticism purple
		Draconic: '#C2892F', // Lore gold
		Primordial: '#B28A3F', // Influence gold
	}

	return colorMap[language] || '#9A9A9A' // default crafting gray
}

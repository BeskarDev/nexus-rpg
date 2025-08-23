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

// Color mapping for language chips - using a consistent color scheme
export const getLanguageChipColor = (language: string): string => {
	const colorMap: Record<string, string> = {
		// Common languages - blue-green tones
		'Catspeech': '#2E7D8A',
		'Dwarvish': '#3B82A6', 
		'Elvish': '#4A90A4',
		'Giant': '#5B9BD5',
		'Gnomish': '#6BA6CD',
		'Goblin': '#7BB3C0',
		'Lizardspeech': '#8BC1B7',
		'Orc': '#9BCFAE',
		'Tradespeak': '#1976D2', // Primary blue for the default language
		
		// Ancient languages - purple-gold tones
		'Celestial': '#8E44AD',
		'Dark Tongue': '#5D4E75',
		'Draconic': '#B8860B',
		'Primordial': '#CD853F',
	}

	return colorMap[language] || '#6B7280' // default gray
}
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

// Color mapping for language chips — each language aliases the skill color it
// was already documented as matching (M9 S1 / F2: one token per identity,
// read from characterSheet.css rather than a third hand-picked hex set).
export const getLanguageChipColor = (language: string): string => {
	const colorMap: Record<string, string> = {
		// Common languages - using varied skill colors
		Catspeech: 'var(--cs-skill-athletics)',
		Dwarvish: 'var(--cs-skill-fighting)',
		Elvish: 'var(--cs-skill-nature)',
		Giant: 'var(--cs-skill-fortitude)',
		Gnomish: 'var(--cs-skill-perception)',
		Goblin: 'var(--cs-skill-stealth)',
		Lizardspeech: 'var(--cs-skill-survival)',
		Orc: 'var(--cs-skill-streetwise)',
		Tradespeak: 'var(--cs-skill-education)', // primary for default language

		// Ancient languages - using more mystical/powerful skill colors
		Celestial: 'var(--cs-skill-arcana)',
		'Dark Tongue': 'var(--cs-skill-mysticism)',
		Draconic: 'var(--cs-skill-lore)',
		Primordial: 'var(--cs-skill-influence)',
	}

	return colorMap[language] || 'var(--cs-skill-crafting)' // default crafting gray
}

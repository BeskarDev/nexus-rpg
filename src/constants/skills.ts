// Official skills from the documentation, sorted alphabetically
export const OFFICIAL_SKILLS = [
	'Arcana',
	'Archery',
	'Athletics',
	'Crafting',
	'Education',
	'Fighting',
	'Fortitude',
	'Influence',
	'Insight',
	'Lore',
	'Mysticism',
	'Nature',
	'Perception',
	'Stealth',
	'Streetwise',
	'Survival',
]

// Official crafting professions from the documentation, sorted alphabetically
export const OFFICIAL_PROFESSIONS = [
	'Alchemist',
	'Cloth Weaver',
	'Inscriber',
	'Jeweler',
	'Leatherworker',
	'Smith',
	'Woodworker',
]

// Color mapping for skill chips using specified hex colors
export const getSkillChipColor = (skill: string): string => {
	const colorMap: Record<string, string> = {
		'Arcana': '#9B3E7A',
		'Archery': '#AE7B4D',
		'Athletics': '#62976D',
		'Crafting': '#62976D',
		'Education': '#6692AC',
		'Fighting': '#AE7B4D',
		'Fortitude': '#AE7B4D',
		'Influence': '#C29F55',
		'Insight': '#6692AC',
		'Lore': '#C29F55',
		'Mysticism': '#9B3E7A',
		'Nature': '#62976D',
		'Perception': '#6692AC',
		'Stealth': '#6692AC',
		'Streetwise': '#AE7B4D',
		'Survival': '#62976D',
	}
	
	return colorMap[skill] || '#6692AC' // default blue
}

// Color mapping for profession chips using colors from the skill palette
export const getProfessionChipColor = (profession: string): string => {
	const colorMap: Record<string, string> = {
		'Alchemist': '#9B3E7A', // purple (like Arcana/Mysticism)
		'Cloth Weaver': '#6692AC', // blue (like Education/Insight/Perception/Stealth)
		'Inscriber': '#C29F55', // gold (like Influence/Lore)
		'Jeweler': '#C29F55', // gold (like Influence/Lore)
		'Leatherworker': '#AE7B4D', // brown (like Archery/Fighting/Fortitude/Streetwise)
		'Smith': '#AE7B4D', // brown (like Archery/Fighting/Fortitude/Streetwise)
		'Woodworker': '#62976D', // green (like Athletics/Crafting/Nature/Survival)
	}
	
	return colorMap[profession] || '#6692AC' // default blue
}

// Helper function to normalize skill names for migration
export const normalizeSkillName = (skillName: string): string | null => {
	const normalized = skillName.trim()
	
	// Find exact match first
	const exactMatch = OFFICIAL_SKILLS.find(skill => skill === normalized)
	if (exactMatch) return exactMatch
	
	// Case-insensitive search
	const caseInsensitiveMatch = OFFICIAL_SKILLS.find(
		skill => skill.toLowerCase() === normalized.toLowerCase()
	)
	if (caseInsensitiveMatch) return caseInsensitiveMatch
	
	// Partial match (for common variations)
	const partialMatches: Record<string, string> = {
		'archery': 'Archery',
		'athletics': 'Athletics',
		'crafting': 'Crafting',
		'education': 'Education',
		'fighting': 'Fighting',
		'fortitude': 'Fortitude',
		'influence': 'Influence',
		'insight': 'Insight',
		'lore': 'Lore',
		'mysticism': 'Mysticism',
		'nature': 'Nature',
		'perception': 'Perception',
		'stealth': 'Stealth',
		'streetwise': 'Streetwise',
		'survival': 'Survival',
		'arcana': 'Arcana',
		'magic': 'Arcana', // common alternative
		'melee': 'Fighting', // common alternative
		'ranged': 'Archery', // common alternative
	}
	
	const key = normalized.toLowerCase()
	return partialMatches[key] || null
}
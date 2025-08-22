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

// Color mapping for skill chips using Docusaurus color scheme
export const getSkillChipColor = (skill: string): string => {
	const colorMap: Record<string, string> = {
		'Arcana': 'rgba(168, 129, 197, 0.27)', // purple
		'Archery': 'rgba(123, 183, 129, 0.27)', // green
		'Athletics': 'rgba(236, 191, 66, 0.39)', // yellow
		'Crafting': 'rgba(210, 162, 141, 0.35)', // brown
		'Education': 'rgba(93, 165, 206, 0.27)', // blue
		'Fighting': 'rgba(244, 171, 159, 0.4)', // red
		'Fortitude': 'rgba(224, 124, 57, 0.27)', // orange
		'Influence': 'rgba(225, 136, 179, 0.27)', // pink
		'Insight': 'rgba(168, 129, 197, 0.27)', // purple
		'Lore': 'rgba(93, 165, 206, 0.27)', // blue
		'Mysticism': 'rgba(225, 136, 179, 0.27)', // pink
		'Nature': 'rgba(123, 183, 129, 0.27)', // green
		'Perception': 'rgba(236, 191, 66, 0.39)', // yellow
		'Stealth': 'rgba(84, 72, 49, 0.15)', // gray
		'Streetwise': 'rgba(244, 171, 159, 0.4)', // red
		'Survival': 'rgba(210, 162, 141, 0.35)', // brown
	}
	
	return colorMap[skill] || 'rgba(84, 72, 49, 0.08)' // default
}

// Color mapping for profession chips
export const getProfessionChipColor = (profession: string): string => {
	const colorMap: Record<string, string> = {
		'Alchemist': 'rgba(168, 129, 197, 0.27)', // purple
		'Cloth Weaver': 'rgba(93, 165, 206, 0.27)', // blue
		'Inscriber': 'rgba(225, 136, 179, 0.27)', // pink
		'Jeweler': 'rgba(236, 191, 66, 0.39)', // yellow
		'Leatherworker': 'rgba(210, 162, 141, 0.35)', // brown
		'Smith': 'rgba(244, 171, 159, 0.4)', // red
		'Woodworker': 'rgba(123, 183, 129, 0.27)', // green
	}
	
	return colorMap[profession] || 'rgba(84, 72, 49, 0.08)' // default
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
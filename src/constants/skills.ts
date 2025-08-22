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
		Arcana: '#8E3F66',
		Archery: '#A86B35',
		Athletics: '#3FA769',
		Crafting: '#9A9A9A',
		Education: '#3C6FA8',
		Fighting: '#B1642F',
		Fortitude: '#A14646',
		Influence: '#B28A3F',
		Insight: '#2F6E9E',
		Lore: '#C2892F',
		Mysticism: '#914C70',
		Nature: '#3E9B4E',
		Perception: '#4B91C0',
		Stealth: '#777777',
		Streetwise: '#9C5635',
		Survival: '#48A06C',
	}

	return colorMap[skill] || '#3C6FA8' // default blue
}

// Color mapping for profession chips using colors from the updated skill palette
export const getProfessionChipColor = (profession: string): string => {
	const colorMap: Record<string, string> = {
		Alchemist: '#8E3F66', // purple (like Arcana)
		'Cloth Weaver': '#3C6FA8', // blue (like Education)
		Inscriber: '#C2892F', // gold (like Lore)
		Jeweler: '#B28A3F', // gold (like Influence)
		Leatherworker: '#A86B35', // brown (like Archery)
		Smith: '#B1642F', // brown (like Fighting)
		Woodworker: '#3E9B4E', // green (like Nature)
	}

	return colorMap[profession] || '#3C6FA8' // default blue
}

// Helper function to normalize skill names for migration
export const normalizeSkillName = (skillName: string): string | null => {
	const normalized = skillName.trim()

	// Find exact match first
	const exactMatch = OFFICIAL_SKILLS.find((skill) => skill === normalized)
	if (exactMatch) return exactMatch

	// Case-insensitive search
	const caseInsensitiveMatch = OFFICIAL_SKILLS.find(
		(skill) => skill.toLowerCase() === normalized.toLowerCase(),
	)
	if (caseInsensitiveMatch) return caseInsensitiveMatch

	// Partial match (for common variations)
	const partialMatches: Record<string, string> = {
		archery: 'Archery',
		athletics: 'Athletics',
		crafting: 'Crafting',
		education: 'Education',
		fighting: 'Fighting',
		fortitude: 'Fortitude',
		influence: 'Influence',
		insight: 'Insight',
		lore: 'Lore',
		mysticism: 'Mysticism',
		nature: 'Nature',
		perception: 'Perception',
		stealth: 'Stealth',
		streetwise: 'Streetwise',
		survival: 'Survival',
		arcana: 'Arcana',
		magic: 'Arcana', // common alternative
		melee: 'Fighting', // common alternative
		ranged: 'Archery', // common alternative
	}

	const key = normalized.toLowerCase()
	return partialMatches[key] || null
}

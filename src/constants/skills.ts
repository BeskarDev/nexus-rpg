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

// Color mapping for skill chips.
// M9 S1 (F2): these used to be a second, hand-picked hex per skill that
// disagreed with the doc-table chip colors for the same 16 skills. They now
// read the global `--cs-skill-*` custom properties in custom.css, which are
// derived from the same `--nexus-skill-*` identity tokens the doc chips use
// — a skill is one color site-wide (sheet, docs, and embedded doc-page tools
// like CreatureAdvancedSettings.tsx alike) instead of two palettes describing
// the same concept.
export const getSkillChipColor = (skill: string): string => {
	const colorMap: Record<string, string> = {
		Arcana: 'var(--cs-skill-arcana)',
		Archery: 'var(--cs-skill-archery)',
		Athletics: 'var(--cs-skill-athletics)',
		Crafting: 'var(--cs-skill-crafting)',
		Education: 'var(--cs-skill-education)',
		Fighting: 'var(--cs-skill-fighting)',
		Fortitude: 'var(--cs-skill-fortitude)',
		Influence: 'var(--cs-skill-influence)',
		Insight: 'var(--cs-skill-insight)',
		Lore: 'var(--cs-skill-lore)',
		Mysticism: 'var(--cs-skill-mysticism)',
		Nature: 'var(--cs-skill-nature)',
		Perception: 'var(--cs-skill-perception)',
		Stealth: 'var(--cs-skill-stealth)',
		Streetwise: 'var(--cs-skill-streetwise)',
		Survival: 'var(--cs-skill-survival)',
	}

	return colorMap[skill] || 'var(--cs-skill-education)' // default blue
}

// Color mapping for profession chips — each profession aliases the skill it
// was already documented as matching (see the original hex comments), so
// professions share the same identity color as their parent skill.
export const getProfessionChipColor = (profession: string): string => {
	const colorMap: Record<string, string> = {
		Alchemist: 'var(--cs-skill-arcana)', // like Arcana
		'Cloth Weaver': 'var(--cs-skill-education)', // like Education
		Inscriber: 'var(--cs-skill-lore)', // like Lore
		Jeweler: 'var(--cs-skill-influence)', // like Influence
		Leatherworker: 'var(--cs-skill-archery)', // like Archery
		Smith: 'var(--cs-skill-fighting)', // like Fighting
		Woodworker: 'var(--cs-skill-nature)', // like Nature
	}

	return colorMap[profession] || 'var(--cs-skill-education)' // default blue
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

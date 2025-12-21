import { OFFICIAL_SKILLS } from './skills'

const ABBREVIATIONS: Record<string, string> = {
	Fighting: 'FIG',
	Archery: 'ARC',
	Athletics: 'ATH',
	Fortitude: 'FOR',
	Influence: 'INF',
	Insight: 'INS',
	Perception: 'PER',
	Stealth: 'STL',
	Arcana: 'ARCN',
	Mysticism: 'MYS',
	Crafting: 'CRF',
	Education: 'EDU',
	Lore: 'LOR',
	Nature: 'NAT',
	Streetwise: 'STW',
	Survival: 'SUR',
}

export const getSkillAbbreviation = (skill?: string): string | undefined => {
	if (!skill) return undefined
	const normalized =
		OFFICIAL_SKILLS.find((s) => s.toLowerCase() === skill.toLowerCase()) ||
		skill
	return ABBREVIATIONS[normalized] || normalized.slice(0, 3).toUpperCase()
}

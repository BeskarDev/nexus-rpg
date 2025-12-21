import { Ability, Skill } from '@site/src/types/Character'

export type TalentPointSummary = {
	skill: string
	xp: number
	available: number
	spent: number
	missing: number
	overspent: number
}

export type TalentPointCalculation = {
	summaries: TalentPointSummary[]
	unassignedSpent: number
}

const getTalentPointCost = (ability: Ability) => ability.rank ?? 1

export const getTalentPointSummaries = (
	skills: Skill[],
	abilities: Ability[],
): TalentPointCalculation => {
	const talentAbilities = abilities.filter((ability) => ability.tag === 'Talent')

	const unassignedSpent = talentAbilities
		.filter((talent) => !talent.skill)
		.reduce((sum, talent) => sum + getTalentPointCost(talent), 0)

	const summaries: TalentPointSummary[] = skills.map((skill) => {
		const available = Math.floor(Math.max(skill.xp, 0) / 2)
		const spent = talentAbilities
			.filter((talent) => talent.skill === skill.name)
			.reduce((sum, talent) => sum + getTalentPointCost(talent), 0)
		const missing = Math.max(available - spent, 0)
		const overspent = Math.max(spent - available, 0)

		return {
			skill: skill.name,
			xp: skill.xp,
			available,
			spent,
			missing,
			overspent,
		}
	})

	return { summaries, unassignedSpent }
}

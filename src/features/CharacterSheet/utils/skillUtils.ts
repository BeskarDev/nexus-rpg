/**
 * Calculates skill rank based on experience points
 */
export function calculateSkillRank(xp: number): number {
	switch (true) {
		case xp <= 1:
			return 0
		case xp <= 5:
			return 1
		case xp <= 11:
			return 2
		case xp <= 19:
			return 3
		case xp <= 29:
			return 4
		default:
			return 5
	}
}

/**
 * Spent XP: the sum of every skill's XP. This is what `skills.xp.spend` stores, and
 * the only XP figure level is read from (owner ruling).
 */
export function calculateSpentXp(
	skills: ReadonlyArray<{ xp?: number }> | undefined,
): number {
	return (skills ?? []).reduce((sum, skill) => sum + (Number(skill.xp) || 0), 0)
}

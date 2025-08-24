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
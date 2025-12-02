/**
 * Calculate HP bar color based on current HP percentage
 * @param currentHp - Current HP value
 * @param maxHp - Maximum HP value
 * @returns Color string for HP bar (hex color code)
 */
export const getHpBarColor = (currentHp: number, maxHp: number): string => {
	if (maxHp <= 0) return '#4caf50' // Default to green if invalid max HP

	const hpPercentage = (currentHp / maxHp) * 100

	if (hpPercentage >= 50) return '#4caf50' // Green - healthy
	if (hpPercentage >= 25) return '#ff9800' // Orange - caution
	return '#f44336' // Red - danger
}

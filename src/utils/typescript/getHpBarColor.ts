/**
 * The ink for an HP readout, by how much of the pool is left.
 *
 * M9: this returned raw Material hexes (`#4caf50`, `#ff9800`, `#f44336`) until
 * the full-verification pass caught the "HP" card label at **2.36:1** in light
 * mode — a real AA failure on a text label, which is exactly what S0 existed to
 * remove. PR A missed it because its sweep covered `utils/colors.ts` and
 * `constants/`, and this function lives in neither; it was the last of the
 * Material palette anywhere in the sheet.
 *
 * The `--cs-*` tokens are PR A's, already measured >=4.5:1 as caption text
 * against both the sheet's paper and default backgrounds in both modes, and they
 * track light/dark from one declaration.
 *
 * Returned as `var()` rather than a literal on purpose: the one consumer
 * (`HpCard`) uses the value directly for the label ink, and never wraps it in
 * `alpha()` nor appends a hex alpha suffix — the two things that cannot parse a
 * custom property (see the PR A log for where that bit before).
 *
 * @param currentHp - Current HP value
 * @param maxHp - Maximum HP value
 * @returns A CSS colour for the HP label
 */
export const getHpBarColor = (currentHp: number, maxHp: number): string => {
	if (maxHp <= 0) return 'var(--cs-success)' // Default to healthy if invalid max HP

	const hpPercentage = (currentHp / maxHp) * 100

	if (hpPercentage >= 50) return 'var(--cs-success)' // healthy
	if (hpPercentage >= 25) return 'var(--cs-warning)' // caution
	return 'var(--cs-danger)' // danger
}

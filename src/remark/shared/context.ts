/**
 * Context predicates for deciding whether an ambiguous term is being used
 * mechanically or as flavor. See docs/analysis/keyword-chip-detection-plan.md
 * (Phase 3, §5.1).
 */

/**
 * A signal that a damage-type word is mechanical rather than descriptive: a
 * digit or dice value, or a damage/resistance/weakness/immunity word.
 * "6/9/12 poison damage" and "fire resistance" qualify; "shimmer of fire" and
 * "the temple was set on fire" do not.
 */
const DAMAGE_SIGNAL = /(\d|\bdamage\b|\bdmg\b|\bresist|\bweak|\bimmun)/i

/** How many characters on each side of the match count as "nearby". */
const DAMAGE_WINDOW = 24

/**
 * True when a damage signal appears within DAMAGE_WINDOW characters on either
 * side of a match. Used to gate damage-type chips so flavor mentions in prose
 * stay plain text.
 */
export function hasDamageContext(
	precedingText: string,
	followingText: string,
	window = DAMAGE_WINDOW,
): boolean {
	const near =
		precedingText.slice(-window) + ' ' + followingText.slice(0, window)
	return DAMAGE_SIGNAL.test(near)
}

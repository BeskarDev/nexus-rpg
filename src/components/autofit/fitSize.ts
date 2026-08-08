/**
 * The pure half of the measured autofit (M18 D2).
 *
 * Everything that can be reasoned about without a DOM lives here, so the part
 * that cannot be tested is as small as possible. The predicate is supplied by
 * the caller: in the browser it lays the body out and reads it back, in a test
 * it is a fake.
 */

export interface FitRange {
	/** The type floor, `--pc-text-micro`. Never go below it (M18 constraint 4). */
	min: number
	/** The body size, `--pc-text-body`. Never go above it. */
	max: number
	/**
	 * Bisection steps. Seven over a 3.5pt range resolves to ~0.03pt, which the
	 * 0.1pt rounding then makes stable enough to snapshot.
	 */
	steps?: number
}

export interface FitResult {
	/** The settled size in points, rounded to 0.1pt. */
	size: number
	/**
	 * True when the body still overflows at `min`. The card is knowingly
	 * overfull and the caller decides what to do about it — which is what makes
	 * the continuation card (M18 D3) possible at all. The character-count
	 * scheme could never know this.
	 */
	spills: boolean
	/**
	 * When the card spills: how many of its leading body blocks DO fit at the
	 * floor, and therefore where the continuation card starts (M18 D3).
	 *
	 * 0 means not even the first block fits alone — a content signal rather than
	 * a layout one, since splitting further would split a sentence. Absent when
	 * the card does not spill, and when the search was run without a DOM.
	 */
	fitBlocks?: number
}

/**
 * The largest size in `[min, max]` for which `fits(size)` holds, to 0.1pt.
 *
 * `fits` is assumed monotone: if the text fits at a size it fits at every
 * smaller one. That is true of a wrapped block whose leading is unitless
 * (trap 6) and is the only assumption the search makes.
 */
export function fitSize(
	fits: (pt: number) => boolean,
	{ min, max, steps = 7 }: FitRange,
): FitResult {
	if (fits(max)) return { size: round(max), spills: false }
	if (!fits(min)) return { size: round(min), spills: true }

	let lo = min
	let hi = max
	for (let i = 0; i < steps; i++) {
		const mid = (lo + hi) / 2
		if (fits(mid)) lo = mid
		else hi = mid
	}
	return { size: round(lo), spills: false }
}

/**
 * Round DOWN to 0.1pt.
 *
 * `Math.round` would be the obvious choice and is wrong here: the search's `lo`
 * is a size known to fit, and rounding it up to the nearest tenth hands back a
 * size nobody ever measured. At 0.05pt the difference is invisible on paper and
 * the guarantee is worth more than the tenth of a point.
 */
function round(pt: number): number {
	return Math.floor(pt * 10) / 10
}

import React from 'react'
import { fitSize, FitResult } from './fitSize'
import {
	autofitPending,
	beginFit,
	endFit,
	subscribeAutofit,
} from './autofitBarrier'

/**
 * Docusaurus server-renders these modules, and `useLayoutEffect` warns there
 * (trap 7). The server output is the unfitted card at full size, which is
 * correct: the printed artifact is only ever produced client-side.
 */
const useIsomorphicLayoutEffect =
	typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

/** The register's body size, and the card's floor. */
export const FIT_MAX_PT = 9

/**
 * The smallest a card body may be set (M18 constraint 4, raised 2026-08-07).
 *
 * `--pc-text-micro` (5.5pt) is the register's absolute floor and still is. The
 * CARD's floor is now `--pc-text-fine` (6.5pt): 5.5pt was set when the only
 * alternative to shrinking was clipping, and D3's continuation card removed
 * that trade. A body that will not fit at 6.5pt now buys a second card instead
 * of a magnifying glass (owner).
 */
export const FIT_MIN_PT = 6.5

/** The custom property the fitted region's type is sized from. */
export const FIT_VARIABLE = '--pc-card-body-pt'

/**
 * How much room a card must have SPARE to count as fitting.
 *
 * The test used to allow half a pixel of OVERFLOW, on the reasoning that
 * sub-pixel rounding should not force a spill. Backwards, twice over:
 *
 * 1. *Absolute Control* fitted its last line by 0.03px and printed without it.
 *    A pixel of required slack fixed the measurement — and it printed short
 *    again (owner, 2026-08-07).
 * 2. **The printer does not lay text out the way the screen does.** Chrome
 *    rasterizes the PDF at its own resolution, with its own hinting and its own
 *    rounding of every line box, so a card that fits the preview by a hair can
 *    take one line more on paper. No fixed pixel margin covers that, because
 *    the error scales with the type.
 *
 * So the slack is a FRACTION OF A LINE, and 0.4 of one is the working figure:
 * enough to absorb a line box rounding differently, small enough that it costs
 * a fraction of a point of type rather than a card.
 *
 * A minimum of one pixel still applies, for the degenerate case where the
 * measurement runs before the type has a size.
 */
export const FIT_SLACK_PX = 1
export const FIT_SLACK_LINES = 1

/** CSS resolves absolute units at 96dpi, in print as well as on screen. */
const PX_PER_PT = 96 / 72

/** The register's dense leading, which every fitted body is set on. */
const FITTED_LEADING = 1.15

/** The room a card must have spare at this type size, in layout pixels. */
function slackFor(pt: number): number {
	return Math.max(
		FIT_SLACK_PX,
		pt * PX_PER_PT * FITTED_LEADING * FIT_SLACK_LINES,
	)
}

export interface AutofitOptions {
	/**
	 * Cache key — a hash of the content, not the card's identity (trap 9).
	 * A preview re-render, a scroll or a selection change must not re-run two
	 * hundred binary searches.
	 */
	contentKey: string
	min?: number
	max?: number
	/** Called once the size has settled. `spills` drives M18 D3. */
	onSettled?: (result: FitResult) => void
}

/**
 * Measure a card body and set the largest type size that fits inside it.
 *
 * Takes TWO refs: the box the text has to fit inside, and the content that has
 * to fit in it. Both are needed because the question is fractional — see the
 * predicate, and trap 14.
 */
export function useAutofit(
	ref: React.RefObject<HTMLElement>,
	contentRef: React.RefObject<HTMLElement>,
	{ contentKey, min = FIT_MIN_PT, max = FIT_MAX_PT, onSettled }: AutofitOptions,
): FitResult | null {
	const [result, setResult] = React.useState<FitResult | null>(null)

	// Kept in a ref so a caller passing an inline arrow does not re-run the fit.
	const settledCallback = React.useRef(onSettled)
	settledCallback.current = onSettled

	useIsomorphicLayoutEffect(() => {
		const element = ref.current
		const content = contentRef.current
		if (!element || !content || typeof document === 'undefined') return

		let cancelled = false
		let counted = true
		beginFit()
		const release = () => {
			if (counted) {
				counted = false
				endFit()
			}
		}

		const measure = () => {
			if (cancelled) {
				release()
				return
			}
			const fits = (pt: number) => {
				element.style.setProperty(FIT_VARIABLE, `${pt}pt`)
				// Reading the boxes forces the layout the write above dirtied, so no
				// explicit reflow is needed.
				//
				// MEASURED FRACTIONALLY, and on the CONTENT rather than on its box.
				// `scrollHeight` is an integer and is never smaller than
				// `clientHeight`, so it can report "overflowing" but never "how much
				// room is left" — and it rounded away the 0.03px by which *Absolute
				// Control* overflowed, which printed as a missing last line (trap 14).
				//
				// `getBoundingClientRect` is in SCALED space (trap 5): the preview
				// draws the page at true millimetre size and scales it to the column.
				// Both boxes are read through the same scale and the slack is scaled
				// with them, so the answer cannot depend on the preview's width.
				const box = element.getBoundingClientRect()
				const scale =
					element.clientHeight > 0 ? box.height / element.clientHeight : 1
				const inner = content.getBoundingClientRect()
				// BOTH AXES. Height is what usually runs out, but a row of stats or
				// one long unhyphenated word runs off the side instead, and a card
				// that overflows horizontally clips just as silently — the creature
				// card's four-attribute row lost `MND d6` off the right edge while the
				// engine reported a comfortable fit.
				//
				// The slack is a HEIGHT rule only: text fills the measure exactly by
				// construction, so demanding spare width would fail every card.
				return (
					inner.height <= box.height - slackFor(pt) * scale &&
					inner.width <= box.width + 0.5 * scale
				)
			}
			const fitted = fitSize(fits, { min, max })
			element.style.setProperty(FIT_VARIABLE, `${fitted.size}pt`)
			const settled: FitResult = fitted.spills
				? { ...fitted, fitBlocks: countFittingBlocks(element, fits, min) }
				: fitted
			setResult(settled)
			settledCallback.current?.(settled)
			release()
		}

		// Trap 1, and the mechanism of the bug this milestone exists to fix:
		// measuring against the fallback font fits everything at 9pt, then
		// Spectral swaps in and every card overflows. When the fonts are already
		// loaded the fit is synchronous, which is what keeps a 200-card preview
		// from blinking through in waves (trap 8).
		const fonts = document.fonts
		if (!fonts || fonts.status === 'loaded') {
			measure()
		} else {
			fonts.ready.then(measure, measure)
		}

		return () => {
			cancelled = true
			release()
		}
	}, [ref, contentRef, contentKey, min, max])

	return result
}

/** The attribute a family puts on each splittable block of its body (D3). */
export const FIT_BLOCK_ATTRIBUTE = 'data-fit-block'

/**
 * Where to cut this body so it prints as two readable cards (D3).
 *
 * Only asked when the card has already been found to spill. Blocks are hidden
 * with `display: none` and the same `fits` predicate is re-run, so every answer
 * comes from the real laid-out card rather than from the text's length — the
 * mistake this whole milestone exists to undo.
 *
 * THREE NUMBERS, NOT ONE. The largest prefix that fits is only the upper bound;
 * cutting there fills card one to the brim at the floor and leaves card two
 * nearly empty, which is what *Beast Form* looked like (owner, 2026-08-07). So:
 *
 * - `maxFit`  — the largest prefix that fits. The cut cannot exceed it.
 * - `minKeep` — the smallest prefix whose REMAINDER still fits on one card. Cut
 *   below it and the second card spills too, buying a third card for nothing.
 * - `balance` — the prefix that puts about half the body's height on each card.
 *
 * The cut is `balance` clamped into `[minKeep, maxFit]`, so the split is as even
 * as it can be without costing paper. When `minKeep > maxFit` the body needs
 * more than two cards; the cut falls back to `maxFit` and the plan's next pass
 * splits the remainder.
 *
 * Returns 0 when even the first block will not fit alone: a content signal, not
 * a layout one, since splitting further would split a sentence.
 */
function countFittingBlocks(
	element: HTMLElement,
	fits: (pt: number) => boolean,
	floor: number,
): number {
	const blocks = Array.from(
		element.querySelectorAll<HTMLElement>(`[${FIT_BLOCK_ATTRIBUTE}]`),
	)
	if (blocks.length === 0) return 0

	/** Show blocks `[from, to)` and report whether the card fits at the floor. */
	const showRange = (from: number, to: number) => {
		blocks.forEach((block, index) => {
			block.style.display = index >= from && index < to ? '' : 'none'
		})
		return fits(floor)
	}
	const restore = () => {
		blocks.forEach((block) => {
			block.style.display = ''
		})
		fits(floor)
	}

	// Heights are read with everything visible, at the floor, so they describe
	// the body the reader will actually be handed.
	const heights = blocks.map((block) => block.getBoundingClientRect().height)
	const total = heights.reduce((sum, height) => sum + height, 0)

	// The largest prefix that fits. `lo` always fits (0 trivially does), `hi`
	// never does — the whole body, since this card spilled.
	let lo = 0
	let hi = blocks.length
	while (hi - lo > 1) {
		const mid = Math.floor((lo + hi) / 2)
		if (showRange(0, mid)) lo = mid
		else hi = mid
	}
	const maxFit = lo
	if (maxFit === 0) {
		restore()
		return 0
	}

	// The smallest prefix whose remainder fits on the next card. Monotone the
	// other way: the more this card keeps, the less is left to place.
	// `keepLo` never fits (0 keeps nothing, so the whole body would have to go
	// on the next card, and it already did not fit); `keepHi` always does (an
	// empty remainder trivially fits).
	let keepLo = 0
	let keepHi = blocks.length
	while (keepHi - keepLo > 1) {
		const mid = Math.floor((keepLo + keepHi) / 2)
		if (showRange(mid, blocks.length)) keepHi = mid
		else keepLo = mid
	}
	const minKeep = keepHi

	// Half the ink on each card.
	let running = 0
	let balance = 1
	for (let index = 0; index < heights.length; index++) {
		running += heights[index]
		if (running >= total / 2) {
			balance = index + 1
			break
		}
	}

	restore()
	if (minKeep > maxFit) return maxFit
	return Math.min(maxFit, Math.max(minKeep, balance, 1))
}

/**
 * How many cards are still measuring — for the tools' PRINT verb, which states
 * why it is disabled rather than going a mystery grey.
 */
export function useAutofitPending(): number {
	return React.useSyncExternalStore(
		subscribeAutofit,
		autofitPending,
		() => 0, // SSR: nothing is measuring on the server.
	)
}

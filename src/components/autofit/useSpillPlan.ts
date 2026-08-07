import React from 'react'
import type { FitResult } from './fitSize'

/**
 * Where each entry's cards start, in blocks (M18 D3).
 *
 * `[0]` is one card holding the whole body. `[0, 4]` is two: blocks 0-3 and
 * blocks 4-end. The list only ever grows, and only from a measurement.
 */
export type Cuts = number[]

export interface SpillPart {
	/** Index of the first body block on this card. */
	start: number
	/** One past the last, or `undefined` for "to the end". */
	end?: number
	/** 1-based, for the `1/2` mark. */
	part: number
	/** How many cards this entry prints as. */
	totalParts: number
}

export interface SpillPlan {
	/** The cards one entry prints as — one unless it has been found to spill. */
	partsFor: (key: string) => SpillPart[]
	/** Called by each card once its body has settled. */
	report: (key: string, start: number, result: FitResult) => void
	/** How many extra cards the deck has gained. For the tools' live count. */
	continuations: number
	/**
	 * Entries whose FIRST block will not fit on a card of its own. Splitting
	 * further would split a sentence (D3), so the layout stops and the tool says
	 * so — over-budget rules text is a content problem.
	 */
	oversize: string[]
}

interface PlanState {
	cuts: Record<string, Cuts>
	oversize: string[]
}

const ONE_CARD: Cuts = [0]

/**
 * Turn the cards' own spill reports into the final child list, BEFORE
 * `PrintPages` paginates (M18 D3, pattern file trap 11).
 *
 * The tool asks `partsFor` while building its children, so a card that has been
 * found to spill is already two children by the time the grid is computed. A
 * card that became two children *after* pagination would land on the wrong page
 * and push everything after it.
 *
 * It settles by iteration, and it has to: the only honest source for "where
 * does this body stop fitting" is the laid-out card, which does not exist until
 * it is rendered. A card reports, the plan gains a cut, the continuation
 * renders and reports in turn. Each pass strictly increases the number of cuts,
 * so it terminates — and the print barrier holds the dialog shut throughout,
 * because the report arrives from a layout effect BEFORE the card releases its
 * count.
 */
export function useSpillPlan(): SpillPlan {
	const [state, setState] = React.useState<PlanState>({
		cuts: {},
		oversize: [],
	})

	const report = React.useCallback(
		(key: string, start: number, result: FitResult) => {
			setState((current) => {
				const cuts = current.cuts[key] ?? ONE_CARD
				if (!result.spills) return current

				// Not even the first block fits alone. Splitting further means
				// splitting a sentence, so the plan stops and the tool reports it.
				if (!result.fitBlocks) {
					if (current.oversize.includes(key)) return current
					return { ...current, oversize: [...current.oversize, key] }
				}

				const cut = start + result.fitBlocks
				if (cuts.includes(cut)) return current
				const next = [...cuts, cut].sort((a, b) => a - b)
				return { ...current, cuts: { ...current.cuts, [key]: next } }
			})
		},
		[],
	)

	const partsFor = React.useCallback(
		(key: string): SpillPart[] => {
			const cuts = state.cuts[key] ?? ONE_CARD
			return cuts.map((start, index) => ({
				start,
				end: cuts[index + 1],
				part: index + 1,
				totalParts: cuts.length,
			}))
		},
		[state.cuts],
	)

	const continuations = React.useMemo(
		() =>
			Object.values(state.cuts).reduce(
				(total, cuts) => total + cuts.length - 1,
				0,
			),
		[state.cuts],
	)

	return { partsFor, report, continuations, oversize: state.oversize }
}

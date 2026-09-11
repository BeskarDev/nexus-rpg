import React from 'react'

/**
 * Hold a block to `lines` rendered lines, or release it when `lines` is 0.
 *
 * The line box is the only unit that ends text where a reader expects it to
 * end; a height in millimetres cuts through whatever letter happens to be there.
 */
function clampToLines(block: HTMLElement, lines: number): void {
	if (lines <= 0) {
		block.style.removeProperty('display')
		block.style.removeProperty('-webkit-box-orient')
		block.style.removeProperty('-webkit-line-clamp')
		block.style.removeProperty('overflow')
		return
	}
	block.style.display = '-webkit-box'
	block.style.setProperty('-webkit-box-orient', 'vertical')
	block.style.setProperty('-webkit-line-clamp', String(lines))
	block.style.overflow = 'hidden'
}

/** The attribute each cuttable block of a prose panel carries. */
export const SHEET_BLOCK_ATTRIBUTE = 'data-sheet-block'

/**
 * Docusaurus server-renders these modules and `useLayoutEffect` warns there.
 * The server output is the uncut panel, which is right: the printed artifact is
 * only ever produced client-side.
 */
const useIsomorphicLayoutEffect =
	typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

/**
 * How many leading blocks of a prose panel fit inside it (M19, owner-reported).
 *
 * ## The bug this answers
 *
 * The Personal sheet's two panels took whatever the player had written and grew
 * to hold it. A character with a dozen NPC relationships measured **434mm of
 * content in a 210mm page** — the sheet ran off the bottom of the paper, and the
 * pages after it in the print were pushed out of shape.
 *
 * ## Why measured and not counted
 *
 * The first instinct is a character budget. M18 F1 already paid for that lesson
 * on the card decks: the same string sets to a different number of lines at a
 * different measure, in a different font, with different words, and every budget
 * that looks right for one character is wrong for the next. So the panel is laid
 * out and READ: hide the trailing blocks, ask the box whether it fits, bisect.
 *
 * ## Why the largest prefix, and not a balanced cut
 *
 * `useAutofit`'s `fitBlocks` balances a body across two cards, because a card
 * that spills buys a continuation. This page cannot: the sheet is four pages and
 * a fold, and constraint 1 forbids a fifth. There is nowhere for a second half
 * to go, so the panel keeps **as much as it can hold** and the caller states what
 * it could not — the contract `Rows` already prints as "+ N more — see the app".
 *
 * Returns 0 when not even the first block fits alone. The caller still prints
 * that block, clipped, and says so: a player who wrote one long unbroken note
 * would otherwise be handed an empty panel and a footnote, which is worse than
 * the first half of their own sentence.
 */
export function useFittedBlocks(
	boxRef: React.RefObject<HTMLElement>,
	/**
	 * The ruled remainder below the box, which is SPACE THE PROSE MAY TAKE.
	 *
	 * Without it the measurement asks the wrong question. The write-lines fill
	 * every pixel the box is not using (`flex-grow: 1`), so by the time the box
	 * is measured there is no free space left to grow into: the panel reported
	 * 10.8mm of capacity inside a 141.6mm section, and one relationship "filled"
	 * it. The lines stand down for the duration of the search and the box asks
	 * the section for everything it has.
	 */
	fillRef: React.RefObject<HTMLElement>,
	count: number,
	contentKey: string,
): number {
	const [fitted, setFitted] = React.useState(count)

	useIsomorphicLayoutEffect(() => {
		const box = boxRef.current
		if (!box || typeof document === 'undefined') return
		if (count === 0) {
			setFitted(0)
			return
		}

		let cancelled = false

		const measure = () => {
			if (cancelled) return
			const blocks = Array.from(
				box.querySelectorAll<HTMLElement>(`[${SHEET_BLOCK_ATTRIBUTE}]`),
			)
			if (blocks.length === 0) return

			/*
			 * No layout, no answer. A box with zero height is not a full box — it is
			 * an environment that does not lay text out at all (jsdom), or a panel
			 * measured before it has been placed. Cutting on that reading would drop
			 * every block but one for a reason that has nothing to do with the page.
			 */
			if (box.clientHeight === 0) {
				setFitted(count)
				return
			}

			/*
			 * Measure against the space the panel COULD have, not the space it has
			 * while blocks are hidden.
			 *
			 * The box sizes to its content (`flex: 0 1 auto`) so that short prose
			 * leaves the rest of the panel as ruled writing lines. That makes the
			 * measurement circular: hide a block, the box shrinks, so the next
			 * block does not fit either, and the search converges on one block in a
			 * 2.6mm box. Growing the box for the duration of the search asks the
			 * real question — how much of this fits in the panel — and the box
			 * shrinks back to its content afterwards.
			 */
			const grow = box.style.flexGrow
			const fill = fillRef.current
			const fillDisplay = fill?.style.display
			box.style.flexGrow = '1'
			if (fill) fill.style.display = 'none'

			/** Show the first `n` blocks and report whether the panel holds them. */
			const holds = (n: number) => {
				blocks.forEach((block, index) => {
					block.style.display = index < n ? '' : 'none'
				})
				// Sub-pixel: a panel is "full" well before the browser rounds its
				// scroll height up, and a line that fits the screen by a hair can take
				// one more on paper (M18 trap 14). One pixel of required slack is what
				// that costs.
				return box.scrollHeight <= box.clientHeight + 1
			}

			// `lo` always holds (nothing trivially does), `hi` never does unless the
			// whole panel fits, which is checked first.
			let result = blocks.length
			if (!holds(blocks.length)) {
				let lo = 0
				let hi = blocks.length
				while (hi - lo > 1) {
					const mid = Math.floor((lo + hi) / 2)
					if (holds(mid)) lo = mid
					else hi = mid
				}
				result = lo
			}

			/*
			 * The HOOK owns `display`, and the render never sets it.
			 *
			 * The first version had React hide the cut blocks and this restore them
			 * to visible afterwards. React then had no reason to re-apply its own
			 * value — the prop had not changed — so the restore won, every block
			 * printed, and the overflow note sat under a panel that had dropped
			 * nothing. One owner per property.
			 */
			blocks.forEach((block, index) => {
				// Released BEFORE display is set: releasing clears `display` too, so
				// the other order wipes the `none` that was just written.
				clampToLines(block, 0)
				block.style.display = index < Math.max(result, 1) ? '' : 'none'
			})

			/*
			 * Nothing fits, so the first block is kept and cut to WHOLE LINES.
			 *
			 * Leaving it to `overflow: hidden` slices the last line through the
			 * middle of its letters, which reads as a rendering fault rather than as
			 * a deliberate stop. Clamping to the number of lines the panel holds
			 * ends the text on a baseline and gives it the ellipsis that says there
			 * is more.
			 */
			if (result === 0) {
				const first = blocks[0]
				const leading = parseFloat(window.getComputedStyle(first).lineHeight)
				if (leading > 0)
					clampToLines(first, Math.max(1, Math.floor(box.clientHeight / leading)))
			}

			box.style.flexGrow = grow
			if (fill) fill.style.display = fillDisplay ?? ''
			setFitted(result)
		}

		/*
		 * Measuring against the fallback font fits everything, then the real face
		 * swaps in and the panel overflows again — the same trap the card autofit
		 * documents. When the fonts are already loaded this is synchronous.
		 */
		const fonts = document.fonts
		if (!fonts || fonts.status === 'loaded') measure()
		else fonts.ready.then(measure, measure)

		return () => {
			cancelled = true
		}
	}, [boxRef, fillRef, count, contentKey])

	return Math.min(fitted, count)
}

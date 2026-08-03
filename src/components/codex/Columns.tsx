import React from 'react'
import styles from './Columns.module.css'

export type ColumnsLayout = 'flow' | 'grid'

export interface ColumnsProps {
	/** 2 by default. 3 is available for short index-like content only. */
	count?: 2 | 3
	/**
	 * `flow` (default) pours content down one track and up the next, the way a
	 * manual sets body text, and lets the browser balance the two.
	 *
	 * `grid` places whole blocks row by row — first left, second right, third
	 * left — which is what a catalogue of cards wants.
	 */
	layout?: ColumnsLayout
	children?: React.ReactNode
}

/**
 * A segment of the page set in two columns, the way a printed manual sets its
 * body text.
 *
 * It is OPT-IN and it is BOUNDED, both on purpose. A `column-count` applied to
 * the whole doc flow has unbounded height on a scrolling page: the reader
 * reaches the bottom of the left column and has to scroll back to the top for
 * the right one. Print gets two columns for free because a page ENDS. So the
 * author segments the page, and each segment is short enough to take in
 * without that round trip.
 *
 * ## Two layout modes, and why both exist
 *
 * `flow` is CSS multicol. It is right for prose, where the text is continuous
 * and the reader goes down one track and up the next.
 *
 * `grid` is CSS grid, and it is right for a run of CARDS. It is not merely a
 * preference:
 *
 * - **Reading order.** A catalogue is scanned, not read through. Row-major
 *   placement puts the first card left, the second right, the third left, so a
 *   reader comparing two entries has them side by side.
 * - **It has no fragmentation at all.** Multicol renders each column as a
 *   fragmentainer, and Chrome resolves a card's absolutely-positioned keystone
 *   against the wrong one whenever the card opens a column — the ornament for a
 *   right-column creature was landing a thousand pixels away in the left
 *   column. Grid places whole boxes, so the bug cannot occur.
 *
 * ## Why this does not "break out" of anything
 *
 * An earlier version measured the doc column in JS and pulled itself wider than
 * the sheet with negative margins. That could never work:
 * `.theme-doc-markdown` is BOTH the vellum surface (background, padding,
 * radius) and the width cap, so anything wider than the sheet is wider than its
 * own background and hangs off the parchment. Instead the SHEET widens for any
 * page containing one of these blocks — see the `:has(.codex-columns)` rule in
 * custom.css — and the stable `codex-columns` class is that rule's hook.
 */
export default function Columns({
	count = 2,
	layout = 'flow',
	children,
}: ColumnsProps) {
	return (
		<div
			className={`codex-columns ${styles.columns} ${layout === 'grid' ? styles.grid : ''}`}
			data-layout={layout}
			style={{ '--codex-column-count': count } as React.CSSProperties}
		>
			{children}
		</div>
	)
}

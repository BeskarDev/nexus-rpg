import { Box } from '@mui/material'
import React from 'react'

export interface DragMarkProps {
	/** Pixel size of the square mark. */
	size?: number
}

/**
 * The reorder grip — three inlaid lozenges (M13 S6).
 *
 * MUI's `DragHandle` is two hairline rules, which is Material's grip and also, on this
 * sheet, a pair of bare lines: the exact device the theme forbids as a grouping or accent
 * mark, appearing on every row of every reorderable list the moment reorder mode is on.
 *
 * The replacement is the shape language the sheet already uses for "a fixed point": the
 * same 3px diamond that is a corner rivet on a tile, a bullet in the docs, and the inlay
 * in a checked checkbox — stacked three high, which reads as a grip because a column of
 * studs is what you would actually hold on a carved panel.
 *
 * Not a sigil, and deliberately not in `sigil-paths.ts`: it depicts no object and carries
 * no meaning outside this control, which is the same reasoning `Chevron` and `GlossMark`
 * are kept out of `sigils:check`.
 */
export const DragMark: React.FC<DragMarkProps> = ({ size = 14 }) => (
	<Box
		component="svg"
		viewBox="0 0 16 16"
		aria-hidden="true"
		sx={{ width: size, height: size, display: 'block', fill: 'currentColor' }}
	>
		{[3, 8, 13].map((y) => (
			<polygon
				key={y}
				points={`8,${y - 2.4} 10.4,${y} 8,${y + 2.4} 5.6,${y}`}
			/>
		))}
	</Box>
)

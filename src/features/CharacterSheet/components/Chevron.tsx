import { Box } from '@mui/material'
import React from 'react'

export interface ChevronProps {
	/** Pixel size of the square mark. */
	size?: number
}

/**
 * The sheet's disclosure mark — drawn, not imported (M13 S2).
 *
 * MUI's `ExpandMore` is a hairline Material chevron, the same foreign register
 * `GlossMark` was created to avoid in S1, and it renders on every row and every
 * section header of four tabs — which makes it the most-rendered icon on the
 * sheet. A solid triangle keeps the rules a sigil keeps (solid `currentColor`
 * mass, real edges, no stroke, no rounded corners) without being a sigil: it
 * depicts no object and carries no meaning outside this control, so it stays out
 * of `sigil-paths.ts` and out of `sigils:check`, exactly like `GlossMark`.
 *
 * Always `aria-hidden`. The control that holds it carries the accessible state
 * (`aria-expanded` on an accordion summary, an explicit label on a button).
 */
export const Chevron: React.FC<ChevronProps> = ({ size = 10 }) => (
	<Box
		component="svg"
		viewBox="0 0 16 16"
		aria-hidden="true"
		sx={{ width: size, height: size, display: 'block', fill: 'currentColor' }}
	>
		<polygon points="2,5 14,5 8,12" />
	</Box>
)

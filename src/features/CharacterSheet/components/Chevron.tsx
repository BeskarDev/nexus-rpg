import { Box } from '@mui/material'
import React from 'react'

export interface ChevronProps {
	/** Pixel size of the square mark. */
	size?: number
}

/**
 * The sheet's disclosure mark — the site's own carved caret (M13 S2, recut in S6).
 *
 * ## What it was, twice
 *
 * First MUI's `ExpandMore`: a hairline Material chevron, on every row and every section
 * header of four tabs, which makes it the most-rendered icon on the sheet. S2 replaced
 * that with a solid triangle drawn here — right register, but a *second* answer to a
 * question the site had already answered.
 *
 * The docs' sidebar and its `<details>` summaries both draw their caret from
 * `--nexus-caret-glyph`: an arrowhead whose base is crenellated in the ziggurat's stepped
 * language, with an inlaid lozenge voided through its centre so it reads as cut stone
 * rather than as UI furniture. The sheet renders the same glyph now, so a disclosure looks
 * the same whether a reader meets it in the rules or on their character.
 *
 * A CSS mask rather than an inline `<svg>`: the glyph is a token, and a mask keeps it
 * tintable from `currentColor` the way the sidebar's is — an inline copy of the path here
 * would be the third place that outline lives.
 *
 * The token points UP (Infima orients it by rotation). This mark points DOWN at rest,
 * because that is what its consumers assume: MUI's `expandIcon` rotates 180° when open,
 * and `ListSection` rotates -90° when collapsed.
 *
 * Always `aria-hidden`. The control that holds it carries the accessible state
 * (`aria-expanded` on an accordion summary, an explicit label on a button).
 */
export const Chevron: React.FC<ChevronProps> = ({ size = 10 }) => (
	<Box
		component="span"
		className="cs-chevron"
		aria-hidden="true"
		sx={{
			display: 'block',
			width: size,
			height: size,
			backgroundColor: 'currentColor',
			transform: 'rotate(180deg)',
			WebkitMask: 'var(--nexus-caret-glyph) no-repeat center / contain',
			mask: 'var(--nexus-caret-glyph) no-repeat center / contain',
		}}
	/>
)

import { Typography } from '@mui/material'
import React from 'react'

export interface FieldGroupLabelProps {
	children: React.ReactNode
	sx?: React.ComponentProps<typeof Typography>['sx']
}

/**
 * The group label inside an editor popover — small caps, bronze, letterspaced
 * (M13 S1).
 *
 * ## Why this exists instead of a `Divider`
 *
 * The HP editor grouped its three registers with full-bleed `Divider`s. They are
 * correctly themed (bronze at 25%), but a horizontal rule spanning a 21rem
 * popover reads as *chrome cutting the panel into strips* rather than as
 * structure — and at that alpha on obsidian it reads as a neutral scratch, not a
 * cut line. Three groups plus two rules is five horizontal bands in a panel that
 * should read as one artifact.
 *
 * A named group is stronger and cheaper: it says what the group IS, which a rule
 * never does, and it needs no second element. Spacing carries the separation.
 * This is the same register `CardHeader` uses for a card's label, so an editor's
 * internal structure and the plate's own labelling speak with one voice.
 */
export const FieldGroupLabel: React.FC<FieldGroupLabelProps> = ({
	children,
	sx,
}) => (
	<Typography
		component="div"
		sx={{
			fontFamily: 'var(--nexus-font-ui)',
			fontWeight: 700,
			fontSize: 'var(--nexus-text-2xs)',
			fontVariant: 'small-caps',
			letterSpacing: '0.06em',
			color: 'primary.main',
			...sx,
		}}
	>
		{children}
	</Typography>
)

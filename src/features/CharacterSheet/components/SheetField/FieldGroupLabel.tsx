import { Box, Typography } from '@mui/material'
import React from 'react'
import StatSigil from '@site/src/components/codex/StatSigil'
import type {
	SheetSigilName,
	StatSigilName,
} from '@site/src/components/codex/stat-sigils'

export interface FieldGroupLabelProps {
	children: React.ReactNode
	/**
	 * The group's mark, drawn before its name (M13 S4d).
	 *
	 * A panel of five groups whose headings differ only in their WORDS has to be
	 * read to be navigated — which was the report on the item details panel: a
	 * player had to already know the layout to find the field they wanted. A mark
	 * is found at a glance, and the sheet already has one for most of these
	 * concepts (`coins` for the money group, `wound` for condition, `name` for
	 * identity), so this costs nothing against the sigil budget.
	 */
	sigil?: StatSigilName | SheetSigilName
	/**
	 * Live content riding at the group's right edge — a computed preview of what
	 * the group's fields produce, e.g. the damage ladder over the damage editor.
	 *
	 * A group of number fields does not say what those numbers come to. Showing the
	 * result beside the heading means an edit can be checked without closing the
	 * panel.
	 */
	trailing?: React.ReactNode
	sx?: React.ComponentProps<typeof Typography>['sx']
}

/**
 * The group label inside an editor popover or a details panel — small caps,
 * bronze, letterspaced, with its mark (M13 S1, extended in S4d).
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
	sigil,
	trailing,
	sx,
}) => (
	<Box
		sx={{
			display: 'flex',
			alignItems: 'center',
			gap: 0.75,
			// The preview is pushed to the group's far edge rather than tucked against
			// the heading, so the two do not read as one phrase.
			...(trailing && { justifyContent: 'space-between' }),
		}}
	>
		<Typography
			component="div"
			sx={{
				display: 'inline-flex',
				alignItems: 'center',
				gap: 0.5,
				fontFamily: 'var(--nexus-font-ui)',
				fontWeight: 700,
				fontSize: 'var(--nexus-text-2xs)',
				fontVariant: 'small-caps',
				letterSpacing: '0.06em',
				color: 'primary.main',
				...sx,
			}}
		>
			{sigil && <StatSigil name={sigil} size={13} />}
			{children}
		</Typography>
		{trailing}
	</Box>
)

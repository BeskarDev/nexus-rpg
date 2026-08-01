import { Box, Typography } from '@mui/material'
import React from 'react'

/**
 * Every ledger on the sheet collapses its columns at ONE width.
 *
 * Lifted here from `02_Items/components/ledgerColumns.ts` when the third ledger
 * arrived: three tabs each declaring 45rem is three chances to disagree about
 * where a row stops being a grid.
 */
export const LEDGER_BREAKPOINT = '@media (min-width: 45rem)'

export interface ReadCellProps {
	children: React.ReactNode
	/**
	 * The column this cell belongs to.
	 *
	 * Shown **only below the ledger breakpoint**, where the column header is gone
	 * and the row has wrapped. A read-only cell has no `<label>` of its own — that
	 * was the point of un-boxing it — so without this a narrow row degrades to a
	 * string of bare values: "light armor, +1 AV — 25 0".
	 */
	label?: string
	/** Prose reads flush left; a number reads centred under a centred heading. */
	align?: 'left' | 'center'
	/** Secondary facts (properties) sit back from the name they qualify. */
	muted?: boolean
	/** The one piece of text in a row that carries weight: its name. */
	strong?: boolean
	title?: string
}

/**
 * One read cell of a ledger row (M13 S4b; shared in S8c).
 *
 * ## Why a summary is mostly read cells
 *
 * D5: **a summary shows, and edits only what changes mid-fight.** Sorting a
 * row's fields by how often they are touched during a session rather than at
 * character creation puts almost everything in one bucket, and a value that is
 * not editable does not need a slot — a row of nine bordered boxes was most of
 * the 53px an inventory row used to occupy.
 *
 * ## Why it is shared now, having deliberately not been
 *
 * S5 wrote a local twin of this for the spell row and recorded the reason: what
 * the two rows genuinely shared was three declarations, and "lifting three
 * declarations into a shared cell would be the abstraction that has to grow a
 * prop for every difference."
 *
 * That was right with two consumers and is wrong with three. The predicted prop
 * did appear — `strong`, on the spell row's name — and it appeared as a fork
 * rather than as a parameter, which is the outcome the copy was meant to avoid.
 * Abilities would have been the third copy of the same ellipsis-and-label
 * behaviour. So the general cell is here; the cells that carry ITEM behaviour
 * (`UsesCell`, the wear pips) stay in `02_Items/`, because that half of the S5
 * reasoning still holds.
 */
export const ReadCell: React.FC<ReadCellProps> = ({
	children,
	label,
	align = 'left',
	muted,
	strong,
	title,
}) => (
	<Typography
		component="div"
		title={title ?? (typeof children === 'string' ? children : undefined)}
		sx={{
			minWidth: 0,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			textAlign: align,
			fontSize: 'var(--nexus-text-dense)',
			...(align === 'center' && { fontVariantNumeric: 'tabular-nums' }),
			...(muted && { color: 'text.secondary' }),
			...(strong && { fontWeight: 600 }),
		}}
	>
		{label && <span className="cs-cell-label">{label}</span>}
		{children}
	</Typography>
)

/**
 * A column this row shape reserves but has no value for (M13 S4d).
 *
 * Every section of a tab shares one template so the tab has one vertical grid,
 * which means a Folk ability still has to occupy the Skill track a Talent fills.
 * `aria-hidden` because there is nothing here to announce — the cell exists for
 * the geometry, not the record.
 */
export const SpacerCell: React.FC = () => (
	// Only below the breakpoint does it need saying: there is no grid there, so a
	// reserved-but-empty cell is just an extra flex gap in a wrapped row.
	<Box
		aria-hidden="true"
		sx={{ display: 'none', [LEDGER_BREAKPOINT]: { display: 'block' } }}
	/>
)

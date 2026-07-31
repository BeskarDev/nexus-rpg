import { Box, Typography } from '@mui/material'
import React from 'react'
import { PipRow } from '../../../components'
import { UI_COLORS } from '../../../../../utils/colors'
import { LEDGER_BREAKPOINT } from './ledgerColumns'

/**
 * The three kinds of cell an inventory row is made of (M13 S4b).
 *
 * ## Why a row has only three
 *
 * D5: **a summary shows, and edits only what changes mid-fight.** Sorting every
 * item field by how often it is touched during a session rather than at
 * character creation puts almost everything in one bucket — name, damage,
 * properties, cost, load, quality, durability, slot are read constantly and
 * edited almost never — and exactly two in the other: `uses`, because an item
 * degrades on a botch, and `amount`, because ammo and consumables are spent.
 *
 * Those two are the item equivalent of HP and conditions, and every earlier
 * slice in this milestone landed on the same answer for that class of value: it
 * is acted on where the player is already looking, one tap, no mode switch. So
 * the row is text plus two controls, and everything else moved into the details
 * panel.
 *
 * The consequence that matters for density: a value that is not editable does
 * not need a slot, and a row of nine bordered boxes was most of the 53px it
 * occupied.
 */

export interface ReadCellProps {
	children: React.ReactNode
	/**
	 * The column this cell belongs to.
	 *
	 * Shown **only below the ledger breakpoint**, where the column header is gone
	 * and the row has wrapped. A read-only cell has no `<label>` of its own — that
	 * was the point of un-boxing it — so without this a narrow row degrades to a
	 * string of bare numbers: "light armor, +1 AV — 25 0". The editable cells kept
	 * their labels through the same collapse; these had none to keep.
	 */
	label?: string
	/** Prose reads flush left; a number reads centred under a centred heading. */
	align?: 'left' | 'center'
	/** Secondary facts (properties) sit back from the name they qualify. */
	muted?: boolean
	title?: string
}

export const ReadCell: React.FC<ReadCellProps> = ({
	children,
	label,
	align = 'left',
	muted,
	title,
}) => (
	<Typography
		component="div"
		title={title}
		sx={{
			minWidth: 0,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			textAlign: align,
			fontSize: 'var(--nexus-text-dense)',
			...(align === 'center' && { fontVariantNumeric: 'tabular-nums' }),
			...(muted && { color: 'text.secondary' }),
		}}
	>
		{label && <span className="cs-cell-label">{label}</span>}
		{children}
	</Typography>
)

/**
 * A column this row shape reserves but has no value for (M13 S4d).
 *
 * Every section shares one template so the tab has one vertical grid, which
 * means an item row still has to occupy the damage track and a weapon row the
 * slot track. `aria-hidden` because there is nothing here to announce — the
 * cell exists for the geometry, not the record.
 */
export const SpacerCell: React.FC = () => (
	// Only below the breakpoint does it need saying: there is no grid there, so a
	// reserved-but-empty cell is just an extra flex gap in a wrapped row.
	<Box
		aria-hidden="true"
		sx={{ display: 'none', [LEDGER_BREAKPOINT]: { display: 'block' } }}
	/>
)

/** The row's name cell — the one piece of text that carries weight. */
export const NameCell: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => (
	<Typography
		component="div"
		title={typeof children === 'string' ? children : undefined}
		sx={{
			minWidth: 0,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			fontSize: 'var(--nexus-text-dense)',
			fontWeight: 600,
		}}
	>
		{children}
	</Typography>
)

/**
 * ## Amount is NOT a cell any more (M13 S4d, owner call)
 *
 * It was `AmountCell`, the row's one bordered input; it is a `ReadCell` now and
 * its editor lives in the details panel with the rest of the item's definition.
 * S4b's D5 kept it in the row because ammo and consumables are spent mid-session
 * — true, but a stack count is not adjusted at the pace `uses` is, and this field
 * was the only frame left in a summary whose whole point was to stop being a form.
 * On a wrapped row it was also the only cell that could not sit on one line with
 * its label, because MUI floats a field's label above it.
 *
 * So `uses` is the only control a row still owns: three pips, no frame. One
 * control per row, and it is the one that changes every fight.
 */

/**
 * The wear track: three pips, filled as the item is used up.
 *
 * `hp` / `wound` — the intact vessel and the broken one — is the pair already in
 * `stat-sigils.ts` for exactly this reading, so wear costs no new mark against
 * the F7 budget. A fully-worn item shows three broken jars in the danger ink,
 * which is the same "this is bad now" signal the attribute wound slots give.
 */
export const UsesCell: React.FC<{
	uses: number
	onChange: (uses: number) => void
	name: string
	max?: number
}> = ({ uses, onChange, name, max = 3 }) => (
	/* The pips had no label at all — the only cell on the row that lost its column
		name below the breakpoint, where three bare jars name nothing (M13 S4d).
		Centred on desktop, where the header names them and the label is hidden. */
	<Box
		sx={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'flex-start',
			[LEDGER_BREAKPOINT]: { justifyContent: 'center' },
		}}
	>
		<span className="cs-cell-label">Uses</span>
		<PipRow
			count={max}
			value={uses}
			onChange={onChange}
			sigil="wound"
			emptySigil="hp"
			tone={uses >= max ? UI_COLORS.danger : UI_COLORS.warning}
			label={`${name} uses`}
		/>
	</Box>
)

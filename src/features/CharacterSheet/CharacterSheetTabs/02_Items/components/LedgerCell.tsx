import { Box, Typography } from '@mui/material'
import React from 'react'
import { PipRow } from '../../../components'
import { UI_COLORS } from '../../../../../utils/colors'
import { LEDGER_BREAKPOINT } from './ledgerColumns'

/*
	`ReadCell` and `SpacerCell` moved to `components/LedgerCell` in S8c, when the
	ability ledger became the third consumer of the same three declarations. They
	are re-exported here so the Items tab's own imports keep reading from one
	place, and because `UsesCell` below genuinely is item behaviour and stays.
*/
export { ReadCell, SpacerCell } from '../../../components'
export type { ReadCellProps } from '../../../components/LedgerCell/LedgerCell'

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

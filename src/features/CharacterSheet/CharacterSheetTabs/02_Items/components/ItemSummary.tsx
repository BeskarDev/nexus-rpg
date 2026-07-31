import React from 'react'
import { Item } from '@site/src/types/Character'
import { MarkedOption, slotSigil } from '../utils/itemMarks'
import { NameCell, ReadCell, SpacerCell, UsesCell } from './LedgerCell'

export type ItemSummaryProps = {
	item: Item
	/** The equipment section is the only one where an item occupies a body slot. */
	showSlot?: boolean
	onUsesChange: (uses: number) => void
}

/**
 * The collapsed view of an item — a ledger line, not a form (M13 S4b).
 *
 * Was seven bordered inputs: name, properties, a disabled location, cost, load,
 * amount, a disabled uses readout. Four of those were editable in the row and
 * two more were *also* editable in the details panel, so the same value had two
 * homes and the row showed you things you could not change beside things you
 * could.
 *
 * Per D5 it is text plus the two counters that move during play. Everything that
 * defines the item — its name, cost, load, quality, durability, where it is
 * kept — lives in the details panel, which is now the only place it can be
 * changed. See {@link ReadCell} for the reasoning behind the split.
 *
 * Cell ORDER is load-bearing: it must match `LEDGER_COLUMNS` for the shape this
 * row renders under, because the section's column header names those columns
 * once at the top and the two read the same template.
 */
export const ItemSummary: React.FC<ItemSummaryProps> = ({
	item,
	showSlot = false,
	onUsesChange,
}) => {
	const properties = Array.isArray(item.properties)
		? item.properties.join(', ')
		: ''

	return (
		<>
			<NameCell>{item.name}</NameCell>
			{/* The shape's own column: the body slot here, damage on a weapon, air on a
				plain item. One track, because no shape has two (M13 S4d). */}
			{showSlot ? (
				/* The slot carries its mark in the ROW too, not only in the details select
					(M13 S4d): the column is the one place a player compares slots across
					items, so it is where a mark earns the most. */
				<ReadCell label="Slot" muted>
					<MarkedOption sigil={slotSigil(item.slot)}>
						{item.slot || '—'}
					</MarkedOption>
				</ReadCell>
			) : (
				<SpacerCell />
			)}
			<ReadCell label="Properties" muted title={properties}>
				{properties}
			</ReadCell>
			<ReadCell label="Cost" align="center">
				{item.cost ?? 0}
			</ReadCell>
			<ReadCell label="Load" align="center">
				{item.load ?? item.weight ?? 0}
			</ReadCell>
			<ReadCell label="Amount" align="center">
				{item.amount ?? 0}
			</ReadCell>
			<UsesCell
				uses={item.uses || 0}
				onChange={onUsesChange}
				name={item.name}
			/>
		</>
	)
}

import React from 'react'
import { Box } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
import type { SheetSigilName } from '@site/src/components/codex/stat-sigils'
import type { EquipmentSlotType } from '@site/src/types/Character'
import type { ItemLocation } from '@site/src/types/ItemLocation'

/**
 * The marks for an item's PLACEMENT — where it is, and what it is worn on
 * (M13 S4d).
 *
 * Location and slot were the last two selects on the details panel whose options
 * were words alone, while every other row in the record plate carried a mark. The
 * marks themselves are in `stat-sigils.ts` (`location-*`, `slot-*`) with the
 * reasoning for each assignment; this module is only the mapping from the game's
 * value to the mark's name, plus the one renderer both selects use.
 */
export const LOCATION_SIGIL: Record<ItemLocation, SheetSigilName> = {
	worn: 'location-worn',
	carried: 'location-carried',
	mount: 'location-mount',
	storage: 'location-storage',
}

export const SLOT_SIGIL: Record<string, SheetSigilName> = {
	head: 'slot-head',
	neck: 'slot-neck',
	back: 'slot-back',
	body: 'slot-body',
	hands: 'slot-hands',
	ring: 'slot-ring',
	waist: 'slot-waist',
	feet: 'slot-feet',
}

/**
 * One option in a placement select: its mark, then its name.
 *
 * MUI renders the selected option's children as the closed value, so a marked
 * option list marks the field too — the same trick the damage type select uses. The
 * word stays beside the mark in both places: a dropdown is where a player LEARNS
 * which mark is which, and eight body slots is more than anyone reads off silhouette
 * alone.
 */
export const MarkedOption: React.FC<{
	sigil?: SheetSigilName
	children: React.ReactNode
}> = ({ sigil, children }) => (
	// `inline-flex`, not `flex`: in a ledger row below the column breakpoint the cell's
	// own label is an inline span before this, and a block-level value pushed it onto
	// its own line — the slot was the one cell whose label sat above its value while
	// every sibling read `LABEL value` (S4e, owner review).
	<Box
		component="span"
		sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6, minWidth: 0 }}
	>
		{sigil && <StatSigil name={sigil} size={14} />}
		{children}
	</Box>
)

export const slotSigil = (slot: EquipmentSlotType | undefined) =>
	slot ? SLOT_SIGIL[slot] : undefined

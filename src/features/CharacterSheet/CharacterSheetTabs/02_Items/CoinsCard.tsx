import React from 'react'
import { TextField } from '@mui/material'
import { SheetField } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

export type CoinsCardProps = {
	coins: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

/**
 * Coins — a value edited in place rather than through an editor popover
 * (M13 S4).
 *
 * On `SheetField` like every other card, but with no `editor`: coins change by
 * arbitrary amounts constantly during play, so a popover would be a step in the
 * way. The field is the read state AND the write state, which is why the input
 * keeps its own bare styling instead of taking the slot — a slot inside a card
 * would be a box inside a box.
 */
export const CoinsCard: React.FC<CoinsCardProps> = ({ coins, updateCharacter }) => (
	<SheetField sigil="coins" label="Coins" tone={UI_COLORS.amber} minWidth="8rem">
		<TextField
			type="number"
			value={coins}
			onChange={(event) =>
				updateCharacter({ items: { coins: Number(event.target.value) } })
			}
			inputProps={{ min: 0, 'aria-label': 'Coins' }}
			variant="standard"
			sx={{
				'& .MuiInputBase-root': {
					backgroundColor: 'transparent',
					borderColor: 'transparent',
				},
				'& input': {
					textAlign: 'center',
					fontWeight: 'bold',
					fontSize: 'var(--nexus-text-lg)',
				},
			}}
		/>
	</SheetField>
)

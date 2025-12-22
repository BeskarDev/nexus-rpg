import React from 'react'
import { TextField } from '@mui/material'
import { Paid } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

export type CoinsCardProps = {
	coins: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

export const CoinsCard: React.FC<CoinsCardProps> = ({ coins, updateCharacter }) => {
	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Paid />} label="Coins" color={UI_COLORS.amber} />}
			tooltip="Coins: Your current wealth"
			minWidth="8rem"
		>
			<TextField
				type="number"
				value={coins}
				onChange={(event) =>
					updateCharacter({ items: { coins: Number(event.target.value) } })
				}
				inputProps={{ min: 0 }}
				variant="standard"
				sx={{
					'& .MuiInput-root': {
						'&:before, &:after': { display: 'none' },
					},
					'& input': {
						textAlign: 'center',
						fontWeight: 'bold',
						fontSize: '0.95rem',
					},
				}}
			/>
		</CharacterSheetCard>
	)
}

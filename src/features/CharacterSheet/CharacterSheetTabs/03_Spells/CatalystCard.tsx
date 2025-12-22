import React from 'react'
import { TextField } from '@mui/material'
import { FlashOn } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

interface CatalystCardProps {
	spellCatalystDamage: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

export const CatalystCard: React.FC<CatalystCardProps> = ({
	spellCatalystDamage,
	updateCharacter,
}) => {
	return (
		<CharacterSheetCard
			header={<CardHeader icon={<FlashOn />} label="Catalyst" color={UI_COLORS.lightBlue} />}
			tooltip="Bonus damage per success level from your Spell Catalyst"
			minWidth="4rem"
		>
			<TextField
				variant="standard"
				size="small"
				type="number"
				value={spellCatalystDamage || 0}
				onChange={(event) =>
					updateCharacter({
						spells: {
							spellCatalystDamage: parseInt(event.target.value) || 0,
						},
					})
				}
				InputProps={{
					disableUnderline: true,
					sx: {
						fontWeight: 'bold',
						fontSize: '0.85rem',
						textAlign: 'center',
						'& input': {
							textAlign: 'center',
							p: 0,
						},
					},
				}}
				sx={{ maxWidth: '3rem' }}
			/>
		</CharacterSheetCard>
	)
}

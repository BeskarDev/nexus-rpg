import React from 'react'
import { TextField } from '@mui/material'
import { Star } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

interface SpecializationCardProps {
	specialization: string
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

export const SpecializationCard: React.FC<SpecializationCardProps> = ({
	specialization,
	updateCharacter,
}) => {
	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Star />} label="Spec." color={UI_COLORS.amber} />}
			tooltip="Your magical specialization or tradition"
			minWidth="5rem"
		>
			<TextField
				variant="standard"
				size="small"
				value={specialization}
				onChange={(event) =>
					updateCharacter({
						spells: { specialization: event.target.value },
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
				sx={{ maxWidth: '5rem' }}
			/>
		</CharacterSheetCard>
	)
}

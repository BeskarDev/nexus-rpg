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
			header={<CardHeader icon={<Star />} label="Specializations" color={UI_COLORS.amber} />}
			tooltip="Your magical specialization or tradition"
			minWidth="16rem"
		>
			<TextField
				value={specialization}
				onChange={(e) => updateCharacter({ spells: { specialization: e.target.value } })}
				placeholder="Enter specializations..."
				variant="standard"
				sx={{
					'& .MuiInput-root': {
						fontSize: '0.95rem',
						fontWeight: 'bold',
						'&:before, &:after': { display: 'none' },
					},
					'& input': {
						textAlign: 'center',
						padding: 0,
						height: 'auto',
						lineHeight: 1.2,
					},
					width: '100%',
				}}
			/>
		</CharacterSheetCard>
	)
}

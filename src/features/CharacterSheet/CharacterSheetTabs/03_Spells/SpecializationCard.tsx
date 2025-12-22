import React from 'react'
import { Typography } from '@mui/material'
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
			minWidth="12rem"
		>
			<Typography
				sx={{
					fontWeight: 'bold',
					fontSize: '0.95rem',
					lineHeight: 1.2,
				}}
			>
				{specialization || '—'}
			</Typography>
		</CharacterSheetCard>
	)
}

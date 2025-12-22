import React from 'react'
import { TextField } from '@mui/material'
import { EmojiEvents } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface MotivationCardProps {
	motivation: string
	onChange: (value: string) => void
	onBlur: () => void
	error?: string
}

export const MotivationCard: React.FC<MotivationCardProps> = ({
	motivation,
	onChange,
	onBlur,
	error,
}) => {
	return (
		<CharacterSheetCard
			header={<CardHeader icon={<EmojiEvents />} label="Motivation" color={UI_COLORS.greyBlue} />}
			tooltip="Character's driving goal or motivation"
			minWidth="8rem"
			maxWidth="12rem"
		>
			<TextField
				value={motivation}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				error={!!error}
				placeholder="Enter motivation..."
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

import React from 'react'
import { TextField } from '@mui/material'
import { Person } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface NameCardProps {
	name: string
	onChange: (value: string) => void
	onBlur: () => void
	error?: string
}

export const NameCard: React.FC<NameCardProps> = ({ name, onChange, onBlur, error }) => {
	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Person />} label="Name" color={UI_COLORS.greyBlue} />}
			tooltip="Character name"
			minWidth="10rem"
			maxWidth="15rem"
		>
			<TextField
				value={name}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				error={!!error}
				placeholder="Enter name..."
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

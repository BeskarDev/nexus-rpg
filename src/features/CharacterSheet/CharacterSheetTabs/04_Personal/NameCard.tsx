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
				variant="standard"
				size="small"
				value={name}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				error={!!error}
				helperText={error}
				InputProps={{
					disableUnderline: true,
					sx: {
						fontSize: '0.85rem',
						'& input': {
							textAlign: 'center',
							p: 0.5,
						},
					},
				}}
				sx={{ width: '100%' }}
			/>
		</CharacterSheetCard>
	)
}

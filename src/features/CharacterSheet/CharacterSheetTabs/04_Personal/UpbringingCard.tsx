import React from 'react'
import StatSigil from '@site/src/components/codex/StatSigil'
import { Box, TextField, IconButton } from '@mui/material'
import { Edit } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface UpbringingCardProps {
	upbringing: string
	onChange: (value: string) => void
	onBlur: () => void
	onEditClick: () => void
	error?: string
}

export const UpbringingCard: React.FC<UpbringingCardProps> = ({
	upbringing,
	onChange,
	onBlur,
	onEditClick,
	error,
}) => {
	return (
		<CharacterSheetCard
			header={<CardHeader icon={<StatSigil name="upbringing" size="1.15em" />} label="Upbringing" color={UI_COLORS.greyBlue} />}
			minWidth="8rem"
			maxWidth="12rem"
			frame
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, width: '100%' }}>
				<TextField
					variant="standard"
					size="small"
					value={upbringing}
					onChange={(e) => onChange(e.target.value)}
					onBlur={onBlur}
					error={!!error}
					InputProps={{
						disableUnderline: true,
						sx: {
							fontSize: '0.85rem',
							flex: 1,
							'& input': {
								textAlign: 'center',
								p: 0.5,
							},
						},
					}}
					sx={{ flex: 1 }}
				/>
				<IconButton
					size="small"
					onClick={onEditClick}
					sx={{ p: 0.25 }}
					title="Select from list"
				>
					<Edit sx={{ fontSize: '1rem' }} />
				</IconButton>
			</Box>
		</CharacterSheetCard>
	)
}

import React, { useState } from 'react'
import { TextField, Menu, Typography } from '@mui/material'
import { Person } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { SectionHeader } from '../../CharacterSheet'

interface NameCardProps {
	name: string
	onChange: (value: string) => void
	onBlur: () => void
	error?: string
}

export const NameCard: React.FC<NameCardProps> = ({ name, onChange, onBlur, error }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
		onBlur()
	}

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Person />} label="Name" color={UI_COLORS.greyBlue} />}
			tooltip="Character name"
			minWidth="10rem"
			maxWidth="15rem"
			showConfigButton
			onConfigClick={handleClick}
			configMenu={
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{ sx: { p: 2, maxWidth: '16rem' } }}
				>
					<SectionHeader>Edit Name</SectionHeader>
					<TextField
						size="small"
						value={name}
						onChange={(e) => onChange(e.target.value)}
						error={!!error}
						helperText={error}
						label="Character Name"
						fullWidth
						sx={{ mt: 1 }}
					/>
				</Menu>
			}
		>
			<Typography
				sx={{
					fontWeight: 'bold',
					fontSize: '0.95rem',
					lineHeight: 1.2,
				}}
			>
				{name || '—'}
			</Typography>
		</CharacterSheetCard>
	)
}

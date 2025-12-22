import React, { useState } from 'react'
import { TextField, Menu, Typography } from '@mui/material'
import { EmojiEvents } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { SectionHeader } from '../../CharacterSheet'

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
			header={<CardHeader icon={<EmojiEvents />} label="Motivation" color={UI_COLORS.greyBlue} />}
			tooltip="Character's driving goal or motivation"
			minWidth="8rem"
			maxWidth="12rem"
			showConfigButton
			onConfigClick={handleClick}
			configMenu={
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{ sx: { p: 2, maxWidth: '16rem' } }}
				>
					<SectionHeader>Edit Motivation</SectionHeader>
					<TextField
						size="small"
						value={motivation}
						onChange={(e) => onChange(e.target.value)}
						error={!!error}
						label="Motivation"
						fullWidth
						multiline
						minRows={2}
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
				{motivation || '—'}
			</Typography>
		</CharacterSheetCard>
	)
}

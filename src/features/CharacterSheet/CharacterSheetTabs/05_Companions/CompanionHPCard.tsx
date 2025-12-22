import React from 'react'
import { TextField, Box, Typography } from '@mui/material'
import { Favorite } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface CompanionHPCardProps {
	currentHP: number
	maxHP: number
	onCurrentHPChange: (value: string) => void
	onMaxHPChange: (value: string) => void
}

export const CompanionHPCard: React.FC<CompanionHPCardProps> = ({
	currentHP,
	maxHP,
	onCurrentHPChange,
	onMaxHPChange,
}) => {
	const hpPercentage = maxHP > 0 ? (currentHP / maxHP) * 100 : 0
	const hpColor = hpPercentage >= 50 ? UI_COLORS.success : hpPercentage >= 20 ? UI_COLORS.warning : UI_COLORS.danger

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Favorite />} label="HP" color={UI_COLORS.danger} />}
			tooltip="Companion hit points"
			minWidth="10rem"
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
				<TextField
					type="number"
					size="small"
					value={currentHP || 0}
					onChange={(e) => {
						e.stopPropagation()
						onCurrentHPChange(e.target.value)
					}}
					onClick={(e) => e.stopPropagation()}
					InputProps={{
						sx: {
							fontWeight: 'bold',
							fontSize: '0.85rem',
							textAlign: 'center',
							color: hpColor,
							'& input': {
								textAlign: 'center',
								p: 0.5,
							},
						},
					}}
					sx={{ width: 60 }}
				/>
				<Typography sx={{ fontWeight: 'bold', color: 'text.secondary' }}>/</Typography>
				<TextField
					type="number"
					size="small"
					value={maxHP || 0}
					onChange={(e) => {
						e.stopPropagation()
						onMaxHPChange(e.target.value)
					}}
					onClick={(e) => e.stopPropagation()}
					InputProps={{
						sx: {
							fontWeight: 'bold',
							fontSize: '0.85rem',
							textAlign: 'center',
							'& input': {
								textAlign: 'center',
								p: 0.5,
							},
						},
					}}
					sx={{ width: 60 }}
				/>
			</Box>
		</CharacterSheetCard>
	)
}

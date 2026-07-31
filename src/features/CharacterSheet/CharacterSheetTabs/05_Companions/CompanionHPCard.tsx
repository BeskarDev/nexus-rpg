import React from 'react'
import { Box, LinearProgress, TextField, Typography } from '@mui/material'
import { SheetField, AdjustStepper } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { SectionHeader } from '../../CharacterSheet'

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
	const hpColor =
		hpPercentage >= 50
			? UI_COLORS.success
			: hpPercentage >= 25
				? UI_COLORS.warning
				: UI_COLORS.danger

	const adjust = (delta: number) =>
		onCurrentHPChange(
			String(Math.max(0, Math.min(maxHP, currentHP + delta))),
		)

	return (
		<SheetField
			label="HP"
			sigil="hp"
			tone={hpColor}
			editLabel="Edit companion hit points"
			size="md"
			editorWidth="12rem"
			footer={
				<Box sx={{ width: '100%', mt: 0.5, px: 1 }}>
					{/* Track colour comes from the theme's MuiLinearProgress override
					    (PR B) — the local `alpha(divider, 0.2)` fill that used to sit
					    here beat it on specificity and kept the Material grey. */}
					<LinearProgress
						variant="determinate"
						value={hpPercentage}
						sx={{
							height: 4,
							borderRadius: 1,
							'& .MuiLinearProgress-bar': { backgroundColor: hpColor },
						}}
					/>
				</Box>
			}
			editor={
				<>
					<SectionHeader>HP Settings</SectionHeader>
					<TextField
						type="number"
						size="small"
						label="Max HP"
						value={maxHP || 0}
						onChange={(event) => onMaxHPChange(event.target.value)}
						fullWidth
						sx={{ mb: 2 }}
					/>
					<AdjustStepper
						decreaseLabel="Damage"
						increaseLabel="Healing"
						onDecrease={(amount) => adjust(-amount)}
						onIncrease={(amount) => adjust(amount)}
					/>
				</>
			}
		>
			<Typography sx={{ fontWeight: 'bold', fontSize: 'var(--nexus-text-lg)', lineHeight: 1.2 }}>
				{currentHP} / {maxHP}
			</Typography>
		</SheetField>
	)
}

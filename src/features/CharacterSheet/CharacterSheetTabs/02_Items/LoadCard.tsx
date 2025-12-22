import React, { useState } from 'react'
import { Box, Menu, TextField, Typography, alpha } from '@mui/material'
import { FitnessCenter } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { SectionHeader } from '../../CharacterSheet'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

export type LoadCardProps = {
	currentLoad: number
	carryCapacity: number
	maxCapacity: number
	carryModifier: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

const getLoadColor = (
	currentLoad: number,
	carryCapacity: number,
	maxCapacity: number,
) => {
	if (currentLoad >= maxCapacity) {
		return UI_COLORS.danger
	} else if (currentLoad >= carryCapacity) {
		return UI_COLORS.warning
	}
	return UI_COLORS.greyBlue
}

export const LoadCard: React.FC<LoadCardProps> = ({
	currentLoad,
	carryCapacity,
	maxCapacity,
	carryModifier,
	updateCharacter,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const loadColor = getLoadColor(currentLoad, carryCapacity, maxCapacity)

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const tooltipText = currentLoad >= carryCapacity
		? "Encumbered: +1 bane on STR/AGI movement, can't Dash/Evade, +1 Fatigue during travel"
		: "Load: Current encumbrance vs carrying capacity (max is 2× capacity)"

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<FitnessCenter />} label="Load" color={loadColor} />}
			showConfigButton
			onConfigClick={handleClick}
			tooltip={tooltipText}
			minWidth="5.5rem"
			borderColor={currentLoad >= carryCapacity ? loadColor : undefined}
			footer={
				<Typography
					variant="caption"
					sx={{ fontSize: '0.55rem', color: 'text.secondary' }}
				>
					max {maxCapacity}
				</Typography>
			}
			configMenu={
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{ sx: { p: 2, maxWidth: '12rem' } }}
				>
					<SectionHeader>Carry Modifier</SectionHeader>
					<Typography variant="caption" color="text.secondary">
						Base: ½ STR + 8
					</Typography>
					<TextField
						type="number"
						size="small"
						value={carryModifier}
						onChange={(event) =>
							updateCharacter({
								items: {
									encumbrance: { carryModifier: Number(event.target.value) },
								},
							})
						}
						label="Modifier"
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
					textAlign: 'center',
					color: 'text.primary',
				}}
			>
				{currentLoad}/{carryCapacity}
			</Typography>
		</CharacterSheetCard>
	)
}

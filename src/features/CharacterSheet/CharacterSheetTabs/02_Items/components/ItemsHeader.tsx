import React from 'react'
import { Box, Tooltip, Theme } from '@mui/material'
import { HelpOutline } from '@mui/icons-material'
import { AttributeField } from '../../../CharacterSheet'
import { CharacterDocument } from '../../../../../types/Character'
import { DeepPartial } from '../../../CharacterSheetContainer'

interface ItemsHeaderProps {
	coins: number
	currentLoad: number
	carryCapacity: number
	maxCapacity: number
	carryModifier: number
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

const getLoadColor =
	(currentLoad: number, carryCapacity: number, maxCapacity: number) =>
	(theme: Theme) => {
		if (currentLoad >= maxCapacity) {
			return theme.palette.error.main
		} else if (currentLoad >= carryCapacity) {
			return theme.palette.warning.main
		}
		return theme.palette.text.primary
	}

export const ItemsHeader: React.FC<ItemsHeaderProps> = ({
	coins,
	currentLoad,
	carryCapacity,
	maxCapacity,
	carryModifier,
	updateCharacter,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				flexWrap: 'wrap',
				mb: 2,
				columnGap: 1,
			}}
		>
			<AttributeField
				type="number"
				size="medium"
				value={coins}
				onChange={(event) =>
					updateCharacter({ items: { coins: Number(event.target.value) } })
				}
				label="Coins"
				sx={{
					maxWidth: '12rem',
					'& .MuiOutlinedInput-root': {
						'& .MuiOutlinedInput-notchedOutline': {
							borderWidth: '2px',
						},
					},
				}}
				inputProps={{
					sx: {
						textAlign: 'right',
					},
				}}
			/>
			<AttributeField
				disabled
				size="medium"
				value={currentLoad}
				label="Current Load"
				sx={{
					maxWidth: '6rem',
					'& .MuiFormLabel-root.MuiInputLabel-root.Mui-disabled': {
						color: getLoadColor(currentLoad, carryCapacity, maxCapacity),
					},
					'& .MuiOutlinedInput-root': {
						'& .MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled': {
							color: getLoadColor(currentLoad, carryCapacity, maxCapacity),
							WebkitTextFillColor: getLoadColor(
								currentLoad,
								carryCapacity,
								maxCapacity,
							),
						},
						'& .MuiOutlinedInput-notchedOutline': {
							borderColor: getLoadColor(
								currentLoad,
								carryCapacity,
								maxCapacity,
							),
							borderWidth: '2px',
						},
					},
				}}
			/>
			<AttributeField
				type="number"
				size="small"
				value={carryCapacity}
				disabled
				label="Carry Capacity"
				helperText="½ STR + 8"
				sx={{
					maxWidth: '6rem',
				}}
			/>
			<AttributeField
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
				label="Mod"
				helperText=" "
				sx={{
					maxWidth: '3.5rem',
				}}
			/>
			<AttributeField
				type="number"
				size="small"
				value={maxCapacity}
				disabled
				label="Max"
				helperText=" "
				sx={{
					maxWidth: '3.5rem',
				}}
			/>
			<Tooltip
				title={
					<>
						<b>Encumbered.</b> While encumbered, you suffer the following
						effects:
						<br />
						- You suffer +1 bane on Strength/Agility rolls for any kind of
						movement (climbing, swimming, jumping, …)
						<br />
						- You can't take the Dash Action or the Evade Quick Action
						<br />- Whenever you suffer Fatigue during travel, you suffer +1
						Fatigue
						<br />
						You can never physically carry more than 2 x your carrying capacity.
					</>
				}
			>
				<HelpOutline fontSize="small" sx={{ mt: 1, mb: 'auto' }} />
			</Tooltip>
		</Box>
	)
}

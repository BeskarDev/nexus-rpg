import React, { useState } from 'react'
import { Menu, TextField } from '@mui/material'
import { Token } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader, CardContent } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { characterSheetActions } from '../../characterSheetReducer'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

export const ResolveCard = () => {
	const dispatch = useAppDispatch()
	const { resolve } = useAppSelector(
		(state) => state.characterSheet.activeCharacter.statistics,
	)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Token />} label="Resolve" color={UI_COLORS.resolve} />}
			minWidth="4.5rem"
			maxWidth="5rem"
			tooltip="Resolve: Resource for rerolls and special actions (max 3)"
			showConfigButton
			onConfigClick={handleClick}
			configMenu={
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{ sx: { p: 2, maxWidth: '12rem' } }}
				>
					<SectionHeader>Edit Resolve</SectionHeader>
					<TextField
						type="number"
						size="small"
						value={resolve}
						onChange={(event) =>
							updateCharacter({
								statistics: { resolve: Number(event.target.value) },
							})
						}
						inputProps={{ min: 0, max: 3 }}
						label="Resolve"
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
				{resolve}
			</Typography>
		</CharacterSheetCard>
	)
}

import React from 'react'
import { Box, TextField } from '@mui/material'
import { Stars } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { characterSheetActions } from '../../characterSheetReducer'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'

export type XpCardProps = {
	total: number
	spent: number
}

export const XpCard: React.FC<XpCardProps> = ({ total, spent }) => {
	const dispatch = useAppDispatch()

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const remaining = total - spent

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Stars />} label="Experience" color={UI_COLORS.amber} />}
			minWidth="9rem"
			tooltip="Experience Points: Total earned and spent on skills and abilities"
		>
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				<TextField
					type="number"
					value={total}
					onChange={(event) =>
						updateCharacter({
							skills: { xp: { total: Number(event.target.value) } },
						})
					}
					variant="standard"
					label="Total"
					InputProps={{
						disableUnderline: true,
						inputProps: { min: 0 },
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
					InputLabelProps={{
						sx: { fontSize: '0.7rem' },
					}}
					sx={{ maxWidth: '3.5rem' }}
				/>
				<Box sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>/</Box>
				<TextField
					type="number"
					value={spent}
					disabled
					variant="standard"
					label="Spent"
					InputProps={{
						disableUnderline: true,
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
					InputLabelProps={{
						sx: { fontSize: '0.7rem' },
					}}
					sx={{ maxWidth: '3.5rem' }}
				/>
				<Box sx={{ fontSize: '0.7rem', color: remaining >= 0 ? UI_COLORS.success : UI_COLORS.danger }}>
					({remaining >= 0 ? '+' : ''}{remaining})
				</Box>
			</Box>
		</CharacterSheetCard>
	)
}

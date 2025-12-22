import React from 'react'
import { TextField } from '@mui/material'
import { Token } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
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

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Token />} label="Resolve" color={UI_COLORS.resolve} />}
			minWidth="4.5rem"
			maxWidth="5rem"
			tooltip="Resource for rerolls and special actions (max 3)"
		>
			<TextField
				type="number"
				value={resolve}
				onChange={(event) =>
					updateCharacter({
						statistics: { resolve: Number(event.target.value) },
					})
				}
				inputProps={{ min: 0, max: 3 }}
				variant="standard"
				sx={{
					'& .MuiInput-root': {
						fontSize: '0.95rem',
						fontWeight: 'bold',
						'&:before, &:after': { display: 'none' },
					},
					'& input': {
						textAlign: 'center',
						padding: 0,
						height: 'auto',
						lineHeight: 1.2,
					},
					width: '100%',
				}}
			/>
		</CharacterSheetCard>
	)
}

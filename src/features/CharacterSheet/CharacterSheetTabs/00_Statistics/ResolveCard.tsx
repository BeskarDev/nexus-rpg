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

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Token />} label="Resolve" color={UI_COLORS.resolve} />}
			minWidth="4.5rem"
			maxWidth="5rem"
			tooltip="Your reserve of determination (max 3)"
		>
			<TextField
				type="number"
				value={resolve}
				onChange={(event) =>
					updateCharacter({
						statistics: { resolve: Number(event.target.value) },
					})
				}
				variant="standard"
				InputProps={{
					disableUnderline: true,
					inputProps: { min: 0, max: 3 },
					sx: {
						fontWeight: 'bold',
						fontSize: '0.95rem',
						textAlign: 'center',
						'& input': {
							textAlign: 'center',
							p: 0,
						},
					},
				}}
				sx={{ maxWidth: '3rem' }}
			/>
		</CharacterSheetCard>
	)
}

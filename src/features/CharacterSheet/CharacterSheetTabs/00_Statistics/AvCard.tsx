import { SectionHeader } from '../../CharacterSheet'
import { useActiveDerivedCharacter } from '../../hooks/useActiveDerivedCharacter'
import { Typography, Box } from '@mui/material'
import React from 'react'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { SheetField, DerivedPart } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

export const AvCard = () => {
	const dispatch = useAppDispatch()
	// Armor, helmet and shield are read from the worn kit and the folk bonus from
	// abilities (`deriveCharacter`), the same as the printed sheet. Only `other`
	// is an input.
	const { av } = useActiveDerivedCharacter()
	const totalAV = av.total

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const setOther = (value: number) =>
		updateCharacter({ statistics: { av: { other: value } } })

	return (
		<SheetField
			label="AV"
			sigil="av"
			tone={UI_COLORS.greyBlue}
			// M9 S6: read often, edited almost never — so it sits in the defence
			// band with no keyline or wash of its own.
			weight="band"
			minWidth="4rem"
			maxWidth="5rem"
			info="Armor Value: Damage reduction from armor, helmet, and shield"
			value={totalAV}
			editorWidth="17.5rem"
			editor={
				<>
					<SectionHeader>AV Calculator</SectionHeader>
					<Typography variant="subtitle2">
						Armor, helmet and shield come from your worn kit. Add anything else
						under Other.
					</Typography>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
						<DerivedPart auto value={av.armor} label="Armor" />
						<DerivedPart auto value={av.helmet} label="Helmet" />
						<DerivedPart auto value={av.shield} label="Shield" />
						<DerivedPart value={av.other} label="Other" onChange={setOther} />
						<DerivedPart
							auto
							value={av.auto}
							label="Auto"
							sx={{ width: '4rem' }}
						/>
					</Box>
				</>
			}
		/>
	)
}

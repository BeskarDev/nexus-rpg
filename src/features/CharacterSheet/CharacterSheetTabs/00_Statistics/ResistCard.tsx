import { SectionHeader } from '../../CharacterSheet'
import { Typography } from '@mui/material'
import React from 'react'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useActiveDerivedCharacter } from '../../hooks/useActiveDerivedCharacter'
import { SheetField, DerivedPart } from '../../components'
import { ATTRIBUTE_COLORS } from '../../../../utils/colors'

export const ResistCard = () => {
	const dispatch = useAppDispatch()

	/*
		Every part of Resist comes from `deriveCharacter`, which the printed sheet
		reads too. Base and level bonus are recomputed from the character, and
		`other` is the one input. This card used to hold its own write-back effect
		and fell back to a stored total until its calculator was first opened.
	*/
	const { resist: derived } = useActiveDerivedCharacter()
	const autoBase = derived.base
	const autoLevelBonus = derived.levelBonus
	const totalResist: number = derived.total

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	return (
		<SheetField
			label="Resist"
			sigil="resist"
			tone={ATTRIBUTE_COLORS.mind}
			// M9 S6: read often, edited almost never — so it sits in the defence
			// band with no keyline or wash of its own.
			weight="band"
			size="sm"
			info="Resist: Defense against mental and magical effects (5 + 1/2 Spirit/Mind + level bonus)"
			value={totalResist}
			editor={
				<>
					<SectionHeader>Resist Calculator</SectionHeader>
					<Typography variant="subtitle2">
						Set the individual sources of Resist defense.
					</Typography>
					<DerivedPart
						auto
						value={autoBase}
						label="Base"
						helperText="5 + 1/2 Spirit/Mind"
					/>
					<DerivedPart auto value={autoLevelBonus} label="Level Bonus" />
					<DerivedPart
						value={derived.other}
						label="Other"
						onChange={(other) =>
							updateCharacter({
								statistics: { resistDetails: { other } },
							})
						}
					/>
				</>
			}
		/>
	)
}

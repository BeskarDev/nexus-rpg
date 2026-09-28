import { SectionHeader } from '../../CharacterSheet'
import { Typography } from '@mui/material'
import React from 'react'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useActiveDerivedCharacter } from '../../hooks/useActiveDerivedCharacter'
import { ATTRIBUTE_COLORS } from '../../../../utils/colors'
import { SheetField, DerivedPart } from '../../components'

export const DodgeCard = () => {
	const dispatch = useAppDispatch()

	/*
		Every part of Dodge comes from `deriveCharacter`, which the printed sheet
		reads too. Base and level bonus are recomputed from the character, and
		`other` is the one input. This card used to hold its own write-back effect
		and fell back to a stored total until its calculator was first opened.
	*/
	const { dodge: derived } = useActiveDerivedCharacter()
	const autoBase = derived.base
	const autoLevelBonus = derived.levelBonus
	const totalDodge: number = derived.total

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	return (
		<SheetField
			label="Dodge"
			sigil="dodge"
			tone={ATTRIBUTE_COLORS.agility}
			// M9 S6: read often, edited almost never — so it sits in the defence
			// band with no keyline or wash of its own.
			weight="band"
			size="sm"
			info="Dodge: Defense against ranged attacks (5 + 1/2 Agility + level bonus)"
			value={totalDodge}
			editor={
				<>
					<SectionHeader>Dodge Calculator</SectionHeader>
					<Typography variant="subtitle2">
						Set the individual sources of Dodge defense.
					</Typography>
					<DerivedPart
						auto
						value={autoBase}
						label="Base"
						helperText="5 + 1/2 Agility"
					/>
					<DerivedPart auto value={autoLevelBonus} label="Level Bonus" />
					<DerivedPart
						value={derived.other}
						label="Other"
						onChange={(other) =>
							updateCharacter({
								statistics: { dodgeDetails: { other } },
							})
						}
					/>
				</>
			}
		/>
	)
}

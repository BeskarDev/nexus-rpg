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

export const ParryCard = () => {
	const dispatch = useAppDispatch()

	/*
		Every part of Parry comes from `deriveCharacter`, which the printed sheet
		reads too. Base and level bonus are recomputed from the character, and
		`other` is the one input. This card used to hold its own write-back effect
		and fell back to a stored total until its calculator was first opened.
	*/
	const { parry: derived } = useActiveDerivedCharacter()
	const autoBase = derived.base
	const autoLevelBonus = derived.levelBonus
	const totalParry: number = derived.total

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	return (
		<SheetField
			label="Parry"
			sigil="parry"
			tone={ATTRIBUTE_COLORS.strength}
			// M9 S6: read often, edited almost never — so it sits in the defence
			// band with no keyline or wash of its own.
			weight="band"
			size="sm"
			info="Parry: Defense against melee attacks (7 + Fighting + level bonus + shield)"
			value={totalParry}
			editor={
				<>
					<SectionHeader>Parry Calculator</SectionHeader>
					<Typography variant="subtitle2">
						Set the individual sources of Parry defense.
					</Typography>
					<DerivedPart
						auto
						value={autoBase}
						label="Base"
						helperText="7 + Fighting"
					/>
					<DerivedPart auto value={autoLevelBonus} label="Level Bonus" />
					<DerivedPart
						auto
						value={derived.shieldBonus}
						label="Shield Bonus"
						helperText="From your equipped shield"
					/>
					<DerivedPart
						value={derived.other}
						label="Other"
						onChange={(other) =>
							updateCharacter({
								statistics: { parryDetails: { other } },
							})
						}
					/>
				</>
			}
		/>
	)
}

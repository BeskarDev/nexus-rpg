import { useMemo } from 'react'
import { SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Typography } from '@mui/material'
import React from 'react'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import {
	calculateResistBase,
	calculateDefenseLevelBonus,
	migrateCharacterDefenses,
} from '../../utils/calculateDefenses'
import { SheetField, DerivedPart } from '../../components'
import { ATTRIBUTE_COLORS } from '../../../../utils/colors'

export const ResistCard = () => {
	const dispatch = useAppDispatch()
	const activeCharacter = useAppSelector(
		(state) => state.characterSheet.activeCharacter,
	)
	const { resistDetails, resist } = activeCharacter.statistics

	// Calculate auto values
	const autoBase = calculateResistBase(activeCharacter)
	const autoLevelBonus = calculateDefenseLevelBonus(
		activeCharacter.skills.xp.total,
	)

	// Use detailed structure if available, otherwise create default values
	const details = resistDetails || {
		base: autoBase,
		levelBonus: autoLevelBonus,
		other: 0,
	}

	const totalResist: number = useMemo(
		() => details.base + details.levelBonus + details.other,
		[details.base, details.levelBonus, details.other],
	)

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	// Sync auto-calculated values when they change
	React.useEffect(() => {
		if (resistDetails) {
			updateCharacter({
				statistics: {
					resistDetails: {
						base: autoBase,
						levelBonus: autoLevelBonus,
					},
					resist: totalResist,
				},
			})
		}
	}, [autoBase, autoLevelBonus, totalResist])

	// Initialize detailed structure if it doesn't exist
	const initializeDetails = () => {
		const migratedDefenses = migrateCharacterDefenses(activeCharacter)
		updateCharacter({
			statistics: {
				resistDetails: migratedDefenses.resistDetails,
				resist: activeCharacter.statistics.resist, // Preserve the old manual value
			},
		})
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
			value={resistDetails ? totalResist : resist}
			onEditOpen={resistDetails ? undefined : initializeDetails}
			editor={
				<>
					<SectionHeader>Resist Calculator</SectionHeader>
					<Typography variant="subtitle2">
						Set the individual sources of Resist defense.
					</Typography>
					<DerivedPart auto value={autoBase} label="Base" helperText="5 + 1/2 Spirit/Mind" />
					<DerivedPart auto value={autoLevelBonus} label="Level Bonus" />
					<DerivedPart
						value={details.other}
						label="Other"
						onChange={(other) =>
							updateCharacter({
								statistics: {
									resistDetails: { other },
									resist: autoBase + autoLevelBonus + other,
								},
							})
						}
					/>
				</>
			}
		/>
	)
}

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
	calculateDodgeBase,
	calculateDefenseLevelBonus,
	migrateCharacterDefenses,
} from '../../utils/calculateDefenses'
import { ATTRIBUTE_COLORS } from '../../../../utils/colors'
import { SheetField, DerivedPart } from '../../components'

export const DodgeCard = () => {
	const dispatch = useAppDispatch()
	const activeCharacter = useAppSelector(
		(state) => state.characterSheet.activeCharacter,
	)
	const { dodgeDetails, dodge } = activeCharacter.statistics

	// Calculate auto values
	const autoBase = calculateDodgeBase(activeCharacter)
	const autoLevelBonus = calculateDefenseLevelBonus(
		activeCharacter.skills.xp.total,
	)

	// Use detailed structure if available, otherwise create default values
	const details = dodgeDetails || {
		base: autoBase,
		levelBonus: autoLevelBonus,
		other: 0,
	}

	const totalDodge: number = useMemo(
		() => details.base + details.levelBonus + details.other,
		[details.base, details.levelBonus, details.other],
	)

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	// Sync auto-calculated values when they change
	React.useEffect(() => {
		if (dodgeDetails) {
			updateCharacter({
				statistics: {
					dodgeDetails: {
						base: autoBase,
						levelBonus: autoLevelBonus,
					},
					dodge: totalDodge,
				},
			})
		}
	}, [autoBase, autoLevelBonus, totalDodge])

	// Initialize detailed structure if it doesn't exist
	const initializeDetails = () => {
		const migratedDefenses = migrateCharacterDefenses(activeCharacter)
		updateCharacter({
			statistics: {
				dodgeDetails: migratedDefenses.dodgeDetails,
				dodge: activeCharacter.statistics.dodge, // Preserve the old manual value
			},
		})
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
			value={dodgeDetails ? totalDodge : dodge}
			// The first activation ALSO migrates the legacy flat value into the
			// detailed structure, so later edits persist. It no longer *replaces*
			// opening the editor: gating the editor on the migrated structure made
			// the first click look like it did nothing (it dispatched, so only the
			// save control moved) and forced a second click. `details` already falls
			// back to the auto-derived values, so the editor can always render.
			onEditOpen={dodgeDetails ? undefined : initializeDetails}
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
						value={details.other}
						label="Other"
						onChange={(other) =>
							updateCharacter({
								statistics: {
									dodgeDetails: { other },
									dodge: autoBase + autoLevelBonus + other,
								},
							})
						}
					/>
				</>
			}
		/>
	)
}

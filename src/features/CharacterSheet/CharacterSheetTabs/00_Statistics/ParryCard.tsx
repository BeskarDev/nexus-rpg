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
	calculateParryBase,
	calculateDefenseLevelBonus,
	migrateCharacterDefenses,
} from '../../utils/calculateDefenses'
import { extractShieldParryBonus } from '../02_Items/utils/itemUtils'
import { organizeItemsByLocation } from '../02_Items/utils/itemUtils'
import { SheetField, DerivedPart } from '../../components'
import { ATTRIBUTE_COLORS } from '../../../../utils/colors'

export const ParryCard = () => {
	const dispatch = useAppDispatch()
	const activeCharacter = useAppSelector(
		(state) => state.characterSheet.activeCharacter,
	)
	const { parryDetails, parry } = activeCharacter.statistics

	// Calculate auto values
	const autoBase = calculateParryBase(activeCharacter)
	const autoLevelBonus = calculateDefenseLevelBonus(
		activeCharacter.skills.xp.total,
	)

	// Get shield bonus from equipped items
	const itemsByLocation = useMemo(() => {
		return organizeItemsByLocation(
			activeCharacter.items.weapons,
			activeCharacter.items.items,
		)
	}, [activeCharacter.items.weapons, activeCharacter.items.items])

	const autoShieldBonus = extractShieldParryBonus(itemsByLocation)

	// Use detailed structure if available, otherwise create default values
	const details = parryDetails || {
		base: autoBase,
		levelBonus: autoLevelBonus,
		shieldBonus: autoShieldBonus,
		other: 0,
	}

	const totalParry: number = useMemo(
		() =>
			details.base + details.levelBonus + details.shieldBonus + details.other,
		[details.base, details.levelBonus, details.shieldBonus, details.other],
	)

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	// Sync auto-calculated values when they change
	React.useEffect(() => {
		if (parryDetails) {
			// Only auto-update shield bonus if it's currently 0 or matches the previous auto value
			const shouldUpdateShieldBonus =
				details.shieldBonus === 0 || details.shieldBonus === autoShieldBonus

			updateCharacter({
				statistics: {
					parryDetails: {
						base: autoBase,
						levelBonus: autoLevelBonus,
						...(shouldUpdateShieldBonus
							? { shieldBonus: autoShieldBonus }
							: {}),
					},
					parry: totalParry,
				},
			})
		}
	}, [autoBase, autoLevelBonus, autoShieldBonus, totalParry, parryDetails])

	// Initialize detailed structure if it doesn't exist
	const initializeDetails = () => {
		const migratedDefenses = migrateCharacterDefenses(activeCharacter)
		updateCharacter({
			statistics: {
				parryDetails: migratedDefenses.parryDetails,
				parry: activeCharacter.statistics.parry, // Preserve the old manual value
			},
		})
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
			value={parryDetails ? totalParry : parry}
			onEditOpen={parryDetails ? undefined : initializeDetails}
			editor={
				<>
					<SectionHeader>Parry Calculator</SectionHeader>
					<Typography variant="subtitle2">
						Set the individual sources of Parry defense.
					</Typography>
					<DerivedPart auto value={autoBase} label="Base" helperText="7 + Fighting" />
					<DerivedPart auto value={autoLevelBonus} label="Level Bonus" />
					<DerivedPart
						value={details.shieldBonus}
						label="Shield Bonus"
						helperText={
							autoShieldBonus > 0 ? `Auto: ${autoShieldBonus}` : undefined
						}
						onChange={(shieldBonus) =>
							updateCharacter({
								statistics: {
									parryDetails: { shieldBonus },
									parry:
										autoBase + autoLevelBonus + shieldBonus + details.other,
								},
							})
						}
					/>
					<DerivedPart
						value={details.other}
						label="Other"
						onChange={(other) =>
							updateCharacter({
								statistics: {
									parryDetails: { other },
									parry:
										autoBase + autoLevelBonus + autoShieldBonus + other,
								},
							})
						}
					/>
				</>
			}
		/>
	)
}

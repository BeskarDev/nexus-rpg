import { useMemo } from 'react'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Settings, Speed } from '@mui/icons-material'
import { Menu, Typography } from '@mui/material'
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
import { CharacterSheetCard, CardHeader, CardContent } from '../../components'

export const DodgeCard = () => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
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

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

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

	const displayValue = dodgeDetails ? totalDodge : dodge

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Speed />} label="Dodge" color="#81c784" />}
			showConfigButton
			onConfigClick={dodgeDetails ? handleClick : initializeDetails}
			tooltip="Click gear to configure Dodge sources"
			minWidth="5rem"
			sx={{ height: '3.25rem' }}
			configMenu={
				dodgeDetails && (
					<Menu
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{ sx: { p: 2, maxWidth: '17rem' } }}
					>
						<SectionHeader>Dodge Calculator</SectionHeader>
						<Typography variant="subtitle2">
							Set the individual sources of Dodge defense.
						</Typography>
						<AttributeField
							disabled
							type="number"
							size="small"
							value={autoBase}
							label="Base"
							helperText="7 + Athletics"
						/>
						<AttributeField
							disabled
							type="number"
							size="small"
							value={autoLevelBonus}
							label="Level Bonus"
						/>
						<AttributeField
							type="number"
							size="small"
							value={details.other}
							onChange={(event) =>
								updateCharacter({
									statistics: {
										dodgeDetails: { other: Number(event.target.value) },
										dodge: autoBase + autoLevelBonus + Number(event.target.value),
									},
								})
							}
							label="Other"
						/>
					</Menu>
				)
			}
		>
			<CardContent value={displayValue} />
		</CharacterSheetCard>
	)
}

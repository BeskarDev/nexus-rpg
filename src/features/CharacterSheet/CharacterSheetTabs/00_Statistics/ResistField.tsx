import { useMemo } from 'react'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Settings } from '@mui/icons-material'
import { Box, IconButton, Menu, Typography } from '@mui/material'
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

export const ResistField = () => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
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
				resistDetails: migratedDefenses.resistDetails,
				resist: activeCharacter.statistics.resist, // Preserve the old manual value
			},
		})
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					columnGap: 0.5,
				}}
			>
				<AttributeField
					disabled
					value={resistDetails ? totalResist : resist}
					label="Resist"
					sx={{
						mr: 1,
						'& .MuiOutlinedInput-root': {
							'& .MuiOutlinedInput-notchedOutline': {
								borderWidth: '2px',
							},
						},
					}}
				/>
				<IconButton
					size="small"
					onClick={resistDetails ? handleClick : initializeDetails}
					sx={{ ml: -1.5 }}
				>
					<Settings fontSize="small" />
				</IconButton>
			</Box>
			{resistDetails && (
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{ sx: { p: 2, maxWidth: '17rem' } }}
				>
					<SectionHeader>Resist Calculator</SectionHeader>
					<Typography variant="subtitle2">
						Set the individual sources of Resist defense.
					</Typography>
					<AttributeField
						disabled
						type="number"
						size="small"
						value={autoBase}
						label="Base"
						helperText="5 + ½ SPI/MND"
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
									resistDetails: { other: Number(event.target.value) },
									resist:
										autoBase + autoLevelBonus + Number(event.target.value),
								},
							})
						}
						label="Other"
					/>
				</Menu>
			)}
		</>
	)
}

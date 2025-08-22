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
import { calculateDodgeBase, calculateDefenseLevelBonus } from '../../utils/calculateDefenses'

export const DodgeField = () => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const activeCharacter = useAppSelector((state) => state.characterSheet.activeCharacter)
	const { dodgeDetails, dodge } = activeCharacter.statistics

	// Calculate auto values
	const autoBase = calculateDodgeBase(activeCharacter)
	const autoLevelBonus = calculateDefenseLevelBonus(activeCharacter.skills.xp.total)

	// Use detailed structure if available, otherwise create default values
	const details = dodgeDetails || {
		base: autoBase,
		levelBonus: autoLevelBonus,
		other: 0
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
						levelBonus: autoLevelBonus
					},
					dodge: totalDodge
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
		updateCharacter({
			statistics: {
				dodgeDetails: {
					base: autoBase,
					levelBonus: autoLevelBonus,
					other: 0
				},
				dodge: autoBase + autoLevelBonus
			}
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
					value={dodgeDetails ? totalDodge : dodge}
					label="Dodge"
					helperText="5 + ½ AGI"
					sx={{
						maxWidth: '5.5rem',
						'& .MuiOutlinedInput-root': {
							'& .MuiOutlinedInput-notchedOutline': {
								borderWidth: '2px',
							},
						},
					}}
				/>
				<IconButton 
					size="small" 
					onClick={dodgeDetails ? handleClick : initializeDetails} 
					sx={{ ml: -1.5 }}
				>
					<Settings fontSize="small" />
				</IconButton>
			</Box>
			{dodgeDetails && (
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
						label="Base (5 + ½ AGI)"
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
									dodge: autoBase + autoLevelBonus + Number(event.target.value)
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
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
import { calculateParryBase, calculateDefenseLevelBonus } from '../../utils/calculateDefenses'
import { extractShieldParryBonus } from '../02_Items/utils/itemUtils'
import { organizeItemsByLocation } from '../02_Items/utils/itemUtils'

export const ParryField = () => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const activeCharacter = useAppSelector((state) => state.characterSheet.activeCharacter)
	const { parryDetails, parry } = activeCharacter.statistics

	// Calculate auto values
	const autoBase = calculateParryBase(activeCharacter)
	const autoLevelBonus = calculateDefenseLevelBonus(activeCharacter.skills.xp.total)
	
	// Get shield bonus from equipped items
	const itemsByLocation = useMemo(() => {
		return organizeItemsByLocation(activeCharacter.items.weapons, activeCharacter.items.items)
	}, [activeCharacter.items.weapons, activeCharacter.items.items])
	
	const autoShieldBonus = extractShieldParryBonus(itemsByLocation)

	// Use detailed structure if available, otherwise create default values
	const details = parryDetails || {
		base: autoBase,
		levelBonus: autoLevelBonus,
		shieldBonus: autoShieldBonus,
		other: 0
	}

	const totalParry: number = useMemo(
		() => details.base + details.levelBonus + details.shieldBonus + details.other,
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
						...(shouldUpdateShieldBonus ? { shieldBonus: autoShieldBonus } : {})
					},
					parry: totalParry
				},
			})
		}
	}, [autoBase, autoLevelBonus, autoShieldBonus, totalParry, parryDetails])

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
				parryDetails: {
					base: autoBase,
					levelBonus: autoLevelBonus,
					shieldBonus: autoShieldBonus,
					other: 0
				},
				parry: autoBase + autoLevelBonus + autoShieldBonus
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
					value={parryDetails ? totalParry : parry}
					label="Parry"
					helperText="7 + Fighting"
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
					onClick={parryDetails ? handleClick : initializeDetails} 
					sx={{ ml: -1.5 }}
				>
					<Settings fontSize="small" />
				</IconButton>
			</Box>
			{parryDetails && (
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{ sx: { p: 2, maxWidth: '17rem' } }}
				>
					<SectionHeader>Parry Calculator</SectionHeader>
					<Typography variant="subtitle2">
						Set the individual sources of Parry defense.
					</Typography>
					<AttributeField
						disabled
						type="number"
						size="small"
						value={autoBase}
						label="Base (7 + Fighting)"
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
						value={details.shieldBonus}
						onChange={(event) => {
							const newShieldBonus = Number(event.target.value)
							updateCharacter({
								statistics: { 
									parryDetails: { shieldBonus: newShieldBonus },
									parry: autoBase + autoLevelBonus + newShieldBonus + details.other
								},
							})
						}}
						label="Shield Bonus"
						helperText={autoShieldBonus > 0 ? `Auto: ${autoShieldBonus}` : undefined}
					/>
					<AttributeField
						type="number"
						size="small"
						value={details.other}
						onChange={(event) =>
							updateCharacter({
								statistics: { 
									parryDetails: { other: Number(event.target.value) },
									parry: autoBase + autoLevelBonus + autoShieldBonus + Number(event.target.value)
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
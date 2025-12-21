import { useMemo } from 'react'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Settings, Speed } from '@mui/icons-material'
import { Box, IconButton, Menu, Tooltip, Typography, alpha } from '@mui/material'
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

export const DodgeField = () => {
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
		<>
			<Tooltip title="Click gear to configure Dodge sources">
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						minWidth: '3rem',
						borderRadius: 1,
						border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
						bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
						p: 0.5,
						position: 'relative',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
						<Speed sx={{ fontSize: '0.75rem', color: '#81c784' }} />
						<Typography
							variant="caption"
							sx={{
								fontWeight: 700,
								fontSize: '0.6rem',
								color: '#81c784',
								textTransform: 'uppercase',
							}}
						>
							DOD
						</Typography>
					</Box>
					<Typography
						sx={{
							fontWeight: 'bold',
							fontSize: '1rem',
							lineHeight: 1.2,
						}}
					>
						{displayValue}
					</Typography>
					<IconButton
						size="small"
						onClick={dodgeDetails ? handleClick : initializeDetails}
						sx={{
							position: 'absolute',
							top: 0,
							right: 0,
							p: 0.25,
							opacity: 0.6,
							'&:hover': { opacity: 1 },
						}}
					>
						<Settings sx={{ fontSize: '0.75rem' }} />
					</IconButton>
				</Box>
			</Tooltip>
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
						label="Base"
						helperText="5 + ½ AGI"
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
			)}
		</>
	)
}

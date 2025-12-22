import { useMemo } from 'react'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Settings, Psychology } from '@mui/icons-material'
import { Box, IconButton, Menu, Tooltip, Typography, alpha } from '@mui/material'
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

	const displayValue = resistDetails ? totalResist : resist

	return (
		<>
			<Tooltip title="Click gear to configure Resist sources">
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						width: '5rem',
            height: '3.25rem',
						borderRadius: 1,
						border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
						bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
						p: 0.5,
						position: 'relative',
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
						<Psychology sx={{ fontSize: '0.7rem', color: '#ba68c8' }} />
						<Typography
							variant="caption"
							sx={{
								fontWeight: 700,
								fontSize: '0.65rem',
								color: '#ba68c8',
								textTransform: 'uppercase',
							}}
						>
							RESIST
						</Typography>
					</Box>
					<Typography
						sx={{
							fontWeight: 'bold',
							fontSize: '0.95rem',
							lineHeight: 1.2,
							textAlign: 'center',
						}}
					>
						{displayValue}
					</Typography>
					<IconButton
						size="small"
						onClick={resistDetails ? handleClick : initializeDetails}
						sx={{
							position: 'absolute',
							top: 0,
							right: 0,
							p: 0.25,
							opacity: 0.6,
							'&:hover': { opacity: 1 },
						}}
					>
						<Settings sx={{ fontSize: '0.65rem' }} />
					</IconButton>
				</Box>
			</Tooltip>
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

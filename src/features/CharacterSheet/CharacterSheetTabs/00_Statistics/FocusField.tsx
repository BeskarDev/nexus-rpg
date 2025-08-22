import { useMemo, useState, useEffect } from 'react'
import { AttributeField } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Settings, Remove, Add } from '@mui/icons-material'
import {
	Box,
	IconButton,
	Menu,
	Typography,
	Button,
	LinearProgress,
} from '@mui/material'
import React from 'react'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { calculateMaxFocus } from '../../utils/calculateFocus'

export const FocusField = () => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [damageHealAmount, setDamageHealAmount] = useState<number>(0)
	const [animationState, setAnimationState] = useState<
		'none' | 'damage' | 'healing'
	>('none')
	const open = Boolean(anchorEl)

	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { focus, focusDetails } = activeCharacter.spells

	// Calculate max Focus using the new formula
	const maxFocus = useMemo(() => {
		return calculateMaxFocus(activeCharacter, focusDetails?.maxFocusModifier || 0)
	}, [activeCharacter.statistics.mind.value, activeCharacter.statistics.spirit.value, 
		 activeCharacter.spells.magicSkill, activeCharacter.skills.skills, 
		 focusDetails?.maxFocusModifier])

	// Calculate Focus bar color and progress with static bar sizing
	const focusPercentage = maxFocus > 0 ? (focus.current / maxFocus) * 100 : 0
	const getFocusColor = () => {
		if (focusPercentage >= 50) return 'info' // Blue color
		if (focusPercentage >= 20) return 'warning'
		return 'error'
	}

	// Animation effect cleanup
	useEffect(() => {
		if (animationState !== 'none') {
			const timer = setTimeout(() => {
				setAnimationState('none')
			}, 600) // Animation duration
			return () => clearTimeout(timer)
		}
	}, [animationState])

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const applyDamageOrHealing = (isDamage: boolean) => {
		if (damageHealAmount <= 0) return

		let newCurrentFocus = focus.current

		if (isDamage) {
			// Reduce Focus
			newCurrentFocus = Math.max(0, newCurrentFocus - damageHealAmount)
			setAnimationState('damage')
		} else {
			// Restore Focus
			newCurrentFocus = Math.min(maxFocus, newCurrentFocus + damageHealAmount)
			setAnimationState('healing')
		}

		updateCharacter({
			spells: {
				focus: {
					current: newCurrentFocus,
				},
			},
		})

		setDamageHealAmount(0)
		handleClose()
	}

	// Sync auto-calculated values when they change
	useEffect(() => {
		if (focus.total !== maxFocus) {
			updateCharacter({
				spells: {
					focus: {
						total: maxFocus,
					},
				},
			})
		}
	}, [maxFocus, focus.total])

	// Trigger animation when Focus changes externally (e.g., spell casting)
	const prevFocusRef = React.useRef(focus.current)
	useEffect(() => {
		if (prevFocusRef.current !== focus.current) {
			if (prevFocusRef.current > focus.current) {
				setAnimationState('damage')
			} else if (prevFocusRef.current < focus.current) {
				setAnimationState('healing')
			}
			prevFocusRef.current = focus.current
		}
	}, [focus.current])

	return (
		<>
			<Button
				variant="text"
				color="inherit"
				size="small"
				onClick={handleClick}
				sx={{
					px: 1,
					py: 0.5,
					minWidth: 'auto',
					justifyContent: 'flex-start',
					textTransform: 'none',
					fontSize: '1rem',
					fontWeight: 'bold',
				}}
			>
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
					<Typography
						variant="body2"
						sx={{
							fontSize: '1rem',
							fontWeight: 'bold',
							lineHeight: 1.2,
							color: 'inherit',
						}}
					>
						<span
							style={{
								color: getFocusColor() === 'info' ? '#2196f3' : 
									  getFocusColor() === 'warning' ? '#ff9800' : '#f44336',
								transition: 'all 0.3s ease-in-out',
								...(animationState === 'damage' && {
									animation: 'flashRed 0.5s ease-in-out',
								}),
								...(animationState === 'healing' && {
									animation: 'flashBlue 0.5s ease-in-out',
								}),
							}}
						>
							{focus.current}
						</span>
						/
						<span
							style={{
								color: '#2196f3',
								transition: 'all 0.3s ease-in-out',
							}}
						>
							{maxFocus}
						</span>
						{' Focus'}
					</Typography>

					{/* Focus Bar Container for static-length bar */}
					<Box
						sx={{
							position: 'relative',
							width: '120px',
							height: '6px',
							mb: 0.5,
						}}
					>
						{/* Main Focus Bar */}
						<LinearProgress
							variant="determinate"
							value={Math.min(100, focusPercentage)}
							color={getFocusColor()}
							sx={{
								width: '120px',
								height: '6px',
								borderRadius: '3px',
								position: 'absolute',
								top: 0,
								left: 0,
								transition: 'all 0.3s ease-in-out',
								...(animationState === 'damage' && {
									animation: 'flashRed 0.5s ease-in-out',
								}),
								...(animationState === 'healing' && {
									animation: 'flashBlue 0.5s ease-in-out',
								}),
								'@keyframes flashRed': {
									'0%, 100%': { filter: 'brightness(1)' },
									'50%': {
										filter: 'brightness(1.5) sepia(1) hue-rotate(330deg)',
									},
								},
								'@keyframes flashBlue': {
									'0%, 100%': { filter: 'brightness(1)' },
									'50%': {
										filter: 'brightness(1.5) sepia(1) hue-rotate(200deg)',
									},
								},
							}}
						/>
					</Box>
				</Box>
			</Button>

			{/* Configuration Menu */}
			{open && (
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					transformOrigin={{ horizontal: 'left', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
					PaperProps={{
						sx: {
							p: 2,
							minWidth: '300px',
						},
					}}
				>
					<Typography variant="h6" sx={{ mb: 2 }}>
						Focus Management
					</Typography>

					{/* Current Focus */}
					<AttributeField
						type="number"
						size="small"
						value={focus.current}
						onChange={(event) =>
							updateCharacter({
								spells: { focus: { current: Number(event.target.value) } },
							})
						}
						label="Current Focus"
						fullWidth
						sx={{ mb: 2 }}
					/>

					{/* Auto-calculated Max Focus Display */}
					<AttributeField
						type="number"
						size="small"
						value={calculateMaxFocus(activeCharacter)}
						disabled
						label="Auto-calculated Max Focus"
						helperText={`Based on ${activeCharacter.spells.magicSkill || 'No Magic Skill'} formula`}
						fullWidth
						sx={{ mb: 2 }}
					/>

					{/* Max Focus Modifier */}
					<AttributeField
						type="number"
						size="small"
						value={focusDetails?.maxFocusModifier || 0}
						onChange={(event) =>
							updateCharacter({
								spells: { 
									focusDetails: { maxFocusModifier: Number(event.target.value) } 
								},
							})
						}
						label="Max Focus Modifier"
						helperText="Additional bonus to max Focus"
						fullWidth
						sx={{ mb: 2 }}
					/>

					{/* Damage/Heal Focus */}
					<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
						<AttributeField
							type="number"
							size="small"
							value={damageHealAmount}
							onChange={(event) =>
								setDamageHealAmount(Number(event.target.value))
							}
							label="Amount"
							sx={{ flexGrow: 1 }}
						/>
						<Button
							variant="outlined"
							size="small"
							onClick={() => applyDamageOrHealing(true)}
							startIcon={<Remove />}
							disabled={damageHealAmount <= 0}
						>
							Drain
						</Button>
						<Button
							variant="outlined"
							size="small"
							onClick={() => applyDamageOrHealing(false)}
							startIcon={<Add />}
							disabled={damageHealAmount <= 0}
						>
							Restore
						</Button>
					</Box>
				</Menu>
			)}
		</>
	)
}
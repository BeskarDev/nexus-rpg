import { useMemo, useState, useEffect } from 'react'
import { AttributeField } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Settings, Remove, Add, AutoFixHigh } from '@mui/icons-material'
import {
	Box,
	IconButton,
	Menu,
	Typography,
	Button,
	LinearProgress,
	alpha,
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
		return calculateMaxFocus(
			activeCharacter,
			focusDetails?.maxFocusModifier || 0,
		)
	}, [
		activeCharacter.statistics.mind.value,
		activeCharacter.statistics.spirit.value,
		activeCharacter.spells.magicSkill,
		activeCharacter.skills.skills,
		focusDetails?.maxFocusModifier,
	])

	// Calculate Focus bar color and progress with static bar sizing
	const focusPercentage = maxFocus > 0 ? (focus.current / maxFocus) * 100 : 0
	const getFocusColor = () => {
		if (focusPercentage >= 50) return 'info' // Blue color
		if (focusPercentage >= 20) return 'warning'
		return 'error'
	}
	
	// Get the actual color value for the focus display
	const focusColor = focusPercentage >= 50 ? '#2196f3' : focusPercentage >= 20 ? '#ff9800' : '#f44336'

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
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				minWidth: '7rem',
				borderRadius: 1,
				border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
				bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
				p: 0.5,
				position: 'relative',
			}}
		>
			{/* Focus Header */}
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
				<AutoFixHigh sx={{ fontSize: '0.7rem', color: '#2196f3' }} />
				<Typography
					variant="caption"
					sx={{
						fontWeight: 700,
						fontSize: '0.65rem',
						color: '#2196f3',
						textTransform: 'uppercase',
					}}
				>
					Focus
				</Typography>
			</Box>

			{/* Focus Display */}
			<Typography
				sx={{
					fontWeight: 'bold',
					fontSize: '0.95rem',
					lineHeight: 1.2,
					textAlign: 'center',
					transition: 'all 0.3s ease-in-out',
					...(animationState === 'damage' && {
						animation: 'shake 0.5s ease-in-out',
						color: '#f44336',
					}),
					...(animationState === 'healing' && {
						animation: 'pulse 0.5s ease-in-out',
						color: '#4caf50',
					}),
					'@keyframes shake': {
						'0%, 100%': { transform: 'translateX(0)' },
						'25%': { transform: 'translateX(-2px)' },
						'75%': { transform: 'translateX(2px)' },
					},
					'@keyframes pulse': {
						'0%, 100%': { transform: 'scale(1)' },
						'50%': { transform: 'scale(1.1)' },
					},
				}}
			>
				<span style={{ color: focusColor }}>{focus.current}</span>/{maxFocus}
			</Typography>

			{/* Focus Bar */}
			<Box
				sx={{
					position: 'relative',
					width: '100%',
					maxWidth: '5.5rem',
					height: '4px',
					mt: 0.25,
				}}
			>
				<LinearProgress
					variant="determinate"
					value={Math.min(100, focusPercentage)}
					color={getFocusColor()}
					sx={{
						width: '100%',
						height: '4px',
						borderRadius: '2px',
						transition: 'all 0.3s ease-in-out',
					}}
				/>
			</Box>

			{/* Config button */}
			<IconButton
				size="small"
				onClick={handleClick}
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

					{/* Formula explanation */}
					<Typography
						variant="caption"
						display="block"
						sx={{ mb: 2, color: 'text.secondary' }}
					>
						Max Focus = (
						{activeCharacter.spells.magicSkill === 'Arcana'
							? 'Mind'
							: activeCharacter.spells.magicSkill === 'Mysticism'
								? 'Spirit'
								: 'Attribute'}{' '}
						- 2) + (2 × {activeCharacter.spells.magicSkill || 'Skill'} rank) +
						modifier
					</Typography>

					{/* Current, Max, and Modifier in one line */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
						<AttributeField
							type="number"
							size="small"
							value={focus.current}
							onChange={(event) => {
								const newValue = Number(event.target.value)
								const clampedValue = Math.max(0, Math.min(maxFocus, newValue))
								updateCharacter({
									spells: { focus: { current: clampedValue } },
								})
							}}
							label="Current"
							sx={{
								flex: 1,
								'& .MuiOutlinedInput-root': {
									'& .MuiOutlinedInput-notchedOutline': {
										borderWidth: '2px',
									},
								},
							}}
						/>
						<AttributeField
							type="number"
							size="small"
							value={calculateMaxFocus(activeCharacter)}
							disabled
							label="Max (Auto)"
							sx={{ flex: 1 }}
						/>
						<AttributeField
							type="number"
							size="small"
							value={focusDetails?.maxFocusModifier || 0}
							onChange={(event) =>
								updateCharacter({
									spells: {
										focusDetails: {
											maxFocusModifier: Number(event.target.value),
										},
									},
								})
							}
							label="Modifier"
							sx={{ flex: 1 }}
						/>
					</Box>

					{/* Spend/Restore Focus Controls */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
						<Button
							variant="outlined"
							color="error"
							size="small"
							onClick={() => applyDamageOrHealing(true)}
							startIcon={<Remove />}
							disabled={damageHealAmount <= 0}
						>
							Spend
						</Button>
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
							color="success"
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
		</Box>
	)
}

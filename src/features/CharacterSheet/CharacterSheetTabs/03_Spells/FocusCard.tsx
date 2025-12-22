import React, { useMemo, useState, useEffect } from 'react'
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
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { calculateMaxFocus } from '../../utils/calculateFocus'
import { CharacterSheetCard, CardHeader } from '../../components'

export const FocusCard = () => {
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
	const focusColor = focusPercentage >= 50 ? UI_COLORS.info : focusPercentage >= 20 ? UI_COLORS.warning : UI_COLORS.danger

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
		setDamageHealAmount(0)
	}

	const handleSpendFocus = (amount: number) => {
		const newValue = Math.max(0, Math.min(focus.current - amount, maxFocus))
		updateCharacter({ spells: { focus: { current: newValue } } })
		
		if (amount > 0) {
			setAnimationState('damage')
			setDamageHealAmount(amount)
		}
		handleClose()
	}

	const handleRestoreFocus = (amount: number) => {
		const newValue = Math.max(0, Math.min(focus.current + amount, maxFocus))
		updateCharacter({ spells: { focus: { current: newValue } } })
		
		if (amount > 0) {
			setAnimationState('healing')
			setDamageHealAmount(amount)
		}
		handleClose()
	}

	const handleSetFocus = (value: number) => {
		const newValue = Math.max(0, Math.min(value, maxFocus))
		updateCharacter({ spells: { focus: { current: newValue } } })
		handleClose()
	}

	// Calculate animation keyframes
	const getAnimationStyle = () => {
		if (animationState === 'damage') {
			return {
				animation: 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
				'@keyframes shake': {
					'10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
					'20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
					'30%, 50%, 70%': { transform: 'translate3d(-3px, 0, 0)' },
					'40%, 60%': { transform: 'translate3d(3px, 0, 0)' },
				},
			}
		}
		if (animationState === 'healing') {
			return {
				animation: 'pulse 0.6s ease-in-out',
				'@keyframes pulse': {
					'0%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' },
					'100%': { transform: 'scale(1)' },
				},
			}
		}
		return {}
	}

	return (
		<>
			<CharacterSheetCard
				header={<CardHeader icon={<AutoFixHigh />} label="Focus" color={UI_COLORS.purple} />}
				tooltip="Magical energy pool for casting spells"
				showConfigButton
				onConfigClick={handleClick}
				minWidth="7rem"
				sx={getAnimationStyle()}
				footer={
					<Box sx={{ width: '100%', mt: 0.5 }}>
						<LinearProgress
							variant="determinate"
							value={focusPercentage}
							color={getFocusColor()}
							sx={{
								height: 4,
								borderRadius: 1,
								backgroundColor: (theme) =>
									alpha(theme.palette.divider, 0.2),
							}}
						/>
					</Box>
				}
			>
				<Box sx={{ position: 'relative' }}>
					<Typography
						sx={{
							fontWeight: 'bold',
							fontSize: '1.1rem',
							lineHeight: 1.2,
							textAlign: 'center',
							color: focusColor,
						}}
					>
						{focus.current}/{maxFocus}
					</Typography>
					{animationState !== 'none' && (
						<Typography
							sx={{
								position: 'absolute',
								top: -10,
								left: '50%',
								transform: 'translateX(-50%)',
								fontSize: '0.75rem',
								fontWeight: 'bold',
								color: animationState === 'damage' ? UI_COLORS.danger : UI_COLORS.success,
								animation: 'floatUp 0.6s ease-out',
								'@keyframes floatUp': {
									'0%': { opacity: 1, transform: 'translate(-50%, 0)' },
									'100%': { opacity: 0, transform: 'translate(-50%, -20px)' },
								},
							}}
						>
							{animationState === 'damage' ? `-${damageHealAmount}` : `+${damageHealAmount}`}
						</Typography>
					)}
				</Box>
			</CharacterSheetCard>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
			>
				<Box sx={{ p: 2, minWidth: 200 }}>
					<Typography variant="subtitle2" gutterBottom>
						Quick Actions
					</Typography>
					<Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
						<Button
							variant="outlined"
							size="small"
							onClick={() => handleSpendFocus(1)}
							disabled={focus.current === 0}
							fullWidth
						>
							-1
						</Button>
						<Button
							variant="outlined"
							size="small"
							onClick={() => handleSpendFocus(2)}
							disabled={focus.current < 2}
							fullWidth
						>
							-2
						</Button>
						<Button
							variant="outlined"
							size="small"
							onClick={() => handleRestoreFocus(1)}
							disabled={focus.current >= maxFocus}
							fullWidth
						>
							+1
						</Button>
					</Box>
					<Button
						variant="contained"
						size="small"
						onClick={() => handleSetFocus(maxFocus)}
						disabled={focus.current === maxFocus}
						fullWidth
						sx={{ mb: 1 }}
					>
						Full Restore
					</Button>
					<Button
						variant="outlined"
						size="small"
						onClick={() => handleSetFocus(0)}
						disabled={focus.current === 0}
						fullWidth
					>
						Set to 0
					</Button>
				</Box>
			</Menu>
		</>
	)
}

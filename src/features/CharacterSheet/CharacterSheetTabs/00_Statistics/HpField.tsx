import { useMemo, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { Settings, Remove, Add } from '@mui/icons-material'
import {
	Box,
	IconButton,
	Menu,
	Typography,
	Button,
	LinearProgress,
	TextField,
} from '@mui/material'
import React from 'react'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import {
	calculateMaxHp,
	calculateBaseHpFromStrength,
} from '../../utils/calculateHp'
import { calculateCharacterLevel } from '../../utils/calculateCharacterLevel'
import { getNumberFieldProps, createHpFieldSchema } from '../../utils/validation'

export const HpField = () => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [damageHealAmount, setDamageHealAmount] = useState<number>(0)
	const [woundHelperText, setWoundHelperText] = useState<string>('')
	const [animationState, setAnimationState] = useState<
		'none' | 'damage' | 'healing' | 'tempHp'
	>('none')
	const open = Boolean(anchorEl)

	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { health, fatigue, strength } = activeCharacter.statistics
	const totalXp = activeCharacter.skills.xp.total
	const characterLevel = calculateCharacterLevel(totalXp)
	const baseHp = calculateBaseHpFromStrength(strength.value)
	
	// Calculate max HP using the new formula
	const maxHp = useMemo(() => {
		return calculateMaxHp(strength.value, totalXp, health.maxHpModifier || 0)
	}, [strength.value, totalXp, health.maxHpModifier])

	// Calculate effective max HP (minus fatigue penalty)
	const fatigueHpPenalty = (fatigue?.current || 0) * 2
	const effectiveMaxHp = maxHp - fatigueHpPenalty
	
	// Initialize react-hook-form with Yup schema validation
	const hpSchema = useMemo(() => createHpFieldSchema(effectiveMaxHp), [effectiveMaxHp])
	
	const { control, formState: { errors }, reset, watch } = useForm({
		resolver: yupResolver(hpSchema),
		defaultValues: {
			currentHp: health.current,
			tempHp: health.temp || 0,
			maxHpModifier: health.maxHpModifier || 0,
		},
		mode: 'onChange', // Validate on change for immediate feedback
	})
	
	const formValues = watch()
	
	// Update form when character changes externally
	useEffect(() => {
		reset({
			currentHp: health.current,
			tempHp: health.temp || 0,
			maxHpModifier: health.maxHpModifier || 0,
		})
	}, [activeCharacter.id, health.current, health.temp, health.maxHpModifier, reset])

	// Calculate HP bar color and progress with static bar sizing
	const totalDisplayHp = effectiveMaxHp + (health.temp || 0)
	const hpPercentage =
		effectiveMaxHp > 0 ? (health.current / effectiveMaxHp) * 100 : 0
	const getHpColor = () => {
		if (hpPercentage >= 50) return 'success'
		if (hpPercentage >= 20) return 'warning'
		return 'error'
	}

	// Calculate proportional widths for static bar length (120px total)
	const mainHpBarWidth =
		totalDisplayHp > 0 ? (effectiveMaxHp / totalDisplayHp) * 120 : 120
	const tempHpBarWidth =
		totalDisplayHp > 0 ? ((health.temp || 0) / totalDisplayHp) * 120 : 0

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
		setWoundHelperText('')
	}

	const applyDamageOrHealing = (isDamage: boolean) => {
		if (damageHealAmount <= 0) return

		let newCurrentHp = health.current
		let newTempHp = health.temp || 0
		let woundText = ''

		if (isDamage) {
			// First, remove temp HP
			if (newTempHp > 0) {
				const tempHpDamage = Math.min(damageHealAmount, newTempHp)
				newTempHp -= tempHpDamage
				const remainingDamage = damageHealAmount - tempHpDamage

				// Apply remaining damage to current HP
				if (remainingDamage > 0) {
					newCurrentHp = Math.max(0, health.current - remainingDamage)

					// Calculate wounds based on remaining damage
					if (health.current > 0 && newCurrentHp <= 0) {
						woundText = '1 wound (HP dropped to 0 or below)'
					}

					const excessDamage = remainingDamage - health.current
					if (excessDamage > 0) {
						if (excessDamage >= effectiveMaxHp * 2) {
							woundText = '2 additional wounds (damage exceeds twice max HP)'
						} else if (excessDamage >= effectiveMaxHp) {
							woundText = '1 additional wound (damage exceeds max HP)'
						}
					}
				}
			} else {
				// No temp HP, apply all damage to current HP
				newCurrentHp = Math.max(0, health.current - damageHealAmount)

				// Calculate wounds based on damage
				if (health.current > 0 && newCurrentHp <= 0) {
					woundText = '1 wound (HP dropped to 0 or below)'
				}

				const excessDamage = damageHealAmount - health.current
				if (excessDamage > 0) {
					if (excessDamage >= effectiveMaxHp * 2) {
						woundText = '2 additional wounds (damage exceeds twice max HP)'
					} else if (excessDamage >= effectiveMaxHp) {
						woundText = '1 additional wound (damage exceeds max HP)'
					}
				}
			}

			setAnimationState('damage')
		} else {
			// Healing
			newCurrentHp = Math.min(effectiveMaxHp, health.current + damageHealAmount)
			setAnimationState('healing')
		}

		updateCharacter({
			statistics: { health: { current: newCurrentHp, temp: newTempHp } },
		})

		if (woundText) {
			setWoundHelperText(woundText)
			setTimeout(() => setWoundHelperText(''), 5000) // Clear after 5 seconds
		}

		setDamageHealAmount(0)
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
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					{/* HP Display */}
					<Typography
						variant="body2"
						sx={{
							fontWeight: 'bold',
							mb: 0.5,
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
							'@keyframes glow': {
								'0%, 100%': { filter: 'brightness(1)' },
								'50%': {
									filter: 'brightness(1.5) drop-shadow(0 0 2px #2196f3)',
								},
							},
						}}
					>
						{health.current}/
						<span
							style={{
								color: fatigueHpPenalty > 0 ? '#ff9800' : 'inherit', // warning color if fatigue present
							}}
						>
							{effectiveMaxHp}
						</span>
						{fatigueHpPenalty > 0 && ` (${maxHp})`}
						{health.temp > 0 && (
							<span
								style={{
									color: '#2196f3',
									transition: 'all 0.3s ease-in-out',
									...(animationState === 'tempHp' && {
										animation: 'glow 0.5s ease-in-out',
									}),
								}}
							>
								{' '}
								+{health.temp}
							</span>
						)}
						{' HP'}
					</Typography>

					{/* HP Bar Container for static-length bar with proportional sections */}
					<Box
						sx={{
							position: 'relative',
							width: '120px',
							height: '6px',
							mb: 0.5,
						}}
					>
						{/* Main HP Bar - proportional width within 120px total */}
						<LinearProgress
							variant="determinate"
							value={Math.min(100, hpPercentage)}
							color={getHpColor()}
							sx={{
								width: `${mainHpBarWidth}px`,
								height: '6px',
								borderRadius: health.temp > 0 ? '3px 0 0 3px' : '3px',
								position: 'absolute',
								top: 0,
								left: 0,
								transition: 'all 0.3s ease-in-out',
								...(animationState === 'damage' && {
									animation: 'flashRed 0.5s ease-in-out',
								}),
								...(animationState === 'healing' && {
									animation: 'flashGreen 0.5s ease-in-out',
								}),
								'@keyframes flashRed': {
									'0%, 100%': { filter: 'brightness(1)' },
									'50%': {
										filter: 'brightness(1.5) sepia(1) hue-rotate(330deg)',
									},
								},
								'@keyframes flashGreen': {
									'0%, 100%': { filter: 'brightness(1)' },
									'50%': {
										filter: 'brightness(1.5) sepia(1) hue-rotate(90deg)',
									},
								},
							}}
						/>

						{/* Temp HP Section - proportional width within 120px total */}
						{health.temp > 0 && (
							<Box
								sx={{
									position: 'absolute',
									top: 0,
									left: `${mainHpBarWidth}px`,
									width: `${tempHpBarWidth}px`,
									height: '6px',
									backgroundColor: '#2196f3', // info blue color
									borderRadius: '0 3px 3px 0',
									transition: 'all 0.3s ease-in-out',
									...(animationState === 'tempHp' && {
										animation: 'glowBlue 0.5s ease-in-out',
									}),
									'@keyframes glowBlue': {
										'0%, 100%': { filter: 'brightness(1)' },
										'50%': {
											filter: 'brightness(1.8) drop-shadow(0 0 4px #2196f3)',
										},
									},
								}}
							/>
						)}
					</Box>

					{/* Current HP Input (simplified for surface) - REMOVED per feedback */}
				</Box>

				<IconButton size="small" onClick={handleClick} sx={{ ml: 0.5 }}>
					<Settings fontSize="small" />
				</IconButton>
			</Box>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{ sx: { p: 2, maxWidth: '20rem' } }}
			>
				<SectionHeader>HP Configuration</SectionHeader>
				<Typography variant="subtitle2" sx={{ mb: 2 }}>
					Max HP: {baseHp} + {(characterLevel - 1) * 2} +{' '}
					{health.maxHpModifier || 0} = {maxHp}
				</Typography>

				{/* Current HP - First and larger with 2px borders */}
				<Controller
					name="currentHp"
					control={control}
					render={({ field, fieldState }) => (
						<TextField
							{...field}
							type="number"
							onChange={(e) => {
								const value = Number(e.target.value)
								field.onChange(value)
								const clampedCurrent = Math.min(value, effectiveMaxHp)
								updateCharacter({
									statistics: { health: { current: clampedCurrent } },
								})
							}}
							error={!!fieldState.error}
							helperText={fieldState.error?.message || ''}
							label="Current HP"
							sx={{
								mb: 1.5,
								maxWidth: '5rem',
								'& .MuiOutlinedInput-root': {
									'& .MuiOutlinedInput-notchedOutline': {
										borderWidth: '2px',
									},
								},
								'& input': {
									textAlign: 'center',
								},
							}}
						/>
					)}
				/>

				{/* Max HP (disabled, calculated) */}
				<AttributeField
					type="number"
					size="small"
					value={maxHp}
					disabled
					label="Max HP (Calculated)"
					sx={{ mb: 1.5 }}
				/>

				{/* Temp HP and Max HP Modifier in their own row */}
				<Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
					<Controller
						name="tempHp"
						control={control}
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								type="number"
								size="small"
								onChange={(e) => {
									const value = Number(e.target.value)
									field.onChange(value)
									updateCharacter({
										statistics: { health: { temp: value } },
									})
									// Trigger temp HP animation when changed
									if (value !== health.temp) {
										setAnimationState('tempHp')
									}
								}}
								error={!!fieldState.error}
								helperText={fieldState.error?.message || ''}
								label="Temp HP"
								sx={{ 
									flex: 1,
									maxWidth: '5rem',
									'& input': {
										textAlign: 'center',
									},
								}}
							/>
						)}
					/>

					<Controller
						name="maxHpModifier"
						control={control}
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								type="number"
								size="small"
								onChange={(e) => {
									const value = Number(e.target.value)
									field.onChange(value)
									updateCharacter({
										statistics: {
											health: { maxHpModifier: value },
										},
									})
								}}
								error={!!fieldState.error}
								helperText={fieldState.error?.message || ''}
								label="Max HP Modifier"
								sx={{ 
									flex: 1,
									maxWidth: '5rem',
									'& input': {
										textAlign: 'center',
									},
								}}
							/>
						)}
					/>
				</Box>

				{/* Damage/Healing Controls - TextField between buttons */}
				<Typography variant="subtitle2" sx={{ mb: 1 }}>
					Damage / Healing
				</Typography>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
					<Button
						variant="outlined"
						color="error"
						size="small"
						onClick={() => applyDamageOrHealing(true)}
						startIcon={<Remove />}
						disabled={damageHealAmount <= 0}
					>
						Damage
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
						Healing
					</Button>
				</Box>

				{/* Wound Helper Text */}
				{woundHelperText && (
					<Typography
						variant="caption"
						color="warning.main"
						sx={{ fontWeight: 'bold' }}
					>
						⚠️ {woundHelperText}
					</Typography>
				)}
			</Menu>
		</>
	)
}

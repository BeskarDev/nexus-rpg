import React, { useMemo, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography, LinearProgress, TextField } from '@mui/material'
import { getHpBarColor } from '@site/src/utils/typescript/getHpBarColor'
import { useAppSelector } from '../../hooks/useAppSelector'
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useValueAnimation } from '../../hooks/useValueAnimation'
import {
	calculateMaxHp,
	calculateBaseHpFromStrength,
} from '../../utils/calculateHp'
import { calculateCharacterLevel } from '../../utils/calculateCharacterLevel'
import { createHpFieldSchema } from '../../utils/validation'
import { SheetField, AdjustStepper, DerivedPart } from '../../components'
import { SectionHeader } from '../../CharacterSheet'

export const HpCard = () => {
	const dispatch = useAppDispatch()
	const [woundHelperText, setWoundHelperText] = useState<string>('')
	const animation = useValueAnimation()

	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { health, fatigue, strength } = activeCharacter.statistics
	const totalXp = activeCharacter.skills.xp.total
	const characterLevel = calculateCharacterLevel(totalXp)
	const baseHp = calculateBaseHpFromStrength(strength.value)
	const autoHpBonus = useMemo(() => health.auto || 0, [health.auto])

	// Calculate max HP using the new formula (includes both user modifier and auto bonus)
	const maxHp = useMemo(() => {
		return calculateMaxHp(
			strength.value,
			totalXp,
			health.maxHpModifier || 0,
			autoHpBonus,
		)
	}, [strength.value, totalXp, health.maxHpModifier, autoHpBonus])

	// Calculate effective max HP (minus fatigue penalty)
	const fatigueHpPenalty = (fatigue?.current || 0) * 2
	const effectiveMaxHp = maxHp - fatigueHpPenalty

	// Initialize react-hook-form with Yup schema validation
	const hpSchema = useMemo(
		() => createHpFieldSchema(effectiveMaxHp),
		[effectiveMaxHp],
	)

	const { control, reset } = useForm({
		resolver: yupResolver(hpSchema),
		defaultValues: {
			currentHp: health.current,
			tempHp: health.temp || 0,
			maxHpModifier: health.maxHpModifier || 0,
		},
		mode: 'onChange', // Validate on change for immediate feedback
	})

	// Update form when character changes externally
	useEffect(() => {
		reset({
			currentHp: health.current,
			tempHp: health.temp || 0,
			maxHpModifier: health.maxHpModifier || 0,
		})
	}, [
		activeCharacter.docId,
		health.current,
		health.temp,
		health.maxHpModifier,
		reset,
	])

	// Calculate HP bar color and progress with static bar sizing
	const totalDisplayHp = effectiveMaxHp + (health.temp || 0)
	const hpPercentage =
		effectiveMaxHp > 0 ? (health.current / effectiveMaxHp) * 100 : 0
	const hpColor = getHpBarColor(health.current, effectiveMaxHp)
	const getHpColorVariant = () => {
		if (hpPercentage >= 50) return 'success'
		if (hpPercentage >= 25) return 'warning'
		return 'error'
	}

	// Calculate proportional widths for static bar length (120px total)
	const mainHpBarWidth =
		totalDisplayHp > 0 ? (effectiveMaxHp / totalDisplayHp) * 120 : 120
	const tempHpBarWidth =
		totalDisplayHp > 0 ? ((health.temp || 0) / totalDisplayHp) * 120 : 0

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	/**
	 * Damage resolution, carried over unchanged from the pre-S11 card: temp HP
	 * absorbs first, then the remainder hits current HP, and wounds are reported
	 * for dropping to zero and for damage exceeding one or two times max HP.
	 */
	const applyDamage = (amount: number) => {
		let newCurrentHp = health.current
		let newTempHp = health.temp || 0
		let woundText = ''

		const woundsForExcess = (excessDamage: number) => {
			if (excessDamage <= 0) return ''
			if (excessDamage >= effectiveMaxHp * 2)
				return '2 additional wounds (damage exceeds twice max HP)'
			if (excessDamage >= effectiveMaxHp)
				return '1 additional wound (damage exceeds max HP)'
			return ''
		}

		if (newTempHp > 0) {
			const tempHpDamage = Math.min(amount, newTempHp)
			newTempHp -= tempHpDamage
			const remainingDamage = amount - tempHpDamage

			if (remainingDamage > 0) {
				newCurrentHp = Math.max(0, health.current - remainingDamage)
				if (health.current > 0 && newCurrentHp <= 0) {
					woundText = '1 wound (HP dropped to 0 or below)'
				}
				woundText = woundsForExcess(remainingDamage - health.current) || woundText
			}
		} else {
			newCurrentHp = Math.max(0, health.current - amount)
			if (health.current > 0 && newCurrentHp <= 0) {
				woundText = '1 wound (HP dropped to 0 or below)'
			}
			woundText = woundsForExcess(amount - health.current) || woundText
		}

		animation.setState('damage')
		updateCharacter({
			statistics: { health: { current: newCurrentHp, temp: newTempHp } },
		})

		if (woundText) {
			setWoundHelperText(woundText)
			setTimeout(() => setWoundHelperText(''), 5000) // Clear after 5 seconds
		}
	}

	const applyHealing = (amount: number) => {
		animation.setState('healing')
		updateCharacter({
			statistics: {
				health: {
					current: Math.min(effectiveMaxHp, health.current + amount),
					temp: health.temp || 0,
				},
			},
		})
	}

	return (
		<SheetField
			label="HP"
			sigil="hp"
			tone={hpColor}
			editLabel="Edit Hit Points"
			// M9 S6: frameless inside the stats plate, which supplies the single
			// frame. Prominence comes from the meter and the numerals, not a box.
			weight="column"
			info="Hit Points: Your health and ability to withstand damage"
			minWidth="7rem"
			editorWidth="25rem"
			footer={
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
						value={Math.min(100, hpPercentage)}
						color={getHpColorVariant()}
						sx={{
							width: `${(mainHpBarWidth / 120) * 100}%`,
							height: '4px',
							borderRadius: health.temp > 0 ? '2px 0 0 2px' : '2px',
							position: 'absolute',
							top: 0,
							left: 0,
							transition: 'all 0.3s ease-in-out',
						}}
					/>
					{health.temp > 0 && (
						<Box
							sx={{
								position: 'absolute',
								top: 0,
								left: `${(mainHpBarWidth / 120) * 100}%`,
								width: `${(tempHpBarWidth / 120) * 100}%`,
								height: '4px',
								backgroundColor: UI_COLORS.info,
								borderRadius: '0 2px 2px 0',
							}}
						/>
					)}
				</Box>
			}
			editor={
				<>
					<SectionHeader sx={{ mb: 2 }}>HP Configuration</SectionHeader>

					{/* Editable current HP over its own bar */}
					<Box sx={{ mb: 3 }}>
						<Box
							sx={{
								position: 'relative',
								display: 'flex',
								height: '44px',
								mb: 1,
								overflow: 'hidden',
								border: '1px solid',
								borderColor: 'divider',
							}}
						>
							<LinearProgress
								variant="determinate"
								value={Math.min((health.current / effectiveMaxHp) * 100, 100)}
								color={getHpColorVariant()}
								sx={{ flex: 1, height: '100%' }}
							/>

							{health.temp > 0 && (
								<Box
									sx={{
										width: '60px',
										backgroundColor: UI_COLORS.info,
										borderLeft: '1px solid',
										borderColor: 'divider',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
									}}
								>
									<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
										+{health.temp}
									</Typography>
								</Box>
							)}

							<Box
								sx={{
									position: 'absolute',
									inset: 0,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									gap: 0.5,
									zIndex: 2,
								}}
							>
								<Controller
									name="currentHp"
									control={control}
									render={({ field, fieldState }) => (
										<TextField
											{...field}
											type="number"
											size="small"
											inputProps={{
												max: effectiveMaxHp,
												min: 0,
												'aria-label': 'Current HP',
												sx: { textAlign: 'center', py: 0.25 },
											}}
											onChange={(event) => {
												const clamped = Math.max(
													0,
													Math.min(Number(event.target.value), effectiveMaxHp),
												)
												field.onChange(clamped)
												updateCharacter({
													statistics: { health: { current: clamped } },
												})
											}}
											error={!!fieldState.error}
											sx={{ width: '4rem', bgcolor: 'background.paper' }}
										/>
									)}
								/>
								<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
									/ {effectiveMaxHp}
								</Typography>
							</Box>
						</Box>

						{/* Formula Display */}
						<Typography
							variant="caption"
							sx={{ display: 'block', textAlign: 'center', color: 'text.secondary' }}
						>
							Max HP: {baseHp} + {(characterLevel - 1) * 2}
							{autoHpBonus > 0 && ` + ${autoHpBonus} (auto)`}
							{(health.maxHpModifier || 0) !== 0 && ` + ${health.maxHpModifier || 0}`}
							{fatigueHpPenalty > 0 && ` - ${fatigueHpPenalty} (fatigue)`} ={' '}
							{effectiveMaxHp}
						</Typography>
					</Box>

					{/* Modifiers */}
					<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mb: 2 }}>
						<Controller
							name="tempHp"
							control={control}
							render={({ field, fieldState }) => (
								<DerivedPart
									{...field}
									label="Temp HP"
									value={field.value}
									onChange={(value) => {
										field.onChange(value)
										updateCharacter({ statistics: { health: { temp: value } } })
									}}
									error={!!fieldState.error}
									helperText={fieldState.error?.message || ''}
								/>
							)}
						/>

						<Controller
							name="maxHpModifier"
							control={control}
							render={({ field, fieldState }) => (
								<DerivedPart
									{...field}
									label="Mod"
									value={field.value}
									onChange={(value) => {
										field.onChange(value)
										updateCharacter({
											statistics: { health: { maxHpModifier: value } },
										})
									}}
									error={!!fieldState.error}
									helperText={fieldState.error?.message || ''}
								/>
							)}
						/>

						{autoHpBonus > 0 && (
							<DerivedPart auto value={autoHpBonus} label="Auto" sx={{ width: '4rem' }} />
						)}
					</Box>

					<AdjustStepper
						decreaseLabel="Damage"
						increaseLabel="Healing"
						onDecrease={applyDamage}
						onIncrease={applyHealing}
					/>

					{woundHelperText && (
						<Typography
							variant="caption"
							color="warning.main"
							sx={{ fontWeight: 'bold' }}
						>
							⚠️ {woundHelperText}
						</Typography>
					)}
				</>
			}
		>
			<Typography
				sx={{
					fontWeight: 'bold',
					fontSize: '0.95rem',
					lineHeight: 1.2,
					textAlign: 'center',
					...animation.sx,
					...(animation.state === 'damage' && { color: UI_COLORS.danger }),
					...(animation.state === 'healing' && { color: UI_COLORS.success }),
				}}
			>
				{health.current}/{effectiveMaxHp}
				{health.temp > 0 && (
					<span style={{ color: UI_COLORS.info, fontSize: '0.8rem' }}>
						{' '}
						+{health.temp}
					</span>
				)}
			</Typography>
		</SheetField>
	)
}

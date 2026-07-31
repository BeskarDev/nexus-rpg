import React, { useMemo, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography } from '@mui/material'
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
import {
	SheetField,
	AdjustStepper,
	DerivedPart,
	FieldGroupLabel,
} from '../../components'
import { SectionHeader } from '../../CharacterSheet'
import { HpBar } from './HpBar'

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

	// The label ink. The meter is `HpBar`, which took the old proportional
	// bar-width arithmetic with it (M13 S1).
	const hpColor = getHpBarColor(health.current, effectiveMaxHp)

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
				woundText =
					woundsForExcess(remainingDamage - health.current) || woundText
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
			// Narrower than the old 25rem: the stepper row is the widest thing in
			// here and needs ~20rem, so the rest was slack that let the three groups
			// drift apart instead of reading as one column.
			editorWidth="21rem"
			// M13 S1: the meter fills the card. It used to be capped at
			// `maxWidth: 5.5rem` inside a card that spans two of the register's four
			// columns, so the most-watched value on the sheet had the shortest meter
			// it could have been given. Full card width is the fix; spanning the whole
			// plate was tried and overshot — it detached the bar from the numerals it
			// reads, and put a plate-wide rule between two registers that the engraved
			// hairlines already separate.
			footer={
				<Box sx={{ width: '100%', mt: 0.4 }}>
					<HpBar
						current={health.current}
						max={effectiveMaxHp}
						temp={health.temp || 0}
					/>
				</Box>
			}
			/*
				M13 S1 — the editor rebuilt as three named groups, ordered by how often
				each is touched mid-play: the pool, the action, the reserves.

				What it replaced: a 44px `LinearProgress` band with the current-HP field
				absolutely positioned on top of it, then Temp/Mod, then the stepper. Three
				problems. The band was a *second* meter, duplicating the one on the card
				and reading as a flat brown slab because a theme-coloured progress fill at
				full height has no track left to contrast against. Overlaying an input on
				it meant the field needed its own opaque background to stay readable, so
				the "bar" it sat on conveyed nothing. And the order buried Damage/Healing —
				the most-used control in the whole popover — under two setup fields.

				Grouping is by label and spacing, not by rules — see `FieldGroupLabel`.
			*/
			editor={
				<>
					<SectionHeader sx={{ mb: 1.25 }}>Hit Points</SectionHeader>

					{/*
						1 — the pool, as a readout rather than a form row.

						The current value is a large numeral in the HP tone (green / amber /
						red), which is the same signal the card's label carries, so the
						popover confirms the state the player already saw before they act on
						it. It is still the input: no visible label, because "23 / 26" beside
						a meter needs none, and the theme's bronze baseline is what says
						editable. The accessible name is on the input.
					*/}
					{/*
						Two nested rows, not one. The numerals share a BASELINE, which is what
						makes `25 / 28` read as one quantity. The temp token is CENTRED
						against that block instead, because baseline-aligning a bordered box
						against a 1.6rem numeral sits it visibly high — a box's baseline is
						its text's, so the border and padding all hang above the line.
					*/}
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							gap: 0.75,
							mb: 0.75,
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
							<Controller
								name="currentHp"
								control={control}
								render={({ field, fieldState }) => (
									<DerivedPart
										{...field}
										value={field.value}
										inputProps={{
											max: effectiveMaxHp,
											min: 0,
											'aria-label': 'Current HP',
											sx: {
												textAlign: 'center',
												fontSize: '1.6rem',
												fontWeight: 700,
												lineHeight: 1.1,
												py: 0.25,
												color: hpColor,
											},
										}}
										onChange={(value) => {
											const clamped = Math.max(
												0,
												Math.min(value, effectiveMaxHp),
											)
											field.onChange(clamped)
											updateCharacter({
												statistics: { health: { current: clamped } },
											})
										}}
										error={!!fieldState.error}
										sx={{ width: '4rem', m: 0 }}
									/>
								)}
							/>
							<Typography
								sx={{
									fontWeight: 700,
									fontSize: '1.25rem',
									color: 'text.secondary',
								}}
							>
								/ {effectiveMaxHp}
							</Typography>
						</Box>
						{health.temp > 0 && (
							// Temp HP is a separate pool, not part of the total, so it reads
							// as an appended token rather than another numeral in the sum.
							<Box
								component="span"
								sx={{
									px: 0.6,
									py: 0.15,
									borderRadius: 0.5,
									border: '1px solid',
									borderColor: UI_COLORS.info,
									color: UI_COLORS.info,
									fontFamily: 'var(--nexus-font-ui)',
									fontWeight: 700,
									fontSize: 'var(--nexus-text-xs)',
									lineHeight: 1.4,
									whiteSpace: 'nowrap',
								}}
							>
								+{health.temp}
							</Box>
						)}
					</Box>

					{/* The same meter the card carries, so the popover states the pool the
					    same way rather than inventing a second visual language for it —
					    heavier here, where the pool is the subject rather than a detail. */}
					<HpBar
						current={health.current}
						max={effectiveMaxHp}
						temp={health.temp || 0}
						height="8px"
					/>

					<Typography
						variant="caption"
						sx={{
							display: 'block',
							textAlign: 'center',
							color: 'text.secondary',
							mt: 0.75,
						}}
					>
						Max HP: {baseHp} + {(characterLevel - 1) * 2}
						{autoHpBonus > 0 && ` + ${autoHpBonus} (auto)`}
						{(health.maxHpModifier || 0) !== 0 &&
							` + ${health.maxHpModifier || 0}`}
						{fatigueHpPenalty > 0 && ` - ${fatigueHpPenalty} (fatigue)`} ={' '}
						{effectiveMaxHp}
					</Typography>

					{/* 2 — the action. Highest traffic in the popover, so it sits directly
					    under the value it changes. Its own group label separates it; see
					    FieldGroupLabel for why there is no rule here. */}
					<Box sx={{ mt: 1.75 }} />
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
							sx={{ display: 'block', fontWeight: 'bold', mt: 0.5 }}
						>
							{woundHelperText}
						</Typography>
					)}

					{/* 3 — the reserves. Set at level-up or when a buff lands, not in a
					    fight, so it sits last and reads as configuration. */}
					<FieldGroupLabel sx={{ mt: 1.75 }}>Reserves</FieldGroupLabel>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'row',
							gap: 1,
							justifyContent: 'flex-start',
						}}
					>
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
							<DerivedPart
								auto
								value={autoHpBonus}
								label="Auto"
								sx={{ width: '4rem' }}
							/>
						)}
					</Box>
				</>
			}
		>
			<Typography
				sx={{
					fontWeight: 'bold',
					// M13 S3.5: the most-watched value on the sheet, and it was set in a
					// hardcoded 0.95rem — 15.2px, smaller than the rules text beside it.
					// Matches `CardContent`'s new register, so HP and the four defences
					// read at one weight.
					fontSize: 'var(--nexus-text-lg)',
					lineHeight: 1.2,
					textAlign: 'center',
					...animation.sx,
					...(animation.state === 'damage' && { color: UI_COLORS.danger }),
					...(animation.state === 'healing' && { color: UI_COLORS.success }),
				}}
			>
				{health.current}/{effectiveMaxHp}
				{health.temp > 0 && (
					<span style={{ color: UI_COLORS.info, fontSize: 'var(--nexus-text-sm)' }}>
						{' '}
						+{health.temp}
					</span>
				)}
			</Typography>
		</SheetField>
	)
}

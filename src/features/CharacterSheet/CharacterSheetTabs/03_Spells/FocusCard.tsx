import React, { useMemo, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Typography, LinearProgress, TextField } from '@mui/material'
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useValueAnimation } from '../../hooks/useValueAnimation'
import { calculateMaxFocus } from '../../utils/calculateFocus'
import { createFocusFieldSchema } from '../../utils/validation'
import { SheetField, AdjustStepper, DerivedPart } from '../../components'
import { SectionHeader } from '../../CharacterSheet'

export const FocusCard = () => {
	const dispatch = useAppDispatch()
	const animation = useValueAnimation()

	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { focus, focusDetails } = activeCharacter.spells
	const autoFocusBonus = useMemo(() => focus?.auto ?? 0, [focus?.auto])

	// Calculate max Focus using the new formula (includes both user modifier and auto bonus)
	const maxFocus = useMemo(() => {
		return calculateMaxFocus(
			activeCharacter,
			focusDetails?.maxFocusModifier || 0,
			autoFocusBonus,
		)
	}, [
		activeCharacter.statistics.mind.value,
		activeCharacter.statistics.spirit.value,
		activeCharacter.spells.magicSkill,
		activeCharacter.skills.skills,
		focusDetails?.maxFocusModifier,
		autoFocusBonus,
	])

	// Initialize react-hook-form with Yup schema validation
	const focusSchema = useMemo(
		() => createFocusFieldSchema(maxFocus),
		[maxFocus],
	)

	const { control, reset } = useForm({
		resolver: yupResolver(focusSchema),
		defaultValues: {
			currentFocus: focus.current,
			maxFocusModifier: focusDetails?.maxFocusModifier || 0,
		},
		mode: 'onChange', // Validate on change for immediate feedback
	})

	// Update form when character changes externally
	useEffect(() => {
		reset({
			currentFocus: focus.current,
			maxFocusModifier: focusDetails?.maxFocusModifier || 0,
		})
	}, [
		activeCharacter.docId,
		focus.current,
		focusDetails?.maxFocusModifier,
		reset,
	])

	// Calculate Focus bar color and progress
	const focusPercentage = maxFocus > 0 ? (focus.current / maxFocus) * 100 : 0
	const getFocusColor = () => {
		if (focusPercentage >= 50) return 'info' // Blue color
		if (focusPercentage >= 20) return 'warning'
		return 'error'
	}

	// Get the actual color value for the focus display
	const focusColor =
		focusPercentage >= 50
			? UI_COLORS.info
			: focusPercentage >= 20
				? UI_COLORS.warning
				: UI_COLORS.danger

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const setCurrent = (value: number) =>
		updateCharacter({
			spells: { focus: { current: Math.max(0, Math.min(value, maxFocus)) } },
		})

	return (
		<SheetField
			label="Focus"
			sigil="focus"
			tone={UI_COLORS.purple}
			info="Magical energy pool for casting spells"
			minWidth="8rem"
			editorWidth="25rem"
			footer={
				<Box sx={{ width: '100%', mt: 0.5, px: 1 }}>
					<LinearProgress
						variant="determinate"
						value={focusPercentage}
						color={getFocusColor()}
						sx={{ height: 4, borderRadius: 1 }}
					/>
				</Box>
			}
			editor={
				<>
					<SectionHeader sx={{ mb: 2 }}>Focus Configuration</SectionHeader>

					{/* Editable current Focus over its own bar */}
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
								value={Math.min((focus.current / maxFocus) * 100, 100)}
								color={getFocusColor()}
								sx={{ flex: 1, height: '100%' }}
							/>
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
									name="currentFocus"
									control={control}
									render={({ field, fieldState }) => (
										<TextField
											{...field}
											type="number"
											size="small"
											inputProps={{
												max: maxFocus,
												min: 0,
												'aria-label': 'Current Focus',
												sx: { textAlign: 'center', py: 0.25 },
											}}
											onChange={(event) => {
												const clamped = Math.max(
													0,
													Math.min(Number(event.target.value), maxFocus),
												)
												field.onChange(clamped)
												setCurrent(clamped)
											}}
											error={!!fieldState.error}
											sx={{ width: '4rem', bgcolor: 'background.paper' }}
										/>
									)}
								/>
								<Typography variant="body1" sx={{ fontWeight: 'bold' }}>
									/ {maxFocus}
								</Typography>
							</Box>
						</Box>

						<Typography
							variant="caption"
							sx={{ display: 'block', textAlign: 'center', color: 'text.secondary' }}
						>
							Max Focus: Base calculation
							{autoFocusBonus > 0 && ` + ${autoFocusBonus} (auto)`}
							{(focusDetails?.maxFocusModifier || 0) !== 0 &&
								` + ${focusDetails?.maxFocusModifier || 0} (mod)`}{' '}
							= {maxFocus}
						</Typography>
					</Box>

					{/* Modifiers */}
					<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mb: 2 }}>
						<Controller
							name="maxFocusModifier"
							control={control}
							render={({ field, fieldState }) => (
								<DerivedPart
									{...field}
									label="Bonus"
									value={field.value}
									onChange={(value) => {
										field.onChange(value)
										updateCharacter({
											spells: { focusDetails: { maxFocusModifier: value } },
										})
									}}
									error={!!fieldState.error}
									helperText={fieldState.error?.message || ''}
								/>
							)}
						/>
						{autoFocusBonus > 0 && (
							<DerivedPart auto value={autoFocusBonus} label="Auto" sx={{ width: '4rem' }} />
						)}
					</Box>

					<AdjustStepper
						title="Spend / Restore"
						decreaseLabel="Spend"
						increaseLabel="Restore"
						onDecrease={(amount) => {
							setCurrent(focus.current - amount)
							animation.setState('damage')
						}}
						onIncrease={(amount) => {
							setCurrent(focus.current + amount)
							animation.setState('healing')
						}}
					/>
				</>
			}
		>
			<Typography
				sx={{
					fontWeight: 'bold',
					fontSize: '1.1rem',
					lineHeight: 1.2,
					textAlign: 'center',
					color: focusColor,
					...animation.sx,
				}}
			>
				{focus.current}/{maxFocus}
			</Typography>
		</SheetField>
	)
}

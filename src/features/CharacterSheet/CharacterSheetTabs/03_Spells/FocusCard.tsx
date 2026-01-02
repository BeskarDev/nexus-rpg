import React, { useMemo, useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Settings, Remove, Add, AutoFixHigh } from '@mui/icons-material'
import {
	Box,
	IconButton,
	Menu,
	Typography,
	Button,
	LinearProgress,
	TextField,
	alpha,
} from '@mui/material'
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { calculateMaxFocus } from '../../utils/calculateFocus'
import { createFocusFieldSchema } from '../../utils/validation'
import { CharacterSheetCard, CardHeader } from '../../components'
import { AttributeField, SectionHeader } from '../../CharacterSheet'

export const FocusCard = () => {
	const dispatch = useAppDispatch()
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [spendRestoreAmount, setSpendRestoreAmount] = useState<number>(0)
	const [animationState, setAnimationState] = useState<
		'none' | 'damage' | 'healing'
	>('none')
	const open = Boolean(anchorEl)

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

	const {
		control,
		formState: { errors },
		reset,
		watch,
	} = useForm({
		resolver: yupResolver(focusSchema),
		defaultValues: {
			currentFocus: focus.current,
			maxFocusModifier: focusDetails?.maxFocusModifier || 0,
		},
		mode: 'onChange', // Validate on change for immediate feedback
	})

	const formValues = watch()

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
		setSpendRestoreAmount(0)
	}

	const applySpendOrRestore = (isSpend: boolean) => {
		if (spendRestoreAmount <= 0) return

		let newCurrentFocus = focus.current

		if (isSpend) {
			// Spending Focus
			newCurrentFocus = Math.max(0, focus.current - spendRestoreAmount)
			setAnimationState('damage')
		} else {
			// Restoring Focus
			newCurrentFocus = Math.min(maxFocus, focus.current + spendRestoreAmount)
			setAnimationState('healing')
		}

		updateCharacter({
			spells: { focus: { current: newCurrentFocus } },
		})

		setSpendRestoreAmount(0)
	}

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<AutoFixHigh />} label="Focus" color={UI_COLORS.purple} />}
			tooltip="Magical energy pool for casting spells"
			showConfigButton
			onConfigClick={handleClick}
			minWidth="8rem"
			footer={
				<Box sx={{ width: '100%', mt: 0.5, px: 1 }}>
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
			configMenu={
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{ sx: { p: 2, maxWidth: '25rem' } }}
				>
					<SectionHeader sx={{ mb: 2 }}>Focus Configuration</SectionHeader>

					{/* Visual Focus Bar with editable current Focus */}
					<Box sx={{ mb: 3 }}>
						{/* Focus Bar Container */}
						<Box
							sx={{
								position: 'relative',
								display: 'flex',
								height: '44px',
								mb: 1,
								borderRadius: '8px',
								overflow: 'hidden',
								border: '2px solid',
								borderColor: 'divider',
							}}
						>
							{/* Main Focus Bar */}
							<LinearProgress
								variant="determinate"
								value={Math.min((focus.current / maxFocus) * 100, 100)}
								color={getFocusColor()}
								sx={{
									flex: 1,
									height: '100%',
									transition: 'all 0.3s ease',
									backgroundColor: 'rgba(0, 0, 0, 0.2)',
									'& .MuiLinearProgress-bar': {
										boxShadow: 'inset 0 2px 8px rgba(0, 0, 0, 0.3)',
									},
								}}
							/>

							{/* Editable Focus Text Overlay */}
							<Box
								sx={{
									position: 'absolute',
									top: '50%',
									left: '50%',
									transform: 'translate(-50%, -50%)',
									display: 'flex',
									alignItems: 'baseline',
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
											}}
											onChange={(e) => {
												const value = Number(e.target.value)
												const clampedCurrent = Math.max(0, Math.min(value, maxFocus))
												field.onChange(clampedCurrent)
												updateCharacter({
													spells: { focus: { current: clampedCurrent } },
												})
											}}
											error={!!fieldState.error}
											sx={{
												width: '55px',
												mt: '6px',
												'& .MuiOutlinedInput-root': {
													backgroundColor: 'rgba(0, 0, 0, 0.6)',
													fontWeight: 'bold',
													color: 'white',
													'& fieldset': {
														borderColor: 'rgba(255, 255, 255, 0.3)',
														borderWidth: '2px',
													},
													'&:hover fieldset': {
														borderColor: 'rgba(255, 255, 255, 0.5)',
													},
													'&.Mui-focused fieldset': {
														borderColor: 'primary.main',
													},
												},
												'& input': {
													textAlign: 'center',
													padding: '4px 6px',
													fontSize: '0.875rem',
													color: 'white',
												},
											}}
										/>
									)}
								/>
								<Typography
									variant="body1"
									sx={{
										color: 'white',
										fontWeight: 'bold',
										textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)',
									}}
								>
									/ {maxFocus}
								</Typography>
							</Box>
						</Box>

						{/* Formula Display */}
						<Typography
							variant="caption"
							sx={{
								display: 'block',
								textAlign: 'center',
								color: 'text.secondary',
								fontSize: '0.75rem',
							}}
						>
							Max Focus: Base calculation
							{autoFocusBonus > 0 && ` + ${autoFocusBonus} (auto)`}
							{(focusDetails?.maxFocusModifier || 0) !== 0 && ` + ${focusDetails?.maxFocusModifier || 0} (mod)`} = {maxFocus}
						</Typography>
					</Box>

					{/* Modifiers */}
					<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, mb: 2 }}>
						<Controller
							name="maxFocusModifier"
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
											spells: {
												focusDetails: { maxFocusModifier: value },
											},
										})
									}}
									error={!!fieldState.error}
									helperText={fieldState.error?.message || ''}
									label="Bonus"
									sx={{
										'& input': {
											textAlign: 'center',
										},
										width: '5rem',
									}}
								/>
							)}
						/>

						{autoFocusBonus > 0 && (
							<AttributeField
								disabled
								type="number"
								size="small"
								value={autoFocusBonus}
								label="Auto"
								sx={{ width: '4rem' }}
							/>
						)}
					</Box>

					{/* Spend/Restore Controls */}
					<Typography variant="subtitle2" sx={{ mb: 1 }}>
						Spend / Restore
					</Typography>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
						<Button
							variant="outlined"
							color="error"
							size="small"
							onClick={() => applySpendOrRestore(true)}
							startIcon={<Remove />}
							disabled={spendRestoreAmount <= 0}
						>
							Spend
						</Button>
						<AttributeField
							type="number"
							size="small"
							value={spendRestoreAmount}
							onChange={(event) =>
								setSpendRestoreAmount(Number(event.target.value))
							}
							label="Amount"
							sx={{ flexGrow: 1 }}
						/>
						<Button
							variant="outlined"
							color="success"
							size="small"
							onClick={() => applySpendOrRestore(false)}
							startIcon={<Add />}
							disabled={spendRestoreAmount <= 0}
						>
							Restore
						</Button>
					</Box>
				</Menu>
			}
		>
			<Typography
				sx={{
					fontWeight: 'bold',
					fontSize: '1.1rem',
					lineHeight: 1.2,
					textAlign: 'center',
					color: focusColor,
					transition: 'all 0.3s ease-in-out',
					...(animationState === 'damage' && {
						animation: 'shake 0.5s ease-in-out',
					}),
					...(animationState === 'healing' && {
						animation: 'pulse 0.5s ease-in-out',
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
				{focus.current}/{maxFocus}
			</Typography>
		</CharacterSheetCard>
	)
}

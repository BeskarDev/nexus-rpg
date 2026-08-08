import React, { useMemo, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, LinearProgress, Menu, Typography } from '@mui/material'
import { UI_COLORS } from '../../../../utils/colors'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useValueAnimation } from '../../hooks/useValueAnimation'
import { calculateMaxFocus } from '../../utils/calculateFocus'
import { createFocusFieldSchema } from '../../utils/validation'
import {
	AdjustStepper,
	DerivedPart,
	FieldGroupLabel,
	MetaBandField,
	MetaBandLabel,
	MetaBandValue,
	RuleInfo,
} from '../../components'
import { SectionHeader } from '../../CharacterSheet'

/**
 * The pool's ink, by how much of it is left.
 *
 * Full-to-half is the MAGIC register (rune-cyan): a full focus pool is not a warning,
 * it is the resource this tab is about. Below half it takes the sheet's own warning and
 * danger inks, because "running out" is the same statement here as it is for HP and
 * load, and it should not be said in a third vocabulary (M13 S5).
 */
const focusTone = (percentage: number) =>
	percentage >= 50
		? UI_COLORS.magic
		: percentage >= 20
			? UI_COLORS.warning
			: UI_COLORS.danger

/**
 * The focus meter — one component for the card's face and its editor, so the two
 * cannot state the pool differently. `HpBar` is the same idea on the HP card; the two
 * are separate because HP carries a second (temp) segment that focus has no analogue
 * for, and a shared bar would need a prop that means nothing on this side.
 */
const FocusBar: React.FC<{ current: number; max: number; height?: string }> = ({
	current,
	max,
	height = '4px',
}) => {
	const percentage = max > 0 ? Math.min((current / max) * 100, 100) : 0
	return (
		<LinearProgress
			variant="determinate"
			value={percentage}
			aria-label="Focus"
			sx={{
				height,
				// The theme flattens the track; the FILL is the pool's tone, set here
				// rather than through MUI's `color` prop, which only accepts palette names
				// and has no entry for a register the palette does not own.
				'& .MuiLinearProgress-bar': { backgroundColor: focusTone(percentage) },
			}}
		/>
	)
}

/**
 * The focus pool, as a field in the Spells tab's meta band (M13 S5, owner review).
 *
 * It was a `SheetField` card in a row of four floating cards — the arrangement the Items
 * tab retired in S4b, for the same reason: these are facts about the whole tab, so they
 * read as a line under its heading rather than as tiles above it.
 *
 * What the card gave it and a band field must not lose is the EDITOR. Spending and
 * restoring focus is a mid-play action, so the popover survives the move; it opens from
 * a plate beside the value instead of by clicking a card, which is also the more honest
 * affordance — a card that is secretly a button was one of the things S3.5 had to teach
 * with a focus ring.
 */
export const FocusField = () => {
	const dispatch = useAppDispatch()
	const animation = useValueAnimation()
	const [editorAnchor, setEditorAnchor] = React.useState<null | HTMLElement>(
		null,
	)

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

	const focusPercentage = maxFocus > 0 ? (focus.current / maxFocus) * 100 : 0
	const focusColor = focusTone(focusPercentage)

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const setCurrent = (value: number) =>
		updateCharacter({
			spells: { focus: { current: Math.max(0, Math.min(value, maxFocus)) } },
		})

	const editorContent = (
		<>
			<SectionHeader sx={{ mb: 1.25 }}>Focus</SectionHeader>

			{/* 1 — the pool. A large numeral in the pool's own tone, which is the
						same signal the card's face carries, so the popover confirms the state
						the player already saw before they act on it. Still the input; the
						accessible name is on it. */}
			<Box
				sx={{
					display: 'flex',
					alignItems: 'baseline',
					justifyContent: 'center',
					gap: 0.5,
					mb: 0.75,
				}}
			>
				<Controller
					name="currentFocus"
					control={control}
					render={({ field, fieldState }) => (
						<DerivedPart
							{...field}
							value={field.value}
							inputProps={{
								max: maxFocus,
								min: 0,
								'aria-label': 'Current Focus',
								sx: {
									textAlign: 'center',
									fontSize: '1.6rem',
									fontWeight: 700,
									lineHeight: 1.1,
									py: 0.25,
									color: focusColor,
								},
							}}
							onChange={(value) => {
								const clamped = Math.max(0, Math.min(value, maxFocus))
								field.onChange(clamped)
								setCurrent(clamped)
							}}
							error={!!fieldState.error}
							sx={{ width: '4.5rem', m: 0 }}
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
					/ {maxFocus}
				</Typography>
			</Box>

			{/* The same meter the card carries, heavier here where the pool is the
						subject rather than a detail. */}
			<FocusBar current={focus.current} max={maxFocus} height="8px" />

			<Typography
				variant="caption"
				sx={{
					display: 'block',
					textAlign: 'center',
					color: 'text.secondary',
					mt: 0.75,
				}}
			>
				Max Focus: base
				{autoFocusBonus > 0 && ` + ${autoFocusBonus} (auto)`}
				{(focusDetails?.maxFocusModifier || 0) !== 0 &&
					` + ${focusDetails?.maxFocusModifier || 0} (mod)`}{' '}
				= {maxFocus}
			</Typography>

			{/* 2 — the action, directly under the value it changes. */}
			<Box sx={{ mt: 1.75 }} />
			<AdjustStepper
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

			{/* 3 — the reserves: set at level-up or when a buff lands, not in a
						fight, so it reads as configuration and sits last. */}
			<FieldGroupLabel sx={{ mt: 1.75 }}>Reserves</FieldGroupLabel>
			<Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
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
					<DerivedPart
						auto
						value={autoFocusBonus}
						label="Auto"
						sx={{ width: '4rem' }}
					/>
				)}
			</Box>
		</>
	)

	return (
		<MetaBandField nowrap>
			{/* The whole field is the trigger, the way an HP card is (S5, owner review).
				A separate adjust button beside the value was a second control for the thing
				the value already names — and the HP card taught the sheet's players that a
				pool opens when you click it, so focus should not need a different gesture.
				A `button` rather than a click handler on a div: it has to be reachable and
				announce what it does. */}
			<Box
				component="button"
				type="button"
				className="cs-band-trigger"
				aria-haspopup="dialog"
				aria-label={`Spend or restore focus — ${focus.current} of ${maxFocus}`}
				onClick={(event) => setEditorAnchor(event.currentTarget)}
			>
				<MetaBandLabel sigil="focus">Focus</MetaBandLabel>
				{/* The animation rides the VALUE, as it does on the HP card: spending focus
					flashes the same way taking damage does, so the two pools report a change
					in one language. */}
				<MetaBandValue tone={focusColor}>
					<Box component="span" sx={{ ...animation.sx }}>
						{focus.current}/{maxFocus}
					</Box>
				</MetaBandValue>
				<Box sx={{ width: '4rem' }}>
					<FocusBar current={focus.current} max={maxFocus} />
				</Box>
			</Box>
			{/* The gloss stays OUTSIDE the trigger: a button inside a button is invalid, and
				a rules explanation is not the same act as spending the pool. */}
			<RuleInfo label="About focus">
				Focus is the pool you spend to cast. A spell costs twice its rank, and a
				spell you cannot pay for cannot be cast.
			</RuleInfo>
			<Menu
				anchorEl={editorAnchor}
				open={Boolean(editorAnchor)}
				onClose={() => setEditorAnchor(null)}
				// Portaled outside `.character-sheet-page`, so without `cs-tokens` every
				// `--cs-*` token the editor reads resolves to nothing — the S1 portal bug.
				slotProps={{ paper: { className: 'cs-tokens' } }}
				// The pool editors hold the widest content any popover on the sheet does — a
				// meter, a stepper with two labelled halves, and a reserves row. 26rem fits
				// that without the popover becoming a panel (S5, owner review).
				MenuListProps={{ sx: { p: 2, width: '26rem', maxWidth: '92vw' } }}
			>
				<Box>{editorContent}</Box>
			</Menu>
		</MetaBandField>
	)
}

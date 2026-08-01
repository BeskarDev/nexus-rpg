import React, { useState } from 'react'
import {
	Box,
	Button,
	IconButton,
	Menu,
	Popover,
	TextField,
	Tooltip,
	Typography,
} from '@mui/material'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import { CONDITION_SIGIL } from '@site/src/components/codex/condition-sigils'
import {
	StatusEffect,
	StatusEffectType,
	statusEffectTypeArray,
} from '@site/src/types/Character'
import conditionsData from '@site/src/utils/data/json/conditions.json'
import { sanitizeHtml } from '@site/src/utils/typescript/htmlSanitizer'
import { UI_COLORS } from '@site/src/utils/colors'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { CharacterSheetCard, FieldGroupLabel } from '../../components'
import {
	DEFAULT_INTENSITY,
	DURATION_FULL,
	DURATION_GLOSS,
	DURATION_LABEL,
	DURATION_RUNGS,
	DurationRung,
	INTENSITY_CONDITIONS,
	INTENSITY_STEPS,
	MIN_INTENSITY,
	readRung,
} from '../../constants'

interface StatusEffectsProps {
	statusEffects: StatusEffect[]
}

/**
 * "bleeding (X)" -> "Bleeding".
 *
 * Capitalised here rather than with `text-transform`, because the accessible name
 * comes from the DOM text: the old version styled the menu with
 * `textTransform: 'capitalize'` and every one of these announced lowercase.
 */
const displayName = (name: string) => {
	const bare = name.replace(/\s*\(X\)/gi, '')
	return bare.charAt(0).toUpperCase() + bare.slice(1)
}

const conditionGloss = (name: string): string => {
	if (!name) return ''
	const wanted = displayName(name).toLowerCase()
	const condition = conditionsData.find(
		(candidate) => displayName(candidate.name).toLowerCase() === wanted,
	)
	return sanitizeHtml(condition?.description ?? '')
}

/** Small-caps bronze keyline shared by every control in here. */
const keyline = (active: boolean) => ({
	fontFamily: 'var(--nexus-font-ui)',
	fontWeight: 700,
	// M13 S3.5: one step up, matching `CardHeader`. Small caps render at about
	// cap height, so 11px here had the optical presence of 8px — on controls a
	// player taps mid-fight.
	fontSize: 'var(--nexus-text-xs)',
	fontVariant: 'small-caps' as const,
	letterSpacing: '0.04em',
	lineHeight: 1.3,
	borderRadius: 0.5,
	border: '1px solid',
	whiteSpace: 'nowrap' as const,
	color: active ? 'primary.main' : 'text.secondary',
	borderColor: active
		? 'var(--nexus-bronze)'
		: 'color-mix(in srgb, var(--nexus-bronze) 22%, transparent)',
	bgcolor: active
		? 'color-mix(in srgb, var(--nexus-bronze) 14%, transparent)'
		: 'transparent',
	'&:hover': {
		borderColor: 'color-mix(in srgb, var(--nexus-bronze) 55%, transparent)',
		bgcolor: 'color-mix(in srgb, var(--nexus-bronze) 8%, transparent)',
	},
})

/**
 * A row of duration rungs. Tapping a rung sets it; tapping the set rung clears
 * it. `onPick` receives `undefined` for that clear.
 *
 * Rendered as a ladder rather than a `<Select>` because duration IS a ladder in
 * the rules — "extend by one step" moves up this exact list — and because a
 * select costs a tap to open, a tap to choose, and hides the ordering while
 * closed.
 *
 * This is the **edit** face of duration. The read face is a single token: see
 * `DurationChip`.
 */
const DurationLadder: React.FC<{
	value: DurationRung | undefined
	onPick: (rung: DurationRung | undefined) => void
	labelPrefix: string
}> = ({ value, onPick, labelPrefix }) => (
	<Box
		sx={{ display: 'flex', gap: 0.35 }}
		role="group"
		aria-label={labelPrefix}
	>
		{DURATION_RUNGS.map((rung) => {
			const active = value === rung
			return (
				<Tooltip key={rung} title={DURATION_GLOSS[rung]} placement="top" arrow>
					<Button
						size="small"
						onClick={() => onPick(active ? undefined : rung)}
						aria-pressed={active}
						aria-label={`${labelPrefix} ${DURATION_FULL[rung]}`}
						sx={{ minWidth: 0, px: 0.6, py: 0.1, ...keyline(active) }}
					>
						{DURATION_LABEL[rung]}
					</Button>
				</Tooltip>
			)
		})}
	</Box>
)

/**
 * Intensity for the "(X)" conditions — bleeding, burning, marked.
 *
 * Standard values first as one-tap stones, a free field behind them. The split is
 * measured rather than assumed: 2, 4 and 6 are 92% of every intensity written
 * into the game's content, and the rest are 8, 10 and 12 on high-tier effects.
 * So the stones cover almost everything, and the fallback has to reach 12 without
 * feeling like an escape hatch — which is why it is a real field rather than a
 * pair of nudge arrows that would need five taps to get from 2 to 12.
 *
 * The stones are visually the same device as `AdjustStepper`'s amount stones on
 * purpose. Both mean "the value you almost certainly want, one tap away".
 */
const IntensityPicker: React.FC<{
	name: string
	value: number
	/** `viaStone` is false for the free field, which must not close on commit. */
	onPick: (intensity: number, viaStone: boolean) => void
}> = ({ name, value, onPick }) => {
	/**
	 * The field is uncontrolled between keystrokes so a half-typed number is not
	 * fought by the store — typing "12" passes through "1", and a controlled value
	 * clamped on every keystroke makes the second digit impossible to reach.
	 */
	const [draft, setDraft] = useState<string | null>(null)
	const shown = draft ?? String(value)

	const commit = (raw: string) => {
		const parsed = Number(raw)
		if (Number.isFinite(parsed) && parsed >= MIN_INTENSITY)
			onPick(Math.round(parsed), false)
		setDraft(null)
	}

	return (
		<>
			<FieldGroupLabel sx={{ mb: 0.75 }}>Intensity</FieldGroupLabel>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.35 }}>
				{INTENSITY_STEPS.map((step) => (
					<Button
						key={step}
						size="small"
						onClick={() => {
							setDraft(null)
							onPick(step, true)
						}}
						aria-pressed={value === step}
						aria-label={`${name} intensity ${step}`}
						sx={{
							minWidth: '2rem',
							px: 0.6,
							py: 0.1,
							...keyline(value === step),
						}}
					>
						{step}
					</Button>
				))}
				<TextField
					type="number"
					size="small"
					value={shown}
					onChange={(event) => setDraft(event.target.value)}
					onBlur={(event) => commit(event.target.value)}
					onKeyDown={(event) => {
						if (event.key === 'Enter')
							commit((event.target as HTMLInputElement).value)
					}}
					inputProps={{
						min: MIN_INTENSITY,
						'aria-label': `${name} intensity`,
						sx: { textAlign: 'center', py: 0.35, fontWeight: 700 },
					}}
					sx={{ width: '3.5rem', ml: 0.4 }}
				/>
			</Box>
		</>
	)
}

/**
 * Status conditions (M13).
 *
 * ## What changed and why
 *
 * The old version was a wrap of MUI `Chip`s. Setting a duration meant: add the
 * condition, click a pencil, open a `<Select>`, choose, then click a save tick —
 * four steps and a mode switch for a value the player knew before they started.
 * A click on the chip body meanwhile toggled an `active` flag that dimmed it to
 * 60%, so the same row had two competing tap targets and one of them did
 * something the rules have no name for.
 *
 * Now: **duration is armed in the add menu**, so one visit to one popover
 * afflicts a fully formed condition, on the rung it belongs on.
 *
 * ## Read state and edit state
 *
 * A condition that is already set up should look **settled**. So the row shows
 * duration and intensity as read-only values, and the controls that change them
 * appear only when asked for:
 *
 * ```
 *   read:   ✋ GRAPPLED                    Brief   ✕
 *   edit:   ✋ GRAPPLED                  [Brief]   ✕      <- popover below
 *           LASTS  [Brief][Short][Med][Long]
 * ```
 *
 * The first draft rendered all four rungs on every row permanently, which put
 * five controls on a settled condition and made a plate of them read as a
 * toolbar rather than as a list of what is wrong with you. Twenty-four
 * conditions is the worst case and it has to stay scannable.
 *
 * The editor is a **popover**, not an inline expansion, for the reason M13 S1
 * hit in `AdjustStepper`: a row that grows when tapped shifts everything under
 * it, and these rows stack. It is also the pattern the rest of the sheet already
 * uses — `SheetField` is a card that reads a value and a popover that edits it.
 * There is still no save step; a tap on a rung writes immediately and closes.
 *
 * The 24 `@mui/icons-material` icons this used to import are gone, replaced by
 * the condition sigils (`condition-sigils.ts`) — the largest single block of
 * Material icons in the app.
 */
export const StatusEffects: React.FC<StatusEffectsProps> = ({
	statusEffects,
}) => {
	const dispatch = useAppDispatch()
	const [addAnchor, setAddAnchor] = useState<null | HTMLElement>(null)
	/** The rung the next affliction lands on. Scratch state, never the character's. */
	const [armedRung, setArmedRung] = useState<DurationRung | undefined>(
		'briefly',
	)
	/**
	 * Which value on which condition is being changed, and what it hangs off.
	 *
	 * Duration and intensity are separate editors on separate triggers. They were
	 * one popover behind the duration token, which meant changing an intensity
	 * required knowing it lived behind a button labelled "Brief". Each value is now
	 * its own tap target: you tap the thing you want to change.
	 */
	const [editing, setEditing] = useState<{
		id: string
		field: 'duration' | 'intensity'
		anchor: HTMLElement
	} | null>(null)

	const active = Array.isArray(statusEffects) ? statusEffects : []
	const afflicted = new Set(active.map((effect) => effect.name))
	const available = statusEffectTypeArray.filter((type) => !afflicted.has(type))
	const editingEffect = active.find((effect) => effect.id === editing?.id)

	const afflict = (name: StatusEffectType) => {
		dispatch(
			characterSheetActions.addStatusEffect({
				name,
				rung: armedRung,
				...(INTENSITY_CONDITIONS.has(name)
					? { intensity: DEFAULT_INTENSITY }
					: {}),
			}),
		)
		setAddAnchor(null)
	}

	return (
		<CharacterSheetCard sx={{ mb: 1 }}>
			{/*
				One full-width child. `CharacterSheetCard` centres its children in a flex
				ROW — it is built for a stat tile holding a single value — so handing it
				a heading and a list put them side by side.
			*/}
			<Box sx={{ width: '100%', px: 1, py: 0.5 }}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						gap: 1,
						mb: active.length ? 0.75 : 0,
					}}
				>
					<FieldGroupLabel sx={{ mb: 0 }}>Status Conditions</FieldGroupLabel>
					<Button
						size="small"
						onClick={(event) => setAddAnchor(event.currentTarget)}
						aria-label="Afflict a condition"
						disabled={!available.length}
						sx={{ px: 0.8, py: 0.15, ...keyline(false) }}
					>
						+ Afflict
					</Button>
				</Box>

				{active.length === 0 ? (
					<Typography
						sx={{
							fontSize: 'var(--nexus-text-xs)',
							color: 'text.secondary',
							fontStyle: 'italic',
						}}
					>
						Unafflicted.
					</Typography>
				) : (
					<Box
						sx={{
							display: 'grid',
							// Two per line from `sm` up, one below.
							//
							// This was `repeat(auto-fill, minmax(16rem, 1fr))` and produced a
							// single column at every width: `auto-fill` fits as many tracks of
							// at least the floor as will go, and a 16rem (256px) floor is wider
							// than half this container, so one track always won. A row needs
							// about 215px of content — sigil, name, intensity, duration token,
							// remove — but pinning the floor to a measured guess is fragile,
							// and the requirement is not "as many as fit", it is "two".
							//
							// `minmax(0, 1fr)` rather than `1fr`: a plain `1fr` track keeps an
							// automatic minimum, so a long condition name would push its track
							// past its share and break the two-up layout instead of
							// ellipsizing inside it.
							gridTemplateColumns: {
								xs: '1fr',
								sm: 'repeat(2, minmax(0, 1fr))',
							},
							gap: 0.4,
						}}
					>
						{active.map((effect) => {
							const name = displayName(effect.name)
							const rung = readRung(effect)
							const takesIntensity = INTENSITY_CONDITIONS.has(effect.name)
							const isEditing = editing?.id === effect.id
							return (
								<Box
									key={effect.id}
									sx={{
										display: 'flex',
										alignItems: 'center',
										gap: 0.75,
										py: 0.3,
										px: 0.6,
										borderRadius: 0.5,
										// A left keyline in the danger tone rather than a filled
										// chip: with up to 25 of these stacked, filled rows turn the
										// plate into a block of colour and stop ranking anything.
										borderLeft: '2px solid',
										borderLeftColor: UI_COLORS.danger,
										bgcolor:
											'color-mix(in srgb, var(--nexus-bronze) 5%, transparent)',
									}}
								>
									<Tooltip
										title={conditionGloss(effect.name)}
										placement="top"
										arrow
										describeChild
									>
										<Box
											sx={{
												display: 'flex',
												alignItems: 'center',
												gap: 0.5,
												minWidth: 0,
												color: UI_COLORS.danger,
												cursor: 'help',
											}}
										>
											<SigilIcon
												name={CONDITION_SIGIL[effect.name]}
												size={15}
											/>
											<Typography
												component="span"
												sx={{
													fontFamily: 'var(--nexus-font-ui)',
													fontWeight: 700,
													fontSize: 'var(--nexus-text-xs)',
													fontVariant: 'small-caps',
													letterSpacing: '0.04em',
													lineHeight: 1.3,
													// "Suffocating" in a half-width column is the tight case; it
													// truncates rather than widening the grid track.
													overflow: 'hidden',
													textOverflow: 'ellipsis',
													whiteSpace: 'nowrap',
												}}
											>
												{name}
											</Typography>
										</Box>
									</Tooltip>

									{/*
									Intensity sits beside the name because that is how the rules
									write it ("bleeding 2"), but it is its own button.
								*/}
									{takesIntensity && (
										<Button
											size="small"
											onClick={(event) =>
												setEditing({
													id: effect.id,
													field: 'intensity',
													anchor: event.currentTarget,
												})
											}
											aria-label={`${name} intensity ${
												effect.intensity ?? DEFAULT_INTENSITY
											} — change`}
											aria-expanded={
												isEditing && editing?.field === 'intensity'
											}
											sx={{
												minWidth: 0,
												px: 0.55,
												py: 0,
												...keyline(isEditing && editing?.field === 'intensity'),
												color: UI_COLORS.danger,
												fontSize: 'var(--nexus-text-xs)',
											}}
										>
											{effect.intensity ?? DEFAULT_INTENSITY}
										</Button>
									)}

									<Box sx={{ flex: 1, minWidth: '0.25rem' }} />

									{/*
										The read face of duration: one token, and the trigger for the
										editor. An unset duration still needs a target to tap, so it
										shows an em dash rather than nothing.
									*/}
									<Button
										size="small"
										onClick={(event) =>
											setEditing({
												id: effect.id,
												field: 'duration',
												anchor: event.currentTarget,
											})
										}
										aria-label={
											rung
												? `${name} lasts ${DURATION_FULL[rung]} — change`
												: `${name} has no duration — set one`
										}
										aria-expanded={isEditing && editing?.field === 'duration'}
										sx={{
											minWidth: 0,
											px: 0.7,
											py: 0.1,
											...keyline(isEditing && editing?.field === 'duration'),
											...(rung ? {} : { color: 'text.disabled' }),
										}}
									>
										{rung ? DURATION_LABEL[rung] : '—'}
									</Button>

									<IconButton
										size="small"
										aria-label={`Remove ${name}`}
										onClick={() =>
											dispatch(
												characterSheetActions.removeStatusEffect(effect.id),
											)
										}
										sx={{
											p: 0.2,
											fontSize: 'var(--nexus-text-xs)',
											color: 'text.secondary',
											'&:hover': { color: UI_COLORS.danger },
										}}
									>
										✕
									</IconButton>
								</Box>
							)
						})}
					</Box>
				)}
			</Box>

			{/*
				One popover, two single-purpose editors. Duration and intensity each hang
				off their own token in the row, so the popover shows only the one that was
				tapped — and picking a value always closes, because either editor is now a
				single decision. Free-typing an intensity keeps it open until blur.
			*/}
			<Popover
				open={Boolean(editing && editingEffect)}
				anchorEl={editing?.anchor ?? null}
				onClose={() => setEditing(null)}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				transformOrigin={{ vertical: 'top', horizontal: 'center' }}
				// Scoped `--cs-*` tokens do not reach a portal (M13 S1).
				slotProps={{ paper: { className: 'cs-tokens', sx: { p: 1.5 } } }}
			>
				{editingEffect && editing?.field === 'duration' && (
					<>
						<FieldGroupLabel sx={{ mb: 0.75 }}>Lasts</FieldGroupLabel>
						<DurationLadder
							value={readRung(editingEffect)}
							labelPrefix={`${displayName(editingEffect.name)} duration`}
							onPick={(picked) => {
								dispatch(
									characterSheetActions.setStatusEffectDuration({
										id: editingEffect.id,
										rung: picked,
									}),
								)
								setEditing(null)
							}}
						/>
					</>
				)}

				{editingEffect && editing?.field === 'intensity' && (
					<IntensityPicker
						name={displayName(editingEffect.name)}
						value={editingEffect.intensity ?? DEFAULT_INTENSITY}
						onPick={(intensity, viaStone) => {
							dispatch(
								characterSheetActions.setStatusEffectIntensity({
									id: editingEffect.id,
									intensity,
								}),
							)
							if (viaStone) setEditing(null)
						}}
					/>
				)}
			</Popover>

			<Menu
				anchorEl={addAnchor}
				open={Boolean(addAnchor)}
				onClose={() => setAddAnchor(null)}
				// The sheet's `--cs-*` tokens are scoped to `.character-sheet-page`, and
				// MUI portals this to `document.body` — without the class the danger tone
				// on every row in here resolves to nothing (M13 S1).
				slotProps={{ paper: { className: 'cs-tokens' } }}
				MenuListProps={{ sx: { p: 1.5, maxWidth: '20rem' } }}
			>
				<FieldGroupLabel sx={{ mb: 0.75 }}>Lasts</FieldGroupLabel>
				<Box sx={{ mb: 1.5 }}>
					<DurationLadder
						value={armedRung}
						onPick={setArmedRung}
						labelPrefix="Duration"
					/>
				</Box>
				<FieldGroupLabel sx={{ mb: 0.75 }}>Afflict with</FieldGroupLabel>
				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: 'repeat(2, 1fr)',
						gap: 0.35,
						maxHeight: '17rem',
						overflowY: 'auto',
					}}
				>
					{available.map((type) => (
						<Tooltip
							key={type}
							title={conditionGloss(type)}
							placement="left"
							arrow
							// Without this the rules text becomes the button's aria-label and
							// every condition in here announces a full paragraph instead of
							// its name. `describeChild` makes the gloss an aria-describedby,
							// which is what a description is.
							describeChild
						>
							<Button
								size="small"
								onClick={() => afflict(type)}
								aria-label={displayName(type)}
								sx={{
									justifyContent: 'flex-start',
									gap: 0.5,
									px: 0.6,
									py: 0.3,
									...keyline(false),
									color: 'text.primary',
								}}
							>
								<SigilIcon name={CONDITION_SIGIL[type]} size={14} />
								{displayName(type)}
							</Button>
						</Tooltip>
					))}
				</Box>
				{available.length === 0 && (
					<Typography
						sx={{ fontSize: 'var(--nexus-text-xs)', color: 'text.secondary' }}
					>
						Every condition is already afflicted.
					</Typography>
				)}
			</Menu>
		</CharacterSheetCard>
	)
}

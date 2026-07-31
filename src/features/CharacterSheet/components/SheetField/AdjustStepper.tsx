import { Box, Button, TextField, alpha } from '@mui/material'
import React from 'react'
import { FieldGroupLabel } from './FieldGroupLabel'

export interface AdjustStepperProps {
	/**
	 * Section heading. Defaults to the two verbs — `Spend / Restore` on a focus pool,
	 * `Damage / Healing` on HP.
	 *
	 * It used to default to the literal string "Damage / Healing", so the Focus editor
	 * headed a Spend/Restore stepper with HP's vocabulary (M13 S5, owner review). A
	 * default that names one caller is not a default.
	 */
	title?: string
	/** Label for the subtract button — "Damage", "Spend". */
	decreaseLabel: string
	/** Label for the add button — "Healing", "Restore". */
	increaseLabel: string
	onDecrease: (amount: number) => void
	onIncrease: (amount: number) => void
	/**
	 * The one-tap amounts. Defaults to the spread that covers most rolls: 1–3 for
	 * weak hits and chip damage, 5 and 10 for solid ones.
	 */
	quickAmounts?: number[]
}

/**
 * The spend-or-restore control shared by every gauge on the sheet (M9 S11).
 *
 * `HpCard`, `FocusCard` and `CompanionHPCard` each carried their own copy of
 * this: two outlined buttons in error and success, an amount field between them,
 * both disabled while the amount is zero, and a reset to zero after applying.
 * The only real difference was the pair of verbs, which is now a prop.
 *
 * It owns the amount, because the amount is scratch state that never belongs to
 * the character — every copy had to remember to clear it, and one of them
 * cleared it in two places.
 *
 * ## M13 S1 — the tally row
 *
 * The original composition was `[− Damage] [Amount] [+ Healing]`, which put the
 * two verbs on the outside and made **typing mandatory**: every application cost
 * focus the field, type a digit, click a verb. That is three interactions for the
 * most frequent thing anyone does to this sheet, mid-fight, often on a phone.
 *
 * So the amount is now **armed by tapping a stone** and applied by tapping a
 * verb: two taps, no keyboard. The free-entry field stays for amounts the stones
 * do not cover (a 13-damage crit), but it is the fallback rather than the only
 * path.
 *
 * Two deliberate rejections. The stones do **not** apply on tap — a pad that
 * applied directly would need a damage/heal mode, and a mis-set mode silently
 * does the opposite of what the player wanted to a value with no undo. And the
 * verbs are **not** bare `+`/`−` icon buttons: "Damage 7" states the whole action
 * including its amount, so the plate is its own confirmation. That echo is why
 * the armed amount reads back inside the verb.
 *
 * The Material `Add`/`Remove` icons the old version imported are gone with it —
 * typographic `−`/`+` carry the direction, which is two fewer Material icons for
 * M13 S9 to account for.
 */
export const AdjustStepper: React.FC<AdjustStepperProps> = ({
	title,
	decreaseLabel,
	increaseLabel,
	onDecrease,
	onIncrease,
	quickAmounts = [1, 2, 3, 5, 10],
}) => {
	const [amount, setAmount] = React.useState(0)

	const apply = (direction: 'decrease' | 'increase') => {
		if (amount <= 0) return
		if (direction === 'decrease') onDecrease(amount)
		else onIncrease(amount)
		setAmount(0)
	}

	const armed = amount > 0

	/** A verb plate: small caps, bronze keyline, its tone washing in on hover. */
	const verb = (
		label: string,
		sign: string,
		tone: 'error' | 'success',
		direction: 'decrease' | 'increase',
	) => (
		<Button
			variant="outlined"
			color={tone}
			size="small"
			onClick={() => apply(direction)}
			disabled={!armed}
			// The accessible name has to stay stable and verbal, because the visible
			// label goes numeric once armed (see below) — "− 5" alone would announce
			// as a bare number with no indication of which direction it applies.
			aria-label={armed ? `${label} ${amount}` : label}
			sx={{
				flex: 1,
				// A fixed single-line height: the plate must not change size when the
				// armed amount changes, or every tap on a stone nudges the layout.
				py: 0.6,
				minHeight: '2.1rem',
				whiteSpace: 'nowrap',
				borderRadius: 0.5,
				fontFamily: 'var(--nexus-font-ui)',
				fontWeight: 700,
				fontSize: 'var(--nexus-text-xs)',
				fontVariant: 'small-caps',
				letterSpacing: '0.04em',
				borderColor: 'color-mix(in srgb, var(--nexus-bronze) 45%, transparent)',
				'&:hover': {
					borderColor: `${tone}.main`,
					bgcolor: (theme) => alpha(theme.palette[tone].main, 0.1),
				},
				'&.Mui-disabled': {
					borderColor:
						'color-mix(in srgb, var(--nexus-bronze) 20%, transparent)',
				},
			}}
		>
			{/*
				Armed, the plate reads as the signed amount alone: `− 5`.

				It used to read `− Damage 5`, which is more explicit but did not fit half
				of a 21rem popover — it wrapped to two lines, so arming an amount
				resized both plates and shifted everything under them. Dropping the verb
				rather than shrinking the type is the right trade because the verb is
				still stated twice around it: by the group label above and by the plate's
				own red/green tone. The idle label keeps the word, since there is no
				amount to state and nothing to fit around.
			*/}
			{armed ? `${sign} ${amount}` : label}
		</Button>
	)

	return (
		<>
			<FieldGroupLabel sx={{ mb: 0.75 }}>
				{title ?? `${decreaseLabel} / ${increaseLabel}`}
			</FieldGroupLabel>

			{/* The tally: one-tap stones, then the free field for anything else. */}
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
				{quickAmounts.map((value) => {
					const selected = amount === value
					return (
						<Button
							key={value}
							size="small"
							onClick={() => setAmount(selected ? 0 : value)}
							aria-pressed={selected}
							aria-label={`Amount ${value}`}
							sx={{
								minWidth: 0,
								flex: 1,
								px: 0,
								py: 0.35,
								borderRadius: 0.5,
								fontFamily: 'var(--nexus-font-ui)',
								fontWeight: 700,
								fontSize: 'var(--nexus-text-xs)',
								color: selected ? 'primary.main' : 'text.secondary',
								border: '1px solid',
								// Selected is carried by a bronze keyline plus a wash, not by a
								// filled block: a solid fill at this size reads as a disabled
								// state next to the outlined verb plates below it.
								borderColor: selected
									? 'var(--nexus-bronze)'
									: 'color-mix(in srgb, var(--nexus-bronze) 22%, transparent)',
								bgcolor: selected
									? 'color-mix(in srgb, var(--nexus-bronze) 14%, transparent)'
									: 'transparent',
								'&:hover': {
									borderColor:
										'color-mix(in srgb, var(--nexus-bronze) 55%, transparent)',
									bgcolor:
										'color-mix(in srgb, var(--nexus-bronze) 8%, transparent)',
								},
							}}
						>
							{value}
						</Button>
					)
				})}
				{/* The free-entry field is one of the stones, not a taller box beside them:
					same flex share, same height, same radius (S5, owner review). It was
					`width: 3.25rem` with its own padding, so it stood a few pixels taller than
					the row it belongs to and broke the tally's line. */}
				<TextField
					type="number"
					size="small"
					value={amount}
					onChange={(event) => setAmount(Number(event.target.value))}
					inputProps={{
						min: 0,
						'aria-label': 'Amount',
						sx: { textAlign: 'center', py: 0, fontWeight: 700 },
					}}
					sx={{
						flex: 1,
						minWidth: 0,
						ml: 0.25,
						// `m: 0` is the fix, and it is the third time this exact trap has been
						// paid for in this milestone: `MuiTextField`'s sitewide `margin: 'dense'`
						// adds 8px above and 4px below for a stacked label this field does not
						// have, which sat it a few pixels below the row of stones it belongs to.
						m: 0,
						'& .MuiInputBase-root': { minHeight: '1.85rem', borderRadius: 0.5 },
					}}
				/>
			</Box>

			<Box sx={{ display: 'flex', alignItems: 'stretch', gap: 0.75 }}>
				{verb(decreaseLabel, '−', 'error', 'decrease')}
				{verb(increaseLabel, '+', 'success', 'increase')}
			</Box>
		</>
	)
}

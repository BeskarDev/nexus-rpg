import { Box, alpha } from '@mui/material'
import React from 'react'
import { getHpBarColor } from '@site/src/utils/typescript/getHpBarColor'
import { UI_COLORS } from '../../../../utils/colors'

export type HpBarProps = {
	current: number
	/** Effective max HP — already net of the fatigue penalty. */
	max: number
	temp: number
	/**
	 * Track thickness. The card wants a hairline meter under its numerals; the
	 * editor popover, where the pool is the subject rather than a detail, carries
	 * a heavier one.
	 */
	height?: string
}

/**
 * The HP meter (M13 S1). Fills whatever it is given — the HP card's footer, and
 * the HP editor popover.
 *
 * ## Why it is its own component
 *
 * It used to be inline in `HpCard`'s footer, capped at `maxWidth: 5.5rem` inside
 * a card that spans two of the register's four columns — so the single
 * most-watched value on the sheet had the *shortest* meter it could have been
 * given. A bar is read by proportion, and proportion needs length; at 5.5rem one
 * point of a 28 HP pool was under two pixels. It now fills the card's full width.
 *
 * Extracting it also let the editor popover drop its own separate meter: that was
 * a 44px `LinearProgress` slab with the current-HP input positioned on top, i.e.
 * a second visual language for the same quantity. Both surfaces now state the
 * pool the same way.
 *
 * A plate-spanning version was tried first and overshot — see the note on
 * `HpCard`'s `footer`.
 *
 * ## Why it takes props rather than reading the store
 *
 * `HpCard` derives effective max HP for its editor and `StatisticsTab` derives it
 * again for the fatigue clamp. A third derivation inside the meter is where the
 * three drift apart, so the caller owns the number.
 *
 * Purely presentational and unlabelled: the numerals beside it are the accessible
 * readout, so this is `aria-hidden` rather than a second announcement of the same
 * value.
 */
export const HpBar: React.FC<HpBarProps> = ({
	current,
	max,
	temp,
	// M13 S3.5: 5px is a hairline, not a gauge — this is the one thing on the
	// plate a player reads without focusing on it, from across a table, and it was
	// the thinnest element in the layout.
	height = '8px',
}) => {
	const pct = max > 0 ? Math.min(100, Math.max(0, (current / max) * 100)) : 0
	const tone = getHpBarColor(current, max)

	// Temp HP extends the pool rather than filling it, so the track is split by
	// the ratio of real max to real-plus-temp. Both segments then read on one
	// length, which is the whole reason for spanning the plate.
	const total = max + Math.max(0, temp)
	const mainShare = total > 0 ? (max / total) * 100 : 100

	return (
		<Box
			aria-hidden
			data-testid="hp-bar"
			sx={{
				display: 'flex',
				width: '100%',
				height,
				// An engraved trough rather than a raised bar: the recess is the codex
				// idiom for a channel cut into a surface, and it means the empty part of
				// the pool still reads as part of the plate.
				bgcolor: (theme) => alpha(theme.palette.text.primary, 0.09),
				borderRadius: '2px',
				overflow: 'hidden',
			}}
		>
			<Box
				data-testid="hp-bar-pool"
				sx={{ width: `${mainShare}%`, position: 'relative' }}
			>
				<Box
					data-testid="hp-bar-fill"
					sx={{
						position: 'absolute',
						inset: 0,
						width: `${pct}%`,
						bgcolor: tone,
						transition: 'width 0.3s ease-in-out, background-color 0.3s ease-in-out',
					}}
				/>
			</Box>
			{temp > 0 && (
				<Box
					data-testid="hp-bar-temp"
					sx={{
						width: `${100 - mainShare}%`,
						bgcolor: UI_COLORS.info,
						// A hairline so the temp segment reads as appended to the pool
						// rather than as more of it.
						borderLeft: (theme) =>
							`1px solid ${alpha(theme.palette.background.paper, 0.8)}`,
					}}
				/>
			)}
		</Box>
	)
}

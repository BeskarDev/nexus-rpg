import { Box, Checkbox } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
import type { StatSigilName } from '@site/src/components/codex/stat-sigils'
import React from 'react'

/**
 * A single sigil pip — the atom four different places on the sheet were drawing
 * by hand (M9 S11).
 *
 * PR E's law made every mark solid mass, which removed the hollow/filled pair a
 * checkbox normally uses for its two states. Colour carries state instead:
 * dimmed `text.disabled` for empty, the stat's own ink for filled. That
 * substitution is the thing all four copies shared, and getting it subtly
 * different in one of them is exactly the kind of drift this component exists to
 * prevent.
 *
 * The empty and filled marks may DIFFER — an unwounded attribute slot shows
 * `hp`'s intact vessel and a wounded one shows `wound`'s broken one, so the pair
 * reads as one vessel breaking. Where they are the same mark, pass only `sigil`.
 */
export interface SigilPipProps {
	/** The mark shown when the pip is filled. */
	sigil: StatSigilName
	/** The mark shown when empty. Defaults to `sigil` — pass it only for a pair. */
	emptySigil?: StatSigilName
	/** Ink for the filled state. Any CSS colour or MUI palette path. */
	tone: string
	filled: boolean
	onToggle: () => void
	disabled?: boolean
	/** Mark size. Pip rows run small; a lone toggle may be larger. */
	size?: number | string
	/** Accessible name — a pip is a control, so it needs one. */
	label?: string
	sx?: React.ComponentProps<typeof Checkbox>['sx']
}

export const SigilPip: React.FC<SigilPipProps> = ({
	sigil,
	emptySigil,
	tone,
	filled,
	onToggle,
	disabled,
	size = '0.85rem',
	label,
	sx,
}) => (
	<Checkbox
		size="small"
		inputProps={label ? { 'aria-label': label } : undefined}
		icon={
			<Box sx={{ display: 'flex', color: 'text.disabled', opacity: 0.55 }}>
				<StatSigil name={emptySigil ?? sigil} size={size} />
			</Box>
		}
		checkedIcon={
			<Box sx={{ display: 'flex', color: tone }}>
				<StatSigil name={sigil} size={size} />
			</Box>
		}
		checked={filled}
		disabled={disabled}
		onChange={onToggle}
		sx={{ p: 0.25, ...sx }}
	/>
)

export interface PipRowProps extends Omit<
	SigilPipProps,
	'filled' | 'onToggle' | 'label'
> {
	/** How many pips the row draws. */
	count: number
	/** How many are currently filled. */
	value: number
	onChange: (next: number) => void
	/** Names the resource, e.g. "Fatigue" — each pip gets "Fatigue 3 of 6". */
	label: string
	/**
	 * Wrap the pips onto a fixed grid of this many columns instead of one row.
	 *
	 * M13 S1. Fatigue's six pips in a single row were the widest thing in the
	 * live-resource register and forced the card past its column, while three
	 * short rows of counters sat beside it. A 3×2 block reads its count as
	 * quickly (two rows is still one glance) and gives the register back its
	 * measure. Omit for short rows — Resolve's three pips have nothing to gain.
	 */
	columns?: number
}

/**
 * A row of `count` pips, `value` of them filled.
 *
 * Clicking a pip fills up to it, or clears back to it: clicking the pip at index
 * `i` sets the value to `i` when it is already filled and `i + 1` when it is not.
 * Both Fatigue and Resolve had this rule written out inline and identically; PR F
 * made that deliberate ("two spendable resources that behave alike now look
 * alike"), so it belongs in one place rather than being re-derived per row.
 */
export const PipRow: React.FC<PipRowProps> = ({
	count,
	value,
	onChange,
	label,
	columns,
	...pip
}) => (
	<Box
		role="group"
		aria-label={label}
		sx={
			columns
				? {
						display: 'grid',
						// A fixed track count rather than `flexWrap`: wrapping breaks
						// wherever the container happens to end, so the same six pips
						// could read 4+2 at one width and 3+3 at another. The block
						// shape is the information here, so it is declared, not
						// inherited from the layout.
						gridTemplateColumns: `repeat(${columns}, max-content)`,
						justifyContent: 'center',
					}
				: { display: 'flex', flexDirection: 'row' }
		}
	>
		{Array.from({ length: count }).map((_, index) => (
			<SigilPip
				key={index}
				{...pip}
				filled={index < value}
				label={`${label} ${index + 1} of ${count}`}
				onToggle={() => onChange(index < value ? index : index + 1)}
			/>
		))}
	</Box>
)

import React from 'react'
import { Box, Tooltip } from '@mui/material'
import SigilIcon from '@site/src/components/codex/SigilIcon'

export interface RuleInfoProps {
	/** The rules clarification. Plain text, or nodes for anything richer. */
	children: React.ReactNode
	/** Accessible name, e.g. "About Parry". */
	label?: string
}

/**
 * A rules clarification hung on a small stylus mark.
 *
 * M9 S6. The original problem was never hover itself — it was that the tooltip
 * wrapped the WHOLE CARD, so dragging the pointer across the plate raised one
 * per tile, and cards with inner tooltips (pip rows, the wound slot) nested a
 * second inside the first and both opened.
 *
 * So the compromise: hover stays, but the target is the mark alone. Nothing
 * fires from crossing a card, and a deliberate hover over the stylus still costs
 * no click on desktop. `enterTouchDelay` keeps it reachable by tap on mobile,
 * where there is no hover to give.
 *
 * `stylus` is the sigil because the set already draws it as a reed stylus poised
 * over the wedge it has just impressed — a written note, which is what this is.
 */
export const RuleInfo: React.FC<RuleInfoProps> = ({ children, label }) => (
	<Tooltip
		title={children}
		arrow
		enterTouchDelay={0}
		leaveTouchDelay={6000}
		describeChild
	>
		<Box
			component="span"
			role="note"
			aria-label={label ?? 'Rules info'}
			// The mark is not a button: it opens nothing and changes nothing, so it
			// stays out of the tab order. Clicks are swallowed because in the defence
			// band the card body itself opens the stat's calculator.
			onClick={(event: React.MouseEvent) => event.stopPropagation()}
			sx={{
				display: 'inline-flex',
				alignItems: 'center',
				p: 0.25,
				opacity: 0.4,
				color: 'text.secondary',
				cursor: 'help',
				'&:hover': { opacity: 1 },
			}}
		>
			<SigilIcon name="stylus" size={10} />
		</Box>
	</Tooltip>
)

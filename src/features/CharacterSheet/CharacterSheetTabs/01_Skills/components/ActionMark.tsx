import React from 'react'
import { Box } from '@mui/material'
import { ActionType } from '@site/src/types/ActionType'

/**
 * What an ability costs to use, as a mark (M13 S8c, owner review).
 *
 * ## Why these are drawn here and not in `sigil-paths.ts`
 *
 * The sigil law is that **every mark in the set depicts an object**, which is why
 * `Chevron`, `GlossMark`, `CheckMark` and `MarkButton`'s `+`/`×` were all drawn
 * outside it: they name interactions, and the sign list has no depiction for one.
 * An action type is not an object either — it is a slice of a turn — so it takes
 * the same exemption rather than spending six of the F7 sigil budget on
 * abstractions that would have to survive a legibility pass at 13px.
 *
 * The alternative was reuse, and it fails the one test the `slot-*` marks pass. A
 * reused mark is legal when its reading is unambiguous IN PLACE, and slots only
 * ever appear beside their seven siblings. Action types do not: **Quick Ref shows
 * abilities beside weapons and spells**, so `bolt` (lightning damage) or
 * `spearhead` (physical damage) as a timing mark would sit in the same view as the
 * damage marks they already mean.
 *
 * ## The vocabulary
 *
 * Wedges, bars and lozenges — the shapes this theme already carves. Flat fills,
 * hard vertices, `currentColor`, no depth. The reading is a cost:
 *
 * | Type | Mark | Why |
 * |---|---|---|
 * | Action | solid play arrow | the most pre-learned "do this" sign there is |
 * | Quick Action | chunky bolt | speed, and MUI's own reading of it |
 * | Triggered | four-point spark | something happened and this fires |
 * | Free | two joined lozenges | an infinity: always there, costing nothing |
 * | Passive | square ring | in force, unspent, unchanging |
 * | Other | a small lozenge | no claim about timing |
 *
 * Modelled on the Material set the Quick Ref section still used, because the
 * owner was right that it read faster than the first cut here (a full wedge, a
 * half wedge, a wedge striking a bar — three variations on one silhouette, which
 * is precisely how not to build a set that must be told apart at a glance).
 *
 * One correction to Material rather than a copy of it: **`Bolt` and `FlashOn` are
 * the same silhouette** doing Quick Action and Triggered, which is the one place
 * that set is genuinely ambiguous. A spark is not a bolt.
 *
 * The bolt is also drawn deliberately CHUNKY, unlike the thin diagonal `bolt`
 * sigil the lightning damage type carries — Quick Ref shows abilities beside
 * weapons and spells, so the two can appear in one view and must not be read as
 * one mark.
 *
 * ## Accessibility
 *
 * The column heading over these is deliberately blank, so unlike every other mark
 * on this sheet the glyph IS the only carrier — which the theme forbids. It
 * therefore takes `role="img"` with the type as its accessible name, and the cell
 * below the ledger breakpoint still prints the words.
 */

const GLYPHS: Record<ActionType, React.ReactNode> = {
	// ▶ — the play arrow, the most pre-learned "do this" sign there is. Solid and
	// wide so it holds at 13px.
	Action: <path d="M3.5 1.5 L12.5 7.5 L3.5 13.5 Z" fill="currentColor" />,
	// ⚡ — a bolt, MUI's own reading of "quick" and the right one. Drawn CHUNKY
	// rather than as the thin diagonal `bolt` sigil the lightning damage type
	// uses: both can appear in Quick Ref, and the two must not be read as one.
	'Quick Action': (
		<path
			d="M8.5 0.5 L2.5 8 L6 8 L5 14.5 L11.5 6.5 L7.5 6.5 Z"
			fill="currentColor"
		/>
	),
	// A four-point spark — something happened and this fires. MUI uses a second
	// bolt here, which is the one place its set is genuinely unclear: `Bolt` and
	// `FlashOn` are the same silhouette doing two jobs. A spark is not a bolt.
	Triggered: (
		<path
			d="M7 0.5 L8.7 5.3 L13.5 7 L8.7 8.7 L7 13.5 L5.3 8.7 L0.5 7 L5.3 5.3 Z"
			fill="currentColor"
		/>
	),
	// ∞ — always available, costing nothing. Two hard lozenges sharing a vertex:
	// a drawn infinity of two circles turns to mud at this size.
	Free: (
		<path
			d="M3.75 3.5 L7 7 L3.75 10.5 L0.5 7 Z M10.25 3.5 L13.5 7 L10.25 10.5 L7 7 Z"
			fill="currentColor"
		/>
	),
	// ○ — in force, unspent, unchanging. A square ring rather than a circle,
	// because this theme's corners are hard everywhere else.
	Passive: (
		<path
			d="M1.5 1.5 H12.5 V12.5 H1.5 Z M4 4 V10 H10 V4 Z"
			fill="currentColor"
			fillRule="evenodd"
		/>
	),
	// No claim about timing.
	Other: <path d="M7 4.5 L9.5 7 L7 9.5 L4.5 7 Z" fill="currentColor" />,
}

export interface ActionMarkProps {
	actionType: ActionType
}

export const ActionMark: React.FC<ActionMarkProps> = ({ actionType }) => (
	<Box
		sx={{
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			minWidth: 0,
			color: 'var(--nexus-bronze)',
		}}
	>
		{/* The words, for a wrapped row below the breakpoint where the mark has no
			column heading and no siblings to be read against. */}
		<span className="cs-cell-label">{actionType}</span>
		<Box
			component="svg"
			role="img"
			aria-label={actionType}
			viewBox="0 0 14 15"
			sx={{ width: 13, height: 14, flexShrink: 0 }}
		>
			{GLYPHS[actionType] ?? GLYPHS.Other}
		</Box>
	</Box>
)

/**
 * The mark alone, for a menu row or a section header.
 *
 * `ActionMark` carries the below-the-breakpoint word label and the column's
 * centring, which a menu item does not want — there the words are right beside it
 * already, and repeating them is the duplication S8 removed from the search
 * dialogs' checkbox rows.
 */
export const ActionGlyph: React.FC<{
	actionType: ActionType
	size?: number
}> = ({ actionType, size = 13 }) => (
	<Box
		component="svg"
		aria-hidden="true"
		viewBox="0 0 14 15"
		sx={{
			width: size,
			height: size,
			flexShrink: 0,
			color: 'var(--nexus-bronze)',
		}}
	>
		{GLYPHS[actionType] ?? GLYPHS.Other}
	</Box>
)

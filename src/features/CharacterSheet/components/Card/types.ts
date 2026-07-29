import { SxProps, Theme } from '@mui/material'
import React from 'react'

export interface CardHeaderProps {
	/** Icon element (MUI icon component) */
	icon?: React.ReactNode

	/** Label text */
	label: string

	/** Theme color for icon and label */
	color?: string

	/** Additional sx props */
	sx?: SxProps<Theme>

	/** Test ID */
	'data-testid'?: string
}

export interface CardContentProps {
	/** Display value */
	value: string | number | React.ReactNode

	/** Additional sx props */
	sx?: SxProps<Theme>

	/** Text color (for status indicators) */
	color?: string

	/** Test ID */
	'data-testid'?: string
}

/**
 * How much visual weight a card carries (M9 S6).
 *
 * F3's complaint was that eleven tiles all rendered as the same box — same
 * keyline, same fill, same radius — which is the web-app-dashboard tell. Weight
 * is the axis that fixes it, and it is deliberately tied to how often a value is
 * touched during play rather than to taste:
 *
 * - `tile` — the default and the loudest: a keyline, a wash and rivets. For the
 *   values that change constantly mid-combat (HP, Fatigue).
 * - `column` — no frame of its own, because it sits inside a shared plate that
 *   supplies the single frame for the group. For the attribute row.
 * - `band` — no frame, no wash, tighter padding: a value read often but edited
 *   almost never (AV, Parry, Dodge, Resist).
 */
export type CardWeight = 'tile' | 'column' | 'band'

export interface CharacterSheetCardProps {
	/** Content for the header section (typically icon + label) */
	header?: React.ReactNode

	/** Visual weight. Defaults to `tile` — every pre-S6 usage is unaffected. */
	weight?: CardWeight

	/** Main content area - can be any React component */
	children: React.ReactNode

	/** Optional footer content below main area */
	footer?: React.ReactNode

	/**
	 * A rules clarification, shown in a popover when the stylus mark is clicked.
	 *
	 * Only for text that actually explains a RULE — a formula, a threshold, a
	 * consequence. Text that merely restates the card's own label earns no icon;
	 * those were deleted in M9 S6 rather than converted, because an icon per card
	 * is the same noise the hover tooltips were.
	 */
	info?: React.ReactNode

	/** Accessible name for the info mark, e.g. "About Parry". */
	infoLabel?: string

	/**
	 * Accessible name for the card when it acts as its own edit trigger.
	 *
	 * Required in practice wherever `onConfigClick` is set: without it the
	 * trigger's accessible name is computed from the card's entire contents, so a
	 * screen reader announces "button, HP 25 / 28 minus plus" instead of
	 * "Edit HP". A test caught this by matching the card and its own inner button
	 * under the same name.
	 */
	editLabel?: string

	/** Optional config menu element (typically a Menu component) */
	configMenu?: React.ReactNode

	/** Callback when config button is clicked */
	onConfigClick?: (event: React.MouseEvent<HTMLElement>) => void

	/** Minimum width of the card */
	minWidth?: string | number

	/** Maximum width of the card */
	maxWidth?: string | number

	/** Additional sx props for the container */
	sx?: SxProps<Theme>

	/** Custom border color (when highlighted, errored, etc.) */
	borderColor?: string

	/**
	 * Adopt the codex kit's cartouche keystone + corner rails (M9 S3). Off by
	 * default — opt in only where the surrounding layout has ~16px of gap
	 * above the card for the keystone's overhang (see CharacterSheetCard).
	 */
	frame?: boolean

	/** Test ID for testing purposes */
	'data-testid'?: string
}

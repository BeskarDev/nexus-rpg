import { SxProps, Theme } from '@mui/material'
import React from 'react'
import type { SheetSigilName, StatSigilName } from '@site/src/components/codex/stat-sigils'
import type { CardWeight } from '../Card/types'

/**
 * Named widths (M9 S11).
 *
 * The sheet had **12 distinct `minWidth` strings across 25 call sites**, which is
 * what a raw `minWidth: string` prop produces: twelve values expressing about four
 * intents. These are those intents.
 *
 * Outliers keep explicit `minWidth`/`maxWidth`, which still override — a named
 * size is the common case, not a straitjacket. Sizes were chosen to MATCH the
 * dominant existing value in each cluster rather than to average it, so adopting
 * one is a no-op at the call sites that fit and an explicit override at the rest.
 * PR H is behaviour-preserving; nothing here may resize a card by a few pixels as
 * a side effect of tidying.
 */
export type SheetFieldSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export const SHEET_FIELD_SIZE: Record<
	SheetFieldSize,
	{ minWidth: string; maxWidth?: string }
> = {
	/** Attribute columns and AV — the narrowest tiles on the sheet. */
	xs: { minWidth: '3.5rem', maxWidth: '5rem' },
	/** Defences, Resolve, Fatigue. */
	sm: { minWidth: '5rem' },
	/** HP and the other gauges. */
	md: { minWidth: '7rem' },
	/** The identity cards: Folk, Upbringing, Background, Motivation. */
	lg: { minWidth: '8rem', maxWidth: '12rem' },
	/** Long free text: Specializations, Description. */
	xl: { minWidth: '16rem' },
}

export interface SheetFieldProps {
	// ---- Identity -----------------------------------------------------------

	/** The mark for this field. Resolved through `stat-sigils.ts`. */
	sigil?: StatSigilName | SheetSigilName
	/** Small-caps label. Also seeds the accessible names for edit and gloss. */
	label: string
	/** Ink for the sigil and label — the field's identity hue. */
	tone?: string

	// ---- Presentation -------------------------------------------------------

	/** Named width. Explicit `minWidth`/`maxWidth` still win. */
	size?: SheetFieldSize
	/** How much box the field draws. See `CardWeight`. */
	weight?: CardWeight
	minWidth?: string | number
	maxWidth?: string | number
	/** State colour — wounded, overloaded. Information, never decoration. */
	borderColor?: string
	/** Adopt the cartouche keystone + corner rails. Needs ~16px clearance above. */
	frame?: boolean
	sx?: SxProps<Theme>

	// ---- Gloss --------------------------------------------------------------

	/**
	 * A rules clarification — a formula, a threshold, a consequence. Never text
	 * that merely restates the label; PR F deleted 17 of those rather than
	 * converting them.
	 */
	info?: React.ReactNode
	/** Accessible name for the gloss mark. Defaults to `About {label}`. */
	infoLabel?: string

	// ---- Value and editing --------------------------------------------------

	/** The read state, rendered through the shared value typography. */
	value?: React.ReactNode
	/** Custom read state. Wins over `value` when both are given. */
	children?: React.ReactNode
	/** Meter, pips or a note under the value. */
	footer?: React.ReactNode

	/**
	 * The editor's **contents** — not a `<Menu>`.
	 *
	 * This is the prop that pays for the component. Twelve files used to declare
	 * `const [anchorEl, setAnchorEl] = useState(null)` plus `open`, `handleClick`
	 * and `handleClose`, build a whole `<Menu>`, and hand it back alongside the
	 * click handler — after which `CharacterSheetCard` `cloneElement`d it to
	 * re-attach `onClose`. `SheetField` owns the anchor, the open state and the
	 * close, so a call site supplies only what goes inside.
	 *
	 * Pass a function to receive `close`, for editors with their own done button.
	 */
	editor?: React.ReactNode | ((close: () => void) => React.ReactNode)
	/** Max width of the editor popover. */
	editorWidth?: string
	/** Accessible name for the edit trigger. Defaults to `Edit {label}`. */
	editLabel?: string

	/**
	 * Runs when the field is activated, before the editor opens.
	 *
	 * Exists for the defence cards, whose FIRST activation migrates the legacy
	 * flat value into the detailed structure instead of opening anything. Those
	 * pass `onEditOpen={initializeDetails}` with no `editor`; the field is still a
	 * keyboard-reachable trigger, it just has nothing to show yet.
	 */
	onEditOpen?: () => void
	/** Runs after the editor closes — for resetting transient editor state. */
	onEditClose?: () => void

	'data-testid'?: string
}

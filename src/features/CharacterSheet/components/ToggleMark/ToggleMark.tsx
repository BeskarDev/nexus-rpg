import React from 'react'
import {
	CheckMarkChecked,
	CheckMarkEmpty,
} from '@site/src/components/codex/CheckMark'

export interface ToggleMarkProps {
	checked: boolean
	onChange: (checked: boolean) => void
	/** The switch's name — the words are part of the control, not a label beside it. */
	children: React.ReactNode
	title?: string
}

/**
 * A labelled either/or switch, as a plate that fills when pressed (M13 S5).
 *
 * It was written inline in `DamageEquation` for `static`, then written again in
 * `SpellDetails` for `deals damage` — the second one borrowed the first's CSS class,
 * which is the copy that drifts. One component now, and both callers are one line.
 *
 * Why a `button` with `aria-pressed` rather than a checkbox: these are not items being
 * selected from a set, they are a mode the panel beside them is computed in. A plate
 * that fills is also the sheet's existing idiom for a control that is *also a state* —
 * the reorder toggle and the quick-ref mark do the same thing. It carries the app's
 * checkbox mark so the on/off reading is the one the category menus already teach.
 */
export const ToggleMark: React.FC<ToggleMarkProps> = ({
	checked,
	onChange,
	children,
	title,
}) => (
	<button
		type="button"
		className="cs-toggle-mark"
		aria-pressed={checked}
		title={title}
		onClick={() => onChange(!checked)}
	>
		{checked ? <CheckMarkChecked size={14} /> : <CheckMarkEmpty size={14} />}
		{children}
	</button>
)

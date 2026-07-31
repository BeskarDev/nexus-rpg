import React from 'react'
import { ListSubheader, Menu, MenuItem } from '@mui/material'
import {
	CheckMarkChecked,
	CheckMarkEmpty,
} from '@site/src/components/codex/CheckMark'

/**
 * A menu opened from a control strip, and the toggle row that goes in it
 * (M13 S4d).
 *
 * The Items tab's category menu was the first one rebuilt for the codex theme, and
 * everything that made it right was general: the panel's keyline, the row's UI
 * face, the caption's register, the drawn mark. Those went to the MUI theme
 * (`MuiMenu`, `MuiMenuItem`, `MuiListSubheader`, `MuiCheckbox`) so every menu in
 * the app gets them without asking.
 *
 * What could NOT go to the theme is structure: which anchor corner a menu grows
 * from, that it opens with a caption, and that a toggle row is one control rather
 * than a checkbox nested in a row. That is this file. Between the two, a feature
 * that needs a menu of switches writes no styling at all.
 */
export interface SheetMenuProps {
	anchorEl: HTMLElement | null
	onClose: () => void
	/**
	 * The small-caps line that says what the rows are for.
	 *
	 * A menu that opens as a bare list makes the reader infer the question from the
	 * answers. Optional, but a menu of toggles should have one.
	 */
	caption?: string
	/** Minimum panel width, so the rows do not size to their longest label. */
	minWidth?: string
	children: React.ReactNode
}

/**
 * Grows from the anchor's bottom-left corner — the control strip is at the top
 * right of a section, and a menu dropping right would leave the viewport.
 */
export const SheetMenu: React.FC<SheetMenuProps> = ({
	anchorEl,
	onClose,
	caption,
	minWidth = '13rem',
	children,
}) => (
	<Menu
		anchorEl={anchorEl}
		open={Boolean(anchorEl)}
		onClose={onClose}
		transformOrigin={{ horizontal: 'left', vertical: 'top' }}
		anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
		MenuListProps={{
			dense: true,
			subheader: caption ? (
				<ListSubheader disableSticky>{caption}</ListSubheader>
			) : undefined,
			sx: { minWidth },
		}}
	>
		{children}
	</Menu>
)

export interface ToggleMenuItemProps {
	checked: boolean
	onToggle: () => void
	children: React.ReactNode
}

/**
 * A menu row that IS a switch.
 *
 * It was a `FormControlLabel` (checkbox plus label) nested inside a `MenuItem`:
 * two overlapping hit targets for one decision, announcing as "menu item,
 * containing a checkbox". This is one `menuitemcheckbox` carrying its own
 * `aria-checked`, with a DRAWN mark inside it rather than an interactive
 * `Checkbox` — nothing nested, one hit target the full width of the panel, and
 * click and Enter both toggle.
 *
 * The mark's ink comes from the theme, off this row's `aria-checked`, so no call
 * site decides what a set inlay looks like.
 */
export const ToggleMenuItem: React.FC<ToggleMenuItemProps> = ({
	checked,
	onToggle,
	children,
}) => (
	<MenuItem
		dense
		role="menuitemcheckbox"
		aria-checked={checked}
		onClick={onToggle}
	>
		{checked ? <CheckMarkChecked /> : <CheckMarkEmpty />}
		{children}
	</MenuItem>
)

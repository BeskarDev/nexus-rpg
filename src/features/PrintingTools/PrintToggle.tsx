import React from 'react'
import {
	CheckMarkChecked,
	CheckMarkEmpty,
} from '@site/src/components/codex/CheckMark'

export interface PrintToggleProps {
	checked: boolean
	onChange: (checked: boolean) => void
	label: React.ReactNode
	/** What the toggle costs, in the count line's voice. */
	note?: React.ReactNode
	className?: string
}

/**
 * The print tools' one checkbox (M22 S2).
 *
 * The markup — hidden input, `CheckMark` socket, small-caps text, optional note
 * — is the pattern the ability deck established and the theme's answer to MUI's
 * `Switch`, whose sliding pill is exactly the radius and colour mass
 * `CheckMark` was drawn to take out of this site. Print Everything needs a dozen
 * of them (a party's worth of characters, then the categories), so it is a
 * component rather than a dozen copies.
 */
export const PrintToggle: React.FC<PrintToggleProps> = ({
	checked,
	onChange,
	label,
	note,
	className,
}) => (
	<label className={`pt-toggle${className ? ` ${className}` : ''}`}>
		<input
			type="checkbox"
			className="pt-toggle__input"
			checked={checked}
			onChange={(event) => onChange(event.target.checked)}
		/>
		<span className="pt-toggle__mark">
			{checked ? <CheckMarkChecked /> : <CheckMarkEmpty />}
		</span>
		<span className="pt-toggle__text">
			{label}
			{note && <span className="pt-toggle__note">{note}</span>}
		</span>
	</label>
)

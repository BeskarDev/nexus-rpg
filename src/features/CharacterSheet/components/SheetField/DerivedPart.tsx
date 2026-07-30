import { TextFieldProps } from '@mui/material'
import React from 'react'
import { SheetInput } from './SheetInput'

export type DerivedPartProps = Omit<
	TextFieldProps,
	'value' | 'onChange' | 'type' | 'size'
> & {
	value: number
	/**
	 * Marks the part as machine-derived: shown, but not editable.
	 *
	 * The defence and AV calculators each mix parts the rules compute (base, level
	 * bonus, an equipped shield) with parts the player sets (other, a manual
	 * override). Every one of them expressed "derived" as a bare `disabled`, which
	 * says *why not* nothing — this names the reason, and keeps the two kinds of
	 * part visually consistent across all four calculators.
	 */
	auto?: boolean
	onChange?: (value: number) => void
}

/**
 * One named part of a derived value — a `SheetInput` preset (M9 S11).
 *
 * The parts calculators behind Parry, Dodge, Resist and AV were built from the
 * raw field repeated 3–5 times per menu, each re-doing the
 * `Number(event.target.value)` unwrap at the call site. This is that field with
 * the unwrap done once and the auto/manual distinction named.
 */
export const DerivedPart: React.FC<DerivedPartProps> = ({
	value,
	auto = false,
	onChange,
	...textFieldProps
}) => (
	<SheetInput
		{...textFieldProps}
		type="number"
		size="small"
		disabled={auto || !onChange}
		value={value}
		onChange={onChange ? (event) => onChange(Number(event.target.value)) : undefined}
	/>
)

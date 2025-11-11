import { TextField, TextFieldProps } from '@mui/material'
import React from 'react'

export type PersonalFieldProps = Omit<
	TextFieldProps,
	'onChange' | 'onBlur' | 'value'
> & {
	value: string
	onValueChange: (value: string) => void
	onBlur?: () => void
}

/**
 * Reusable form field component for personal character information.
 * Handles the common pattern of controlled input with onBlur updates.
 */
export const PersonalField: React.FC<PersonalFieldProps> = ({
	value,
	onValueChange,
	onBlur,
	variant = 'standard',
	...textFieldProps
}) => {
	return (
		<TextField
			{...textFieldProps}
			variant={variant}
			value={value}
			onChange={(event) => onValueChange(event.target.value)}
			onBlur={onBlur}
		/>
	)
}

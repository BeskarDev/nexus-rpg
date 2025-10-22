import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import { TextFieldProps } from '@mui/material'

/**
 * Helper function to get MUI TextField validation props from react-hook-form registration
 * 
 * @param registration - The return value from useForm's register() function
 * @param error - The field error from react-hook-form's formState.errors
 * @returns Props to spread onto MUI TextField components
 * 
 * @example
 * ```tsx
 * const { register, formState: { errors } } = useForm()
 * 
 * <TextField
 *   {...getTextFieldProps(register('name'), errors.name)}
 *   label="Name"
 * />
 * ```
 */
export function getTextFieldProps(
	registration: UseFormRegisterReturn,
	error?: FieldError,
): Pick<TextFieldProps, 'name' | 'onChange' | 'onBlur' | 'inputRef' | 'error' | 'helperText'> {
	return {
		name: registration.name,
		onChange: registration.onChange,
		onBlur: registration.onBlur,
		inputRef: registration.ref,
		error: !!error,
		helperText: error?.message,
	}
}

/**
 * Helper function to get MUI Select validation props from react-hook-form registration
 * Similar to getTextFieldProps but optimized for Select components
 * 
 * @param registration - The return value from useForm's register() function
 * @param error - The field error from react-hook-form's formState.errors
 * @returns Props to spread onto MUI Select components
 * 
 * @example
 * ```tsx
 * const { register, formState: { errors } } = useForm()
 * 
 * <TextField
 *   select
 *   {...getSelectProps(register('folk'), errors.folk)}
 *   label="Folk"
 * >
 *   {options.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>)}
 * </TextField>
 * ```
 */
export function getSelectProps(
	registration: UseFormRegisterReturn,
	error?: FieldError,
): Pick<TextFieldProps, 'name' | 'onChange' | 'onBlur' | 'inputRef' | 'error' | 'helperText'> {
	return getTextFieldProps(registration, error)
}

/**
 * Common validation rules for character sheet fields
 */
export const validationRules = {
	/**
	 * Required field validation
	 */
	required: (fieldName?: string) => ({
		required: fieldName ? `${fieldName} is required` : 'This field is required',
	}),

	/**
	 * Number range validation
	 */
	numberRange: (min: number, max: number, fieldName?: string) => ({
		min: {
			value: min,
			message: fieldName
				? `${fieldName} must be at least ${min}`
				: `Value must be at least ${min}`,
		},
		max: {
			value: max,
			message: fieldName
				? `${fieldName} must be at most ${max}`
				: `Value must be at most ${max}`,
		},
	}),

	/**
	 * String length validation
	 */
	stringLength: (minLength?: number, maxLength?: number, fieldName?: string) => {
		const rules: any = {}

		if (minLength !== undefined) {
			rules.minLength = {
				value: minLength,
				message: fieldName
					? `${fieldName} must be at least ${minLength} characters`
					: `Must be at least ${minLength} characters`,
			}
		}

		if (maxLength !== undefined) {
			rules.maxLength = {
				value: maxLength,
				message: fieldName
					? `${fieldName} must be at most ${maxLength} characters`
					: `Must be at most ${maxLength} characters`,
			}
		}

		return rules
	},

	/**
	 * Pattern validation for specific formats
	 */
	pattern: (regex: RegExp, message: string) => ({
		pattern: {
			value: regex,
			message,
		},
	}),

	/**
	 * Combine multiple validation rules
	 */
	combine: (...rules: any[]) => {
		return rules.reduce((acc, rule) => ({ ...acc, ...rule }), {})
	},
}

/**
 * Type guard to check if a value is a valid number
 */
export function isValidNumber(value: any): boolean {
	return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

/**
 * Parse string input to number with validation
 */
export function parseNumber(
	value: string | number,
	defaultValue: number = 0,
): number {
	if (typeof value === 'number') {
		return isValidNumber(value) ? value : defaultValue
	}

	const parsed = Number(value)
	return isValidNumber(parsed) ? parsed : defaultValue
}

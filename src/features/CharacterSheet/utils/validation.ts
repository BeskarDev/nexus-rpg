/**
 * Validation utilities for character sheet form inputs using react-hook-form.
 * 
 * These utilities provide helper functions to integrate react-hook-form validation
 * with Material-UI components (TextField, Select, etc.) without introducing wrapper components.
 */

import { FieldError, UseFormRegisterReturn } from 'react-hook-form'

/**
 * Common validation rules for character sheet fields
 */
export const validationRules = {
	/** Required field validation */
	required: {
		value: true,
		message: 'This field is required',
	},
	
	/** Name field validation (1-50 characters) */
	name: {
		required: 'Name is required',
		minLength: {
			value: 1,
			message: 'Name must be at least 1 character',
		},
		maxLength: {
			value: 50,
			message: 'Name must not exceed 50 characters',
		},
	},
	
	/** Short text field validation (max 100 characters) */
	shortText: {
		maxLength: {
			value: 100,
			message: 'Must not exceed 100 characters',
		},
	},
	
	/** Positive integer validation */
	positiveInteger: {
		min: {
			value: 0,
			message: 'Must be 0 or greater',
		},
		validate: (value: any) => {
			if (value === '' || value === null || value === undefined) return true
			const num = Number(value)
			return Number.isInteger(num) || 'Must be a whole number'
		},
	},
	
	/** HP field validation */
	hp: {
		min: {
			value: 0,
			message: 'HP cannot be negative',
		},
		validate: (value: any) => {
			const num = Number(value)
			return !isNaN(num) || 'Must be a valid number'
		},
	},
	
	/** Age validation (0-500 years, allowing ancient characters) */
	age: {
		maxLength: {
			value: 20,
			message: 'Age text is too long',
		},
	},
	
	/** Height/Weight validation (free text for flexibility) */
	physicalMeasurement: {
		maxLength: {
			value: 30,
			message: 'Must not exceed 30 characters',
		},
	},
	
	/** Description field validation */
	description: {
		maxLength: {
			value: 1000,
			message: 'Description must not exceed 1000 characters',
		},
	},
	
	/** Notes field validation */
	notes: {
		maxLength: {
			value: 5000,
			message: 'Notes must not exceed 5000 characters',
		},
	},
}

/**
 * Get validation props for a Material-UI TextField component.
 * This merges react-hook-form registration with MUI's error display props.
 * 
 * @param registration - The return value from useForm's register() function
 * @param error - The field error from useForm's formState.errors
 * @returns Props object to spread onto a TextField component
 * 
 * @example
 * const { register, formState: { errors } } = useForm()
 * 
 * <TextField
 *   {...getTextFieldProps(register('name'), errors.name)}
 *   label="Name"
 * />
 */
export function getTextFieldProps(
	registration: UseFormRegisterReturn,
	error?: FieldError
) {
	return {
		...registration,
		error: !!error,
		helperText: error?.message || '',
	}
}

/**
 * Get validation props for a Material-UI Select component.
 * Select components need slightly different handling than TextField.
 * 
 * @param registration - The return value from useForm's register() function
 * @param error - The field error from useForm's formState.errors
 * @returns Props object to spread onto a Select component
 * 
 * @example
 * const { register, formState: { errors } } = useForm()
 * 
 * <Select
 *   {...getSelectProps(register('location'), errors.location)}
 *   label="Location"
 * >
 *   <MenuItem value="carried">Carried</MenuItem>
 * </Select>
 */
export function getSelectProps(
	registration: UseFormRegisterReturn,
	error?: FieldError
) {
	return {
		...registration,
		error: !!error,
		// Note: Select doesn't support helperText directly, 
		// use FormHelperText component if needed
	}
}

/**
 * Get validation props for numeric input fields.
 * Combines TextField props with number-specific validation.
 * 
 * @param registration - The return value from useForm's register() function
 * @param error - The field error from useForm's formState.errors
 * @returns Props object to spread onto a TextField with type="number"
 * 
 * @example
 * const { register, formState: { errors } } = useForm()
 * 
 * <TextField
 *   {...getNumberFieldProps(register('hp'), errors.hp)}
 *   label="HP"
 *   type="number"
 * />
 */
export function getNumberFieldProps(
	registration: UseFormRegisterReturn,
	error?: FieldError
) {
	return {
		...registration,
		error: !!error,
		helperText: error?.message || '',
		inputProps: {
			...registration,
			step: 1,
		},
	}
}

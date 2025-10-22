/**
 * Validation utilities for character sheet form inputs using react-hook-form and Yup.
 * 
 * These utilities provide helper functions to integrate react-hook-form validation
 * with Material-UI components (TextField, Select, etc.) without introducing wrapper components.
 */

import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import * as yup from 'yup'

/**
 * Personal Tab Validation Schema
 * 
 * Validates all fields in the Personal tab including:
 * - Character name, folk, upbringing, background, motivation
 * - Physical attributes (height, weight, age)
 * - Description and notes
 */
export const personalTabSchema = yup.object({
	name: yup
		.string()
		.required('Name is required')
		.min(1, 'Name must be at least 1 character')
		.max(50, 'Name must not exceed 50 characters'),
	
	folk: yup
		.string()
		.max(100, 'Must not exceed 100 characters'),
	
	upbringing: yup
		.string()
		.max(100, 'Must not exceed 100 characters'),
	
	background: yup
		.string()
		.max(100, 'Must not exceed 100 characters'),
	
	motivation: yup
		.string()
		.max(100, 'Must not exceed 100 characters'),
	
	height: yup
		.string()
		.max(30, 'Must not exceed 30 characters'),
	
	weight: yup
		.string()
		.max(30, 'Must not exceed 30 characters'),
	
	age: yup
		.string()
		.max(20, 'Age text is too long'),
	
	description: yup
		.string()
		.max(1000, 'Description must not exceed 1000 characters'),
	
	notes: yup
		.string()
		.max(5000, 'Notes must not exceed 5000 characters'),
})

/**
 * HP Field Validation Schema
 * 
 * Validates HP-related fields in the Statistics tab.
 * Note: Max HP validation is dynamic and should be added at runtime.
 */
export const hpFieldSchema = yup.object({
	currentHp: yup
		.number()
		.min(0, 'HP cannot be negative')
		.required('Current HP is required')
		.typeError('Must be a valid number'),
	
	tempHp: yup
		.number()
		.min(0, 'Temp HP cannot be negative')
		.required('Temp HP is required')
		.typeError('Must be a valid number'),
	
	maxHpModifier: yup
		.number()
		.required('Max HP Modifier is required')
		.typeError('Must be a valid number'),
})

/**
 * Create HP field schema with dynamic max HP validation
 * 
 * @param maxHp - The maximum HP value for validation
 * @returns Yup schema with dynamic max validation
 */
export const createHpFieldSchema = (maxHp: number) => {
	return yup.object({
		currentHp: yup
			.number()
			.min(0, 'HP cannot be negative')
			.max(maxHp, `Cannot exceed max HP (${maxHp})`)
			.required('Current HP is required')
			.typeError('Must be a valid number'),
		
		tempHp: yup
			.number()
			.min(0, 'Temp HP cannot be negative')
			.required('Temp HP is required')
			.typeError('Must be a valid number'),
		
		maxHpModifier: yup
			.number()
			.required('Max HP Modifier is required')
			.typeError('Must be a valid number'),
	})
}

/**
 * Infer TypeScript types from schemas
 */
export type PersonalTabFormData = yup.InferType<typeof personalTabSchema>
export type HpFieldFormData = yup.InferType<typeof hpFieldSchema>

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

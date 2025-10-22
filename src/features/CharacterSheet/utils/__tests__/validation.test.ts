import { describe, it, expect } from 'vitest'
import { getTextFieldProps, getNumberFieldProps, getSelectProps, validationRules } from '../validation'
import { FieldError } from 'react-hook-form'

describe('validation utilities', () => {
	describe('validationRules', () => {
		it('should have required rule', () => {
			expect(validationRules.required).toEqual({
				value: true,
				message: 'This field is required',
			})
		})

		it('should have name validation rules', () => {
			expect(validationRules.name.required).toBe('Name is required')
			expect(validationRules.name.minLength).toEqual({
				value: 1,
				message: 'Name must be at least 1 character',
			})
			expect(validationRules.name.maxLength).toEqual({
				value: 50,
				message: 'Name must not exceed 50 characters',
			})
		})

		it('should have positive integer validation', () => {
			const validate = validationRules.positiveInteger.validate
			expect(validate).toBeDefined()
			
			// Test with valid values
			expect(validate!(0)).toBe(true)
			expect(validate!(5)).toBe(true)
			expect(validate!(100)).toBe(true)
			expect(validate!('')).toBe(true)
			expect(validate!(null)).toBe(true)
			expect(validate!(undefined)).toBe(true)
			// -5 is an integer, so validate returns true (min rule will catch negativity)
			expect(validate!(-5)).toBe(true)
			
			// Test with invalid values (non-integers)
			expect(validate!(3.14)).toBe('Must be a whole number')
		})

		it('should have HP validation', () => {
			const validate = validationRules.hp.validate
			expect(validate).toBeDefined()
			
			// Test with valid values
			expect(validate!(0)).toBe(true)
			expect(validate!(10)).toBe(true)
			expect(validate!(100.5)).toBe(true)
			
			// Test with invalid values
			expect(validate!('abc')).toBe('Must be a valid number')
			expect(validate!(NaN)).toBe('Must be a valid number')
		})
	})

	describe('getTextFieldProps', () => {
		it('should return props without error when no error provided', () => {
			const registration = {
				name: 'testField',
				onChange: () => {},
				onBlur: () => {},
				ref: () => {},
			}

			const props = getTextFieldProps(registration)

			expect(props.error).toBe(false)
			expect(props.helperText).toBe('')
			expect(props.name).toBe('testField')
		})

		it('should return props with error when error provided', () => {
			const registration = {
				name: 'testField',
				onChange: () => {},
				onBlur: () => {},
				ref: () => {},
			}
			const error: FieldError = {
				type: 'required',
				message: 'This field is required',
			}

			const props = getTextFieldProps(registration, error)

			expect(props.error).toBe(true)
			expect(props.helperText).toBe('This field is required')
			expect(props.name).toBe('testField')
		})
	})

	describe('getNumberFieldProps', () => {
		it('should return props with step input prop', () => {
			const registration = {
				name: 'numberField',
				onChange: () => {},
				onBlur: () => {},
				ref: () => {},
			}

			const props = getNumberFieldProps(registration)

			expect(props.error).toBe(false)
			expect(props.helperText).toBe('')
			expect(props.inputProps.step).toBe(1)
		})

		it('should return props with error for number fields', () => {
			const registration = {
				name: 'numberField',
				onChange: () => {},
				onBlur: () => {},
				ref: () => {},
			}
			const error: FieldError = {
				type: 'min',
				message: 'Must be at least 0',
			}

			const props = getNumberFieldProps(registration, error)

			expect(props.error).toBe(true)
			expect(props.helperText).toBe('Must be at least 0')
		})
	})

	describe('getSelectProps', () => {
		it('should return props without error when no error provided', () => {
			const registration = {
				name: 'selectField',
				onChange: () => {},
				onBlur: () => {},
				ref: () => {},
			}

			const props = getSelectProps(registration)

			expect(props.error).toBe(false)
			expect(props.name).toBe('selectField')
		})

		it('should return props with error when error provided', () => {
			const registration = {
				name: 'selectField',
				onChange: () => {},
				onBlur: () => {},
				ref: () => {},
			}
			const error: FieldError = {
				type: 'required',
				message: 'Selection is required',
			}

			const props = getSelectProps(registration, error)

			expect(props.error).toBe(true)
		})
	})
})

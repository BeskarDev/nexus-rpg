import { describe, it, expect } from 'vitest'
import {
	getTextFieldProps,
	getSelectProps,
	validationRules,
	isValidNumber,
	parseNumber,
} from '../formValidation'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'

describe('formValidation utilities', () => {
	describe('getTextFieldProps', () => {
		it('should return basic props without error', () => {
			const mockRegistration: UseFormRegisterReturn = {
				name: 'testField',
				onChange: async () => {},
				onBlur: async () => {},
				ref: () => {},
			}

			const props = getTextFieldProps(mockRegistration)

			expect(props.name).toBe('testField')
			expect(props.onChange).toBeDefined()
			expect(props.onBlur).toBeDefined()
			expect(props.inputRef).toBeDefined()
			expect(props.error).toBe(false)
			expect(props.helperText).toBeUndefined()
		})

		it('should include error state and message when error is provided', () => {
			const mockRegistration: UseFormRegisterReturn = {
				name: 'testField',
				onChange: async () => {},
				onBlur: async () => {},
				ref: () => {},
			}

			const mockError: FieldError = {
				type: 'required',
				message: 'This field is required',
			}

			const props = getTextFieldProps(mockRegistration, mockError)

			expect(props.error).toBe(true)
			expect(props.helperText).toBe('This field is required')
		})
	})

	describe('getSelectProps', () => {
		it('should work the same as getTextFieldProps', () => {
			const mockRegistration: UseFormRegisterReturn = {
				name: 'selectField',
				onChange: async () => {},
				onBlur: async () => {},
				ref: () => {},
			}

			const props = getSelectProps(mockRegistration)

			expect(props.name).toBe('selectField')
			expect(props.error).toBe(false)
		})
	})

	describe('validationRules', () => {
		describe('required', () => {
			it('should return required validation with default message', () => {
				const rule = validationRules.required()
				expect(rule.required).toBe('This field is required')
			})

			it('should return required validation with custom field name', () => {
				const rule = validationRules.required('Name')
				expect(rule.required).toBe('Name is required')
			})
		})

		describe('numberRange', () => {
			it('should return min and max validation rules', () => {
				const rule = validationRules.numberRange(0, 3)
				
				expect(rule.min.value).toBe(0)
				expect(rule.min.message).toBe('Value must be at least 0')
				expect(rule.max.value).toBe(3)
				expect(rule.max.message).toBe('Value must be at most 3')
			})

			it('should include field name in messages', () => {
				const rule = validationRules.numberRange(1, 10, 'Resolve')
				
				expect(rule.min.message).toBe('Resolve must be at least 1')
				expect(rule.max.message).toBe('Resolve must be at most 10')
			})
		})

		describe('stringLength', () => {
			it('should return minLength validation', () => {
				const rule = validationRules.stringLength(3)
				
				expect(rule.minLength.value).toBe(3)
				expect(rule.minLength.message).toBe('Must be at least 3 characters')
			})

			it('should return maxLength validation', () => {
				const rule = validationRules.stringLength(undefined, 50)
				
				expect(rule.maxLength.value).toBe(50)
				expect(rule.maxLength.message).toBe('Must be at most 50 characters')
			})

			it('should return both min and max length validation', () => {
				const rule = validationRules.stringLength(3, 50, 'Name')
				
				expect(rule.minLength.value).toBe(3)
				expect(rule.minLength.message).toBe('Name must be at least 3 characters')
				expect(rule.maxLength.value).toBe(50)
				expect(rule.maxLength.message).toBe('Name must be at most 50 characters')
			})
		})

		describe('pattern', () => {
			it('should return pattern validation', () => {
				const regex = /^[A-Za-z]+$/
				const rule = validationRules.pattern(regex, 'Only letters allowed')
				
				expect(rule.pattern.value).toBe(regex)
				expect(rule.pattern.message).toBe('Only letters allowed')
			})
		})

		describe('combine', () => {
			it('should combine multiple validation rules', () => {
				const combined = validationRules.combine(
					validationRules.required('Name'),
					validationRules.stringLength(3, 50),
				)
				
				expect(combined.required).toBe('Name is required')
				expect(combined.minLength.value).toBe(3)
				expect(combined.maxLength.value).toBe(50)
			})
		})
	})

	describe('isValidNumber', () => {
		it('should return true for valid numbers', () => {
			expect(isValidNumber(0)).toBe(true)
			expect(isValidNumber(42)).toBe(true)
			expect(isValidNumber(-10)).toBe(true)
			expect(isValidNumber(3.14)).toBe(true)
		})

		it('should return false for invalid values', () => {
			expect(isValidNumber(NaN)).toBe(false)
			expect(isValidNumber(Infinity)).toBe(false)
			expect(isValidNumber(-Infinity)).toBe(false)
			expect(isValidNumber('42')).toBe(false)
			expect(isValidNumber(null)).toBe(false)
			expect(isValidNumber(undefined)).toBe(false)
		})
	})

	describe('parseNumber', () => {
		it('should return the number if already a valid number', () => {
			expect(parseNumber(42)).toBe(42)
			expect(parseNumber(0)).toBe(0)
			expect(parseNumber(-10)).toBe(-10)
		})

		it('should parse valid string numbers', () => {
			expect(parseNumber('42')).toBe(42)
			expect(parseNumber('0')).toBe(0)
			expect(parseNumber('-10')).toBe(-10)
			expect(parseNumber('3.14')).toBe(3.14)
		})

		it('should return default value for invalid inputs', () => {
			expect(parseNumber('not a number')).toBe(0)
			expect(parseNumber('')).toBe(0)
			expect(parseNumber('not a number', 10)).toBe(10)
			expect(parseNumber(NaN)).toBe(0)
			expect(parseNumber(Infinity)).toBe(0)
		})
	})
})

import { describe, it, expect } from 'vitest'
import { getTextFieldProps, getNumberFieldProps, getSelectProps, personalTabSchema, hpFieldSchema, createHpFieldSchema } from '../validation'
import { FieldError } from 'react-hook-form'

describe('validation utilities', () => {
	describe('personalTabSchema', () => {
		it('should validate name field correctly', async () => {
			// Valid name
			await expect(personalTabSchema.validateAt('name', { name: 'John' })).resolves.toBe('John')
			
			// Invalid - required
			await expect(personalTabSchema.validateAt('name', { name: '' })).rejects.toThrow('Name is required')
			
			// Invalid - too long
			await expect(personalTabSchema.validateAt('name', { name: 'a'.repeat(51) })).rejects.toThrow('Name must not exceed 50 characters')
		})

		it('should validate folk field correctly', async () => {
			// Valid folk
			await expect(personalTabSchema.validateAt('folk', { folk: 'Akashic' })).resolves.toBe('Akashic')
			
			// Invalid - too long
			await expect(personalTabSchema.validateAt('folk', { folk: 'a'.repeat(101) })).rejects.toThrow('Must not exceed 100 characters')
		})

		it('should validate physical measurements correctly', async () => {
			// Valid height
			await expect(personalTabSchema.validateAt('height', { height: '6 feet' })).resolves.toBe('6 feet')
			
			// Invalid - too long
			await expect(personalTabSchema.validateAt('height', { height: 'a'.repeat(31) })).rejects.toThrow('Must not exceed 30 characters')
		})

		it('should validate description field correctly', async () => {
			// Valid description
			await expect(personalTabSchema.validateAt('description', { description: 'A brave warrior' })).resolves.toBe('A brave warrior')
			
			// Invalid - too long
			await expect(personalTabSchema.validateAt('description', { description: 'a'.repeat(1001) })).rejects.toThrow('Description must not exceed 1000 characters')
		})
	})

	describe('hpFieldSchema', () => {
		it('should validate currentHp correctly', async () => {
			// Valid HP
			await expect(hpFieldSchema.validateAt('currentHp', { currentHp: 25 })).resolves.toBe(25)
			
			// Invalid - negative
			await expect(hpFieldSchema.validateAt('currentHp', { currentHp: -5 })).rejects.toThrow('HP cannot be negative')
			
			// Invalid - not a number
			await expect(hpFieldSchema.validateAt('currentHp', { currentHp: 'abc' })).rejects.toThrow('Must be a valid number')
		})

		it('should validate tempHp correctly', async () => {
			// Valid temp HP
			await expect(hpFieldSchema.validateAt('tempHp', { tempHp: 10 })).resolves.toBe(10)
			
			// Invalid - negative
			await expect(hpFieldSchema.validateAt('tempHp', { tempHp: -1 })).rejects.toThrow('Temp HP cannot be negative')
		})

		it('should validate maxHpModifier correctly', async () => {
			// Valid modifier
			await expect(hpFieldSchema.validateAt('maxHpModifier', { maxHpModifier: 5 })).resolves.toBe(5)
			await expect(hpFieldSchema.validateAt('maxHpModifier', { maxHpModifier: -3 })).resolves.toBe(-3)
			
			// Invalid - not a number
			await expect(hpFieldSchema.validateAt('maxHpModifier', { maxHpModifier: 'invalid' })).rejects.toThrow('Must be a valid number')
		})
	})

	describe('createHpFieldSchema', () => {
		it('should create schema with dynamic max HP validation', async () => {
			const schema = createHpFieldSchema(28)
			
			// Valid - within max
			await expect(schema.validateAt('currentHp', { currentHp: 25 })).resolves.toBe(25)
			
			// Invalid - exceeds max
			await expect(schema.validateAt('currentHp', { currentHp: 30 })).rejects.toThrow('Cannot exceed max HP (28)')
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

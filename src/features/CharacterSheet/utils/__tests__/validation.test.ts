import { describe, it, expect } from 'vitest'
import { getTextFieldProps, getNumberFieldProps, getSelectProps, personalTabSchema, hpFieldSchema, createHpFieldSchema, calculateMaxXpPerSkill, createSkillXpSchema } from '../validation'
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

	describe('calculateMaxXpPerSkill', () => {
		it('should return correct max XP for Level 1', () => {
			expect(calculateMaxXpPerSkill(0)).toBe(2)
			expect(calculateMaxXpPerSkill(9)).toBe(2)
		})

		it('should return correct max XP for Level 2', () => {
			expect(calculateMaxXpPerSkill(10)).toBe(4)
			expect(calculateMaxXpPerSkill(15)).toBe(4)
		})

		it('should return correct max XP for Level 3', () => {
			expect(calculateMaxXpPerSkill(16)).toBe(6)
			expect(calculateMaxXpPerSkill(23)).toBe(6)
		})

		it('should return correct max XP for Level 6', () => {
			expect(calculateMaxXpPerSkill(42)).toBe(16)
			expect(calculateMaxXpPerSkill(51)).toBe(16)
		})

		it('should return correct max XP for Level 10', () => {
			expect(calculateMaxXpPerSkill(90)).toBe(28)
			expect(calculateMaxXpPerSkill(100)).toBe(28)
		})
	})

	describe('createSkillXpSchema', () => {
		it('should validate skill XP within allowed range for Level 1', async () => {
			// Level 1: max 2 XP per skill
			// Starting with 0 spent XP, adding 2 XP keeps us at level 1 (< 10 spent)
			const schema1 = createSkillXpSchema(0, 0)
			await expect(schema1.validateSync(2)).toBe(2)
			// Adding 3 XP would give us 3 spent total, still level 1, but exceeds the max of 2
			await expect(() => schema1.validateSync(3)).toThrow(/Max 2 \(Lvl 1\)/)
		})

		it('should validate skill XP for Level 3', async () => {
			// Starting with 16 spent XP (Level 3), max 6 XP per skill
			// Adding 6 XP to a new skill: 16 + 6 = 22 spent (still Level 3)
			const schema = createSkillXpSchema(16, 0)
			await expect(schema.validateSync(6)).toBe(6)
			// Adding 7 XP: 16 + 7 = 23 spent (still Level 3, but exceeds max of 6)
			await expect(() => schema.validateSync(7)).toThrow(/Max 6 \(Lvl 3\)/)
		})

		it('should not allow negative XP', async () => {
			const schema = createSkillXpSchema(20, 0)
			await expect(() => schema.validateSync(-1)).toThrow('XP cannot be negative')
		})

		it('should require a valid number', async () => {
			const schema = createSkillXpSchema(20, 0)
			await expect(() => schema.validateSync('abc' as any)).toThrow('Must be a valid number')
		})

		it('should account for current skill XP when calculating max', async () => {
			// Character has 20 spent XP total, with 4 XP in this skill
			// Other skills: 20 - 4 = 16 spent (Level 3)
			// If we increase this skill to 6: 16 + 6 = 22 spent (Level 3, max 6)
			const schema = createSkillXpSchema(20, 4)
			await expect(schema.validateSync(6)).toBe(6)
			// If we try to increase to 10: 16 + 10 = 26 spent (Level 4, max 10), should be OK
			await expect(schema.validateSync(10)).toBe(10)
			// If we try to increase to 11: 16 + 11 = 27 spent (Level 4, but exceeds max of 10)
			await expect(() => schema.validateSync(11)).toThrow(/Max 10 \(Lvl 4\)/)
		})

		it('should handle progression through levels correctly', async () => {
			// Start with 42 spent XP (Level 6, max 16 XP per skill)
			// Skill currently has 12 XP, so other skills: 42 - 12 = 30
			const schema = createSkillXpSchema(42, 12)
			
			// Try to set to 16: 30 + 16 = 46 spent (Level 6, max 16) - OK
			await expect(schema.validateSync(16)).toBe(16)
			
			// Try to set to 17: 30 + 17 = 47 spent (Level 6, but exceeds max of 16)
			await expect(() => schema.validateSync(17)).toThrow(/Max 16 \(Lvl 6\)/)
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

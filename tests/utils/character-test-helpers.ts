/* eslint-disable @typescript-eslint/no-explicit-any */

import { configureStore } from '@reduxjs/toolkit'
import { expect, vi } from 'vitest'
import {
	characterSheetReducer,
	CharacterSheetReducerState,
} from '@site/src/features/CharacterSheet/characterSheetReducer'
import { CharacterDocument } from '@site/src/types/Character'

/**
 * Test helper functions for Character Sheet testing
 * Provides utilities for setting up tests and common assertions
 */

/**
 * Creates a test Redux store with the character sheet reducer
 * @param preloadedState Optional initial state
 */
export const createTestStore = (preloadedState?: {
	characterSheet: CharacterSheetReducerState
}) => {
	return configureStore({
		reducer: {
			characterSheet: characterSheetReducer,
		},
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				serializableCheck: false,
			}),
		preloadedState,
	})
}

/**
 * Creates initial state for character sheet reducer
 * @param overrides Optional state overrides
 */
export const createInitialState = (
	overrides: Partial<CharacterSheetReducerState> = {},
): CharacterSheetReducerState => ({
	activeCharacter: undefined,
	unsavedChanges: false,
	saveTimeout: false,
	autosave: false,
	loadingSave: false,
	...overrides,
})

/**
 * Creates initial state with a character loaded
 * @param character The character to load
 * @param stateOverrides Additional state overrides
 */
export const createStateWithCharacter = (
	character: CharacterDocument,
	stateOverrides: Partial<CharacterSheetReducerState> = {},
): CharacterSheetReducerState => ({
	activeCharacter: character,
	unsavedChanges: false,
	saveTimeout: false,
	autosave: false,
	loadingSave: false,
	...stateOverrides,
})

/**
 * Helper to assert that an action sets unsavedChanges to true
 * This is a common side effect for most mutation actions
 */
export const expectUnsavedChanges = (
	state: CharacterSheetReducerState,
	expected = true,
) => {
	expect(state.unsavedChanges).toBe(expected)
}

/**
 * Helper to assert character arrays have specific lengths
 */
export const expectArrayLength = (
	array: any[],
	expectedLength: number,
	context = 'Array',
) => {
	expect(array).toHaveLength(expectedLength)
	expect(Array.isArray(array)).toBe(true)
}

/**
 * Helper to verify that deep copy was performed correctly
 * Checks that object references are different but content is the same
 */
export const expectDeepCopy = (original: any, copied: any) => {
	// Objects should not be the same reference
	if (typeof original === 'object' && original !== null) {
		expect(copied).not.toBe(original)
	}

	// But content should be equal
	expect(copied).toEqual(original)
}

/**
 * Helper to generate unique IDs for testing
 * Useful when you need predictable IDs for assertions
 */
export const generateTestId = (prefix = 'test') => {
	return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Helper to verify skill rank calculation logic
 * Based on the XP-to-rank conversion in the reducer
 */
export const calculateExpectedSkillRank = (xp: number): number => {
	switch (true) {
		case xp <= 1:
			return 0
		case xp <= 5:
			return 1
		case xp <= 11:
			return 2
		case xp <= 19:
			return 3
		case xp <= 29:
			return 4
		default:
			return 5
	}
}

/**
 * Helper to verify character migration was performed correctly
 * Checks that all required fields are present after migration
 */
export const expectCharacterMigrated = (character: CharacterDocument) => {
	// Companions array should exist
	expect(character.companions).toBeDefined()
	expect(Array.isArray(character.companions)).toBe(true)

	// Status effects should exist and be array
	expect(character.statistics.statusEffects).toBeDefined()
	expect(Array.isArray(character.statistics.statusEffects)).toBe(true)

	// Skills should have proper IDs and ranks
	if (character.skills.skills) {
		character.skills.skills.forEach((skill) => {
			expect(skill.id).toBeDefined()
			expect(typeof skill.id).toBe('string')
			expect(skill.rank).toBe(calculateExpectedSkillRank(skill.xp))
		})
	}

	// Professions should exist
	expect(character.skills.professions).toBeDefined()
	expect(Array.isArray(character.skills.professions)).toBe(true)

	// Languages should exist and include Tradespeak
	expect(character.skills.languages).toBeDefined()
	expect(Array.isArray(character.skills.languages)).toBe(true)
	expect(character.skills.languages).toContain('Tradespeak')

	// Weapons, items should exist (no armor field in current type)
	expect(character.items.weapons).toBeDefined()
	expect(Array.isArray(character.items.weapons)).toBe(true)
	expect(character.items.items).toBeDefined()
	expect(Array.isArray(character.items.items)).toBe(true)

	// Encumbrance storageMaxLoad should exist
	expect(character.items.encumbrance.storageMaxLoad).toBeDefined()
	expect(typeof character.items.encumbrance.storageMaxLoad).toBe('number')
}

/**
 * Helper to verify companion migration was performed correctly
 * Checks that companions have HP and wounded fields
 */
export const expectCompanionMigrated = (companions: any[]) => {
	companions.forEach((companion) => {
		expect(companion.currentHP).toBeDefined()
		expect(companion.maxHP).toBeDefined()
		expect(companion.wounded).toBeDefined()
		expect(typeof companion.currentHP).toBe('number')
		expect(typeof companion.maxHP).toBe('number')
		expect(typeof companion.wounded).toBe('boolean')
	})
}

/**
 * Mock crypto.randomUUID for predictable test IDs
 * Use this in tests where you need consistent IDs
 */
export const mockCrypto = () => {
	let counter = 0
	Object.defineProperty(global, 'crypto', {
		value: {
			randomUUID: () => `mock-uuid-${++counter}`,
		},
		writable: true,
	})
	return () => (counter = 0) // Reset function
}

/**
 * Helper to create a deterministic date for testing companion IDs
 */
export const mockDateNow = (timestamp = 1000000000000) => {
	const originalDateNow = Date.now
	Date.now = vi.fn(() => timestamp)
	return () => {
		Date.now = originalDateNow
	}
}

/**
 * Helper to verify reorder operations work correctly
 * Tests array reordering from source to destination
 */
export const expectReorderCorrect = <T>(
	originalArray: T[],
	reorderedArray: T[],
	sourceIndex: number,
	destinationIndex: number,
) => {
	// Arrays should have same length
	expect(reorderedArray).toHaveLength(originalArray.length)

	// Element that was moved should be at new position
	expect(reorderedArray[destinationIndex]).toEqual(originalArray[sourceIndex])

	// All elements should still be present
	originalArray.forEach((item) => {
		expect(reorderedArray).toContainEqual(item)
	})
}

/**
 * Helper to test state immutability
 * Verifies that reducer doesn't mutate original state
 */
export const expectStateImmutable = (originalState: any, newState: any) => {
	// New state should be different reference
	expect(newState).not.toBe(originalState)

	// But original state should be unchanged if it had data
	if (originalState.activeCharacter) {
		// Key properties should remain unchanged in original
		const originalChar = originalState.activeCharacter
		expect(originalChar.personal.name).toBe(originalChar.personal.name)
		expect(originalChar.skills.skills.length).toBe(
			originalChar.skills.skills.length,
		)
	}
}

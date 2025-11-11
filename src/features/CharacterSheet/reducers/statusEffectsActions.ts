import { PayloadAction } from '@reduxjs/toolkit'
import { CharacterSheetReducerState } from '../characterSheetReducer'
import { StatusEffect, StatusEffectType } from '@site/src/types/Character'

export const statusEffectsActions = {
	addStatusEffect: (
		state: CharacterSheetReducerState,
		action: PayloadAction<StatusEffectType>,
	) => {
		state.unsavedChanges = true
		const statusEffectType = action.payload
		// Check if status effect already exists
		const existingIndex =
			state.activeCharacter.statistics.statusEffects.findIndex(
				(effect) => effect.name === statusEffectType,
			)

		if (existingIndex >= 0) {
			// If it exists, just make sure it's active
			state.activeCharacter.statistics.statusEffects[existingIndex].active =
				true
		} else {
			// Add new status effect (omit undefined fields for Firebase compatibility)
			const newStatusEffect: StatusEffect = {
				id: crypto.randomUUID(),
				name: statusEffectType,
				active: true,
			}
			state.activeCharacter.statistics.statusEffects.push(newStatusEffect)
		}
	},

	updateStatusEffect: (
		state: CharacterSheetReducerState,
		action: PayloadAction<{
			id: string
			update: Partial<StatusEffect>
			clearFields?: string[]
		}>,
	) => {
		state.unsavedChanges = true
		const { id, update, clearFields } = action.payload
		const index = state.activeCharacter.statistics.statusEffects.findIndex(
			(effect) => effect.id === id,
		)
		if (index >= 0) {
			// Filter out undefined values to prevent Firebase errors
			const filteredUpdate = Object.fromEntries(
				Object.entries(update).filter(([_, value]) => value !== undefined),
			)

			// Start with the current effect
			let updatedEffect = {
				...state.activeCharacter.statistics.statusEffects[index],
				...filteredUpdate,
			}

			// Clear specified fields
			if (clearFields) {
				clearFields.forEach((field) => {
					delete (updatedEffect as any)[field]
				})
			}

			state.activeCharacter.statistics.statusEffects[index] = updatedEffect
		}
	},

	toggleStatusEffect: (
		state: CharacterSheetReducerState,
		action: PayloadAction<string>,
	) => {
		state.unsavedChanges = true
		const id = action.payload
		const index = state.activeCharacter.statistics.statusEffects.findIndex(
			(effect) => effect.id === id,
		)
		if (index >= 0) {
			state.activeCharacter.statistics.statusEffects[index].active =
				!state.activeCharacter.statistics.statusEffects[index].active
		}
	},

	removeStatusEffect: (
		state: CharacterSheetReducerState,
		action: PayloadAction<string>,
	) => {
		state.unsavedChanges = true
		const id = action.payload
		state.activeCharacter.statistics.statusEffects =
			state.activeCharacter.statistics.statusEffects.filter(
				(effect) => effect.id !== id,
			)
	},
}

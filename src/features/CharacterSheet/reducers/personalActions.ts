import { PayloadAction } from '@reduxjs/toolkit'
import { CharacterSheetReducerState } from '../characterSheetReducer'
import { Companion } from '@site/src/types/Character'
import { reorder } from '@site/src/components/DynamicList/utils'

export const personalActions = {
	addNewCompanion: (state: CharacterSheetReducerState) => {
		state.unsavedChanges = true
		state.activeCharacter.companions.splice(0, 0, {
			id: Date.now().toString(),
			name: 'New Companion',
			markdown: '',
			currentHP: 0,
			maxHP: 0,
			wounded: false,
		})
	},

	updateCompanion: (
		state: CharacterSheetReducerState,
		action: PayloadAction<{ id: string; updates: Partial<Companion> }>,
	) => {
		const { id, updates } = action.payload
		state.unsavedChanges = true
		const index = state.activeCharacter.companions.findIndex(
			(companion) => companion.id === id,
		)
		if (index >= 0) {
			state.activeCharacter.companions[index] = {
				...state.activeCharacter.companions[index],
				...updates,
			}
		}
	},

	deleteCompanion: (state: CharacterSheetReducerState, action: PayloadAction<Companion>) => {
		state.unsavedChanges = true
		state.activeCharacter.companions = state.activeCharacter.companions.filter(
			(c) => c.id !== action.payload.id,
		)
	},

	reorderCompanion: (
		state: CharacterSheetReducerState,
		action: PayloadAction<{ source: number; destination: number }>,
	) => {
		const { source, destination } = action.payload
		state.unsavedChanges = true
		state.activeCharacter.companions = reorder(
			state.activeCharacter.companions,
			source,
			destination,
		)
	},
}
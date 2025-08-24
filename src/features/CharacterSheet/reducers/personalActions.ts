import { PayloadAction } from '@reduxjs/toolkit'
import { CharacterSheetReducerState } from '../characterSheetReducer'
import { Companion } from '@site/src/types/Character'
import { reorder } from '@site/src/components/DynamicList/utils'

export const personalActions = {
	addNewAlly: (state: CharacterSheetReducerState) => {
		state.unsavedChanges = true
		state.activeCharacter.personal.allies.splice(0, 0, {
			id: crypto.randomUUID(),
			description: '',
		})
	},

	updateAlly: (
		state: CharacterSheetReducerState,
		action: PayloadAction<{ update: string; index: number }>,
	) => {
		const { update, index } = action.payload
		state.unsavedChanges = true
		state.activeCharacter.personal.allies[index] = {
			...state.activeCharacter.personal.allies[index],
			description: update,
		}
	},

	deleteAlly: (state: CharacterSheetReducerState, action: PayloadAction<number>) => {
		const index = action.payload
		state.unsavedChanges = true
		state.activeCharacter.personal.allies.splice(index, 1)
	},

	reorderAlly: (
		state: CharacterSheetReducerState,
		action: PayloadAction<{ source: number; destination: number }>,
	) => {
		const { source, destination } = action.payload
		state.unsavedChanges = true
		state.activeCharacter.personal.allies = reorder(
			state.activeCharacter.personal.allies,
			source,
			destination,
		)
	},

	addNewContact: (state: CharacterSheetReducerState) => {
		state.unsavedChanges = true
		state.activeCharacter.personal.contacts.splice(0, 0, {
			id: crypto.randomUUID(),
			description: '',
		})
	},

	updateContact: (
		state: CharacterSheetReducerState,
		action: PayloadAction<{ update: string; index: number }>,
	) => {
		const { update, index } = action.payload
		state.unsavedChanges = true
		state.activeCharacter.personal.contacts[index] = {
			...state.activeCharacter.personal.contacts[index],
			description: update,
		}
	},

	deleteContact: (state: CharacterSheetReducerState, action: PayloadAction<number>) => {
		const index = action.payload
		state.unsavedChanges = true
		state.activeCharacter.personal.contacts.splice(index, 1)
	},

	reorderContact: (
		state: CharacterSheetReducerState,
		action: PayloadAction<{ source: number; destination: number }>,
	) => {
		const { source, destination } = action.payload
		state.unsavedChanges = true
		state.activeCharacter.personal.contacts = reorder(
			state.activeCharacter.personal.contacts,
			source,
			destination,
		)
	},

	addNewRival: (state: CharacterSheetReducerState) => {
		state.unsavedChanges = true
		state.activeCharacter.personal.rivals.splice(0, 0, {
			id: crypto.randomUUID(),
			description: '',
		})
	},

	updateRival: (
		state: CharacterSheetReducerState,
		action: PayloadAction<{ update: string; index: number }>,
	) => {
		const { update, index } = action.payload
		state.unsavedChanges = true
		state.activeCharacter.personal.rivals[index] = {
			...state.activeCharacter.personal.rivals[index],
			description: update,
		}
	},

	deleteRival: (state: CharacterSheetReducerState, action: PayloadAction<number>) => {
		const index = action.payload
		state.unsavedChanges = true
		state.activeCharacter.personal.rivals.splice(index, 1)
	},

	reorderRival: (
		state: CharacterSheetReducerState,
		action: PayloadAction<{ source: number; destination: number }>,
	) => {
		const { source, destination } = action.payload
		state.unsavedChanges = true
		state.activeCharacter.personal.rivals = reorder(
			state.activeCharacter.personal.rivals,
			source,
			destination,
		)
	},

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
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deepCopy } from '@site/src/components/DynamicList/utils'
import { Ability, CharacterDocument, Skill } from '@site/src/types/Character'
import { Character } from './../../types/Character'
import { DeepPartial } from './CharacterSheetContainer'

function isObject(value: any) {
	return value !== null && typeof value === 'object'
}

function mergeDeep(target: any, source: any) {
	if (isObject(target) && isObject(source)) {
		for (const key in source) {
			if (isObject(source[key])) {
				// Recursive call for nested objects
				target[key] = mergeDeep(target[key] || {}, source[key])
			} else {
				// Update value for non-objects
				target[key] = source[key]
			}
		}
	} else {
		// Replace entire value if not objects
		return source
	}
	return target
}

export type CharacterSheetReducerState = {
	activeCharacter?: CharacterDocument
	unsavedChanges: boolean
	saveTimeout: boolean
	autosave: boolean
	loadingSave: boolean
}

const initialState: CharacterSheetReducerState = {
	activeCharacter: undefined,
	unsavedChanges: false,
	saveTimeout: false,
	autosave: false,
	loadingSave: false,
}

export const {
	reducer: characterSheetReducer,
	actions: characterSheetActions,
} = createSlice({
	name: 'characterSheet',
	initialState,
	reducers: {
		setUnsavedChanges: (state, action: PayloadAction<boolean>) => {
			state.unsavedChanges = action.payload
		},
		setSaveTimeout: (state, action: PayloadAction<boolean>) => {
			state.saveTimeout = action.payload
		},
		setAutosave: (state, action: PayloadAction<boolean>) => {
			state.autosave = action.payload
		},
		setLoadingSave: (state, action: PayloadAction<boolean>) => {
			state.loadingSave = action.payload
		},
		setCharacter: (state, action: PayloadAction<CharacterDocument>) => {
			state.activeCharacter = action.payload
		},
		updateCharacter: (state, action: PayloadAction<DeepPartial<Character>>) => {
			const copiedUpdate = deepCopy(action.payload)

			const newCharacter: CharacterDocument = {
				...state.activeCharacter,
				docRef: state.activeCharacter.docRef,
			}

			state.unsavedChanges = true
			state.activeCharacter = mergeDeep(newCharacter, copiedUpdate)
		},
		addNewSkill: (state) => {
			state.activeCharacter.skills.skills.splice(0, 0, {
				id: crypto.randomUUID(),
				name: 'new skill',
				rank: 0,
				xp: 0,
			})
		},
		updateSkill: (
			state,
			action: PayloadAction<{ update: Partial<Skill>; index: number }>,
		) => {
			const update = action.payload.update
			const index = action.payload.index
			state.activeCharacter.skills.skills[index] = {
				...state.activeCharacter.skills.skills[index],
				...update,
			}
		},
		deleteSkill: (state, action: PayloadAction<Skill>) => {
			state.activeCharacter.skills.skills =
				state.activeCharacter.skills.skills.filter(
					(s) => s.id !== action.payload.id,
				)
		},
		addNewAbility: (state) => {
			state.activeCharacter.skills.abilities.splice(0, 0, {
				id: crypto.randomUUID(),
				description: '',
			})
		},
		updateAbility: (
			state,
			action: PayloadAction<{ update: string; index: number }>,
		) => {
			const update = action.payload.update
			const index = action.payload.index
			state.activeCharacter.skills.abilities[index] = {
				...state.activeCharacter.skills.abilities[index],
				description: update,
			}
		},
		deleteAbility: (state, action: PayloadAction<Ability>) => {
			state.activeCharacter.skills.abilities =
				state.activeCharacter.skills.abilities.filter(
					(s) => s.id !== action.payload.id,
				)
		},
	},
})

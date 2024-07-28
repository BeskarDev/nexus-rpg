import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deepCopy } from '@site/src/components/DynamicList/utils'
import { CharacterDocument } from '@site/src/types/Character'
import { Character } from './../../types/Character'
import { DeepPartial } from './CharacterSheetContainer'

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

			state.unsavedChanges = true
			state.activeCharacter = mergeDeep(newCharacter, copiedUpdate)
		},
	},
})

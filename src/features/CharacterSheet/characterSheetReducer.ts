import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deepCopy, reorder } from '@site/src/components/DynamicList/utils'
import {
	Ability,
	CharacterDocument,
	Item,
	Skill,
	Spell,
	Weapon,
} from '@site/src/types/Character'
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
			state.unsavedChanges = true
			state.activeCharacter.skills.skills.splice(0, 0, {
				id: crypto.randomUUID(),
				name: '',
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
			state.unsavedChanges = true
			state.activeCharacter.skills.skills[index] = {
				...state.activeCharacter.skills.skills[index],
				...update,
			}
		},
		deleteSkill: (state, action: PayloadAction<Skill>) => {
			state.unsavedChanges = true
			state.activeCharacter.skills.skills =
				state.activeCharacter.skills.skills.filter(
					(s) => s.id !== action.payload.id,
				)
		},
		reorderSkill: (
			state,
			action: PayloadAction<{ source: number; destination: number }>,
		) => {
			const { source, destination } = action.payload
			state.unsavedChanges = true
			state.activeCharacter.skills.skills = reorder(
				state.activeCharacter.skills.skills,
				source,
				destination,
			)
		},
		addNewAbility: (state) => {
			state.unsavedChanges = true
			state.activeCharacter.skills.abilities.splice(0, 0, {
				id: crypto.randomUUID(),
				title: '',
				description: '',
			})
		},
		updateAbility: (
			state,
			action: PayloadAction<{ update: Partial<Ability>; index: number }>,
		) => {
			const update = action.payload.update
			const index = action.payload.index
			state.unsavedChanges = true
			state.activeCharacter.skills.abilities[index] = {
				...state.activeCharacter.skills.abilities[index],
				...update,
			}
		},
		deleteAbility: (state, action: PayloadAction<Ability>) => {
			state.unsavedChanges = true
			state.activeCharacter.skills.abilities =
				state.activeCharacter.skills.abilities.filter(
					(s) => s.id !== action.payload.id,
				)
		},
		reorderAbility: (
			state,
			action: PayloadAction<{ source: number; destination: number }>,
		) => {
			const { source, destination } = action.payload
			state.unsavedChanges = true
			state.activeCharacter.skills.abilities = reorder(
				state.activeCharacter.skills.abilities,
				source,
				destination,
			)
		},
		addNewWeapon: (state) => {
			state.unsavedChanges = true
			state.activeCharacter.items.weapons.splice(0, 0, {
				id: crypto.randomUUID(),
				name: '',
				damage: {
					base: 0,
					weapon: 0,
					otherWeak: 0,
					otherStrong: 0,
					otherCritical: 0,
					type: 'physical',
				},
				properties: '',
				description: '',
				cost: 0,
				load: 0,
			})
		},
		updateWeapon: (
			state,
			action: PayloadAction<{ update: Partial<Weapon>; index: number }>,
		) => {
			const update = action.payload.update
			const index = action.payload.index
			state.unsavedChanges = true
			state.activeCharacter.items.weapons[index] = {
				...state.activeCharacter.items.weapons[index],
				...update,
			}
		},
		deleteWeapon: (state, action: PayloadAction<Weapon>) => {
			state.unsavedChanges = true
			state.activeCharacter.items.weapons =
				state.activeCharacter.items.weapons.filter(
					(s) => s.id !== action.payload.id,
				)
		},
		reorderWeapon: (
			state,
			action: PayloadAction<{ source: number; destination: number }>,
		) => {
			const { source, destination } = action.payload
			state.unsavedChanges = true
			state.activeCharacter.items.weapons = reorder(
				state.activeCharacter.items.weapons,
				source,
				destination,
			)
		},
		addNewItem: (state) => {
			state.unsavedChanges = true
			state.activeCharacter.items.items.splice(0, 0, {
				id: crypto.randomUUID(),
				name: '',
				properties: '',
				description: '',
				cost: 0,
				load: 0,
				container: 'backpack',
				slot: '',
				amount: 1,
			})
		},
		updateItem: (
			state,
			action: PayloadAction<{ update: Partial<Item>; index: number }>,
		) => {
			const update = action.payload.update
			const index = action.payload.index
			state.unsavedChanges = true
			state.activeCharacter.items.items[index] = {
				...state.activeCharacter.items.items[index],
				...update,
			}
		},
		deleteItem: (state, action: PayloadAction<Item>) => {
			state.unsavedChanges = true
			state.activeCharacter.items.items =
				state.activeCharacter.items.items.filter(
					(s) => s.id !== action.payload.id,
				)
		},
		reorderItem: (
			state,
			action: PayloadAction<{ source: number; destination: number }>,
		) => {
			const { source, destination } = action.payload
			state.unsavedChanges = true
			state.activeCharacter.items.items = reorder(
				state.activeCharacter.items.items,
				source,
				destination,
			)
		},
		addNewSpell: (state) => {
			state.unsavedChanges = true
			state.activeCharacter.spells.spells.splice(0, 0, {
				id: crypto.randomUUID(),
				name: '',
				rank: 0,
				cost: 0,
				target: '',
				range: '',
				properties: '',
				damage: {
					base: 0,
					weapon: 0,
					otherWeak: 0,
					otherStrong: 0,
					otherCritical: 0,
					type: 'physical',
				},
				effect: '',
			})
		},
		updateSpell: (
			state,
			action: PayloadAction<{ update: Partial<Spell>; index: number }>,
		) => {
			const update = action.payload.update
			const index = action.payload.index
			state.unsavedChanges = true
			state.activeCharacter.spells.spells[index] = {
				...state.activeCharacter.spells.spells[index],
				...update,
			}
		},
		deleteSpell: (state, action: PayloadAction<Spell>) => {
			state.unsavedChanges = true
			state.activeCharacter.spells.spells =
				state.activeCharacter.spells.spells.filter(
					(s) => s.id !== action.payload.id,
				)
		},
		reorderSpell: (
			state,
			action: PayloadAction<{ source: number; destination: number }>,
		) => {
			const { source, destination } = action.payload
			state.unsavedChanges = true
			state.activeCharacter.spells.spells = reorder(
				state.activeCharacter.spells.spells,
				source,
				destination,
			)
		},
		addNewAlly: (state) => {
			state.unsavedChanges = true
			state.activeCharacter.personal.allies.splice(0, 0, {
				id: crypto.randomUUID(),
				description: '',
			})
		},
		updateAlly: (
			state,
			action: PayloadAction<{ update: string; index: number }>,
		) => {
			const update = action.payload.update
			const index = action.payload.index
			state.unsavedChanges = true
			state.activeCharacter.personal.allies[index] = {
				...state.activeCharacter.personal.allies[index],
				description: update,
			}
		},
		deleteAlly: (state, action: PayloadAction<number>) => {
			state.unsavedChanges = true
			state.activeCharacter.personal.allies =
				state.activeCharacter.personal.allies.filter(
					(_, i) => i != action.payload,
				)
		},
		reorderAlly: (
			state,
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
		addNewContact: (state) => {
			state.unsavedChanges = true
			state.activeCharacter.personal.contacts.splice(0, 0, {
				id: crypto.randomUUID(),
				description: '',
			})
		},
		updateContact: (
			state,
			action: PayloadAction<{ update: string; index: number }>,
		) => {
			const update = action.payload.update
			const index = action.payload.index
			state.unsavedChanges = true
			state.activeCharacter.personal.contacts[index] = {
				...state.activeCharacter.personal.contacts[index],
				description: update,
			}
		},
		deleteContact: (state, action: PayloadAction<number>) => {
			state.unsavedChanges = true
			state.activeCharacter.personal.contacts =
				state.activeCharacter.personal.contacts.filter(
					(_, i) => i != action.payload,
				)
		},
		reorderContact: (
			state,
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
		addNewRival: (state) => {
			state.unsavedChanges = true
			state.activeCharacter.personal.rivals.splice(0, 0, {
				id: crypto.randomUUID(),
				description: '',
			})
		},
		updateRival: (
			state,
			action: PayloadAction<{ update: string; index: number }>,
		) => {
			const update = action.payload.update
			const index = action.payload.index
			state.unsavedChanges = true
			state.activeCharacter.personal.rivals[index] = {
				...state.activeCharacter.personal.rivals[index],
				description: update,
			}
		},
		deleteRival: (state, action: PayloadAction<number>) => {
			state.unsavedChanges = true
			state.activeCharacter.personal.rivals =
				state.activeCharacter.personal.rivals.filter(
					(_, i) => i != action.payload,
				)
		},
		reorderRival: (
			state,
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
	},
})
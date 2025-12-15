import { PayloadAction } from '@reduxjs/toolkit'
import { CharacterSheetReducerState } from '../characterSheetReducer'
import { Item, Weapon, DurabilityDie } from '@site/src/types/Character'
import { ItemLocation } from '@site/src/types/ItemLocation'
import { reorder } from '@site/src/components/DynamicList/utils'
import { getDurabilityForItem } from '../CharacterSheetTabs/02_Items/utils/durabilityUtils'

export const itemsActions = {
	addNewWeapon: (state: CharacterSheetReducerState) => {
		state.unsavedChanges = true
		state.activeCharacter.items.weapons.splice(0, 0, {
			id: crypto.randomUUID(),
			name: '',
			damage: {
				base: 'STR',
				weapon: 0,
				other: 0,
				otherWeak: 0,
				otherStrong: 0,
				otherCritical: 0,
				type: 'physical',
			},
			properties: '',
			description: '',
			cost: 0,
			load: 0,
			location: 'worn' as ItemLocation,
			uses: 0,
			durability: '',
		})
	},

	importWeapons: (
		state: CharacterSheetReducerState,
		action: PayloadAction<Partial<Weapon>[]>,
	) => {
		state.unsavedChanges = true
		const newWeapons = action.payload.map((weapon) => ({
			id: crypto.randomUUID(),
			name: '',
			damage: {
				base: 'STR' as const,
				weapon: 0,
				other: 0,
				otherWeak: 0,
				otherStrong: 0,
				otherCritical: 0,
				type: 'physical' as const,
			},
			properties: '',
			description: '',
			cost: 0,
			load: 0,
			location: 'worn' as ItemLocation,
			uses: 0,
			durability: '' as DurabilityDie,
			...weapon,
		}))
		state.activeCharacter.items.weapons.unshift(...newWeapons)
	},

	importItems: (
		state: CharacterSheetReducerState,
		action: PayloadAction<Partial<Item>[]>,
	) => {
		state.unsavedChanges = true
		const newItems = action.payload.map((item) => ({
			id: crypto.randomUUID(),
			name: '',
			properties: [] as string[],
			description: '',
			slot: '' as const,
			cost: 0,
			load: 0,
			container: '' as const,
			amount: 1,
			location: 'carried' as ItemLocation,
			uses: 0,
			durability: '' as DurabilityDie,
			...item,
		}))
		// Use durability utility to set correct durability for items
		newItems.forEach((item) => {
			if (!item.durability) {
				item.durability = getDurabilityForItem(item) || ''
			}
		})
		state.activeCharacter.items.items.unshift(...newItems)
	},

	updateWeapon: (
		state: CharacterSheetReducerState,
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

	deleteWeapon: (
		state: CharacterSheetReducerState,
		action: PayloadAction<Weapon>,
	) => {
		state.unsavedChanges = true
		state.activeCharacter.items.weapons =
			state.activeCharacter.items.weapons.filter(
				(w) => w.id !== action.payload.id,
			)
	},

	reorderWeapon: (
		state: CharacterSheetReducerState,
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

	addNewItem: (state: CharacterSheetReducerState) => {
		state.unsavedChanges = true
		state.activeCharacter.items.items.splice(0, 0, {
			id: crypto.randomUUID(),
			name: '',
			properties: [],
			cost: 0,
			container: 'backpack',
			amount: 1,
			location: 'carried' as ItemLocation,
			uses: 0,
			durability: '',
		})
	},

	addNewItemToLocation: (
		state: CharacterSheetReducerState,
		action: PayloadAction<ItemLocation>,
	) => {
		state.unsavedChanges = true
		state.activeCharacter.items.items.splice(0, 0, {
			id: crypto.randomUUID(),
			name: '',
			properties: [],
			cost: 0,
			container: action.payload === 'worn' ? 'worn' : 'backpack',
			amount: 1,
			location: action.payload,
			uses: 0,
			durability: '',
		})
	},

	addNewWeaponToLocation: (
		state: CharacterSheetReducerState,
		action: PayloadAction<ItemLocation>,
	) => {
		state.unsavedChanges = true
		state.activeCharacter.items.weapons.splice(0, 0, {
			id: crypto.randomUUID(),
			name: '',
			damage: {
				base: 'STR',
				weapon: 0,
				other: 0,
				otherWeak: 0,
				otherStrong: 0,
				otherCritical: 0,
				type: 'physical',
			},
			properties: '',
			description: '',
			cost: 0,
			load: 0,
			location: action.payload,
			uses: 0,
			durability: '',
		})
	},

	updateItem: (
		state: CharacterSheetReducerState,
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

	deleteItem: (
		state: CharacterSheetReducerState,
		action: PayloadAction<Item>,
	) => {
		state.unsavedChanges = true
		state.activeCharacter.items.items =
			state.activeCharacter.items.items.filter(
				(i) => i.id !== action.payload.id,
			)
	},

	reorderItem: (
		state: CharacterSheetReducerState,
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

	toggleItemLocationVisibility: (
		state: CharacterSheetReducerState,
		action: PayloadAction<ItemLocation>,
	) => {
		const location = action.payload
		state.unsavedChanges = true
		const currentVisibility =
			state.activeCharacter.items.itemLocationVisibility?.[location] ?? true
		if (!state.activeCharacter.items.itemLocationVisibility) {
			state.activeCharacter.items.itemLocationVisibility = {
				worn: true,
				carried: true,
				mount: true,
				storage: true,
			}
		}
		state.activeCharacter.items.itemLocationVisibility[location] =
			!currentVisibility
	},
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { deepCopy, reorder } from '@site/src/components/DynamicList/utils'
import {
	Ability,
	CharacterDocument,
	Companion,
	DurabilityDie,
	Item,
	Skill,
	Spell,
	StatusEffect,
	StatusEffectType,
	Weapon,
} from '@site/src/types/Character'
import { AbilityTag } from '@site/src/types/AbilityTag'
import { ItemLocation } from '@site/src/types/ItemLocation'
import { Character } from './../../types/Character'
import { DeepPartial } from './CharacterSheetContainer'
import { getDurabilityForItem } from './CharacterSheetTabs/02_Items/utils/durabilityUtils'

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
			const character = action.payload
			// Migrate older characters that don't have companions array
			if (!character.companions) {
				character.companions = []
			}
			// Migrate companions that don't have HP/wounded fields
			character.companions = character.companions.map((companion) => ({
				currentHP: 0,
				maxHP: 0,
				wounded: false,
				...companion,
			}))
			// Migrate older characters that don't have statusEffects array
			if (!character.statistics.statusEffects) {
				character.statistics.statusEffects = []
			}
			// Ensure statusEffects is always an array
			if (!Array.isArray(character.statistics.statusEffects)) {
				character.statistics.statusEffects = []
			}
			// Migrate older characters that don't have weapons/items arrays
			if (!character.items.weapons) {
				character.items.weapons = []
			}
			if (!character.items.items) {
				character.items.items = []
			}
			// Migrate weapons and items to include uses and durability if missing
			character.items.weapons = character.items.weapons.map((weapon) => ({
				uses: 0,
				durability: '',
				...weapon,
			}))
			character.items.items = character.items.items.map((item) => ({
				uses: 0,
				durability: '',
				...item,
			}))
			// Ensure encumbrance has mount and storage max load fields
			if (!character.items.encumbrance) {
				character.items.encumbrance = {
					encumberedAt: 0,
					overencumberedAt: 0,
					carryModifier: 0,
					currentLoad: 0,
					mountMaxLoad: 0,
					storageMaxLoad: 0,
				}
			} else {
				if (character.items.encumbrance.mountMaxLoad === undefined) {
					character.items.encumbrance.mountMaxLoad = 0
				}
				if (character.items.encumbrance.storageMaxLoad === undefined) {
					character.items.encumbrance.storageMaxLoad = 0
				}
			}
			state.activeCharacter = character
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
		addSkill: (state, action: PayloadAction<string>) => {
			const skillName = action.payload
			state.unsavedChanges = true
			state.activeCharacter.skills.skills.push({
				id: crypto.randomUUID(),
				name: skillName,
				rank: 0,
				xp: 0,
			})
		},
		removeSkill: (state, action: PayloadAction<string>) => {
			const skillName = action.payload
			state.unsavedChanges = true
			state.activeCharacter.skills.skills = 
				state.activeCharacter.skills.skills.filter(s => s.name !== skillName)
		},
		addProfession: (state, action: PayloadAction<string>) => {
			const professionName = action.payload
			state.unsavedChanges = true
			if (!state.activeCharacter.skills.professions.includes(professionName)) {
				state.activeCharacter.skills.professions.push(professionName)
			}
		},
		removeProfession: (state, action: PayloadAction<string>) => {
			const professionName = action.payload
			state.unsavedChanges = true
			state.activeCharacter.skills.professions = 
				state.activeCharacter.skills.professions.filter(p => p !== professionName)
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
		addNewAbility: (state, action?: PayloadAction<{ tag?: AbilityTag }>) => {
			state.unsavedChanges = true
			const tag = action?.payload?.tag || 'Other'
			state.activeCharacter.skills.abilities.splice(0, 0, {
				id: crypto.randomUUID(),
				title: '',
				description: '',
				tag,
				actionType: 'Other',
			})
		},
		importAbilities: (state, action: PayloadAction<Partial<Ability>[]>) => {
			state.unsavedChanges = true
			const newAbilities = action.payload.map((ability) => ({
				id: crypto.randomUUID(),
				title: '',
				description: '',
				tag: 'Other' as const,
				actionType: 'Other' as const,
				...ability,
			}))
			state.activeCharacter.skills.abilities.unshift(...newAbilities)
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
		importWeapons: (state, action: PayloadAction<Partial<Weapon>[]>) => {
			state.unsavedChanges = true
			const newWeapons = action.payload.map((weapon) => {
				const newWeapon = {
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
				}
				// Auto-fill durability if not already set
				if (!newWeapon.durability) {
					newWeapon.durability = getDurabilityForItem(newWeapon)
				}
				return newWeapon
			})
			state.activeCharacter.items.weapons.unshift(...newWeapons)
		},
		importItems: (state, action: PayloadAction<Partial<Item>[]>) => {
			state.unsavedChanges = true
			const newItems = action.payload.map((item) => {
				const newItem = {
					id: crypto.randomUUID(),
					name: '',
					properties: '',
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
				}
				// Auto-fill durability if not already set
				if (!newItem.durability) {
					newItem.durability = getDurabilityForItem(newItem)
				}
				return newItem
			})
			state.activeCharacter.items.items.unshift(...newItems)
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
				location: 'carried' as ItemLocation,
				uses: 0,
				durability: '',
			})
		},
		addNewItemToLocation: (state, action: PayloadAction<ItemLocation>) => {
			state.unsavedChanges = true
			state.activeCharacter.items.items.splice(0, 0, {
				id: crypto.randomUUID(),
				name: '',
				properties: '',
				description: '',
				cost: 0,
				load: 0,
				container: action.payload === 'worn' ? 'worn' : 'backpack',
				slot: action.payload === 'worn' ? '' : '',
				amount: 1,
				location: action.payload,
				uses: 0,
				durability: '',
			})
		},
		addNewWeaponToLocation: (state, action: PayloadAction<ItemLocation>) => {
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
				dealsDamage: false,
				damage: {
					base: '',
					weapon: 0,
					other: 0,
					otherWeak: 0,
					otherStrong: 0,
					otherCritical: 0,
					type: 'physical',
					staticDamage: false,
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
		importSpells: (state, action: PayloadAction<Partial<Spell>[]>) => {
			state.unsavedChanges = true
			const newSpells = action.payload.map((spell) => ({
				id: crypto.randomUUID(),
				name: '',
				rank: 0,
				cost: 0,
				target: '' as any,
				range: '' as any,
				properties: '',
				dealsDamage: false,
				damage: {
					base: '' as const,
					weapon: 0,
					other: 0,
					otherWeak: 0,
					otherStrong: 0,
					otherCritical: 0,
					type: 'physical' as const,
					staticDamage: false,
				},
				effect: '',
				...spell,
			}))
			state.activeCharacter.spells.spells.unshift(...newSpells)
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
		// Companions actions
		addNewCompanion: (state) => {
			state.unsavedChanges = true
			state.activeCharacter.companions.unshift({
				id: Date.now().toString(),
				name: 'New Companion',
				markdown: '',
				currentHP: 0,
				maxHP: 0,
				wounded: false,
			})
		},
		updateCompanion: (
			state,
			action: PayloadAction<{ id: string; updates: Partial<Companion> }>,
		) => {
			const { id, updates } = action.payload
			const index = state.activeCharacter.companions.findIndex(
				(c) => c.id === id,
			)
			if (index !== -1) {
				state.unsavedChanges = true
				state.activeCharacter.companions[index] = {
					...state.activeCharacter.companions[index],
					...updates,
				}
			}
		},
		deleteCompanion: (state, action: PayloadAction<Companion>) => {
			state.unsavedChanges = true
			state.activeCharacter.companions =
				state.activeCharacter.companions.filter(
					(companion) => companion.id != action.payload.id,
				)
		},
		reorderCompanion: (
			state,
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
		toggleAbilityCategoryVisibility: (
			state,
			action: PayloadAction<AbilityTag>,
		) => {
			const category = action.payload
			state.unsavedChanges = true
			const currentVisibility =
				state.activeCharacter.skills.abilityCategoryVisibility?.[category] ??
				true
			if (!state.activeCharacter.skills.abilityCategoryVisibility) {
				state.activeCharacter.skills.abilityCategoryVisibility = {
					'Combat Art': true,
					Talent: true,
					Folk: true,
					Other: true,
				}
			}
			state.activeCharacter.skills.abilityCategoryVisibility[category] =
				!currentVisibility
		},
		toggleItemLocationVisibility: (
			state,
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
		// Status Effects actions
		addStatusEffect: (state, action: PayloadAction<StatusEffectType>) => {
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
			state,
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
		toggleStatusEffect: (state, action: PayloadAction<string>) => {
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
		removeStatusEffect: (state, action: PayloadAction<string>) => {
			state.unsavedChanges = true
			const id = action.payload
			state.activeCharacter.statistics.statusEffects =
				state.activeCharacter.statistics.statusEffects.filter(
					(effect) => effect.id !== id,
				)
		},
	},
})

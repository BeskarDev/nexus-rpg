import { PayloadAction } from '@reduxjs/toolkit'
import { CharacterSheetReducerState } from '../characterSheetReducer'
import { Spell } from '@site/src/types/Character'
import { reorder } from '@site/src/components/DynamicList/utils'

export const spellsActions = {
	addNewSpell: (state: CharacterSheetReducerState) => {
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
		state: CharacterSheetReducerState,
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

	deleteSpell: (
		state: CharacterSheetReducerState,
		action: PayloadAction<Spell>,
	) => {
		state.unsavedChanges = true
		state.activeCharacter.spells.spells =
			state.activeCharacter.spells.spells.filter(
				(s) => s.id !== action.payload.id,
			)
	},

	reorderSpell: (
		state: CharacterSheetReducerState,
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

	importSpells: (
		state: CharacterSheetReducerState,
		action: PayloadAction<Partial<Spell>[]>,
	) => {
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
}

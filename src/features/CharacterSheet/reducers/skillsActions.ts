import { PayloadAction } from '@reduxjs/toolkit'
import { CharacterSheetReducerState } from '../characterSheetReducer'
import { Skill } from '@site/src/types/Character'
import { AbilityTag } from '@site/src/types/AbilityTag'
import { Ability } from '@site/src/types/Character'
import { reorder } from '@site/src/components/DynamicList/utils'

export const skillsActions = {
	addNewSkill: (state: CharacterSheetReducerState) => {
		state.unsavedChanges = true
		state.activeCharacter.skills.skills.splice(0, 0, {
			id: crypto.randomUUID(),
			name: '',
			rank: 0,
			xp: 0,
		})
	},

	updateSkill: (
		state: CharacterSheetReducerState,
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

	addSkill: (
		state: CharacterSheetReducerState,
		action: PayloadAction<string>,
	) => {
		const skillName = action.payload
		state.unsavedChanges = true
		state.activeCharacter.skills.skills.push({
			id: crypto.randomUUID(),
			name: skillName,
			rank: 0,
			xp: 0,
		})
	},

	removeSkill: (
		state: CharacterSheetReducerState,
		action: PayloadAction<string>,
	) => {
		const skillName = action.payload
		state.unsavedChanges = true
		state.activeCharacter.skills.skills =
			state.activeCharacter.skills.skills.filter((s) => s.name !== skillName)
	},

	addProfession: (
		state: CharacterSheetReducerState,
		action: PayloadAction<string>,
	) => {
		const professionName = action.payload
		state.unsavedChanges = true
		if (!state.activeCharacter.skills.professions.includes(professionName)) {
			state.activeCharacter.skills.professions.push(professionName)
		}
	},

	removeProfession: (
		state: CharacterSheetReducerState,
		action: PayloadAction<string>,
	) => {
		const professionName = action.payload
		state.unsavedChanges = true
		state.activeCharacter.skills.professions =
			state.activeCharacter.skills.professions.filter(
				(p) => p !== professionName,
			)
	},

	addLanguage: (
		state: CharacterSheetReducerState,
		action: PayloadAction<string>,
	) => {
		const languageName = action.payload
		state.unsavedChanges = true
		if (!state.activeCharacter.skills.languages.includes(languageName)) {
			state.activeCharacter.skills.languages.push(languageName)
		}
	},

	removeLanguage: (
		state: CharacterSheetReducerState,
		action: PayloadAction<string>,
	) => {
		const languageName = action.payload
		state.unsavedChanges = true
		// Prevent removal of Tradespeak (default language)
		if (languageName !== 'Tradespeak') {
			state.activeCharacter.skills.languages =
				state.activeCharacter.skills.languages.filter((l) => l !== languageName)
		}
	},

	deleteSkill: (
		state: CharacterSheetReducerState,
		action: PayloadAction<Skill>,
	) => {
		state.unsavedChanges = true
		state.activeCharacter.skills.skills =
			state.activeCharacter.skills.skills.filter(
				(s) => s.id !== action.payload.id,
			)
	},

	reorderSkill: (
		state: CharacterSheetReducerState,
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

	addNewAbility: (
		state: CharacterSheetReducerState,
		action?: PayloadAction<{ tag?: AbilityTag }>,
	) => {
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

	importAbilities: (
		state: CharacterSheetReducerState,
		action: PayloadAction<Partial<Ability>[]>,
	) => {
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
		state: CharacterSheetReducerState,
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

	deleteAbility: (
		state: CharacterSheetReducerState,
		action: PayloadAction<Ability>,
	) => {
		state.unsavedChanges = true
		state.activeCharacter.skills.abilities =
			state.activeCharacter.skills.abilities.filter(
				(a) => a.id !== action.payload.id,
			)
	},

	reorderAbility: (
		state: CharacterSheetReducerState,
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

	toggleAbilityCategoryVisibility: (
		state: CharacterSheetReducerState,
		action: PayloadAction<AbilityTag>,
	) => {
		const category = action.payload
		state.unsavedChanges = true
		const currentVisibility =
			state.activeCharacter.skills.abilityCategoryVisibility?.[category] ?? true
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
}

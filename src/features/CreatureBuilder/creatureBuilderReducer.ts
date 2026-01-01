import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
	CreatureAttack,
	CreatureAbility,
	CreatureCategory,
	CreatureSkill,
} from '../../types/CreatureBuilder'

export type CreatureBuilderState = {
	// Basic creature properties
	tier: number
	category: CreatureCategory
	size: string
	type: string
	subtype: string
	archetype: string
	name: string

	// Custom overrides
	customHP: number | null
	customAV: number | null
	customArmorType: 'light' | 'heavy' | null
	customStr: string | null
	customAgi: string | null
	customSpi: string | null
	customMnd: string | null
	customParry: number | null
	customDodge: number | null
	customResist: number | null

	// Arrays for skills and traits
	skills: CreatureSkill[]
	immunities: string[]
	resistances: string[]
	weaknesses: string[]
	attacks: CreatureAttack[]
	abilities: CreatureAbility[]
}

const initialState: CreatureBuilderState = {
	tier: 0,
	category: 'Basic',
	size: 'Medium',
	type: 'Humanoid',
	subtype: '',
	archetype: 'Standard',
	name: '',
	customHP: null,
	customAV: null,
	customArmorType: null,
	customStr: null,
	customAgi: null,
	customSpi: null,
	customMnd: null,
	customParry: null,
	customDodge: null,
	customResist: null,
	skills: [],
	immunities: [],
	resistances: [],
	weaknesses: [],
	attacks: [],
	abilities: [],
}

export const {
	reducer: creatureBuilderReducer,
	actions: creatureBuilderActions,
} = createSlice({
	name: 'creatureBuilder',
	initialState,
	reducers: {
		setTier: (state, action: PayloadAction<number>) => {
			state.tier = action.payload
		},
		setCategory: (state, action: PayloadAction<CreatureCategory>) => {
			state.category = action.payload
		},
		setSize: (state, action: PayloadAction<string>) => {
			state.size = action.payload
		},
		setType: (state, action: PayloadAction<string>) => {
			state.type = action.payload
			// Reset subtype when type changes
			state.subtype = ''
		},
		setSubtype: (state, action: PayloadAction<string>) => {
			state.subtype = action.payload
		},
		setArchetype: (state, action: PayloadAction<string>) => {
			state.archetype = action.payload
		},
		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload
		},
		setCustomHP: (state, action: PayloadAction<number | null>) => {
			state.customHP = action.payload
		},
		setCustomAV: (state, action: PayloadAction<number | null>) => {
			state.customAV = action.payload
		},
		setCustomArmorType: (
			state,
			action: PayloadAction<'light' | 'heavy' | null>,
		) => {
			state.customArmorType = action.payload
		},
		setCustomAttribute: (
			state,
			action: PayloadAction<{
				attr: 'str' | 'agi' | 'spi' | 'mnd'
				value: string | null
			}>,
		) => {
			const { attr, value } = action.payload
			switch (attr) {
				case 'str':
					state.customStr = value
					break
				case 'agi':
					state.customAgi = value
					break
				case 'spi':
					state.customSpi = value
					break
				case 'mnd':
					state.customMnd = value
					break
			}
		},
		setCustomDefense: (
			state,
			action: PayloadAction<{
				defense: 'parry' | 'dodge' | 'resist'
				value: number | null
			}>,
		) => {
			const { defense, value } = action.payload
			switch (defense) {
				case 'parry':
					state.customParry = value
					break
				case 'dodge':
					state.customDodge = value
					break
				case 'resist':
					state.customResist = value
					break
			}
		},
		setSkills: (state, action: PayloadAction<CreatureSkill[]>) => {
			state.skills = action.payload
		},
		setImmunities: (state, action: PayloadAction<string[]>) => {
			state.immunities = action.payload
		},
		setResistances: (state, action: PayloadAction<string[]>) => {
			state.resistances = action.payload
		},
		setWeaknesses: (state, action: PayloadAction<string[]>) => {
			state.weaknesses = action.payload
		},
		setAttacks: (state, action: PayloadAction<CreatureAttack[]>) => {
			state.attacks = action.payload
		},
		setAbilities: (state, action: PayloadAction<CreatureAbility[]>) => {
			state.abilities = action.payload
		},
		resetBuilder: () => initialState,
	},
})

import { Character, CharacterDocument } from './types/Character'

export const createInitialCharacter = (name: string): Character => ({
	personal: {
		name,
		folk: '',
		upbringing: '',
		background: '',
		height: '',
		weight: '',
		age: '',
		description: '',
		motivation: '',
		allies: [],
		contacts: [],
		rivals: [],
		notes: '',
	},
	statistics: {
		health: {
			total: 0,
			temp: 0,
			current: 0,
			woundOne: false,
			woundTwo: false,
			woundThree: false,
		},
		av: {
			armor: 0,
			helmet: 0,
			shield: 0,
			other: 0,
		},
		strength: {
			value: '',
			wounded: false,
		},
		agility: {
			value: '',
			wounded: false,
		},
		spirit: {
			value: '',
			wounded: false,
		},
		mind: {
			value: '',
			wounded: false,
		},
		parry: 0,
		dodge: 0,
		resist: 0,
		resolve: 0,
	},
	skills: {
		xp: {
			total: 0,
			spend: 0,
		},
		skills: [],
		abilities: [],
	},
	items: {
		coins: 0,
		encumbrance: {
			encumberedAt: 0,
			overencumberedAt: 0,
			currentLoad: 0,
		},
		weapons: [],
		equipment: {},
		items: [],
	},
	spells: {
		magicSkill: '',
		specialization: '',
		focus: {
			total: 0,
			current: 0,
		},
		spells: [],
	},
})

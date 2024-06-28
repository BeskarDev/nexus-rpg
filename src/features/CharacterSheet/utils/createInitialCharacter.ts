import { Character } from '../types/Character'

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
			woundOne: {
				injury: false,
				fatigueOne: false,
				fatigueTwo: false,
			},
			woundTwo: {
				injury: false,
				fatigueOne: false,
				fatigueTwo: false,
			},
			woundThree: {
				injury: false,
				fatigueOne: false,
				fatigueTwo: false,
			},
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
		equipment: {
			head: {
				name: '',
				properties: '',
				cost: 0,
				load: 0,
			},
			neck: {
				name: '',
				properties: '',
				cost: 0,
				load: 0,
			},
			back: {
				name: '',
				properties: '',
				cost: 0,
				load: 0,
			},
			body: {
				name: '',
				properties: '',
				cost: 0,
				load: 0,
			},
			hands: {
				name: '',
				properties: '',
				cost: 0,
				load: 0,
			},
			rings: [
				{
					name: '',
					properties: '',
					cost: 0,
					load: 0,
				},
				{
					name: '',
					properties: '',
					cost: 0,
					load: 0,
				},
				{
					name: '',
					properties: '',
					cost: 0,
					load: 0,
				},
			],
			waist: {
				name: '',
				properties: '',
				cost: 0,
				load: 0,
			},
			feet: {
				name: '',
				properties: '',
				cost: 0,
				load: 0,
			},
		},
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

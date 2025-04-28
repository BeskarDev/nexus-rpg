import { Character } from '../../../types/Character'

export const createInitialCharacter = (name: string, playerName: string): Character => ({
	personal: {
		name,
    playerName,
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
			value: 6,
			wounded: false,
		},
		agility: {
			value: 6,
			wounded: false,
		},
		spirit: {
			value: 6,
			wounded: false,
		},
		mind: {
			value: 6,
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
		items: [],
	},
	spells: {
		magicSkill: '',
		specialization: '',
		focus: {
			total: 0,
			current: 0,
		},
    spellCatalystDamage: 0,
		spells: [],
	},
})

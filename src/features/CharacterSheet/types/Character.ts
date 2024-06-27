import { DocumentData, DocumentReference } from 'firebase/firestore'

export type CharacterDocument = {
	docRef: DocumentReference<DocumentData, DocumentData>
	docId: string
} & Character

export type Character = {
	personal: Personal
	statistics: Statistics
	skills: Skills
	items: Items
	spells: Spells
}
export type Personal = {
	name: string
	folk: string
	upbringing: string
	background: string
	height: string
	weight: string
	age: string
	description: string
	motivation: string
	allies: string[]
	contacts: string[]
	rivals: string[]
	notes: string
}

export type Statistics = {
	health: {
		total: number
		temp: number
		current: number
		woundOne: boolean
		woundTwo: boolean
		woundThree: boolean
	}
	av: {
		armor: number
		helmet: number
		shield: number
		other: number
	}
	strength: Attribute
	agility: Attribute
	spirit: Attribute
	mind: Attribute
	parry: number
	dodge: number
	resist: number
	resolve: number
}

export type Attribute = {
	value: string
	wounded: boolean
}

export type Skills = {
	xp: {
		total: number
		spend: number
	}
	skills: Skill[]
	abilities: string[]
}

export type Skill = {
	name: string
	rank: number
	xp: number
}

export type Items = {
	coins: number
	encumbrance: {
		encumberedAt: number
		overencumberedAt: number
		currentLoad: number
	}
	weapons: Weapon[]
	equipment: {
		head?: Equipment
		neck?: Equipment
		back?: Equipment
		body?: Equipment
		hands?: Equipment
		rings?: Equipment[]
		waist?: Equipment
		feet?: Equipment
	}
	items: Item[]
}

export type Weapon = {
	name: string
	damage: {
		base: number
		weapon: number
		other: string
	}
	properties: string
	cost: number
	load: number
}

export type Equipment = {
	name: string
	properties: string
	cost: number
	load: number
}

export type Item = Equipment & {
	amount: number
}

export type Spells = {
	magicSkill: string
	specialization: string
	focus: {
		total: number
		current: number
	}
	spells: Spell[]
}

export type Spell = {
	name: string
	rank: number
	cost: number
	target: string
	range: string
	properties: string
	effect: string
}

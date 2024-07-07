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
	allies: Relation[]
	contacts: Relation[]
	rivals: Relation[]
	notes: string
}

export type Relation = {
	id: string
	description: string
}

export type Statistics = {
	health: {
		total: number
		temp: number
		current: number
		woundOne: Wound
		woundTwo: Wound
		woundThree: Wound
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

export type Wound = {
	injury: boolean
	fatigueOne: boolean
	fatigueTwo: boolean
}

export type Attribute = {
	value: AttributeType
	wounded: boolean
}

export const attributeTypeArray = [4, 6, 8, 10, 12] as const
export type AttributeType = (typeof attributeTypeArray)[number]

export type Skills = {
	xp: {
		total: number
		spend: number
	}
	skills: Skill[]
	abilities: Ability[]
}

export type Skill = {
	id: string
	name: string
	rank: number
	xp: number
}

export type Ability = {
	id: string
	description: string
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
	id: string
	name: string
	damage: Damage
	properties: string
	cost: number
	load: number
}

export type Damage = {
	base: number
	weapon: number
	otherWeak: number
	otherStrong: number
	otherCritical: number
	type: DamageType
}

export const damageTypeArray = [
	'acid',
	'blast',
	'fire',
	'frost',
	'lighting',
	'necrotic',
	'psychic',
	'physical',
	'poison',
	'radiant',
] as const
export type DamageType = (typeof damageTypeArray)[number]

export type Equipment = {
	name: string
	properties: string
	cost: number
	load: number
}

export type Item = Equipment & {
	id: string
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
	id: string
	name: string
	rank: number
	cost: number
	target: string
	range: string
	properties: string
	damage: Damage
	effect: string
}

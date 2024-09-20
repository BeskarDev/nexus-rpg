import { DocumentData, DocumentReference } from 'firebase/firestore'

export type CharacterDocument = {
	docRef: DocumentReference<DocumentData, DocumentData>
	docId: string
	collectionId: string
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
	title: string
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
	description: string
	cost: number
	load: number
}

export type Damage = {
	base: BaseDamageType
	weapon: number
	other: number
	otherWeak: number
	otherStrong: number
	otherCritical: number
	type: DamageType
}

export const baseDamageTypeArray = ['', 'STR', 'AGI', 'SPI', 'MND'] as const
export type BaseDamageType = (typeof baseDamageTypeArray)[number]

export const damageTypeArray = [
	'acid',
	'blast',
	'fire',
	'frost',
	'lightning',
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
	description: string
	slot: EquipmentSlotType
	cost: number
	load: number
}

export const equipmentSlotTypeArray = [
	'',
	'head',
	'neck',
	'back',
	'body',
	'hands',
	'ring (1)',
	'ring (2)',
	'ring (3)',
	'waist',
	'feet',
] as const
export type EquipmentSlotType = (typeof equipmentSlotTypeArray)[number]

export type Item = Equipment & {
	id: string
	container: ContainerType
	amount: number
}

export const containerTypeArray = ['', 'worn', 'quick', 'backpack'] as const
export type ContainerType = (typeof containerTypeArray)[number]

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
	target: TargetType
	range: RangeType
	properties: string
	damage: Damage
	effect: string
}

export const targetTypeArray = [
	'',
	'Parry',
	'Dodge',
	'Resist',
	'special',
	'8',
	'10',
	'12',
	'14',
] as const
export type TargetType = (typeof targetTypeArray)[number]

export const rangeTypeArray = [
	'',
	'self',
	'touch',
	'melee',
	'close',
	'short',
	'medium',
	'long',
	'very long',
	'extreme',
] as const
export type RangeType = (typeof rangeTypeArray)[number]

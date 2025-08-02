import { DocumentData, DocumentReference } from 'firebase/firestore'
import { AbilityTag } from './AbilityTag'
import { ActionType } from './ActionType'
import { ItemLocation } from './ItemLocation'

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
	companions: Companion[]
}
export type Personal = {
	name: string
  playerName: string
	folk: string
	upbringing: string
	background: string
	height: string
	weight: string
	age: string
	description: string
	motivation: string
	profilePicture?: string
	allies: Relation[]
	contacts: Relation[]
	rivals: Relation[]
	notes: string
}

export type Relation = {
	id: string
	description: string
}

export type Companion = {
	id: string
	name: string
	markdown: string
	currentHP: number
	maxHP: number
	wounded: boolean
}

export type Statistics = {
	health: {
		total: number
		temp: number
		current: number
	}
	fatigue: {
		current: number
		max: number
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
	statusEffects: StatusEffect[]
}

export type Attribute = {
	value: AttributeType
	wounded: boolean
}

export const attributeTypeArray = [4, 6, 8, 10, 12] as const
export type AttributeType = (typeof attributeTypeArray)[number]

export type StatusEffect = {
	id: string
	name: StatusEffectType
	active: boolean
	duration?: number
	narrativeDuration?: 'short' | 'medium' | 'long'
	intensity?: number
}

export const statusEffectTypeArray = [
	'bleeding',
	'blinded',
	'burning',
	'charmed',
	'confused',
	'dazed',
	'deafened',
	'deprived',
	'distracted',
	'frightened',
	'grappled',
	'hidden',
	'marked',
	'paralyzed',
	'poisoned',
	'prone',
	'pushed',
	'restrained',
	'silenced',
	'slowed',
	'staggered',
	'stunned',
	'suffocating',
	'unconscious',
] as const
export type StatusEffectType = (typeof statusEffectTypeArray)[number]

export type Skills = {
	xp: {
		total: number
		spend: number
	}
	skills: Skill[]
	abilities: Ability[]
	abilityCategoryVisibility?: Record<AbilityTag, boolean>
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
	tag: AbilityTag
	actionType?: ActionType
	rank?: number // For talents: 1, 2, or 3
}

export type Items = {
	coins: number
	encumbrance: {
		encumberedAt: number
		overencumberedAt: number
    carryModifier: number
		currentLoad: number
	}
	weapons: Weapon[]
	items: Item[]
	itemLocationVisibility?: Record<ItemLocation, boolean>
}

export type Weapon = {
	id: string
	name: string
	damage: Damage
	properties: string
	description: string
	cost: number
	load: number
	location: ItemLocation
	mountInfo?: string
	storageInfo?: string
}

export type Damage = {
	base: BaseDamageType
	weapon: number
	other: number
	otherWeak: number
	otherStrong: number
	otherCritical: number
	type: DamageType
	staticDamage?: boolean
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
	location: ItemLocation
	mountInfo?: string
	storageInfo?: string
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
  spellCatalystDamage: number
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
  dealsDamage: boolean
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

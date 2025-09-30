// Creature builder types
export interface CreatureTier {
	tier: number
	hp: number
	avLight: number
	avHeavy: number
	defense: number
	maxAttribute: string
	primarySkillRank: number
	secondarySkillRank: number
	weaponDamage: number
	abilityDifficulty: number
}

export interface CreatureArchetype {
	name: string
	description: string
	hpModifier: number
	armorType: 'light' | 'heavy'
	parryModifier: number
	dodgeModifier: number
	resistModifier: number
	damageModifier: number
	movementModifier: number
}

export interface CreatureSize {
	name: string
	modifier: number
	avModifier: number
	parryModifier: number
	dodgeModifier: number
	description: string
}

export type CreatureCategory = 'Basic' | 'Elite' | 'Lord'

export interface BuiltCreature {
	name: string
	tier: number
	category: CreatureCategory
	size: string
	type: string
	archetype: string
	hp: string // Can be "40" or "2×40" for Elite/Lord
	av: string
	str: string
	agi: string
	spi: string
	mnd: string
	parry: number
	dodge: number
	resist: number
	skills: string[]
	immunities: string[]
	resistances: string[]
	weaknesses: string[]
	attacks: CreatureAttack[]
	abilities: CreatureAbility[]
	// Additional metadata for validation
	baseHp: number
	baseTier: number
}

export interface CreatureAttack {
	name: string
	properties: string[]
	damage: string
	description?: string
}

export interface CreatureAbility {
	name: string
	description: string
	recharge?: string
}

export interface CreatureBuilderState {
	tier: number | null
	category: CreatureCategory
	size: string
	type: string
	archetype: string
	name: string
	// Custom adjustments
	customHP: number | null
	customAV: number | null
	customStr: string | null
	customAgi: string | null
	customSpi: string | null
	customMnd: string | null
	customParry: number | null
	customDodge: number | null
	customResist: number | null
	// Additional features
	skills: string[]
	immunities: string[]
	resistances: string[]
	weaknesses: string[]
	attacks: CreatureAttack[]
	abilities: CreatureAbility[]
}

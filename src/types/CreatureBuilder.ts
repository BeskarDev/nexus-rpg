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
	attributePriority: ('str' | 'agi' | 'spi' | 'mnd')[]
	attributeModifiers: {
		str: number
		agi: number
		spi: number
		mnd: number
	}
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
	subtype: string
	archetype: string
	hp: string // Can be "40" or "2×40" for Elite/Lord
	av: string
	armorType: 'light' | 'heavy'
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
	weaponDamage?: number
	damageType?: string
	baseAttribute?: string
	description?: string
}

export interface CreatureAbility {
	name: string
	description: string
	actionType?: string
	properties?: string
}

export interface CreatureSkill {
	name: string
	rank: number
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
	customArmorType: 'light' | 'heavy' | null
	customStr: string | null
	customAgi: string | null
	customSpi: string | null
	customMnd: string | null
	customParry: number | null
	customDodge: number | null
	customResist: number | null
	// Additional features
	skills: CreatureSkill[]
	immunities: string[]
	resistances: string[]
	weaknesses: string[]
	attacks: CreatureAttack[]
	abilities: CreatureAbility[]
}

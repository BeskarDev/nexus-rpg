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
	/** Half weapon damage, rounded up. The AV-ignoring secondary instance a creature
	 * may carry as a design channel (not a chassis line — it applies per creature). */
	secondaryDamage: number
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

// ── Library and defaults types ─────────────────────────────────────────────

export interface AttackTemplate {
	id: string
	name: string
	/**
	 * How hard this attack hits RELATIVE to the tier's baseline weapon damage, not
	 * a damage figure.
	 *
	 * A literal here (it used to read `"8/12/16"`) freezes the entry at whatever
	 * tier it was written for, so a tier-9 dragon picked up a tier-2 bite. The
	 * figure is computed from the creature's tier when the attack is rendered.
	 */
	weaponDamage: number
	/** Whose die adds its base damage: `STR`, `AGI`, `SPI`, `MND`. Omit for an
	 *  attack that is pure weapon damage, such as a breath weapon. */
	baseAttribute?: string
	damageType: string
	description: string
	tags: string[]
	forTypes?: string[]
}

export interface AbilityTemplate {
	id: string
	name: string
	description: string
	actionType: string
	tags: string[]
	forTypes?: string[]
}

export interface CreatureTypeDefaults {
	type: string
	subtype?: string
	attacks?: string[]
	abilities?: string[]
}

export interface CreatureBuilderState {
	tier: number | null
	category: CreatureCategory
	size: string
	type: string
	subtype: string
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

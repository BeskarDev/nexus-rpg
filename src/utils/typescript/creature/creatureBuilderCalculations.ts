import creatureTiers from '../../data/json/creature-tiers.json'
import creatureArchetypes from '../../data/json/creature-archetypes.json'
import creatureSizes from '../../data/json/creature-sizes.json'
import { modifyDie } from '../companion/companionCalculations'
import {
	CreatureTier,
	CreatureArchetype,
	CreatureSize,
	CreatureCategory,
	BuiltCreature,
	CreatureBuilderState,
} from 'src/types/CreatureBuilder'

const tiers = creatureTiers as CreatureTier[]
const archetypes = creatureArchetypes as CreatureArchetype[]
const sizes = creatureSizes as CreatureSize[]

export const TIER_NAMES: Record<number, string> = {
	0: 'Harmless',
	1: 'Capable',
	2: 'Dangerous',
	3: 'Ferocious',
	4: 'Monstrous',
	5: 'Primeval',
	6: 'Ancient',
	7: 'Legendary',
	8: 'Mythic',
	9: 'Divine',
	10: 'Godlike',
}

export function getTierData(tier: number): CreatureTier | null {
	return tiers.find((t) => t.tier === tier) || null
}

export function getArchetypeData(name: string): CreatureArchetype | null {
	return archetypes.find((a) => a.name === name) || null
}

export function getSizeData(name: string): CreatureSize | null {
	return sizes.find((s) => s.name === name) || null
}

export function getAvailableSizes(): string[] {
	return sizes.map((s) => s.name)
}

export function getAvailableArchetypes(): string[] {
	return archetypes.map((a) => a.name)
}

/**
 * Calculate HP based on tier, archetype, and category
 */
export function calculateHP(
	tier: number,
	archetype: string,
	category: CreatureCategory,
	customHP?: number | null,
): { display: string; base: number } {
	if (customHP !== null && customHP !== undefined) {
		// Use custom HP
		const base = customHP
		const display =
			category === 'Elite'
				? `2×${base}`
				: category === 'Lord'
					? `3×${base}`
					: `${base}`
		return { display, base }
	}

	const tierData = getTierData(tier)
	if (!tierData) return { display: '0', base: 0 }

	const archetypeData = getArchetypeData(archetype)
	const hpModifier = archetypeData?.hpModifier || 0

	// Get HP from modified tier
	const modifiedTier = Math.max(0, Math.min(10, tier + hpModifier))
	const modifiedTierData = getTierData(modifiedTier)
	const baseHP = modifiedTierData?.hp || tierData.hp

	const display =
		category === 'Elite'
			? `2×${baseHP}`
			: category === 'Lord'
				? `3×${baseHP}`
				: `${baseHP}`

	return { display, base: baseHP }
}

/**
 * Calculate AV based on tier, archetype, size, and armor type
 */
export function calculateAV(
	tier: number,
	archetype: string,
	size: string,
	customAV?: number | null,
	customArmorType?: 'light' | 'heavy' | null,
): string {
	if (customAV !== null && customAV !== undefined) {
		return `${customAV}`
	}

	const tierData = getTierData(tier)
	if (!tierData) return '0'

	const archetypeData = getArchetypeData(archetype)
	const sizeData = getSizeData(size)

	// Use custom armor type if provided, otherwise use archetype default
	const armorType = customArmorType ?? archetypeData?.armorType ?? 'light'
	const isHeavyArmor = armorType === 'heavy'
	const baseAV = isHeavyArmor ? tierData.avHeavy : tierData.avLight
	const sizeModifier = sizeData?.avModifier || 0

	const finalAV = Math.max(0, baseAV + sizeModifier)
	return `${finalAV}`
}

/**
 * Calculate defense values (Parry, Dodge, Resist) based on tier, archetype, and size
 */
export function calculateDefense(
	tier: number,
	archetype: string,
	size: string,
	defenseType: 'parry' | 'dodge' | 'resist',
	customValue?: number | null,
): number {
	if (customValue !== null && customValue !== undefined) {
		return customValue
	}

	const tierData = getTierData(tier)
	if (!tierData) return 6

	const baseDefense = tierData.defense
	const archetypeData = getArchetypeData(archetype)
	const sizeData = getSizeData(size)

	let modifier = 0
	if (defenseType === 'parry') {
		modifier =
			(archetypeData?.parryModifier || 0) + (sizeData?.parryModifier || 0)
	} else if (defenseType === 'dodge') {
		modifier =
			(archetypeData?.dodgeModifier || 0) + (sizeData?.dodgeModifier || 0)
	} else if (defenseType === 'resist') {
		modifier = archetypeData?.resistModifier || 0
	}

	// Defense should stay within 2 tiers of base
	const modifiedTier = Math.max(0, Math.min(10, tier + modifier))
	const modifiedTierData = getTierData(modifiedTier)

	return modifiedTierData?.defense || baseDefense
}

/**
 * Get the max attribute die for a tier
 */
export function getMaxAttribute(tier: number): string {
	const tierData = getTierData(tier)
	return tierData?.maxAttribute || 'd6'
}

/**
 * Calculate attribute spread based on archetype and type
 * Returns attribute values with archetype-specific modifiers applied
 * Special logic: Animal type reduces MND to d4-2, d4-1, or d4 based on archetype modifier
 */
export function calculateAttributes(
	tier: number,
	archetype: string,
	type?: string,
	customStr?: string | null,
	customAgi?: string | null,
	customSpi?: string | null,
	customMnd?: string | null,
): {
	str: string
	agi: string
	spi: string
	mnd: string
} {
	// If all custom values are provided, use them
	if (customStr && customAgi && customSpi && customMnd) {
		return {
			str: customStr,
			agi: customAgi,
			spi: customSpi,
			mnd: customMnd,
		}
	}

	const archetypeData = getArchetypeData(archetype)

	// Default to Standard archetype if not found
	const modifiers = archetypeData?.attributeModifiers || {
		str: 0,
		agi: 0,
		spi: 0,
		mnd: 0,
	}

	// Get base attribute for tier
	const baseAttribute = getMaxAttribute(tier)

	// Calculate MND with special type-based logic
	let mndValue: string
	if (type?.toLowerCase() === 'animal' && !customMnd) {
		// Animal type: MND has slow progression based on tier
		// Base MND depends on archetype modifier, then tier adds progression
		const mndModifier = modifiers.mnd
		let baseMnd: string

		// Determine base MND from archetype modifier
		if (mndModifier <= -2) {
			baseMnd = 'd4-2'
		} else if (mndModifier === -1) {
			baseMnd = 'd4-1'
		} else {
			baseMnd = 'd4'
		}

		// Add slow tier-based progression: +1 die step per 3 tiers
		const tierBonus = Math.floor(tier / 3)
		mndValue = modifyDie(baseMnd, tierBonus.toString())
	} else {
		mndValue = customMnd || modifyDie(baseAttribute, modifiers.mnd.toString())
	}

	return {
		str: customStr || modifyDie(baseAttribute, modifiers.str.toString()),
		agi: customAgi || modifyDie(baseAttribute, modifiers.agi.toString()),
		spi: customSpi || modifyDie(baseAttribute, modifiers.spi.toString()),
		mnd: mndValue,
	}
}

/**
 * Get weapon damage for a tier with archetype modifier
 */
export function getWeaponDamage(tier: number, archetype: string): number {
	const tierData = getTierData(tier)
	if (!tierData) return 2

	const archetypeData = getArchetypeData(archetype)
	const damageModifier = archetypeData?.damageModifier || 0

	// Get damage from modified tier
	const modifiedTier = Math.max(0, Math.min(10, tier + damageModifier))
	const modifiedTierData = getTierData(modifiedTier)

	return modifiedTierData?.weaponDamage || tierData.weaponDamage
}

/**
 * Get ability difficulty for a tier
 */
export function getAbilityDifficulty(tier: number): number {
	const tierData = getTierData(tier)
	return tierData?.abilityDifficulty || 6
}

/**
 * Get skill ranks for a tier
 */
export function getSkillRanks(tier: number): {
	primary: number
	secondary: number
} {
	const tierData = getTierData(tier)
	if (!tierData) return { primary: 0, secondary: 1 }

	return {
		primary: tierData.primarySkillRank,
		secondary: tierData.secondarySkillRank,
	}
}

/**
 * Validate if stats are appropriate for the tier
 */
export function validateTier(
	tier: number,
	hp: number,
	av: number,
	parry: number,
	dodge: number,
	resist: number,
	armorType?: 'light' | 'heavy',
): {
	valid: boolean
	warnings: string[]
} {
	const warnings: string[] = []
	const tierData = getTierData(tier)

	if (!tierData) {
		return { valid: false, warnings: ['Invalid tier'] }
	}

	// Check HP range (within 2 tiers)
	const minTier = Math.max(0, tier - 2)
	const maxTier = Math.min(10, tier + 2)
	const minHP = getTierData(minTier)?.hp || 0
	const maxHP = getTierData(maxTier)?.hp || 100

	if (hp < minHP || hp > maxHP) {
		warnings.push(
			`HP (${hp}) is outside expected range (${minHP}-${maxHP}) for Tier ${tier}`,
		)
	}

	// Check AV range based on armor type
	const isHeavy = armorType === 'heavy'
	const minAV = isHeavy
		? getTierData(minTier)?.avHeavy || 1
		: getTierData(minTier)?.avLight || 0
	const maxAV = isHeavy
		? getTierData(maxTier)?.avHeavy || 20
		: getTierData(maxTier)?.avLight || 10

	if (av < minAV || av > maxAV) {
		warnings.push(
			`AV (${av}) is outside expected range (${minAV}-${maxAV}) for Tier ${tier} with ${isHeavy ? 'heavy' : 'light'} armor`,
		)
	}

	// Check defense average (should be close to tier defense)
	const avgDefense = Math.round((parry + dodge + resist) / 3)
	const expectedDefense = tierData.defense
	const minDefense = getTierData(minTier)?.defense || 6
	const maxDefense = getTierData(maxTier)?.defense || 16

	if (avgDefense < minDefense || avgDefense > maxDefense) {
		warnings.push(
			`Average defense (${avgDefense}) is outside expected range (${minDefense}-${maxDefense}) for Tier ${tier}`,
		)
	}

	return {
		valid: warnings.length === 0,
		warnings,
	}
}

/**
 * Build a complete creature from builder state
 */
export function buildCreature(
	state: CreatureBuilderState,
): BuiltCreature | null {
	if (state.tier === null) return null

	const hp = calculateHP(
		state.tier,
		state.archetype,
		state.category,
		state.customHP,
	)
	const av = calculateAV(
		state.tier,
		state.archetype,
		state.size,
		state.customAV,
		state.customArmorType,
	)

	// Determine final armor type
	const archetypeData = getArchetypeData(state.archetype)
	const armorType = state.customArmorType ?? archetypeData?.armorType ?? 'light'

	const parry = calculateDefense(
		state.tier,
		state.archetype,
		state.size,
		'parry',
		state.customParry,
	)
	const dodge = calculateDefense(
		state.tier,
		state.archetype,
		state.size,
		'dodge',
		state.customDodge,
	)
	const resist = calculateDefense(
		state.tier,
		state.archetype,
		state.size,
		'resist',
		state.customResist,
	)

	const attributes = calculateAttributes(
		state.tier,
		state.archetype,
		state.type,
		state.customStr,
		state.customAgi,
		state.customSpi,
		state.customMnd,
	)

	// Format skills as strings with ranks
	const formattedSkills = state.skills.map(
		(skill) => `${skill.name} (${skill.rank})`,
	)

	return {
		name: state.name || 'Unnamed Creature',
		tier: state.tier,
		category: state.category,
		size: state.size,
		type: state.type,
		archetype: state.archetype,
		hp: hp.display,
		av,
		armorType,
		str: attributes.str,
		agi: attributes.agi,
		spi: attributes.spi,
		mnd: attributes.mnd,
		parry,
		dodge,
		resist,
		skills: formattedSkills,
		immunities: state.immunities,
		resistances: state.resistances,
		weaknesses: state.weaknesses,
		attacks: state.attacks,
		abilities: state.abilities,
		baseHp: hp.base,
		baseTier: state.tier,
	}
}

/**
 * Calculate base damage for an attack based on attribute and weapon damage
 */
export function calculateBaseDamage(attributeDie: string): number {
	const dieMap: Record<string, number> = {
		d4: 2,
		d6: 3,
		d8: 4,
		d10: 5,
		d12: 6,
		'd12+1': 7,
		'd12+2': 8,
	}
	return dieMap[attributeDie] || 3
}

/**
 * Format damage string for weak/strong/critical success
 */
export function formatDamageString(
	baseDamage: number,
	weaponDamage: number,
): string {
	const weak = baseDamage + weaponDamage
	const strong = baseDamage + 2 * weaponDamage
	const critical = baseDamage + 3 * weaponDamage

	return `${weak}/${strong}/${critical}`
}

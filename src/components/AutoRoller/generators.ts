import nameData from './data/nameData.json'
import spellData from './data/spellData.json'
import creatureData from './data/creatureData.json'
import challengeData from './data/challengeData.json'
import treasureData from './data/treasureData.json'

// Utility: pick random element from array
function pick<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)]
}

// Utility: roll a die (1 to n)
function rollDie(n: number): number {
	return Math.floor(Math.random() * n) + 1
}

// ===== NAMES =====

export const nameGroups = nameData.cultures.map((c) => ({
	id: `${c.folk}-${c.culture}`,
	label: `${c.folk} (${c.culture})`,
}))

function applyNamingPattern(
	pattern: string,
	parts: {
		prefix: string
		syllable2: string
		syllable3: string
		suffix: string
	},
): string {
	return pattern
		.replace('[Prefix]', parts.prefix.replace(/-$/, ''))
		.replace('[Syllable 2]', parts.syllable2.replace(/^-/, '').replace(/-$/, ''))
		.replace('[Syllable 3]', parts.syllable3.replace(/^-/, '').replace(/-$/, ''))
		.replace('[Suffix]', parts.suffix.replace(/^-/, ''))
		.replace(/\s*\+\s*/g, '')
}

function applyFamilyPattern(
	pattern: string,
	parts: {
		adjective1: string
		adjective2: string
		noun1: string
		noun2: string
	},
): string {
	return pattern
		.replace('[Adjective 1]', parts.adjective1)
		.replace('[Adjective 2]', parts.adjective2)
		.replace('[Noun 1]', parts.noun1)
		.replace('[Noun 2]', parts.noun2)
		.replace(/\s*\+\s*/g, '')
}

export function generateName(groupId: string): string {
	const culture = nameData.cultures.find(
		(c) => `${c.folk}-${c.culture}` === groupId,
	)
	if (!culture) return 'Unknown culture'

	// Roll personal name
	const personalPattern = pick(nameData.namingPatterns)
	const personalParts = pick(culture.personalNames)
	const personalName = applyNamingPattern(personalPattern, personalParts)

	// Roll family name
	const familyPattern = pick(nameData.familyNamePatterns)
	const familyParts = pick(culture.familyNames)
	const familyName = applyFamilyPattern(familyPattern, familyParts)

	return `${personalName} ${familyName}`
}

// ===== SPELLS =====

export const spellGroups = [
	...spellData.arcaneSchools.map((s) => ({
		id: `arcane-${s.name}`,
		label: `Arcane: ${s.name}`,
	})),
	...spellData.mysticTraditions.map((s) => ({
		id: `mystic-${s.name}`,
		label: `Mystic: ${s.name}`,
	})),
]

export function generateSpell(groupId: string): string {
	const [type, schoolName] = groupId.split('-')
	const school =
		type === 'arcane'
			? spellData.arcaneSchools.find((s) => s.name === schoolName)
			: spellData.mysticTraditions.find((s) => s.name === schoolName)

	if (!school) return 'Unknown school'

	// Roll spell components (each column independently)
	const formEntry = pick(school.entries)
	const adjEntry = pick(school.entries)
	const nounEntry = pick(school.entries)

	// Roll naming pattern
	const pattern = pick(spellData.namingPatterns)
	let name = pattern
		.replace('[Form]', formEntry.form)
		.replace('[Adjective]', adjEntry.adjective)
		.replace('[Noun]', nounEntry.noun)

	// Roll effect
	const effect = pick(spellData.effects)

	return `${name} — ${effect.effect} / ${effect.target} / ${effect.duration} / ${effect.range}`
}

// ===== CREATURES =====

export const creatureGroups = [
	{ id: 'random', label: 'Random Type' },
	...creatureData.types.map((t) => ({ id: t, label: t })),
]

export function generateCreature(groupId: string): string {
	const typeName =
		groupId === 'random' ? pick(creatureData.types) : groupId

	const details = creatureData.typeDetails[typeName] as
		| { shape: string; headAttribute: string; bodyAttribute: string; adaption: string }[]
		| undefined
	if (!details) return `${typeName} (no details available)`

	const detail = pick(details)
	const personality = pick(creatureData.personality)
	const attack = pick(creatureData.physicalAttack)
	const special = pick(creatureData.specialAttack)
	const defense = pick(creatureData.specialDefense)
	const ability = pick(creatureData.specialAbilities)

	const parts = [`${typeName}: ${detail.shape}`]
	if (detail.headAttribute) parts.push(detail.headAttribute)
	parts.push(detail.bodyAttribute)
	parts.push(detail.adaption)
	parts.push(`| ${personality.behavior}`)
	parts.push(`| Attack: ${attack.bodyPart} (${attack.attackMode})`)
	parts.push(`| Special: ${special.deliveryMethod} ${special.attackType}`)
	parts.push(`| Defense: ${defense.defenseMethod} (${defense.defenseType})`)
	parts.push(`| Ability: ${ability.trigger} → ${ability.action} ${ability.subject}`)

	return parts.join(', ')
}

// ===== CHALLENGES =====

export const challengeGroups = [
	{ id: 'puzzles', label: 'Puzzles & Riddles' },
	{ id: 'traps', label: 'Traps & Hazards' },
	{ id: 'combat', label: 'Combat Scenes' },
]

export function generateChallenge(groupId: string): string {
	if (groupId === 'puzzles') {
		const p = pick(challengeData.puzzles)
		return `${p.puzzleType}: ${p.coreElement} — ${p.interaction} / ${p.presentation} / ${p.feedback} / ${p.hints}`
	}
	if (groupId === 'traps') {
		const t = pick(challengeData.traps)
		return `${t.hazardType}: ${t.presentation} — ${t.warning} / ${t.avoidance}`
	}
	if (groupId === 'combat') {
		const c = pick(challengeData.combatScenes)
		return `${c.sceneType}: ${c.terrain} — ${c.objective} / ${c.twist}`
	}
	return 'Unknown challenge type'
}

// ===== TREASURE =====

export const treasureGroups = [
	{ id: 'any', label: 'Any Treasure' },
	{ id: 'valuable', label: 'Valuable' },
	{ id: 'utility', label: 'Utility' },
	{ id: 'wearable', label: 'Wearable' },
	{ id: 'armor', label: 'Armor / Shield' },
	{ id: 'weapon', label: 'Weapon / Spell Catalyst' },
]

function rollTreasureType(): string {
	const roll = rollDie(12)
	if (roll <= 6) return 'valuable'
	if (roll <= 9) return 'utility'
	if (roll === 10) return 'wearable'
	if (roll === 11) return 'armor'
	return 'weapon'
}

function generateValuable(): string {
	const type = pick(treasureData.valuables)
	const details = treasureData.valuableDetails[type] as
		| { form: string; detail: string }[]
		| undefined
	if (details && details.length > 0) {
		const d = pick(details)
		return `Valuable — ${type}: ${d.form}, ${d.detail}`
	}
	return `Valuable — ${type}`
}

function generateUtility(): string {
	const entry = pick(treasureData.utility)
	const type = entry.type
	const details = treasureData.utilityDetails[type] as string[] | undefined
	if (details && details.length > 0) {
		return `Utility — ${type}: ${pick(details)}`
	}
	return `Utility — ${type}`
}

function generateWearable(): string {
	const slot = pick(treasureData.wearableSlots)
	const desc = pick(treasureData.wearableDescription)
	return `Wearable — ${slot}: ${desc.ornament}, ${desc.style}, ${desc.material}`
}

function generateArmor(): string {
	const type = pick(treasureData.armorShield)
	const details = treasureData.armorDetails[type] as
		| { material: string; form: string; detail: string }[]
		| undefined
	if (details && details.length > 0) {
		const d = pick(details)
		return `Armor — ${type}: ${d.material}, ${d.form}, ${d.detail}`
	}
	return `Armor — ${type}`
}

function generateWeapon(): string {
	const type = pick(treasureData.weaponCatalyst)
	const details = treasureData.weaponDetails[type] as
		| { material: string; form: string; detail: string }[]
		| undefined
	if (details && details.length > 0) {
		const d = pick(details)
		return `Weapon — ${type}: ${d.material}, ${d.form}, ${d.detail}`
	}
	return `Weapon — ${type}`
}

export function generateTreasure(groupId: string): string {
	const category = groupId === 'any' ? rollTreasureType() : groupId

	switch (category) {
		case 'valuable':
			return generateValuable()
		case 'utility':
			return generateUtility()
		case 'wearable':
			return generateWearable()
		case 'armor':
			return generateArmor()
		case 'weapon':
			return generateWeapon()
		default:
			return 'Unknown treasure type'
	}
}

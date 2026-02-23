import nameData from './data/nameData.json'
import spellData from './data/spellData.json'
import creatureData from './data/creatureData.json'
import challengeData from './data/challengeData.json'
import treasureData from './data/treasureData.json'

// Type definitions for spell data
interface SpellEntry {
	form: string
	adjective: string
	noun: string
}

interface SpellSchool {
	name: string
	entries: SpellEntry[]
}

// Utility: pick random element from array
function pick<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)]
}

// Utility: roll a die (1 to n)
function rollDie(n: number): number {
	return Math.floor(Math.random() * n) + 1
}

// Utility: lowercase a string
function lc(s: string): string {
	return s.toLowerCase()
}

// Utility: capitalize first letter of a string
function capitalize(s: string): string {
	if (!s) return s
	return s.charAt(0).toUpperCase() + s.slice(1)
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
	const raw = pattern
		.replace('[Prefix]', parts.prefix.replace(/-$/, ''))
		.replace('[Syllable 2]', parts.syllable2.replace(/^-/, '').replace(/-$/, ''))
		.replace('[Syllable 3]', parts.syllable3.replace(/^-/, '').replace(/-$/, ''))
		.replace('[Suffix]', parts.suffix.replace(/^-/, ''))
		.replace(/\s*\+\s*/g, '')
	return capitalize(raw.toLowerCase())
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
	const raw = pattern
		.replace('[Adjective 1]', parts.adjective1)
		.replace('[Adjective 2]', parts.adjective2)
		.replace('[Noun 1]', parts.noun1)
		.replace('[Noun 2]', parts.noun2)
		.replace(/\s*\+\s*/g, '')
	return capitalize(raw.toLowerCase())
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
	{ id: 'arcane-any', label: 'Arcane: Any' },
	...spellData.arcaneSchools.map((s) => ({
		id: `arcane-${s.name}`,
		label: `Arcane: ${s.name}`,
	})),
	{ id: 'mystic-any', label: 'Mystic: Any' },
	...spellData.mysticTraditions.map((s) => ({
		id: `mystic-${s.name}`,
		label: `Mystic: ${s.name}`,
	})),
]

export function generateSpell(groupId: string): string {
	const [type, schoolName] = groupId.split('-')

	let school: SpellSchool | undefined
	if (schoolName === 'any') {
		const list =
			type === 'arcane'
				? spellData.arcaneSchools
				: spellData.mysticTraditions
		school = pick(list) as SpellSchool
	} else {
		school =
			type === 'arcane'
				? (spellData.arcaneSchools.find((s) => s.name === schoolName) as SpellSchool | undefined)
				: (spellData.mysticTraditions.find((s) => s.name === schoolName) as SpellSchool | undefined)
	}

	if (!school) return 'Unknown school'

	// Roll spell components (each column independently)
	const formEntry = pick(school.entries)
	const adjEntry = pick(school.entries)
	const nounEntry = pick(school.entries)

	// Roll naming pattern
	const pattern = pick(spellData.namingPatterns)
	const name = pattern
		.replace('[Form]', formEntry.form)
		.replace('[Adjective]', adjEntry.adjective)
		.replace('[Noun]', nounEntry.noun)

	// Roll effect
	const effect = pick(spellData.effects)

	return `${lc(name)} — effect: ${lc(effect.effect)} ${lc(effect.target)} (duration: ${lc(effect.duration)}, range: ${lc(effect.range)})`
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
	if (!details) return `${lc(typeName)} (no details available)`

	const detail = pick(details)
	const personality = pick(creatureData.personality)
	const attack = pick(creatureData.physicalAttack)
	const special = pick(creatureData.specialAttack)
	const defense = pick(creatureData.specialDefense)
	const ability = pick(creatureData.specialAbilities)

	const appearance = [lc(detail.shape)]
	if (detail.headAttribute) appearance.push(lc(detail.headAttribute))
	appearance.push(lc(detail.bodyAttribute))
	appearance.push(lc(detail.adaption))

	return `${lc(typeName)}: ${appearance.join(', ')} — behavior: ${lc(personality.behavior)}, attack: ${lc(attack.bodyPart)} (${lc(attack.attackMode)}), special: ${lc(special.deliveryMethod)} ${lc(special.attackType)}, defense: ${lc(defense.defenseMethod)} (${lc(defense.defenseType)}), ability: ${lc(ability.trigger)} → ${lc(ability.action)} ${lc(ability.subject)}`
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
		return `${lc(p.puzzleType)}: ${lc(p.coreElement)} — interaction: ${lc(p.interaction)}, presentation: ${lc(p.presentation)}, feedback: ${lc(p.feedback)}, hints: ${lc(p.hints)}`
	}
	if (groupId === 'traps') {
		const t = pick(challengeData.traps)
		return `${lc(t.hazardType)}: ${lc(t.presentation)} — warning: ${lc(t.warning)}, avoidance: ${lc(t.avoidance)}`
	}
	if (groupId === 'combat') {
		const c = pick(challengeData.combatScenes)
		return `${lc(c.sceneType)}: ${lc(c.terrain)} — objective: ${lc(c.objective)}, twist: ${lc(c.twist)}`
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
		const formEntry = pick(details)
		const detailEntry = pick(details)
		return `valuable — ${lc(type)}: ${lc(formEntry.form)}, ${lc(detailEntry.detail)}`
	}
	return `valuable — ${lc(type)}`
}

function generateUtility(): string {
	const entry = pick(treasureData.utility)
	const type = entry.type
	const details = treasureData.utilityDetails[type] as string[] | undefined
	if (details && details.length > 0) {
		return `utility — ${lc(type)}: ${lc(pick(details))}`
	}
	return `utility — ${lc(type)}`
}

function generateWearable(): string {
	const slot = pick(treasureData.wearableSlots)
	const ornamentEntry = pick(treasureData.wearableDescription)
	const styleEntry = pick(treasureData.wearableDescription)
	const materialEntry = pick(treasureData.wearableDescription)
	return `wearable — ${lc(slot)}: ornament: ${lc(ornamentEntry.ornament)}, style: ${lc(styleEntry.style)}, material: ${lc(materialEntry.material)}`
}

function generateArmor(): string {
	const type = pick(treasureData.armorShield)
	const details = treasureData.armorDetails[type] as
		| { material: string; form: string; detail: string }[]
		| undefined
	if (details && details.length > 0) {
		const materialEntry = pick(details)
		const formEntry = pick(details)
		const detailEntry = pick(details)
		return `armor — ${lc(type)}: material: ${lc(materialEntry.material)}, form: ${lc(formEntry.form)}, detail: ${lc(detailEntry.detail)}`
	}
	return `armor — ${lc(type)}`
}

function generateWeapon(): string {
	const type = pick(treasureData.weaponCatalyst)
	const details = treasureData.weaponDetails[type] as
		| { material: string; form: string; detail: string }[]
		| undefined
	if (details && details.length > 0) {
		const materialEntry = pick(details)
		const formEntry = pick(details)
		const detailEntry = pick(details)
		return `weapon — ${lc(type)}: material: ${lc(materialEntry.material)}, form: ${lc(formEntry.form)}, detail: ${lc(detailEntry.detail)}`
	}
	return `weapon — ${lc(type)}`
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

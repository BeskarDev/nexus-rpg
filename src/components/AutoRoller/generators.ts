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

// Utility: pick a specific field independently from a random row
function pickField<T, K extends keyof T>(arr: T[], field: K): T[K] {
	return pick(arr)[field]
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

interface NameParts {
	prefix: string
	syllable2: string
	syllable3: string
	suffix: string
}

function applyNamingPattern(
	pattern: string,
	names: NameParts[],
): string {
	// Roll each syllable column independently
	const prefix = pickField(names, 'prefix').replace(/-$/, '')
	const syllable2 = pickField(names, 'syllable2').replace(/^-/, '').replace(/-$/, '')
	const syllable3 = pickField(names, 'syllable3').replace(/^-/, '').replace(/-$/, '')
	const suffix = pickField(names, 'suffix').replace(/^-/, '')

	const raw = pattern
		.replace('[Prefix]', prefix)
		.replace('[Syllable 2]', syllable2)
		.replace('[Syllable 3]', syllable3)
		.replace('[Suffix]', suffix)
		.replace(/\s*\+\s*/g, '')
	return capitalize(raw.toLowerCase())
}

interface FamilyNameParts {
	adjective1: string
	adjective2: string
	noun1: string
	noun2: string
}

function applyFamilyPattern(
	pattern: string,
	names: FamilyNameParts[],
): string {
	// Roll each column independently
	const adjective1 = pickField(names, 'adjective1')
	const adjective2 = pickField(names, 'adjective2')
	const noun1 = pickField(names, 'noun1')
	const noun2 = pickField(names, 'noun2')

	const raw = pattern
		.replace('[Adjective 1]', adjective1)
		.replace('[Adjective 2]', adjective2)
		.replace('[Noun 1]', noun1)
		.replace('[Noun 2]', noun2)
		.replace(/\s*\+\s*/g, '')
	return capitalize(raw.toLowerCase())
}

export function generateName(groupId: string, useGerman = false): string {
	const culture = nameData.cultures.find(
		(c) => `${c.folk}-${c.culture}` === groupId,
	)
	if (!culture) return 'Unknown culture'

	// Roll personal name — each syllable column independently
	const personalPattern = pick(nameData.namingPatterns)
	const personalName = applyNamingPattern(personalPattern, culture.personalNames)

	// Roll family name — each column independently
	const familyPattern = pick(nameData.familyNamePatterns)
	const familySource = useGerman && culture.familyNamesDE
		? culture.familyNamesDE
		: culture.familyNames
	const familyName = applyFamilyPattern(familyPattern, familySource)

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
	const form = pickField(school.entries, 'form')
	const adjective = pickField(school.entries, 'adjective')
	const noun = pickField(school.entries, 'noun')

	// Roll naming pattern
	const pattern = pick(spellData.namingPatterns)
	const name = pattern
		.replace('[Form]', form)
		.replace('[Adjective]', adjective)
		.replace('[Noun]', noun)

	// Roll effect columns independently
	const effect = pickField(spellData.effects, 'effect')
	const target = pickField(spellData.effects, 'target')
	const duration = pickField(spellData.effects, 'duration')
	const range = pickField(spellData.effects, 'range')

	return `${lc(name)} — ${lc(effect)} targeting ${lc(target)} (duration: ${lc(duration)}, range: ${lc(range)})`
}

// ===== CREATURES =====

export const creatureGroups = [
	{ id: 'random', label: 'Random Type' },
	...creatureData.types.map((t) => ({ id: t, label: t })),
]

interface CreatureDetail {
	shape: string
	headAttribute: string
	bodyAttribute: string
	adaption: string
}

export function generateCreature(groupId: string): string {
	const typeName =
		groupId === 'random' ? pick(creatureData.types) : groupId

	const details = creatureData.typeDetails[typeName] as
		| CreatureDetail[]
		| undefined
	if (!details) return `${lc(typeName)} (no details available)`

	// Roll each column independently
	const shape = pickField(details, 'shape')
	const headAttribute = pickField(details, 'headAttribute')
	const bodyAttribute = pickField(details, 'bodyAttribute')
	const adaption = pickField(details, 'adaption')

	// Roll personality columns independently
	const behavior = pickField(creatureData.personality, 'behavior')

	// Roll attack columns independently
	const bodyPart = pickField(creatureData.physicalAttack, 'bodyPart')
	const attackMode = pickField(creatureData.physicalAttack, 'attackMode')

	// Roll special attack columns independently
	const deliveryMethod = pickField(creatureData.specialAttack, 'deliveryMethod')
	const attackType = pickField(creatureData.specialAttack, 'attackType')

	// Roll defense columns independently
	const defenseMethod = pickField(creatureData.specialDefense, 'defenseMethod')
	const defenseType = pickField(creatureData.specialDefense, 'defenseType')

	// Roll ability columns independently
	const trigger = pickField(creatureData.specialAbilities, 'trigger')
	const action = pickField(creatureData.specialAbilities, 'action')
	const subject = pickField(creatureData.specialAbilities, 'subject')

	const appearance = [lc(shape)]
	if (headAttribute) appearance.push(lc(headAttribute))
	appearance.push(lc(bodyAttribute))
	appearance.push(lc(adaption))

	return `${lc(typeName)} with ${appearance.join(', ')}. ${lc(behavior)}, attacks with ${lc(bodyPart)} (${lc(attackMode)}). special: ${lc(deliveryMethod)} ${lc(attackType)}. defense: ${lc(defenseMethod)} against ${lc(defenseType)}. ability: ${lc(trigger)} → ${lc(action)} ${lc(subject)}.`
}

// ===== CHALLENGES =====

export const challengeGroups = [
	{ id: 'puzzles', label: 'Puzzles & Riddles' },
	{ id: 'traps', label: 'Traps & Hazards' },
	{ id: 'combat', label: 'Combat Scenes' },
]

export function generateChallenge(groupId: string): string {
	if (groupId === 'puzzles') {
		// Roll each column independently
		const puzzleType = pickField(challengeData.puzzles, 'puzzleType')
		const coreElement = pickField(challengeData.puzzles, 'coreElement')
		const interaction = pickField(challengeData.puzzles, 'interaction')
		const presentation = pickField(challengeData.puzzles, 'presentation')
		const feedback = pickField(challengeData.puzzles, 'feedback')
		const hints = pickField(challengeData.puzzles, 'hints')
		return `${lc(puzzleType)} puzzle featuring ${lc(coreElement)}, interacted with by ${lc(interaction)}. presented as ${lc(presentation)} with ${lc(feedback)} as feedback. hints: ${lc(hints)}.`
	}
	if (groupId === 'traps') {
		// Roll each column independently
		const hazardType = pickField(challengeData.traps, 'hazardType')
		const presentation = pickField(challengeData.traps, 'presentation')
		const warning = pickField(challengeData.traps, 'warning')
		const avoidance = pickField(challengeData.traps, 'avoidance')
		return `${lc(hazardType)} trap disguised as ${lc(presentation)}. warning sign: ${lc(warning)}. avoided by: ${lc(avoidance)}.`
	}
	if (groupId === 'combat') {
		// Roll each column independently
		const sceneType = pickField(challengeData.combatScenes, 'sceneType')
		const terrain = pickField(challengeData.combatScenes, 'terrain')
		const objective = pickField(challengeData.combatScenes, 'objective')
		const twist = pickField(challengeData.combatScenes, 'twist')
		return `${lc(sceneType)} encounter in ${lc(terrain)}. objective: ${lc(objective)}. twist: ${lc(twist)}.`
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
		const form = pickField(details, 'form')
		const detail = pickField(details, 'detail')
		return `${lc(type)} in the form of ${lc(form)} with ${lc(detail)}.`
	}
	return `${lc(type)}.`
}

function generateUtility(): string {
	const entry = pick(treasureData.utility)
	const type = entry.type
	const details = treasureData.utilityDetails[type] as string[] | undefined
	if (details && details.length > 0) {
		return `${lc(type)} — ${lc(pick(details))}.`
	}
	return `${lc(type)}.`
}

function generateWearable(): string {
	const slot = pick(treasureData.wearableSlots)
	const items = treasureData.wearableItems[slot] as string[] | undefined
	const itemType = items && items.length > 0 ? pick(items) : slot
	const ornament = pickField(treasureData.wearableDescription, 'ornament')
	const style = pickField(treasureData.wearableDescription, 'style')
	const material = pickField(treasureData.wearableDescription, 'material')
	return `${lc(style)} ${lc(material)} ${lc(itemType)} (${lc(slot)}) with ${lc(ornament)} ornament.`
}

function generateArmor(): string {
	const type = pick(treasureData.armorShield)
	const details = treasureData.armorDetails[type] as
		| { material: string; form: string; detail: string }[]
		| undefined
	if (details && details.length > 0) {
		const material = pickField(details, 'material')
		const form = pickField(details, 'form')
		const detail = pickField(details, 'detail')
		return `${lc(material)} ${lc(type)} in ${lc(form)} style with ${lc(detail)}.`
	}
	return `${lc(type)}.`
}

function generateWeapon(): string {
	const type = pick(treasureData.weaponCatalyst)
	const details = treasureData.weaponDetails[type] as
		| { material: string; form: string; detail: string }[]
		| undefined
	if (details && details.length > 0) {
		const material = pickField(details, 'material')
		const form = pickField(details, 'form')
		const detail = pickField(details, 'detail')
		return `${lc(material)} ${lc(type)} in ${lc(form)} style with ${lc(detail)}.`
	}
	return `${lc(type)}.`
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

import nameData from './data/nameData.json'
import spellData from './data/spellData.json'
import creatureData from './data/creatureData.json'
import challengeData from './data/challengeData.json'
import treasureData from './data/treasureData.json'
import questData from './data/questData.json'
import npcData from './data/npcData.json'
import settlementData from './data/settlementData.json'
import weaponsGameData from '../../utils/data/json/weapons.json'
import armorGameData from '../../utils/data/json/armor.json'
import equipmentGameData from '../../utils/data/json/equipment.json'

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

// Utility: return "A" or "An" based on the next word's initial letter.
// Sufficient for NPC data (dispositions/occupations) which have no edge cases.
function article(nextWord: string): string {
	return /^[aeiou]/i.test(nextWord) ? 'An' : 'A'
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

function buildFamilyFromParts(
	pattern: string,
	adjective1: string,
	adjective2: string,
	noun1: string,
	noun2: string,
): string {
	const raw = pattern
		.replace('[Adjective 1]', adjective1)
		.replace('[Adjective 2]', adjective2)
		.replace('[Noun 1]', noun1)
		.replace('[Noun 2]', noun2)
		.replace(/\s*\+\s*/g, '')
	return capitalize(raw.toLowerCase())
}

function applyFamilyPatternDual(
	pattern: string,
	meaningNames: FamilyNameParts[],
	inWorldNames: FamilyNameParts[],
): { inWorld: string; meaning: string } {
	// Roll each column independently, but use the same index for in-world and meaning
	// so each in-world word has a matching translation
	const adj1Idx = Math.floor(Math.random() * meaningNames.length)
	const adj2Idx = Math.floor(Math.random() * meaningNames.length)
	const noun1Idx = Math.floor(Math.random() * meaningNames.length)
	const noun2Idx = Math.floor(Math.random() * meaningNames.length)

	const meaning = buildFamilyFromParts(
		pattern,
		meaningNames[adj1Idx].adjective1,
		meaningNames[adj2Idx].adjective2,
		meaningNames[noun1Idx].noun1,
		meaningNames[noun2Idx].noun2,
	)
	const inWorld = buildFamilyFromParts(
		pattern,
		inWorldNames[adj1Idx].adjective1,
		inWorldNames[adj2Idx].adjective2,
		inWorldNames[noun1Idx].noun1,
		inWorldNames[noun2Idx].noun2,
	)
	return { inWorld, meaning }
}

export function generateName(groupId: string, useGerman = false): string {
	const culture = nameData.cultures.find(
		(c) => `${c.folk}-${c.culture}` === groupId,
	)
	if (!culture) return 'Unknown culture'

	// Roll personal name — each syllable column independently
	const personalPattern = pick(nameData.namingPatterns)
	const personalName = applyNamingPattern(personalPattern, culture.personalNames)

	// Roll family name — always show in-world name with EN/DE meaning in parentheses
	const familyPattern = pick(nameData.familyNamePatterns)
	const meaningSource = useGerman && culture.familyNamesDE
		? culture.familyNamesDE
		: culture.familyNames
	const inWorldSource = culture.familyNamesInWorld ?? culture.familyNames
	const { inWorld, meaning } = applyFamilyPatternDual(familyPattern, meaningSource, inWorldSource)

	return `${personalName} ${inWorld} (${meaning})`
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

	return `${lc(typeName)} with ${appearance.join(', ')}. ${lc(behavior)}, attacks with ${lc(bodyPart)} (${lc(attackMode)}). special: ${lc(attackType)} ${lc(deliveryMethod)}. defense: ${lc(defenseMethod)} against ${lc(defenseType)}. ability: ${lc(trigger)} → ${lc(action)} ${lc(subject)}.`
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
		return `${lc(puzzleType)} puzzle featuring ${lc(coreElement)}, solved by ${lc(interaction)}. presented as ${lc(presentation)} with ${lc(feedback)} as feedback. hints: ${lc(hints)}.`
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

// Game data types
interface GameWeapon {
	name: string
	quality: string
	type: string
	cost: string
}

interface GameArmor {
	name: string
	quality: string
	type: string
	cost: string
}

interface GameEquipment {
	name: string
	quality: string
	category: string
	cost: string
}

const gameWeapons = weaponsGameData as GameWeapon[]
const gameArmor = armorGameData as GameArmor[]
const gameEquipment = equipmentGameData as GameEquipment[]

export const treasureGroups = [
	{ id: 'any', label: 'Any Treasure' },
	{ id: 'valuable', label: 'Valuable' },
	{ id: 'utility', label: 'Utility' },
	{ id: 'wearable', label: 'Wearable' },
	{ id: 'armor', label: 'Armor / Shield' },
	{ id: 'weapon', label: 'Weapon / Spell Catalyst' },
]

// Minimum quality tier for each treasure category
const categoryMinQuality: Record<string, number> = {
	valuable: 1,
	utility: 1,
	wearable: 1,
	armor: 1,
	weapon: 2,
}

function rollTreasureType(quality?: number): string {
	const roll = rollDie(12)
	let category: string
	if (roll <= 6) category = 'valuable'
	else if (roll <= 9) category = 'utility'
	else if (roll === 10) category = 'wearable'
	else if (roll === 11) category = 'armor'
	else category = 'weapon'

	// Re-roll if quality is below the minimum for this category
	if (quality && quality < (categoryMinQuality[category] ?? 1)) {
		return rollTreasureType(quality)
	}
	return category
}

// Roll 2d4 (result: 2-8)
function roll2d4(): number {
	return rollDie(4) + rollDie(4)
}

// Calculate random treasure cost based on quality tier using full multiplier (for valuables/non-base-items)
export function rollTreasureCost(quality: number): number {
	const multipliers = treasureData.costMultipliers as number[]
	const idx = Math.max(0, Math.min(quality - 1, multipliers.length - 1))
	return roll2d4() * multipliers[idx]
}

// Calculate a small random treasure bonus for items with known base costs
export function rollTreasureBonus(quality: number): number {
	const multipliers = treasureData.treasureBonusMultipliers as number[]
	const idx = Math.max(0, Math.min(quality - 1, multipliers.length - 1))
	return roll2d4() * multipliers[idx]
}

// Parse cost string that may contain commas (e.g., "2,500")
function parseCost(cost: string): number {
	return parseInt(cost.replace(/,/g, ''), 10) || 0
}

// Map quality tier (1-8) to material column
function getQualityColumn(quality: number): 'low' | 'medium' | 'high' | 'supreme' {
	if (quality <= 2) return 'low'
	if (quality <= 4) return 'medium'
	if (quality <= 6) return 'high'
	return 'supreme'
}

// Pick a quality-appropriate material for a valuable type
function pickQualityMaterial(valuableType: string, quality: number): string | null {
	const materialMap = treasureData.valuableMaterialMap as Record<string, string>
	let tableKey = materialMap[valuableType]

	// Raw Metal / Timber spans two material categories — pick one randomly
	if (valuableType === 'Raw Metal / Timber') {
		tableKey = Math.random() < 0.5 ? 'metalsAndMinerals' : 'woodAndPlants'
	}

	if (!tableKey) return null

	const materials = (treasureData.qualityMaterials as Record<string, Record<string, string[]>>)[tableKey]
	if (!materials) return null

	const column = getQualityColumn(quality)
	const columnData = materials[column]
	if (!columnData || columnData.length === 0) return null

	return pick(columnData)
}

// Pick a specific weapon from game data matching the type and quality tier
function pickWeaponItem(weaponType: string, quality: number): { name: string; cost: number } | null {
	// Ammo types
	if (weaponType === 'Arrows' || weaponType === 'Bolts') {
		const prefix = weaponType === 'Arrows' ? 'Arrows' : 'Bolts'
		const ammo = gameEquipment.filter(e => e.name.startsWith(prefix) && parseInt(e.quality) <= quality)
		if (ammo.length > 0) {
			const item = pick(ammo)
			return { name: item.name, cost: parseCost(item.cost) }
		}
		return null
	}

	// Spell catalysts
	if (weaponType === 'Arcane Conduit' || weaponType === 'Mystic Talisman') {
		const catalyst = gameEquipment.find(e =>
			e.name.includes(weaponType) && parseInt(e.quality) <= quality
		)
		if (catalyst) {
			return { name: weaponType, cost: parseCost(catalyst.cost) }
		}
		return { name: weaponType, cost: 75 }
	}

	// Regular weapons — filter by type and quality
	const matching = gameWeapons.filter(w =>
		w.type === weaponType && parseInt(w.quality) <= quality
	)

	if (matching.length > 0) {
		const weapon = pick(matching)
		return { name: weapon.name, cost: parseCost(weapon.cost) }
	}

	return null
}

// Look up armor or shield base cost from game data
function getArmorInfo(armorName: string): { quality: number; cost: number } | null {
	const armor = gameArmor.find(a => a.name === armorName)
	if (armor) return { quality: parseInt(armor.quality), cost: parseCost(armor.cost) }

	// Shields are in weapons data
	const shield = gameWeapons.find(w => w.name === armorName && w.type === 'Shield')
	if (shield) return { quality: parseInt(shield.quality), cost: parseCost(shield.cost) }

	return null
}

// Pick an actual utility item from equipment data for a utility type
function pickUtilityItem(utilityType: string, quality: number): { name: string; cost: number } | null {
	const categoryMap = treasureData.utilityEquipmentMap as Record<string, string> | undefined
	if (!categoryMap) return null

	const equipCategory = categoryMap[utilityType]
	if (!equipCategory) return null

	const matching = gameEquipment.filter(e =>
		e.category === equipCategory && parseInt(e.quality) <= quality
	)

	if (matching.length === 0) return null

	const item = pick(matching)
	return { name: item.name, cost: parseCost(item.cost) }
}

function generateValuable(quality?: number): string {
	const type = pick(treasureData.valuables)
	const details = treasureData.valuableDetails[type] as
		| { form: string; detail: string }[]
		| undefined
	const formDetail = details && details.length > 0
		? ` in the form of ${lc(pickField(details, 'form'))} — ${lc(pickField(details, 'detail'))}`
		: ''

	if (quality) {
		const material = pickQualityMaterial(type, quality)
		const materialStr = material ? ` Material: ${lc(material)}.` : ''
		const cost = rollTreasureCost(quality)
		return `${lc(type)}${formDetail}.${materialStr} (Q${quality}, ~${cost.toLocaleString()} coins)`
	}
	return `${lc(type)}${formDetail}.`
}

function generateUtility(quality?: number): string {
	const entry = pick(treasureData.utility)
	const type = entry.type

	if (quality) {
		// Try to find an actual equipment item for this utility type
		const item = pickUtilityItem(type, quality)
		if (item) {
			const bonus = rollTreasureBonus(quality)
			const total = item.cost + bonus
			return `${lc(type)}: ${lc(item.name)}. Base: ${item.cost} coins. (Q${quality}, ~${total.toLocaleString()} coins)`
		}
		// No base item (Spell Scroll, Knowledge) — use full multiplier
		const details = treasureData.utilityDetails[type] as string[] | undefined
		const desc = details && details.length > 0
			? `${lc(type)} — ${lc(pick(details))}.`
			: `${lc(type)}.`
		const cost = rollTreasureCost(quality)
		return `${desc} (Q${quality}, ~${cost.toLocaleString()} coins)`
	}

	const details = treasureData.utilityDetails[type] as string[] | undefined
	return details && details.length > 0
		? `${lc(type)} — ${lc(pick(details))}.`
		: `${lc(type)}.`
}

function generateWearable(quality?: number): string {
	const slot = pick(treasureData.wearableSlots)
	const items = treasureData.wearableItems[slot] as string[] | undefined
	const itemType = items && items.length > 0 ? pick(items) : slot
	const ornament = pickField(treasureData.wearableDescription, 'ornament')
	const style = pickField(treasureData.wearableDescription, 'style')
	const material = pickField(treasureData.wearableDescription, 'material')
	const desc = `${lc(style)} ${lc(material)} ${lc(itemType)} (${lc(slot)}) with ${lc(ornament)} ornament.`

	if (quality) {
		const baseCosts = treasureData.wearableBaseCosts as Record<string, number> | undefined
		const baseCost = baseCosts?.[slot] ?? 50
		const bonus = rollTreasureBonus(quality)
		const total = baseCost + bonus
		return `${desc} Base: ${baseCost} coins. (Q${quality}, ~${total.toLocaleString()} coins)`
	}
	return desc
}

function generateArmor(quality?: number): string {
	let armorList = treasureData.armorShield as string[]

	// Filter to items whose base quality ≤ selected quality
	if (quality) {
		const filtered = armorList.filter(name => {
			const info = getArmorInfo(name)
			return !info || info.quality <= quality
		})
		if (filtered.length > 0) armorList = filtered
	}

	const type = pick(armorList)
	const details = treasureData.armorDetails[type] as
		| { material: string; form: string; detail: string }[]
		| undefined
	let detailStr: string
	if (details && details.length > 0) {
		const material = pickField(details, 'material')
		const form = pickField(details, 'form')
		const detail = pickField(details, 'detail')
		detailStr = `${lc(material)} ${lc(form)} — ${lc(detail)}`
	} else {
		detailStr = lc(type)
	}

	if (quality) {
		const info = getArmorInfo(type)
		const baseCost = info?.cost ?? 0
		const bonus = rollTreasureBonus(quality)
		const total = baseCost + bonus
		return `${lc(type)}: ${detailStr}. Base: ${baseCost} coins. (Q${quality}, ~${total.toLocaleString()} coins)`
	}
	return `${detailStr}.`
}

function generateWeapon(quality?: number): string {
	const type = pick(treasureData.weaponCatalyst)
	const details = treasureData.weaponDetails[type] as
		| { material: string; form: string; detail: string }[]
		| undefined

	if (quality) {
		const weaponItem = pickWeaponItem(type, quality)

		if (weaponItem) {
			const bonus = rollTreasureBonus(quality)
			const total = weaponItem.cost + bonus
			// Use cosmetic material/detail for flavor, but the actual weapon name as identifier
			if (details && details.length > 0) {
				const material = pickField(details, 'material')
				const detail = pickField(details, 'detail')
				return `${lc(material)} ${lc(weaponItem.name)} — ${lc(detail)}. Base: ${weaponItem.cost} coins. (Q${quality}, ~${total.toLocaleString()} coins)`
			}
			return `${lc(weaponItem.name)}. Base: ${weaponItem.cost} coins. (Q${quality}, ~${total.toLocaleString()} coins)`
		}

		// No matching weapon at quality — fallback to description + full multiplier
		let desc: string
		if (details && details.length > 0) {
			const material = pickField(details, 'material')
			const form = pickField(details, 'form')
			const detail = pickField(details, 'detail')
			desc = `${lc(material)} ${lc(form)} — ${lc(detail)}.`
		} else {
			desc = `${lc(type)}.`
		}
		const cost = rollTreasureCost(quality)
		return `${desc} (Q${quality}, ~${cost.toLocaleString()} coins)`
	}

	// Without quality — original behavior
	if (details && details.length > 0) {
		const material = pickField(details, 'material')
		const form = pickField(details, 'form')
		const detail = pickField(details, 'detail')
		return `${lc(material)} ${lc(form)} — ${lc(detail)}.`
	}
	return `${lc(type)}.`
}

export function generateTreasure(groupId: string, quality?: number): string {
	const category = groupId === 'any' ? rollTreasureType(quality) : groupId

	switch (category) {
		case 'valuable':
			return generateValuable(quality)
		case 'utility':
			return generateUtility(quality)
		case 'wearable':
			return generateWearable(quality)
		case 'armor':
			return generateArmor(quality)
		case 'weapon':
			return generateWeapon(quality)
		default:
			return 'Unknown treasure type'
	}
}

// ===== QUESTS / RUMORS / JOBS =====

export const questGroups = [
	{ id: 'rumor', label: 'Rumor' },
	{ id: 'quest', label: 'Quest Hook' },
	{ id: 'job', label: 'Job' },
]

function getLevelScaling(partyLevel: number) {
	if (partyLevel <= 2) return questData.levelScaling[0]
	if (partyLevel <= 4) return questData.levelScaling[1]
	if (partyLevel <= 6) return questData.levelScaling[2]
	if (partyLevel <= 8) return questData.levelScaling[3]
	return questData.levelScaling[4]
}

function rollCoinReward(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateRewardDetails(partyLevel: number): string {
	const scaling = getLevelScaling(partyLevel)
	const coins = rollCoinReward(scaling.coinMin, scaling.coinMax)
	const quality = pick(scaling.treasureQualities)
	return `${coins} coins (${quality} treasure, ${scaling.scope} scope)`
}

export function generateQuest(category: string, partyLevel: number): string {
	switch (category) {
		case 'rumor': {
			const source = pick(questData.sources)
			const subject = pick(questData.rumorSubjects)
			const location = pick(questData.locations)
			const cause = pick(questData.causes)
			return `${capitalize(source)} says that ${subject} near ${location}. They say it's because of ${cause}.`
		}
		case 'quest': {
			const task = pick(questData.tasks)
			const subject = pick(questData.subjects)
			const location = pick(questData.locations)
			const complication = pick(questData.complications)
			const reward = pick(questData.rewards)
			const rewardDetails = generateRewardDetails(partyLevel)
			return `Wanted: ${task} ${subject} at ${location}. Warning: ${complication}. Reward: ${reward} — ${rewardDetails}.`
		}
		case 'job': {
			const patron = pick(questData.patrons)
			const task = pick(questData.tasks)
			const subject = pick(questData.subjects)
			const location = pick(questData.locations)
			const complication = pick(questData.complications)
			const reward = pick(questData.rewards)
			const rewardDetails = generateRewardDetails(partyLevel)
			return `${capitalize(patron)} wants you to ${task} ${subject} at ${location}, but ${complication}. On success: ${reward} — ${rewardDetails}.`
		}
		default:
			return 'Unknown quest type'
	}
}

// ===== NPCs =====

export const npcGroups = [
	{ id: 'full', label: 'Full NPC Profile' },
	{ id: 'social', label: 'Social Intrigue NPC' },
	{ id: 'quick', label: 'Quick NPC' },
]

export function generateNpc(groupId: string): string {
	const occupation = pick(npcData.occupations)
	const visual = pick(npcData.visualDistinctiveness)
	const mannerism = pick(npcData.mannerisms)

	if (groupId === 'quick') {
		return `${article(occupation)} ${lc(occupation)} with ${lc(visual)} who ${lc(mannerism)}.`
	}

	const disposition = pick(npcData.dispositions)
	const motivation1 = pick(npcData.motivations)
	let motivation2 = pick(npcData.motivations)
	while (motivation2.motivation === motivation1.motivation) {
		motivation2 = pick(npcData.motivations)
	}
	const pitfall = pick(npcData.pitfalls)

	if (groupId === 'social') {
		const patience = pick(npcData.patience)
		const alignment = pick(npcData.requestAlignments)
		return `${article(disposition.disposition)} ${lc(disposition.disposition)} ${lc(occupation)} (disposition ${disposition.modifier >= 0 ? '+' : ''}${disposition.modifier}). ${capitalize(patience.temperament)} patience (${patience.challengeDie}), request is ${lc(alignment.alignment)} (${alignment.modifier >= 0 ? '+' : ''}${alignment.modifier}). Motivated by ${lc(motivation1.motivation)} and ${lc(motivation2.motivation)}. Pitfall: ${lc(pitfall.pitfall)} — triggered by ${lc(pitfall.trigger)}. They have ${lc(visual)} and ${lc(mannerism)}.`
	}

	// Full profile
	return `${article(disposition.disposition)} ${lc(disposition.disposition)} ${lc(occupation)} with ${lc(visual)} who ${lc(mannerism)}. Motivated by ${lc(motivation1.motivation)} and ${lc(motivation2.motivation)}. Pitfall: ${lc(pitfall.pitfall)} — triggered by ${lc(pitfall.trigger)}.`
}

// ===== SETTLEMENTS =====

export const settlementGroups = [
	{ id: 'full', label: 'Full Settlement' },
	{ id: 'geography', label: 'Geography' },
	{ id: 'resources', label: 'Resources' },
	{ id: 'culture', label: 'Culture' },
	{ id: 'government', label: 'Government' },
	{ id: 'history', label: 'Historical Event' },
	{ id: 'threats', label: 'Threats' },
	{ id: 'defenses', label: 'Defenses' },
	{ id: 'law', label: 'Law Enforcement' },
	{ id: 'power', label: 'Power Players' },
	{ id: 'landmarks', label: 'Landmarks' },
	{ id: 'districts', label: 'Districts' },
	{ id: 'streets', label: 'Streets' },
]

export function generateSettlement(groupId: string): string {
	if (groupId === 'full') {
		const geography = pick(settlementData.geography)
		const resources = pick(settlementData.resources)
		const culture = pick(settlementData.culture)
		const government = pick(settlementData.government)
		const history = pick(settlementData.historicalEvents)
		const threat = pick(settlementData.threats)
		const defense = pick(settlementData.defenses)
		const law = pick(settlementData.lawEnforcement)
		const power = pick(settlementData.powerPlayers)
		const landmark = pick(settlementData.landmarks)
		const district = pick(settlementData.districts)
		const street = pick(settlementData.streets)

		return `A settlement ${lc(geography)}. Its economy depends on ${lc(resources)}. The people practice ${lc(culture)}. Ruled by ${lc(government)}. In the past, ${lc(history)}. Threatened by ${lc(threat)}. Defended by ${lc(defense)}. Justice is handled by ${lc(law)}. The most influential figure is ${lc(power)}. Notable landmark: ${lc(landmark)}. Features ${lc(district)}. The streets are ${lc(street)}.`
	}

	switch (groupId) {
		case 'geography':
			return `The settlement sits ${lc(pick(settlementData.geography))}.`
		case 'resources':
			return `The local economy depends on ${lc(pick(settlementData.resources))}.`
		case 'culture':
			return `The people practice ${lc(pick(settlementData.culture))}.`
		case 'government':
			return `The settlement is ruled by ${lc(pick(settlementData.government))}.`
		case 'history':
			return `In the settlement's past, ${lc(pick(settlementData.historicalEvents))}.`
		case 'threats':
			return `The settlement is threatened by ${lc(pick(settlementData.threats))}.`
		case 'defenses':
			return `The settlement is defended by ${lc(pick(settlementData.defenses))}.`
		case 'law':
			return `Justice is handled by ${lc(pick(settlementData.lawEnforcement))}.`
		case 'power':
			return `The most influential figure is ${lc(pick(settlementData.powerPlayers))}.`
		case 'landmarks':
			return `A notable landmark: ${lc(pick(settlementData.landmarks))}.`
		case 'districts':
			return `The settlement features ${lc(pick(settlementData.districts))}.`
		case 'streets':
			return `The streets are ${lc(pick(settlementData.streets))}.`
		default:
			return 'Unknown settlement table'
	}
}

// ===== BUILDINGS =====

export const buildingGroups = [
	{ id: 'harbor', label: 'Harbor & Waterfront' },
	{ id: 'market', label: 'Market & Trade' },
	{ id: 'temple', label: 'Temple & Sacred' },
	{ id: 'artisan', label: 'Artisan & Craft' },
	{ id: 'garrison', label: 'Military & Garrison' },
	{ id: 'residential', label: 'Residential & Noble' },
	{ id: 'slum', label: 'Slum & Outskirts' },
	{ id: 'scholarly', label: 'Scholarly & Cultural' },
	{ id: 'pleasure', label: 'Pleasure & Entertainment' },
	{ id: 'foreign', label: 'Foreign Quarter' },
]

export function generateBuilding(groupId: string): string {
	const buildings = (settlementData.buildings as Record<string, string[]>)[groupId]
	if (!buildings) return 'Unknown district type'
	return `Prominent building: ${lc(pick(buildings))}.`
}

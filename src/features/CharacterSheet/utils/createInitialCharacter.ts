import { Character } from '../../../types/Character'
import type {
	FolkData,
	UpbringingData,
	BackgroundData,
	ArchetypeData,
} from '../components'
import { v4 as uuidv4 } from 'uuid'
import weaponsData from '../../../utils/data/json/weapons.json'
import armorData from '../../../utils/data/json/armor.json'
import equipmentData from '../../../utils/data/json/equipment.json'
import talentsData from '../../../utils/data/json/talents.json'
import combatArtsData from '../../../utils/data/json/combat-arts.json'
import mysticSpellsData from '../../../utils/data/json/mystic-spells.json'
import arcaneSpellsData from '../../../utils/data/json/arcane-spells.json'
import companionTraitsData from '../../../utils/data/json/companion-traits.json'
import { calculateStats } from '../../../utils/typescript/companion/companionCalculations'
import { generateMarkdown } from '../../../utils/typescript/companion/companionFormatting'
import type { CompanionTrait, CompanionStats } from '../../../types/companion'
import {
	extractArmorValues,
	extractShieldParryBonus,
	organizeItemsByLocation,
} from '../CharacterSheetTabs/02_Items/utils/itemUtils'
import { normalizeSkillName } from '../../../constants/skills'
import { calculateTalentHpBonus } from './calculateTalentHpBonus'
import { calculateFolkAvBonus } from './calculateFolkAvBonus'
import { createNaturalWeapons } from './createNaturalWeapons'

/**
 * Capitalizes starting item names to match the item naming convention
 */
const capitalizeStartingItem = (itemName: string): string => {
	return itemName
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

/**
 * Sanitizes HTML formatting from ability descriptions
 * Converts HTML elements to plain text equivalents
 */
const sanitizeAbilityDescription = (description: string): string => {
	if (!description) return ''

	return (
		description
			// Replace <br/>, <br>, <br /> with newlines
			.replace(/<br\s*\/?>/gi, '\n')
			// Replace <strong> and </strong> with nothing
			.replace(/<\/?strong>/gi, '')
			// Replace opening tags that should be newlines (like <p>)
			.replace(/<p>/gi, '\n')
			// Replace closing tags
			.replace(/<\/p>/gi, '')
			// Remove any remaining HTML tags
			.replace(/<[^>]+>/g, '')
			// Remove markdown bold formatting (**text**)
			.replace(/\*\*([^*]+)\*\*/g, '$1')
			// Remove markdown italic formatting (*text* or _text_)
			.replace(/\*([^*]+)\*/g, '$1')
			.replace(/_([^_]+)_/g, '$1')
			// Decode HTML entities
			.replace(/&nbsp;/g, ' ')
			.replace(/&amp;/g, '&')
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>')
			.replace(/&quot;/g, '"')
			.replace(/&#39;/g, "'")
			// Clean up multiple consecutive newlines
			.replace(/\n\n+/g, '\n\n')
			// Trim whitespace
			.trim()
	)
}

/**
 * Parses a comma-separated string of suggested skills and returns an array of skill names
 */
const parseSuggestedSkills = (
	suggestedSkills: string | undefined,
): string[] => {
	if (!suggestedSkills) return []

	return suggestedSkills
		.split(',')
		.map((skill) => skill.trim())
		.filter((skill) => skill.length > 0)
}

/**
 * Resolves skill conflicts according to game rules.
 * Currently handles the Arcana/Mysticism mutual exclusivity rule.
 */
const resolveSkillConflicts = (skills: string[]): string[] => {
	const skillSet = new Set(skills)

	// Handle Arcana/Mysticism mutual exclusivity
	if (skillSet.has('Arcana') && skillSet.has('Mysticism')) {
		// If both are present, keep Arcana and remove Mysticism
		// This is arbitrary but consistent - could also be user choice
		skillSet.delete('Mysticism')
	}

	return Array.from(skillSet)
}

/**
 * Finds a weapon by name in the weapons database
 */
const findWeapon = (weaponName: string) => {
	const normalized = weaponName.toLowerCase().trim()
	return weaponsData.find((w) => w.name.toLowerCase() === normalized)
}

/**
 * Finds armor by name in the armor database
 */
const findArmor = (armorName: string) => {
	// Handle "Leather Armor" -> "Leather" mapping
	const normalized = armorName.toLowerCase().replace(' armor', '').trim()
	return armorData.find((a) => a.name.toLowerCase() === normalized)
}

/**
 * Finds equipment by name in the equipment database
 */
const findEquipment = (itemName: string) => {
	const normalized = itemName.toLowerCase().trim()
	return equipmentData.find((e) => e.name.toLowerCase() === normalized)
}

/**
 * Finds a talent by name in the talents database
 */
const findTalent = (talentName: string) => {
	const normalized = talentName.toLowerCase().trim()
	return talentsData.find((t) => t.name.toLowerCase() === normalized)
}

/**
 * Finds combat arts suitable for a given skill
 */
const findCombatArtsForSkill = (skillName: string, count: number = 2) => {
	const categoryMap: Record<string, string[]> = {
		Fighting: ['Axe', 'Blade', 'Mace', 'Polearm', 'Shield', 'Brawl'],
		Archery: ['Bow', 'Crossbow', 'Thrown'],
	}

	const weapons = categoryMap[skillName]
	if (!weapons) return []

	// Filter combat arts that match any of the weapon types
	const matchingArts = combatArtsData.filter((art) =>
		weapons.some((weapon) => art.weapons.includes(weapon)),
	)

	// Return the first 'count' combat arts
	return matchingArts.slice(0, count)
}

/**
 * Finds a combat art by exact name (case-insensitive)
 */
const findCombatArtByName = (combatArtName: string) => {
	const normalized = combatArtName.toLowerCase().trim()
	return combatArtsData.find(
		(art) => art.name.toLowerCase().trim() === normalized,
	)
}

/**
 * Creates a weapon object from archetype equipment
 */
const createWeaponFromName = (weaponName: string) => {
	// Parse quantity notation (e.g., "Cestus x2" -> name: "Cestus", amount: 2)
	let actualWeaponName = weaponName
	let amount = 1
	const quantityMatch = weaponName.match(/^(.+?)\s+x(\d+)$/i)
	if (quantityMatch) {
		actualWeaponName = quantityMatch[1].trim()
		amount = parseInt(quantityMatch[2]) || 1
	}

	const weaponData = findWeapon(actualWeaponName)
	if (!weaponData) return null

	return {
		id: uuidv4(),
		name: weaponData.name,
		damage: {
			base: 'STR' as const,
			weapon: parseInt(weaponData.damage) || 0,
			other: 0,
			otherWeak: 0,
			otherStrong: 0,
			otherCritical: 0,
			type: 'physical' as const,
			staticDamage: false,
		},
		properties: weaponData.properties,
		description: '',
		cost: parseInt(weaponData.cost) || 0,
		load: parseInt(weaponData.load) || 0,
		location: 'worn' as const,
		amount: amount,
		uses: 0,
		durability: '' as const,
		quality:
			(parseInt(weaponData.quality) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) || 2,
	}
}

/**
 * Creates an item object from archetype equipment
 */
const createItemFromName = (itemName: string) => {
	// Parse quantity notation (e.g., "Healing Salve x3" -> name: "Healing Salve", amount: 3)
	let actualItemName = itemName
	let amount = 1
	const quantityMatch = itemName.match(/^(.+?)\s+x(\d+)$/i)
	if (quantityMatch) {
		actualItemName = quantityMatch[1].trim()
		amount = parseInt(quantityMatch[2]) || 1
	}

	// Check if it's armor first
	const armorData = findArmor(actualItemName)
	if (armorData) {
		// Build properties array including AV bonus
		const properties: string[] = []

		// Add AV bonus if present
		if (armorData.av && armorData.av !== '-' && armorData.av !== '0') {
			properties.push(`AV +${armorData.av}`)
		}

		// Add special properties if present
		if (armorData.properties && armorData.properties !== '-') {
			properties.push(armorData.properties)
		}

		return {
			id: uuidv4(),
			name: actualItemName,
			properties,
			cost: parseInt(armorData.cost) || 0,
			weight: parseInt(armorData.load) || 0,
			container: 'worn' as const,
			amount: amount,
			location: 'worn' as const,
			uses: 0,
			durability: '' as const,
			quality:
				(parseInt(armorData.quality) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) || 2,
		}
	}

	// Check equipment database
	const equipData = findEquipment(actualItemName)
	if (equipData) {
		const load = equipData.load === '-' ? 0 : parseInt(equipData.load) || 0
		return {
			id: uuidv4(),
			name: equipData.name,
			properties: [] as string[],
			cost: parseInt(equipData.cost) || 0,
			weight: load,
			container: load > 0 ? ('backpack' as const) : ('worn' as const),
			amount: amount,
			location: load > 0 ? ('carried' as const) : ('worn' as const),
			uses: 0,
			durability: '' as const,
			quality:
				(parseInt(equipData.quality) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) || 2,
		}
	}

	// If not found, create generic item
	return {
		id: uuidv4(),
		name: actualItemName,
		properties: [] as string[],
		cost: 0,
		weight: 1,
		container: 'backpack' as const,
		amount: amount,
		location: 'carried' as const,
		uses: 0,
		durability: '' as const,
	}
}

/**
 * Finds a mystic spell by name in the mystic spells database
 */
const findMysticSpell = (spellName: string) => {
	const normalized = spellName.toLowerCase().trim()
	return mysticSpellsData.find((s) => s.name.toLowerCase() === normalized)
}

/**
 * Finds an arcane spell by name in the arcane spells database
 */
const findArcaneSpell = (spellName: string) => {
	const normalized = spellName.toLowerCase().trim()
	return arcaneSpellsData.find((s) => s.name.toLowerCase() === normalized)
}

/**
 * Creates a Spell object from spell data
 */
const createSpellFromData = (spellName: string, magicSkill: string) => {
	const spellData =
		magicSkill === 'Mysticism'
			? findMysticSpell(spellName)
			: findArcaneSpell(spellName)

	if (!spellData) return null

	// Parse the target to determine if it's a defense roll or fixed DC
	const target = spellData.target
	let targetType: 'Parry' | 'Dodge' | 'Resist' | 'special' | '' = ''
	if (target.includes('Parry')) targetType = 'Parry'
	else if (target.includes('Dodge')) targetType = 'Dodge'
	else if (target.includes('Resist')) targetType = 'Resist'
	else targetType = 'special'

	// Parse range - must be lowercase to match RangeType
	const range = spellData.range
	let rangeType:
		| ''
		| 'self'
		| 'touch'
		| 'melee'
		| 'close'
		| 'short'
		| 'medium'
		| 'long'
		| 'very long'
		| 'extreme' = ''
	if (range.includes('Self')) rangeType = 'self'
	else if (range.includes('Touch')) rangeType = 'touch'
	else if (range.includes('Melee')) rangeType = 'melee'
	else if (range.includes('Close')) rangeType = 'close'
	else if (range.includes('Short')) rangeType = 'short'
	else if (range.includes('Medium')) rangeType = 'medium'
	else if (range.includes('Long')) rangeType = 'long'
	else if (range.includes('Extreme')) rangeType = 'extreme'

	return {
		id: uuidv4(),
		name: spellData.name,
		rank: parseInt(spellData.rank) || 0,
		cost: parseInt(spellData.focus) || 0,
		target: targetType,
		range: rangeType,
		properties: spellData.properties || '-',
		dealsDamage: false, // Will be determined by effect parsing
		damage: {
			base: 'SPI' as const,
			weapon: 0,
			other: 0,
			otherWeak: 0,
			otherStrong: 0,
			otherCritical: 0,
			type: 'physical' as const,
			staticDamage: false,
		},
		effect: sanitizeAbilityDescription(spellData.effect || ''),
	}
}

export type CharacterCreationOptions = {
	includeStartingGear?: boolean
	folk?: FolkData
	upbringing?: UpbringingData
	background?: BackgroundData
	archetype?: ArchetypeData
	selectedCompanion?: string
	selectedFamiliar?: string
	selectedSpellPath?: string
}

export const createInitialCharacter = (
	name: string,
	playerName: string,
	options: CharacterCreationOptions = {},
): Character => {
	const {
		includeStartingGear = false,
		folk,
		upbringing,
		background,
		archetype,
		selectedCompanion,
		selectedFamiliar,
		selectedSpellPath,
	} = options

	// Collect languages from folk and base languages
	const languages = ['Tradespeak']
	if (folk?.languages) {
		folk.languages.forEach((lang) => {
			if (!languages.includes(lang)) {
				languages.push(lang)
			}
		})
	}

	// Collect abilities from folk, talents, and combat arts
	const abilities = []

	// Add folk abilities
	if (folk?.abilities && Array.isArray(folk.abilities)) {
		folk.abilities.forEach((ability) => {
			abilities.push({
				id: uuidv4(),
				title: ability.name,
				description: sanitizeAbilityDescription(ability.description),
				tag: 'Folk' as const,
			})
		})
	}

	// Add talents from archetype (if provided)
	if (
		archetype?.recommendedTalents &&
		Array.isArray(archetype.recommendedTalents)
	) {
		archetype.recommendedTalents.forEach((talentName) => {
			const talent = findTalent(talentName)
			if (talent) {
				abilities.push({
					id: uuidv4(),
					title: talent.name,
					description: sanitizeAbilityDescription(talent.description),
					tag: 'Talent' as const,
					skill: normalizeSkillName(talent['skill requirement']) || undefined,
				})
			}
		})
	}

	// Collect skills from archetype, upbringing and background
	const rank1SkillNames: string[] = []
	const rank0SkillNames: string[] = []

	// Primary skills from archetype go to rank 1 (limited to 3)
	if (archetype?.primarySkills && Array.isArray(archetype.primarySkills)) {
		rank1SkillNames.push(...archetype.primarySkills.slice(0, 3))
	}

	// Skills at rank 0
	if (archetype) {
		// If archetype selected, ONLY use archetype's suggested skills for exactly 7 total
		if (archetype.suggestedSkills) {
			const suggested = parseSuggestedSkills(archetype.suggestedSkills)
			suggested.forEach((skill) => {
				if (!rank1SkillNames.includes(skill)) {
					rank0SkillNames.push(skill)
				}
			})
		}
	} else {
		// Without archetype, use upbringing + background skills
		if (upbringing?.['suggested skills']) {
			const suggested = parseSuggestedSkills(upbringing['suggested skills'])
			suggested.forEach((skill) => {
				if (
					!rank1SkillNames.includes(skill) &&
					!rank0SkillNames.includes(skill)
				) {
					rank0SkillNames.push(skill)
				}
			})
		}
		if (background?.['suggested skills']) {
			const suggested = parseSuggestedSkills(background['suggested skills'])
			suggested.forEach((skill) => {
				if (
					!rank1SkillNames.includes(skill) &&
					!rank0SkillNames.includes(skill)
				) {
					rank0SkillNames.push(skill)
				}
			})
		}
	}

	// Remove duplicates and resolve conflicts
	const uniqueRank1Skills = resolveSkillConflicts([...new Set(rank1SkillNames)])
	const uniqueRank0Skills = resolveSkillConflicts([...new Set(rank0SkillNames)])

	// Create skill objects with proper ranks and XP
	const skills = [
		...uniqueRank1Skills.map((skillName) => ({
			id: uuidv4(),
			name: skillName,
			rank: 1,
			xp: 2, // Each rank 1 skill costs 2 XP
		})),
		...uniqueRank0Skills.map((skillName) => ({
			id: uuidv4(),
			name: skillName,
			rank: 0,
			xp: 0,
		})),
	]

	// Calculate total XP spent (3 skills at rank 1 = 6 XP)
	const totalXp = uniqueRank1Skills.length * 2

	// Determine spell path (discipline/tradition) selection
	const spellData = archetype?.spellData
	const availableSpellPaths =
		(spellData?.traditions && spellData.traditions.length
			? spellData.traditions
			: spellData?.disciplines && spellData.disciplines.length
				? spellData.disciplines
				: []) || []

	const chosenSpellPath =
		availableSpellPaths.find((path) => path === selectedSpellPath) ||
		availableSpellPaths[0] ||
		''

	type ArchetypeSpellInfo = {
		name: string
		rank: number
		tradition?: string
		discipline?: string
	}
	const startingSpells: ArchetypeSpellInfo[] =
		spellData?.startingSpells ?? []

	const filteredStartingSpells = startingSpells.filter((spell) => {
		const spellPath = spell.tradition || spell.discipline
		if (!chosenSpellPath || !availableSpellPaths.length) return true
		if (spellPath) return spellPath === chosenSpellPath
		return true
	})

	const dedupedStartingSpells = filteredStartingSpells.reduce<ArchetypeSpellInfo[]>(
		(acc, spell) => {
			const key = `${spell.name}-${spell.rank}`
			if (!acc.some((existing) => `${existing.name}-${existing.rank}` === key)) {
				acc.push(spell)
			}
			return acc
		},
		[],
	)

	// Add combat arts for Fighting or Archery rank 1 skills
	uniqueRank1Skills.forEach((skillName) => {
		if (skillName === 'Fighting' || skillName === 'Archery') {
			const combatArts =
				archetype?.recommendedCombatArts && archetype.recommendedCombatArts.length
					? archetype.recommendedCombatArts
							.map((artName) => findCombatArtByName(artName))
							.filter(
								(art): art is NonNullable<typeof art> => art != null,
							)
							.slice(0, 2)
					: findCombatArtsForSkill(skillName, 2)
			combatArts.forEach((art) => {
				abilities.push({
					id: uuidv4(),
					title: art.name,
					description: sanitizeAbilityDescription(
						`**${art.category}** (${art.weapons})\n\n${art.effect}`,
					),
					tag: 'Combat Art' as const,
				})
			})
		}
	})

	// Process archetype starting equipment
	const archetypeWeapons: any[] = []
	const archetypeItems: any[] = []
	let equipmentCost = 0

	if (
		archetype?.startingEquipment &&
		Array.isArray(archetype.startingEquipment) &&
		includeStartingGear
	) {
		archetype.startingEquipment.forEach((equipmentName) => {
			// Parse quantity notation to get the actual item name
			let actualName = equipmentName
			const quantityMatch = equipmentName.match(/^(.+?)\s+x(\d+)$/i)
			if (quantityMatch) {
				actualName = quantityMatch[1].trim()
			}

			// Check if it's likely a weapon by checking weapons database with the parsed name
			const weaponData = findWeapon(actualName)
			if (weaponData) {
				const weapon = createWeaponFromName(equipmentName)
				if (weapon) {
					archetypeWeapons.push(weapon)
					equipmentCost += weapon.cost * weapon.amount
				}
			} else {
				// It's armor or other equipment
				const item = createItemFromName(equipmentName)
				if (item) {
					archetypeItems.push(item)
					equipmentCost += item.cost * item.amount
				}
			}
		})
	}

	// Add natural weapons from folk abilities (claws, bite, horns)
	const naturalWeapons = createNaturalWeapons(abilities)
	archetypeWeapons.push(...naturalWeapons)

	// Calculate remaining coins (350 starting + 10 unspendable - equipment cost)
	const remainingCoins = includeStartingGear
		? Math.max(10, 360 - equipmentCost)
		: 0

	// Create starting item from background
	const startingItems = []
	if (includeStartingGear) {
		startingItems.push({
			id: uuidv4(),
			name: 'Clothes',
			location: 'worn' as const,
			load: 0,
			notes: '',
			durability: '',
		})

		if (background?.['starting item']) {
			startingItems.push({
				id: uuidv4(),
				name: capitalizeStartingItem(background['starting item']),
				location: 'worn' as const,
				load: 0,
				notes: 'Background starting item',
				durability: '',
			})
		}
	}
	// Determine attribute values (must be valid die values: 4, 6, 8, 10, or 12)
	const strengthValue = (archetype?.attributes.STR || 6) as 4 | 6 | 8 | 10 | 12
	const agilityValue = (archetype?.attributes.AGI || 6) as 4 | 6 | 8 | 10 | 12
	const spiritValue = (archetype?.attributes.SPI || 6) as 4 | 6 | 8 | 10 | 12
	const mindValue = (archetype?.attributes.MND || 6) as 4 | 6 | 8 | 10 | 12

	// Calculate initial HP (12 base + strength value)
	const initialHp = 12 + strengthValue

	// Calculate HP bonus from talents (stored separately from user's maxHpModifier)
	const mysticismSkill = skills.find((s) => s.name === 'Mysticism')
	const mysticismRank = mysticismSkill ? mysticismSkill.rank : 0
	const autoHpBonus = calculateTalentHpBonus(abilities, mysticismRank)

	// Calculate AV bonus from folk abilities (stored separately from user's other values)
	const autoAvBonus = calculateFolkAvBonus(abilities, false) // No armor equipped at character creation

	// Calculate defenses based on attributes and skills
	const fightingSkill = skills.find((s) => s.name === 'Fighting')
	const fightingRank = fightingSkill ? fightingSkill.rank : 0

	const parryValue = 7 + fightingRank
	const dodgeValue = 5 + Math.floor(agilityValue / 2)
	const resistValue = 5 + Math.floor(Math.max(spiritValue, mindValue) / 2)

	const baseCharacter: Character = {
		personal: {
			name,
			playerName,
			folk: folk?.name || '',
			upbringing: upbringing?.name || '',
			background: background?.name || '',
			height: '',
			weight: '',
			age: '',
			description: archetype ? `${archetype.name} (${archetype.role})` : '',
			motivation: '',
			allies: [],
			contacts: [],
			rivals: [],
			npcRelationships: [],
			notes: archetype
				? `Archetype: ${archetype.name}\nBest for: ${archetype.bestFor}\n\n${archetype.description}`
				: '',
		},
		statistics: {
			health: {
				current: initialHp + autoHpBonus,
				temp: 0,
				maxHpModifier: 0, // User-editable override (starts at 0)
				auto: autoHpBonus, // Auto-calculated from talents,
			},
			av: {
				armor: 0,
				helmet: 0,
				shield: 0,
				other: 0,
				auto: autoAvBonus, // Auto-calculated from folk abilities
			},
			strength: {
				value: strengthValue,
				wounded: false,
			},
			agility: {
				value: agilityValue,
				wounded: false,
			},
			spirit: {
				value: spiritValue,
				wounded: false,
			},
			mind: {
				value: mindValue,
				wounded: false,
			},
			parry: parryValue,
			dodge: dodgeValue,
			resist: resistValue,
			resolve: 0,
			fatigue: {
				current: 0,
				max: 0,
			},
			statusEffects: [],
		},
		skills: {
			xp: {
				total: totalXp,
				spend: totalXp,
			},
			skills: skills,
			professions: [],
			languages: languages,
			abilities: abilities,
		},
		items: {
			coins: remainingCoins,
			encumbrance: {
				encumberedAt: 0,
				overencumberedAt: 0,
				carryModifier: 0,
				currentLoad: 0,
				mountMaxLoad: 0,
				storageMaxLoad: 0,
			},
			weapons: archetypeWeapons,
			items: includeStartingGear
				? [
						{
							id: uuidv4(),
							name: 'Backpack',
							properties: [] as string[],
							cost: 15,
							weight: 0,
							container: 'worn' as const,
							amount: 1,
							location: 'worn' as const,
							uses: 0,
							durability: '' as const,
						},
						{
							id: uuidv4(),
							name: 'Pouch',
							properties: [] as string[],
							cost: 5,
							weight: 0,
							container: 'worn' as const,
							amount: 2,
							location: 'worn' as const,
							uses: 0,
							durability: '' as const,
						},
						{
							id: uuidv4(),
							name: "Traveler's Clothes",
							properties: [] as string[],
							cost: 25,
							weight: 0,
							container: 'worn' as const,
							amount: 1,
							location: 'worn' as const,
							uses: 0,
							durability: '' as const,
						},
						{
							id: uuidv4(),
							name: 'Rope (Hemp)',
							properties: [] as string[],
							cost: 10,
							weight: 1,
							container: 'backpack' as const,
							amount: 1,
							location: 'carried' as const,
							uses: 0,
							durability: '' as const,
						},
						{
							id: uuidv4(),
							name: 'Camping Kit',
							properties: [] as string[],
							cost: 50,
							weight: 1,
							container: 'backpack' as const,
							amount: 1,
							location: 'carried' as const,
							uses: 0,
							durability: '' as const,
						},
						{
							id: uuidv4(),
							name: 'Adventuring Gear (Tool)',
							properties: [] as string[],
							cost: 50,
							weight: 1,
							container: 'backpack' as const,
							amount: 1,
							location: 'carried' as const,
							uses: 0,
							durability: '' as const,
						},
						{
							id: uuidv4(),
							name: 'Simple Rations',
							properties: ['d4 Supply die'] as string[],
							cost: 15,
							weight: 1,
							container: 'backpack' as const,
							amount: 1,
							location: 'carried' as const,
							uses: 0,
							durability: '' as const,
						},
						{
							id: uuidv4(),
							name: 'Torch',
							properties: ['d4 Supply die'] as string[],
							cost: 15,
							weight: 1,
							container: 'backpack' as const,
							amount: 1,
							location: 'carried' as const,
							uses: 0,
							durability: '' as const,
						},
						// Add background starting item if present
						...(background?.['starting item']
							? [
									{
										id: uuidv4(),
										name: capitalizeStartingItem(background['starting item']),
										properties: [] as string[],
										cost: 0,
										weight: 0,
										container: 'worn' as const,
										amount: 1,
										location: 'worn' as const,
										uses: 0,
										durability: '' as const,
									},
								]
							: []),
						// Add archetype equipment items
						...archetypeItems,
					]
				: [],
		},
		spells: {
			magicSkill:
				spellData?.magicSkill ||
				(uniqueRank1Skills.includes('Arcana')
					? 'Arcana'
					: uniqueRank1Skills.includes('Mysticism')
						? 'Mysticism'
						: ''),
			specialization:
				chosenSpellPath || spellData?.specialization || spellData?.magicSkill || '',
			focus: {
				total:
					spellData ||
					uniqueRank1Skills.includes('Arcana') ||
					uniqueRank1Skills.includes('Mysticism')
						? spiritValue - 2 + 2 // (Spirit - 2) + (2 × Magic Skill Rank 1) = Spirit - 2 + 2
						: 0,
				current:
					spellData ||
					uniqueRank1Skills.includes('Arcana') ||
					uniqueRank1Skills.includes('Mysticism')
						? spiritValue - 2 + 2
						: 0,
			},
			spellCatalystDamage: 0,
			spells:
				spellData && startingSpells.length
					? (dedupedStartingSpells.length ? dedupedStartingSpells : startingSpells)
							.map((spellInfo) => {
								const magicSkill =
									spellData?.magicSkill ||
									(uniqueRank1Skills.includes('Arcana')
										? 'Arcana'
										: 'Mysticism')
								return createSpellFromData(spellInfo.name, magicSkill)
							})
							.filter(
								(spell): spell is NonNullable<typeof spell> =>
									spell !== null,
							)
					: [],
		},
		companions: [],
	}

	// Add companion if archetype has Animal Companion talent and a companion is selected
	if (
		archetype?.recommendedTalents?.includes('Animal Companion') &&
		selectedCompanion
	) {
		const companionTraitName = selectedCompanion
		const companionTrait = (companionTraitsData as CompanionTrait[]).find(
			(trait) => trait.name === companionTraitName,
		)

		if (companionTrait) {
			// Determine tier based on Nature skill rank (assuming rank 1 for initial character)
			const natureSkillRank = 1

			// Determine size - for tier 1, max size is Small, so use Small for most animals
			const companionSize = 'Small'

			// Calculate stats for the companion
			const calculatedStats = calculateStats(
				natureSkillRank,
				companionSize,
				companionTrait,
			)

			const companionStats: CompanionStats = {
				tier: natureSkillRank,
				size: companionSize,
				trait: companionTrait,
				calculatedStats,
			}

			// Generate markdown for the companion
			const companionMarkdown = generateMarkdown(companionStats)

			// Add to companions array
			baseCharacter.companions.push({
				id: uuidv4(),
				name: companionTraitName,
				markdown: companionMarkdown,
				currentHP: calculatedStats.hp,
				maxHP: calculatedStats.hp,
				wounded: false,
			})
		}
	}

	// Add familiar if archetype has Conjure Familiar spell and a familiar is selected
	const hasConjureFamiliar = baseCharacter.spells.spells.some(
		(spell) => spell.name === 'Conjure Familiar',
	)

	if (hasConjureFamiliar && selectedFamiliar) {
		const familiarTraitName = selectedFamiliar
		const familiarTrait = (companionTraitsData as CompanionTrait[]).find(
			(trait) => trait.name === familiarTraitName,
		)

		if (familiarTrait) {
			// Familiars are tier 0 (Arcana rank 0 at character creation)
			const familiarTier = 0

			// Familiars are always Tiny size
			const familiarSize = 'Tiny'

			// Calculate stats for the familiar
			const calculatedStats = calculateStats(
				familiarTier,
				familiarSize,
				familiarTrait,
			)

			const familiarStats: CompanionStats = {
				tier: familiarTier,
				size: familiarSize,
				trait: familiarTrait,
				calculatedStats,
			}

			// Generate markdown for the familiar
			const familiarMarkdown = generateMarkdown(familiarStats)

			// Add to companions array
			baseCharacter.companions.push({
				id: uuidv4(),
				name: familiarTraitName,
				markdown: familiarMarkdown,
				currentHP: calculatedStats.hp,
				maxHP: calculatedStats.hp,
				wounded: false,
			})
		}
	}

	// Calculate initial AV values and Parry bonus from starting equipment
	if (includeStartingGear) {
		// Organize items by location to use extraction utilities
		const itemsByLocation = organizeItemsByLocation(
			baseCharacter.items.weapons,
			baseCharacter.items.items,
		)

		// Extract AV values from equipped armor, helmet, and shields
		const { armorAV, helmetAV, shieldAV } = extractArmorValues(itemsByLocation)

		// Calculate folk AV bonus (Stoneskin, Thick Scales)
		// Thick Scales gives +3 AV if no armor, or +1 if wearing armor
		const hasArmorEquipped = armorAV > 0
		const folkAvBonus = calculateFolkAvBonus(abilities, hasArmorEquipped)

		// Extract Parry bonus from equipped shields
		const shieldParryBonus = extractShieldParryBonus(itemsByLocation)

		// Update character statistics with calculated values
		baseCharacter.statistics.av.armor = armorAV
		baseCharacter.statistics.av.helmet = helmetAV
		baseCharacter.statistics.av.shield = shieldAV
		baseCharacter.statistics.av.auto = folkAvBonus // Auto-calculated from folk abilities
		// baseCharacter.statistics.av.other remains 0 for user customization

		// Add shield parry bonus to base parry value
		if (shieldParryBonus > 0) {
			baseCharacter.statistics.parry = parryValue + shieldParryBonus

			// Also set parryDetails if using the new defense system
			if (!baseCharacter.statistics.parryDetails) {
				baseCharacter.statistics.parryDetails = {
					base: parryValue,
					levelBonus: 0,
					shieldBonus: shieldParryBonus,
					other: 0,
				}
			}
		}
	}

	return baseCharacter
}

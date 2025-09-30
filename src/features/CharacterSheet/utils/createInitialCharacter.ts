import { Character } from '../../../types/Character'
import type { FolkData, UpbringingData, BackgroundData } from '../components'
import { v4 as uuidv4 } from 'uuid'

/**
 * Capitalizes starting item names to match the item naming convention
 */
const capitalizeStartingItem = (itemName: string): string => {
	return itemName
		.toLowerCase()
		.split(' ')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

/**
 * Parses a comma-separated string of suggested skills and returns an array of skill names
 */
const parseSuggestedSkills = (suggestedSkills: string | undefined): string[] => {
	if (!suggestedSkills) return []
	
	return suggestedSkills
		.split(',')
		.map(skill => skill.trim())
		.filter(skill => skill.length > 0)
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

export type CharacterCreationOptions = {
	includeStartingGear?: boolean
	folk?: FolkData
	upbringing?: UpbringingData
	background?: BackgroundData
}

export const createInitialCharacter = (
	name: string,
	playerName: string,
	options: CharacterCreationOptions = {},
): Character => {
	const { includeStartingGear = false, folk, upbringing, background } = options

	// Collect languages from folk and base languages
	const languages = ['Tradespeak']
	if (folk?.languages) {
		folk.languages.forEach(lang => {
			if (!languages.includes(lang)) {
				languages.push(lang)
			}
		})
	}

	// Collect abilities from folk
	const abilities = []
	if (folk?.abilities) {
		folk.abilities.forEach(ability => {
			abilities.push({
				id: uuidv4(),
				title: ability.name,
				description: ability.description,
				tag: 'Folk' as const,
			})
		})
	}

	// Collect skills from upbringing and background
	const skillNames = []
	if (upbringing?.['suggested skills']) {
		skillNames.push(...parseSuggestedSkills(upbringing['suggested skills']))
	}
	if (background?.['suggested skills']) {
		skillNames.push(...parseSuggestedSkills(background['suggested skills']))
	}

	// Remove duplicates and resolve conflicts
	const uniqueSkillNames = [...new Set(skillNames)]
	const resolvedSkillNames = resolveSkillConflicts(uniqueSkillNames)

	// Create skill objects
	const skills = resolvedSkillNames.map(skillName => ({
		id: uuidv4(),
		name: skillName,
		rank: 1,
		xp: 0,
	}))

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
			description: '',
			motivation: '',
			allies: [],
			contacts: [],
			rivals: [],
			npcRelationships: [],
			notes: '',
		},
		statistics: {
			health: {
				current: 18, // Default for d6 strength at level 1 (12 + 6)
				temp: 0,
				maxHpModifier: 0,
			},
			av: {
				armor: 0,
				helmet: 0,
				shield: 0,
				other: 0,
			},
			strength: {
				value: 6,
				wounded: false,
			},
			agility: {
				value: 6,
				wounded: false,
			},
			spirit: {
				value: 6,
				wounded: false,
			},
			mind: {
				value: 6,
				wounded: false,
			},
			parry: 0,
			dodge: 0,
			resist: 0,
			resolve: 0,
			fatigue: {
				current: 0,
				max: 0,
			},
			statusEffects: [],
		},
		skills: {
			xp: {
				total: 0,
				spend: 0,
			},
			skills: skills,
			professions: [],
			languages: languages,
			abilities: abilities,
		},
		items: {
			coins: includeStartingGear ? 10 : 0,
			encumbrance: {
				encumberedAt: 0,
				overencumberedAt: 0,
				carryModifier: 0,
				currentLoad: 0,
				mountMaxLoad: 0,
				storageMaxLoad: 0,
			},
			weapons: [],
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
						...(background?.['starting item'] ? [{
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
						}] : [])
					]
				: [],
		},
		spells: {
			magicSkill: '',
			specialization: '',
			focus: {
				total: 0,
				current: 0,
			},
			spellCatalystDamage: 0,
			spells: [],
		},
		companions: [],
	}

	return baseCharacter
}

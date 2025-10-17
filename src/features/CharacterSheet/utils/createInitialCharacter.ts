import { Character } from '../../../types/Character'
import type { FolkData, UpbringingData, BackgroundData, ArchetypeData } from '../components'
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
	archetype?: ArchetypeData
}

export const createInitialCharacter = (
	name: string,
	playerName: string,
	options: CharacterCreationOptions = {},
): Character => {
	const { includeStartingGear = false, folk, upbringing, background, archetype } = options

	// Collect languages from folk and base languages
	const languages = ['Tradespeak']
	if (folk?.languages) {
		folk.languages.forEach(lang => {
			if (!languages.includes(lang)) {
				languages.push(lang)
			}
		})
	}

	// Collect abilities from folk and archetype
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
	if (archetype?.recommendedTalents) {
		// Add archetype talent recommendations as notes
		abilities.push({
			id: uuidv4(),
			title: `${archetype.name} Recommended Talents`,
			description: `Consider these talents for your ${archetype.name} build: ${archetype.recommendedTalents.join(', ')}`,
			tag: 'Note' as const,
		})
	}

	// Collect skills from archetype, upbringing and background
	const skillNames = []
	if (archetype?.suggestedSkills) {
		skillNames.push(...parseSuggestedSkills(archetype.suggestedSkills))
	}
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
	// Determine attribute values (must be valid die values: 4, 6, 8, 10, or 12)
	const strengthValue = (archetype?.attributes.STR || 6) as 4 | 6 | 8 | 10 | 12
	const agilityValue = (archetype?.attributes.AGI || 6) as 4 | 6 | 8 | 10 | 12
	const spiritValue = (archetype?.attributes.SPI || 6) as 4 | 6 | 8 | 10 | 12
	const mindValue = (archetype?.attributes.MND || 6) as 4 | 6 | 8 | 10 | 12
	
	// Calculate initial HP (12 base + strength value)
	const initialHp = 12 + strengthValue

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
			notes: archetype ? `Archetype: ${archetype.name}\nBest for: ${archetype.bestFor}\n\n${archetype.description}` : '',
		},
		statistics: {
			health: {
				current: initialHp,
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

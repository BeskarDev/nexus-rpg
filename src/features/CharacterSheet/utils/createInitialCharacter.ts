import { Character } from '../../../types/Character'
import { ItemLocation } from '../../../types/ItemLocation'
import { v4 as uuidv4 } from 'uuid'

export const createInitialCharacter = (
	name: string,
	playerName: string,
	includeStartingGear: boolean = false,
): Character => {
	const baseCharacter: Character = {
		personal: {
			name,
			playerName,
			folk: '',
			upbringing: '',
			background: '',
			height: '',
			weight: '',
			age: '',
			description: '',
			motivation: '',
			allies: [],
			contacts: [],
			rivals: [],
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
			skills: [],
			professions: [],
			languages: ['Tradespeak'],
			abilities: [],
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
							properties: '',
							description:
								'A simple backpack or satchel. If this is your first backpack, it takes up 0 load instead.',
							slot: '',
							cost: 15,
							load: 0,
							container: 'worn',
							amount: 1,
							location: 'Equipped Gear' as ItemLocation,
							uses: 0,
							durability: '',
						},
						{
							id: uuidv4(),
							name: 'Pouch',
							properties: '',
							description:
								'A simple pouch to be carried around by hand or on a belt. Can hold up to 1 load.',
							slot: '',
							cost: 5,
							load: 0,
							container: 'worn',
							amount: 2,
							location: 'Equipped Gear' as ItemLocation,
							uses: 0,
							durability: '',
						},
						{
							id: uuidv4(),
							name: "Traveler's Clothes",
							properties: '',
							description:
								'While worn, this takes up 0 load instead. Sturdy clothes made for harsh weather and long journeys.',
							slot: '',
							cost: 25,
							load: 0,
							container: 'worn',
							amount: 1,
							location: 'Equipped Gear' as ItemLocation,
							uses: 0,
							durability: '',
						},
						{
							id: uuidv4(),
							name: 'Rope (Hemp)',
							properties: '',
							description:
								'Covers a medium distance. Can be split up into multiple more fragile strings.',
							slot: '',
							cost: 10,
							load: 1,
							container: 'backpack',
							amount: 1,
							location: 'Carried Items' as ItemLocation,
							uses: 0,
							durability: '',
						},
						{
							id: uuidv4(),
							name: 'Camping Kit',
							properties: '',
							description:
								"Contains a tent, tent pegs, a tinder box, and a bedroll. Provides shelter for a night's rest for up to two people.",
							slot: '',
							cost: 50,
							load: 1,
							container: 'backpack',
							amount: 1,
							location: 'Carried Items' as ItemLocation,
							uses: 0,
							durability: '',
						},
						{
							id: uuidv4(),
							name: 'Adventuring Gear (Tool)',
							properties: '',
							description:
								'Contains a crowbar, a hammer, a shovel, chalk, a wooden pole, and spikes. Spend 1 use to produce one specific item from the list.',
							slot: '',
							cost: 50,
							load: 1,
							container: 'backpack',
							amount: 1,
							location: 'Carried Items' as ItemLocation,
							uses: 0,
							durability: '',
						},
						{
							id: uuidv4(),
							name: 'Simple Rations',
							properties: 'd4 Supply die',
							description:
								"Contains a waterskin and a nutricious yet bland pack consisting of dried meat, fruits, and nuts. Has a d4 Supply die. At the end of each day, make a Supply Check as part of a night's rest.",
							slot: '',
							cost: 15,
							load: 1,
							container: 'backpack',
							amount: 1,
							location: 'Carried Items' as ItemLocation,
							uses: 0,
							durability: '',
						},
						{
							id: uuidv4(),
							name: 'Torch',
							properties: 'd4 Supply die',
							description:
								'Contains about a full night of torch light. A lit torch emits bright light in close range and dim light in short range when lit. Has a d4 Supply die. Make a Supply check when igniting a torch.',
							slot: '',
							cost: 15,
							load: 1,
							container: 'backpack',
							amount: 1,
							location: 'Carried Items' as ItemLocation,
							uses: 0,
							durability: '',
						},
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

import { Character, CharacterDocument } from '../../../types/Character'
import { doc } from 'firebase/firestore'
import { db } from '@site/src/config/firebase'

// Helper function to generate UUIDs consistently with the rest of the codebase
const generateId = () => crypto.randomUUID()

/**
 * Mock character data for local development testing.
 * This provides a complete character with all required fields
 * to test the skills dropdown and other UI components.
 * 
 * Only available in development environment.
 */
export const createMockCharacter = (): CharacterDocument => {
	const mockCharacter: Character = {
		personal: {
			name: 'Kael Stormwind',
			playerName: 'Developer Test',
			folk: 'Akashic',
			upbringing: 'Urban',
			background: 'Scholar',
			height: '6\'0"',
			weight: '180 lbs',
			age: '28',
			description: 'A tall, scholarly figure with weathered hands and keen eyes. Wears practical robes suited for both study and adventure.',
			motivation: 'To uncover the lost secrets of ancient civilizations and preserve knowledge for future generations.',
			profilePicture: '',
			allies: [
				{
					id: generateId(),
					description: 'Master Theron - Former mentor at the Academy of Sciences'
				}
			],
			contacts: [
				{
					id: generateId(),
					description: 'Lyra - Information broker in the city\'s merchant quarter'
				}
			],
			rivals: [
				{
					id: generateId(),
					description: 'Vex Shadowmere - Competing scholar who uses questionable methods'
				}
			],
			notes: 'Fascinated by ancient texts and archaeological discoveries. Tends to get lost in research.'
		},
		statistics: {
			health: {
				current: 25,
				temp: 0,
				maxHpModifier: 0
			},
			fatigue: {
				current: 0,
				max: 6
			},
			av: {
				armor: 1,
				helmet: 0,
				shield: 0,
				other: 0
			},
			strength: {
				value: 6,
				wounded: false
			},
			agility: {
				value: 8,
				wounded: false
			},
			spirit: {
				value: 10,
				wounded: false
			},
			mind: {
				value: 12,
				wounded: false
			},
			parry: 8,
			dodge: 10,
			resist: 12,
			resolve: 3,
			statusEffects: []
		},
		skills: {
			xp: {
				total: 45,
				spend: 42
			},
			skills: [
				{
					id: generateId(),
					name: 'Arcana',
					rank: 3,
					xp: 12
				},
				{
					id: generateId(),
					name: 'Education',
					rank: 2,
					xp: 6
				},
				{
					id: generateId(),
					name: 'Lore',
					rank: 2,
					xp: 6
				},
				{
					id: generateId(),
					name: 'Insight',
					rank: 2,
					xp: 6
				},
				{
					id: generateId(),
					name: 'Perception',
					rank: 2,
					xp: 6
				},
				{
					id: generateId(),
					name: 'Crafting',
					rank: 1,
					xp: 2
				},
				{
					id: generateId(),
					name: 'Athletics',
					rank: 1,
					xp: 2
				},
				{
					id: generateId(),
					name: 'Fortitude',
					rank: 1,
					xp: 2
				}
			],
			professions: ['Alchemist', 'Inscriber'],
			abilities: [
				{
					id: generateId(),
					title: 'Spell Weaving',
					description: 'Can combine two spells of rank 1 or lower into a single casting.',
					tag: 'Talent'
				},
				{
					id: generateId(),
					title: 'Ancient Knowledge',
					description: 'Gain +2 boons when recalling information about historical events or civilizations.',
					tag: 'Talent'
				},
				{
					id: generateId(),
					title: 'Keen Mind',
					description: 'Can perfectly recall anything seen or heard within the last month.',
					tag: 'Talent'
				}
			],
			abilityCategoryVisibility: {
				'Combat Art': true,
				'Talent': true,
				'Folk': true,
				'Other': true
			}
		},
		items: {
			coins: 250,
			encumbrance: {
				encumberedAt: 8,
				overencumberedAt: 12,
				carryModifier: 0,
				currentLoad: 6,
				mountMaxLoad: 0,
				storageMaxLoad: 0
			},
			weapons: [
				{
					id: generateId(),
					name: 'Scholar\'s Staff',
					damage: {
						base: 'STR',
						weapon: 3,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'physical',
						staticDamage: false
					},
					properties: 'reach, two-handed, arcane catalyst',
					description: 'A gnarled oak staff topped with a crystal focus. Serves as both walking aid and magical implement.',
					cost: 45,
					load: 2,
					location: 'worn',
					uses: 0,
					durability: 'd8'
				}
			],
			items: [
				{
					id: generateId(),
					name: 'Traveler\'s Robes',
					properties: 'light armor, +1 AV',
					description: 'Well-made robes designed for comfort during long journeys.',
					slot: 'body',
					cost: 25,
					load: 1,
					container: 'worn',
					amount: 1,
					location: 'worn',
					uses: 0,
					durability: 'd6'
				},
				{
					id: generateId(),
					name: 'Spellbook',
					properties: 'arcane focus',
					description: 'A leather-bound tome containing spell formulas and magical theory.',
					slot: '',
					cost: 30,
					load: 1,
					container: 'backpack',
					amount: 1,
					location: 'carried',
					uses: 0,
					durability: 'd6'
				},
				{
					id: generateId(),
					name: 'Alchemy Kit',
					properties: 'crafting tools',
					description: 'A collection of vials, burners, and reagents for alchemical work.',
					slot: '',
					cost: 50,
					load: 2,
					container: 'backpack',
					amount: 1,
					location: 'carried',
					uses: 0,
					durability: 'd8'
				}
			],
			itemLocationVisibility: {
				'worn': true,
				'carried': true,
				'mount': true,
				'storage': true
			}
		},
		spells: {
			magicSkill: 'Arcana',
			specialization: 'Evocation',
			focus: {
				total: 14,
				current: 11
			},
			spellCatalystDamage: 0,
			spells: [
				{
					id: generateId(),
					name: 'Mage Light',
					rank: 0,
					cost: 0,
					target: 'special',
					range: 'touch',
					properties: 'concentrate',
					dealsDamage: false,
					damage: {
						base: '',
						weapon: 0,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'radiant',
						staticDamage: false
					},
					effect: 'Creates a bright light source that lasts until concentration ends.'
				},
				{
					id: generateId(),
					name: 'Magic Missile',
					rank: 1,
					cost: 2,
					target: 'Dodge',
					range: 'medium',
					properties: '',
					dealsDamage: true,
					damage: {
						base: 'MND',
						weapon: 4,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'psychic',
						staticDamage: false
					},
					effect: 'Launches a bolt of pure magical energy at a target.'
				},
				{
					id: generateId(),
					name: 'Shield',
					rank: 1,
					cost: 2,
					target: 'special',
					range: 'self',
					properties: 'quick',
					dealsDamage: false,
					damage: {
						base: '',
						weapon: 0,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'psychic',
						staticDamage: false
					},
					effect: 'Creates a magical barrier that provides +2 AV until your next turn.'
				}
			]
		},
		companions: [],
		partyId: undefined
	}

	return {
		...mockCharacter,
		docRef: doc(db, 'mock-collection', 'mock-character-1'),
		docId: 'mock-character-1',
		collectionId: 'mock-collection'
	}
}

/**
 * Creates a second mock character for testing multiple character scenarios
 */
export const createSecondMockCharacter = (): CharacterDocument => {
	const secondMockCharacter: Character = {
		personal: {
			name: 'Thara Ironforge',
			playerName: 'Developer Test',
			folk: 'Vorthak',
			upbringing: 'Rural',
			background: 'Artisan',
			height: '5\'4"',
			weight: '160 lbs',
			age: '35',
			description: 'A stout, muscular smith with calloused hands and burn scars from the forge. Her beard is braided with small metal trinkets.',
			motivation: 'To forge legendary weapons that will be remembered for generations.',
			profilePicture: '',
			allies: [],
			contacts: [],
			rivals: [],
			notes: 'Master of metalworking and weapon crafting. Values tradition and quality above all else.'
		},
		statistics: {
			health: {
				current: 32,
				temp: 0,
				maxHpModifier: 0
			},
			fatigue: {
				current: 0,
				max: 8
			},
			av: {
				armor: 4,
				helmet: 0,
				shield: 2,
				other: 0
			},
			strength: {
				value: 12,
				wounded: false
			},
			agility: {
				value: 8,
				wounded: false
			},
			spirit: {
				value: 10,
				wounded: false
			},
			mind: {
				value: 6,
				wounded: false
			},
			parry: 12,
			dodge: 8,
			resist: 9,
			resolve: 4,
			statusEffects: []
		},
		skills: {
			xp: {
				total: 50,
				spend: 48
			},
			skills: [
				{
					id: generateId(),
					name: 'Fighting',
					rank: 3,
					xp: 12
				},
				{
					id: generateId(),
					name: 'Crafting',
					rank: 3,
					xp: 12
				},
				{
					id: generateId(),
					name: 'Fortitude',
					rank: 2,
					xp: 6
				},
				{
					id: generateId(),
					name: 'Athletics',
					rank: 2,
					xp: 6
				},
				{
					id: generateId(),
					name: 'Perception',
					rank: 2,
					xp: 6
				},
				{
					id: generateId(),
					name: 'Insight',
					rank: 1,
					xp: 2
				},
				{
					id: generateId(),
					name: 'Streetwise',
					rank: 1,
					xp: 2
				},
				{
					id: generateId(),
					name: 'Influence',
					rank: 1,
					xp: 2
				}
			],
			professions: ['Smith', 'Jeweler'],
			abilities: [
				{
					id: generateId(),
					title: 'Master Crafter',
					description: 'Can create items of exceptional quality with +1 boon to crafting rolls.',
					tag: 'Talent'
				},
				{
					id: generateId(),
					title: 'Combat Reflexes',
					description: 'Gain +1 to Initiative and can make opportunity attacks.',
					tag: 'Combat Art'
				},
				{
					id: generateId(),
					title: 'Iron Will',
					description: 'Gain +2 boons against fear and intimidation effects.',
					tag: 'Talent'
				}
			],
			abilityCategoryVisibility: {
				'Combat Art': true,
				'Talent': true,
				'Folk': true,
				'Other': true
			}
		},
		items: {
			coins: 180,
			encumbrance: {
				encumberedAt: 12,
				overencumberedAt: 18,
				carryModifier: 0,
				currentLoad: 14,
				mountMaxLoad: 0,
				storageMaxLoad: 0
			},
			weapons: [
				{
					id: generateId(),
					name: 'Masterwork Warhammer',
					damage: {
						base: 'STR',
						weapon: 6,
						other: 0,
						otherWeak: 0,
						otherStrong: 0,
						otherCritical: 0,
						type: 'physical',
						staticDamage: false
					},
					properties: 'crush, two-handed',
					description: 'A perfectly balanced warhammer of her own creation, inscribed with protective runes.',
					cost: 120,
					load: 3,
					location: 'worn',
					uses: 0,
					durability: 'd10'
				}
			],
			items: [
				{
					id: generateId(),
					name: 'Scale Mail',
					properties: 'heavy armor, +4 AV',
					description: 'Well-maintained scale armor that provides excellent protection.',
					slot: 'body',
					cost: 80,
					load: 4,
					container: 'worn',
					amount: 1,
					location: 'worn',
					uses: 0,
					durability: 'd10'
				},
				{
					id: generateId(),
					name: 'Steel Shield',
					properties: 'shield, +2 AV',
					description: 'A round steel shield with the symbol of her clan.',
					slot: '',
					cost: 40,
					load: 2,
					container: 'worn',
					amount: 1,
					location: 'worn',
					uses: 0,
					durability: 'd8'
				}
			],
			itemLocationVisibility: {
				'worn': true,
				'carried': true,
				'mount': true,
				'storage': true
			}
		},
		spells: {
			magicSkill: '',
			specialization: '',
			focus: {
				total: 0,
				current: 0
			},
			spellCatalystDamage: 0,
			spells: []
		},
		companions: [],
		partyId: undefined
	}

	return {
		...secondMockCharacter,
		docRef: doc(db, 'mock-collection', 'mock-character-2'),
		docId: 'mock-character-2',
		collectionId: 'mock-collection'
	}
}

/**
 * List of all available mock characters for development testing
 */
export const getMockCharacters = (): CharacterDocument[] => {
	return [
		createMockCharacter(),
		createSecondMockCharacter()
	]
}

/**
 * Checks if we're in development environment.
 * In Docusaurus, we can check for NODE_ENV or use window.location
 */
export const isDevelopmentEnvironment = (): boolean => {
	// Check if we're on localhost or development server
	if (typeof window !== 'undefined') {
		return window.location.hostname === 'localhost' || 
		       window.location.hostname === '127.0.0.1' ||
		       window.location.hostname.includes('localhost')
	}
	
	// Fallback for server-side rendering
	return process.env.NODE_ENV === 'development'
}
import {
	Character,
	CharacterDocument,
	Companion,
	Skill,
	Weapon,
	Item,
	Spell,
	Ability,
} from '@site/src/types/Character'
import { AbilityTag } from '@site/src/types/AbilityTag'
import { ItemLocation } from '@site/src/types/ItemLocation'

/**
 * Test fixtures for Character Sheet testing
 * Provides realistic test data and factory functions for creating test characters
 */

export const createBasicCharacter = (): Character => ({
	personal: {
		name: 'Test Hero',
		playerName: 'Test Player',
		folk: 'Human',
		upbringing: 'Common',
		background: 'Warrior',
		height: '6\'0"',
		weight: '180 lbs',
		age: '25',
		description: 'A brave warrior',
		motivation: 'To protect the innocent',
		profilePicture: '',
		allies: [],
		contacts: [],
		rivals: [],
		notes: '',
	},
	statistics: {
		health: {
			current: 30,
			temp: 0,
			maxHpModifier: 0,
		},
		fatigue: {
			current: 0,
			max: 8,
		},
		av: {
			armor: 4,
			helmet: 0,
			shield: 0,
			other: 0,
		},
		strength: { value: 10, wounded: false },
		agility: { value: 8, wounded: false },
		spirit: { value: 8, wounded: false },
		mind: { value: 6, wounded: false },
		parry: 11,
		dodge: 10,
		resist: 9,
		resolve: 3,
		statusEffects: [],
	},
	skills: {
		xp: {
			total: 50,
			spend: 50,
		},
		skills: [
			{ id: '1', name: 'Fighting', rank: 3, xp: 18 },
			{ id: '2', name: 'Athletics', rank: 2, xp: 8 },
			{ id: '3', name: 'Perception', rank: 1, xp: 3 },
		],
		professions: ['Soldier'],
		languages: ['Tradespeak', 'Common'],
		abilities: [],
	},
	items: {
		coins: 100,
		weapons: [
			{
				id: 'weapon1',
				name: 'Longsword',
				damage: {
					base: 'STR',
					weapon: 4,
					other: 0,
					otherWeak: 0,
					otherStrong: 0,
					otherCritical: 0,
					type: 'physical',
				},
				properties: 'versatile',
				description: 'A well-balanced sword',
				cost: 50,
				load: 2,
				location: 'worn' as ItemLocation,
				uses: 0,
				durability: 'd8',
			},
		],
		items: [
			{
				id: 'item1',
				name: 'Backpack',
				properties: 'container',
				description: 'A sturdy traveling pack',
				slot: '',
				cost: 10,
				load: 1,
				container: 'worn',
				amount: 1,
				location: 'worn' as ItemLocation,
				uses: 0,
				durability: 'd6',
			},
		],
		encumbrance: {
			encumberedAt: 12,
			overencumberedAt: 16,
			carryModifier: 0,
			currentLoad: 6,
			mountMaxLoad: 0,
			storageMaxLoad: 20,
		},
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
})

export const createCharacterDocument = (
	overrides: Partial<Character> = {},
): CharacterDocument => ({
	docId: 'test-character-id',
	docRef: { id: 'test-character-id' } as any,
	collectionId: 'test-collection',
	...createBasicCharacter(),
	...overrides,
})

export const createTestSkill = (overrides: Partial<Skill> = {}): Skill => ({
	id: crypto.randomUUID(),
	name: 'Test Skill',
	rank: 1,
	xp: 3,
	...overrides,
})

export const createTestWeapon = (overrides: Partial<Weapon> = {}): Weapon => ({
	id: crypto.randomUUID(),
	name: 'Test Weapon',
	damage: {
		base: 'STR',
		weapon: 2,
		other: 0,
		otherWeak: 0,
		otherStrong: 0,
		otherCritical: 0,
		type: 'physical',
	},
	properties: '',
	description: '',
	cost: 25,
	load: 1,
	location: 'carried' as ItemLocation,
	uses: 0,
	durability: 'd6',
	...overrides,
})

export const createTestItem = (overrides: Partial<Item> = {}): Item => ({
	id: crypto.randomUUID(),
	name: 'Test Item',
	properties: '',
	description: '',
	slot: '',
	cost: 5,
	load: 1,
	container: 'backpack',
	amount: 1,
	location: 'carried' as ItemLocation,
	uses: 0,
	durability: 'd6',
	...overrides,
})

export const createTestSpell = (overrides: Partial<Spell> = {}): Spell => ({
	id: crypto.randomUUID(),
	name: 'Test Spell',
	rank: 1,
	cost: 2,
	target: '',
	range: 'close',
	properties: '',
	dealsDamage: false,
	damage: {
		base: '',
		weapon: 0,
		other: 0,
		otherWeak: 0,
		otherStrong: 0,
		otherCritical: 0,
		type: 'physical',
		staticDamage: false,
	},
	effect: 'A test spell effect',
	...overrides,
})

export const createTestCompanion = (
	overrides: Partial<Companion> = {},
): Companion => ({
	id: crypto.randomUUID(),
	name: 'Test Companion',
	markdown: 'A loyal companion',
	currentHP: 10,
	maxHP: 10,
	wounded: false,
	...overrides,
})

export const createTestAbility = (
	overrides: Partial<Ability> = {},
): Ability => ({
	id: crypto.randomUUID(),
	title: 'Test Ability',
	description: 'A test ability description',
	tag: 'Other' as AbilityTag,
	actionType: 'Action',
	...overrides,
})

// Character with comprehensive test data for migration testing
export const createLegacyCharacter = (): any => ({
	personal: {
		name: 'Legacy Character',
		playerName: 'Test Player',
		folk: 'Elf',
		upbringing: 'Noble',
		background: 'Scholar',
		height: '5\'8"',
		weight: '140 lbs',
		age: '120',
		description: 'An old character format',
		motivation: 'To test migration',
		profilePicture: '',
		allies: [],
		contacts: [],
		rivals: [],
		notes: '',
	},
	statistics: {
		health: {
			current: 20,
			temp: 0,
			maxHpModifier: 0,
		},
		fatigue: {
			current: 2,
			max: 6,
		},
		av: {
			armor: 1,
			helmet: 0,
			shield: 0,
			other: 0,
		},
		strength: { value: 6, wounded: false },
		agility: { value: 8, wounded: false },
		spirit: { value: 10, wounded: false },
		mind: { value: 10, wounded: false },
		parry: 8,
		dodge: 10,
		resist: 12,
		resolve: 2,
		// Missing statusEffects array - should be migrated
	},
	skills: {
		xp: { total: 30, spend: 25 },
		skills: [
			// Skills with mismatched XP/rank - should be corrected
			{ id: '1', name: 'Education', rank: 1, xp: 15 }, // Should be rank 3
			{ id: '2', name: 'Lore', rank: 2, xp: 3 }, // Should be rank 1
		],
		professions: ['Scholar'],
		languages: ['Tradespeak'],
		abilities: [],
	},
	items: {
		coins: 50,
		weapons: [],
		items: [],
		encumbrance: {
			encumberedAt: 8,
			overencumberedAt: 12,
			carryModifier: 0,
			currentLoad: 0,
			mountMaxLoad: 0,
			// Missing storageMaxLoad - should be migrated
		},
	},
	spells: {
		magicSkill: 'Arcana',
		specialization: 'Evocation',
		focus: {
			total: 4,
			current: 4,
		},
		spellCatalystDamage: 3,
		spells: [],
	},
	// Missing companions array - should be migrated
})

export const createMinimalCharacter = (): Character => ({
	personal: {
		name: 'Minimal Character',
		playerName: 'Test Player',
		folk: 'Human',
		upbringing: 'Common',
		background: 'Commoner',
		height: '',
		weight: '',
		age: '',
		description: '',
		motivation: '',
		profilePicture: '',
		allies: [],
		contacts: [],
		rivals: [],
		notes: '',
	},
	statistics: {
		health: {
			current: 10,
			temp: 0,
			maxHpModifier: 0,
		},
		fatigue: {
			current: 0,
			max: 4,
		},
		av: {
			armor: 0,
			helmet: 0,
			shield: 0,
			other: 0,
		},
		strength: { value: 6, wounded: false },
		agility: { value: 6, wounded: false },
		spirit: { value: 6, wounded: false },
		mind: { value: 6, wounded: false },
		parry: 6,
		dodge: 6,
		resist: 6,
		resolve: 1,
		statusEffects: [],
	},
	skills: {
		xp: { total: 0, spend: 0 },
		skills: [],
		professions: [],
		languages: ['Tradespeak'],
		abilities: [],
	},
	items: {
		coins: 0,
		weapons: [],
		items: [],
		encumbrance: {
			encumberedAt: 8,
			overencumberedAt: 12,
			carryModifier: 0,
			currentLoad: 0,
			mountMaxLoad: 0,
			storageMaxLoad: 0,
		},
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
})

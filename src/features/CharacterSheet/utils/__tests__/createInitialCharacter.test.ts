import { createInitialCharacter } from '../createInitialCharacter'
import type { FolkData, UpbringingData, BackgroundData } from '../../components'

describe('createInitialCharacter with Folk, Upbringing, and Background', () => {
	const mockFolk: FolkData = {
		name: 'Dwarf',
		category: 'Old Folk',
		quote: 'The stone remembers what flesh forgets.',
		description:
			'Carved of the stone itself, dwarves maintain a deep connection to the earth.',
		abilities: [
			{ name: 'Dwarven Sight', description: 'You can see in darkness' },
			{ name: 'Stoneskin', description: 'You gain +1 AV' },
		],
		languages: ['Dwarven'],
		known_cultures: [],
		far_away_cultures: [],
	}

	const mockUpbringing: UpbringingData = {
		name: 'Artisanal',
		description: 'Raised as a member of a crafting or trade organization.',
		'suggested skills': 'Crafting, Insight, Perception',
	}

	const mockBackground: BackgroundData = {
		name: 'Artisan',
		description: 'A character who crafts functional and beautiful items.',
		'suggested skills': 'Crafting, Education, Fortitude, Perception',
		'starting item': "Clay tablet with master's seal",
	}

	it('creates character with basic info only', () => {
		const character = createInitialCharacter('Test Character', 'Test Player')

		expect(character.personal.name).toBe('Test Character')
		expect(character.personal.playerName).toBe('Test Player')
		expect(character.personal.folk).toBe('')
		expect(character.personal.upbringing).toBe('')
		expect(character.personal.background).toBe('')
		expect(character.skills.languages).toEqual(['Tradespeak'])
		expect(character.skills.abilities).toEqual([])
	})

	it('creates character with folk selection', () => {
		const character = createInitialCharacter('Test Character', 'Test Player', {
			folk: mockFolk,
		})

		expect(character.personal.folk).toBe('Dwarf')
		expect(character.skills.languages).toContain('Dwarven')
		expect(character.skills.languages).toContain('Tradespeak')
		expect(character.skills.abilities).toHaveLength(2)
		expect(character.skills.abilities[0].title).toBe('Dwarven Sight')
		expect(character.skills.abilities[0].tag).toBe('Folk')
		expect(character.skills.abilities[1].title).toBe('Stoneskin')
		expect(character.skills.abilities[1].tag).toBe('Folk')
	})

	it('creates character with upbringing selection', () => {
		const character = createInitialCharacter('Test Character', 'Test Player', {
			upbringing: mockUpbringing,
		})

		expect(character.personal.upbringing).toBe('Artisanal')
	})

	it('creates character with background selection', () => {
		const character = createInitialCharacter('Test Character', 'Test Player', {
			background: mockBackground,
			includeStartingGear: true,
		})

		expect(character.personal.background).toBe('Artisan')

		// Check if background starting item was added
		const backgroundItem = character.items.items.find(
			(item) => item.name === "Clay Tablet With Master's Seal",
		)
		expect(backgroundItem).toBeDefined()
		expect(backgroundItem?.location).toBe('worn')
	})

	it('creates character with all selections', () => {
		const character = createInitialCharacter('Test Character', 'Test Player', {
			folk: mockFolk,
			upbringing: mockUpbringing,
			background: mockBackground,
			includeStartingGear: true,
		})

		expect(character.personal.folk).toBe('Dwarf')
		expect(character.personal.upbringing).toBe('Artisanal')
		expect(character.personal.background).toBe('Artisan')

		// Check folk abilities
		expect(character.skills.abilities).toHaveLength(2)
		expect(character.skills.abilities.every((a) => a.tag === 'Folk')).toBe(true)

		// Check folk languages
		expect(character.skills.languages).toContain('Dwarven')
		expect(character.skills.languages).toContain('Tradespeak')

		// Check suggested skills from upbringing and background are added
		const skillNames = character.skills.skills.map((s) => s.name)
		expect(skillNames).toContain('Crafting') // From both upbringing and background
		expect(skillNames).toContain('Insight') // From upbringing
		expect(skillNames).toContain('Perception') // From both upbringing and background
		expect(skillNames).toContain('Education') // From background
		expect(skillNames).toContain('Fortitude') // From background
		// Should not have duplicates even though Crafting and Perception appear in both
		expect(
			character.skills.skills.filter((s) => s.name === 'Crafting'),
		).toHaveLength(1)
		expect(
			character.skills.skills.filter((s) => s.name === 'Perception'),
		).toHaveLength(1)

		// Check background starting item
		const backgroundItem = character.items.items.find(
			(item) => item.name === "Clay Tablet With Master's Seal",
		)
		expect(backgroundItem).toBeDefined()
	})

	it('handles folk without languages gracefully', () => {
		const folkWithoutLanguages: FolkData = {
			...mockFolk,
			languages: [],
		}

		const character = createInitialCharacter('Test Character', 'Test Player', {
			folk: folkWithoutLanguages,
		})

		expect(character.skills.languages).toEqual(['Tradespeak'])
	})

	it('handles background without starting item gracefully', () => {
		const backgroundWithoutItem: BackgroundData = {
			...mockBackground,
			'starting item': '',
		}

		const character = createInitialCharacter('Test Character', 'Test Player', {
			background: backgroundWithoutItem,
			includeStartingGear: true,
		})

		expect(character.personal.background).toBe('Artisan')
		// Should not add any extra items beyond the standard starting gear
		const backgroundItem = character.items.items.find(
			(item) => item.name === "Clay Tablet With Master's Seal",
		)
		expect(backgroundItem).toBeUndefined()
	})

	it('avoids duplicate languages', () => {
		const folkWithTradespeak: FolkData = {
			...mockFolk,
			languages: ['Dwarven', 'Tradespeak'],
		}

		const character = createInitialCharacter('Test Character', 'Test Player', {
			folk: folkWithTradespeak,
		})

		// Should not duplicate Tradespeak
		const tradespeakCount = character.skills.languages.filter(
			(lang) => lang === 'Tradespeak',
		).length
		expect(tradespeakCount).toBe(1)
		expect(character.skills.languages).toContain('Dwarven')
	})
})

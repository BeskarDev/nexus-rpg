import { Page } from '@playwright/test'

/**
 * Test data and fixtures for Character Sheet E2E tests
 */

export const MOCK_CHARACTERS = {
	kael: {
		id: 'mock-collection-mock-character-1',
		name: 'Kael Stormwind',
		level: 6,
		folk: 'Akashic',
		background: 'Scholar',
		url: '/docs/tools/character-sheet?id=mock-collection-mock-character-1'
	},
	thara: {
		id: 'mock-collection-mock-character-2', 
		name: 'Thara Ironforge',
		level: 6,
		folk: 'Vorthak',
		background: 'Artisan',
		url: '/docs/tools/character-sheet?id=mock-collection-mock-character-2'
	}
} as const

export const TEST_CHARACTER_DATA = {
	name: 'Test Character',
	playerName: 'Test Player',
	folk: 'Human',
	background: 'Adventurer',
	level: 1,
	attributes: {
		strength: 6,
		agility: 6,
		spirit: 6,
		mind: 6
	},
	skills: ['Fighting', 'Athletics', 'Perception'],
	equipment: [
		{
			name: 'Sword',
			type: 'weapon',
			damage: '6/9/12',
			properties: 'slash'
		},
		{
			name: 'Leather Armor',
			type: 'armor',
			av: 1,
			properties: 'light armor'
		}
	]
} as const

export const ATTRIBUTE_DIE_VALUES = ['d4', 'd6', 'd8', 'd10', 'd12', 'd12+1', 'd12+2'] as const

export const VALID_TABS = ['Skills', 'Items', 'Spells', 'Personal', 'Companions', 'Party'] as const

export const SKILL_CATEGORIES = ['Combat Art', 'Talent', 'Folk', 'Other'] as const

export const ITEM_CATEGORIES = ['Weapons', 'Equipment', 'Inventory', 'On Mount', 'In Storage'] as const

/**
 * Test URLs for different scenarios
 */
export const TEST_URLS = {
	characterSheet: '/docs/tools/character-sheet',
	kaelCharacter: '/docs/tools/character-sheet?id=mock-collection-mock-character-1',
	tharaCharacter: '/docs/tools/character-sheet?id=mock-collection-mock-character-2',
	invalidCharacter: '/docs/tools/character-sheet?id=invalid-character-id',
	characterSheetWithTab: (characterId: string, tab: number) => 
		`/docs/tools/character-sheet?id=${characterId}&tab=${tab}`,
} as const

/**
 * Expected error messages and states
 */
export const ERROR_STATES = {
	notLoggedIn: 'Please log in first',
	developmentMode: 'Development Mode: Using mock character data for testing',
	characterNotFound: 'Character not found',
	loadingError: 'Failed to load character'
} as const

/**
 * Test utilities for common operations
 */
export const TEST_UTILS = {
	/**
	 * Generate random character name for testing
	 */
	generateRandomCharacterName: () => `Test Character ${Date.now()}`,

	/**
	 * Wait for autosave to complete
	 */
	waitForAutosave: async (page: Page) => {
		// Wait for save button to become disabled (indicating autosave completed)
		await page.waitForFunction(() => {
			const saveButton = document.querySelector('button[aria-label="save character"]') as HTMLButtonElement
			return saveButton?.disabled === true
		}, { timeout: 10000 })
	},

	/**
	 * Check if element has specific text content
	 */
	hasTextContent: async (page: Page, selector: string, expectedText: string): Promise<boolean> => {
		const element = await page.locator(selector)
		const text = await element.textContent()
		return text?.includes(expectedText) || false
	},

	/**
	 * Get URL parameters
	 */
	getUrlParams: (url: string) => {
		const urlObj = new URL(url, 'http://localhost:3000')
		return Object.fromEntries(urlObj.searchParams.entries())
	},

	/**
	 * Validate character sheet URL structure
	 */
	isValidCharacterSheetUrl: (url: string): boolean => {
		const urlObj = new URL(url, 'http://localhost:3000')
		return urlObj.pathname === '/docs/tools/character-sheet' && 
		       urlObj.searchParams.has('id')
	}
} as const
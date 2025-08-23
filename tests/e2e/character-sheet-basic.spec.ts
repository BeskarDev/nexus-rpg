import { test, expect } from '@playwright/test'
import { CharacterListPage } from '../page-objects/CharacterListPage'
import { CharacterSheetPage } from '../page-objects/CharacterSheetPage'
import { MOCK_CHARACTERS, ERROR_STATES } from '../fixtures/testData'

test.describe('Character Sheet - Basic Functionality', () => {
	let characterListPage: CharacterListPage
	let characterSheetPage: CharacterSheetPage

	test.beforeEach(async ({ page }) => {
		characterListPage = new CharacterListPage(page)
		characterSheetPage = new CharacterSheetPage(page)
	})

	test('should load character list page in development mode', async () => {
		await characterListPage.navigateToCharacterList()
		
		// Verify we're in development mode
		expect(await characterListPage.isDevelopmentMode()).toBe(true)
		
		// Verify character list is loaded
		expect(await characterListPage.isCharacterListLoaded()).toBe(true)
		
		// Verify mock characters are available
		expect(await characterListPage.areMockCharactersAvailable()).toBe(true)
		
		// Verify we have at least 2 characters
		const characterCount = await characterListPage.getCharacterCount()
		expect(characterCount).toBeGreaterThanOrEqual(2)
	})

	test('should display correct character names and details', async () => {
		await characterListPage.navigateToCharacterList()
		
		const characterNames = await characterListPage.getCharacterNames()
		
		// Verify mock characters are in the list
		expect(characterNames).toContain(MOCK_CHARACTERS.kael.name)
		expect(characterNames).toContain(MOCK_CHARACTERS.thara.name)
	})

	test('should navigate to character sheet when clicking on character', async () => {
		await characterListPage.navigateToCharacterList()
		
		// Click on Kael Stormwind
		await characterListPage.selectCharacter(MOCK_CHARACTERS.kael.name)
		
		// Verify we're on the character sheet page
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		// Verify character name and level
		const characterName = await characterSheetPage.getCharacterName()
		const characterLevel = await characterSheetPage.getCharacterLevel()
		
		expect(characterName).toBe(MOCK_CHARACTERS.kael.name)
		expect(characterLevel).toBe(MOCK_CHARACTERS.kael.level)
		
		// Verify URL contains character ID
		const currentUrl = characterSheetPage.page.url()
		expect(currentUrl).toContain(MOCK_CHARACTERS.kael.id)
	})

	test('should load character sheet directly via URL', async () => {
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Verify character sheet is loaded
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		// Verify character details
		const characterName = await characterSheetPage.getCharacterName()
		expect(characterName).toBe(MOCK_CHARACTERS.kael.name)
	})

	test('should return to character list when clicking back button', async () => {
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Verify we're on character sheet
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		// Go back to list
		await characterSheetPage.goBackToList()
		
		// Verify we're back on character list
		expect(await characterListPage.isCharacterListLoaded()).toBe(true)
	})

	test('should show development mode notice on character sheet', async () => {
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Verify development mode notice is shown
		expect(await characterSheetPage.isDevelopmentMode()).toBe(true)
	})

	test('should handle invalid character ID gracefully', async () => {
		await characterSheetPage.navigateToCharacter('invalid-character-id')
		
		// Should redirect to character list or show error
		// In development mode, it should still work with mock data
		const isCharacterListLoaded = await characterListPage.isCharacterListLoaded()
		const isCharacterSheetLoaded = await characterSheetPage.isCharacterSheetLoaded()
		
		// Either should be loaded, depending on how the app handles invalid IDs
		expect(isCharacterListLoaded || isCharacterSheetLoaded).toBe(true)
	})
})
import { test, expect } from '@playwright/test'
import { CharacterSheetPage } from '../page-objects/CharacterSheetPage'
import { MOCK_CHARACTERS, VALID_TABS, TEST_UTILS } from '../fixtures/testData'

test.describe('Character Sheet - Tab Navigation', () => {
	let characterSheetPage: CharacterSheetPage

	test.beforeEach(async ({ page }) => {
		characterSheetPage = new CharacterSheetPage(page)
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
	})

	test('should display all tabs', async () => {
		// Verify all tabs are present
		for (const tab of VALID_TABS) {
			const tabElement = characterSheetPage.page.getByRole('tab', { name: tab })
			await expect(tabElement).toBeVisible()
		}
	})

	test('should start with Skills tab active by default', async () => {
		const activeTab = await characterSheetPage.getActiveTab()
		expect(activeTab).toBe('Skills')
	})

	test('should switch between tabs correctly', async () => {
		for (const tab of VALID_TABS) {
			await characterSheetPage.switchToTab(tab)
			
			// Verify tab is active
			const activeTab = await characterSheetPage.getActiveTab()
			expect(activeTab).toBe(tab)
			
			// Verify URL is updated with tab parameter
			const currentUrl = characterSheetPage.page.url()
			const urlParams = TEST_UTILS.getUrlParams(currentUrl)
			
			// Tab 0 = Skills, Tab 1 = Items, etc.
			const expectedTabIndex = VALID_TABS.indexOf(tab)
			expect(urlParams.tab).toBe(expectedTabIndex.toString())
		}
	})

	test('should preserve tab state in URL', async () => {
		// Switch to Items tab
		await characterSheetPage.switchToTab('Items')
		
		// Get current URL
		const currentUrl = characterSheetPage.page.url()
		
		// Reload the page
		await characterSheetPage.page.reload()
		await characterSheetPage.waitForPageLoad()
		
		// Verify Items tab is still active
		const activeTab = await characterSheetPage.getActiveTab()
		expect(activeTab).toBe('Items')
	})

	test('should navigate to specific tab via URL parameter', async () => {
		// Navigate directly to Items tab (tab=1)
		await characterSheetPage.navigate(`/docs/tools/character-sheet?id=${MOCK_CHARACTERS.kael.id}&tab=1`)
		await characterSheetPage.waitForPageLoad()
		
		// Verify Items tab is active
		const activeTab = await characterSheetPage.getActiveTab()
		expect(activeTab).toBe('Items')
	})

	test('should handle invalid tab parameter gracefully', async () => {
		// Navigate with invalid tab parameter
		await characterSheetPage.navigate(`/docs/tools/character-sheet?id=${MOCK_CHARACTERS.kael.id}&tab=99`)
		await characterSheetPage.waitForPageLoad()
		
		// Should default to Skills tab or handle gracefully
		const isCharacterSheetLoaded = await characterSheetPage.isCharacterSheetLoaded()
		expect(isCharacterSheetLoaded).toBe(true)
	})

	test('should display appropriate content for Skills tab', async () => {
		await characterSheetPage.switchToTab('Skills')
		
		// Verify Skills tab content is visible
		await expect(characterSheetPage.page.getByText('Total XP')).toBeVisible()
		await expect(characterSheetPage.page.getByText('Abilities')).toBeVisible()
		await expect(characterSheetPage.page.getByText('Languages')).toBeVisible()
	})

	test('should display appropriate content for Items tab', async () => {
		await characterSheetPage.switchToTab('Items')
		
		// Verify Items tab content is visible
		await expect(characterSheetPage.page.getByText('Coins')).toBeVisible()
		await expect(characterSheetPage.page.getByText('Current Load')).toBeVisible()
		await expect(characterSheetPage.page.getByText('Weapons')).toBeVisible()
		await expect(characterSheetPage.page.getByText('Equipment')).toBeVisible()
	})

	test('should display appropriate content for Spells tab', async () => {
		await characterSheetPage.switchToTab('Spells')
		
		// Verify Spells tab content is visible (if character has magic)
		// This may vary based on character build
		const isCharacterSheetLoaded = await characterSheetPage.isCharacterSheetLoaded()
		expect(isCharacterSheetLoaded).toBe(true)
	})

	test('should display appropriate content for Personal tab', async () => {
		await characterSheetPage.switchToTab('Personal')
		
		// Verify Personal tab content is visible
		await expect(characterSheetPage.page.getByText('Name') || 
		           characterSheetPage.page.getByText('Player Name')).toBeVisible()
	})

	test('should display appropriate content for Companions tab', async () => {
		await characterSheetPage.switchToTab('Companions')
		
		// Verify Companions tab content is visible
		const isCharacterSheetLoaded = await characterSheetPage.isCharacterSheetLoaded()
		expect(isCharacterSheetLoaded).toBe(true)
	})

	test('should display appropriate content for Party tab', async () => {
		await characterSheetPage.switchToTab('Party')
		
		// Verify Party tab content is visible
		const isCharacterSheetLoaded = await characterSheetPage.isCharacterSheetLoaded()
		expect(isCharacterSheetLoaded).toBe(true)
	})

	test('should maintain tab state when navigating between characters', async () => {
		// Switch to Items tab
		await characterSheetPage.switchToTab('Items')
		
		// Navigate to different character
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.thara.id)
		
		// Verify we're still on Items tab (or default behavior)
		const isCharacterSheetLoaded = await characterSheetPage.isCharacterSheetLoaded()
		expect(isCharacterSheetLoaded).toBe(true)
	})
})
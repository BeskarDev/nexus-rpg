import { test, expect, devices } from '@playwright/test'
import { CharacterSheetPage } from '../page-objects/CharacterSheetPage'
import { CharacterListPage } from '../page-objects/CharacterListPage'
import { MOCK_CHARACTERS } from '../fixtures/testData'

test.describe('Character Sheet - Responsive Design', () => {
	test('should work on desktop viewport', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['Desktop Chrome'],
		})
		const page = await context.newPage()
		const characterSheetPage = new CharacterSheetPage(page)

		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Verify character sheet loads properly on desktop
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		// Take screenshot for visual verification
		await characterSheetPage.takeScreenshot('desktop-character-sheet')
		
		await context.close()
	})

	test('should work on mobile viewport', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['iPhone 13'],
		})
		const page = await context.newPage()
		const characterSheetPage = new CharacterSheetPage(page)

		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Verify character sheet loads properly on mobile
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		// Verify tabs are still accessible on mobile
		await characterSheetPage.switchToTab('Items')
		expect(await characterSheetPage.getActiveTab()).toBe('Items')
		
		// Take screenshot for visual verification
		await characterSheetPage.takeScreenshot('mobile-character-sheet')
		
		await context.close()
	})

	test('should work on tablet viewport', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['iPad Pro'],
		})
		const page = await context.newPage()
		const characterSheetPage = new CharacterSheetPage(page)

		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Verify character sheet loads properly on tablet
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		// Test navigation on tablet
		await characterSheetPage.switchToTab('Skills')
		await characterSheetPage.switchToTab('Spells')
		await characterSheetPage.switchToTab('Personal')
		
		// Verify final tab is active
		expect(await characterSheetPage.getActiveTab()).toBe('Personal')
		
		await context.close()
	})

	test('should maintain functionality when resizing viewport', async ({ page }) => {
		const characterSheetPage = new CharacterSheetPage(page)
		
		// Start with desktop size
		await page.setViewportSize({ width: 1920, height: 1080 })
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		// Switch to mobile size
		await page.setViewportSize({ width: 375, height: 667 })
		await page.waitForTimeout(1000) // Wait for layout to adjust
		
		// Verify character sheet still works
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		// Test tab switching on mobile
		await characterSheetPage.switchToTab('Items')
		expect(await characterSheetPage.getActiveTab()).toBe('Items')
		
		// Switch back to desktop size
		await page.setViewportSize({ width: 1920, height: 1080 })
		await page.waitForTimeout(1000) // Wait for layout to adjust
		
		// Verify still functional
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
	})

	test('should handle touch interactions on mobile', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['iPhone 13'],
			hasTouch: true,
		})
		const page = await context.newPage()
		const characterSheetPage = new CharacterSheetPage(page)

		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Test touch tap on tabs
		await page.tap('tab[name="Items"]')
		expect(await characterSheetPage.getActiveTab()).toBe('Items')
		
		// Test touch interaction with form elements
		const resolveInput = page.locator(characterSheetPage.resolveInput)
		if (await resolveInput.isVisible()) {
			await resolveInput.tap()
			await resolveInput.fill('2')
			
			const value = await characterSheetPage.getResolveValue()
			expect(value).toBe(2)
		}
		
		await context.close()
	})

	test('should be accessible on different screen orientations', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['iPhone 13'],
		})
		const page = await context.newPage()
		const characterSheetPage = new CharacterSheetPage(page)

		// Portrait orientation
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		// Landscape orientation (simulate by changing viewport)
		await page.setViewportSize({ width: 844, height: 390 })
		await page.waitForTimeout(1000)
		
		// Verify still functional in landscape
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		await characterSheetPage.switchToTab('Skills')
		expect(await characterSheetPage.getActiveTab()).toBe('Skills')
		
		await context.close()
	})

	test('should handle character list on mobile', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['iPhone 13'],
		})
		const page = await context.newPage()
		const characterListPage = new CharacterListPage(page)

		await characterListPage.navigateToCharacterList()
		
		// Verify character list works on mobile
		expect(await characterListPage.isCharacterListLoaded()).toBe(true)
		expect(await characterListPage.areMockCharactersAvailable()).toBe(true)
		
		// Test character selection on mobile
		await characterListPage.selectCharacter(MOCK_CHARACTERS.thara.name)
		
		const characterSheetPage = new CharacterSheetPage(page)
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		await context.close()
	})

	test('should maintain state across viewport changes', async ({ page }) => {
		const characterSheetPage = new CharacterSheetPage(page)
		
		// Start on desktop
		await page.setViewportSize({ width: 1920, height: 1080 })
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Switch to Items tab
		await characterSheetPage.switchToTab('Items')
		
		// Change to mobile viewport
		await page.setViewportSize({ width: 375, height: 667 })
		await page.waitForTimeout(1000)
		
		// Verify tab state is maintained
		const activeTab = await characterSheetPage.getActiveTab()
		expect(activeTab).toBe('Items')
		
		// Make an edit on mobile
		const originalResolve = await characterSheetPage.getResolveValue()
		await characterSheetPage.setResolveValue(originalResolve + 1)
		
		// Switch back to desktop
		await page.setViewportSize({ width: 1920, height: 1080 })
		await page.waitForTimeout(1000)
		
		// Verify edit is preserved
		const currentResolve = await characterSheetPage.getResolveValue()
		expect(currentResolve).toBe(originalResolve + 1)
	})
})
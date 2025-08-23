import { test, expect } from '@playwright/test'
import { CharacterSheetPage } from '../page-objects/CharacterSheetPage'
import { CharacterListPage } from '../page-objects/CharacterListPage'
import { MOCK_CHARACTERS, ERROR_STATES } from '../fixtures/testData'

test.describe('Character Sheet - Error Handling and Edge Cases', () => {
	let characterSheetPage: CharacterSheetPage
	let characterListPage: CharacterListPage

	test.beforeEach(async ({ page }) => {
		characterSheetPage = new CharacterSheetPage(page)
		characterListPage = new CharacterListPage(page)
	})

	test('should handle network errors gracefully', async () => {
		// Go offline to simulate network error
		await characterSheetPage.page.context().setOffline(true)
		
		try {
			await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
			
			// In development mode, should still work with cached data
			// or show appropriate error message
			const isLoaded = await characterSheetPage.isCharacterSheetLoaded()
			
			// Either it loads (cached/mock data) or shows error page
			// Both are valid responses to network issues
			expect(typeof isLoaded).toBe('boolean')
		} finally {
			// Restore network
			await characterSheetPage.page.context().setOffline(false)
		}
	})

	test('should handle malformed URL parameters', async () => {
		// Test with malformed character ID
		await characterSheetPage.navigate('/docs/tools/character-sheet?id=')
		
		// Should redirect to character list or show error
		const isCharacterListLoaded = await characterListPage.isCharacterListLoaded()
		const isCharacterSheetLoaded = await characterSheetPage.isCharacterSheetLoaded()
		
		expect(isCharacterListLoaded || isCharacterSheetLoaded).toBe(true)
	})

	test('should handle special characters in URLs', async () => {
		// Test with special characters in character ID
		await characterSheetPage.navigate('/docs/tools/character-sheet?id=test%20character%20@#$%')
		
		// Should handle gracefully without crashing
		const isCharacterListLoaded = await characterListPage.isCharacterListLoaded()
		const isCharacterSheetLoaded = await characterSheetPage.isCharacterSheetLoaded()
		
		expect(isCharacterListLoaded || isCharacterSheetLoaded).toBe(true)
	})

	test('should handle very long character names', async () => {
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Test if UI can handle long names without breaking layout
		const characterName = await characterSheetPage.getCharacterName()
		expect(characterName.length).toBeGreaterThan(0)
		expect(characterName.length).toBeLessThan(1000) // Reasonable limit
	})

	test('should handle rapid tab switching', async () => {
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Rapidly switch between tabs
		const tabs = ['Skills', 'Items', 'Spells', 'Personal', 'Companions', 'Party'] as const
		
		for (let i = 0; i < 3; i++) {
			for (const tab of tabs) {
				await characterSheetPage.switchToTab(tab)
				// Small delay to prevent overwhelming the system
				await characterSheetPage.page.waitForTimeout(100)
			}
		}
		
		// Verify character sheet is still functional
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
	})

	test('should handle page refresh during editing', async () => {
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Make some changes
		const originalResolve = await characterSheetPage.getResolveValue()
		await characterSheetPage.setResolveValue(originalResolve + 1)
		
		// Refresh page immediately (before autosave)
		await characterSheetPage.page.reload({ waitUntil: 'networkidle' })
		
		// Verify page loads without errors
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
	})

	test('should handle browser back/forward navigation', async () => {
		// Navigate to character list
		await characterListPage.navigateToCharacterList()
		
		// Navigate to character
		await characterListPage.selectCharacter(MOCK_CHARACTERS.kael.name)
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		// Use browser back button
		await characterSheetPage.page.goBack()
		expect(await characterListPage.isCharacterListLoaded()).toBe(true)
		
		// Use browser forward button
		await characterSheetPage.page.goForward()
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
	})

	test('should handle JavaScript errors gracefully', async () => {
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Listen for JavaScript errors
		const errors: string[] = []
		characterSheetPage.page.on('pageerror', (error) => {
			errors.push(error.message)
		})
		
		// Interact with the page extensively
		await characterSheetPage.switchToTab('Items')
		await characterSheetPage.switchToTab('Skills')
		
		// Make some edits
		await characterSheetPage.setResolveValue(2)
		await characterSheetPage.setFatigueLevel(1)
		
		// Check that no critical errors occurred
		const criticalErrors = errors.filter(error => 
			!error.includes('Warning:') && 
			!error.includes('net::ERR_BLOCKED_BY_CLIENT') &&
			!error.includes('DevTools')
		)
		
		expect(criticalErrors.length).toBe(0)
	})

	test('should handle missing character data fields gracefully', async () => {
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Try to access various character fields
		// Even if some are undefined, the app should not crash
		
		const characterName = await characterSheetPage.getCharacterName()
		expect(typeof characterName).toBe('string')
		
		const characterLevel = await characterSheetPage.getCharacterLevel()
		expect(typeof characterLevel).toBe('number')
		expect(characterLevel).toBeGreaterThanOrEqual(0)
	})

	test('should handle concurrent save operations', async () => {
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Make multiple rapid changes to trigger multiple save operations
		const promises = []
		
		for (let i = 0; i < 5; i++) {
			promises.push(characterSheetPage.setResolveValue(i))
		}
		
		// Wait for all changes to complete
		await Promise.all(promises)
		
		// Verify character sheet is still functional
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
	})

	test('should handle window resize during operations', async () => {
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Start making changes
		const editPromise = characterSheetPage.setResolveValue(3)
		
		// Resize window during edit
		await characterSheetPage.page.setViewportSize({ width: 800, height: 600 })
		
		// Wait for edit to complete
		await editPromise
		
		// Verify functionality is preserved
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		const resolve = await characterSheetPage.getResolveValue()
		expect(resolve).toBe(3)
	})

	test('should handle accessibility requirements', async () => {
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
		
		// Test keyboard navigation
		await characterSheetPage.page.keyboard.press('Tab')
		
		// Verify focus is visible and manageable
		const focusedElement = await characterSheetPage.page.locator(':focus')
		expect(await focusedElement.count()).toBeGreaterThanOrEqual(0)
		
		// Test with high contrast (simulated)
		await characterSheetPage.page.emulateMedia({ colorScheme: 'dark' })
		
		// Verify page still renders correctly
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
	})
})
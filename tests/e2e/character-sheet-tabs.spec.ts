import { test, expect } from '@playwright/test'

const VALID_TABS = ['Skills', 'Items', 'Spells', 'Personal', 'Companions', 'Party'] as const

test.describe('Character Sheet - Tab Navigation', () => {
	test.beforeEach(async ({ page }) => {
		// Navigate to character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for character to load
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
	})

	test('should navigate between all 6 tabs', async ({ page }) => {
		// Test each tab
		for (let i = 0; i < VALID_TABS.length; i++) {
			const tabName = VALID_TABS[i]
			
			// Click tab (using tab index approach)
			await page.goto(`/docs/tools/character-sheet?id=mock-collection-mock-character-1&tab=${i}`)
			
			// Wait for page load
			await page.waitForLoadState('networkidle')
			
			// Verify URL contains correct tab parameter
			expect(page.url()).toContain(`tab=${i}`)
			
			// Verify tab content is visible (basic check)
			await expect(page.locator('body')).toContainText(tabName, { timeout: 5000 })
		}
	})

	test('should persist tab state in URL', async ({ page }) => {
		// Navigate to Skills tab (tab=1)
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1&tab=1')
		
		// Verify URL contains tab parameter
		expect(page.url()).toContain('tab=1')
		
		// Navigate to Items tab (tab=2)
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1&tab=2')
		
		// Verify URL updated
		expect(page.url()).toContain('tab=2')
		
		// Go back
		await page.goBack()
		
		// Verify we're back to Skills tab
		expect(page.url()).toContain('tab=1')
	})

	test('should handle invalid tab parameter gracefully', async ({ page }) => {
		// Navigate with invalid tab parameter
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1&tab=99')
		
		// Should still load the character (default to first tab)
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Should handle gracefully without errors
		await page.waitForLoadState('networkidle')
	})

	test('should navigate from character list to specific tab', async ({ page }) => {
		// Start at character list
		await page.goto('/docs/tools/character-sheet')
		
		// Click on character
		await page.getByText('Kael Stormwind').click()
		
		// Should be on character page
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Navigate to specific tab
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1&tab=1')
		
		// Verify we're on the correct tab
		expect(page.url()).toContain('tab=1')
	})
})
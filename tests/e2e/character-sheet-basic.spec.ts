import { test, expect } from '@playwright/test'

test.describe('Character Sheet - Basic Functionality', () => {
	test('should load character list with mock data', async ({ page }) => {
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet')
		
		// Verify we're in development mode
		await expect(page.getByText('Development Mode:')).toBeVisible()
		
		// Verify mock characters are available
		await expect(page.getByText('Kael Stormwind')).toBeVisible()
		await expect(page.getByText('Thara Ironforge')).toBeVisible()
	})

	test('should navigate to character and back to list', async ({ page }) => {
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet')
		
		// Wait for the page to load
		await expect(page.getByText('Development Mode:')).toBeVisible()
		
		// Click on first character
		await page.getByText('Kael Stormwind').click()
		
		// Verify we're on the character page
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Go back to character list
		await page.locator('button[aria-label="back to character list"]').click()
		
		// Verify we're back on the list
		await expect(page.getByText('Development Mode:')).toBeVisible()
		await expect(page.getByText('Kael Stormwind')).toBeVisible()
	})

	test('should handle character download', async ({ page }) => {
		// Navigate to specific character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for character to load
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Set up download handler
		const downloadPromise = page.waitForEvent('download')
		
		// Click download button
		await page.locator('button[aria-label*="Download"]').click()
		
		// Wait for download
		const download = await downloadPromise
		
		// Verify download filename contains character name
		expect(download.suggestedFilename()).toContain('Kael')
	})
})
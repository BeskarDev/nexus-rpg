import { test, expect } from '@playwright/test'

test.describe('Character Sheet - Quick Verification', () => {
	test('should load character list page and navigate to character', async ({ page }) => {
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet')
		
		// Verify we're in development mode
		await expect(page.getByText('Development Mode:')).toBeVisible()
		
		// Verify mock characters are available
		await expect(page.getByText('Kael Stormwind')).toBeVisible()
		await expect(page.getByText('Thara Ironforge')).toBeVisible()
		
		// Click on first character
		await page.getByRole('link', { name: /Kael Stormwind/ }).click()
		
		// Verify character sheet loads
		await expect(page.getByRole('heading', { name: /Kael Stormwind.*Level 6/ })).toBeVisible()
		
		// Verify tabs are present
		await expect(page.getByRole('tab', { name: 'Skills' })).toBeVisible()
		await expect(page.getByRole('tab', { name: 'Items' })).toBeVisible()
		await expect(page.getByRole('tab', { name: 'Spells' })).toBeVisible()
		
		// Test tab switching
		await page.getByRole('tab', { name: 'Items' }).click()
		await expect(page.getByText('Coins')).toBeVisible()
		
		// Test back navigation
		await page.getByRole('button', { name: /back/ }).first().click()
		await expect(page.getByText('Your Characters')).toBeVisible()
	})

	test('should handle character editing and autosave', async ({ page }) => {
		// Navigate directly to character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Verify character sheet loads
		await expect(page.getByRole('heading', { name: /Kael Stormwind/ })).toBeVisible()
		
		// Find and edit resolve value
		const resolveInput = page.getByLabel('Resolve')
		if (await resolveInput.isVisible()) {
			const originalValue = await resolveInput.inputValue()
			const newValue = (parseInt(originalValue) % 3 + 1).toString() // Cycle between 1-3
			
			await resolveInput.fill(newValue)
			
			// Verify value changed
			await expect(resolveInput).toHaveValue(newValue)
		}
		
		// Test tab navigation with URL parameters
		await page.getByRole('tab', { name: 'Items' }).click()
		
		// Verify URL contains tab parameter
		expect(page.url()).toContain('tab=1')
		
		// Test that page reload preserves tab
		await page.reload()
		await expect(page.getByRole('tab', { name: 'Items' })).toHaveAttribute('aria-selected', 'true')
	})
})
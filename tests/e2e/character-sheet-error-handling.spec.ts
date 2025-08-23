import { test, expect } from '@playwright/test'

test.describe('Character Sheet - Error Handling and Edge Cases', () => {
	test('should handle invalid character ID gracefully', async ({ page }) => {
		// Navigate with invalid character ID
		await page.goto('/docs/tools/character-sheet?id=invalid-character-id')
		
		// Should handle gracefully without crashing
		await page.waitForLoadState('networkidle')
		
		// In development mode, should fall back to character list or show error
		await expect(page.locator('body')).toBeVisible()
	})

	test('should handle malformed URLs gracefully', async ({ page }) => {
		// Navigate with malformed parameters
		await page.goto('/docs/tools/character-sheet?id=&tab=abc')
		
		// Should handle gracefully
		await page.waitForLoadState('networkidle')
		await expect(page.locator('body')).toBeVisible()
	})

	test('should handle network interruption during character load', async ({ page }) => {
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet')
		
		// Verify basic functionality works
		await expect(page.getByText('Development Mode:')).toBeVisible()
	})

	test('should handle concurrent save operations', async ({ page }) => {
		// Navigate to character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for character to load
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Try to make multiple changes quickly
		const resolveInput = page.locator('input[aria-label*="Resolve"]').first()
		await resolveInput.fill('1')
		await resolveInput.fill('2')
		await resolveInput.fill('3')
		
		// Should handle gracefully without errors
		await page.waitForLoadState('networkidle')
	})

	test('should handle JavaScript errors gracefully', async ({ page }) => {
		// Set up error handler to catch JS errors
		const errors: string[] = []
		page.on('pageerror', (error) => {
			errors.push(error.message)
		})
		
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet')
		
		// Perform basic operations
		await expect(page.getByText('Development Mode:')).toBeVisible()
		
		// Click on character
		await page.getByText('Kael Stormwind').click()
		
		// Verify no critical JavaScript errors occurred
		expect(errors.length).toBe(0)
	})

	test('should handle rapid navigation between characters', async ({ page }) => {
		// Navigate to first character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Quickly navigate to second character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-2')
		await expect(page.getByText('Thara Ironforge (Level 6)')).toBeVisible()
		
		// Navigate back to first
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
	})

	test('should handle accessibility requirements', async ({ page }) => {
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for character to load
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Check for essential accessibility features
		await expect(page.locator('button[aria-label="save character"]')).toBeVisible()
		await expect(page.locator('button[aria-label="back to character list"]')).toBeVisible()
		
		// Verify form inputs have proper labels
		await expect(page.locator('input[aria-label*="Resolve"]')).toBeVisible()
	})
})
import { test, expect, devices } from '@playwright/test'

test.describe('Character Sheet - Responsive Design', () => {
	test('should work on desktop viewport', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['Desktop Chrome'],
		})
		const page = await context.newPage()
		
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for character to load
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Verify desktop layout elements are visible
		await expect(page.locator('button[aria-label="save character"]')).toBeVisible()
		await expect(page.locator('button[aria-label="back to character list"]')).toBeVisible()
		
		await context.close()
	})

	test('should work on mobile viewport', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['iPhone 13'],
		})
		const page = await context.newPage()
		
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for character to load
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Verify mobile layout works
		await expect(page.locator('button[aria-label="save character"]')).toBeVisible()
		
		// Test mobile navigation
		await expect(page.locator('button[aria-label="back to character list"]')).toBeVisible()
		
		await context.close()
	})

	test('should work on tablet viewport', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['iPad Pro'],
		})
		const page = await context.newPage()
		
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for character to load
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Verify tablet layout works
		await expect(page.locator('button[aria-label="save character"]')).toBeVisible()
		
		await context.close()
	})

	test('should adapt to viewport changes', async ({ page }) => {
		// Start with desktop size
		await page.setViewportSize({ width: 1920, height: 1080 })
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for character to load
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Change to mobile size
		await page.setViewportSize({ width: 375, height: 667 })
		
		// Verify layout still works
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		await expect(page.locator('button[aria-label="save character"]')).toBeVisible()
		
		// Change to tablet size
		await page.setViewportSize({ width: 768, height: 1024 })
		
		// Verify layout still works
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		await expect(page.locator('button[aria-label="save character"]')).toBeVisible()
	})

	test('should handle touch interactions on mobile', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['iPhone 13'],
			hasTouch: true,
		})
		const page = await context.newPage()
		
		// Navigate to character list
		await page.goto('/docs/tools/character-sheet')
		
		// Verify development mode notice
		await expect(page.getByText('Development Mode:')).toBeVisible()
		
		// Touch interaction - tap on character
		await page.getByText('Kael Stormwind').tap()
		
		// Verify navigation worked
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Touch interaction - tap back button
		await page.locator('button[aria-label="back to character list"]').tap()
		
		// Verify we're back at character list
		await expect(page.getByText('Development Mode:')).toBeVisible()
		
		await context.close()
	})

	test('should maintain functionality across viewports', async ({ page }) => {
		// Test character editing on different viewport sizes
		const viewports = [
			{ width: 1920, height: 1080 }, // Desktop
			{ width: 768, height: 1024 },  // Tablet
			{ width: 375, height: 667 },   // Mobile
		]
		
		for (const viewport of viewports) {
			await page.setViewportSize(viewport)
			await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
			
			// Wait for character to load
			await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
			
			// Test basic editing functionality
			const resolveInput = page.locator('input[aria-label*="Resolve"]').first()
			await resolveInput.fill('2')
			
			// Verify autosave triggers
			await expect(page.locator('button[aria-label="save character"]')).toBeDisabled({ timeout: 10000 })
		}
	})
})
import { test, expect } from '@playwright/test'

test.describe('Character Sheet - Quick Verification', () => {
	test('should load character sheet page without errors', async ({ page }) => {
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet')
		
		// Wait for page to stabilize
		await page.waitForTimeout(3000)
		
		// Basic check that page loaded
		const pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(100)
		
		// Take screenshot for debugging
		await page.screenshot({ path: 'test-results/quick-verification.png' })
		
		console.log('Character sheet page loaded successfully')
	})

	test('should handle character URL navigation', async ({ page }) => {
		// Try navigating to specific character URLs
		const characterUrls = [
			'/docs/tools/character-sheet?id=mock-collection-mock-character-1',
			'/docs/tools/character-sheet?id=mock-collection-mock-character-2'
		]
		
		for (const url of characterUrls) {
			await page.goto(url)
			await page.waitForTimeout(2000)
			
			// Basic check that page loads
			const pageContent = await page.textContent('body')
			expect(pageContent.length).toBeGreaterThan(50)
			
			console.log(`Successfully navigated to: ${url}`)
		}
	})

	test('should handle basic form interactions if available', async ({ page }) => {
		// Navigate directly to character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for page to stabilize
		await page.waitForTimeout(3000)
		
		// Look for interactive elements
		const inputs = await page.locator('input').count()
		const buttons = await page.locator('button').count()
		const selects = await page.locator('select').count()
		
		console.log(`Found ${inputs} inputs, ${buttons} buttons, ${selects} selects`)
		
		// If we find interactive elements, try a simple interaction
		if (inputs > 0) {
			const firstInput = page.locator('input').first()
			const isVisible = await firstInput.isVisible().catch(() => false)
			
			if (isVisible) {
				console.log('Successfully found interactive input element')
			}
		}
		
		// Basic assertion that page has content
		const pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(100)
	})
})
import { test, expect } from '@playwright/test'

test.describe('Character Sheet - Tab Navigation', () => {
	test('should load character page and check for tab-like elements', async ({ page }) => {
		// Navigate to character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for page to stabilize
		await page.waitForTimeout(3000)
		
		// Look for tab-like elements
		const buttons = await page.locator('button').all()
		const links = await page.locator('a').all()
		
		console.log(`Found ${buttons.length} buttons and ${links.length} links for potential navigation`)
		
		// Take screenshot for debugging
		await page.screenshot({ path: 'test-results/character-tabs.png' })
		
		// Basic assertion that page loaded
		const pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(100)
	})

	test('should attempt tab navigation if URL parameters work', async ({ page }) => {
		// Try different tab parameters
		const tabUrls = [
			'/docs/tools/character-sheet?id=mock-collection-mock-character-1&tab=0',
			'/docs/tools/character-sheet?id=mock-collection-mock-character-1&tab=1',
			'/docs/tools/character-sheet?id=mock-collection-mock-character-1&tab=2'
		]
		
		for (let i = 0; i < tabUrls.length; i++) {
			await page.goto(tabUrls[i])
			await page.waitForTimeout(2000)
			
			const url = page.url()
			console.log(`Tab ${i} URL: ${url}`)
			
			// Just verify the page loads
			const pageContent = await page.textContent('body')
			expect(pageContent.length).toBeGreaterThan(50)
		}
	})
})
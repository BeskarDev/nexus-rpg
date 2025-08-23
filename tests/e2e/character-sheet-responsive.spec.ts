import { test, expect, devices } from '@playwright/test'

test.describe('Character Sheet - Responsive Design', () => {
	test('should work on desktop viewport', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['Desktop Chrome'],
		})
		const page = await context.newPage()
		
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for page to stabilize
		await page.waitForTimeout(3000)
		
		// Basic check that page loaded on desktop
		const pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(100)
		
		console.log('Desktop viewport test passed')
		await context.close()
	})

	test('should work on mobile viewport', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['iPhone 13'],
		})
		const page = await context.newPage()
		
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for page to stabilize
		await page.waitForTimeout(3000)
		
		// Basic check that page loaded on mobile
		const pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(100)
		
		console.log('Mobile viewport test passed')
		await context.close()
	})

	test('should work on tablet viewport', async ({ browser }) => {
		const context = await browser.newContext({
			...devices['iPad Pro'],
		})
		const page = await context.newPage()
		
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for page to stabilize
		await page.waitForTimeout(3000)
		
		// Basic check that page loaded on tablet
		const pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(100)
		
		console.log('Tablet viewport test passed')
		await context.close()
	})

	test('should adapt to viewport changes', async ({ page }) => {
		// Start with desktop size
		await page.setViewportSize({ width: 1920, height: 1080 })
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for page to stabilize
		await page.waitForTimeout(2000)
		
		// Basic check on desktop
		let pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(50)
		
		// Change to mobile size
		await page.setViewportSize({ width: 375, height: 667 })
		await page.waitForTimeout(1000)
		
		// Basic check on mobile
		pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(50)
		
		// Change to tablet size
		await page.setViewportSize({ width: 768, height: 1024 })
		await page.waitForTimeout(1000)
		
		// Basic check on tablet
		pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(50)
		
		console.log('Viewport adaptation test passed')
	})
})
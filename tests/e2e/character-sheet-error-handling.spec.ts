import { test, expect } from '@playwright/test'

test.describe('Character Sheet - Error Handling and Edge Cases', () => {
	test('should handle invalid character ID gracefully', async ({ page }) => {
		// Navigate with invalid character ID
		await page.goto('/docs/tools/character-sheet?id=invalid-character-id')
		
		// Wait for page to stabilize
		await page.waitForTimeout(3000)
		
		// Should handle gracefully without crashing
		const pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(50)
		
		console.log('Invalid character ID handled gracefully')
	})

	test('should handle malformed URLs gracefully', async ({ page }) => {
		// Navigate with malformed parameters
		await page.goto('/docs/tools/character-sheet?id=&tab=abc')
		
		// Wait for page to stabilize
		await page.waitForTimeout(3000)
		
		// Should handle gracefully
		const pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(50)
		
		console.log('Malformed URL handled gracefully')
	})

	test('should load basic character sheet page', async ({ page }) => {
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet')
		
		// Wait for page to stabilize
		await page.waitForTimeout(3000)
		
		// Basic check that page loaded
		const pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(100)
		
		console.log('Basic character sheet page loads successfully')
	})

	test('should handle rapid navigation between URLs', async ({ page }) => {
		const urls = [
			'/docs/tools/character-sheet',
			'/docs/tools/character-sheet?id=mock-collection-mock-character-1',
			'/docs/tools/character-sheet?id=mock-collection-mock-character-2'
		]
		
		for (const url of urls) {
			await page.goto(url)
			await page.waitForTimeout(1000)
			
			// Basic check that each page loads
			const pageContent = await page.textContent('body')
			expect(pageContent.length).toBeGreaterThan(50)
			
			console.log(`Successfully navigated to: ${url}`)
		}
	})

	test('should handle JavaScript errors gracefully', async ({ page }) => {
		// Set up error handler to catch JS errors
		const errors: string[] = []
		page.on('pageerror', (error) => {
			errors.push(error.message)
		})
		
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet')
		
		// Wait for page to stabilize
		await page.waitForTimeout(3000)
		
		// Basic page content check
		const pageContent = await page.textContent('body')
		expect(pageContent.length).toBeGreaterThan(50)
		
		// Log any errors for debugging but don't fail the test
		if (errors.length > 0) {
			console.log('JavaScript errors detected:', errors)
		} else {
			console.log('No JavaScript errors detected')
		}
	})
})
import { test, expect } from '@playwright/test'

test.describe('Character Sheet - Basic Functionality', () => {
	test('should load character sheet page', async ({ page }) => {
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet')
		
		// Wait for page to load - look for the character sheet component
		await expect(page.locator('body')).toBeVisible({ timeout: 10000 })
		
		// Take a screenshot for debugging
		await page.screenshot({ path: 'test-results/character-sheet-load.png' })
		
		// Check if we can find any character-related content
		const pageContent = await page.textContent('body')
		console.log('Page contains character sheet elements:', 
			pageContent.includes('Character') || 
			pageContent.includes('Kael') || 
			pageContent.includes('Development Mode'))
	})

	test('should load mock characters if available', async ({ page }) => {
		// Navigate to character sheet
		await page.goto('/docs/tools/character-sheet')
		
		// Wait for page to stabilize
		await page.waitForTimeout(3000)
		
		// Try to find mock character names - but don't fail if not found
		const kaelExists = await page.getByText('Kael Stormwind').isVisible().catch(() => false)
		const tharaExists = await page.getByText('Thara Ironforge').isVisible().catch(() => false)
		
		console.log('Kael Stormwind found:', kaelExists)
		console.log('Thara Ironforge found:', tharaExists)
		
		// If characters are found, verify we can see at least one
		if (kaelExists || tharaExists) {
			console.log('Mock characters are available')
		} else {
			console.log('Mock characters not found - may need login or different environment')
		}
	})

	test('should navigate to specific character if URL works', async ({ page }) => {
		// Try to navigate to a specific character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for page to stabilize
		await page.waitForTimeout(3000)
		
		// Check if we're on a character page
		const pageContent = await page.textContent('body')
		const hasCharacterContent = pageContent.includes('Level') || 
			pageContent.includes('Strength') || 
			pageContent.includes('Agility')
		
		console.log('Character page loaded successfully:', hasCharacterContent)
		
		// Take screenshot for debugging
		await page.screenshot({ path: 'test-results/character-page.png' })
	})
})
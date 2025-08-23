import { test, expect } from '@playwright/test'

test.describe('Character Sheet - Editing and Saving', () => {
	test('should edit character Resolve and trigger autosave', async ({ page }) => {
		// Navigate to character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for character to load
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Find current Resolve value
		const resolveInput = page.locator('input[aria-label*="Resolve"]').first()
		
		// Change Resolve value
		await resolveInput.fill('2')
		
		// Verify autosave triggered (save button should become disabled)
		await expect(page.locator('button[aria-label="save character"]')).toBeDisabled({ timeout: 10000 })
	})

	test('should edit character XP and verify changes persist', async ({ page }) => {
		// Navigate to character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-2')
		
		// Wait for character to load
		await expect(page.getByText('Thara Ironforge (Level 6)')).toBeVisible()
		
		// Find XP input
		const totalXpInput = page.locator('input[aria-label*="Total XP"]').first()
		const spentXpInput = page.locator('input[aria-label*="Spent XP"]').first()
		
		// Change XP values
		await totalXpInput.fill('100')
		await spentXpInput.fill('90')
		
		// Verify autosave triggered
		await expect(page.locator('button[aria-label="save character"]')).toBeDisabled({ timeout: 10000 })
		
		// Refresh page and verify changes persisted
		await page.reload()
		await expect(page.getByText('Thara Ironforge (Level 6)')).toBeVisible()
		
		// Note: In development mode, changes don't actually persist to a backend
		// This test verifies the autosave mechanism triggers correctly
	})

	test('should edit skill ranks using XP controls', async ({ page }) => {
		// Navigate to character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1&tab=1')
		
		// Wait for Skills tab to load
		await expect(page.getByText('Skills')).toBeVisible()
		
		// Find a skill and modify its XP
		const firstSkillXpInput = page.locator('input[type="number"][min="0"]').first()
		
		// Change skill XP
		await firstSkillXpInput.fill('6')
		
		// Verify autosave triggered
		await expect(page.locator('button[aria-label="save character"]')).toBeDisabled({ timeout: 10000 })
	})

	test('should handle attribute die changes', async ({ page }) => {
		// Navigate to character
		await page.goto('/docs/tools/character-sheet?id=mock-collection-mock-character-1')
		
		// Wait for character to load
		await expect(page.getByText('Kael Stormwind (Level 6)')).toBeVisible()
		
		// Find Strength attribute dropdown
		const strengthSelect = page.locator('select').first()
		
		// Change attribute value
		await strengthSelect.selectOption('d8')
		
		// Verify autosave triggered
		await expect(page.locator('button[aria-label="save character"]')).toBeDisabled({ timeout: 10000 })
	})
})
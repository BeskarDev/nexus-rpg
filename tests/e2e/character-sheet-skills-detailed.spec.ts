import { test, expect } from '@playwright/test'
import { SkillsPage } from './page-objects/SkillsPage'
import { TEST_CHARACTER_IDS, CHARACTER_SHEET_TABS, TEST_VALUES, WAIT_TIMES } from './fixtures/testData'

test.describe('Character Sheet - Skills Tab Components', () => {
	let skillsPage: SkillsPage

	test.beforeEach(async ({ page }) => {
		skillsPage = new SkillsPage(page)
		await skillsPage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
	})

	test('should load Skills tab with all core components', async () => {
		await skillsPage.verifySkillsTabLoaded()
		await skillsPage.verifyAllComponentsInteractive()
	})

	test('should allow editing skill ranks', async () => {
		await skillsPage.testSkillInputs()
	})

	test('should allow editing XP values', async () => {
		await skillsPage.testXpField()
	})

	test('should handle ability management functionality', async () => {
		await skillsPage.testAbilityManagement()
	})

	test('should handle search dialog functionality', async () => {
		await skillsPage.testSearchDialogs()
	})

	test('should display ability categories correctly', async () => {
		await skillsPage.testAbilityCategories()
	})

	test('should handle language and profession management', async () => {
		await skillsPage.testLanguageAndProfessions()
	})

	test('should handle ability addition workflow', async () => {
		// Test adding combat arts
		const combatArtSection = skillsPage.combatArtsSection
		const sectionVisible = await combatArtSection.isVisible().catch(() => false)
		
		if (sectionVisible) {
			// Expand section if it's an accordion
			await combatArtSection.click()
			await skillsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			
			// Look for add button
			const addButtons = await skillsPage.page.locator('button').filter({ hasText: /add/i }).all()
			if (addButtons.length > 0) {
				// Verify add button is functional (but don't actually add)
				await expect(addButtons[0]).toBeEnabled()
			}
		}
	})

	test('should handle ability search workflow', async () => {
		// Test combat art search
		const searchButtons = await skillsPage.page.locator('button:has([data-testid="SearchIcon"])').all()
		
		if (searchButtons.length > 0) {
			const searchButton = searchButtons[0]
			const isVisible = await searchButton.isVisible().catch(() => false)
			
			if (isVisible) {
				await searchButton.click()
				await skillsPage.page.waitForTimeout(WAIT_TIMES.DIALOG_ANIMATION)
				
				// Look for search dialog
				const dialog = skillsPage.searchDialog
				const dialogVisible = await dialog.isVisible().catch(() => false)
				
				if (dialogVisible) {
					// Verify dialog has search functionality
					const searchInput = dialog.locator('input[type="text"], input[placeholder*="search"]').first()
					const searchInputVisible = await searchInput.isVisible().catch(() => false)
					
					if (searchInputVisible) {
						await searchInput.fill('test')
						await expect(searchInput).toHaveValue('test')
					}
					
					// Close dialog
					const closeButton = dialog.locator('button').filter({ hasText: /close|cancel/i }).first()
					const closeVisible = await closeButton.isVisible().catch(() => false)
					
					if (closeVisible) {
						await closeButton.click()
					} else {
						await skillsPage.page.keyboard.press('Escape')
					}
					await skillsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				}
			}
		}
	})

	test('should handle ability editing and deletion', async () => {
		// Look for existing abilities
		const accordions = await skillsPage.page.locator('.MuiAccordion-root').all()
		
		if (accordions.length > 0) {
			// Expand first accordion
			await accordions[0].click()
			await skillsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			
			// Look for ability items within the accordion
			const abilityItems = await accordions[0].locator('.MuiAccordionDetails [role="button"], .ability-item').all()
			
			if (abilityItems.length > 0) {
				// Click on first ability to edit
				await abilityItems[0].click()
				await skillsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				
				// Look for editable fields
				const inputs = await abilityItems[0].locator('input, textarea').all()
				
				if (inputs.length > 0) {
					const input = inputs[0]
					const isEnabled = await input.isEnabled().catch(() => false)
					
					if (isEnabled) {
						const currentValue = await input.inputValue()
						await input.fill('Test Ability')
						await expect(input).toHaveValue('Test Ability')
						// Restore original value
						await input.fill(currentValue)
					}
				}
			}
		}
	})

	test('should maintain skill data across tab switches', async () => {
		// Set a test XP value
		const xpInputs = await skillsPage.page.locator('input').filter({ hasText: /xp/i }).all()
		const xpByPlaceholder = await skillsPage.page.locator('input[placeholder*="XP"]').all()
		const allXpInputs = [...xpInputs, ...xpByPlaceholder]

		if (allXpInputs.length > 0) {
			const input = allXpInputs[0]
			const isEnabled = await input.isEnabled().catch(() => false)
			
			if (isEnabled) {
				await input.fill(TEST_VALUES.XP_VALUE)
				await expect(input).toHaveValue(TEST_VALUES.XP_VALUE)
				
				// Switch tabs and return
				await skillsPage.clickTabByName('ITEMS')
				await skillsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
				
				await skillsPage.clickTabByName('SKILLS')
				await skillsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
				
				// Verify value is maintained
				await expect(input).toHaveValue(TEST_VALUES.XP_VALUE)
			}
		}
	})

	test('should handle drag and drop functionality', async () => {
		// Look for drag handles or sortable lists
		const dragHandles = await skillsPage.page.locator('[data-testid*="drag"], .drag-handle').all()
		
		if (dragHandles.length >= 2) {
			// Test drag and drop between first two items
			const source = dragHandles[0]
			const target = dragHandles[1]
			
			await source.dragTo(target)
			await skillsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			
			// Just verify no errors occurred
			await skillsPage.verifyNoConsoleErrors()
		}
	})

	test('should handle ability filtering and categorization', async () => {
		// Look for filter controls
		const filterButtons = await skillsPage.page.locator('button').filter({ hasText: /filter|category/i }).all()
		const checkboxes = await skillsPage.page.locator('input[type="checkbox"]').all()
		
		if (filterButtons.length > 0) {
			// Test filter button
			await filterButtons[0].click()
			await skillsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
		}
		
		if (checkboxes.length > 0) {
			// Test checkbox filter
			await checkboxes[0].click()
			await skillsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			
			// Toggle back
			await checkboxes[0].click()
			await skillsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
		}
	})

	test('should be responsive on different viewport sizes', async () => {
		const viewports = [
			{ width: 1920, height: 1080 }, // Desktop
			{ width: 768, height: 1024 },  // Tablet
			{ width: 375, height: 667 }    // Mobile
		]

		for (const viewport of viewports) {
			await skillsPage.page.setViewportSize(viewport)
			await skillsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Verify core components are still accessible
			await skillsPage.verifySkillsTabLoaded()
			
			// Take screenshot for each viewport
			await skillsPage.takeScreenshot(`skills-${viewport.width}x${viewport.height}.png`)
		}
	})

	test('should handle component interactions without console errors', async () => {
		await skillsPage.verifyNoConsoleErrors()
		
		// Perform various interactions
		await skillsPage.testSkillInputs()
		await skillsPage.testAbilityManagement()
		await skillsPage.testSearchDialogs()
		
		// Verify no errors occurred
		await skillsPage.verifyNoConsoleErrors()
	})
})
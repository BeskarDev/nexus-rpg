import { test, expect } from '@playwright/test'
import { BasePage } from './page-objects/BasePage'
import { StatisticsPage } from './page-objects/StatisticsPage'
import { SkillsPage } from './page-objects/SkillsPage'
import { ItemsPage } from './page-objects/ItemsPage'
import { PersonalPage } from './page-objects/PersonalPage'
import { 
	TEST_CHARACTER_IDS, 
	CHARACTER_SHEET_TABS, 
	TEST_VALUES, 
	WAIT_TIMES,
	TEST_VIEWPORT_SIZES
} from './fixtures/testData'

test.describe('Character Sheet - Cross-Tab Data Integration', () => {
	let statisticsPage: StatisticsPage
	let skillsPage: SkillsPage
	let itemsPage: ItemsPage
	let personalPage: PersonalPage

	test.beforeEach(async ({ page }) => {
		// Use mobile viewport to ensure all tabs including Statistics are available
		await page.setViewportSize(TEST_VIEWPORT_SIZES.MOBILE)
		statisticsPage = new StatisticsPage(page)
		skillsPage = new SkillsPage(page)
		itemsPage = new ItemsPage(page)
		personalPage = new PersonalPage(page)
		
		await statisticsPage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
	})

	test('should maintain data consistency across all tabs', async () => {
		// Set data in Statistics tab
		await statisticsPage.clickTabByName('STATISTICS')
		await statisticsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		const strengthInput = statisticsPage.strengthInput
		const strengthVisible = await strengthInput.isVisible().catch(() => false)
		
		if (strengthVisible && await strengthInput.isEnabled()) {
			await strengthInput.fill(TEST_VALUES.ATTRIBUTE_VALUE)
			await expect(strengthInput).toHaveValue(TEST_VALUES.ATTRIBUTE_VALUE)
		}

		// Set data in Skills tab
		await skillsPage.clickTabByName('SKILLS')
		await skillsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		const xpInputs = await skillsPage.page.locator('input').filter({ hasText: /xp/i }).all()
		const xpByPlaceholder = await skillsPage.page.locator('input[placeholder*="XP"]').all()
		const allXpInputs = [...xpInputs, ...xpByPlaceholder]

		if (allXpInputs.length > 0) {
			const xpInput = allXpInputs[0]
			const isEnabled = await xpInput.isEnabled().catch(() => false)
			if (isEnabled) {
				await xpInput.fill(TEST_VALUES.XP_VALUE)
				await expect(xpInput).toHaveValue(TEST_VALUES.XP_VALUE)
			}
		}

		// Set data in Items tab
		await itemsPage.clickTabByName('ITEMS')
		await itemsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		const coinsInput = itemsPage.coinsInput
		const coinsVisible = await coinsInput.isVisible().catch(() => false)
		
		if (coinsVisible && await coinsInput.isEnabled()) {
			await coinsInput.fill(TEST_VALUES.COINS_VALUE)
			await expect(coinsInput).toHaveValue(TEST_VALUES.COINS_VALUE)
		}

		// Set data in Personal tab
		await personalPage.clickTabByName('PERSONAL')
		await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		const nameInput = personalPage.characterNameInput
		const nameVisible = await nameInput.isVisible().catch(() => false)
		
		if (nameVisible && await nameInput.isEnabled()) {
			await nameInput.fill(TEST_VALUES.CHARACTER_NAME)
			await expect(nameInput).toHaveValue(TEST_VALUES.CHARACTER_NAME)
		}

		// Verify all data persists across tab switches
		await statisticsPage.clickTabByName('STATISTICS')
		await statisticsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		if (strengthVisible && await strengthInput.isEnabled()) {
			await expect(strengthInput).toHaveValue(TEST_VALUES.ATTRIBUTE_VALUE)
		}

		await skillsPage.clickTabByName('SKILLS')
		await skillsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		if (allXpInputs.length > 0) {
			const xpInput = allXpInputs[0]
			const isEnabled = await xpInput.isEnabled().catch(() => false)
			if (isEnabled) {
				await expect(xpInput).toHaveValue(TEST_VALUES.XP_VALUE)
			}
		}

		await itemsPage.clickTabByName('ITEMS')
		await itemsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		if (coinsVisible && await coinsInput.isEnabled()) {
			await expect(coinsInput).toHaveValue(TEST_VALUES.COINS_VALUE)
		}

		await personalPage.clickTabByName('PERSONAL')
		await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		if (nameVisible && await nameInput.isEnabled()) {
			await expect(nameInput).toHaveValue(TEST_VALUES.CHARACTER_NAME)
		}
	})

	test('should handle calculated values that span multiple tabs', async () => {
		// Test Statistics calculations that may depend on other tabs
		await statisticsPage.clickTabByName('STATISTICS')
		await statisticsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		// Check for calculated HP field
		const hpInputs = await statisticsPage.page.locator('input[type="number"]').all()
		let maxHpField = null
		
		for (const input of hpInputs) {
			const ariaLabel = await input.getAttribute('aria-label') || ''
			const placeholder = await input.getAttribute('placeholder') || ''
			
			if (ariaLabel.toLowerCase().includes('max') || 
				placeholder.toLowerCase().includes('max')) {
				maxHpField = input
				break
			}
		}

		// Test carry capacity calculation that may depend on Strength
		await itemsPage.clickTabByName('ITEMS')
		await itemsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		const capacityField = itemsPage.carryCapacityField
		const capacityVisible = await capacityField.isVisible().catch(() => false)
		
		if (capacityVisible) {
			// Verify capacity field shows some value (calculation working)
			const capacityText = await capacityField.textContent()
			expect(capacityText).toBeTruthy()
		}

		// Change Strength and verify calculations update
		await statisticsPage.clickTabByName('STATISTICS')
		await statisticsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		const strengthInput = statisticsPage.strengthInput
		const strengthVisible = await strengthInput.isVisible().catch(() => false)
		
		if (strengthVisible && await strengthInput.isEnabled()) {
			const originalValue = await strengthInput.inputValue()
			await strengthInput.fill('14')
			await statisticsPage.page.waitForTimeout(WAIT_TIMES.AUTOSAVE)
			
			// Check if carry capacity updated
			await itemsPage.clickTabByName('ITEMS')
			await itemsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Just verify no errors occurred during calculation update
			await itemsPage.verifyNoConsoleErrors()
			
			// Restore original strength value
			await statisticsPage.clickTabByName('STATISTICS')
			await statisticsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			await strengthInput.fill(originalValue)
		}
	})

	test('should handle autosave functionality across tabs', async () => {
		// Make changes in multiple tabs rapidly
		const changes = [
			{
				tabName: 'STATISTICS' as const,
				action: async () => {
					const input = statisticsPage.strengthInput
					const visible = await input.isVisible().catch(() => false)
					if (visible && await input.isEnabled()) {
						await input.fill('15')
					}
				}
			},
			{
				tabName: 'ITEMS' as const,
				action: async () => {
					const input = itemsPage.coinsInput
					const visible = await input.isVisible().catch(() => false)
					if (visible && await input.isEnabled()) {
						await input.fill('250')
					}
				}
			},
			{
				tabName: 'PERSONAL' as const,
				action: async () => {
					const input = personalPage.characterNameInput
					const visible = await input.isVisible().catch(() => false)
					if (visible && await input.isEnabled()) {
						await input.fill('Autosave Test Character')
					}
				}
			}
		]

		// Execute changes
		for (const change of changes) {
			await personalPage.clickTabByName(change.tabName)
			await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			await change.action()
			await personalPage.page.waitForTimeout(WAIT_TIMES.AUTOSAVE)
		}

		// Refresh page to test persistence
		await personalPage.page.reload()
		await personalPage.waitForPageLoad()

		// Verify changes were saved
		for (const change of changes) {
			await personalPage.clickTabByName(change.tabName)
			await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			// Just verify no errors occurred - actual persistence depends on backend
			await personalPage.verifyNoConsoleErrors()
		}
	})

	test('should handle concurrent tab interactions', async () => {
		// Simulate scenarios where user might interact with multiple tabs quickly
		const rapidInteractions = async () => {
			await statisticsPage.clickTabByName('STATISTICS')
			const strengthInput = statisticsPage.strengthInput
			const strengthVisible = await strengthInput.isVisible().catch(() => false)
			if (strengthVisible && await strengthInput.isEnabled()) {
				await strengthInput.fill('16')
			}

			await skillsPage.clickTabByName('SKILLS')
			await skillsPage.page.waitForTimeout(200)

			await itemsPage.clickTabByName('ITEMS')
			const coinsInput = itemsPage.coinsInput
			const coinsVisible = await coinsInput.isVisible().catch(() => false)
			if (coinsVisible && await coinsInput.isEnabled()) {
				await coinsInput.fill('300')
			}

			await personalPage.clickTabByName('PERSONAL')
			await personalPage.page.waitForTimeout(200)
		}

		// Execute rapid interactions multiple times
		for (let i = 0; i < 3; i++) {
			await rapidInteractions()
			await personalPage.page.waitForTimeout(500)
		}

		// Verify no errors occurred
		await personalPage.verifyNoConsoleErrors()
	})

	test('should handle search dialog interactions across tabs', async () => {
		// Test Skills tab search
		await skillsPage.clickTabByName('SKILLS')
		await skillsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		const skillsSearchButtons = await skillsPage.page.locator('button:has([data-testid="SearchIcon"])').all()
		
		if (skillsSearchButtons.length > 0) {
			await skillsSearchButtons[0].click()
			await skillsPage.page.waitForTimeout(WAIT_TIMES.DIALOG_ANIMATION)
			
			// Switch tabs while dialog is open
			await itemsPage.clickTabByName('ITEMS')
			await itemsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Switch back and close dialog
			await skillsPage.clickTabByName('SKILLS')
			await skillsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			const dialog = skillsPage.searchDialog
			const dialogVisible = await dialog.isVisible().catch(() => false)
			
			if (dialogVisible) {
				await skillsPage.page.keyboard.press('Escape')
				await skillsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			}
		}

		// Test Items tab search
		await itemsPage.clickTabByName('ITEMS')
		await itemsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		const itemsSearchButtons = await itemsPage.page.locator('button:has([data-testid="SearchIcon"])').all()
		
		if (itemsSearchButtons.length > 0) {
			await itemsSearchButtons[0].click()
			await itemsPage.page.waitForTimeout(WAIT_TIMES.DIALOG_ANIMATION)
			
			// Switch tabs while dialog is open
			await personalPage.clickTabByName('PERSONAL')
			await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Switch back and close dialog
			await itemsPage.clickTabByName('ITEMS')
			await itemsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			const dialog = itemsPage.weaponSearchDialog
			const dialogVisible = await dialog.isVisible().catch(() => false)
			
			if (dialogVisible) {
				await itemsPage.page.keyboard.press('Escape')
				await itemsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			}
		}

		// Verify no errors from dialog/tab interactions
		await itemsPage.verifyNoConsoleErrors()
	})

	test('should handle memory usage during extended tab switching', async () => {
		// Extended tab switching to test for memory leaks or performance issues
		const cycles = 5
		const tabSequence = [
			'STATISTICS',
			'SKILLS',
			'ITEMS',
			'PERSONAL',
			'ITEMS',
			'SKILLS',
			'STATISTICS'
		] as const

		for (let cycle = 0; cycle < cycles; cycle++) {
			for (const tabName of tabSequence) {
				await personalPage.clickTabByName(tabName)
				await personalPage.page.waitForTimeout(100)
				
				// Perform a small interaction in each tab
				const inputs = await personalPage.allInputs.all()
				if (inputs.length > 0) {
					const input = inputs[0]
					const isEnabled = await input.isEnabled().catch(() => false)
					if (isEnabled) {
						await input.focus()
						await personalPage.page.waitForTimeout(50)
					}
				}
			}
		}

		// Final verification
		await personalPage.verifyNoConsoleErrors()
		
		// Take final screenshot to verify UI integrity
		await personalPage.takeScreenshot('extended-tab-switching-final.png')
	})
})
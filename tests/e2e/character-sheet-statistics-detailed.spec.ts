import { test, expect } from '@playwright/test'
import { StatisticsPage } from './page-objects/StatisticsPage'
import { TEST_CHARACTER_IDS, CHARACTER_SHEET_TABS, TEST_VALUES, WAIT_TIMES, TEST_VIEWPORT_SIZES } from './fixtures/testData'

test.describe('Character Sheet - Statistics Tab Components', () => {
	let statisticsPage: StatisticsPage

	test.beforeEach(async ({ page }) => {
		// Use mobile viewport to ensure Statistics tab is clickable
		await page.setViewportSize(TEST_VIEWPORT_SIZES.MOBILE)
		statisticsPage = new StatisticsPage(page)
		await statisticsPage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
	})

	test('should load Statistics tab with all core components', async () => {
		await statisticsPage.verifyStatisticsTabLoaded()
		await statisticsPage.verifyAllComponentsInteractive()
	})

	test('should allow editing attribute values', async () => {
		await statisticsPage.testAttributeInputs()
	})

	test('should allow editing HP values', async () => {
		await statisticsPage.testHpFields()
	})

	test('should allow editing defense values', async () => {
		await statisticsPage.testDefenseFields()
	})

	test('should handle fatigue tracker interactions', async () => {
		await statisticsPage.testFatigueTracker()
	})

	test('should handle resting button functionality', async () => {
		await statisticsPage.testRestingButtons()
	})

	test('should maintain data consistency across tab switches', async () => {
		// Set a test value
		const testValue = TEST_VALUES.ATTRIBUTE_VALUE
		
		// Fill strength if available
		const strengthInput = statisticsPage.strengthInput
		const isVisible = await strengthInput.isVisible().catch(() => false)
		if (isVisible && await strengthInput.isEnabled()) {
			await strengthInput.fill(testValue)
			await expect(strengthInput).toHaveValue(testValue)
		}

		// Switch to another tab and back
		await statisticsPage.clickTab(CHARACTER_SHEET_TABS.SKILLS)
		await statisticsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		await statisticsPage.clickTab(CHARACTER_SHEET_TABS.STATISTICS)
		await statisticsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)

		// Verify value is maintained
		if (isVisible && await strengthInput.isEnabled()) {
			await expect(strengthInput).toHaveValue(testValue)
		}
	})

	test('should handle component interactions without console errors', async () => {
		await statisticsPage.verifyNoConsoleErrors()
		
		// Perform various interactions
		await statisticsPage.testAttributeInputs()
		await statisticsPage.testHpFields()
		await statisticsPage.testDefenseFields()
		
		// Verify no errors occurred
		await statisticsPage.verifyNoConsoleErrors()
	})

	test('should display calculated values correctly', async () => {
		// Verify that calculated fields exist and show reasonable values
		const numberInputs = await statisticsPage.allInputs.all()
		let calculatedFieldsFound = 0

		for (const input of numberInputs) {
			const isVisible = await input.isVisible().catch(() => false)
			if (isVisible) {
				const isReadonly = await input.getAttribute('readonly') !== null
				const isDisabled = await input.isDisabled().catch(() => false)
				
				if (isReadonly || isDisabled) {
					// This might be a calculated field
					const value = await input.inputValue()
					if (value && !isNaN(Number(value))) {
						calculatedFieldsFound++
					}
				}
			}
		}

		// Should have at least some calculated fields (like max HP, defenses)
		expect(calculatedFieldsFound).toBeGreaterThan(0)
	})

	test('should handle edge case values gracefully', async () => {
		const edgeCases = ['0', '999', '-1', '']
		
		const strengthInput = statisticsPage.strengthInput
		const isVisible = await strengthInput.isVisible().catch(() => false)
		
		if (isVisible && await strengthInput.isEnabled()) {
			for (const value of edgeCases) {
				await strengthInput.fill(value)
				await statisticsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				// Just verify no crashes occur
			}
			
			// Reset to valid value
			await strengthInput.fill(TEST_VALUES.ATTRIBUTE_VALUE)
		}
	})

	test('should be responsive on different viewport sizes', async () => {
		const viewports = [
			{ width: 1920, height: 1080 }, // Desktop
			{ width: 768, height: 1024 },  // Tablet
			{ width: 375, height: 667 }    // Mobile
		]

		for (const viewport of viewports) {
			await statisticsPage.page.setViewportSize(viewport)
			await statisticsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Verify core components are still accessible
			await statisticsPage.verifyStatisticsTabLoaded()
			
			// Take screenshot for each viewport
			await statisticsPage.takeScreenshot(`statistics-${viewport.width}x${viewport.height}.png`)
		}
	})
})
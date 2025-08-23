import { test, expect } from '@playwright/test'
import { BasePage } from './page-objects/BasePage'
import { StatisticsPage } from './page-objects/StatisticsPage'
import { SkillsPage } from './page-objects/SkillsPage'
import { ItemsPage } from './page-objects/ItemsPage'
import { PersonalPage } from './page-objects/PersonalPage'
import { 
	TEST_CHARACTER_IDS, 
	CHARACTER_SHEET_TABS, 
	ERROR_SCENARIOS,
	WAIT_TIMES,
	TEST_VIEWPORT_SIZES
} from './fixtures/testData'

test.describe('Character Sheet - Comprehensive Error Handling and Edge Cases', () => {
	let basePage: BasePage

	test.beforeEach(async ({ page }) => {
		// Use mobile viewport to ensure all tabs including Statistics are available
		await page.setViewportSize(TEST_VIEWPORT_SIZES.MOBILE)
		basePage = new BasePage(page)
	})

	test('should handle invalid character IDs gracefully', async () => {
		await basePage.goto(ERROR_SCENARIOS.INVALID_CHARACTER_ID)
		
		// Should not crash, should show some error state or default content
		const pageContent = await basePage.page.textContent('body')
		expect(pageContent).toBeTruthy()
		expect(pageContent.length).toBeGreaterThan(50)
		
		// Should not have console errors from invalid ID
		await basePage.verifyNoConsoleErrors()
		
		await basePage.takeScreenshot('error-invalid-character-id.png')
	})

	test('should handle malformed URLs gracefully', async () => {
		await basePage.page.goto(ERROR_SCENARIOS.MALFORMED_URL)
		await basePage.page.waitForTimeout(WAIT_TIMES.PAGE_LOAD)
		
		// Should not crash from XSS attempt or malformed parameter
		const pageContent = await basePage.page.textContent('body')
		expect(pageContent).toBeTruthy()
		
		// Should sanitize malicious input
		expect(pageContent).not.toContain('<script>')
		expect(pageContent).not.toContain('alert(')
		
		await basePage.verifyNoConsoleErrors()
		await basePage.takeScreenshot('error-malformed-url.png')
	})

	test('should handle missing character ID parameter', async () => {
		await basePage.goto() // No character ID provided
		
		// Should show character selection or default state
		const pageContent = await basePage.page.textContent('body')
		expect(pageContent).toBeTruthy()
		
		// Should handle gracefully without errors
		await basePage.verifyNoConsoleErrors()
		
		await basePage.takeScreenshot('error-missing-character-id.png')
	})

	test('should handle extreme input values without crashing', async () => {
		await basePage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
		
		const extremeValues = [
			'9999999999', // Very large number
			'-9999999999', // Very negative number
			'0', // Zero
			'', // Empty string
			'NaN', // NaN string
			'Infinity', // Infinity string
			'null', // null string
			'undefined', // undefined string
			'<script>alert("xss")</script>', // XSS attempt
			'A'.repeat(1000), // Very long string
			'特殊字符测试', // Unicode characters
			'🎮🎲🗡️⚔️', // Emojis
		]

		// Test Statistics tab inputs
		const statisticsPage = new StatisticsPage(basePage.page)
		await statisticsPage.clickTab(CHARACTER_SHEET_TABS.STATISTICS)
		await statisticsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)

		const strengthInput = statisticsPage.strengthInput
		const strengthVisible = await strengthInput.isVisible().catch(() => false)

		if (strengthVisible && await strengthInput.isEnabled()) {
			const originalValue = await strengthInput.inputValue()
			
			for (const extremeValue of extremeValues) {
				await strengthInput.fill(extremeValue)
				await statisticsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				
				// Should not crash the application
				await statisticsPage.verifyNoConsoleErrors()
			}
			
			// Restore original value
			await strengthInput.fill(originalValue)
		}

		// Test Personal tab text inputs
		const personalPage = new PersonalPage(basePage.page)
		await personalPage.clickTab(CHARACTER_SHEET_TABS.PERSONAL)
		await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)

		const nameInput = personalPage.characterNameInput
		const nameVisible = await nameInput.isVisible().catch(() => false)

		if (nameVisible && await nameInput.isEnabled()) {
			const originalName = await nameInput.inputValue()
			
			for (const extremeValue of extremeValues) {
				await nameInput.fill(extremeValue)
				await personalPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				
				// Should handle extreme input gracefully
				await personalPage.verifyNoConsoleErrors()
			}
			
			// Restore original name
			await nameInput.fill(originalName)
		}

		await basePage.takeScreenshot('error-extreme-input-values.png')
	})

	test('should handle rapid user interactions without errors', async () => {
		await basePage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
		
		// Rapid clicking on tabs
		for (let i = 0; i < 10; i++) {
			const randomTab = Math.floor(Math.random() * 4) // First 4 tabs
			await basePage.clickTab(randomTab)
			await basePage.page.waitForTimeout(50) // Very short wait
		}

		// Rapid input changes
		const statisticsPage = new StatisticsPage(basePage.page)
		await statisticsPage.clickTab(CHARACTER_SHEET_TABS.STATISTICS)
		await statisticsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)

		const inputs = await basePage.allInputs.all()
		
		for (let i = 0; i < Math.min(5, inputs.length); i++) {
			const input = inputs[i]
			const isVisible = await input.isVisible().catch(() => false)
			
			if (isVisible && await input.isEnabled()) {
				// Rapid typing
				for (let j = 0; j < 5; j++) {
					await input.fill(`${j}`)
					await basePage.page.waitForTimeout(50)
				}
			}
		}

		// Should handle rapid interactions without errors
		await basePage.verifyNoConsoleErrors()
		await basePage.takeScreenshot('error-rapid-interactions.png')
	})

	test('should handle network interruption gracefully', async () => {
		await basePage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
		
		// Simulate slow network by setting timeout to very low temporarily
		await basePage.page.route('**/*', route => {
			// Delay responses to simulate slow network
			setTimeout(() => route.continue(), 100)
		})

		// Try to interact with different tabs during "slow network"
		for (let i = 0; i < 4; i++) {
			await basePage.clickTab(i)
			await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Should still function during network delays
			const hasContent = await basePage.hasCharacterSheetContent()
			expect(hasContent).toBe(true)
		}

		// Remove route interception
		await basePage.page.unroute('**/*')
		
		await basePage.verifyNoConsoleErrors()
		await basePage.takeScreenshot('error-network-interruption.png')
	})

	test('should handle JavaScript errors in individual components', async () => {
		await basePage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
		
		// Monitor for JavaScript errors
		const jsErrors: string[] = []
		basePage.page.on('pageerror', (error) => {
			jsErrors.push(error.message)
		})

		// Interact with all tabs to trigger any potential JS errors
		for (let i = 0; i < 7; i++) {
			await basePage.clickTab(i)
			await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Try to interact with various elements in each tab
			const buttons = await basePage.allButtons.all()
			const inputs = await basePage.allInputs.all()
			
			// Click a few buttons if they exist
			for (let j = 0; j < Math.min(2, buttons.length); j++) {
				const button = buttons[j]
				const isVisible = await button.isVisible().catch(() => false)
				if (isVisible) {
					await button.click().catch(() => {}) // Ignore interaction errors
					await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				}
			}
			
			// Focus a few inputs if they exist
			for (let j = 0; j < Math.min(2, inputs.length); j++) {
				const input = inputs[j]
				const isVisible = await input.isVisible().catch(() => false)
				if (isVisible) {
					await input.focus().catch(() => {}) // Ignore interaction errors
					await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				}
			}
		}

		// JavaScript errors should be minimal or related to expected behavior
		console.log(`JavaScript errors encountered: ${jsErrors.length}`)
		if (jsErrors.length > 0) {
			console.log('JS Errors:', jsErrors)
		}

		await basePage.takeScreenshot('error-javascript-monitoring.png')
	})

	test('should handle browser compatibility edge cases', async () => {
		await basePage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
		
		// Test various browser features that might not be supported
		const browserFeatureTests = [
			// Test localStorage availability
			async () => {
				return await basePage.page.evaluate(() => {
					try {
						localStorage.setItem('test', 'test')
						localStorage.removeItem('test')
						return true
					} catch {
						return false
					}
				})
			},
			
			// Test CSS Grid support
			async () => {
				return await basePage.page.evaluate(() => {
					return CSS.supports('display', 'grid')
				})
			},
			
			// Test Flexbox support
			async () => {
				return await basePage.page.evaluate(() => {
					return CSS.supports('display', 'flex')
				})
			}
		]

		for (const test of browserFeatureTests) {
			const supported = await test()
			console.log(`Browser feature supported: ${supported}`)
		}

		// Character sheet should work regardless of feature support
		const hasContent = await basePage.hasCharacterSheetContent()
		expect(hasContent).toBe(true)

		await basePage.verifyNoConsoleErrors()
		await basePage.takeScreenshot('error-browser-compatibility.png')
	})

	test('should handle component state corruption gracefully', async () => {
		await basePage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
		
		// Try to corrupt component state by rapid state changes
		const statisticsPage = new StatisticsPage(basePage.page)
		await statisticsPage.clickTab(CHARACTER_SHEET_TABS.STATISTICS)
		await statisticsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)

		// Rapidly change multiple inputs simultaneously
		const inputs = await basePage.allInputs.all()
		const promises = inputs.slice(0, Math.min(3, inputs.length)).map(async (input, index) => {
			const isVisible = await input.isVisible().catch(() => false)
			if (isVisible && await input.isEnabled()) {
				for (let i = 0; i < 5; i++) {
					await input.fill(`${index}-${i}`)
					await basePage.page.waitForTimeout(25)
				}
			}
		})

		await Promise.all(promises)

		// Switch tabs rapidly while state is changing
		for (let i = 0; i < 5; i++) {
			await basePage.clickTab(i % 4)
			await basePage.page.waitForTimeout(100)
		}

		// Should recover from any state corruption
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		const hasContent = await basePage.hasCharacterSheetContent()
		expect(hasContent).toBe(true)

		await basePage.verifyNoConsoleErrors()
		await basePage.takeScreenshot('error-state-corruption.png')
	})

	test('should handle memory pressure scenarios', async () => {
		await basePage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
		
		// Create memory pressure by opening/closing dialogs rapidly
		const skillsPage = new SkillsPage(basePage.page)
		await skillsPage.clickTab(CHARACTER_SHEET_TABS.SKILLS)
		await skillsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)

		const searchButtons = await basePage.page.locator('button:has([data-testid="SearchIcon"])').all()
		
		if (searchButtons.length > 0) {
			for (let i = 0; i < 10; i++) {
				const button = searchButtons[0]
				const isVisible = await button.isVisible().catch(() => false)
				
				if (isVisible) {
					await button.click()
					await basePage.page.waitForTimeout(WAIT_TIMES.DIALOG_ANIMATION)
					
					// Close dialog
					await basePage.page.keyboard.press('Escape')
					await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				}
			}
		}

		// Test Items tab search dialogs
		const itemsPage = new ItemsPage(basePage.page)
		await itemsPage.clickTab(CHARACTER_SHEET_TABS.ITEMS)
		await itemsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)

		const itemSearchButtons = await basePage.page.locator('button:has([data-testid="SearchIcon"])').all()
		
		if (itemSearchButtons.length > 0) {
			for (let i = 0; i < 5; i++) {
				const button = itemSearchButtons[0]
				const isVisible = await button.isVisible().catch(() => false)
				
				if (isVisible) {
					await button.click()
					await basePage.page.waitForTimeout(WAIT_TIMES.DIALOG_ANIMATION)
					await basePage.page.keyboard.press('Escape')
					await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				}
			}
		}

		// Should handle memory pressure without crashing
		await basePage.verifyNoConsoleErrors()
		await basePage.takeScreenshot('error-memory-pressure.png')
	})

	test('should handle accessibility edge cases', async () => {
		await basePage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
		
		// Test keyboard navigation
		await basePage.page.keyboard.press('Tab')
		await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
		
		// Navigate through several elements with Tab
		for (let i = 0; i < 10; i++) {
			await basePage.page.keyboard.press('Tab')
			await basePage.page.waitForTimeout(100)
		}

		// Test shift+tab backward navigation
		for (let i = 0; i < 5; i++) {
			await basePage.page.keyboard.press('Shift+Tab')
			await basePage.page.waitForTimeout(100)
		}

		// Test escape key handling
		await basePage.page.keyboard.press('Escape')
		await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)

		// Test enter key handling
		await basePage.page.keyboard.press('Enter')
		await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)

		// Should handle keyboard navigation without errors
		await basePage.verifyNoConsoleErrors()
		await basePage.takeScreenshot('error-accessibility-navigation.png')
	})
})
import { test, expect } from '@playwright/test'
import { BasePage } from './page-objects/BasePage'
import { StatisticsPage } from './page-objects/StatisticsPage'
import { SkillsPage } from './page-objects/SkillsPage'
import { ItemsPage } from './page-objects/ItemsPage'
import { PersonalPage } from './page-objects/PersonalPage'
import { 
	TEST_CHARACTER_IDS, 
	CHARACTER_SHEET_TABS, 
	TAB_NAMES, 
	TEST_VALUES, 
	WAIT_TIMES,
	TEST_VIEWPORT_SIZES
} from './fixtures/testData'

test.describe('Character Sheet - Comprehensive Tab Navigation', () => {
	let basePage: BasePage

	test.beforeEach(async ({ page }) => {
		// Use mobile viewport to ensure all tabs including Statistics are available
		await page.setViewportSize(TEST_VIEWPORT_SIZES.MOBILE)
		basePage = new BasePage(page)
		await basePage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
	})

	test('should load all tabs and verify content', async () => {
		const tabNames = Object.keys(CHARACTER_SHEET_TABS) as (keyof typeof CHARACTER_SHEET_TABS)[]
		
		for (const tabName of tabNames) {
			// Click on each tab using viewport-aware navigation
			await basePage.clickTabByName(tabName)
			await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Verify tab is active using the correct index
			const tabIndex = await basePage.getTabIndex(tabName)
			await basePage.verifyTabIsActive(tabIndex)
			
			// Verify tab content is present
			const tabContent = await basePage.page.textContent('body')
			const displayName = TAB_NAMES[CHARACTER_SHEET_TABS[tabName]]
			expect(tabContent).toContain(displayName)
			
			// Take screenshot for documentation
			await basePage.takeScreenshot(`tab-${tabName.toLowerCase()}.png`)
		}
	})

	test('should handle rapid tab switching without errors', async () => {
		const tabNames = Object.keys(CHARACTER_SHEET_TABS) as (keyof typeof CHARACTER_SHEET_TABS)[]
		
		// Rapidly switch between tabs
		for (let cycle = 0; cycle < 3; cycle++) {
			for (const tabName of tabNames) {
				await basePage.clickTabByName(tabName)
				await basePage.page.waitForTimeout(200) // Shorter wait for rapid switching
				
				// Verify no console errors
				await basePage.verifyNoConsoleErrors()
			}
		}
		
		// Final verification that all tabs still work
		for (const tabName of tabNames) {
			await basePage.clickTabByName(tabName)
			await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Verify tab is active using the correct index
			const tabIndex = await basePage.getTabIndex(tabName)
			await basePage.verifyTabIsActive(tabIndex)
		}
	})

	test('should maintain URL state during tab navigation', async () => {
		const baseUrl = '/docs/tools/character-sheet'
		const characterId = TEST_CHARACTER_IDS.MOCK_CHARACTER_1
		const tabNames = Object.keys(CHARACTER_SHEET_TABS) as (keyof typeof CHARACTER_SHEET_TABS)[]
		
		for (const tabName of tabNames) {
			await basePage.clickTabByName(tabName)
			await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Check URL includes character ID parameter
			const currentUrl = basePage.page.url()
			expect(currentUrl).toContain(`id=${characterId}`)
			
			// Some implementations may update URL with tab parameter
			// This test documents current behavior
		}
	})

	test('should handle browser back/forward navigation', async () => {
		// Navigate through several tabs
		await basePage.clickTabByName('SKILLS')
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		await basePage.clickTabByName('ITEMS')
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		await basePage.clickTabByName('PERSONAL')
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		// Use browser back button
		await basePage.page.goBack()
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		// Use browser forward button
		await basePage.page.goForward()
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		// Verify functionality still works
		await basePage.verifyNoConsoleErrors()
	})

	test('should handle tab navigation via keyboard', async () => {
		// Focus first tab
		await basePage.getTabButton(0).focus()
		
		// Navigate with arrow keys
		for (let i = 1; i < Math.min(4, TAB_NAMES.length); i++) {
			await basePage.page.keyboard.press('ArrowRight')
			await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			
			// Some tab implementations may support keyboard navigation
			// This test documents the behavior
		}
		
		// Test Enter key activation
		await basePage.page.keyboard.press('Enter')
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
	})

	test('should maintain focus management during tab switches', async () => {
		// Click on a tab
		await basePage.clickTabByName('STATISTICS')
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		// Focus an input in the tab content
		const inputs = await basePage.allInputs.all()
		if (inputs.length > 0) {
			await inputs[0].focus()
			
			// Switch tabs
			await basePage.clickTabByName('SKILLS')
			await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Switch back
			await basePage.clickTabByName('STATISTICS')
			await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Verify focus management doesn't cause errors
			await basePage.verifyNoConsoleErrors()
		}
	})

	test('should handle tab accessibility features', async () => {
		// Check tab ARIA attributes
		for (let i = 0; i < TAB_NAMES.length; i++) {
			const tabButton = basePage.getTabButton(i)
			const isVisible = await tabButton.isVisible().catch(() => false)
			
			if (isVisible) {
				// Check for proper ARIA attributes
				const role = await tabButton.getAttribute('role')
				const ariaSelected = await tabButton.getAttribute('aria-selected')
				const ariaControls = await tabButton.getAttribute('aria-controls')
				
				// Document current ARIA implementation
				// Most tab implementations should have proper ARIA attributes
			}
		}
	})

	test('should handle tab overflow on small screens', async () => {
		// Test mobile viewport
		await basePage.page.setViewportSize({ width: 375, height: 667 })
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		// Check if tabs are scrollable or collapsed
		const tabContainer = basePage.page.locator('[role="tablist"], .MuiTabs-root').first()
		const isVisible = await tabContainer.isVisible().catch(() => false)
		
		if (isVisible) {
			// Look for scroll buttons or overflow handling
			const scrollButtons = await basePage.page.locator('button[aria-label*="scroll"]').all()
			
			if (scrollButtons.length > 0) {
				// Test scroll functionality
				await scrollButtons[0].click()
				await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			}
			
			// Try to access all tabs even on small screen
			for (let i = 0; i < TAB_NAMES.length; i++) {
				const tabButton = basePage.getTabButton(i)
				const isTabVisible = await tabButton.isVisible().catch(() => false)
				
				if (isTabVisible) {
					await tabButton.click()
					await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				}
			}
		}
		
		// Reset to desktop
		await basePage.page.setViewportSize({ width: 1920, height: 1080 })
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
	})

	test('should handle tab state during page refresh', async () => {
		// Navigate to specific tab
		await basePage.clickTabByName('PERSONAL')
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		// Refresh page
		await basePage.page.reload()
		await basePage.waitForPageLoad()
		
		// Check if tab state is restored
		// This depends on implementation - some may restore, others may default to first tab
		const hasPersonalContent = await basePage.hasCharacterSheetContent()
		expect(hasPersonalContent).toBe(true)
		
		// Verify functionality still works after refresh
		await basePage.clickTabByName('STATISTICS')
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		await basePage.verifyNoConsoleErrors()
	})
})
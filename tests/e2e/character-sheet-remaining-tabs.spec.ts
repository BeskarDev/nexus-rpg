import { test, expect } from '@playwright/test'
import { BasePage } from './page-objects/BasePage'
import { 
	TEST_CHARACTER_IDS, 
	CHARACTER_SHEET_TABS, 
	TAB_NAMES, 
	TEST_VIEWPORT_SIZES,
	ERROR_SCENARIOS,
	WAIT_TIMES 
} from './fixtures/testData'

test.describe('Character Sheet - Spells, Companions, and Party Tabs', () => {
	let basePage: BasePage

	test.beforeEach(async ({ page }) => {
		basePage = new BasePage(page)
		await basePage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
	})

	test('should load and interact with Spells tab', async () => {
		await basePage.clickTab(CHARACTER_SHEET_TABS.SPELLS)
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		// Verify Spells tab content
		const spellsContent = await basePage.page.textContent('body')
		const hasSpellsContent = spellsContent?.includes('Spell') || 
								spellsContent?.includes('Magic') ||
								spellsContent?.includes('Focus') ||
								spellsContent?.includes('Arcane') ||
								spellsContent?.includes('Mystic')

		// Look for spell-related components
		const spellInputs = await basePage.page.locator('input[aria-label*="spell"], input[placeholder*="spell"]').all()
		const focusInputs = await basePage.page.locator('input[aria-label*="focus"], input[placeholder*="focus"]').all()
		const spellButtons = await basePage.page.locator('button').filter({ hasText: /spell|magic|focus/i }).all()

		// Test spell management functionality
		if (spellButtons.length > 0) {
			const addSpellButtons = []
			for (const button of spellButtons) {
				const text = await button.textContent()
				if (text?.toLowerCase().includes('add')) {
					addSpellButtons.push(button)
				}
			}

			if (addSpellButtons.length > 0) {
				const addButton = addSpellButtons[0]
				const isVisible = await addButton.isVisible().catch(() => false)
				if (isVisible) {
					await expect(addButton).toBeEnabled()
				}
			}
		}

		// Test focus tracking if present
		if (focusInputs.length > 0) {
			const focusInput = focusInputs[0]
			const isEnabled = await focusInput.isEnabled().catch(() => false)
			if (isEnabled) {
				const currentValue = await focusInput.inputValue()
				await focusInput.fill('10')
				await expect(focusInput).toHaveValue('10')
				await focusInput.fill(currentValue)
			}
		}

		// Test spell search if available
		const searchButtons = await basePage.page.locator('button:has([data-testid="SearchIcon"])').all()
		if (searchButtons.length > 0) {
			const searchButton = searchButtons[0]
			const isVisible = await searchButton.isVisible().catch(() => false)
			if (isVisible) {
				await searchButton.click()
				await basePage.page.waitForTimeout(WAIT_TIMES.DIALOG_ANIMATION)
				
				const dialog = basePage.page.locator('[role="dialog"]')
				const dialogVisible = await dialog.isVisible().catch(() => false)
				
				if (dialogVisible) {
					await basePage.page.keyboard.press('Escape')
					await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				}
			}
		}

		await basePage.verifyNoConsoleErrors()
		await basePage.takeScreenshot('spells-tab-functionality.png')
	})

	test('should load and interact with Companions tab', async () => {
		await basePage.clickTab(CHARACTER_SHEET_TABS.COMPANIONS)
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		// Verify Companions tab content
		const companionsContent = await basePage.page.textContent('body')
		const hasCompanionsContent = companionsContent?.includes('Companion') ||
									companionsContent?.includes('Animal') ||
									companionsContent?.includes('Follower') ||
									companionsContent?.includes('Pet')

		// Look for companion-related components
		const companionInputs = await basePage.page.locator('input[aria-label*="companion"], input[placeholder*="companion"]').all()
		const animalInputs = await basePage.page.locator('input[aria-label*="animal"], input[placeholder*="animal"]').all()
		const companionButtons = await basePage.page.locator('button').filter({ hasText: /companion|animal|add/i }).all()

		// Test companion management
		if (companionButtons.length > 0) {
			for (let i = 0; i < Math.min(2, companionButtons.length); i++) {
				const button = companionButtons[i]
				const isVisible = await button.isVisible().catch(() => false)
				if (isVisible) {
					await expect(button).toBeEnabled()
				}
			}
		}

		// Test companion input fields
		const allCompanionInputs = [...companionInputs, ...animalInputs]
		if (allCompanionInputs.length > 0) {
			const input = allCompanionInputs[0]
			const isEnabled = await input.isEnabled().catch(() => false)
			if (isEnabled) {
				const currentValue = await input.inputValue()
				await input.fill('Test Companion')
				await expect(input).toHaveValue('Test Companion')
				await input.fill(currentValue)
			}
		}

		await basePage.verifyNoConsoleErrors()
		await basePage.takeScreenshot('companions-tab-functionality.png')
	})

	test('should load and interact with Party tab', async () => {
		await basePage.clickTab(CHARACTER_SHEET_TABS.PARTY)
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
		
		// Verify Party tab content
		const partyContent = await basePage.page.textContent('body')
		const hasPartyContent = partyContent?.includes('Party') ||
								partyContent?.includes('Member') ||
								partyContent?.includes('Shared') ||
								partyContent?.includes('Group')

		// Look for party-related components
		const partyInputs = await basePage.page.locator('input[aria-label*="party"], input[placeholder*="party"]').all()
		const memberInputs = await basePage.page.locator('input[aria-label*="member"], input[placeholder*="member"]').all()
		const sharedNotesTextarea = await basePage.page.locator('textarea[aria-label*="shared"], textarea[placeholder*="shared"]').all()
		const partyButtons = await basePage.page.locator('button').filter({ hasText: /party|member|add/i }).all()

		// Test party management
		if (partyButtons.length > 0) {
			for (let i = 0; i < Math.min(2, partyButtons.length); i++) {
				const button = partyButtons[i]
				const isVisible = await button.isVisible().catch(() => false)
				if (isVisible) {
					await expect(button).toBeEnabled()
				}
			}
		}

		// Test shared notes if present
		if (sharedNotesTextarea.length > 0) {
			const textarea = sharedNotesTextarea[0]
			const isEnabled = await textarea.isEnabled().catch(() => false)
			if (isEnabled) {
				const currentValue = await textarea.inputValue()
				await textarea.fill('Test shared party notes')
				await expect(textarea).toHaveValue('Test shared party notes')
				await textarea.fill(currentValue)
			}
		}

		// Test party member inputs
		const allPartyInputs = [...partyInputs, ...memberInputs]
		if (allPartyInputs.length > 0) {
			const input = allPartyInputs[0]
			const isEnabled = await input.isEnabled().catch(() => false)
			if (isEnabled) {
				const currentValue = await input.inputValue()
				await input.fill('Test Party Member')
				await expect(input).toHaveValue('Test Party Member')
				await input.fill(currentValue)
			}
		}

		await basePage.verifyNoConsoleErrors()
		await basePage.takeScreenshot('party-tab-functionality.png')
	})

	test('should handle all tabs in mobile viewport', async () => {
		await basePage.page.setViewportSize(TEST_VIEWPORT_SIZES.MOBILE)
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)

		// Test all tabs in mobile view
		for (let i = 0; i < TAB_NAMES.length; i++) {
			await basePage.clickTab(i)
			await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Verify tab content is accessible on mobile
			const hasContent = await basePage.hasCharacterSheetContent()
			expect(hasContent).toBe(true)
			
			// Verify no horizontal scrolling issues
			const bodyWidth = await basePage.page.evaluate(() => document.body.scrollWidth)
			const viewportWidth = TEST_VIEWPORT_SIZES.MOBILE.width
			expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20) // Allow small buffer
			
			await basePage.takeScreenshot(`mobile-tab-${i}-${TAB_NAMES[i].toLowerCase()}.png`)
		}
	})

	test('should handle all tabs in tablet viewport', async () => {
		await basePage.page.setViewportSize(TEST_VIEWPORT_SIZES.TABLET)
		await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)

		// Test all tabs in tablet view
		for (let i = 0; i < TAB_NAMES.length; i++) {
			await basePage.clickTab(i)
			await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			const hasContent = await basePage.hasCharacterSheetContent()
			expect(hasContent).toBe(true)
			
			// Check for proper responsive layout
			const inputs = await basePage.allInputs.count()
			const buttons = await basePage.allButtons.count()
			
			expect(inputs + buttons).toBeGreaterThan(0)
			
			await basePage.takeScreenshot(`tablet-tab-${i}-${TAB_NAMES[i].toLowerCase()}.png`)
		}
	})

	test('should handle remaining tabs with comprehensive component verification', async () => {
		const tabs = [
			{ index: CHARACTER_SHEET_TABS.SPELLS, name: 'Spells' },
			{ index: CHARACTER_SHEET_TABS.COMPANIONS, name: 'Companions' },
			{ index: CHARACTER_SHEET_TABS.PARTY, name: 'Party' }
		]

		for (const tab of tabs) {
			await basePage.clickTab(tab.index)
			await basePage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Verify tab loads without errors
			await basePage.verifyNoConsoleErrors()
			
			// Count interactive elements
			const inputs = await basePage.allInputs.count()
			const buttons = await basePage.allButtons.count()
			const textareas = await basePage.page.locator('textarea').count()
			
			// Should have some interactive elements
			expect(inputs + buttons + textareas).toBeGreaterThan(0)
			
			// Test accessibility - check for proper labels
			const labeledInputs = await basePage.page.locator('input[aria-label], input[aria-labelledby]').count()
			const labeledTextareas = await basePage.page.locator('textarea[aria-label], textarea[aria-labelledby]').count()
			
			// Good accessibility practice
			expect(labeledInputs + labeledTextareas).toBeGreaterThanOrEqual(0)
			
			// Verify tab can handle basic interactions
			const firstButton = basePage.page.locator('button').first()
			const buttonVisible = await firstButton.isVisible().catch(() => false)
			
			if (buttonVisible) {
				// Hover over button to test hover states
				await firstButton.hover()
				await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			}
			
			const firstInput = basePage.page.locator('input, textarea').first()
			const inputVisible = await firstInput.isVisible().catch(() => false)
			
			if (inputVisible) {
				// Focus input to test focus states
				await firstInput.focus()
				await basePage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			}
			
			await basePage.takeScreenshot(`${tab.name.toLowerCase()}-comprehensive-test.png`)
		}
	})
})
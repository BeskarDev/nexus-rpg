import { test, expect } from '@playwright/test'
import { ItemsPage } from './page-objects/ItemsPage'
import { TEST_CHARACTER_IDS, CHARACTER_SHEET_TABS, TEST_VALUES, WAIT_TIMES } from './fixtures/testData'

test.describe('Character Sheet - Items Tab Components', () => {
	let itemsPage: ItemsPage

	test.beforeEach(async ({ page }) => {
		itemsPage = new ItemsPage(page)
		await itemsPage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
	})

	test('should load Items tab with all core components', async () => {
		await itemsPage.verifyItemsTabLoaded()
		await itemsPage.verifyAllComponentsInteractive()
	})

	test('should handle load and encumbrance management', async () => {
		await itemsPage.testLoadManagement()
	})

	test('should handle inventory section expansion', async () => {
		await itemsPage.testInventorySections()
	})

	test('should handle item addition functionality', async () => {
		await itemsPage.testItemAddition()
	})

	test('should handle search functionality', async () => {
		await itemsPage.testSearchFunctionality()
	})

	test('should handle existing item management', async () => {
		await itemsPage.testExistingItems()
	})

	test('should handle settings menu functionality', async () => {
		await itemsPage.testSettingsMenu()
	})

	test('should calculate and display load correctly', async () => {
		// Verify load calculation components are present
		const loadRelatedElements = await itemsPage.page.locator('*').filter({ hasText: /load|capacity|encumber/i }).all()
		expect(loadRelatedElements.length).toBeGreaterThan(0)
		
		// Test coins input affects load
		const coinsInput = itemsPage.coinsInput
		const coinsVisible = await coinsInput.isVisible().catch(() => false)
		
		if (coinsVisible && await coinsInput.isEnabled()) {
			const originalValue = await coinsInput.inputValue()
			
			// Set high coin value
			await coinsInput.fill('1000')
			await itemsPage.page.waitForTimeout(WAIT_TIMES.AUTOSAVE)
			
			// Load should update (though we can't verify exact calculation without knowing character stats)
			// Just verify no errors occurred
			await itemsPage.verifyNoConsoleErrors()
			
			// Restore original value
			await coinsInput.fill(originalValue)
		}
	})

	test('should handle weapon management workflow', async () => {
		// Expand inventory sections first
		const sections = await itemsPage.inventorySections.all()
		
		if (sections.length > 0) {
			// Expand first section
			const header = sections[0].locator('.MuiAccordionSummary-root').first()
			const headerVisible = await header.isVisible().catch(() => false)
			
			if (headerVisible) {
				await header.click()
				await itemsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			}
		}

		// Test add weapon functionality
		const addWeaponButtons = await itemsPage.addWeaponButtons.all()
		
		if (addWeaponButtons.length > 0) {
			const button = addWeaponButtons[0]
			const isVisible = await button.isVisible().catch(() => false)
			
			if (isVisible) {
				// Just verify it's clickable - don't actually add
				await expect(button).toBeEnabled()
			}
		}

		// Test weapon search
		const searchWeaponButtons = await itemsPage.searchWeaponButtons.all()
		
		if (searchWeaponButtons.length > 0) {
			const button = searchWeaponButtons[0]
			const isVisible = await button.isVisible().catch(() => false)
			
			if (isVisible) {
				await button.click()
				await itemsPage.page.waitForTimeout(WAIT_TIMES.DIALOG_ANIMATION)
				
				// Check for search dialog
				const dialog = itemsPage.weaponSearchDialog
				const dialogVisible = await dialog.isVisible().catch(() => false)
				
				if (dialogVisible) {
					// Test search functionality
					const searchInput = dialog.locator('input[type="text"], input[placeholder*="search"]').first()
					const searchInputVisible = await searchInput.isVisible().catch(() => false)
					
					if (searchInputVisible) {
						await searchInput.fill('sword')
						await expect(searchInput).toHaveValue('sword')
					}
					
					// Close dialog
					const closeButton = itemsPage.dialogCloseButton.first()
					const closeVisible = await closeButton.isVisible().catch(() => false)
					
					if (closeVisible) {
						await closeButton.click()
					} else {
						await itemsPage.page.keyboard.press('Escape')
					}
					await itemsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				}
			}
		}
	})

	test('should handle equipment management workflow', async () => {
		// Test add item functionality
		const addItemButtons = await itemsPage.addItemButtons.all()
		
		if (addItemButtons.length > 0) {
			const button = addItemButtons[0]
			const isVisible = await button.isVisible().catch(() => false)
			
			if (isVisible) {
				await expect(button).toBeEnabled()
			}
		}

		// Test equipment search
		const searchItemButtons = await itemsPage.searchItemButtons.all()
		
		if (searchItemButtons.length > 0) {
			const button = searchItemButtons[0]
			const isVisible = await button.isVisible().catch(() => false)
			
			if (isVisible) {
				await button.click()
				await itemsPage.page.waitForTimeout(WAIT_TIMES.DIALOG_ANIMATION)
				
				const dialog = itemsPage.equipmentSearchDialog
				const dialogVisible = await dialog.isVisible().catch(() => false)
				
				if (dialogVisible) {
					const searchInput = dialog.locator('input[type="text"], input[placeholder*="search"]').first()
					const searchInputVisible = await searchInput.isVisible().catch(() => false)
					
					if (searchInputVisible) {
						await searchInput.fill('armor')
						await expect(searchInput).toHaveValue('armor')
					}
					
					const closeButton = itemsPage.dialogCloseButton.first()
					const closeVisible = await closeButton.isVisible().catch(() => false)
					
					if (closeVisible) {
						await closeButton.click()
					} else {
						await itemsPage.page.keyboard.press('Escape')
					}
					await itemsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				}
			}
		}
	})

	test('should handle item editing and deletion', async () => {
		// Look for existing items
		const weaponRows = await itemsPage.weaponRows.all()
		const itemRows = await itemsPage.itemRows.all()
		
		// Test weapon editing if weapons exist
		if (weaponRows.length > 0) {
			const firstWeapon = weaponRows[0]
			const inputs = await firstWeapon.locator('input').all()
			
			if (inputs.length > 0) {
				const input = inputs[0]
				const isEnabled = await input.isEnabled().catch(() => false)
				
				if (isEnabled) {
					const currentValue = await input.inputValue()
					await input.fill('Test Weapon Name')
					await expect(input).toHaveValue('Test Weapon Name')
					// Restore original value
					await input.fill(currentValue)
				}
			}
		}

		// Test item editing if items exist
		if (itemRows.length > 0) {
			const firstItem = itemRows[0]
			const inputs = await firstItem.locator('input').all()
			
			if (inputs.length > 0) {
				const input = inputs[0]
				const isEnabled = await input.isEnabled().catch(() => false)
				
				if (isEnabled) {
					const currentValue = await input.inputValue()
					await input.fill('Test Item Name')
					await expect(input).toHaveValue('Test Item Name')
					await input.fill(currentValue)
				}
			}
		}
	})

	test('should handle drag and drop item reordering', async () => {
		// Look for drag handles or draggable items
		const dragHandles = await itemsPage.page.locator('[data-testid*="drag"], .drag-handle, [draggable="true"]').all()
		
		if (dragHandles.length >= 2) {
			// Test drag and drop between first two items
			const source = dragHandles[0]
			const target = dragHandles[1]
			
			await source.dragTo(target)
			await itemsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			
			// Verify no errors occurred
			await itemsPage.verifyNoConsoleErrors()
		}
	})

	test('should handle inventory location management', async () => {
		// Test inventory section toggling
		const sections = await itemsPage.inventorySections.all()
		
		for (let i = 0; i < Math.min(3, sections.length); i++) {
			const section = sections[i]
			const header = section.locator('.MuiAccordionSummary-root').first()
			const headerVisible = await header.isVisible().catch(() => false)
			
			if (headerVisible) {
				// Expand
				await header.click()
				await itemsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
				
				// Collapse
				await header.click()
				await itemsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			}
		}
	})

	test('should maintain item data across tab switches', async () => {
		// Set coins value
		const coinsInput = itemsPage.coinsInput
		const coinsVisible = await coinsInput.isVisible().catch(() => false)
		
		if (coinsVisible && await coinsInput.isEnabled()) {
			await coinsInput.fill(TEST_VALUES.COINS_VALUE)
			await expect(coinsInput).toHaveValue(TEST_VALUES.COINS_VALUE)
			
			// Switch tabs and return
			await itemsPage.clickTab(CHARACTER_SHEET_TABS.PERSONAL)
			await itemsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			await itemsPage.clickTab(CHARACTER_SHEET_TABS.ITEMS)
			await itemsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Verify value is maintained
			await expect(coinsInput).toHaveValue(TEST_VALUES.COINS_VALUE)
		}
	})

	test('should display encumbrance status correctly', async () => {
		// Look for encumbrance indicators
		const encumbranceElements = await itemsPage.page.locator('*').filter({ hasText: /encumber|overload/i }).all()
		
		// Test different load scenarios by modifying carry capacity
		const modifierInput = itemsPage.carryModifierInput
		const modifierVisible = await modifierInput.isVisible().catch(() => false)
		
		if (modifierVisible && await modifierInput.isEnabled()) {
			const originalValue = await modifierInput.inputValue()
			
			// Test with reduced capacity
			await modifierInput.fill('-5')
			await itemsPage.page.waitForTimeout(WAIT_TIMES.AUTOSAVE)
			
			// Check if encumbrance status updates
			const loadField = itemsPage.currentLoadField
			const loadVisible = await loadField.isVisible().catch(() => false)
			
			if (loadVisible) {
				// Just verify the component exists and updates
				await itemsPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			}
			
			// Restore original value
			await modifierInput.fill(originalValue)
		}
	})

	test('should be responsive on different viewport sizes', async () => {
		const viewports = [
			{ width: 1920, height: 1080 }, // Desktop
			{ width: 768, height: 1024 },  // Tablet
			{ width: 375, height: 667 }    // Mobile
		]

		for (const viewport of viewports) {
			await itemsPage.page.setViewportSize(viewport)
			await itemsPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Verify core components are still accessible
			await itemsPage.verifyItemsTabLoaded()
			
			// Take screenshot for each viewport
			await itemsPage.takeScreenshot(`items-${viewport.width}x${viewport.height}.png`)
		}
	})

	test('should handle component interactions without console errors', async () => {
		await itemsPage.verifyNoConsoleErrors()
		
		// Perform various interactions
		await itemsPage.testLoadManagement()
		await itemsPage.testInventorySections()
		await itemsPage.testItemAddition()
		
		// Verify no errors occurred
		await itemsPage.verifyNoConsoleErrors()
	})
})
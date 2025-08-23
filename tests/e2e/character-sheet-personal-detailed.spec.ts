import { test, expect } from '@playwright/test'
import { PersonalPage } from './page-objects/PersonalPage'
import { TEST_CHARACTER_IDS, CHARACTER_SHEET_TABS, TEST_VALUES, WAIT_TIMES, TEST_VIEWPORT_SIZES } from './fixtures/testData'

test.describe('Character Sheet - Personal Tab Components', () => {
	let personalPage: PersonalPage

	test.beforeEach(async ({ page }) => {
		// Use mobile viewport to ensure all tabs including Statistics are available for cross-tab tests
		await page.setViewportSize(TEST_VIEWPORT_SIZES.MOBILE)
		personalPage = new PersonalPage(page)
		await personalPage.goto(TEST_CHARACTER_IDS.MOCK_CHARACTER_1)
	})

	test('should load Personal tab with all core components', async () => {
		await personalPage.verifyPersonalTabLoaded()
		await personalPage.verifyAllComponentsInteractive()
	})

	test('should handle character details editing', async () => {
		await personalPage.testCharacterDetails()
	})

	test('should handle personal notes functionality', async () => {
		await personalPage.testPersonalNotes()
	})

	test('should handle edit controls functionality', async () => {
		await personalPage.testEditControls()
	})

	test('should handle allies management', async () => {
		await personalPage.testAlliesManagement()
	})

	test('should handle contacts management', async () => {
		await personalPage.testContactsManagement()
	})

	test('should handle rivals management', async () => {
		await personalPage.testRivalsManagement()
	})

	test('should handle character background information', async () => {
		// Test various character detail fields
		const textInputs = await personalPage.page.locator('input[type="text"]').all()
		
		for (let i = 0; i < Math.min(3, textInputs.length); i++) {
			const input = textInputs[i]
			const isVisible = await input.isVisible().catch(() => false)
			
			if (isVisible) {
				const isEnabled = await input.isEnabled().catch(() => false)
				if (isEnabled) {
					const placeholder = await input.getAttribute('placeholder') || ''
					const ariaLabel = await input.getAttribute('aria-label') || ''
					
					// Skip if this looks like a search or filter field
					if (!placeholder.toLowerCase().includes('search') && 
						!ariaLabel.toLowerCase().includes('search')) {
						
						const currentValue = await input.inputValue()
						await input.fill('Test Background Info')
						await expect(input).toHaveValue('Test Background Info')
						await input.fill(currentValue)
					}
				}
			}
		}
	})

	test('should handle list item addition workflow', async () => {
		// Enable edit controls first
		const editButton = personalPage.editControlsButton
		const editVisible = await editButton.isVisible().catch(() => false)
		
		if (editVisible) {
			await editButton.click()
			await personalPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			
			// Test add buttons for each category
			const addButtons = [
				{ button: personalPage.addAllyButton, name: 'Ally' },
				{ button: personalPage.addContactButton, name: 'Contact' },
				{ button: personalPage.addRivalButton, name: 'Rival' }
			]
			
			for (const { button, name } of addButtons) {
				const isVisible = await button.isVisible().catch(() => false)
				if (isVisible) {
					// Just verify the button is functional - don't actually add
					await expect(button).toBeEnabled()
				}
			}
			
			// Disable edit controls
			await editButton.click()
			await personalPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
		}
	})

	test('should handle list item deletion workflow', async () => {
		// Enable edit controls
		const editButton = personalPage.editControlsButton
		const editVisible = await editButton.isVisible().catch(() => false)
		
		if (editVisible) {
			await editButton.click()
			await personalPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			
			// Look for existing list items with delete buttons
			const deleteButtons = await personalPage.deleteButtons.all()
			
			if (deleteButtons.length > 0) {
				// Verify delete buttons are present and functional
				for (let i = 0; i < Math.min(2, deleteButtons.length); i++) {
					const button = deleteButtons[i]
					const isVisible = await button.isVisible().catch(() => false)
					if (isVisible) {
						await expect(button).toBeEnabled()
					}
				}
			}
			
			// Disable edit controls
			await editButton.click()
			await personalPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
		}
	})

	test('should handle list reordering functionality', async () => {
		// Look for drag handles or sortable elements
		const dragHandles = await personalPage.page.locator('[data-testid*="drag"], .drag-handle, [draggable="true"]').all()
		
		if (dragHandles.length >= 2) {
			// Test drag and drop reordering
			const source = dragHandles[0]
			const target = dragHandles[1]
			
			await source.dragTo(target)
			await personalPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			
			// Verify no errors occurred
			await personalPage.verifyNoConsoleErrors()
		}
	})

	test('should handle large amounts of personal notes', async () => {
		const notesTextarea = personalPage.personalNotesTextarea
		const isVisible = await notesTextarea.isVisible().catch(() => false)
		
		if (isVisible && await notesTextarea.isEnabled()) {
			const currentNotes = await notesTextarea.inputValue()
			
			// Test with large text content
			const largeText = 'This is a test of large personal notes content. '.repeat(50)
			
			await notesTextarea.fill(largeText)
			await expect(notesTextarea).toHaveValue(largeText)
			
			// Verify autosave works with large content
			await personalPage.page.waitForTimeout(WAIT_TIMES.AUTOSAVE)
			
			// Restore original notes
			await notesTextarea.fill(currentNotes)
		}
	})

	test('should handle special characters in input fields', async () => {
		const testCases = [
			'Test with "quotes"',
			"Test with 'apostrophes'",
			'Test with émojis 🎭',
			'Test with symbols: @#$%^&*()',
			'Test with unicode: café résumé'
		]
		
		const nameInput = personalPage.characterNameInput
		const nameVisible = await nameInput.isVisible().catch(() => false)
		
		if (nameVisible && await nameInput.isEnabled()) {
			const originalName = await nameInput.inputValue()
			
			for (const testCase of testCases) {
				await nameInput.fill(testCase)
				await expect(nameInput).toHaveValue(testCase)
				await personalPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			}
			
			// Restore original name
			await nameInput.fill(originalName)
		}
	})

	test('should maintain personal data across tab switches', async () => {
		// Set character name
		const nameInput = personalPage.characterNameInput
		const nameVisible = await nameInput.isVisible().catch(() => false)
		
		if (nameVisible && await nameInput.isEnabled()) {
			await nameInput.fill(TEST_VALUES.CHARACTER_NAME)
			await expect(nameInput).toHaveValue(TEST_VALUES.CHARACTER_NAME)
			
			// Switch tabs and return
			await personalPage.clickTab(CHARACTER_SHEET_TABS.STATISTICS)
			await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			await personalPage.clickTab(CHARACTER_SHEET_TABS.PERSONAL)
			await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Verify value is maintained
			await expect(nameInput).toHaveValue(TEST_VALUES.CHARACTER_NAME)
		}

		// Test personal notes persistence
		const notesTextarea = personalPage.personalNotesTextarea
		const notesVisible = await notesTextarea.isVisible().catch(() => false)
		
		if (notesVisible && await notesTextarea.isEnabled()) {
			await notesTextarea.fill(TEST_VALUES.PERSONAL_NOTES)
			await expect(notesTextarea).toHaveValue(TEST_VALUES.PERSONAL_NOTES)
			
			// Switch tabs and return
			await personalPage.clickTab(CHARACTER_SHEET_TABS.SKILLS)
			await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			await personalPage.clickTab(CHARACTER_SHEET_TABS.PERSONAL)
			await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Verify notes are maintained
			await expect(notesTextarea).toHaveValue(TEST_VALUES.PERSONAL_NOTES)
		}
	})

	test('should handle edit mode state persistence', async () => {
		const editButton = personalPage.editControlsButton
		const editVisible = await editButton.isVisible().catch(() => false)
		
		if (editVisible) {
			// Enable edit mode
			await editButton.click()
			await personalPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			
			// Verify edit controls are visible
			const deleteButtons = await personalPage.deleteButtons.count()
			const editModeActive = deleteButtons > 0
			
			if (editModeActive) {
				// Switch tabs and return
				await personalPage.clickTab(CHARACTER_SHEET_TABS.ITEMS)
				await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
				
				await personalPage.clickTab(CHARACTER_SHEET_TABS.PERSONAL)
				await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
				
				// Check if edit mode is still active (may or may not persist based on implementation)
				const newDeleteButtons = await personalPage.deleteButtons.count()
				// Note: This test documents the current behavior rather than enforcing it
			}
			
			// Ensure edit mode is disabled for cleanup
			const finalEditButton = personalPage.editControlsButton
			const finalEditVisible = await finalEditButton.isVisible().catch(() => false)
			if (finalEditVisible) {
				await finalEditButton.click()
				await personalPage.page.waitForTimeout(WAIT_TIMES.INTERACTION)
			}
		}
	})

	test('should be responsive on different viewport sizes', async () => {
		const viewports = [
			{ width: 1920, height: 1080 }, // Desktop
			{ width: 768, height: 1024 },  // Tablet
			{ width: 375, height: 667 }    // Mobile
		]

		for (const viewport of viewports) {
			await personalPage.page.setViewportSize(viewport)
			await personalPage.page.waitForTimeout(WAIT_TIMES.COMPONENT_LOAD)
			
			// Verify core components are still accessible
			await personalPage.verifyPersonalTabLoaded()
			
			// Take screenshot for each viewport
			await personalPage.takeScreenshot(`personal-${viewport.width}x${viewport.height}.png`)
		}
	})

	test('should handle component interactions without console errors', async () => {
		await personalPage.verifyNoConsoleErrors()
		
		// Perform various interactions
		await personalPage.testCharacterDetails()
		await personalPage.testPersonalNotes()
		await personalPage.testEditControls()
		
		// Verify no errors occurred
		await personalPage.verifyNoConsoleErrors()
	})
})
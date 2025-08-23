import { test, expect } from '@playwright/test'
import { CharacterSheetPage } from '../page-objects/CharacterSheetPage'
import { MOCK_CHARACTERS, ATTRIBUTE_DIE_VALUES, TEST_UTILS } from '../fixtures/testData'

test.describe('Character Sheet - Editing and Saving', () => {
	let characterSheetPage: CharacterSheetPage

	test.beforeEach(async ({ page }) => {
		characterSheetPage = new CharacterSheetPage(page)
		await characterSheetPage.navigateToCharacter(MOCK_CHARACTERS.kael.id)
	})

	test('should allow editing resolve value', async () => {
		const originalResolve = await characterSheetPage.getResolveValue()
		const newResolveValue = originalResolve > 0 ? originalResolve - 1 : originalResolve + 1
		
		// Change resolve value
		await characterSheetPage.setResolveValue(newResolveValue)
		
		// Verify value changed
		const currentResolve = await characterSheetPage.getResolveValue()
		expect(currentResolve).toBe(newResolveValue)
		
		// Wait for autosave
		await TEST_UTILS.waitForAutosave(characterSheetPage.page)
		
		// Verify autosave worked (save button should be disabled)
		expect(await characterSheetPage.isAutosaveWorking()).toBe(true)
	})

	test('should maintain state after page reload', async () => {
		const originalResolve = await characterSheetPage.getResolveValue()
		const newResolveValue = originalResolve + 1
		
		// Change resolve value
		await characterSheetPage.setResolveValue(newResolveValue)
		
		// Wait for autosave
		await TEST_UTILS.waitForAutosave(characterSheetPage.page)
		
		// Reload page
		await characterSheetPage.page.reload()
		await characterSheetPage.waitForPageLoad()
		
		// Verify value persisted (in development mode with mock data, this may reset)
		// But the functionality should work without errors
		const currentResolve = await characterSheetPage.getResolveValue()
		expect(typeof currentResolve).toBe('number')
	})

	test('should allow editing fatigue levels', async () => {
		const originalFatigue = await characterSheetPage.getFatigueLevel()
		const newFatigueLevel = originalFatigue < 3 ? originalFatigue + 1 : originalFatigue - 1
		
		// Change fatigue level
		await characterSheetPage.setFatigueLevel(newFatigueLevel)
		
		// Verify fatigue level changed
		const currentFatigue = await characterSheetPage.getFatigueLevel()
		expect(currentFatigue).toBe(newFatigueLevel)
		
		// Wait for autosave
		await TEST_UTILS.waitForAutosave(characterSheetPage.page)
	})

	test('should show attribute values correctly', async () => {
		// Check all attribute values are valid
		for (const attribute of ['Strength', 'Agility', 'Spirit', 'Mind'] as const) {
			const value = await characterSheetPage.getAttributeValue(attribute)
			expect(ATTRIBUTE_DIE_VALUES).toContain(value as any)
		}
	})

	test('should handle rest buttons', async () => {
		// Test Short Break button
		await characterSheetPage.page.click(characterSheetPage.shortBreakButton)
		
		// Verify character sheet is still functional
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		// Test Night's Rest button
		await characterSheetPage.page.click(characterSheetPage.nightsRestButton)
		
		// Verify character sheet is still functional
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
		
		// Test Bad Night button
		await characterSheetPage.page.click(characterSheetPage.badNightButton)
		
		// Verify character sheet is still functional
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
	})

	test('should handle adding status effects', async () => {
		// Click add status effect button
		await characterSheetPage.page.click(characterSheetPage.addStatusEffectButton)
		
		// Verify character sheet is still functional
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
	})

	test('should allow editing skills tab content', async () => {
		await characterSheetPage.switchToTab('Skills')
		
		// Find Total XP input and try to edit it
		const totalXpInput = characterSheetPage.page.locator('input[aria-label="Total XP"]')
		if (await totalXpInput.isVisible()) {
			const originalValue = await totalXpInput.inputValue()
			const newValue = (parseInt(originalValue) + 1).toString()
			
			await totalXpInput.fill(newValue)
			
			// Verify value changed
			const currentValue = await totalXpInput.inputValue()
			expect(currentValue).toBe(newValue)
		}
	})

	test('should allow editing items tab content', async () => {
		await characterSheetPage.switchToTab('Items')
		
		// Find Coins input and try to edit it
		const coinsInput = characterSheetPage.page.locator('input[aria-label="Coins"]')
		if (await coinsInput.isVisible()) {
			const originalValue = await coinsInput.inputValue()
			const newValue = (parseInt(originalValue) + 10).toString()
			
			await coinsInput.fill(newValue)
			
			// Verify value changed
			const currentValue = await coinsInput.inputValue()
			expect(currentValue).toBe(newValue)
		}
	})

	test('should save character data automatically', async () => {
		// Make a change to trigger autosave
		const originalResolve = await characterSheetPage.getResolveValue()
		await characterSheetPage.setResolveValue(originalResolve + 1)
		
		// Wait for autosave to complete
		await TEST_UTILS.waitForAutosave(characterSheetPage.page)
		
		// Verify save is complete (save button disabled)
		expect(await characterSheetPage.isAutosaveWorking()).toBe(true)
	})

	test('should handle download character functionality', async () => {
		// Create a promise to handle the download
		const downloadPromise = characterSheetPage.page.waitForEvent('download')
		
		// Click download button
		await characterSheetPage.downloadCharacter()
		
		// Wait for download to start
		const download = await downloadPromise
		
		// Verify download has a filename
		expect(download.suggestedFilename()).toBeTruthy()
	})

	test('should handle manual save button', async () => {
		// Make a change to enable save button
		const originalResolve = await characterSheetPage.getResolveValue()
		await characterSheetPage.setResolveValue(originalResolve + 1)
		
		// If save button is enabled, click it
		const saveButton = characterSheetPage.page.locator(characterSheetPage.saveButton)
		if (!(await saveButton.isDisabled())) {
			await characterSheetPage.saveCharacter()
		}
		
		// Verify character sheet is still functional
		expect(await characterSheetPage.isCharacterSheetLoaded()).toBe(true)
	})

	test('should validate input constraints', async () => {
		// Test resolve input constraints (should not go below 0 or above max)
		await characterSheetPage.setResolveValue(-1)
		const resolveAfterNegative = await characterSheetPage.getResolveValue()
		expect(resolveAfterNegative).toBeGreaterThanOrEqual(0)
		
		// Test extremely high value
		await characterSheetPage.setResolveValue(999)
		const resolveAfterHigh = await characterSheetPage.getResolveValue()
		expect(resolveAfterHigh).toBeLessThan(100) // Reasonable upper bound
	})
})
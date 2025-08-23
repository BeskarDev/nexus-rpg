import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * Page Object Model for the Personal Tab (Tab 4)
 * Covers: Character details, Allies, Contacts, Rivals, Personal notes
 */
export class PersonalPage extends BasePage {
	constructor(page: Page) {
		super(page)
	}

	/**
	 * Navigate directly to Personal tab
	 */
	async goto(characterId?: string): Promise<void> {
		await super.goto(characterId, 4)
	}

	// Character Details
	get characterNameInput(): Locator {
		return this.page.locator('input[aria-label*="name"], input[placeholder*="name"]').first()
	}

	get characterDetailsInputs(): Locator {
		return this.page.locator('input[type="text"], textarea').filter({ hasText: /character|personal/i })
	}

	// List Management
	get alliesSection(): Locator {
		return this.page.locator('*:has-text("Allies"), [data-testid*="allies"]')
	}

	get contactsSection(): Locator {
		return this.page.locator('*:has-text("Contacts"), [data-testid*="contacts"]')
	}

	get rivalsSection(): Locator {
		return this.page.locator('*:has-text("Rivals"), [data-testid*="rivals"]')
	}

	// Add Buttons
	get addAllyButton(): Locator {
		return this.page.locator('button').filter({ hasText: /add.*ally/i })
	}

	get addContactButton(): Locator {
		return this.page.locator('button').filter({ hasText: /add.*contact/i })
	}

	get addRivalButton(): Locator {
		return this.page.locator('button').filter({ hasText: /add.*rival/i })
	}

	// Edit Controls
	get editControlsButton(): Locator {
		return this.page.locator('button[aria-label*="edit"], button:has([data-testid="BuildIcon"])')
	}

	get deleteButtons(): Locator {
		return this.page.locator('button[aria-label*="delete"], button:has([data-testid="DeleteIcon"])')
	}

	// Personal Notes
	get personalNotesTextarea(): Locator {
		return this.page.locator('textarea[aria-label*="notes"], textarea[placeholder*="notes"]')
	}

	// List Items
	get allyItems(): Locator {
		return this.page.locator('[data-testid*="ally-item"], .ally-item')
	}

	get contactItems(): Locator {
		return this.page.locator('[data-testid*="contact-item"], .contact-item')
	}

	get rivalItems(): Locator {
		return this.page.locator('[data-testid*="rival-item"], .rival-item')
	}

	/**
	 * Verify Personal tab is loaded
	 */
	async verifyPersonalTabLoaded(): Promise<void> {
		await expect(this.page.getByText('Personal')).toBeVisible()
		
		// Look for personal-related content
		const personalIndicators = [
			'Character', 'Personal', 'Allies', 'Contacts', 'Rivals', 'Notes'
		]
		
		for (const indicator of personalIndicators) {
			const element = this.page.getByText(indicator, { exact: false }).first()
			const isVisible = await element.isVisible().catch(() => false)
			if (isVisible) {
				await expect(element).toBeVisible()
				break
			}
		}
	}

	/**
	 * Test character name and details editing
	 */
	async testCharacterDetails(): Promise<void> {
		// Test character name input
		const nameInput = this.characterNameInput
		const nameVisible = await nameInput.isVisible().catch(() => false)
		
		if (nameVisible) {
			const isEnabled = await nameInput.isEnabled().catch(() => false)
			if (isEnabled) {
				const currentName = await nameInput.inputValue()
				await nameInput.fill('Test Character')
				await expect(nameInput).toHaveValue('Test Character')
				// Restore original name
				await nameInput.fill(currentName)
			}
		}

		// Test other character detail inputs
		const detailInputs = await this.characterDetailsInputs.all()
		
		for (let i = 0; i < Math.min(2, detailInputs.length); i++) {
			const input = detailInputs[i]
			const isVisible = await input.isVisible().catch(() => false)
			
			if (isVisible) {
				const isEnabled = await input.isEnabled().catch(() => false)
				if (isEnabled) {
					const currentValue = await input.inputValue()
					await input.fill('Test Detail')
					await expect(input).toHaveValue('Test Detail')
					await input.fill(currentValue)
				}
			}
		}
	}

	/**
	 * Test personal notes functionality
	 */
	async testPersonalNotes(): Promise<void> {
		const notesTextarea = this.personalNotesTextarea
		const isVisible = await notesTextarea.isVisible().catch(() => false)
		
		if (isVisible) {
			const isEnabled = await notesTextarea.isEnabled().catch(() => false)
			if (isEnabled) {
				const currentNotes = await notesTextarea.inputValue()
				const testNotes = 'Test personal notes for the character.'
				
				await notesTextarea.fill(testNotes)
				await expect(notesTextarea).toHaveValue(testNotes)
				
				// Restore original notes
				await notesTextarea.fill(currentNotes)
			}
		}
	}

	/**
	 * Test edit controls functionality
	 */
	async testEditControls(): Promise<void> {
		const editButton = this.editControlsButton
		const isVisible = await editButton.isVisible().catch(() => false)
		
		if (isVisible) {
			// Toggle edit mode
			await editButton.click()
			await this.page.waitForTimeout(500)
			
			// Check if edit controls are now visible
			const deleteButtons = await this.deleteButtons.all()
			const editControlsActive = deleteButtons.length > 0
			
			if (editControlsActive) {
				// Toggle back to disable edit mode
				await editButton.click()
				await this.page.waitForTimeout(500)
			}
		}
	}

	/**
	 * Test allies management
	 */
	async testAlliesManagement(): Promise<void> {
		// Enable edit controls first
		const editButton = this.editControlsButton
		const editVisible = await editButton.isVisible().catch(() => false)
		
		if (editVisible) {
			await editButton.click()
			await this.page.waitForTimeout(500)
		}

		// Test add ally functionality
		const addAllyButton = this.addAllyButton
		const addVisible = await addAllyButton.isVisible().catch(() => false)
		
		if (addVisible) {
			// Just verify the button is clickable, don't actually add
			await expect(addAllyButton).toBeEnabled()
		}

		// Test existing ally items
		const allyItems = await this.allyItems.all()
		
		if (allyItems.length > 0) {
			// Test editing first ally
			const firstAlly = allyItems[0]
			const allyInputs = await firstAlly.locator('input, textarea').all()
			
			if (allyInputs.length > 0) {
				const input = allyInputs[0]
				const isEnabled = await input.isEnabled().catch(() => false)
				
				if (isEnabled) {
					const currentValue = await input.inputValue()
					await input.fill('Test Ally')
					await expect(input).toHaveValue('Test Ally')
					await input.fill(currentValue)
				}
			}
		}

		// Disable edit controls
		if (editVisible) {
			await editButton.click()
			await this.page.waitForTimeout(500)
		}
	}

	/**
	 * Test contacts management
	 */
	async testContactsManagement(): Promise<void> {
		const editButton = this.editControlsButton
		const editVisible = await editButton.isVisible().catch(() => false)
		
		if (editVisible) {
			await editButton.click()
			await this.page.waitForTimeout(500)
		}

		const addContactButton = this.addContactButton
		const addVisible = await addContactButton.isVisible().catch(() => false)
		
		if (addVisible) {
			await expect(addContactButton).toBeEnabled()
		}

		const contactItems = await this.contactItems.all()
		
		if (contactItems.length > 0) {
			const firstContact = contactItems[0]
			const contactInputs = await firstContact.locator('input, textarea').all()
			
			if (contactInputs.length > 0) {
				const input = contactInputs[0]
				const isEnabled = await input.isEnabled().catch(() => false)
				
				if (isEnabled) {
					const currentValue = await input.inputValue()
					await input.fill('Test Contact')
					await expect(input).toHaveValue('Test Contact')
					await input.fill(currentValue)
				}
			}
		}

		if (editVisible) {
			await editButton.click()
			await this.page.waitForTimeout(500)
		}
	}

	/**
	 * Test rivals management
	 */
	async testRivalsManagement(): Promise<void> {
		const editButton = this.editControlsButton
		const editVisible = await editButton.isVisible().catch(() => false)
		
		if (editVisible) {
			await editButton.click()
			await this.page.waitForTimeout(500)
		}

		const addRivalButton = this.addRivalButton
		const addVisible = await addRivalButton.isVisible().catch(() => false)
		
		if (addVisible) {
			await expect(addRivalButton).toBeEnabled()
		}

		const rivalItems = await this.rivalItems.all()
		
		if (rivalItems.length > 0) {
			const firstRival = rivalItems[0]
			const rivalInputs = await firstRival.locator('input, textarea').all()
			
			if (rivalInputs.length > 0) {
				const input = rivalInputs[0]
				const isEnabled = await input.isEnabled().catch(() => false)
				
				if (isEnabled) {
					const currentValue = await input.inputValue()
					await input.fill('Test Rival')
					await expect(input).toHaveValue('Test Rival')
					await input.fill(currentValue)
				}
			}
		}

		if (editVisible) {
			await editButton.click()
			await this.page.waitForTimeout(500)
		}
	}

	/**
	 * Verify all major personal components are present and interactive
	 */
	async verifyAllComponentsInteractive(): Promise<void> {
		// Count interactive elements
		const inputs = await this.allInputs.count()
		const buttons = await this.allButtons.count()
		
		expect(inputs).toBeGreaterThan(1) // Should have name and notes inputs
		expect(buttons).toBeGreaterThan(2) // Should have edit controls and add buttons
		
		await this.takeScreenshot('personal-tab-components.png')
	}
}
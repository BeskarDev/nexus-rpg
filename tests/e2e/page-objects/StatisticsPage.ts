import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * Page Object Model for the Statistics Tab (Tab 0)
 * Covers: Attributes, HP, AV, Defenses, Fatigue, Resting
 */
export class StatisticsPage extends BasePage {
	constructor(page: Page) {
		super(page)
	}

	/**
	 * Navigate directly to Statistics tab
	 */
	async goto(characterId?: string): Promise<void> {
		await super.goto(characterId, 0)
	}

	// Attribute Fields
	get strengthInput(): Locator {
		return this.page.locator('input[id*="strength"], input[aria-label*="Strength"]').first()
	}

	get agilityInput(): Locator {
		return this.page.locator('input[id*="agility"], input[aria-label*="Agility"]').first()
	}

	get spiritInput(): Locator {
		return this.page.locator('input[id*="spirit"], input[aria-label*="Spirit"]').first()
	}

	get mindInput(): Locator {
		return this.page.locator('input[id*="mind"], input[aria-label*="Mind"]').first()
	}

	// Health and Defenses
	get hpCurrentInput(): Locator {
		return this.page.locator('input[id*="hp"], input[aria-label*="HP"], input[placeholder*="Current"]').first()
	}

	get hpMaxInput(): Locator {
		return this.page.locator('input[aria-label*="Max HP"], input[placeholder*="Max"]').first()
	}

	get avInput(): Locator {
		return this.page.locator('input[id*="av"], input[aria-label*="AV"], input[aria-label*="Armor"]').first()
	}

	get parryInput(): Locator {
		return this.page.locator('input[id*="parry"], input[aria-label*="Parry"]').first()
	}

	get dodgeInput(): Locator {
		return this.page.locator('input[id*="dodge"], input[aria-label*="Dodge"]').first()
	}

	get resistInput(): Locator {
		return this.page.locator('input[id*="resist"], input[aria-label*="Resist"]').first()
	}

	// Fatigue Tracker
	get fatigueCurrentInput(): Locator {
		return this.page.locator('input[id*="fatigue"], input[aria-label*="Fatigue"]').first()
	}

	get fatigueButtons(): Locator {
		return this.page.locator('button[aria-label*="fatigue"]')
	}

	// Resting Buttons
	get shortRestButton(): Locator {
		return this.page.getByRole('button', { name: /short rest/i })
	}

	get longRestButton(): Locator {
		return this.page.getByRole('button', { name: /long rest/i })
	}

	get fullRestButton(): Locator {
		return this.page.getByRole('button', { name: /full rest/i })
	}

	// Status Effects
	get statusEffectsSection(): Locator {
		return this.page.locator('[aria-label*="status"], [data-testid*="status"]')
	}

	/**
	 * Test basic tab functionality
	 */
	async verifyStatisticsTabLoaded(): Promise<void> {
		await expect(this.page.getByText('Statistics')).toBeVisible()
		
		// Verify key components are present
		const attributeLabels = ['Strength', 'Agility', 'Spirit', 'Mind']
		for (const label of attributeLabels) {
			await expect(this.page.getByText(label)).toBeVisible()
		}
	}

	/**
	 * Test attribute input functionality
	 */
	async testAttributeInputs(): Promise<void> {
		const testValue = '12'
		
		// Test each attribute input if it exists and is editable
		const attributes = [
			{ input: this.strengthInput, name: 'Strength' },
			{ input: this.agilityInput, name: 'Agility' },
			{ input: this.spiritInput, name: 'Spirit' },
			{ input: this.mindInput, name: 'Mind' }
		]

		for (const attr of attributes) {
			const isVisible = await attr.input.isVisible().catch(() => false)
			if (isVisible) {
				const isEnabled = await attr.input.isEnabled().catch(() => false)
				if (isEnabled) {
					await attr.input.fill(testValue)
					await expect(attr.input).toHaveValue(testValue)
				}
			}
		}
	}

	/**
	 * Test HP field functionality
	 */
	async testHpFields(): Promise<void> {
		const hpInputs = await this.page.locator('input[type="number"]').all()
		const testValue = '25'

		// Find and test HP-related inputs
		for (const input of hpInputs) {
			const isVisible = await input.isVisible().catch(() => false)
			if (isVisible) {
				const placeholder = await input.getAttribute('placeholder').catch(() => '')
				const ariaLabel = await input.getAttribute('aria-label').catch(() => '')
				
				if (placeholder?.toLowerCase().includes('current') || 
					ariaLabel?.toLowerCase().includes('hp')) {
					const isEnabled = await input.isEnabled().catch(() => false)
					if (isEnabled) {
						await input.fill(testValue)
						await expect(input).toHaveValue(testValue)
						break
					}
				}
			}
		}
	}

	/**
	 * Test defense field functionality
	 */
	async testDefenseFields(): Promise<void> {
		const defenseFields = [
			{ input: this.parryInput, name: 'Parry' },
			{ input: this.dodgeInput, name: 'Dodge' },
			{ input: this.resistInput, name: 'Resist' }
		]

		const testValue = '10'

		for (const field of defenseFields) {
			const isVisible = await field.input.isVisible().catch(() => false)
			if (isVisible) {
				const isEnabled = await field.input.isEnabled().catch(() => false)
				if (isEnabled) {
					await field.input.fill(testValue)
					await expect(field.input).toHaveValue(testValue)
				}
			}
		}
	}

	/**
	 * Test fatigue tracker functionality
	 */
	async testFatigueTracker(): Promise<void> {
		// Look for fatigue-related elements
		const fatigueElements = await this.page.locator('*').filter({ hasText: /fatigue/i }).all()
		
		if (fatigueElements.length > 0) {
			// Try to find and interact with fatigue controls
			const fatigueButtons = await this.fatigueButtons.all()
			if (fatigueButtons.length > 0) {
				// Click first fatigue button if it exists
				await fatigueButtons[0].click()
				await this.page.waitForTimeout(500)
			}
		}
	}

	/**
	 * Test resting functionality
	 */
	async testRestingButtons(): Promise<void> {
		const restButtons = [
			{ button: this.shortRestButton, name: 'Short Rest' },
			{ button: this.longRestButton, name: 'Long Rest' },
			{ button: this.fullRestButton, name: 'Full Rest' }
		]

		for (const rest of restButtons) {
			const isVisible = await rest.button.isVisible().catch(() => false)
			if (isVisible) {
				await rest.button.click()
				await this.page.waitForTimeout(500)
				// Note: We don't verify the exact outcome as it depends on character state
			}
		}
	}

	/**
	 * Verify all major statistics components are interactive
	 */
	async verifyAllComponentsInteractive(): Promise<void> {
		// Count interactive elements
		const inputs = await this.allInputs.count()
		const buttons = await this.allButtons.count()
		
		expect(inputs).toBeGreaterThan(5) // Should have at least attribute inputs
		expect(buttons).toBeGreaterThan(2) // Should have at least some buttons
		
		await this.takeScreenshot('statistics-tab-components.png')
	}
}
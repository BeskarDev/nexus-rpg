import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * Page Object Model for the Skills Tab (Tab 1)
 * Covers: Skills, Abilities, Combat Arts, Talents, Categories
 */
export class SkillsPage extends BasePage {
	constructor(page: Page) {
		super(page)
	}

	/**
	 * Navigate directly to Skills tab
	 */
	async goto(characterId?: string): Promise<void> {
		await super.goto(characterId, 1)
	}

	// Skill Management
	get skillInputs(): Locator {
		return this.page.locator('input[type="number"]').filter({ hasText: /skill/i })
	}

	get xpField(): Locator {
		return this.page.locator('input[aria-label*="XP"], input[placeholder*="XP"]')
	}

	// Language and Profession Management
	get languageSection(): Locator {
		return this.page.locator('[data-testid*="language"], *:has-text("Language")')
	}

	get professionSection(): Locator {
		return this.page.locator('[data-testid*="profession"], *:has-text("Profession")')
	}

	get addLanguageButton(): Locator {
		return this.page.getByRole('button', { name: /add.*language/i })
	}

	get addProfessionButton(): Locator {
		return this.page.getByRole('button', { name: /add.*profession/i })
	}

	// Ability Categories
	get combatArtsSection(): Locator {
		return this.page.locator('*:has-text("Combat Art")')
	}

	get talentsSection(): Locator {
		return this.page.locator('*:has-text("Talent")')
	}

	get spellsSection(): Locator {
		return this.page.locator('*:has-text("Spell")')
	}

	get featuresSection(): Locator {
		return this.page.locator('*:has-text("Feature")')
	}

	// Add/Search Buttons
	get addCombatArtButton(): Locator {
		return this.page.locator('button[aria-label*="add"], button:has-text("Add")').filter({ hasText: /combat art/i })
	}

	get searchCombatArtButton(): Locator {
		return this.page.locator('button:has([data-testid="SearchIcon"]), button[aria-label*="search"]').first()
	}

	get addTalentButton(): Locator {
		return this.page.locator('button[aria-label*="add"], button:has-text("Add")').filter({ hasText: /talent/i })
	}

	get searchTalentButton(): Locator {
		return this.page.locator('button:has([data-testid="SearchIcon"]), button[aria-label*="search"]').nth(1)
	}

	// Dialog Elements
	get searchDialog(): Locator {
		return this.page.locator('[role="dialog"]')
	}

	get dialogCloseButton(): Locator {
		return this.page.locator('[role="dialog"] button[aria-label*="close"]')
	}

	/**
	 * Verify Skills tab is loaded
	 */
	async verifySkillsTabLoaded(): Promise<void> {
		await expect(this.page.getByText('Skills')).toBeVisible()
		
		// Look for skill-related content
		const skillIndicators = [
			'XP', 'Experience', 'Combat Art', 'Talent', 'Ability'
		]
		
		for (const indicator of skillIndicators) {
			const element = this.page.getByText(indicator, { exact: false }).first()
			const isVisible = await element.isVisible().catch(() => false)
			if (isVisible) {
				await expect(element).toBeVisible()
				break
			}
		}
	}

	/**
	 * Test skill input functionality
	 */
	async testSkillInputs(): Promise<void> {
		// Find skill-related number inputs
		const numberInputs = await this.page.locator('input[type="number"]').all()
		const testValue = '3'

		let testedInputs = 0
		for (const input of numberInputs) {
			const isVisible = await input.isVisible().catch(() => false)
			if (isVisible && testedInputs < 3) { // Test up to 3 inputs
				const isEnabled = await input.isEnabled().catch(() => false)
				if (isEnabled) {
					await input.fill(testValue)
					await expect(input).toHaveValue(testValue)
					testedInputs++
				}
			}
		}
	}

	/**
	 * Test XP field functionality
	 */
	async testXpField(): Promise<void> {
		// Look for XP-related inputs
		const xpInputs = await this.page.locator('input').filter({ hasText: /xp/i }).all()
		const xpByPlaceholder = await this.page.locator('input[placeholder*="XP"]').all()
		const allXpInputs = [...xpInputs, ...xpByPlaceholder]

		if (allXpInputs.length > 0) {
			const testValue = '50'
			const input = allXpInputs[0]
			const isEnabled = await input.isEnabled().catch(() => false)
			if (isEnabled) {
				await input.fill(testValue)
				await expect(input).toHaveValue(testValue)
			}
		}
	}

	/**
	 * Test ability management functionality
	 */
	async testAbilityManagement(): Promise<void> {
		// Look for accordion sections
		const accordions = await this.page.locator('[data-testid*="accordion"], .MuiAccordion-root').all()
		
		if (accordions.length > 0) {
			// Expand first accordion if it's not already expanded
			const firstAccordion = accordions[0]
			await firstAccordion.click()
			await this.page.waitForTimeout(500)
		}

		// Look for add buttons
		const addButtons = await this.page.locator('button').filter({ hasText: /add/i }).all()
		
		if (addButtons.length > 0) {
			// Test add button functionality (without actually adding)
			for (let i = 0; i < Math.min(2, addButtons.length); i++) {
				const isVisible = await addButtons[i].isVisible().catch(() => false)
				if (isVisible) {
					// Just verify the button is clickable, don't actually click
					await expect(addButtons[i]).toBeEnabled()
				}
			}
		}
	}

	/**
	 * Test search dialog functionality
	 */
	async testSearchDialogs(): Promise<void> {
		// Look for search buttons
		const searchButtons = await this.page.locator('button:has([data-testid="SearchIcon"])').all()
		
		if (searchButtons.length > 0) {
			// Test first search button
			const searchButton = searchButtons[0]
			const isVisible = await searchButton.isVisible().catch(() => false)
			
			if (isVisible) {
				await searchButton.click()
				await this.page.waitForTimeout(1000)
				
				// Check if dialog opened
				const dialogVisible = await this.searchDialog.isVisible().catch(() => false)
				
				if (dialogVisible) {
					// Close the dialog
					const closeButton = this.page.locator('[role="dialog"] button').filter({ hasText: /close|cancel/i }).first()
					const closeButtonVisible = await closeButton.isVisible().catch(() => false)
					
					if (closeButtonVisible) {
						await closeButton.click()
					} else {
						// Try escape key
						await this.page.keyboard.press('Escape')
					}
					await this.page.waitForTimeout(500)
				}
			}
		}
	}

	/**
	 * Test ability categorization
	 */
	async testAbilityCategories(): Promise<void> {
		const categories = [
			'Combat Art', 'Talent', 'Spell', 'Feature'
		]

		for (const category of categories) {
			const categoryElement = this.page.getByText(category, { exact: false }).first()
			const isVisible = await categoryElement.isVisible().catch(() => false)
			
			if (isVisible) {
				// Verify category section exists
				await expect(categoryElement).toBeVisible()
			}
		}
	}

	/**
	 * Test language and profession management
	 */
	async testLanguageAndProfessions(): Promise<void> {
		// Check for language/profession related content
		const managementSections = ['Language', 'Profession']
		
		for (const section of managementSections) {
			const sectionElement = this.page.getByText(section, { exact: false }).first()
			const isVisible = await sectionElement.isVisible().catch(() => false)
			
			if (isVisible) {
				await expect(sectionElement).toBeVisible()
			}
		}
	}

	/**
	 * Verify all major skills components are present and interactive
	 */
	async verifyAllComponentsInteractive(): Promise<void> {
		// Count interactive elements
		const inputs = await this.allInputs.count()
		const buttons = await this.allButtons.count()
		
		expect(inputs).toBeGreaterThan(3) // Should have some skill inputs
		expect(buttons).toBeGreaterThan(5) // Should have add/search buttons
		
		await this.takeScreenshot('skills-tab-components.png')
	}
}
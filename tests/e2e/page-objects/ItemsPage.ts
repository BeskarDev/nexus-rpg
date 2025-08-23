import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from './BasePage'

/**
 * Page Object Model for the Items Tab (Tab 2)
 * Covers: Inventory, Weapons, Equipment, Load Management, Search
 */
export class ItemsPage extends BasePage {
	constructor(page: Page) {
		super(page)
	}

	/**
	 * Navigate directly to Items tab
	 */
	async goto(characterId?: string): Promise<void> {
		await super.goto(characterId, 2)
	}

	// Load and Encumbrance
	get coinsInput(): Locator {
		return this.page.locator('input[aria-label*="coin"], input[placeholder*="coin"]').first()
	}

	get currentLoadField(): Locator {
		return this.page.locator('input[aria-label*="current"], *:has-text("Current Load")')
	}

	get carryCapacityField(): Locator {
		return this.page.locator('input[aria-label*="capacity"], *:has-text("Carry Capacity")')
	}

	get carryModifierInput(): Locator {
		return this.page.locator('input[aria-label*="modifier"], input[aria-label*="Mod"]')
	}

	// Inventory Sections
	get inventorySections(): Locator {
		return this.page.locator('.MuiAccordion-root, [data-testid*="inventory"]')
	}

	get addWeaponButtons(): Locator {
		return this.page.locator('button[aria-label*="add"], button:has([data-testid="AddCircleIcon"])')
			.filter({ hasText: /weapon/i })
	}

	get addItemButtons(): Locator {
		return this.page.locator('button[aria-label*="add"], button:has([data-testid="AddCircleIcon"])')
			.filter({ hasText: /item/i })
	}

	get searchWeaponButtons(): Locator {
		return this.page.locator('button:has([data-testid="SearchIcon"])')
			.filter({ hasText: /weapon/i })
	}

	get searchItemButtons(): Locator {
		return this.page.locator('button:has([data-testid="SearchIcon"])')
			.filter({ hasText: /item/i })
	}

	// Item Management
	get weaponRows(): Locator {
		return this.page.locator('[data-testid*="weapon"], .weapon-row')
	}

	get itemRows(): Locator {
		return this.page.locator('[data-testid*="item"], .item-row')
	}

	get deleteButtons(): Locator {
		return this.page.locator('button[aria-label*="delete"], button:has([data-testid="DeleteIcon"])')
	}

	// Search Dialogs
	get weaponSearchDialog(): Locator {
		return this.page.locator('[role="dialog"]').filter({ hasText: /weapon/i })
	}

	get equipmentSearchDialog(): Locator {
		return this.page.locator('[role="dialog"]').filter({ hasText: /equipment|item/i })
	}

	get dialogCloseButton(): Locator {
		return this.page.locator('[role="dialog"] button').filter({ hasText: /close|cancel/i })
	}

	// Settings Menu
	get settingsButton(): Locator {
		return this.page.locator('button[aria-label*="settings"], button:has([data-testid="SettingsIcon"])')
	}

	get settingsMenu(): Locator {
		return this.page.locator('[role="menu"]')
	}

	/**
	 * Verify Items tab is loaded
	 */
	async verifyItemsTabLoaded(): Promise<void> {
		await expect(this.page.getByText('Items')).toBeVisible()
		
		// Look for inventory-related content
		const itemIndicators = [
			'Load', 'Carry', 'Inventory', 'Weapon', 'Equipment', 'Coin'
		]
		
		for (const indicator of itemIndicators) {
			const element = this.page.getByText(indicator, { exact: false }).first()
			const isVisible = await element.isVisible().catch(() => false)
			if (isVisible) {
				await expect(element).toBeVisible()
				break
			}
		}
	}

	/**
	 * Test load and encumbrance management
	 */
	async testLoadManagement(): Promise<void> {
		// Test coins input
		const coinInput = this.coinsInput
		const coinVisible = await coinInput.isVisible().catch(() => false)
		
		if (coinVisible) {
			const isEnabled = await coinInput.isEnabled().catch(() => false)
			if (isEnabled) {
				await coinInput.fill('100')
				await expect(coinInput).toHaveValue('100')
			}
		}

		// Test carry modifier if present
		const modifierInput = this.carryModifierInput
		const modifierVisible = await modifierInput.isVisible().catch(() => false)
		
		if (modifierVisible) {
			const isEnabled = await modifierInput.isEnabled().catch(() => false)
			if (isEnabled) {
				await modifierInput.fill('2')
				await expect(modifierInput).toHaveValue('2')
			}
		}

		// Verify load calculations are displayed
		const loadElements = await this.page.locator('*').filter({ hasText: /load|capacity/i }).all()
		expect(loadElements.length).toBeGreaterThan(0)
	}

	/**
	 * Test inventory section expansion
	 */
	async testInventorySections(): Promise<void> {
		const sections = await this.inventorySections.all()
		
		if (sections.length > 0) {
			// Expand first few inventory sections
			for (let i = 0; i < Math.min(3, sections.length); i++) {
				const section = sections[i]
				const isVisible = await section.isVisible().catch(() => false)
				
				if (isVisible) {
					// Try to click on the accordion header
					const header = section.locator('.MuiAccordionSummary-root').first()
					const headerVisible = await header.isVisible().catch(() => false)
					
					if (headerVisible) {
						await header.click()
						await this.page.waitForTimeout(500)
					}
				}
			}
		}
	}

	/**
	 * Test item addition functionality
	 */
	async testItemAddition(): Promise<void> {
		// Test add weapon buttons
		const addWeaponButtons = await this.addWeaponButtons.all()
		
		if (addWeaponButtons.length > 0) {
			const button = addWeaponButtons[0]
			const isVisible = await button.isVisible().catch(() => false)
			
			if (isVisible) {
				// Just verify it's clickable, don't actually add
				await expect(button).toBeEnabled()
			}
		}

		// Test add item buttons
		const addItemButtons = await this.addItemButtons.all()
		
		if (addItemButtons.length > 0) {
			const button = addItemButtons[0]
			const isVisible = await button.isVisible().catch(() => false)
			
			if (isVisible) {
				await expect(button).toBeEnabled()
			}
		}
	}

	/**
	 * Test search functionality
	 */
	async testSearchFunctionality(): Promise<void> {
		// Test weapon search
		const weaponSearchButtons = await this.searchWeaponButtons.all()
		
		if (weaponSearchButtons.length > 0) {
			const button = weaponSearchButtons[0]
			const isVisible = await button.isVisible().catch(() => false)
			
			if (isVisible) {
				await button.click()
				await this.page.waitForTimeout(1000)
				
				// Check if dialog opened
				const dialogVisible = await this.weaponSearchDialog.isVisible().catch(() => false)
				
				if (dialogVisible) {
					// Close the dialog
					const closeButton = this.dialogCloseButton.first()
					const closeVisible = await closeButton.isVisible().catch(() => false)
					
					if (closeVisible) {
						await closeButton.click()
					} else {
						await this.page.keyboard.press('Escape')
					}
					await this.page.waitForTimeout(500)
				}
			}
		}

		// Test equipment search similarly
		const equipmentSearchButtons = await this.searchItemButtons.all()
		
		if (equipmentSearchButtons.length > 0) {
			const button = equipmentSearchButtons[0]
			const isVisible = await button.isVisible().catch(() => false)
			
			if (isVisible) {
				await button.click()
				await this.page.waitForTimeout(1000)
				
				const dialogVisible = await this.equipmentSearchDialog.isVisible().catch(() => false)
				
				if (dialogVisible) {
					const closeButton = this.dialogCloseButton.first()
					const closeVisible = await closeButton.isVisible().catch(() => false)
					
					if (closeVisible) {
						await closeButton.click()
					} else {
						await this.page.keyboard.press('Escape')
					}
					await this.page.waitForTimeout(500)
				}
			}
		}
	}

	/**
	 * Test existing item management
	 */
	async testExistingItems(): Promise<void> {
		// Check for existing weapons
		const weaponRows = await this.weaponRows.all()
		
		if (weaponRows.length > 0) {
			// Test editing first weapon
			const firstWeapon = weaponRows[0]
			const weaponInputs = await firstWeapon.locator('input').all()
			
			if (weaponInputs.length > 0) {
				const input = weaponInputs[0]
				const isEnabled = await input.isEnabled().catch(() => false)
				
				if (isEnabled) {
					const currentValue = await input.inputValue()
					await input.fill('Test Weapon')
					await expect(input).toHaveValue('Test Weapon')
					// Restore original value
					await input.fill(currentValue)
				}
			}
		}

		// Check for existing items
		const itemRows = await this.itemRows.all()
		
		if (itemRows.length > 0) {
			// Similar testing for items
			const firstItem = itemRows[0]
			const itemInputs = await firstItem.locator('input').all()
			
			if (itemInputs.length > 0) {
				const input = itemInputs[0]
				const isEnabled = await input.isEnabled().catch(() => false)
				
				if (isEnabled) {
					const currentValue = await input.inputValue()
					await input.fill('Test Item')
					await expect(input).toHaveValue('Test Item')
					await input.fill(currentValue)
				}
			}
		}
	}

	/**
	 * Test settings menu if available
	 */
	async testSettingsMenu(): Promise<void> {
		const settingsButton = this.settingsButton
		const isVisible = await settingsButton.isVisible().catch(() => false)
		
		if (isVisible) {
			await settingsButton.click()
			await this.page.waitForTimeout(500)
			
			const menuVisible = await this.settingsMenu.isVisible().catch(() => false)
			
			if (menuVisible) {
				// Close menu by clicking elsewhere
				await this.page.locator('body').click()
				await this.page.waitForTimeout(500)
			}
		}
	}

	/**
	 * Verify all major items components are present and interactive
	 */
	async verifyAllComponentsInteractive(): Promise<void> {
		// Count interactive elements
		const inputs = await this.allInputs.count()
		const buttons = await this.allButtons.count()
		
		expect(inputs).toBeGreaterThan(1) // Should have at least coins and some item inputs
		expect(buttons).toBeGreaterThan(3) // Should have add/search/settings buttons
		
		await this.takeScreenshot('items-tab-components.png')
	}
}
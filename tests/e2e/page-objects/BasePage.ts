import { Page, Locator, expect } from '@playwright/test'
import { CHARACTER_SHEET_TABS } from '../fixtures/testData'

/**
 * Base Page Object Model providing common functionality for all character sheet pages
 */
export class BasePage {
	readonly page: Page

	constructor(page: Page) {
		this.page = page
	}

	/**
	 * Check if current viewport is mobile
	 */
	async isMobileViewport(): Promise<boolean> {
		const viewport = this.page.viewportSize()
		if (!viewport) return false
		return viewport.width <= 768 // Based on typical mobile breakpoint
	}

	/**
	 * Get tab index for given tab name, accounting for mobile vs desktop layout
	 */
	async getTabIndex(tabName: keyof typeof CHARACTER_SHEET_TABS): Promise<number> {
		const isMobile = await this.isMobileViewport()
		
		if (isMobile) {
			// In mobile view, all tabs including Statistics are clickable
			return CHARACTER_SHEET_TABS[tabName]
		} else {
			// In desktop view, Statistics tab doesn't exist as a clickable tab, so we need to adjust indices
			if (tabName === 'STATISTICS') {
				throw new Error('Statistics tab is not clickable in desktop view - it is always visible')
			}
			// Subtract 1 from the mobile index to get desktop index (since Statistics is removed)
			return CHARACTER_SHEET_TABS[tabName] - 1
		}
	}

	/**
	 * Navigate to character sheet with optional character ID and tab
	 */
	async goto(characterId?: string, tab?: number): Promise<void> {
		let url = '/docs/tools/character-sheet'
		const params = new URLSearchParams()
		
		if (characterId) {
			params.append('id', characterId)
		}
		if (tab !== undefined) {
			params.append('tab', tab.toString())
		}
		
		if (params.toString()) {
			url += '?' + params.toString()
		}
		
		await this.page.goto(url)
		await this.waitForPageLoad()
	}

	/**
	 * Wait for page to stabilize and content to load
	 */
	async waitForPageLoad(timeout: number = 5000): Promise<void> {
		await this.page.waitForLoadState('networkidle', { timeout })
		await this.page.waitForTimeout(1000) // Additional stabilization
	}

	/**
	 * Take a screenshot for debugging
	 */
	async takeScreenshot(filename: string): Promise<void> {
		await this.page.screenshot({ path: `test-results/${filename}` })
	}

	/**
	 * Get all tab buttons
	 */
	get tabButtons(): Locator {
		return this.page.locator('button[id^="tab-"]')
	}

	/**
	 * Get specific tab button by index
	 */
	getTabButton(index: number): Locator {
		return this.page.locator(`button[id="${index}"]`)
	}

	/**
	 * Click on a specific tab by name
	 */
	async clickTabByName(tabName: keyof typeof CHARACTER_SHEET_TABS): Promise<void> {
		const tabIndex = await this.getTabIndex(tabName)
		await this.clickTab(tabIndex)
	}

	/**
	 * Click on a specific tab by index
	 */
	async clickTab(index: number): Promise<void> {
		await this.getTabButton(index).click()
		await this.page.waitForTimeout(500) // Wait for tab content to load
	}

	/**
	 * Verify tab is active
	 */
	async verifyTabIsActive(index: number): Promise<void> {
		const tabButton = this.getTabButton(index)
		await expect(tabButton).toHaveAttribute('aria-selected', 'true')
	}

	/**
	 * Get all form inputs on the page
	 */
	get allInputs(): Locator {
		return this.page.locator('input, select, textarea')
	}

	/**
	 * Get all buttons on the page
	 */
	get allButtons(): Locator {
		return this.page.locator('button')
	}

	/**
	 * Wait for element to be visible
	 */
	async waitForElement(selector: string, timeout: number = 5000): Promise<Locator> {
		const element = this.page.locator(selector)
		await expect(element).toBeVisible({ timeout })
		return element
	}

	/**
	 * Fill input field and verify value
	 */
	async fillAndVerify(selector: string, value: string): Promise<void> {
		const input = this.page.locator(selector)
		await input.fill(value)
		await expect(input).toHaveValue(value)
	}

	/**
	 * Check if page has basic character sheet content
	 */
	async hasCharacterSheetContent(): Promise<boolean> {
		const pageContent = await this.page.textContent('body')
		return pageContent?.includes('Character') || 
			   pageContent?.includes('Statistics') || 
			   pageContent?.includes('Skills') ||
			   pageContent?.includes('Development Mode') ||
			   false
	}

	/**
	 * Verify page doesn't have console errors
	 */
	async verifyNoConsoleErrors(): Promise<void> {
		const errors: string[] = []
		
		this.page.on('console', (msg) => {
			if (msg.type() === 'error') {
				errors.push(msg.text())
			}
		})

		// Check for accumulated errors after a brief wait
		await this.page.waitForTimeout(1000)
		expect(errors).toHaveLength(0)
	}
}
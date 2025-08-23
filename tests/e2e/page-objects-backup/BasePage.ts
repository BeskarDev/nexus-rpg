import { Page } from '@playwright/test'

/**
 * Base Page Object Model for common functionality across all pages
 */
export class BasePage {
	constructor(public page: Page) {}

	/**
	 * Navigate to a specific URL
	 */
	async navigate(url: string) {
		await this.page.goto(url)
	}

	/**
	 * Wait for the page to load completely
	 */
	async waitForPageLoad() {
		await this.page.waitForLoadState('networkidle')
	}

	/**
	 * Take a screenshot for debugging
	 */
	async takeScreenshot(name: string) {
		await this.page.screenshot({ path: `test-results/${name}.png` })
	}

	/**
	 * Check if element is visible
	 */
	async isVisible(selector: string): Promise<boolean> {
		try {
			await this.page.locator(selector).waitFor({ state: 'visible', timeout: 5000 })
			return true
		} catch {
			return false
		}
	}

	/**
	 * Wait for and click element
	 */
	async clickElement(selector: string) {
		await this.page.locator(selector).click()
	}

	/**
	 * Fill input field
	 */
	async fillInput(selector: string, value: string) {
		await this.page.locator(selector).fill(value)
	}

	/**
	 * Get text content of element
	 */
	async getTextContent(selector: string): Promise<string> {
		return await this.page.locator(selector).textContent()
	}
}
import { BasePage } from './BasePage'

/**
 * Page Object Model for Character List functionality
 */
export class CharacterListPage extends BasePage {
	// Character List Elements
	readonly characterListSelector = '[data-testid="character-list"]'
	readonly characterCardSelector = '[data-testid="character-card"]'
	readonly newCharacterButton = 'button:has-text("new character")'
	readonly downloadAllButton = 'button[aria-label*="Download all"]'
	readonly developmentModeNotice = 'text=Development Mode:'

	// Mock Characters (for development)
	readonly mockCharacter1 = 'text=Kael Stormwind'
	readonly mockCharacter2 = 'text=Thara Ironforge'

	/**
	 * Navigate to character list
	 */
	async navigateToCharacterList() {
		await this.navigate('/docs/tools/character-sheet')
		await this.waitForPageLoad()
	}

	/**
	 * Check if we're in development mode
	 */
	async isDevelopmentMode(): Promise<boolean> {
		return await this.isVisible(this.developmentModeNotice)
	}

	/**
	 * Get list of character names
	 */
	async getCharacterNames(): Promise<string[]> {
		const characters = await this.page.locator('button:has-text("(") >> text=/^[^(]+/').allTextContents()
		return characters.map(name => name.trim())
	}

	/**
	 * Click on a character by name
	 */
	async selectCharacter(characterName: string) {
		await this.page.getByRole('link', { name: new RegExp(characterName, 'i') }).click()
		await this.waitForPageLoad()
	}

	/**
	 * Delete a character by name
	 */
	async deleteCharacter(characterName: string) {
		// Find the character card and click its delete button
		const characterCard = this.page.locator(`li:has(text="${characterName}")`)
		await characterCard.locator('button[aria-label="delete"]').click()
	}

	/**
	 * Create new character
	 */
	async createNewCharacter() {
		await this.clickElement(this.newCharacterButton)
	}

	/**
	 * Download all characters
	 */
	async downloadAllCharacters() {
		await this.clickElement(this.downloadAllButton)
	}

	/**
	 * Check if character list is loaded
	 */
	async isCharacterListLoaded(): Promise<boolean> {
		return await this.isVisible('h6:has-text("Your Characters")') || 
		       await this.isVisible('text=Please log in first')
	}

	/**
	 * Get number of characters in list
	 */
	async getCharacterCount(): Promise<number> {
		const characters = await this.page.locator('li:has(button:has-text("("))').count()
		return characters
	}

	/**
	 * Check if mock characters are available (development mode)
	 */
	async areMockCharactersAvailable(): Promise<boolean> {
		return await this.isVisible(this.mockCharacter1) && await this.isVisible(this.mockCharacter2)
	}
}
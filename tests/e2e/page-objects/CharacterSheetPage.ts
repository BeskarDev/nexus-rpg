import { BasePage } from './BasePage'

/**
 * Page Object Model for Character Sheet functionality
 */
export class CharacterSheetPage extends BasePage {
	// Character Sheet Navigation
	readonly characterListSelector = '[data-testid="character-list"]'
	readonly backToListButton = 'button[aria-label="back"]'
	readonly saveButton = 'button[aria-label="save character"]'
	readonly downloadButton = 'button[aria-label="download character"]'
	readonly newCharacterButton = 'button[aria-label="new character"]'
	readonly developmentModeNotice = 'text=Development Mode:'

	// Character Header
	readonly characterNameSelector = 'h6[data-testid="character-name"]'
	readonly characterLevelSelector = 'text=/Level \\d+/'

	// Tab Navigation
	readonly skillsTab = 'tab[name="Skills"]'
	readonly itemsTab = 'tab[name="Items"]'
	readonly spellsTab = 'tab[name="Spells"]'
	readonly personalTab = 'tab[name="Personal"]'
	readonly companionsTab = 'tab[name="Companions"]'
	readonly partyTab = 'tab[name="Party"]'

	// Statistics Section
	readonly resolveInput = 'input[aria-label="Resolve"]'
	readonly shortBreakButton = 'button:has-text("Short Break")'
	readonly nightsRestButton = 'button:has-text("Night\'s Rest")'
	readonly badNightButton = 'button:has-text("Bad Night")'

	// Attributes
	readonly strengthCombobox = 'combobox[aria-label*="Strength"]'
	readonly agilityCombobox = 'combobox[aria-label*="Agility"]'
	readonly spiritCombobox = 'combobox[aria-label*="Spirit"]'
	readonly mindCombobox = 'combobox[aria-label*="Mind"]'

	// Defenses
	readonly parryInput = 'input[aria-label="Parry"]'
	readonly dodgeInput = 'input[aria-label="Dodge"]'
	readonly resistInput = 'input[aria-label="Resist"]'

	// Health & Status
	readonly healthBar = '[data-testid="health-bar"]'
	readonly fatigueCheckboxes = '[data-testid="fatigue"] input[type="checkbox"]'
	readonly addStatusEffectButton = 'button:has-text("Add status effect")'

	/**
	 * Navigate to character sheet tool
	 */
	async navigateToCharacterSheet() {
		await this.navigate('/docs/tools/character-sheet')
		await this.waitForPageLoad()
	}

	/**
	 * Navigate to specific character by ID
	 */
	async navigateToCharacter(characterId: string) {
		await this.navigate(`/docs/tools/character-sheet?id=${characterId}`)
		await this.waitForPageLoad()
	}

	/**
	 * Check if we're in development mode
	 */
	async isDevelopmentMode(): Promise<boolean> {
		return await this.isVisible(this.developmentModeNotice)
	}

	/**
	 * Get character name from header
	 */
	async getCharacterName(): Promise<string> {
		const fullText = await this.getTextContent('h6')
		// Extract name from "Character Name (Level X)" format
		return fullText.replace(/\\s*\\(Level \\d+\\)/, '')
	}

	/**
	 * Get character level
	 */
	async getCharacterLevel(): Promise<number> {
		const fullText = await this.getTextContent('h6')
		const match = fullText.match(/Level (\\d+)/)
		return match ? parseInt(match[1]) : 0
	}

	/**
	 * Switch to a specific tab
	 */
	async switchToTab(tabName: 'Skills' | 'Items' | 'Spells' | 'Personal' | 'Companions' | 'Party') {
		await this.page.getByRole('tab', { name: tabName }).click()
		await this.waitForPageLoad()
	}

	/**
	 * Get current active tab
	 */
	async getActiveTab(): Promise<string> {
		const activeTab = await this.page.locator('tab[aria-selected="true"]').textContent()
		return activeTab || ''
	}

	/**
	 * Check if character sheet is loaded
	 */
	async isCharacterSheetLoaded(): Promise<boolean> {
		return await this.isVisible('h6') && await this.isVisible('[role="tablist"]')
	}

	/**
	 * Save character (click save button)
	 */
	async saveCharacter() {
		await this.clickElement(this.saveButton)
	}

	/**
	 * Download character
	 */
	async downloadCharacter() {
		await this.clickElement(this.downloadButton)
	}

	/**
	 * Go back to character list
	 */
	async goBackToList() {
		await this.clickElement(this.backToListButton)
		await this.waitForPageLoad()
	}

	/**
	 * Get current resolve value
	 */
	async getResolveValue(): Promise<number> {
		const value = await this.page.locator(this.resolveInput).inputValue()
		return parseInt(value) || 0
	}

	/**
	 * Set resolve value
	 */
	async setResolveValue(value: number) {
		await this.page.locator(this.resolveInput).fill(value.toString())
	}

	/**
	 * Get attribute value (d6, d8, d10, d12, etc.)
	 */
	async getAttributeValue(attribute: 'Strength' | 'Agility' | 'Spirit' | 'Mind'): Promise<string> {
		const selector = `combobox[aria-label*="${attribute}"]`
		return await this.page.locator(selector).inputValue()
	}

	/**
	 * Check if autosave is working (save button should be disabled after changes)
	 */
	async isAutosaveWorking(): Promise<boolean> {
		return await this.page.locator(this.saveButton).isDisabled()
	}

	/**
	 * Check fatigue level (count checked fatigue boxes)
	 */
	async getFatigueLevel(): Promise<number> {
		const checkedBoxes = await this.page.locator(this.fatigueCheckboxes + ':checked').count()
		return checkedBoxes
	}

	/**
	 * Set fatigue level by checking/unchecking boxes
	 */
	async setFatigueLevel(level: number) {
		const totalBoxes = await this.page.locator(this.fatigueCheckboxes).count()
		
		for (let i = 0; i < totalBoxes; i++) {
			const checkbox = this.page.locator(this.fatigueCheckboxes).nth(i)
			const shouldBeChecked = i < level
			const isChecked = await checkbox.isChecked()
			
			if (shouldBeChecked !== isChecked) {
				await checkbox.click()
			}
		}
	}
}
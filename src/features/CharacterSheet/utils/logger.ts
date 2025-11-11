/**
 * Simple logging utility for character sheet operations
 */
class Logger {
	private enabled = process.env.NODE_ENV === 'development'

	debug(message: string, data?: any) {
		if (this.enabled) {
			console.log(`[CharacterSheet] ${message}`, data || '')
		}
	}

	error(message: string, error?: any) {
		console.error(`[CharacterSheet] ${message}`, error || '')
	}

	warn(message: string, data?: any) {
		if (this.enabled) {
			console.warn(`[CharacterSheet] ${message}`, data || '')
		}
	}
}

export const logger = new Logger()

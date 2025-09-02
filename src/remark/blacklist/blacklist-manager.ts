/**
 * Blacklist entry interface for plugin configuration
 */
export interface BlacklistEntry {
	/** Relative path from project root */
	file: string
	/** Section heading within the file (optional) */
	section?: string
	/** Exact term to exclude from conversion */
	keyword: string
	/** Zero-based index of which match to exclude (optional, excludes all if not specified). Can be a number or array of numbers. */
	matchIndex?: number | number[]
	/** Which plugin(s) to apply blacklist to */
	plugin?: 'auto-keyword' | 'table-chips' | 'both'
	/** Optional comment for documentation */
	comment?: string
}

/**
 * Plugin type for blacklist checking
 */
export type PluginType = 'auto-keyword' | 'table-chips'

/**
 * Context information for blacklist checking
 */
export interface BlacklistContext {
	/** Current file path being processed */
	filePath: string
	/** Current section being processed (if any) */
	currentSection?: string
	/** Plugin type requesting the check */
	pluginType: PluginType
}

/**
 * Result of blacklist checking
 */
export interface BlacklistResult {
	/** Whether the match should be excluded */
	shouldExclude: boolean
	/** Number of matches processed so far for this keyword in this context */
	matchCount: number
}

/**
 * Loads and caches the blacklist configuration
 */
class BlacklistManager {
	private blacklist: BlacklistEntry[] | null = null
	private blacklistPath = require.resolve('./blacklist.json')

	/**
	 * Loads the blacklist from the JSON file
	 */
	private loadBlacklist(): BlacklistEntry[] {
		if (this.blacklist === null) {
			try {
				delete require.cache[this.blacklistPath]
				this.blacklist = require('./blacklist.json')
			} catch (error) {
				console.warn('Failed to load blacklist.json, using empty blacklist:', error)
				this.blacklist = []
			}
		}
		return this.blacklist
	}

	/**
	 * Reloads the blacklist from disk (useful for development)
	 */
	reloadBlacklist(): void {
		this.blacklist = null
	}

	/**
	 * Normalizes file path for comparison
	 */
	private normalizePath(path: string): string {
		return path.replace(/\\/g, '/').replace(/^\/+/, '')
	}

	/**
	 * Checks if a keyword match should be excluded based on blacklist
	 */
	checkBlacklist(
		keyword: string,
		context: BlacklistContext,
		matchIndex: number,
	): boolean {
		const blacklist = this.loadBlacklist()
		const normalizedFilePath = this.normalizePath(context.filePath)

		// Find relevant blacklist entries
		const relevantEntries = blacklist.filter((entry) => {
			// Check if file matches (support both exact match and contains)
			const entryFile = this.normalizePath(entry.file)
			const fileMatches =
				normalizedFilePath && entryFile && (
					normalizedFilePath.includes(entryFile) ||
					entryFile.includes(normalizedFilePath) ||
					normalizedFilePath.endsWith(entryFile)
				)

			// Check if plugin matches
			const pluginMatches =
				!entry.plugin ||
				entry.plugin === 'both' ||
				entry.plugin === context.pluginType

			// Check if keyword matches (case-insensitive)
			const keywordMatches =
				entry.keyword.toLowerCase() === keyword.toLowerCase()

			// Check if section matches (if specified)
			const sectionMatches =
				!entry.section ||
				!context.currentSection ||
				entry.section === context.currentSection

			return fileMatches && pluginMatches && keywordMatches && sectionMatches
		})

		// Check if any relevant entry should exclude this match
		return relevantEntries.some((entry) => {
			// If no matchIndex specified in blacklist, exclude all matches
			if (entry.matchIndex === undefined) {
				return true
			}
			// Support arrays of match indices
			if (Array.isArray(entry.matchIndex)) {
				return entry.matchIndex.includes(matchIndex)
			}
			// Otherwise, only exclude the specific match index
			return entry.matchIndex === matchIndex
		})
	}

	/**
	 * Gets all blacklist entries for debugging
	 */
	getBlacklist(): BlacklistEntry[] {
		return this.loadBlacklist()
	}
}

// Export singleton instance
export const blacklistManager = new BlacklistManager()

/**
 * Convenience function for checking blacklist
 */
export function isBlacklisted(
	keyword: string,
	context: BlacklistContext,
	matchIndex: number,
): boolean {
	return blacklistManager.checkBlacklist(keyword, context, matchIndex)
}

/**
 * Helper function to extract current section from parent nodes
 * This walks up the AST to find the nearest heading
 */
export function getCurrentSection(node: any, parent: any): string | undefined {
	// This is a simplified implementation - in practice, we might need
	// to walk up the AST tree to find the current section
	// For now, we'll return undefined and rely on plugins to track sections
	return undefined
}
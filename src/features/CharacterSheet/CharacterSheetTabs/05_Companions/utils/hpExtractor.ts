/**
 * Utility function to extract HP values from companion markdown content
 */
export const extractHPFromMarkdown = (markdown: string): number | null => {
	// Look for HP patterns in table format only
	const patterns = [
		// Table format: | 20 | 3 (natural light) | d6 | ...
		/\|\s*(\d+)\s*\|\s*\d+.*?\|\s*d\d+/i,
		// Table format with HP header: | HP | AV | ... followed by | 20 | 3 | ...
		/\|\s*HP\s*\|.*?\n.*?\|\s*(\d+)\s*\|/i,
	]

	for (const pattern of patterns) {
		const match = markdown.match(pattern)
		if (match && match[1]) {
			const hp = parseInt(match[1])
			if (!isNaN(hp) && hp > 0) {
				return hp
			}
		}
	}
	return null
}

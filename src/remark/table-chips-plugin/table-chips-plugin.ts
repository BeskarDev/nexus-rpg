import { Node, Parent } from 'unist'
import { visit } from 'unist-util-visit'
import { chipMappings } from './chip-mappings'
import { isBlacklisted, BlacklistContext } from '../blacklist'

/**
 * A remark plugin to automatically convert specific keywords in all text to colored chips.
 * Transforms damage types, skills, weapon categories, and attributes as specified.
 * Also respects the blacklist configuration to prevent unwanted conversions.
 */
const tableChipsPlugin = (options = {}) => {
	return (tree, file) => {
		// Track keyword match counts for blacklist checking
		const keywordMatchCounts = new Map<string, number>()
		
		// Extract file path for blacklist context
		const filePath = file?.path || file?.history?.[0] || ''
		
		visit(
			tree,
			'text',
			(
				node: Node & { value: string; processed?: boolean },
				index: number,
				parent: Parent & { type: string; children: any[] },
			) => {
				// Skip nodes that are already processed
				if (node.processed) {
					return
				}

				// Skip if this text node is within a heading
				if (parent && parent.type === 'heading') {
					return // Skip transformation in headings
				}

				// Skip table headers (single words in table cells)
				if (parent && parent.type === 'tableCell' &&
					parent.children.length <= 1 &&
					node.value.split(' ').length <= 1) {
					return // Skip transformation in table headers
				}

				// Check if this is the Combat Arts file for weapon chips
				const isCombatArtsFile =
					file?.path?.includes('05-combat-arts.md') ||
					file?.history?.[0]?.includes('05-combat-arts.md')

				// Check if this is an attribute explanation section where we should NOT transform to shorthand
				const isAttributeExplanationFile =
					file?.path?.includes('01-basic-rules/01-how-to-roll.md') ||
					file?.history?.[0]?.includes('01-basic-rules/01-how-to-roll.md') ||
					file?.path?.includes('03-statistics/01-attributes.md') ||
					file?.history?.[0]?.includes('03-statistics/01-attributes.md')

				// Create a Map from the chip mappings object, filtering weapon types based on file
				const chipMap = new Map()
				for (const [key, value] of Object.entries(chipMappings)) {
					// Only include weapon chips in Combat Arts file
					if (value.type === 'weapon' && !isCombatArtsFile) {
						continue
					}

					// Handle attribute shorthand transformation
					if (value.type === 'attribute' && !isAttributeExplanationFile) {
						// Transform full attribute names to shorthand in chip display
						if (key === 'Strength') {
							chipMap.set(key, { ...value, displayText: 'STR' })
						} else if (key === 'Agility') {
							chipMap.set(key, { ...value, displayText: 'AGI' })
						} else if (key === 'Spirit') {
							chipMap.set(key, { ...value, displayText: 'SPI' })
						} else if (key === 'Mind') {
							chipMap.set(key, { ...value, displayText: 'MND' })
						} else {
							chipMap.set(key, value)
						}
					} else {
						chipMap.set(key, value)
					}
				}

				// Split text into words and punctuation while preserving spaces and special characters
				const wordsWithSpaces = node.value.split(
					/(\s+|[.,!?;:"'(){}\[\]/\\+*])/,
				)
				let hasChip = false
				const processedWords: any[] = []
				let i = 0

				while (i < wordsWithSpaces.length) {
					const current = wordsWithSpaces[i]

					if (i % 2 === 1 || /^[.,!?;:"'(){}\[\]/\\+*-]$/.test(current)) {
						// If it's a space or punctuation, add it directly
						processedWords.push({
							type: 'text',
							value: current,
							processed: true,
						})
						i++
						continue
					}

					let match = null
					let matchLength = 0

					// Check for multi-word keywords starting from the current word
					for (let j = i; j < wordsWithSpaces.length; j += 2) {
						const phrase = wordsWithSpaces
							.slice(i, j + 1)
							.filter(
								(_, idx) =>
									idx % 2 === 0 ||
									/^[.,!?;:"'(){}\[\]/\\+*]$/.test(wordsWithSpaces[idx]),
							)
							.join(' ')

						if (chipMap.has(phrase)) {
							// Always prioritize the longest match
							match = phrase
							matchLength = j - i + 1
						}
					}

					if (match) {
						// Get current match count for this keyword
						const currentCount = keywordMatchCounts.get(match) || 0
						
						// Create blacklist context
						const blacklistContext: BlacklistContext = {
							filePath,
							pluginType: 'table-chips'
						}
						
						// Check if this match should be blacklisted
						const shouldExclude = isBlacklisted(match, blacklistContext, currentCount)
						
						// Increment match count
						keywordMatchCounts.set(match, currentCount + 1)
						
						if (!shouldExclude) {
							hasChip = true
							const chipInfo = chipMap.get(match)
							const displayText = chipInfo.displayText || match
							processedWords.push({
								type: 'link',
								url: '#', // Dummy URL since we just want a styled span
								children: [{ type: 'text', value: displayText, processed: true }],
								data: {
									hProperties: {
										className: [
											`chip`,
											`chip--${chipInfo.color}`,
											`chip--${chipInfo.type}`,
										],
										'data-chip-type': chipInfo.type,
										'aria-label': `${chipInfo.type}: ${match}`,
										role: 'button',
									},
								},
								processed: true,
							})
							i += matchLength // Skip the matched words and spaces
						} else {
							// Treat as regular text since it's blacklisted
							const word = current
							processedWords.push({ type: 'text', value: word, processed: true })
							i++
						}
					} else {
						const word = current
						processedWords.push({ type: 'text', value: word, processed: true })
						i++
					}
				}

				if (hasChip) {
					// Replace the current node with the processed nodes
					parent.children.splice(index, 1, ...processedWords)
				}
			},
		)
	}
}

export default tableChipsPlugin

import { Node, Parent } from 'unist'
import { visitParents } from 'unist-util-visit-parents'
import { chipMappings } from './chip-mappings'
import { processText, InlineNode } from '../shared/tokenize'
import { getTableCellContext } from '../shared/table-context'
import { hasDamageContext } from '../shared/context'

/**
 * A remark plugin to automatically convert specific keywords in all text to colored chips.
 * Transforms damage types, skills, weapon categories, and attributes as specified.
 * Context heuristics (headings/bold/table-header suppression, damage-number
 * gating) keep flavor uses of these words from being chipped.
 */
const tableChipsPlugin = (options = {}) => {
	return (tree, file) => {

		visitParents(
			tree,
			'text',
			(
				node: Node & { value: string; processed?: boolean },
				ancestors: (Parent & { type: string; children: any[] })[],
			) => {
				const parent = ancestors[ancestors.length - 1]
				const index = parent ? parent.children.indexOf(node as any) : -1

				// Skip nodes that are already processed or detached
				if (node.processed || !parent || index === -1) {
					return
				}

				// Never chip text inside a heading, link, or bold span, checked
				// across the full ancestor chain. Bold is skipped so that bolded
				// ability/attack names in stat blocks (e.g. **Poison Bite**,
				// **Undead Nature**) stay plain instead of chipping a word of the
				// name. Links are skipped because chips render as anchors and a
				// nested anchor would be invalid. The effect text after a bold
				// name is not bold, so it still chips normally.
				if (
					ancestors.some(
						(ancestor) =>
							ancestor.type === 'heading' ||
							ancestor.type === 'link' ||
							ancestor.type === 'strong',
					)
				) {
					return
				}

				// Skip table header cells. Real structure lookup (first table row)
				// replaces the old single-word-cell proxy: it catches multi-word
				// headers ("AV (light / heavy)") and no longer skips legitimate
				// single-word body cells.
				if (getTableCellContext(ancestors).isHeaderRow) {
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

				const { nodes: processedWords, changed: hasChip } = processText(
					node.value,
					chipMap,
					{
						onKeyword: (match, context) => {
							const chipInfo = chipMap.get(match)

							// Damage-type words are common in prose ("shimmer of fire").
							// Only chip them when a damage number / dice / damage word
							// sits nearby, so flavor mentions stay plain.
							if (
								chipInfo.type === 'damage' &&
								!hasDamageContext(
									context.precedingText,
									context.followingText,
								)
							) {
								return null
							}

							const displayText = chipInfo.displayText || match
							return [
								{
									type: 'link',
									url: '#', // Dummy URL since we just want a styled span
									children: [
										{ type: 'text', value: displayText, processed: true },
									],
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
								},
							]
						},
						onText: (word): InlineNode[] => [
							{ type: 'text', value: word, processed: true },
						],
					},
				)

				if (hasChip) {
					// Replace the current node with the processed nodes
					parent.children.splice(index, 1, ...processedWords)
				}
			},
		)
	}
}

export default tableChipsPlugin

import { Node, Parent } from 'unist'
import { visitParents } from 'unist-util-visit-parents'
import { chipMappings } from './chip-mappings'
import { processText, InlineNode } from '../shared/tokenize'
import { getTableCellContext } from '../shared/table-context'
import { hasDamageContext } from '../shared/context'
import { inNameElement } from '../shared/zones'

/**
 * A remark plugin to automatically convert specific keywords in all text to colored chips.
 * Transforms damage types, skills, weapon categories, and attributes as specified.
 * Context heuristics (headings/bold/table-header suppression, damage-number
 * gating) keep flavor uses of these words from being chipped.
 */
/**
 * A skill rank written immediately after a skill name: `Athletics (3)`.
 * Anchored, so only a rank directly following the chip is absorbed.
 */
const SKILL_RANK = /^\s*\((\d+)\)/

/**
 * JSX containers whose contents are damage context BY CONSTRUCTION.
 *
 * The damage-context heuristic looks for a number or the word "damage" within a
 * few characters of the match, inside the same text node. That works in prose,
 * but the creature card deliberately strips the redundant word: a damage ladder
 * renders `10/16/22` and then its type, and an Immunities / Resistances /
 * Weaknesses row is already labelled. In both the type arrives as the ONLY text
 * in its node, so the heuristic saw no signal and left `necrotic` and `fire`
 * unchipped. The surrounding component is a stronger signal than any window of
 * characters, so being inside one of these satisfies the gate outright.
 */
const DAMAGE_ZONE_ELEMENTS = new Set(['DamageLadder', 'TraitItem'])

const inDamageZone = (ancestors: { type: string; name?: string }[]): boolean =>
	ancestors.some(
		(ancestor) =>
			ancestor.type?.startsWith('mdxJsx') &&
			typeof ancestor.name === 'string' &&
			DAMAGE_ZONE_ELEMENTS.has(ancestor.name),
	)

const isSkillChip = (node: InlineNode): boolean =>
	node.type === 'link' && node.data?.hProperties?.['data-chip-type'] === 'skill'

/**
 * Pull a trailing `(N)` rank inside its skill chip.
 *
 * Creature and companion stat blocks write skills as `Fighting (2), Perception
 * (1)`, and chipping only the name left the rank stranded outside the pill — the
 * one number that matters was the one part not in the chip, and a row of them
 * read as chips interleaved with loose punctuation.
 *
 * Done as a post-pass over the rebuilt node list rather than inside
 * {@link processText}: the shared tokenizer matches a phrase and hands back
 * exactly that phrase, with no way for a handler to consume the tokens after it.
 * Widening that contract would affect the auto-keyword plugin too, for a rule
 * that only skills need.
 */
function absorbSkillRanks(nodes: InlineNode[]): InlineNode[] {
	const out: InlineNode[] = []
	let i = 0
	while (i < nodes.length) {
		const node = nodes[i]
		if (isSkillChip(node)) {
			// The rank arrives as several tokens ("(", "3", ")"), so join the whole
			// following text run and match against that rather than a single node.
			let end = i + 1
			let run = ''
			while (end < nodes.length && nodes[end].type === 'text') {
				run += nodes[end].value ?? ''
				end++
			}
			const match = SKILL_RANK.exec(run)
			if (match) {
				node.children.push({
					type: 'emphasis',
					children: [{ type: 'text', value: match[1], processed: true }],
					// `hName` retags the emphasis as a plain span, so the rank can be
					// styled inside the chip without emitting an <em>.
					data: { hName: 'span', hProperties: { className: ['chip__rank'] } },
					processed: true,
				})
				const label = node.data.hProperties['aria-label']
				if (typeof label === 'string')
					node.data.hProperties['aria-label'] = `${label} rank ${match[1]}`
				out.push(node)
				const rest = run.slice(match[0].length)
				if (rest) out.push({ type: 'text', value: rest, processed: true })
				i = end
				continue
			}
		}
		out.push(node)
		i++
	}
	return out
}

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
					) ||
					// Entry names moved from `**bold**` into their own JSX element, which
					// took them out of the `strong` guard above — "Undead Nature" began
					// chipping "Nature" as a skill.
					inNameElement(ancestors as any)
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

				const damageZone = inDamageZone(ancestors as any)

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
								!damageZone &&
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
					parent.children.splice(index, 1, ...absorbSkillRanks(processedWords))
				}
			},
		)
	}
}

export default tableChipsPlugin

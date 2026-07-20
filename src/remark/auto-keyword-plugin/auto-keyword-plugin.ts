import { Node, Parent } from 'unist'
import { visitParents } from 'unist-util-visit-parents'
import { keywords } from './keywords'
import { processText, InlineNode } from '../shared/tokenize'
import { getTableCellContext } from '../shared/table-context'
import { ZONE_GATED_TERMS, isMechanicalZone } from '../shared/zones'

const EXCLUSION_PREFIX = '_'

/**
 * A remark plugin to automatically convert keywords in text nodes to links.
 * If you want to exclude a keyword from being a link, prefix it with an
 * underscore (_). Context heuristics (headings/bold/table-header suppression,
 * zone gating, first-occurrence-per-page) keep flavor uses from linking.
 */
const autoKeywordPlugin = (options) => {
	return (tree) => {
		// Track which keyword terms have already been linked on this page, so a
		// term links only on its FIRST occurrence. Common words used as keywords
		// (e.g. "light", "close", "reach") otherwise link dozens of times on a
		// single page, which is pure noise. Chips are deliberately not first-only
		// (a spell wants every damage word colored); this applies to links alone.
		const linkedTerms = new Set<string>()

		visitParents(
			tree,
			'text',
			(
				node: Node & { value: string; processed: boolean },
				ancestors: (Parent & { name?: string })[],
			) => {
				const parent = ancestors[ancestors.length - 1] as Parent & {
					name: string
				}
				const index = parent ? parent.children.indexOf(node as any) : -1

				// Never transform text inside a heading, link, or bold span.
				// Checked across the FULL ancestor chain (not just the immediate
				// parent) so a keyword nested in emphasis inside bold — e.g.
				// **_word_** — is still skipped, and so that bolded ability/attack
				// names in stat blocks stay plain. Links are excluded because a
				// nested anchor would be invalid.
				if (
					!parent ||
					index === -1 ||
					ancestors.some(
						(ancestor) =>
							ancestor.type === 'heading' ||
							ancestor.type === 'link' ||
							ancestor.type === 'strong',
					) ||
					parent.name === 'strong' ||
					node.type !== 'text' ||
					node.processed // Skip nodes that are already processed
				) {
					return
				}

				// Skip table header cells. Real structure lookup (first table row)
				// replaces the old single-word-cell proxy: it catches multi-word
				// headers ("AV (light / heavy)") and no longer skips legitimate
				// single-word body cells.
				if (getTableCellContext(ancestors).isHeaderRow) {
					return
				}

				// Create a Map from the keywords object
				const keywordMap = new Map(Object.entries(keywords))

				// Emits a text node, stripping the opt-out prefix ('_') if present.
				const toText = (word: string): InlineNode[] => {
					const value = word.startsWith(EXCLUSION_PREFIX)
						? word.slice(1)
						: word
					return [{ type: 'text', value, processed: true }]
				}

				const { nodes: processedWords, changed: hasKeyword } = processText(
					node.value,
					keywordMap,
					{
						onKeyword: (match) => {
							// Zone gate: ambiguous common words (light, heavy, close,
							// huge, ...) link only in a table body cell. In narrative
							// prose they are flavor, not terms.
							if (
								ZONE_GATED_TERMS.has(match) &&
								!isMechanicalZone(ancestors)
							) {
								return null
							}

							// First-occurrence-per-page: if this term already linked
							// on this page, leave later occurrences as plain text.
							if (linkedTerms.has(match)) {
								return null
							}

							// Record the first (and only) link for this term on the page.
							linkedTerms.add(match)

							return [
								{
									type: 'link',
									url: keywordMap.get(match),
									children: [
										{ type: 'text', value: match, processed: true },
									],
									data: {
										hProperties: {
											style:
												'font-variant: small-caps; text-transform: lowercase; font-size: large;',
										},
									},
									processed: true,
								},
							]
						},
						onText: toText,
					},
				)

				if (hasKeyword) {
					// Replace the current node with the processed nodes
					parent.children.splice(index, 1, ...processedWords)
				}
			},
		)
	}
}

export default autoKeywordPlugin

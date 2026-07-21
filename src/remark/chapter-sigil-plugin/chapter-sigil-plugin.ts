import { Node } from 'unist'
import { visitParents } from 'unist-util-visit-parents'
import { LEADING_EMOJI } from '../shared/strip-leading-emoji'
import {
	pageSigilForSourcePath,
	chapterSigilForSourcePath,
} from '../../components/codex/page-sigils'

/**
 * Remark plugin that migrates the old emoji chapter/section markers into the
 * codex sigil system:
 *   - strips any leading emoji from every heading, and
 *   - prepends a sigil to each page's top-level `# h1` title.
 *
 * The h1 sigil is the page's BESPOKE mark (one per page that used to carry an
 * emoji — see page-sigils.ts), falling back to the chapter sigil for pages with
 * no bespoke mark. The same page sigil is shown on the doc's side-nav entry by
 * the DocSidebarItems swizzle, so heading and sidebar always match.
 *
 * Internal design docs under `docs/analysis/` are skipped: their ✅/❌ header
 * markers are meaningful status shorthand, not decorative chat-UI emoji.
 */
const chapterSigilPlugin = () => {
	return (tree: Node, file: { path?: string }) => {
		if (
			file?.path?.includes('/analysis/') ||
			file?.path?.includes('\\analysis\\')
		) {
			return
		}

		const path = file?.path
		const sigil = path
			? pageSigilForSourcePath(path) ?? chapterSigilForSourcePath(path)
			: undefined

		visitParents(tree, 'heading', (node: any) => {
			const children: any[] = node.children ?? []

			// Strip a leading emoji run from the first text node of the heading.
			const first = children[0]
			if (first && first.type === 'text' && typeof first.value === 'string') {
				const stripped = first.value.replace(LEADING_EMOJI, '')
				if (stripped !== first.value) {
					first.value = stripped
					// Drop a now-empty leading text node so the sigil (or the next
					// inline) sits flush.
					if (first.value === '' && children.length > 1) {
						children.shift()
					}
				}
			}

			// Give each page's h1 its sigil. Injected as an MDX JSX node
			// referencing the globally-registered <ChapterSigil> (see
			// src/theme/MDXComponents) — a raw HTML node is rejected by the MDX
			// compiler ("Cannot handle unknown node `raw`"). Only h1 gets a mark:
			// sub-headings just lose their emoji.
			if (node.depth === 1 && sigil && !node.__sigilInjected) {
				node.__sigilInjected = true
				children.unshift({
					type: 'mdxJsxTextElement',
					name: 'ChapterSigil',
					attributes: [
						{ type: 'mdxJsxAttribute', name: 'name', value: sigil },
					],
					children: [],
				})
			}

			node.children = children
		})
	}
}

export default chapterSigilPlugin

import React from 'react'
import OriginalDocSidebarItems from '@theme-original/DocSidebarItems'
import { stripLeadingEmoji } from '@site/src/remark/shared/strip-leading-emoji'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import {
	pageSigilForDocId,
	pageSigilForHref,
} from '@site/src/components/codex/page-sigils'
import type { SigilName } from '@site/src/components/codex/sigil-paths'

/**
 * Two jobs for the side nav:
 *   1. Strip the legacy emoji markers from labels. Docusaurus derives a doc's
 *      sidebar label from its title/first-heading on the RAW source (before the
 *      remark pipeline), so the chapter-sigil plugin never reaches these labels.
 *   2. Prepend each item's bespoke sigil (the same mark on its page heading),
 *      replacing the emoji it used to carry. Items with no mapped sigil (leaf
 *      list pages that never had an emoji) render label-only.
 *
 * Source docs — and the Notion co-source — stay untouched. The sigil is
 * resolved from the doc id (doc entries) or the category's href (category
 * entries, which points at the overview/index doc), matching page-sigils.ts.
 */
function sigilForItem(item: any): SigilName | undefined {
	if (typeof item.docId === 'string') {
		const s = pageSigilForDocId(item.docId)
		if (s) return s
	}
	if (typeof item.href === 'string') {
		return pageSigilForHref(item.href)
	}
	return undefined
}

function decorate(items: any[]): any[] {
	return items.map((item) => {
		const next = { ...item }
		const sigil = sigilForItem(next)

		if (typeof next.label === 'string') {
			const clean = stripLeadingEmoji(next.label)
			next.label = sigil ? (
				<>
					<SigilIcon
						name={sigil}
						size={16}
						className="sidebar-sigil"
					/>
					{clean}
				</>
			) : (
				clean
			)
		}

		if (Array.isArray(next.items)) {
			next.items = decorate(next.items)
		}
		return next
	})
}

export default function DocSidebarItems(props: any) {
	return (
		<OriginalDocSidebarItems
			{...props}
			items={Array.isArray(props.items) ? decorate(props.items) : props.items}
		/>
	)
}

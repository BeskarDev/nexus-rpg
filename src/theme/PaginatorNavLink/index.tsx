import React from 'react'
import Link from '@docusaurus/Link'
import clsx from 'clsx'
import type { Props } from '@theme/PaginatorNavLink'
import { stripLeadingEmoji } from '@site/src/remark/shared/strip-leading-emoji'
import SigilIcon, {
	SIGIL_SIZE,
} from '@site/src/components/codex/SigilIcon'
import { pageSigilForHref } from '@site/src/components/codex/page-sigils'

/**
 * Prev/next paginator link, carrying the same identity as the side nav and the
 * breadcrumb trail: the doc title's legacy leading emoji stripped, and the
 * page's bespoke sigil in its place.
 *
 * Docusaurus builds this label from the raw doc title, so — exactly like
 * `DocSidebarItems` and `DocBreadcrumbs` — it can only be cleaned at render.
 * Source docs and the Notion co-source stay untouched.
 *
 * Reimplemented rather than wrapped: the original renders `title` directly into
 * a div, so there is no seam a wrapper could reach to strip the emoji and insert
 * a glyph beside the text. The markup below is a faithful copy of the theme's
 * (same classes, same structure) plus the sigil span.
 */
export default function PaginatorNavLink(props: Props): React.ReactNode {
	const { permalink, title, subLabel, isNext } = props
	const sigil =
		typeof permalink === 'string' ? pageSigilForHref(permalink) : undefined
	const label = typeof title === 'string' ? stripLeadingEmoji(title) : title

	return (
		<Link
			className={clsx(
				'pagination-nav__link',
				isNext ? 'pagination-nav__link--next' : 'pagination-nav__link--prev',
			)}
			to={permalink}
		>
			{subLabel && <div className="pagination-nav__sublabel">{subLabel}</div>}
			<div className="pagination-nav__label">
				{sigil && (
					<SigilIcon name={sigil} size={SIGIL_SIZE.paginator} className="pagination-sigil" />
				)}
				{label}
			</div>
		</Link>
	)
}

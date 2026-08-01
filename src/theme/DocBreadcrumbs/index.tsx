import React from 'react'
import clsx from 'clsx'
import { ThemeClassNames } from '@docusaurus/theme-common'
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client'
import { useHomePageRoute } from '@docusaurus/theme-common/internal'
import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData'
import { stripLeadingEmoji } from '@site/src/remark/shared/strip-leading-emoji'
import SigilIcon, { SIGIL_SIZE } from '@site/src/components/codex/SigilIcon'
import { Cartouche, TrailBraid } from '@site/src/components/codex/ornaments'
import {
	pageSigilForDocId,
	pageSigilForHref,
} from '@site/src/components/codex/page-sigils'
import type { SigilName } from '@site/src/components/codex/sigil-paths'

/**
 * The breadcrumb trail, rebuilt as a CARVED TRAIL rather than Infima's chain of
 * rounded grey pills separated by chevrons.
 *
 * Flow: ancestors are quiet small-caps ink joined by carved triangle marks, and
 * only the CURRENT page is plated — it gets a bronze {@link Cartouche} with the
 * page's own sigil. Deliberately restrained on hierarchy grounds: the page h1 is
 * the ceremonial element, so a trail sitting directly above it must stay
 * subordinate or the two compete. (A full cartouche-per-crumb chain was the
 * bolder option and was considered; it put three plates above the title.)
 *
 * Infima's own breadcrumb classes are dropped along with its markup, so none of
 * its pill geometry, separator background-image or hover states apply. The
 * `.codex-trail*` classes in custom.css own the whole surface.
 *
 * The home crumb is rendered here too, replacing the theme's hardcoded
 * house-glyph SVG with the temple sigil — the great house.
 *
 * Labels come from raw doc titles, so the legacy leading emoji is stripped at
 * render for both the visible trail AND the SEO structured data; source docs and
 * the Notion co-source stay untouched.
 */

function sigilForBreadcrumb(item: {
	docId?: unknown
	href?: unknown
}): SigilName | undefined {
	if (typeof item.docId === 'string') {
		const s = pageSigilForDocId(item.docId)
		if (s) return s
	}
	if (typeof item.href === 'string') {
		return pageSigilForHref(item.href)
	}
	return undefined
}

/** The connector between two crumbs: a twisted-cord braid, binding the trail as
 *  an inscription rather than a browser chevron. Decorative only — the list
 *  markup already conveys the sequence. */
function TrailMark() {
	return (
		<span className="codex-trail__mark" aria-hidden="true">
			<TrailBraid />
		</span>
	)
}

export default function DocBreadcrumbs(): React.ReactNode {
	const breadcrumbs = useSidebarBreadcrumbs()
	const homePageRoute = useHomePageRoute()
	if (!breadcrumbs) {
		return null
	}

	const cleaned = breadcrumbs.map((item) => ({
		...item,
		label:
			typeof item.label === 'string'
				? stripLeadingEmoji(item.label)
				: item.label,
	}))

	return (
		<>
			<DocBreadcrumbsStructuredData breadcrumbs={cleaned} />
			<nav
				className={clsx(ThemeClassNames.docs.docBreadcrumbs, 'codex-trail')}
				aria-label={translate({
					id: 'theme.docs.breadcrumbs.navAriaLabel',
					message: 'Breadcrumbs',
					description: 'The ARIA label for the breadcrumbs',
				})}
			>
				<ul className="codex-trail__list">
					{homePageRoute && (
						<li className="codex-trail__item">
							<Link
								className="codex-trail__link"
								href="/"
								aria-label={translate({
									id: 'theme.docs.breadcrumbs.home',
									message: 'Home page',
									description: 'The ARIA label for the home page breadcrumb',
								})}
							>
								<SigilIcon
									name="temple"
									size={SIGIL_SIZE.breadcrumb}
									className="codex-trail__sigil"
								/>
							</Link>
							<TrailMark />
						</li>
					)}
					{cleaned.map((item, idx) => {
						const isLast = idx === cleaned.length - 1
						const href =
							item.type === 'category' && item.linkUnlisted
								? undefined
								: item.href
						const sigil = sigilForBreadcrumb(item)

						// The current page is the one plated element in the trail.
						if (isLast) {
							return (
								<li
									key={idx}
									className="codex-trail__item codex-trail__item--current"
								>
									<Cartouche glyph={sigil} compact>
										{item.label}
									</Cartouche>
								</li>
							)
						}

						return (
							<li key={idx} className="codex-trail__item">
								{href ? (
									<Link className="codex-trail__link" href={href}>
										{item.label}
									</Link>
								) : (
									<span className="codex-trail__link">{item.label}</span>
								)}
								<TrailMark />
							</li>
						)
					})}
				</ul>
			</nav>
		</>
	)
}

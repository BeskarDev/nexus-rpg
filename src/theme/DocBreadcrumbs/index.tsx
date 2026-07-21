import React from 'react'
import clsx from 'clsx'
import { ThemeClassNames } from '@docusaurus/theme-common'
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client'
import { useHomePageRoute } from '@docusaurus/theme-common/internal'
import Link from '@docusaurus/Link'
import { translate } from '@docusaurus/Translate'
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home'
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData'
import { stripLeadingEmoji } from '@site/src/remark/shared/strip-leading-emoji'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import {
	pageSigilForDocId,
	pageSigilForHref,
} from '@site/src/components/codex/page-sigils'
import type { SigilName } from '@site/src/components/codex/sigil-paths'

/**
 * Forked from the default DocBreadcrumbs so the trail carries the codex identity
 * instead of the legacy emoji: each crumb's label has its leading emoji stripped
 * and, where the page has one, its bespoke sigil prepended (the same mark on the
 * page heading and side-nav entry). Docusaurus builds these labels from the raw
 * doc title, so — like the sidebar — this can only be cleaned at render, leaving
 * source docs and the Notion co-source untouched.
 */

function sigilForBreadcrumb(item: any): SigilName | undefined {
	if (typeof item.docId === 'string') {
		const s = pageSigilForDocId(item.docId)
		if (s) return s
	}
	if (typeof item.href === 'string') {
		return pageSigilForHref(item.href)
	}
	return undefined
}

function BreadcrumbsItemLink({
	children,
	href,
	isLast,
}: {
	children: React.ReactNode
	href?: string
	isLast: boolean
}) {
	const className = 'breadcrumbs__link'
	if (isLast) {
		return <span className={className}>{children}</span>
	}
	return href ? (
		<Link className={className} href={href}>
			<span>{children}</span>
		</Link>
	) : (
		<span className={className}>{children}</span>
	)
}

function BreadcrumbsItem({
	children,
	active,
}: {
	children: React.ReactNode
	active: boolean
}) {
	return (
		<li
			className={clsx('breadcrumbs__item', {
				'breadcrumbs__item--active': active,
			})}
		>
			{children}
		</li>
	)
}

export default function DocBreadcrumbs() {
	const breadcrumbs = useSidebarBreadcrumbs()
	const homePageRoute = useHomePageRoute()
	if (!breadcrumbs) {
		return null
	}

	// Strip emoji from crumb labels for both the visible trail and the SEO
	// structured data.
	const cleaned = breadcrumbs.map((item: any) => ({
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
				className={clsx(
					ThemeClassNames.docs.docBreadcrumbs,
					'codex-breadcrumbs',
				)}
				aria-label={translate({
					id: 'theme.docs.breadcrumbs.navAriaLabel',
					message: 'Breadcrumbs',
					description: 'The ARIA label for the breadcrumbs',
				})}
			>
				<ul className="breadcrumbs">
					{homePageRoute && <HomeBreadcrumbItem />}
					{cleaned.map((item: any, idx: number) => {
						const isLast = idx === cleaned.length - 1
						const href =
							item.type === 'category' && item.linkUnlisted
								? undefined
								: item.href
						const sigil = sigilForBreadcrumb(item)
						return (
							<BreadcrumbsItem key={idx} active={isLast}>
								<BreadcrumbsItemLink href={href} isLast={isLast}>
									{sigil ? (
										<SigilIcon
											name={sigil}
											size={15}
											className="breadcrumb-sigil"
										/>
									) : null}
									{item.label}
								</BreadcrumbsItemLink>
							</BreadcrumbsItem>
						)
					})}
				</ul>
			</nav>
		</>
	)
}

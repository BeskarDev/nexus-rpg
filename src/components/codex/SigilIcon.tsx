import React from 'react'
import { SIGIL_INNER, SIGIL_VIEWBOX, SigilName } from './sigil-paths'

/**
 * Bronze-Age-flavored sigils, drawn as inline SVG carved silhouettes (not a
 * cuneiform font: real signs risk unintended meaning and a full Unicode font is
 * wasteful for a handful of marks — README § Ornament / Sigil System). The mark
 * geometry lives in `sigil-paths.ts` so the build-time chapter-sigil remark
 * plugin and the navbar mask generator share the exact same shapes.
 *
 * The `<svg>` carries no `stroke` and no per-shape colour: every mark is solid
 * `fill="currentColor"` mass, so a sigil inherits its colour from the element
 * around it (the `.magic-accent` cyan, bronze in a heading) and stays a correct
 * alpha silhouette when the navbar renders it through `mask-image`.
 */
export type { SigilName }

/**
 * The size a sigil renders at, per surface — one place, so an optical
 * adjustment is made once rather than per call site.
 *
 * The recut traded hairline outlines for solid mass, which reads heavier at the
 * same pixel size. Small surfaces gained a pixel (a silhouette needs presence at
 * 12–14px, where a 0.75px stroke used to turn to mud) and the large ones lost
 * one or two (a solid 40px mark dominated the chapter card).
 */
export const SIGIL_SIZE = {
	breadcrumb: 13,
	sidebar: 15,
	paginator: 16,
	navbar: 20,
	callout: 22,
	indexRow: 22,
	tile: 32,
	chapterCard: 38,
} as const

export interface SigilIconProps {
	name: SigilName
	/** Pixel size of the square icon. Defaults to 24. */
	size?: number
	className?: string
	/** Accessible label. Omit for purely decorative use (icon is hidden). */
	title?: string
}

export default function SigilIcon({
	name,
	size = 24,
	className,
	title,
}: SigilIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox={`0 0 ${SIGIL_VIEWBOX} ${SIGIL_VIEWBOX}`}
			fill="currentColor"
			className={className}
			role={title ? 'img' : undefined}
			aria-label={title}
			aria-hidden={title ? undefined : true}
			dangerouslySetInnerHTML={{ __html: SIGIL_INNER[name] }}
		/>
	)
}

import React from 'react'
import { SIGIL_INNER, SigilName } from './sigil-paths'

/**
 * Abstract Bronze-Age-flavored sigils, drawn as inline SVG stroke paths (not a
 * cuneiform font: real signs risk unintended meaning and a full Unicode font is
 * wasteful for a handful of marks — README § Ornament / Sigil System). The mark
 * geometry lives in `sigil-paths.ts` so the build-time chapter-sigil remark
 * plugin and the navbar mask generator share the exact same shapes.
 *
 * All paths use `currentColor`, so a sigil inherits its color from the element
 * around it (e.g. the `.magic-accent` cyan, or bronze in a heading).
 */
export type { SigilName }

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
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className}
			role={title ? 'img' : undefined}
			aria-label={title}
			aria-hidden={title ? undefined : true}
			dangerouslySetInnerHTML={{ __html: SIGIL_INNER[name] }}
		/>
	)
}

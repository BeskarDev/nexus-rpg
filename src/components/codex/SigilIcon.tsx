import React from 'react'

/**
 * Abstract Bronze-Age-flavored sigils, drawn as inline SVG stroke paths (not a
 * cuneiform font: real signs risk unintended meaning and a full Unicode font is
 * wasteful for a handful of marks — README § Ornament / Sigil System). Shapes
 * are deliberately abstract/geometric. One sigil per chapter is planned so M4
 * can reuse this set for navbar and chapter cards.
 *
 * All paths use `currentColor`, so a sigil inherits its color from the element
 * around it (e.g. the `.magic-accent` cyan, or bronze in a heading).
 */
export type SigilName =
	| 'sun' // Basic Rules
	| 'ziggurat' // Adventurers / folk
	| 'tablet' // Statistics
	| 'anvil' // Equipment
	| 'blades' // Combat
	| 'hourglass' // Scenes
	| 'rune' // Magic
	| 'serpent' // Creatures
	| 'gear' // GM Tools
	| 'scroll' // Characters

const PATHS: Record<SigilName, React.ReactNode> = {
	sun: (
		<>
			<circle cx="12" cy="12" r="4.5" />
			<path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3M4.6 4.6l2.1 2.1M17.3 17.3l2.1 2.1M19.4 4.6l-2.1 2.1M6.7 17.3l-2.1 2.1" />
		</>
	),
	ziggurat: (
		<>
			<path d="M12 3l3 3h-6zM6 9h12M4 14h16M2.5 20h19" />
			<path d="M9 9v-3M15 9v-3" />
		</>
	),
	tablet: (
		<>
			<rect x="5" y="3" width="14" height="18" rx="1.5" />
			<path d="M8 8h8M8 12h8M8 16h5" />
		</>
	),
	anvil: (
		<>
			<path d="M4 8h13a3 3 0 0 1-3 3H9l-1 0" />
			<path d="M10 11v4M14 11v4M7 19h10M8.5 15h7l1 4h-9z" />
		</>
	),
	blades: (
		<>
			<path d="M5 4l9 9M19 4l-9 9" />
			<path d="M12 11l3 3-1 1-3-3M12 11l-3 3 1 1 3-3" />
			<path d="M6 20l3-3M18 20l-3-3" />
		</>
	),
	hourglass: (
		<>
			<path d="M6 3h12M6 21h12" />
			<path d="M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9" />
		</>
	),
	rune: (
		<>
			<path d="M12 2v20M12 8l6-4M12 8l-6-4M12 15l6 4M12 15l-6 4" />
			<circle cx="12" cy="12" r="2" />
		</>
	),
	serpent: (
		<>
			<path d="M4 17c3 0 3-4 6-4s3 4 6 4 4-3 4-6-2-5-5-5" />
			<circle cx="6" cy="7" r="2" />
			<path d="M5.2 6.5h.01" />
		</>
	),
	gear: (
		<>
			<circle cx="12" cy="12" r="3.5" />
			<path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
		</>
	),
	scroll: (
		<>
			<path d="M7 4h10a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2V6" />
			<path d="M6 6a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h1M10 9h6M10 13h6" />
		</>
	),
}

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
		>
			{title ? <title>{title}</title> : null}
			{PATHS[name]}
		</svg>
	)
}

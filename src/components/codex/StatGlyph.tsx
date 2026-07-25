import React from 'react'

/**
 * The five combat stats on a creature card, drawn as purpose-built marks.
 *
 * These are NOT taken from the shared `sigil-paths` set. That set is abstract
 * Bronze-Age flavour, and a first pass reaching into it produced two marks that
 * were simply wrong about the rules: a running figure for Dodge (which reads as
 * movement, but Dodge is the defense against RANGED attacks) and a flame for
 * Resist (which is the defense against MENTAL effects). A stat glyph has to state
 * what the stat defends against or it is worse than no icon at all.
 *
 * Drawn on the same 24-unit grid and stroke conventions as `SigilIcon`, so they
 * sit together with the rest of the kit.
 */
export type StatGlyphName = 'parry' | 'dodge' | 'resist' | 'hp' | 'av'

const GLYPHS: Record<StatGlyphName, React.ReactNode> = {
	// Parry — melee defense: two crossed blades.
	parry: (
		<>
			<path d="M5 4.5l10.5 12M19 4.5L8.5 16.5" />
			<path d="M4.5 18.5l3.5-2.5M19.5 18.5L16 16" />
		</>
	),
	// Dodge — defense against RANGED attacks: an arrow turned aside by a curved
	// ward, so the mark says "missile deflected" rather than "creature running".
	dodge: (
		<>
			<path d="M3 6.5l7.5 5" />
			<path d="M3 6.5l3.4.3M3 6.5l.3 3.4" />
			<path d="M13.5 3.5c4 2.6 5.5 6 5.5 8.5s-1.5 5.9-5.5 8.5" />
			<path d="M11.5 12.5l6-2" />
		</>
	),
	// Resist — defense against MENTAL effects: a head in profile with a warded
	// mind, the arcs turning back at the brow.
	resist: (
		<>
			<path d="M15.5 20.5v-3a7 7 0 1 0-7-7v1.5L7 14.5l1.5 1v3a2 2 0 0 0 2 2z" />
			<path d="M11.5 8.5a3 3 0 0 1 4.5 2.5M13 6c1.8-1 4 -.6 5.4.8" />
		</>
	),
	// HP — a vessel of life, the period's votive jar rather than a modern heart.
	hp: (
		<>
			<path d="M9 3.5h6M10 3.5c0 2-3 3.2-3 6.5 0 4 2.2 10.5 5 10.5s5-6.5 5-10.5c0-3.3-3-4.5-3-6.5" />
			<path d="M8 11h8" />
		</>
	),
	// AV — a scale-armor plate: the layered lamellar of the setting.
	av: (
		<>
			<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
			<path d="M5.6 10.5h12.8M8 7.2v11M16 7.2v11" />
		</>
	),
}

export interface StatGlyphProps {
	name: StatGlyphName
	/** Pixel size of the square icon. */
	size?: number
	className?: string
}

/** Decorative by default — the stat's text label always sits beside it. */
export default function StatGlyph({ name, size = 15, className }: StatGlyphProps) {
	return (
		<svg
			className={className}
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{GLYPHS[name]}
		</svg>
	)
}

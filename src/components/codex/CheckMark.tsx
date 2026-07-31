import React from 'react'

/**
 * The checkbox marks — a carved socket with a bronze lozenge inlaid in it
 * (M13 S4d).
 *
 * ## What was wrong with the default
 *
 * MUI ships a rounded-corner square that FILLS with the primary colour and puts a
 * white Material tick inside it. Three separate tells of a web app on carved
 * stone: the radius (every other control on this site has hard vertices), the
 * saturated block of fill (the same colour-mass problem the chips had before their
 * colour moved to the ink), and a Material glyph in a theme that draws its own
 * marks.
 *
 * ## The design
 *
 * Empty is an inlaid socket: a hard-cornered keyline, nothing in it. Checked sets
 * a **solid bronze lozenge** into that socket over a faint wash. The lozenge is
 * not a new mark — it is the same diamond the site's list bullets and the card
 * frames' corner bosses use, which is the whole reason it reads as "set" rather
 * than as "ticked": a chosen row grows the bullet the codex already gives its
 * list items.
 *
 * Indeterminate is a single inlaid bar, the lozenge's own width, so a partial
 * state reads as an unfinished inlay rather than as a different idea.
 *
 * Flat throughout — keyline, flat fill, no bevel, no shadow, no radius. The mark
 * inherits `currentColor`, so MUI's own checked / unchecked / disabled colours
 * still drive it and a call site can re-ink it with `color` like any other icon.
 *
 * Decorative: a checkbox always has its label beside it, so the mark is never the
 * sole carrier of meaning.
 *
 * ## One size, on purpose
 *
 * MUI's `size="small"` scales the DEFAULT icon by setting a font-size on
 * `.MuiSvgIcon-root`; these are plain `<svg>` elements, so it does not reach them
 * and every checkbox in the app draws an 18px mark. That is the intended outcome
 * rather than a limitation — 18px is what the interactive floor is built around,
 * and a "small" checkbox was one of the size exemptions S3.5 spent its time
 * removing. Pass `size` here if a specific mark genuinely needs to differ.
 */

export interface CheckMarkProps {
	/** Square size in px. Defaults to the 18px the interactive floor is built for. */
	size?: number
	className?: string
}

/**
 * The hook the theme inks these through.
 *
 * The mark takes `currentColor`, and in a menu row `currentColor` is the reading
 * ink — so something has to state that a SET inlay is bronze. That belongs in the
 * theme (one rule, every menu) rather than in an `sx` at each call site, and a
 * rule needs a selector: `MuiMenuItem` inks `.cs-check-mark` from the row's own
 * `aria-checked`.
 */
export const CHECK_MARK_CLASS = 'cs-check-mark'

const SOCKET = { x: 1.25, y: 1.25, width: 15.5, height: 15.5 }
/** The lozenge, as the diamond the bullets and corner bosses already use. */
const LOZENGE = '9,3.9 14.1,9 9,14.1 3.9,9'

const frame = (opacity: number) => (
	<rect
		{...SOCKET}
		fill="none"
		stroke="currentColor"
		strokeWidth={1.5}
		opacity={opacity}
	/>
)

const svgProps = (size: number, className?: string) => ({
	className: [CHECK_MARK_CLASS, className ?? ''].filter(Boolean).join(' '),
	width: size,
	height: size,
	viewBox: '0 0 18 18',
	xmlns: 'http://www.w3.org/2000/svg',
	'aria-hidden': true,
	focusable: false,
	style: { display: 'block' as const },
})

/** The empty socket. */
export const CheckMarkEmpty: React.FC<CheckMarkProps> = ({ size = 18, className }) => (
	<svg {...svgProps(size, className)}>{frame(0.55)}</svg>
)

/** The socket with its lozenge set in. */
export const CheckMarkChecked: React.FC<CheckMarkProps> = ({ size = 18, className }) => (
	<svg {...svgProps(size, className)}>
		<rect {...SOCKET} fill="currentColor" opacity={0.14} />
		{frame(1)}
		<polygon points={LOZENGE} fill="currentColor" />
	</svg>
)

/** Some but not all — one inlaid bar, the lozenge's width. */
export const CheckMarkIndeterminate: React.FC<CheckMarkProps> = ({
	size = 18,
	className,
}) => (
	<svg {...svgProps(size, className)}>
		<rect {...SOCKET} fill="currentColor" opacity={0.14} />
		{frame(1)}
		<rect x={4.6} y={8.1} width={8.8} height={1.8} fill="currentColor" />
	</svg>
)

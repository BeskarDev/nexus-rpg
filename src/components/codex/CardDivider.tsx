import React from 'react'
import styles from './CardDivider.module.css'

export interface CardDividerProps {
	/**
	 * Height of the diamond, as a CSS length. In `em` by default so the mark
	 * scales with whatever size the autofit settled the card's body at.
	 */
	size?: string
	className?: string
}

/**
 * A divider for the printed cards: hairline, hollow diamond, hairline.
 *
 * **The lozenge is the kit's own**, not a new mark (M18 D6). It is the shape the
 * card frame's corner bosses, the site's list bullets and the check mark are all
 * built from — the same construction, hollow, at the smallest size the set uses.
 * A straight rule was the one piece of card furniture with no relation to the
 * ornament language around it.
 *
 * Drawn as an outline rather than a solid: at a card's scale a filled diamond
 * this small reads as a heavy dot and pulls the eye off the text it separates.
 */
export default function CardDivider({
	size = '0.7em',
	className,
}: CardDividerProps) {
	return (
		<div
			className={[styles.rule, className].filter(Boolean).join(' ')}
			role="separator"
			aria-hidden="true"
		>
			<svg
				className={styles.lozenge}
				width={size}
				height={size}
				viewBox="0 0 12 12"
				fill="none"
				stroke="currentColor"
				strokeWidth={1.2}
				strokeLinejoin="round"
			>
				<path d="M6 0.9 L11.1 6 L6 11.1 L0.9 6 Z" />
			</svg>
		</div>
	)
}

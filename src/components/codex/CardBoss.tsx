import React from 'react'
import styles from './CardBoss.module.css'

export interface CardBossProps {
	/** The number itself — a spell's focus cost, an item's quality. */
	value: React.ReactNode
	/**
	 * WHICH number it is. Shown only to readers who cannot see the mark, but
	 * required rather than optional: a numeral in a diamond names nothing on its
	 * own, and nothing else on the card says what it is.
	 */
	label: string
	className?: string
}

/**
 * ONE NUMBER, set in a carved lozenge boss and seated in a card's corner.
 *
 * A spell's focus cost and a magic item's quality are the same kind of fact —
 * the single number a reader looks for before anything else — so they take the
 * same mark (M18 S4, M19 S3). It began as `FocusToken`, named after the first
 * of the two.
 *
 * Replaces a solid black disc with a white numeral — the one filled mass on a
 * card otherwise built from keylines, and against the theme's flat law. The
 * lozenge is the kit's own diamond, the shape the frame's corner bosses and the
 * card divider already use, with the concentric second hairline the kit reserves
 * for a focal mark.
 *
 * The numeral is real text rather than a drawn glyph, so it inks, scales and
 * copies; the `srOnly` label says which stat it is, because a number in a
 * diamond names nothing on its own.
 */
export default function CardBoss({ value, label, className }: CardBossProps) {
	return (
		<span className={[styles.token, className].filter(Boolean).join(' ')}>
			<span className={styles.frame} aria-hidden="true" />
			<span className={styles.value}>{value}</span>
			<span className={styles.srOnly}>{`${label} ${value}`}</span>
		</span>
	)
}

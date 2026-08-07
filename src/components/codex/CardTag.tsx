import React from 'react'
import styles from './CardTag.module.css'

export interface CardTagProps {
	/** The classification itself — `T2 Elite`, `Supreme`. */
	children: React.ReactNode
	className?: string
}

/**
 * What kind of thing a printed card is (M18 S4).
 *
 * A banner — the pointed hexagonal tag the theme's skill chips use for a named
 * proficiency — rather than a box, because the cards already box their LISTS
 * (`.pc-slab`, for a spell's properties and an art's weapons) and a
 * classification is not one item among several. Pointed against flat is a
 * difference the eye makes at a glance and a photocopier cannot lose.
 *
 * Three elements because a clipped shape cannot take a border: an ink
 * silhouette, the paper inset over it, and the label above both. Same
 * construction as the site's plugin chips.
 */
export default function CardTag({ children, className }: CardTagProps) {
	return (
		<span className={[styles.tag, className].filter(Boolean).join(' ')}>
			<span className={styles.face} aria-hidden="true" />
			<span className={styles.label}>{children}</span>
		</span>
	)
}

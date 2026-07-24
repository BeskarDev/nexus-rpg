import React from 'react'
import styles from './ConditionCard.module.css'
import { CardFrame } from './ornaments'

export interface ConditionCardProps {
	children: React.ReactNode
}

/**
 * Visual card for one condition, rendered from generated MDX (README § game
 * content architecture, M6). A denser, lighter sibling of the spell card
 * (compact frame + serpent keystone, no stat band or success levels) so the many
 * short condition entries stay subordinate. The first child must be the `### Name`
 * heading; it is lifted into
 * the name row so its anchor stays a real heading (deep-linked from the
 * auto-keyword plugin). Remaining children flow as markdown so keyword auto-links
 * resolve.
 *
 * Purely an information display — never merged with the character sheet's
 * interactive components (README § sheet-component separation).
 */
export default function ConditionCard({ children }: ConditionCardProps) {
	const kids = React.Children.toArray(children)
	const nameHeading = kids[0] ?? null
	const body = kids.slice(1)

	return (
		<section className={styles.card}>
			<CardFrame keystone="serpent" compact />
			<header className={styles.head}>
				<div className={styles.nameRow}>{nameHeading}</div>
			</header>
			<div className={styles.body}>{body}</div>
		</section>
	)
}

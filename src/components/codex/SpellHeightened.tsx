import React from 'react'
import styles from './SpellCodexCard.module.css'
import { LozengeDivider } from './ornaments'

export interface SpellHeightenedProps {
	children: React.ReactNode
}

/**
 * The Heightened footer of a {@link SpellCodexCard}. Rendered as a card child
 * (not a prop) so its rule text stays markdown and keyword auto-links resolve.
 * A lozenge divider separates it from the effect instead of a flat rule.
 */
export default function SpellHeightened({ children }: SpellHeightenedProps) {
	return (
		<div className={styles.heightened}>
			<LozengeDivider compact />
			<span className={styles.heightenedLabel}>Heightened</span>
			<div className={styles.heightenedText}>{children}</div>
		</div>
	)
}

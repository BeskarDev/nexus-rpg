import React from 'react'
import styles from './SpellCodexCard.module.css'

export type SuccessLevelName = 'weak' | 'strong' | 'critical'

export interface SuccessLevelProps {
	level: SuccessLevelName
	children: React.ReactNode
}

const LABELS: Record<SuccessLevelName, string> = {
	weak: 'Weak',
	strong: 'Strong',
	critical: 'Critical',
}

/**
 * One structured success-level row inside a {@link SpellCodexCard}. The rule
 * text is passed as markdown children so the auto-keyword plugin links terms
 * (README § rendering contract rule 2). Purely visual — distinct from the
 * character sheet's interactive spell tooling.
 */
export default function SuccessLevel({ level, children }: SuccessLevelProps) {
	return (
		<div className={`${styles.success} ${styles[`level-${level}`]}`}>
			<span className={styles.successLabel}>{LABELS[level]}</span>
			<div className={styles.successText}>{children}</div>
		</div>
	)
}

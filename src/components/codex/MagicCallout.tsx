import React from 'react'
import SigilIcon, { SigilName } from './SigilIcon'
import styles from './MagicCallout.module.css'

export interface MagicCalloutProps {
	children: React.ReactNode
	/** Optional heading shown in rune-cyan display type. */
	title?: string
	/** Leading sigil. Defaults to the magic rune. */
	sigil?: SigilName
}

/**
 * A worldbuilding / sorcery callout: the magic admonition (`.alert--magic` —
 * cyan border + faint glow tint, styled in custom.css) with a pulsing sigil.
 * For ritual / omen / relic asides on magical topics. Reuses the global
 * `.alert` box model so it matches native admonitions.
 */
export default function MagicCallout({
	children,
	title,
	sigil = 'rune',
}: MagicCalloutProps) {
	return (
		<aside className={`alert alert--magic ${styles.callout}`}>
			<span
				className={`${styles.glyph} runeGlyph magic-accent`}
				aria-hidden="true"
			>
				<SigilIcon name={sigil} size={22} />
			</span>
			<div className={styles.body}>
				{title ? <strong className={styles.title}>{title}</strong> : null}
				{children}
			</div>
		</aside>
	)
}

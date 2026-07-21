import React from 'react'
import SigilIcon, { SigilName } from './SigilIcon'
import styles from './RuneHeading.module.css'

export interface RuneHeadingProps {
	children: React.ReactNode
	/** Which sigil to show. Defaults to the generic magic rune. */
	sigil?: SigilName
	/** Heading anchor id (keeps deep links / TOC working). */
	id?: string
}

/**
 * A heading with a pulsing rune-cyan sigil beside readable text. The sigil
 * carries the "living magic" accent (`.magic-accent` → cyan + drop-shadow
 * pulse, gated on prefers-reduced-motion in custom.css); the text stays plain
 * and legible.
 */
export default function RuneHeading({
	children,
	sigil = 'rune',
	id,
}: RuneHeadingProps) {
	return (
		<h2 className={styles.runeHeading} id={id}>
			<span
				className={`${styles.glyph} runeGlyph magic-accent`}
				aria-hidden="true"
			>
				<SigilIcon name={sigil} />
			</span>
			<span>{children}</span>
		</h2>
	)
}

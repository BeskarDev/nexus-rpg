import React from 'react'
import SigilIcon, { SigilName } from './SigilIcon'
import styles from './OrnamentDivider.module.css'

export interface OrnamentDividerProps {
	/** Center sigil. Defaults to the sun disc. */
	sigil?: SigilName
	/**
	 * When true the center sigil takes the pulsing magic accent (use only for
	 * magical sections). Default is the bronze structural accent, no motion.
	 */
	magic?: boolean
}

/**
 * A section divider: a bronze fading rule on each side of a small centered
 * sigil. Structural by default (bronze, static); pass `magic` for a pulsing
 * rune-cyan sigil in magical sections.
 */
export default function OrnamentDivider({
	sigil = 'sun',
	magic = false,
}: OrnamentDividerProps) {
	return (
		<div className={styles.divider} role="separator" aria-hidden="true">
			<span
				className={`${styles.glyph}${magic ? ' runeGlyph magic-accent' : ''}`}
			>
				<SigilIcon name={sigil} size={20} />
			</span>
		</div>
	)
}

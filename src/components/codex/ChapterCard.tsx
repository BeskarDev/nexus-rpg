import React from 'react'
import SigilIcon, { SigilName } from './SigilIcon'
import styles from './ChapterCard.module.css'

export interface ChapterCardProps {
	/** Chapter label, e.g. "Basic Rules". No emoji — the sigil carries the mark. */
	label: string
	/** Landing URL for the chapter (first doc of its sidebar). */
	href: string
	/**
	 * Chapter sigil from the shared SigilIcon set. Omit to render a plain styled
	 * card (Half A can ship before the sigil set lands; sigils slot in later).
	 */
	sigil?: SigilName
}

/**
 * Homepage chapter card. One card per chapter, carrying its sigil from the
 * shared SigilIcon set — same mark used in the navbar and docs chapter markers
 * (one identity system, three surfaces). Plain React + CSS module, tokens only.
 */
export default function ChapterCard({ label, href, sigil }: ChapterCardProps) {
	return (
		<a href={href} className={styles.card}>
			{sigil ? (
				<span className={styles.sigil} aria-hidden="true">
					<SigilIcon name={sigil} size={40} />
				</span>
			) : null}
			<span className={styles.label}>{label}</span>
		</a>
	)
}

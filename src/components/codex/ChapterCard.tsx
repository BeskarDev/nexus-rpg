import React from 'react'
import SigilIcon, { SIGIL_SIZE, SigilName } from './SigilIcon'
import { CardFrame } from './ornaments'
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
 *
 * Frames itself with the shared {@link CardFrame} (M8 S11) so the homepage
 * speaks the same carved-stone language as the content cards. Corners only: the
 * large chapter sigil is already this card's focal mark, and a keystone above it
 * would be a competing second one.
 */
export default function ChapterCard({ label, href, sigil }: ChapterCardProps) {
	return (
		<a href={href} className={styles.card}>
			<CardFrame keystone="winged" cornersOnly />
			{sigil ? (
				<span className={styles.sigil} aria-hidden="true">
					<SigilIcon name={sigil} size={SIGIL_SIZE.chapterCard} />
				</span>
			) : null}
			<span className={styles.label}>{label}</span>
		</a>
	)
}

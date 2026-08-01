import React from 'react'
import styles from './CombatArtCard.module.css'
import { CardFrame, LozengeDivider } from './ornaments'

export interface CombatArtCardProps {
	/** Comma-separated weapon groups the art can be used with, e.g. "Axe, Blade". */
	weapons: string
	children: React.ReactNode
}

/**
 * Visual card for one combat art, rendered from generated MDX (README § game
 * content architecture, M6). Sits between the spell card and the condition card
 * in weight: a single frame with the martial crossed-khopesh keystone, no stat
 * band, but full-size body type since the rule text runs long.
 *
 * The weapon list is the card's scanning key — a player picks arts by what is in
 * their hand — so it rides the name line, bound right, rather than being folded
 * into the prose. Tags are unlabeled because weapon names are self-evident and a
 * label would cost width for nothing. On narrow viewports the rail wraps to its
 * own line (an art can list up to six weapon groups).
 *
 * The first child must be the `### Name` heading; it is lifted into the name row
 * so its anchor stays a real heading. Remaining children (effect prose and
 * {@link SuccessLevel} rows) flow as markdown so keyword auto-links resolve.
 *
 * Purely an information display — never merged with the character sheet's
 * interactive components (README § sheet-component separation).
 */
export default function CombatArtCard({
	weapons,
	children,
}: CombatArtCardProps) {
	const kids = React.Children.toArray(children)
	const nameHeading = kids[0] ?? null
	const body = kids.slice(1)

	const tags = weapons
		.split(',')
		.map((w) => w.trim())
		.filter(Boolean)

	return (
		<section className={styles.card}>
			<CardFrame keystone="khopesh" />
			<header className={styles.head}>
				<div className={styles.nameRow}>
					{nameHeading}
					<ul className={styles.weaponRail}>
						{tags.map((tag) => (
							<li key={tag} className={styles.weaponTag}>
								{tag}
							</li>
						))}
					</ul>
				</div>
			</header>
			<LozengeDivider compact />
			<div className={styles.body}>{body}</div>
		</section>
	)
}

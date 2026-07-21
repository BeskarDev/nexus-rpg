import React from 'react'
import styles from './SpellCodexCard.module.css'
import { CardFrame, LozengeDivider, RankChip } from './ornaments'

export interface SpellCodexCardProps {
	rank: number | string
	focus: number | string
	target: string
	range: string
	/** Empty string when the spell has no properties. */
	properties?: string
	children: React.ReactNode
}

interface StatProps {
	label: string
	value: React.ReactNode
}

/**
 * Visual card for one spell, rendered from generated MDX (README § game content
 * architecture). The first child must be the `### Name` heading — it is lifted
 * into the name row beside the rank badge so its anchor is still a real heading.
 * Remaining children (effect body, {@link SuccessLevel} rows, Heightened footer)
 * flow as markdown so keyword auto-links resolve. Stat-band values come in as
 * props and deliberately skip keyword linking.
 *
 * Purely an information display — never merged with the character sheet's
 * interactive spell components (README § sheet-component separation).
 */
export default function SpellCodexCard({
	rank,
	focus,
	target,
	range,
	properties = '',
	children,
}: SpellCodexCardProps) {
	const kids = React.Children.toArray(children)
	const nameHeading = kids[0] ?? null
	const body = kids.slice(1)

	const stats: StatProps[] = [
		{ label: 'Focus', value: focus },
		{ label: 'Target', value: target },
		{ label: 'Range', value: range },
	]
	if (properties && properties !== '-')
		stats.push({ label: 'Properties', value: properties })

	return (
		<section className={styles.card}>
			<CardFrame />
			<header className={styles.head}>
				<div className={styles.nameRow}>
					{nameHeading}
					<RankChip rank={rank} />
				</div>
				<LozengeDivider compact />
				<dl className={styles.statBand}>
					{stats.map((s) => (
						<div key={s.label} className={styles.stat}>
							<dt className={styles.statLabel}>{s.label}</dt>
							<dd className={styles.statValue}>{s.value}</dd>
						</div>
					))}
				</dl>
			</header>
			<div className={styles.body}>{body}</div>
		</section>
	)
}

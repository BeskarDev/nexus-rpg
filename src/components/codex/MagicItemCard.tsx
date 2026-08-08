import React from 'react'
import styles from './MagicItemCard.module.css'
import { CardFrame, Cartouche, LozengeDivider } from './ornaments'
import SigilIcon, { type SigilName } from './SigilIcon'
import StatSigil from './StatSigil'
import DieToken from './DieToken'

export interface MagicItemTallyRow {
	label: string
	value: number
	/** Why this line is nil — "wearables skip this", "base material". */
	note?: string
}

export interface MagicItemFigure {
	label: string
	/** A numeral, a die, whatever the figure actually is. */
	value: React.ReactNode
	/** The stat's own mark, where it has one. */
	sigil?: React.ReactNode
}

export interface MagicItemCardProps {
	/** The generated name. Omit while the item is still incomplete. */
	name?: string
	/** `Q5 (exceptional)` — the rank nameplate on the head. */
	quality?: string
	/** Category, material and enchantment, as the item's kind line. */
	kind?: string
	/** The mark for the item's category. */
	kindSigil?: SigilName
	/** The cost breakdown, in the rulebook's own order. */
	tally?: MagicItemTallyRow[]
	total?: number
	figures?: MagicItemFigure[]
	properties?: string[]
	description?: string
	/** Shown in place of everything when there is nothing to draw yet. */
	waiting?: React.ReactNode
}

const coins = (value: number) => value.toLocaleString('en-US')

/**
 * A magic item, as a codex card (M13 S8).
 *
 * ## Why this exists
 *
 * Every other generated content type has one — spells, combat arts, talents,
 * conditions, creatures — and a magic item did not, so the Magic Item Builder's
 * preview was a plate assembled from builder chrome: correct, and visibly a
 * programmer's readout rather than a page of the book.
 *
 * It lives in `codex/` rather than in the builder because that is where a content
 * type's card belongs, and because the docs' magic-item pages can render items
 * with it later without a second implementation appearing. The lesson the
 * Companion Builder taught — a stat block must not have two renderings — applies
 * here in advance rather than in hindsight.
 *
 * ## Its place in the family
 *
 * A **set cut-stone** keystone and matching corner rails (the `gem` family in
 * `ornaments.tsx`), on a **single** frame. Not the nested concentric border: that
 * is the spell card's mark of primacy and nothing else may take it.
 *
 * The card's own weight sits in the **tally** — a magic item's defining fact is
 * what it costs, and the arithmetic is the thing the rulebook makes you do by
 * hand. Ruled courses, one label measure, figures flush right, a heavier rule
 * where the sum begins, and nil lines dimmed rather than dropped so the total can
 * be checked against the cost tables line by line.
 */
export default function MagicItemCard({
	name,
	quality,
	kind,
	kindSigil,
	tally,
	total,
	figures,
	properties,
	description,
	waiting,
}: MagicItemCardProps) {
	return (
		<section className={styles.card}>
			<CardFrame keystone="gem" />
			<div className={styles.head}>
				<h4
					className={`${styles.name}${name ? '' : ' ' + styles['name--waiting']}`}
				>
					{name || 'No item yet'}
				</h4>
				{quality && <Cartouche compact>{quality}</Cartouche>}
			</div>
			{kind && (
				<p className={styles.kind}>
					{kindSigil && <SigilIcon name={kindSigil} size={12} />}
					{kind}
				</p>
			)}

			{waiting ? (
				<p className={styles.waiting}>{waiting}</p>
			) : (
				<>
					<LozengeDivider compact />

					{tally && total !== undefined && (
						<div className={styles.tally}>
							{tally.map((row) => (
								<div
									key={row.label}
									className={`${styles.tallyRow}${row.value === 0 ? ' ' + styles.tallyNil : ''}`}
								>
									<span className={styles.tallyLabel}>
										{row.label}
										{row.note ? ` (${row.note})` : ''}
									</span>
									<span className={styles.tallyValue}>
										{row.value > 0 ? coins(row.value) : '—'}
									</span>
								</div>
							))}
							<div className={`${styles.tallyRow} ${styles.tallyTotal}`}>
								<span className={styles.tallyLabel}>
									<StatSigil name="coins" size={13} />
									Total
								</span>
								<span className={styles.tallyValue}>{coins(total)}</span>
							</div>
						</div>
					)}

					{figures && figures.length > 0 && (
						<div className={styles.figures}>
							{figures.map((figure) => (
								<div className={styles.figure} key={figure.label}>
									<span className={styles.figureLabel}>
										{figure.sigil}
										{figure.label}
									</span>
									<span className={styles.figureValue}>{figure.value}</span>
								</div>
							))}
						</div>
					)}

					{properties && properties.length > 0 && (
						<div className={styles.course}>
							<span className={styles.courseName}>Properties</span>
							<div className={styles.badges}>
								{properties.map((property, index) => (
									<span key={index} className="cs-entry-badge">
										{property}
									</span>
								))}
							</div>
						</div>
					)}

					{description && (
						<div className={styles.course}>
							<span className={styles.courseName}>Description</span>
							<div className={styles.prose}>{description}</div>
						</div>
					)}
				</>
			)}
		</section>
	)
}

export { DieToken }

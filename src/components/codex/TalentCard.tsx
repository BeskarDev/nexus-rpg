import React from 'react'
import styles from './TalentCard.module.css'
import { CardFrame, LozengeDivider, RankChip } from './ornaments'

export interface TalentCardProps {
	/** Rendered rank span, e.g. "1–3" or "4–5". Shown as the name-line scanning key. */
	ranks: string
	children: React.ReactNode
}

/**
 * Visual card for one talent, rendered from generated MDX (README § game content
 * architecture, M6). The heaviest of the codex cards by content — a talent runs a
 * median ~670 characters against a combat art's ~275 — but it stays on the single
 * frame rather than adopting the spell card's nested concentric border: the rank
 * ladder inside already supplies structure, and doubling the border on top of it
 * reads as clutter.
 *
 * The rank span rides the name line bound right, like the combat art's weapon
 * rail. It is the card's scanning key: it separates an entry talent (1–3) from a
 * capstone that needs skill rank 4 to even begin (4–5), which is otherwise only
 * discoverable by reading down the ladder.
 *
 * The first child must be the `### Name` heading; it is lifted into the name row
 * so its anchor stays a real heading. Remaining children (any preamble prose and
 * the {@link TalentRank} rungs) flow as markdown so keyword auto-links resolve.
 *
 * Purely an information display — never merged with the character sheet's
 * interactive components (README § sheet-component separation).
 */
export default function TalentCard({ ranks, children }: TalentCardProps) {
	const kids = React.Children.toArray(children)
	const nameHeading = kids[0] ?? null
	const body = kids.slice(1)

	return (
		<section className={styles.card}>
			<CardFrame keystone="ziggurat" />
			<header className={styles.head}>
				<div className={styles.nameRow}>
					{nameHeading}
					<span className={styles.rankSpan}>Rank {ranks}</span>
				</div>
			</header>
			<LozengeDivider compact />
			<div className={styles.body}>{body}</div>
		</section>
	)
}

export interface TalentRankProps {
	/** The rank you purchase to gain this rung, 1–5. */
	rank: number
	children: React.ReactNode
}

/**
 * One rung of a talent's rank ladder: the rank marker in a left gutter with its
 * rule text beside it, and no gutter ornament at all.
 *
 * A gutter rather than the inline treatment {@link SuccessLevel} uses, because a
 * rung is block-level — it routinely carries bullet lists and several paragraphs,
 * and an inline label would leave those hanging with nothing marking where the
 * rank starts.
 *
 * An earlier pass ran a bronze keyline down each rung as a "ladder rail"; the
 * owner read it as the same flat digital bar the spell card rejected in its first
 * round. The rank chips carry the ladder on their own, so the rail is gone rather
 * than restyled — see the note in the stylesheet.
 *
 * Collapses to a stacked label above the text on narrow viewports, where the
 * gutter costs more width than the reading column can spare.
 */
export function TalentRank({ rank, children }: TalentRankProps) {
	return (
		<div className={styles.rung}>
			<div className={styles.rungMark}>
				<RankChip rank={rank} compact />
			</div>
			<div className={styles.rungBody}>{children}</div>
		</div>
	)
}

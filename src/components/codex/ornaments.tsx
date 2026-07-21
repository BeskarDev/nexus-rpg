import React from 'react'
import styles from './ornaments.module.css'

/**
 * Reusable Bronze-Age ornament kit. Shape language: diamonds (lozenges) and
 * triangles (chevrons), struck in bronze. Used by SpellCodexCard now, but
 * generic so any doc container can frame itself, and so `LozengeDivider` can
 * stand in for the default `---` thematic break (wired in `@theme/MDXComponents`).
 * All stroke/fill `currentColor` (bronze token); tint in both themes. Decorative.
 */

const CORNERS = ['tl', 'tr', 'br', 'bl'] as const

/** A corner mark: a bronze diamond stud with two rails running along the edges. */
function Corner({ pos }: { pos: (typeof CORNERS)[number] }) {
	return (
		<svg
			className={`${styles.corner} ${styles[`corner-${pos}`]}`}
			viewBox="0 0 32 32"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			aria-hidden="true"
		>
			<path d="M6 2 L10 6 L6 10 L2 6 Z" fill="currentColor" stroke="none" />
			<path d="M10 6 H31" strokeWidth={1.2} />
			<path d="M6 10 V31" strokeWidth={1.2} />
			<path d="M12.5 6 L15 8.5" strokeWidth={1} opacity={0.6} />
			<path d="M6 12.5 L8.5 15" strokeWidth={1} opacity={0.6} />
		</svg>
	)
}

/**
 * A winged sun disc — the Amonkhet/Egyptian divine cornice motif — set as a
 * keystone on the top edge. Reserved for the "divine" header position.
 */
function WingedDisc() {
	return (
		<svg
			className={styles.wingedDisc}
			viewBox="0 0 72 18"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{/* left wing */}
			<path d="M30 9 C22 4 14 5 5 9" strokeWidth={1.2} />
			<path d="M29 11 C22 10.5 14 11.5 7 13" strokeWidth={1} opacity={0.75} />
			<path
				d="M25 7.4 V10 M21 7 V10.4 M17 7.2 V10.8 M13 7.8 V11.3 M9 8.6 V11.8"
				strokeWidth={0.8}
				opacity={0.5}
			/>
			{/* right wing */}
			<path d="M42 9 C50 4 58 5 67 9" strokeWidth={1.2} />
			<path d="M43 11 C50 10.5 58 11.5 65 13" strokeWidth={1} opacity={0.75} />
			<path
				d="M47 7.4 V10 M51 7 V10.4 M55 7.2 V10.8 M59 7.8 V11.3 M63 8.6 V11.8"
				strokeWidth={0.8}
				opacity={0.5}
			/>
			{/* sun disc */}
			<circle cx={36} cy={9} r={4.3} strokeWidth={1.1} />
			<circle cx={36} cy={9} r={1.7} fill="currentColor" stroke="none" />
		</svg>
	)
}

/**
 * Full card frame — Amonkhet "carved stone slab" logic: four diamond corners
 * and a winged-sun-disc keystone on the top edge. The nested inner border and
 * engraving live on the card itself (SpellCodexCard.module.css). Top boss only —
 * a bottom one would collide with the next stacked card. Parent must be
 * `position: relative`.
 */
export function CardFrame() {
	return (
		<div className={styles.frame} aria-hidden="true">
			{CORNERS.map((pos) => (
				<Corner key={pos} pos={pos} />
			))}
			<WingedDisc />
		</div>
	)
}

export interface LozengeDividerProps {
	/** Tighter vertical margins for use inside a container (vs. a page divider). */
	compact?: boolean
}

/**
 * A brass rule fading OUT from a central lozenge — solid at the ornament, fading
 * to nothing at the frame edges. Doubles as the site's `---` break replacement.
 */
export function LozengeDivider({ compact = false }: LozengeDividerProps) {
	return (
		<div
			className={`${styles.divider}${compact ? ' ' + styles.dividerCompact : ''}`}
			role="separator"
			aria-hidden="true"
		>
			<svg
				className={styles.lozenge}
				viewBox="0 0 22 12"
				fill="none"
				stroke="currentColor"
				strokeWidth={1}
				aria-hidden="true"
			>
				<path d="M11 1 L18 6 L11 11 L4 6 Z" />
				<path d="M11 3.6 L14.4 6 L11 8.4 L7.6 6 Z" fill="currentColor" stroke="none" />
				<path d="M4 6 L1 6" />
				<path d="M18 6 L21 6" />
			</svg>
		</div>
	)
}

export interface RankChipProps {
	rank: number | string
	/** Smaller, stud-less variant for inline use (e.g. Heightened rank lines). */
	compact?: boolean
}

/** A bronze rank cartouche. Full form (flanking studs) for card headers, compact for inline. */
export function RankChip({ rank, compact = false }: RankChipProps) {
	return (
		<span className={`${styles.rankChip}${compact ? ' ' + styles.rankChipCompact : ''}`}>
			{!compact && <i className={styles.stud} aria-hidden="true" />}
			<span className={styles.rankWord}>Rank</span> {rank}
			{!compact && <i className={styles.stud} aria-hidden="true" />}
		</span>
	)
}

import React from 'react'
import styles from './DieToken.module.css'

/** Sides of each die in the attribute ladder, in order. */
const DIE_SIDES = [4, 6, 8, 10, 12] as const

export interface DieTokenProps {
	/** An attribute value as written in the data: `d4`, `d8`, `d4-1`, `d12+2`. */
	value: string
	className?: string
}

/**
 * Renders a regular polygon with `sides` sides, point-up, inscribed in a circle
 * of radius `r` about (12,12).
 */
function polygon(sides: number, r: number, rotate = 0): string {
	return (
		Array.from({ length: sides }, (_, i) => {
			const a = (i * 2 * Math.PI) / sides - Math.PI / 2 + rotate
			return `${(12 + r * Math.cos(a)).toFixed(2)} ${(12 + r * Math.sin(a)).toFixed(2)}`
		}).join(' L') + ' Z'
	)
}

/**
 * An attribute die, drawn as a polygon whose SIDE COUNT is the die size — a d4 is
 * a triangle, a d12 a hexagon — with the numeral struck inside it and any
 * modifier riding alongside.
 *
 * This is the one place in the codex where a custom mark beats a label outright.
 * A creature's four attributes are read together and compared against each other
 * constantly, and shape is preattentive in a way that `d4` / `d6` / `d8` set in
 * the same face is not: you can see at a glance that a creature is all triangles
 * (feeble) or carries one hexagon (a specialist). The numeral stays inside the
 * polygon so nothing is lost for a reader who does not learn the shape language.
 *
 * A d4 is drawn as a triangle and a d12 as a hexagon rather than a true
 * dodecagon: past six sides a small polygon is indistinguishable from a circle,
 * so the ladder uses the first five *distinguishable* polygons (3,4,5,6 sides
 * plus the d8 rhombus) as a rank order, not a literal face count.
 *
 * The d6 is a FLAT-TOP square and the d8 a point-up rhombus. Both are four-sided,
 * so orientation is the only thing telling them apart — a point-up d6 read as a
 * second diamond and the two were indistinguishable at a glance.
 */
export default function DieToken({ value, className }: DieTokenProps) {
	const match = value.trim().match(/^d(\d+)\s*([+-]\s*\d+)?$/i)
	// Unrecognised values render as plain text rather than a wrong shape.
	if (!match) return <span className={styles.plain}>{value}</span>

	const size = Number(match[1])
	const modifier = match[2]?.replace(/\s+/g, '') ?? ''
	const index = DIE_SIDES.indexOf(size as (typeof DIE_SIDES)[number])
	// 3,4,5,6 sides for d4/d6/d10/d12; the d8 is the rhombus (see the note above).
	const shape = [3, 4, 0, 5, 6][index] ?? 0
	// Only the d6 is rotated, to sit flat-top and read as a square rather than as
	// a second diamond beside the d8.
	const rotate = size === 6 ? Math.PI / 4 : 0

	return (
		<span className={`${styles.token}${className ? ' ' + className : ''}`}>
			<svg
				className={styles.die}
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				{shape === 0 ? (
					// d8: a rhombus (two stacked triangles), the die's real silhouette.
					<path d="M12 1.5 L21 12 L12 22.5 L3 12 Z" strokeWidth={1.3} />
				) : (
					<path
						d={`M${polygon(shape, size === 6 ? 9.4 : 10.5, rotate)}`}
						strokeWidth={1.3}
					/>
				)}
			</svg>
			<span className={styles.numeral}>{size}</span>
			{modifier && <span className={styles.modifier}>{modifier}</span>}
			<span className={styles.srOnly}>{value}</span>
		</span>
	)
}

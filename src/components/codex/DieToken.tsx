import React from 'react'
import styles from './DieToken.module.css'

/** Sides of each die in the attribute ladder, in order. */
const DIE_SIDES = [4, 6, 8, 10, 12] as const

export interface DieTokenProps {
	/** An attribute value as written in the data: `d4`, `d8`, `d4-1`, `d12+2`. */
	value: string
	className?: string
	/**
	 * The token's box, as any CSS length. Defaults to the screen's `1.85rem`, so
	 * no existing consumer moves.
	 *
	 * The size was hard-coded until M21 D2, which put die tokens on the PRINTED
	 * creature card: 1.85rem is ~29.6px against a 53mm measure, roughly four
	 * times what a card can spend on one of four attributes. The numeral and the
	 * modifier size in `em` off this box, so the whole mark scales as one.
	 */
	size?: string
}

/**
 * Renders a regular polygon with `sides` sides, point-up, inscribed in a circle of
 * radius `r` about (12, 12 + `dy`).
 *
 * `dy` exists for the triangle. A regular polygon's centroid IS its circumcircle
 * centre, so every shape here is mathematically centred on the numeral — but a
 * point-up triangle carries almost all of its area in the lower half, so its
 * *optical* centre sits below the geometric one and the numeral reads high inside
 * it. Dropping the shape rather than raising the numeral keeps the numeral on the
 * same baseline as its four siblings, which is what makes a row of attributes scan
 * (M13 S5, owner review).
 */
function polygon(sides: number, r: number, rotate = 0, dy = 0): string {
	return (
		Array.from({ length: sides }, (_, i) => {
			const a = (i * 2 * Math.PI) / sides - Math.PI / 2 + rotate
			return `${(12 + r * Math.cos(a)).toFixed(2)} ${(12 + dy + r * Math.sin(a)).toFixed(2)}`
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
export default function DieToken({ value, className, size }: DieTokenProps) {
	const match = value.trim().match(/^d(\d+)\s*([+-]\s*\d+)?$/i)
	// Unrecognised values render as plain text rather than a wrong shape.
	if (!match) return <span className={styles.plain}>{value}</span>

	const dieSize = Number(match[1])
	const modifier = match[2]?.replace(/\s+/g, '') ?? ''
	const index = DIE_SIDES.indexOf(dieSize as (typeof DIE_SIDES)[number])
	// 3,4,5,6 sides for d4/d6/d10/d12; the d8 is the rhombus (see the note above).
	const shape = [3, 4, 0, 5, 6][index] ?? 0
	// Only the d6 is rotated, to sit flat-top and read as a square rather than as
	// a second diamond beside the d8.
	const rotate = dieSize === 6 ? Math.PI / 4 : 0
	/**
	 * Per-shape corrections so the five tokens read as ONE SIZE (S5, owner review).
	 *
	 * A shared circumradius does not give a shared apparent size: a square inscribed
	 * in a circle covers 64% of it and a hexagon 83%, so at equal `r` the d6 reads
	 * noticeably smaller than the d10 and d12 beside it. The square gets the radius
	 * back; the triangle, which covers only 41%, gets the drop described on
	 * `polygon` instead of a radius change, because widening a triangle to match a
	 * hexagon's area would make it overrun the token box.
	 */
	const radius = dieSize === 6 ? 10.6 : 10.5
	const dy = dieSize === 4 ? 1.6 : 0

	return (
		<span
			className={`${styles.token}${className ? ' ' + className : ''}`}
			style={
				size
					? ({ '--die-token-size': size } as React.CSSProperties)
					: undefined
			}
		>
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
						d={`M${polygon(shape, radius, rotate, dy)}`}
						strokeWidth={1.3}
					/>
				)}
			</svg>
			<span className={styles.numeral}>{dieSize}</span>
			{modifier && <span className={styles.modifier}>{modifier}</span>}
			<span className={styles.srOnly}>{value}</span>
		</span>
	)
}

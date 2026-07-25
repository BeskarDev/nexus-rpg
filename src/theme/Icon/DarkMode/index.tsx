import React from 'react'
import type { Props } from '@theme/Icon/DarkMode'

/**
 * Crescent geometry. Two equal circles offset along x; the crescent is the part
 * of the outer one the inner one does not cover, so its horns come to real
 * points instead of being clipped flat.
 *
 * Derived rather than hand-authored: for equal radii `R` at centre distance `D`
 * the two rims meet at `x = 12 + D/2`, `y = 12 ± sqrt(R² - (D/2)²)`. Nudging D
 * changes only the crescent's thickness, and the path stays exact.
 */
const R = 9
const D = 5
const MX = 12 + D / 2
const MY = Math.sqrt(R * R - (D / 2) * (D / 2))
const TOP = (12 - MY).toFixed(2)
const BOTTOM = (12 + MY).toFixed(2)

const CRESCENT =
	`M${MX} ${TOP} ` +
	// Outer rim, the long way round through the left edge.
	`A${R} ${R} 0 1 0 ${MX} ${BOTTOM} ` +
	// Inner rim back to the start, cutting the cup out of the same mass.
	`A${R} ${R} 0 0 1 ${MX} ${TOP} Z`

/**
 * Dark mode: the lunar crescent with a lozenge star in its mouth — Sin and the
 * eight-pointed star of Ishtar, the standard astral pairing on Mesopotamian
 * boundary stones. The stock icon is a crescent too, so the reading is
 * unchanged; what changes is that this one is cut as solid mass with the cup
 * carved out of it, and the star is the kit's lozenge rather than a spark.
 */
export default function IconDarkMode(props: Props): React.ReactNode {
	return (
		<svg
			{...props}
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
		>
			<path d={CRESCENT} />
			<path d="M17.2 10.1 L19.1 12 L17.2 13.9 L15.3 12 Z" />
		</svg>
	)
}

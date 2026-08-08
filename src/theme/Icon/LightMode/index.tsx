import React from 'react'
import type { Props } from '@theme/Icon/LightMode'

const C = 12
/** Ray base sits just outside the rim ring, apex just inside the 24 box. */
const R_BASE = 8.7
const R_TIP = 11.3
/** Half-width of a ray base, in user units. */
const RAY_HALF = 1.55
const RAY_COUNT = 8

/**
 * Eight solid rays, generated from the angle rather than hand-authored so the
 * set cannot drift out of rotational symmetry (ornament-craft: symmetry by
 * construction). Same solid-triangle family as the disclosure caret and the
 * sidebar arrow blade — a hairline "starburst" would read as wire.
 */
function rays(): string {
	return Array.from({ length: RAY_COUNT }, (_, i) => {
		const a = (i * 2 * Math.PI) / RAY_COUNT - Math.PI / 2
		const dx = Math.cos(a)
		const dy = Math.sin(a)
		const p = (r: number, w: number) =>
			`${(C + r * dx - w * dy).toFixed(2)} ${(C + r * dy + w * dx).toFixed(2)}`
		return `M${p(R_BASE, RAY_HALF)} L${p(R_TIP, 0)} L${p(R_BASE, -RAY_HALF)} Z`
	}).join(' ')
}

/**
 * Light mode: the solar disc, the site's own crest, rather than Material's
 * outlined sun.
 *
 * Built as a rimmed disc — a carved keyline ring with a solid core inside it,
 * which is the {@link SunDisc} ornament's exact construction — so the navbar
 * toggle and the footer crest read as the same mark at two sizes.
 */
export default function IconLightMode(props: Props): React.ReactNode {
	return (
		<svg
			{...props}
			width={24}
			height={24}
			viewBox="0 0 24 24"
			fill="none"
			aria-hidden="true"
		>
			<path d={rays()} fill="currentColor" />
			<circle cx={C} cy={C} r={7} stroke="currentColor" strokeWidth={1.4} />
			<circle cx={C} cy={C} r={3.2} fill="currentColor" />
		</svg>
	)
}

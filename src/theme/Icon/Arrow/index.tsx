import React from 'react'
import type { Props } from '@theme/Icon/Arrow'

/**
 * The sidebar collapse / expand glyph: a socketed spear driving toward a fluted
 * pillar — "drive the panel back against its frame".
 *
 * One swizzle covers both controls. `CollapseButton` and `ExpandButton` render
 * this same icon and orient it by rotation, so the base form points RIGHT (the
 * expand tab, `rotate(0)`) and the collapse button gets it mirrored
 * (`rotate(180deg)`).
 *
 * Drawn in the vocabulary the kit already established for the khopesh corner
 * rail, rather than inventing a shape: a lanceolate leaf blade with a midrib
 * carved back out of the solid mass. A plain triangle reads as a generic
 * arrowhead and loses the weapon; an outlined chevron reads as bent wire, which
 * is exactly how the theme's stock double-arrow read.
 *
 * Deliberately reduced to THREE parts — bar, haft, blade. The first cut carried
 * the full corner-rail treatment (bound haft with binding ticks, a socket collar,
 * and a pillar with lintel cap, fluted shaft and base slab) and read as busy at
 * 26px: at this size those parts are each 1–2px of detail, which is texture
 * rather than anatomy. The blade and its midrib carry the carved character on
 * their own.
 *
 * Rendered at 26x22 rather than the theme's 20x20: below that the midrib falls
 * under ~0.5px and turns to aliasing rather than carving.
 */
export default function IconArrow(props: Props): React.ReactNode {
	const surface = 'var(--ifm-background-surface-color)'

	// Lanceolate blade: half-width swells a third of the way up, then converges to
	// the point. Generated from the profile rather than hand-authored, so the two
	// halves cannot drift apart.
	const b = 9.4
	const tip = 18.4
	const halfW = 2.9
	const midY = 11
	const x = (f: number) => +(b + (tip - b) * f).toFixed(2)
	const up = (k: number) => +(midY - halfW * k).toFixed(2)
	const dn = (k: number) => +(midY + halfW * k).toFixed(2)

	const blade =
		`M${b} ${midY} ` +
		`C${x(0.1)} ${up(0.72)},${x(0.24)} ${up(1)},${x(0.45)} ${up(0.86)} ` +
		`C${x(0.68)} ${up(0.6)},${x(0.86)} ${up(0.32)},${tip} ${midY} ` +
		`C${x(0.86)} ${dn(0.32)},${x(0.68)} ${dn(0.6)},${x(0.45)} ${dn(0.86)} ` +
		`C${x(0.24)} ${dn(1)},${x(0.1)} ${dn(0.72)},${b} ${midY} Z`

	return (
		<svg
			{...props}
			width="26"
			height="22"
			viewBox="0 0 26 22"
			fill="none"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			{/* The frame edge the panel folds against. */}
			<path
				d="M21.2 4.2 H23.8 V17.8 H21.2 Z"
				fill="currentColor"
				stroke="none"
			/>

			{/* Haft. */}
			<path d="M2 11 H9.6" strokeWidth={1.5} />

			{/* Solid leaf blade, with the midrib carved back out of it. */}
			<path d={blade} fill="currentColor" stroke="none" />
			<path
				d={`M${x(0.18)} ${midY} H${x(0.62)}`}
				stroke={surface}
				strokeWidth={0.75}
			/>
		</svg>
	)
}

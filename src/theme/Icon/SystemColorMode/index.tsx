import React from 'react'
import type { Props } from '@theme/Icon/SystemColorMode'

const C = 12
const R_RING = 7.5
const RING_W = 1.4
/** Fill stops at the ring's inner edge so the two never bleed together. */
const R_FILL = R_RING - RING_W / 2
const R_BASE = 9.2
const R_TIP = 11.3
const RAY_HALF = 1.4
/** Rays only on the lit half, at the disc's equator and ±40°. */
const RAY_ANGLES = [-40, 0, 40]

function rays(): string {
	return RAY_ANGLES.map((deg) => {
		const a = (deg * Math.PI) / 180
		const dx = Math.cos(a)
		const dy = Math.sin(a)
		const p = (r: number, w: number) =>
			`${(C + r * dx - w * dy).toFixed(2)} ${(C + r * dy + w * dx).toFixed(2)}`
		return `M${p(R_BASE, RAY_HALF)} L${p(R_TIP, 0)} L${p(R_BASE, -RAY_HALF)} Z`
	}).join(' ')
}

/**
 * System / auto mode: one disc lit on the right and in shadow on the left.
 *
 * Deliberately the SAME rimmed disc as {@link IconLightMode} with half its face
 * filled and only three of the eight rays cut — so the three toggle states read
 * as one mark passing through a cycle, not three unrelated pictures. Material's
 * stock version is the same half-filled circle, so the meaning carries over.
 */
export default function IconSystemColorMode(props: Props): React.ReactNode {
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
			<circle
				cx={C}
				cy={C}
				r={R_RING}
				stroke="currentColor"
				strokeWidth={RING_W}
			/>
			{/* Shadowed half: top to bottom the long way round the left rim. */}
			<path
				d={`M${C} ${C - R_FILL} A${R_FILL} ${R_FILL} 0 0 0 ${C} ${C + R_FILL} Z`}
				fill="currentColor"
			/>
		</svg>
	)
}

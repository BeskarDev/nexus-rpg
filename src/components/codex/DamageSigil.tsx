import React from 'react'
import SigilIcon from './SigilIcon'
import { DAMAGE_SIGIL, DAMAGE_TONE } from './damage-sigils'

export interface DamageSigilProps {
	/** A `DamageType` — `fire`, `frost`, `physical`, … */
	type: string
	/** Size of the square mark. A number is pixels; a string is a CSS length. */
	size?: number | string
	className?: string
}

/**
 * A damage type as its mark, inked in its identity hue (M13 S4c).
 *
 * ## The accessibility contract
 *
 * The codex law says a sigil may never *be* a label and must never be the only
 * carrier of meaning. This mark replaces the word **visually** and keeps it in
 * the accessibility tree: a `title` for pointer users and a visually-hidden span
 * for assistive technology. That is the same arrangement `DieToken` uses — shape
 * plus an `srOnly` full value — and it is not optional decoration on this
 * component. A consumer that renders the mark alone is breaking the rule this
 * exists to satisfy.
 *
 * The hue comes from `--cs-damage-*`, the text-safe mix of the M5 chip
 * identities: the same eleven hues a damage chip carries on a rules page, so a
 * frost weapon on the sheet and frost damage in the rules read as one colour.
 */
export default function DamageSigil({
	type,
	size = 15,
	className,
}: DamageSigilProps) {
	const mark = DAMAGE_SIGIL[type]
	// An unrecognised type keeps the word rather than rendering nothing — a
	// missing mark must not silently delete information.
	if (!mark) return <span className={className}>{type}</span>

	return (
		<span
			className={className}
			title={type}
			style={{
				display: 'inline-flex',
				alignItems: 'center',
				color: DAMAGE_TONE[type],
			}}
		>
			<SigilIcon name={mark} size={size} />
			<span
				style={{
					position: 'absolute',
					width: 1,
					height: 1,
					overflow: 'hidden',
					clip: 'rect(0 0 0 0)',
					clipPath: 'inset(50%)',
					whiteSpace: 'nowrap',
				}}
			>
				{type}
			</span>
		</span>
	)
}

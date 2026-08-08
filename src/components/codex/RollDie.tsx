import React, { useEffect, useRef, useState } from 'react'
import styles from './RollDie.module.css'

/** Pip positions per face, on the icon's 24-unit grid. */
const DIE_PIPS: Record<number, [number, number][]> = {
	1: [[12, 12]],
	2: [
		[8.5, 8],
		[15.5, 16],
	],
	3: [
		[8.5, 8],
		[12, 12],
		[15.5, 16],
	],
	4: [
		[8.5, 8],
		[15.5, 8],
		[8.5, 16],
		[15.5, 16],
	],
	5: [
		[8.5, 8],
		[15.5, 8],
		[12, 12],
		[8.5, 16],
		[15.5, 16],
	],
	6: [
		[8.5, 8],
		[15.5, 8],
		[8.5, 12],
		[15.5, 12],
		[8.5, 16],
		[15.5, 16],
	],
}

export function DieIcon({ face, size = 15 }: { face: number; size?: number }) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<rect x={3.5} y={3.5} width={17} height={17} rx={2.5} strokeWidth={1.5} />
			<g fill="currentColor" stroke="none">
				{(DIE_PIPS[face] ?? DIE_PIPS[6]).map(([cx, cy]) => (
					<circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={1.35} />
				))}
			</g>
		</svg>
	)
}

/** The tumble's cadence, easing out so it slows INTO its answer. */
const STEPS = [0, 70, 140, 210, 285, 370, 470]

export interface RollDieProps {
	/** Called once, with nothing, when the tumble finishes. */
	onRoll: () => void
	/** What this die rolls, for the tooltip and the accessible name. */
	label: string
	/** Pixel size of the pip face. */
	size?: number
	/** Extra classes for the button, so a surface can size its own plate. */
	className?: string
	children?: React.ReactNode
}

/**
 * A die you press, which tumbles and then answers (M14 S2, owner review).
 *
 * ## Where this came from
 *
 * `TreasureTable` on the creature card had it first: a drawn pip die that shuffles
 * faces on an easing-out cadence, so the roll visibly slows into its result rather
 * than stopping dead. The owner asked for the oracle's roll control to be the same
 * thing, which is the right call for a second reason: the random-table pages show
 * BOTH controls — the oracle at the top and `RollableTable`'s own button inside
 * every fold — and two roll buttons that behave differently on one page is two
 * vocabularies for one act.
 *
 * So the behaviour is here now, and the creature card, the oracle and the rollable
 * tables all press the same die.
 *
 * ## What the motion is for, and when it does not happen
 *
 * A rolled answer that simply appears has been *computed*. The tumble is what
 * makes it *rolled* — and it is the only place in this theme where motion carries
 * meaning rather than decoration, which is why it survives the flat-and-still rule.
 *
 * It never repeats a face between steps, because a repeat reads as a dropped frame
 * rather than as a tumble. And someone who has asked for less motion gets the
 * answer without the theatre: `prefers-reduced-motion` skips straight to the
 * result, which is a different code path rather than a shorter animation.
 */
export const RollDie: React.FC<RollDieProps> = ({
	onRoll,
	label,
	size = 15,
	className,
	children,
}) => {
	const [face, setFace] = useState(6)
	const [rolling, setRolling] = useState(false)
	const timers = useRef<ReturnType<typeof setTimeout>[]>([])

	// Clear any pending shuffle if the surface unmounts mid-roll.
	useEffect(() => () => timers.current.forEach(clearTimeout), [])

	const roll = () => {
		if (rolling) return
		const settled = 1 + Math.floor(Math.random() * 6)
		const reduced =
			typeof window !== 'undefined' &&
			window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
		if (reduced) {
			setFace(settled)
			onRoll()
			return
		}
		setRolling(true)
		timers.current = STEPS.map((delay, index) =>
			setTimeout(() => {
				if (index < STEPS.length - 1) {
					setFace((current) => {
						let next = current
						while (next === current) next = 1 + Math.floor(Math.random() * 6)
						return next
					})
					return
				}
				setFace(settled)
				setRolling(false)
				onRoll()
			}, delay),
		)
	}

	return (
		<button
			type="button"
			className={[styles.roll, rolling ? styles.rolling : '', className ?? '']
				.filter(Boolean)
				.join(' ')}
			onClick={roll}
			disabled={rolling}
			title={label}
			aria-label={label}
		>
			<DieIcon face={face} size={size} />
			{children}
		</button>
	)
}

export default RollDie

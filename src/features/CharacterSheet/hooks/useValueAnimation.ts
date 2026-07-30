import { useEffect, useState } from 'react'
import type { SxProps, Theme } from '@mui/material'

export type ValueAnimation = 'none' | 'damage' | 'healing'

/** How long a hit or a heal reads for. */
const DURATION_MS = 600

/**
 * The shake-on-damage / pulse-on-heal flourish the gauge cards use (M9 S11).
 *
 * `HpCard` and `FocusCard` each declared the same `'none' | 'damage' | 'healing'`
 * state, the same 600ms cleanup effect, and the same two `@keyframes` blocks
 * inline in an `sx` prop — roughly 25 duplicated lines apiece, including two
 * copies of the keyframe definitions themselves.
 *
 * Returns the `sx` rather than a class so it composes with each card's own value
 * typography, which still differs (HP appends a temp-HP suffix, Focus tints the
 * whole numeral by fill level).
 */
export function useValueAnimation() {
	const [state, setState] = useState<ValueAnimation>('none')

	useEffect(() => {
		if (state === 'none') return
		const timer = setTimeout(() => setState('none'), DURATION_MS)
		return () => clearTimeout(timer)
	}, [state])

	const sx: SxProps<Theme> = {
		transition: 'all 0.3s ease-in-out',
		...(state === 'damage' && { animation: 'sheet-shake 0.5s ease-in-out' }),
		...(state === 'healing' && { animation: 'sheet-pulse 0.5s ease-in-out' }),
		'@keyframes sheet-shake': {
			'0%, 100%': { transform: 'translateX(0)' },
			'25%': { transform: 'translateX(-2px)' },
			'75%': { transform: 'translateX(2px)' },
		},
		'@keyframes sheet-pulse': {
			'0%, 100%': { transform: 'scale(1)' },
			'50%': { transform: 'scale(1.1)' },
		},
	}

	return { state, setState, sx }
}

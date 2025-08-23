import { useState, useCallback, useEffect } from 'react'

export type AnimationState = 'none' | 'damage' | 'healing' | 'tempHp'

export interface UseResourceFieldProps {
	current: number
	max: number
	temp?: number
	onChange: (newCurrent: number, newTemp?: number) => void
}

export interface UseResourceFieldReturn {
	adjustmentAmount: number
	setAdjustmentAmount: (amount: number) => void
	animationState: AnimationState
	applyDamage: (amount: number) => void
	applyHealing: (amount: number) => void
	applyTempResource: (amount: number) => void
	percentage: number
	effectiveMax: number
	totalDisplay: number
}

export const useResourceField = ({
	current,
	max,
	temp = 0,
	onChange,
}: UseResourceFieldProps): UseResourceFieldReturn => {
	const [adjustmentAmount, setAdjustmentAmount] = useState<number>(0)
	const [animationState, setAnimationState] = useState<AnimationState>('none')

	const effectiveMax = max
	const totalDisplay = effectiveMax + temp
	const percentage = effectiveMax > 0 ? (current / effectiveMax) * 100 : 0

	const applyDamage = useCallback(
		(amount: number) => {
			const newCurrent = Math.max(0, current - amount)
			onChange(newCurrent, temp)
			setAnimationState('damage')
			setTimeout(() => setAnimationState('none'), 1000)
		},
		[current, temp, onChange],
	)

	const applyHealing = useCallback(
		(amount: number) => {
			const newCurrent = Math.min(effectiveMax, current + amount)
			onChange(newCurrent, temp)
			setAnimationState('healing')
			setTimeout(() => setAnimationState('none'), 1000)
		},
		[current, effectiveMax, temp, onChange],
	)

	const applyTempResource = useCallback(
		(amount: number) => {
			const newTemp = Math.max(0, temp + amount)
			onChange(current, newTemp)
			setAnimationState('tempHp')
			setTimeout(() => setAnimationState('none'), 1000)
		},
		[current, temp, onChange],
	)

	return {
		adjustmentAmount,
		setAdjustmentAmount,
		animationState,
		applyDamage,
		applyHealing,
		applyTempResource,
		percentage,
		effectiveMax,
		totalDisplay,
	}
}
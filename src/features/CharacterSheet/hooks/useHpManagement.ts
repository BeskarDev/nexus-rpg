import { useState, useEffect, useMemo } from 'react'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { calculateMaxHp } from '../utils/calculateHp'
import { calculateCharacterLevel } from '../utils/calculateCharacterLevel'

export type AnimationState = 'none' | 'damage' | 'healing' | 'tempHp'

interface UseHpManagementProps {
	activeCharacter: CharacterDocument
	updateCharacter: (update: DeepPartial<CharacterDocument>) => void
}

export const useHpManagement = ({
	activeCharacter,
	updateCharacter,
}: UseHpManagementProps) => {
	const [damageHealAmount, setDamageHealAmount] = useState<number>(0)
	const [woundHelperText, setWoundHelperText] = useState<string>('')
	const [animationState, setAnimationState] = useState<AnimationState>('none')

	const { health, fatigue, strength } = activeCharacter.statistics
	const totalXp = activeCharacter.skills.xp.total
	const characterLevel = calculateCharacterLevel(totalXp)

	// Calculate max HP using the formula
	const maxHp = useMemo(() => {
		return calculateMaxHp(strength.value, totalXp, health.maxHpModifier || 0)
	}, [strength.value, totalXp, health.maxHpModifier])

	// Calculate effective max HP (minus fatigue penalty)
	const fatigueHpPenalty = (fatigue?.current || 0) * 2
	const effectiveMaxHp = maxHp - fatigueHpPenalty

	// Calculate HP bar metrics
	const totalDisplayHp = effectiveMaxHp + (health.temp || 0)
	const hpPercentage = effectiveMaxHp > 0 ? (health.current / effectiveMaxHp) * 100 : 0

	const getHpColor = () => {
		if (hpPercentage >= 50) return 'success'
		if (hpPercentage >= 20) return 'warning'
		return 'error'
	}

	// Calculate proportional widths for static bar length (120px total)
	const mainHpBarWidth = totalDisplayHp > 0 ? (effectiveMaxHp / totalDisplayHp) * 120 : 120
	const tempHpBarWidth = totalDisplayHp > 0 ? ((health.temp || 0) / totalDisplayHp) * 120 : 0

	// Animation effect cleanup
	useEffect(() => {
		if (animationState !== 'none') {
			const timer = setTimeout(() => {
				setAnimationState('none')
			}, 600) // Animation duration
			return () => clearTimeout(timer)
		}
	}, [animationState])

	// HP manipulation functions
	const dealDamage = (amount: number) => {
		const currentHp = health.current
		const tempHp = health.temp || 0
		
		let remainingDamage = amount
		let newTempHp = tempHp
		let newCurrentHp = currentHp

		// First, damage temp HP
		if (tempHp > 0 && remainingDamage > 0) {
			const tempDamage = Math.min(tempHp, remainingDamage)
			newTempHp = tempHp - tempDamage
			remainingDamage -= tempDamage
		}

		// Then damage current HP
		if (remainingDamage > 0) {
			newCurrentHp = Math.max(0, currentHp - remainingDamage)
		}

		updateCharacter({
			statistics: {
				health: {
					current: newCurrentHp,
					temp: newTempHp,
				},
			},
		})

		setAnimationState('damage')
	}

	const healDamage = (amount: number) => {
		const newCurrentHp = Math.min(effectiveMaxHp, health.current + amount)
		
		updateCharacter({
			statistics: {
				health: {
					current: newCurrentHp,
				},
			},
		})

		setAnimationState('healing')
	}

	const addTempHp = (amount: number) => {
		const newTempHp = Math.max(0, (health.temp || 0) + amount)
		
		updateCharacter({
			statistics: {
				health: {
					temp: newTempHp,
				},
			},
		})

		setAnimationState('tempHp')
	}

	const setCurrentHp = (amount: number) => {
		const newCurrentHp = Math.max(0, Math.min(effectiveMaxHp, amount))
		
		updateCharacter({
			statistics: {
				health: {
					current: newCurrentHp,
				},
			},
		})
	}

	const updateWounds = (wounds: number) => {
		updateCharacter({
			statistics: {
				health: {
					wounds: Math.max(0, wounds),
				},
			},
		})
	}

	return {
		// State
		damageHealAmount,
		setDamageHealAmount,
		woundHelperText,
		setWoundHelperText,
		animationState,
		setAnimationState,

		// Calculated values
		maxHp,
		effectiveMaxHp,
		fatigueHpPenalty,
		totalDisplayHp,
		hpPercentage,
		characterLevel,
		mainHpBarWidth,
		tempHpBarWidth,

		// Functions
		getHpColor,
		dealDamage,
		healDamage,
		addTempHp,
		setCurrentHp,
		updateWounds,
	}
}
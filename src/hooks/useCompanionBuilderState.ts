import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CompanionBuilderRootState } from '../features/CompanionBuilder/store'
import { calculateStats } from '../utils/companionCalculations'
import { CompanionStats } from '../types/companion'

export const useCompanionBuilderState = () => {
	const state = useSelector(
		(state: CompanionBuilderRootState) => state.companionBuilder
	)

	const builtCompanion: CompanionStats | null = useMemo(() => {
		if (!state.trait || !state.size) {
			return null
		}

		const calculatedStats = calculateStats(state.tier, state.size, state.trait)
		
		return {
			tier: state.tier,
			size: state.size,
			trait: state.trait,
			calculatedStats,
		}
	}, [state.tier, state.size, state.trait])

	return { state, builtCompanion }
}

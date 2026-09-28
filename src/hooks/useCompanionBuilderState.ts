import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CompanionBuilderRootState } from '../features/CompanionBuilder/store'
import { companionMarkdown } from '../utils/typescript/companion/companionBuild'
import { CompanionStats } from '../types/companion'

export const useCompanionBuilderState = () => {
	const state = useSelector(
		(state: CompanionBuilderRootState) => state.companionBuilder,
	)

	/*
		`companionMarkdown` is the one path from choices to a stat block. A row's
		Rebuild and the tab's Refresh use it too, so the builder can never show a
		block the refresh would then call out of date.
	*/
	const built = useMemo(() => {
		if (!state.trait || !state.size) return null
		return companionMarkdown(state.tier, state.size, state.trait, state.bond)
	}, [state.tier, state.size, state.trait, state.bond])

	const builtCompanion: CompanionStats | null = built?.stats ?? null
	const markdown = built?.markdown ?? ''

	return { state, builtCompanion, markdown }
}

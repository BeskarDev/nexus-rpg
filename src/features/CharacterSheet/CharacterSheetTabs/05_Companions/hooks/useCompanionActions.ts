import { useCallback } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { characterSheetActions } from '../../../characterSheetReducer'
import { Companion } from '../../../../../types/Character'
import { extractHPFromMarkdown } from '../utils/hpExtractor'

export const useCompanionActions = () => {
	const dispatch = useAppDispatch()

	const addCompanion = useCallback(() => {
		const newCompanionId = Date.now().toString()
		dispatch(characterSheetActions.addNewCompanion())
		return newCompanionId
	}, [dispatch])

	const deleteCompanion = useCallback((companionId: string, companions: Companion[]) => {
		const companion = companions.find((c) => c.id === companionId)
		if (companion) {
			dispatch(characterSheetActions.deleteCompanion(companion))
		}
	}, [dispatch])

	const updateCompanion = useCallback((id: string, updates: Partial<Companion>) => {
		dispatch(
			characterSheetActions.updateCompanion({
				id,
				updates,
			}),
		)
	}, [dispatch])

	const updateCompanionWithAutoHP = useCallback((
		id: string, 
		updates: { name: string; markdown: string },
		currentHP?: number
	) => {
		// First update the basic fields
		updateCompanion(id, updates)
		
		// Then auto-fill HP from markdown if available
		if (updates.markdown) {
			const extractedHP = extractHPFromMarkdown(updates.markdown)
			if (extractedHP !== null) {
				// Small delay to ensure the markdown update is processed first
				setTimeout(() => {
					updateCompanion(id, {
						maxHP: extractedHP,
						currentHP: currentHP || extractedHP
					})
				}, 100)
			}
		}
	}, [updateCompanion])

	const reorderCompanions = useCallback((source: number, destination: number) => {
		dispatch(
			characterSheetActions.reorderCompanion({
				source,
				destination,
			}),
		)
	}, [dispatch])

	return {
		addCompanion,
		deleteCompanion,
		updateCompanion,
		updateCompanionWithAutoHP,
		reorderCompanions,
	}
}

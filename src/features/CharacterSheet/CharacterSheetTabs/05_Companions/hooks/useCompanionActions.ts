import { useCallback } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { characterSheetActions } from '../../../characterSheetReducer'
import { Companion } from '../../../../../types/Character'
import { extractHPFromMarkdown } from '../utils/hpExtractor'
import { applyCompanionBuild } from '../utils/companionUpdates'
import type {
	CompanionBuild,
	CompanionBuildResult,
} from '../../../../../types/companion'

export const useCompanionActions = () => {
	const dispatch = useAppDispatch()

	const addCompanion = useCallback(() => {
		const newCompanionId = Date.now().toString()
		dispatch(characterSheetActions.addNewCompanion())
		return newCompanionId
	}, [dispatch])

	const deleteCompanion = useCallback(
		(companionId: string, companions: Companion[]) => {
			const companion = companions.find((c) => c.id === companionId)
			if (companion) {
				dispatch(characterSheetActions.deleteCompanion(companion))
			}
		},
		[dispatch],
	)

	const updateCompanion = useCallback(
		(id: string, updates: Partial<Companion>) => {
			dispatch(
				characterSheetActions.updateCompanion({
					id,
					updates,
				}),
			)
		},
		[dispatch],
	)

	const updateCompanionWithAutoHP = useCallback(
		(
			// `Partial<Companion>` since M13 S7: the row commits ONE field on blur, so it
			// arrives with a markdown and no name (or vice versa). The old signature
			// demanded both because the edit mode it served saved both at once.
			id: string,
			updates: Partial<Companion>,
			currentHP?: number,
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
							currentHP: currentHP || extractedHP,
						})
					}, 100)
				}
			}
		},
		[updateCompanion],
	)

	/** A companion from the Companion Builder, with its build, at full HP. */
	const importCompanion = useCallback(
		(name: string, markdown: string, build: CompanionBuild) => {
			dispatch(
				characterSheetActions.importCompanion({
					name,
					markdown,
					maxHP: extractHPFromMarkdown(markdown) ?? 0,
					build,
				}),
			)
		},
		[dispatch],
	)

	/**
	 * Replace a companion's stat block with a rebuilt one (Rebuild or Refresh).
	 * Keeps the id, the player's name and the wounds, clamps current HP.
	 */
	const applyCompanionRebuild = useCallback(
		(companion: Companion, result: CompanionBuildResult) => {
			const next = applyCompanionBuild(companion, result)
			updateCompanion(companion.id, {
				markdown: next.markdown,
				build: next.build,
				maxHP: next.maxHP,
				currentHP: next.currentHP,
			})
		},
		[updateCompanion],
	)

	const reorderCompanions = useCallback(
		(source: number, destination: number) => {
			dispatch(
				characterSheetActions.reorderCompanion({
					source,
					destination,
				}),
			)
		},
		[dispatch],
	)

	return {
		addCompanion,
		deleteCompanion,
		updateCompanion,
		updateCompanionWithAutoHP,
		importCompanion,
		applyCompanionRebuild,
		reorderCompanions,
	}
}

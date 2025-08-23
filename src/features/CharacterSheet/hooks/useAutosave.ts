import { useEffect, useRef } from 'react'
import { useAppDispatch } from './useAppDispatch'
import { characterSheetActions } from '../characterSheetReducer'

export interface UseAutosaveProps {
	activeCharacterId?: string
	hasUser: boolean
	unsavedChanges: boolean
	saveTimeout: boolean
	autosave: boolean
	onSave: () => Promise<void>
	delay?: number
}

export const useAutosave = ({
	activeCharacterId,
	hasUser,
	unsavedChanges,
	saveTimeout,
	autosave,
	onSave,
	delay = 1000,
}: UseAutosaveProps) => {
	const dispatch = useAppDispatch()
	const timeoutRef = useRef<NodeJS.Timeout>()

	// Set save timeout when unsaved changes occur
	useEffect(() => {
		if (
			activeCharacterId &&
			hasUser &&
			unsavedChanges &&
			!saveTimeout
		) {
			dispatch(characterSheetActions.setSaveTimeout(true))
			timeoutRef.current = setTimeout(() => {
				dispatch(characterSheetActions.setAutosave(true))
			}, delay)
		}

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [unsavedChanges, activeCharacterId, hasUser, saveTimeout, dispatch, delay])

	// Execute save when autosave is triggered
	useEffect(() => {
		if (
			activeCharacterId &&
			hasUser &&
			unsavedChanges &&
			autosave
		) {
			console.log('auto save in progress')
			onSave()
			dispatch(characterSheetActions.setAutosave(false))
			dispatch(characterSheetActions.setSaveTimeout(false))
		}
	}, [autosave, activeCharacterId, hasUser, unsavedChanges, onSave, dispatch])
}
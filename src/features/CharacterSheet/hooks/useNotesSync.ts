import { useState, useEffect, useRef, useCallback } from 'react'
import { onSnapshot, Unsubscribe } from 'firebase/firestore'
import { PartyInfo } from '@site/src/types/Party'
import { PartyService } from '../services/PartyService'
import { MigrationService } from '../services/MigrationService'

export interface UseNotesSync {
	notes: string
	setNotes: (notes: string) => void
	originalNotes: string
	isLoading: boolean
	error: string | null
	isSaving: boolean
	hasUnsavedChanges: boolean
	hasServerChanges: boolean
	partyInfo: PartyInfo | null
	migrationInProgress: boolean
	saveNotes: () => Promise<void>
	refreshFromServer: () => void
	showConflictDialog: boolean
	setShowConflictDialog: (show: boolean) => void
	conflictNotes: string
	resolveConflict: (useServer: boolean) => void
}

export const useNotesSync = (
	userId: string | undefined,
	characterId: string,
): UseNotesSync => {
	const [partyInfo, setPartyInfo] = useState<PartyInfo | null>(null)
	const [notes, setNotes] = useState('')
	const [originalNotes, setOriginalNotes] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [migrationInProgress, setMigrationInProgress] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [showConflictDialog, setShowConflictDialog] = useState(false)
	const [conflictNotes, setConflictNotes] = useState('')

	const notesRef = useRef(notes)
	const originalNotesRef = useRef(originalNotes)

	useEffect(() => {
		notesRef.current = notes
	}, [notes])

	useEffect(() => {
		originalNotesRef.current = originalNotes
	}, [originalNotes])

	const hasUnsavedChanges = notes !== originalNotes
	const hasServerChanges = partyInfo
		? partyInfo.party.notes !== originalNotes
		: false

	const saveNotes = useCallback(async () => {
		if (!partyInfo || !userId || isSaving) return

		setIsSaving(true)
		setError(null)

		try {
			await PartyService.updatePartyNotes(partyInfo.party.id, notes)
			setOriginalNotes(notes)
		} catch (error) {
			console.error('Error saving notes:', error)
			setError('Failed to save notes. Please try again.')
		} finally {
			setIsSaving(false)
		}
	}, [partyInfo, userId, notes, isSaving])

	const refreshFromServer = useCallback(() => {
		if (partyInfo?.party.notes) {
			setNotes(partyInfo.party.notes)
			setOriginalNotes(partyInfo.party.notes)
		}
	}, [partyInfo])

	const resolveConflict = useCallback(
		(useServer: boolean) => {
			if (useServer && partyInfo?.party.notes) {
				setNotes(partyInfo.party.notes)
				setOriginalNotes(partyInfo.party.notes)
			}
			setShowConflictDialog(false)
		},
		[partyInfo],
	)

	useEffect(() => {
		let unsubscribe: Unsubscribe | null = null

		const setupPartySubscription = async () => {
			if (!userId || !characterId) {
				setIsLoading(false)
				return
			}

			try {
				setIsLoading(true)

				// Check if migration is needed
				const needsMigration = await MigrationService.isMigrationNeeded()
				if (needsMigration) {
					setMigrationInProgress(true)
					try {
						await MigrationService.migrateSharedNotesToParties()
					} catch (migrationError) {
						console.error('Migration failed:', migrationError)
						setError('Migration failed. Please contact support.')
						setIsLoading(false)
						return
					} finally {
						setMigrationInProgress(false)
					}
				}

				// Get or create party for character
				const party = await PartyService.getOrCreatePartyForCharacter(
					characterId,
					userId,
				)

				// Set up real-time subscription
				unsubscribe = onSnapshot(
					PartyService.getPartyDocRef(party.id),
					(doc) => {
						if (doc.exists()) {
							const updatedParty = { id: doc.id, ...doc.data() } as PartyInfo['party']
							const newPartyInfo: PartyInfo = { party: updatedParty }
							setPartyInfo(newPartyInfo)

							// Check for conflicts
							if (originalNotesRef.current !== updatedParty.notes) {
								if (notesRef.current !== originalNotesRef.current) {
									// Both local and server have changes - show conflict dialog
									setConflictNotes(updatedParty.notes)
									setShowConflictDialog(true)
								} else {
									// Only server has changes - auto-update
									setNotes(updatedParty.notes)
									setOriginalNotes(updatedParty.notes)
								}
							}
						}
					},
					(error) => {
						console.error('Error in party subscription:', error)
						setError('Connection error. Please check your internet connection.')
					},
				)
			} catch (error) {
				console.error('Error setting up party subscription:', error)
				setError('Failed to load party data. Please try again.')
			} finally {
				setIsLoading(false)
			}
		}

		setupPartySubscription()

		return () => {
			if (unsubscribe) {
				unsubscribe()
			}
		}
	}, [userId, characterId])

	return {
		notes,
		setNotes,
		originalNotes,
		isLoading,
		error,
		isSaving,
		hasUnsavedChanges,
		hasServerChanges,
		partyInfo,
		migrationInProgress,
		saveNotes,
		refreshFromServer,
		showConflictDialog,
		setShowConflictDialog,
		conflictNotes,
		resolveConflict,
	}
}
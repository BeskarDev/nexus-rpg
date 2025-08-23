import { useColorMode } from '@docusaurus/theme-common'
import { Save, Warning, Refresh } from '@mui/icons-material'
import {
	Box,
	CircularProgress,
	IconButton,
	TextField,
	Typography,
	Alert,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Tooltip,
} from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import {
	collection,
	getDocs,
	query,
	where,
	onSnapshot,
	Unsubscribe,
} from 'firebase/firestore'
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useDeviceSize } from '../../utils/useDeviceSize'
import { PartyService } from '../../services/PartyService'
import { MigrationService } from '../../services/MigrationService'
import { PartyInfo } from '@site/src/types/Party'
import { PartyManagement } from './components/PartyManagement'

export const SharedNotes: React.FC = () => {
	const { currentUser } = useAuth()
	const { isMobile } = useDeviceSize()

	const [partyInfo, setPartyInfo] = useState<PartyInfo | null>(null)
	const [notes, setNotes] = useState('')
	const [originalNotes, setOriginalNotes] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [migrationInProgress, setMigrationInProgress] = useState(false)
	const [partyLoading, setPartyLoading] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [showConflictDialog, setShowConflictDialog] = useState(false)
	const [conflictNotes, setConflictNotes] = useState('')
	const [showRefreshDialog, setShowRefreshDialog] = useState(false)

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

	const activeCharacter = useAppSelector(
		(state) => state.characterSheet.activeCharacter,
	)

	const characterId = activeCharacter
		? `${activeCharacter.collectionId}-${activeCharacter.docId}`
		: ''

	useEffect(() => {
		let unsubscribe: Unsubscribe | null = null

		const setupPartySubscription = async () => {
			if (!currentUser || !characterId) {
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

				const initialPartyInfo =
					await PartyService.getPartyByCharacterId(characterId)
				if (initialPartyInfo) {
					setPartyInfo(initialPartyInfo)
					const initialNotes = initialPartyInfo.party.notes
					setNotes(initialNotes)
					setOriginalNotes(initialNotes)

					unsubscribe = PartyService.subscribeToParty(
						initialPartyInfo.party.id,
						(updatedPartyInfo) => {
							if (updatedPartyInfo) {
								setPartyInfo(updatedPartyInfo)
								if (notesRef.current === originalNotesRef.current) {
									setNotes(updatedPartyInfo.party.notes)
									setOriginalNotes(updatedPartyInfo.party.notes)
								}
							} else {
								setPartyInfo(null)
								setNotes('')
								setOriginalNotes('')
							}
						},
					)
				} else {
					setPartyInfo(null)
					setNotes('')
					setOriginalNotes('')
				}

				setError(null)
			} catch (err) {
				console.error('Error setting up party:', err)
				setError('Failed to load party information')
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
	}, [currentUser, characterId])

	// Update notes locally (no auto-save)
	const updateNotes = useCallback((newNotes: string) => {
		setNotes(newNotes)
	}, [])

	// Manual save function with conflict detection
	const saveNotes = useCallback(async () => {
		if (!partyInfo || !hasUnsavedChanges) return

		// Check if notes have been modified by someone else while we were editing
		if (partyInfo.party.notes !== originalNotes) {
			// Conflict detected - show confirmation dialog
			setConflictNotes(partyInfo.party.notes)
			setShowConflictDialog(true)
			return
		}

		// No conflict - save directly
		await performSave()
	}, [partyInfo, hasUnsavedChanges, originalNotes, notes])

	// Perform the actual save operation
	const performSave = useCallback(async () => {
		if (!partyInfo) return

		setIsSaving(true)
		try {
			await PartyService.updatePartyNotes(partyInfo.party.id, notes)
			// Update original notes to match what we just saved
			setOriginalNotes(notes)
			setError(null)
		} catch (error) {
			console.error('Failed to save notes:', error)
			setError('Failed to save notes')
		} finally {
			setIsSaving(false)
		}
	}, [partyInfo, notes])

	// Handle conflict resolution
	const handleConflictResolution = useCallback(
		async (overwrite: boolean) => {
			setShowConflictDialog(false)

			if (overwrite) {
				// User chose to overwrite - save their changes
				await performSave()
			} else {
				// User chose to cancel - keep their local edits and don't save
				// Do nothing - local state remains unchanged
			}
			setConflictNotes('')
		},
		[conflictNotes, performSave],
	)

	// Handle refresh notes from server
	const refreshNotes = useCallback(() => {
		if (!partyInfo) return

		if (hasUnsavedChanges) {
			// Show confirmation dialog if there are unsaved changes
			setShowRefreshDialog(true)
		} else {
			// No unsaved changes, refresh immediately
			performRefresh()
		}
	}, [partyInfo, hasUnsavedChanges])

	// Perform the actual refresh operation
	const performRefresh = useCallback(() => {
		if (!partyInfo) return

		const serverNotes = partyInfo.party.notes
		setNotes(serverNotes)
		setOriginalNotes(serverNotes)
		setShowRefreshDialog(false)
	}, [partyInfo])

	// Handle refresh confirmation
	const handleRefreshConfirmation = useCallback(
		(confirm: boolean) => {
			if (confirm) {
				performRefresh()
			} else {
				setShowRefreshDialog(false)
			}
		},
		[performRefresh],
	)

	// Party management handlers
	const handleCreateParty = async (name: string) => {
		if (!currentUser || !characterId) return

		setPartyLoading(true)
		try {
			const partyId = await PartyService.createParty(
				name,
				characterId,
				currentUser.uid,
			)
			const newPartyInfo = await PartyService.getPartyInfo(partyId)
			setPartyInfo(newPartyInfo)
		} catch (error) {
			console.error('Failed to create party:', error)
			throw error
		} finally {
			setPartyLoading(false)
		}
	}

	const handleAddMember = async (newCharacterId: string) => {
		if (!partyInfo) return

		setPartyLoading(true)
		try {
			await PartyService.addCharacterToParty(partyInfo.party.id, newCharacterId)
		} catch (error) {
			console.error('Failed to add member:', error)
			throw error
		} finally {
			setPartyLoading(false)
		}
	}

	const handleRemoveMember = async (memberCharacterId: string) => {
		if (!partyInfo) return

		setPartyLoading(true)
		try {
			await PartyService.removeCharacterFromParty(
				partyInfo.party.id,
				memberCharacterId,
			)
		} catch (error) {
			console.error('Failed to remove member:', error)
			throw error
		} finally {
			setPartyLoading(false)
		}
	}

	const handleLeaveParty = async () => {
		if (!partyInfo || !characterId) return

		setPartyLoading(true)
		try {
			await PartyService.removeCharacterFromParty(
				partyInfo.party.id,
				characterId,
			)
			setPartyInfo(null)
			setNotes('')
			setOriginalNotes('')
		} catch (error) {
			console.error('Failed to leave party:', error)
			throw error
		} finally {
			setPartyLoading(false)
		}
	}

	const handleDeleteParty = async () => {
		if (!partyInfo || !characterId || !currentUser) {
			console.error(
				'Missing party info, character ID, or current user for deletion',
			)
			return
		}

		console.log('Attempting to delete party by removing character:', {
			partyId: partyInfo.party.id,
			characterId,
		})

		setPartyLoading(true)
		try {
			// When the last member leaves a party, it gets automatically deleted
			await PartyService.removeCharacterFromParty(
				partyInfo.party.id,
				characterId,
			)
			setPartyInfo(null)
			setNotes('')
			setOriginalNotes('')
		} catch (error) {
			console.error('Failed to delete party:', error)
			setError(
				error instanceof Error ? error.message : 'Failed to delete party',
			)
			throw error
		} finally {
			setPartyLoading(false)
		}
	}

	const handleUpdatePartyName = async (newName: string) => {
		if (!partyInfo) return

		setPartyLoading(true)
		try {
			await PartyService.updatePartyName(partyInfo.party.id, newName)
			// The real-time subscription will update partyInfo automatically
		} catch (error) {
			console.error('Failed to update party name:', error)
			throw error
		} finally {
			setPartyLoading(false)
		}
	}

	if (!currentUser) {
		return (
			<Alert severity="error">
				You must be logged in to access shared notes.
			</Alert>
		)
	}

	if (migrationInProgress) {
		return (
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
				<CircularProgress size={24} />
				<Typography>Migrating shared notes to new party system...</Typography>
			</Box>
		)
	}

	return (
		<>
			<Box
				sx={{
					position: isMobile ? 'sticky' : 'static',
					top: '164px',
					zIndex: isMobile ? 100 : 'auto',
					backgroundColor: 'var(--ifm-background-color)',
					display: 'flex',
					alignItems: 'center',
					gap: 1,
					width: '100%',
					maxWidth: { lg: 'unset', xl: '47rem' },
				}}
			>
				<SectionHeader>Shared Notes & Party</SectionHeader>
			</Box>

			{/* Party Management Section */}
			<PartyManagement
				characterId={characterId}
				partyInfo={partyInfo}
				onCreateParty={handleCreateParty}
				onAddMember={handleAddMember}
				onRemoveMember={handleRemoveMember}
				onLeaveParty={handleLeaveParty}
				onDeleteParty={handleDeleteParty}
				onUpdatePartyName={handleUpdatePartyName}
				loading={partyLoading || isLoading}
			/>

			{/* Notes Section */}
			{partyInfo ? (
				<>
					<Typography variant="h6" sx={{ mb: 1 }}>
						Party Notes
					</Typography>
					<Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
						Make your changes and click Save to share with party members.
					</Typography>
					<TextField
						disabled={isLoading}
						multiline
						minRows={15}
						maxRows={20}
						value={notes}
						onChange={(event) => updateNotes(event.target.value)}
						placeholder="Share notes with your party here..."
						sx={{
							maxWidth: '100%',
							'& textarea.Mui-disabled': {
								color: 'inherit',
								['-webkit-text-fill-color']: 'inherit',
							},
						}}
						fullWidth
					/>

					{/* Save Button and Status */}
					<Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
						<Button
							variant="contained"
							startIcon={isSaving ? <CircularProgress size={16} /> : <Save />}
							onClick={saveNotes}
							disabled={!hasUnsavedChanges || isSaving}
						>
							{isSaving ? 'Saving...' : 'Save Notes'}
						</Button>

						<Tooltip title="Refresh with latest notes from server">
							<IconButton
								onClick={refreshNotes}
								disabled={isSaving}
								color={hasServerChanges ? 'warning' : 'default'}
							>
								<Refresh />
							</IconButton>
						</Tooltip>

						{hasUnsavedChanges && !isSaving && (
							<Typography variant="caption" color="warning.main">
								You have unsaved changes
							</Typography>
						)}

						{!hasUnsavedChanges && hasServerChanges && !isSaving && (
							<Typography variant="caption" color="info.main">
								There are changes from others
							</Typography>
						)}

						{!hasUnsavedChanges && !hasServerChanges && !isSaving && (
							<Typography variant="caption" color="success.main">
								All changes saved
							</Typography>
						)}
					</Box>
				</>
			) : (
				<Alert severity="info" sx={{ mt: 2 }}>
					Create or join a party to access shared notes.
				</Alert>
			)}

			{/* Conflict Resolution Dialog */}
			<Dialog
				open={showConflictDialog}
				onClose={() => setShowConflictDialog(false)}
				maxWidth="md"
				fullWidth
			>
				<DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Warning color="warning" />
					Notes Conflict Detected
				</DialogTitle>
				<DialogContent>
					<Typography variant="body1" sx={{ mb: 2 }}>
						Someone else has modified the notes while you were editing. What
						would you like to do?
					</Typography>

					<Typography variant="h6" sx={{ mb: 1 }}>
						Your Version:
					</Typography>
					<TextField
						multiline
						rows={6}
						value={notes}
						fullWidth
						disabled
						sx={{ mb: 2 }}
					/>

					<Typography variant="h6" sx={{ mb: 1 }}>
						Server Version (Latest):
					</Typography>
					<TextField
						multiline
						rows={6}
						value={conflictNotes}
						fullWidth
						disabled
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => handleConflictResolution(false)}
						color="primary"
					>
						Cancel
					</Button>
					<Button
						onClick={() => handleConflictResolution(true)}
						variant="contained"
						color="warning"
					>
						Save Anyway
					</Button>
				</DialogActions>
			</Dialog>

			{/* Refresh Confirmation Dialog */}
			<Dialog
				open={showRefreshDialog}
				onClose={() => setShowRefreshDialog(false)}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>Refresh Notes</DialogTitle>
				<DialogContent>
					<Typography variant="body1">
						You have unsaved changes. Refreshing will discard your changes and
						load the latest version from the server. Are you sure?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => handleRefreshConfirmation(false)}
						color="primary"
					>
						Cancel
					</Button>
					<Button
						onClick={() => handleRefreshConfirmation(true)}
						variant="contained"
						color="warning"
					>
						Refresh Anyway
					</Button>
				</DialogActions>
			</Dialog>

			{error && (
				<Alert severity="error" sx={{ mt: 2 }}>
					{error}
				</Alert>
			)}
		</>
	)
}

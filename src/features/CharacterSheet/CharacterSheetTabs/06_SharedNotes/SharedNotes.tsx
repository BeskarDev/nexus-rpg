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
import { useAppSelector } from '../../hooks/useAppSelector'
import { useDeviceSize } from '../../utils/useDeviceSize'
import { logger } from '../../utils'
import { PartyService } from '../../services/PartyService'
import { MigrationService } from '../../services/MigrationService'
import { PartyInfo } from '@site/src/types/Party'
import { PartyManagement } from './components/PartyManagement'
import { createMockParty } from '@site/src/dev/mockData'
import { ListSection, RuleInfo } from '../../components'

export const SharedNotes: React.FC = () => {
	const { currentUser } = useAuth()
	const { isMobile } = useDeviceSize()

	const [partyInfo, setPartyInfo] = useState<PartyInfo | null>(null)
	const [notes, setNotes] = useState('') // Local notes that user is editing
	const [originalNotes, setOriginalNotes] = useState('') // Notes as they were when user started editing
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [migrationInProgress, setMigrationInProgress] = useState(false)
	const [partyLoading, setPartyLoading] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [showConflictDialog, setShowConflictDialog] = useState(false)
	const [conflictNotes, setConflictNotes] = useState('')
	const [showRefreshDialog, setShowRefreshDialog] = useState(false)

	// Use refs to track current state in the subscription callback
	const notesRef = useRef(notes)
	const originalNotesRef = useRef(originalNotes)

	// Update refs when state changes
	useEffect(() => {
		notesRef.current = notes
	}, [notes])

	useEffect(() => {
		originalNotesRef.current = originalNotes
	}, [originalNotes])

	// Derived state
	const hasUnsavedChanges = notes !== originalNotes
	const hasServerChanges = partyInfo
		? partyInfo.party.notes !== originalNotes
		: false

	const activeCharacter = useAppSelector(
		(state) => state.characterSheet.activeCharacter,
	)

	// Construct the proper character ID format that PartyService expects
	const characterId = activeCharacter
		? `${activeCharacter.collectionId}-${activeCharacter.docId}`
		: ''

	/**
	 * A MOCK character runs on a mock party (M13 S7, owner review round 2).
	 *
	 * The Party tab is the one surface whose content does not come from the character
	 * document: it lives in a `parties` document only Firestore has. So locally the tab showed
	 * the "create or join" branch and then failed once a subscription was attempted, and two of
	 * its three surfaces had never been visible in dev at all.
	 *
	 * The trigger is the CHARACTER, not the session. My first attempt gated on "no signed-in
	 * user", which fails the moment a developer is signed in on localhost — as the owner was —
	 * because then a mock character id gets looked up in a real `parties` collection where it
	 * can never appear. A `mock-collection-*` id is decisive: those characters exist only in
	 * `src/dev/mockData.ts`, so no real party can reference them, and a signed-in developer's
	 * REAL characters still take the live path.
	 *
	 * Host-gated the same way `dev/firebaseService.ts` gates its own mock data, so this cannot
	 * reach a deployed build even if `NODE_ENV` is wrong.
	 */
	const usingMockParty =
		process.env.NODE_ENV === 'development' &&
		typeof window !== 'undefined' &&
		(window.location.hostname === 'localhost' ||
			window.location.hostname === '127.0.0.1') &&
		characterId.startsWith('mock-collection-')

	// Real-time party subscription
	useEffect(() => {
		let unsubscribe: Unsubscribe | null = null

		const setupPartySubscription = async () => {
			if (usingMockParty) {
				const mock = createMockParty(characterId)
				setPartyInfo(mock)
				setNotes(mock.party.notes)
				setOriginalNotes(mock.party.notes)
				setIsLoading(false)
				return
			}
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
						logger.error('Migration failed', migrationError)
						setError('Migration failed. Please contact support.')
						setIsLoading(false)
						return
					} finally {
						setMigrationInProgress(false)
					}
				}

				// Get party for current character
				const initialPartyInfo =
					await PartyService.getPartyByCharacterId(characterId)
				if (initialPartyInfo) {
					setPartyInfo(initialPartyInfo)
					const initialNotes = initialPartyInfo.party.notes
					setNotes(initialNotes)
					setOriginalNotes(initialNotes)

					// Set up real-time subscription
					unsubscribe = PartyService.subscribeToParty(
						initialPartyInfo.party.id,
						(updatedPartyInfo) => {
							if (updatedPartyInfo) {
								setPartyInfo(updatedPartyInfo)
								// Only update local notes if user hasn't made any local changes
								// This prevents overwriting user's edits while they're typing
								if (notesRef.current === originalNotesRef.current) {
									// User hasn't made changes, safe to update both
									setNotes(updatedPartyInfo.party.notes)
									setOriginalNotes(updatedPartyInfo.party.notes)
								}
								// If user has unsaved changes, don't update their local state
								// but partyInfo.party.notes will reflect the server state for conflict detection
							} else {
								// Party was deleted
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
				logger.error('Error setting up party', err)
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
	}, [currentUser, characterId, usingMockParty])

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

		// The mock party has no document to write to, so "saving" is committing the draft
		// into the local party — which exercises exactly the states the strip reports.
		if (usingMockParty) {
			setPartyInfo({ ...partyInfo, party: { ...partyInfo.party, notes } })
			setOriginalNotes(notes)
			return
		}

		setIsSaving(true)
		try {
			await PartyService.updatePartyNotes(partyInfo.party.id, notes)
			// Update original notes to match what we just saved
			setOriginalNotes(notes)
			setError(null)
		} catch (error) {
			logger.error('Failed to save notes', error)
			setError('Failed to save notes')
		} finally {
			setIsSaving(false)
		}
	}, [partyInfo, notes, usingMockParty])

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
		if (usingMockParty) {
			const mock = createMockParty(characterId)
			setPartyInfo({ ...mock, party: { ...mock.party, name } })
			return
		}
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
			logger.error('Failed to create party', error)
			throw error
		} finally {
			setPartyLoading(false)
		}
	}

	const handleAddMember = async (newCharacterId: string) => {
		if (!partyInfo) return
		if (usingMockParty) {
			// A pasted id has no character behind it locally, so the invite lands as a
			// placeholder member — enough to see the row, the columns and the remove verb.
			setPartyInfo({
				...partyInfo,
				party: {
					...partyInfo.party,
					members: [...partyInfo.party.members, newCharacterId],
				},
				members: [
					...partyInfo.members,
					{
						characterId: newCharacterId,
						name: 'Invited adventurer',
						playerName: '—',
						folk: '—',
						background: '—',
						level: 1,
					},
				],
			})
			return
		}

		setPartyLoading(true)
		try {
			await PartyService.addCharacterToParty(partyInfo.party.id, newCharacterId)
		} catch (error) {
			logger.error('Failed to add member', error)
			throw error
		} finally {
			setPartyLoading(false)
		}
	}

	const handleRemoveMember = async (memberCharacterId: string) => {
		if (!partyInfo) return
		if (usingMockParty) {
			setPartyInfo({
				...partyInfo,
				party: {
					...partyInfo.party,
					members: partyInfo.party.members.filter(
						(id) => id !== memberCharacterId,
					),
				},
				members: partyInfo.members.filter(
					(member) => member.characterId !== memberCharacterId,
				),
			})
			return
		}

		setPartyLoading(true)
		try {
			await PartyService.removeCharacterFromParty(
				partyInfo.party.id,
				memberCharacterId,
			)
		} catch (error) {
			logger.error('Failed to remove member', error)
			throw error
		} finally {
			setPartyLoading(false)
		}
	}

	const handleLeaveParty = async () => {
		if (!partyInfo || !characterId) return
		if (usingMockParty) {
			setPartyInfo(null)
			setNotes('')
			setOriginalNotes('')
			return
		}

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
			logger.error('Failed to leave party', error)
			throw error
		} finally {
			setPartyLoading(false)
		}
	}

	const handleDeleteParty = async () => {
		if (usingMockParty) {
			setPartyInfo(null)
			setNotes('')
			setOriginalNotes('')
			return
		}
		if (!partyInfo || !characterId || !currentUser) {
			logger.error(
				'Missing party info, character ID, or current user for deletion',
			)
			return
		}

		logger.debug('Attempting to delete party by removing character', {
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
			logger.error('Failed to delete party', error)
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
		if (usingMockParty) {
			// No subscription to echo the write back locally, so the rename is applied here —
			// which is also what proves the band field's blur-commit works.
			setPartyInfo({
				...partyInfo,
				party: { ...partyInfo.party, name: newName },
			})
			return
		}

		setPartyLoading(true)
		try {
			await PartyService.updatePartyName(partyInfo.party.id, newName)
			// The real-time subscription will update partyInfo automatically
		} catch (error) {
			logger.error('Failed to update party name', error)
			throw error
		} finally {
			setPartyLoading(false)
		}
	}

	/**
	 * THE actual reason the tab was unreachable locally (owner review round 2).
	 *
	 * This guard returned a Material error alert whenever there was no signed-in user, before
	 * any of the mock-party work below could run — so the tab said "you must be logged in" and
	 * nothing else, whichever debug character was loaded. Adding a dev fixture behind a guard
	 * that returns first fixes nothing, which is what my first attempt did.
	 *
	 * A mock character passes; everything else still needs a session, because a real party is a
	 * real document. Also no longer a Material `Alert`: an empty state is a sentence on the
	 * stone, and this one is the sheet's only signed-out message.
	 */
	if (!currentUser && !usingMockParty) {
		return (
			<Box className="cs-empty-note">
				Sign in to share notes with a party. Your character sheet works either
				way.
			</Box>
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

	/**
	 * One state line rather than three mutually exclusive captions (M13 S7).
	 *
	 * The old version rendered three `Typography`s guarded by the same two booleans, in
	 * warning / info / success — which is three elements to say one thing, and it read as a
	 * legend rather than as a status.
	 */
	const noteState = isSaving
		? 'saving'
		: hasUnsavedChanges
			? 'unsaved'
			: hasServerChanges
				? 'behind'
				: 'saved'
	const noteStateLabel = {
		saving: 'Saving…',
		unsaved: 'Unsaved changes',
		behind: 'Someone else has saved since you loaded',
		saved: 'All changes saved',
	}[noteState]

	return (
		<>
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

			{/* M13 S7: the notes are a SECTION with its own control strip, not a heading
				plus a caption plus a contained button plus three status captions. The verbs
				are in the strip where every other list keeps them, and the state is one line
				rather than three mutually exclusive ones. */}
			{partyInfo ? (
				<ListSection
					label="Party Notes"
					collapsible
					defaultExpanded
					info={
						<RuleInfo label="About party notes">
							Everyone in the party edits the same page. Your changes are
							private until you save them, and the strip tells you when someone
							else has saved since you loaded.
						</RuleInfo>
					}
					actions={
						<>
							<Tooltip title="Fetch the latest notes from the party">
								<IconButton
									size="small"
									onClick={refreshNotes}
									disabled={isSaving}
									data-state={hasServerChanges ? 'on' : 'off'}
								>
									<Refresh fontSize="inherit" />
								</IconButton>
							</Tooltip>
							<Tooltip
								title={
									hasUnsavedChanges ? 'Share your changes' : 'Nothing to save'
								}
							>
								<span>
									{/* `data-state="pending"` drives the pulse in characterSheet.css.
										Party notes do not autosave — a write is shared, so it is deliberate —
										which makes "not saved yet" the one state on this sheet that earns an
										animation rather than only a colour. */}
									<IconButton
										size="small"
										onClick={saveNotes}
										disabled={!hasUnsavedChanges || isSaving}
										data-state={
											hasUnsavedChanges && !isSaving ? 'pending' : undefined
										}
										aria-label={
											hasUnsavedChanges
												? 'Save notes — you have unsaved changes'
												: 'Save notes'
										}
									>
										{isSaving ? (
											<CircularProgress size={13} />
										) : (
											<Save fontSize="inherit" />
										)}
									</IconButton>
								</span>
							</Tooltip>
						</>
					}
				>
					<Box className="cs-notes-state" data-state={noteState}>
						{noteStateLabel}
					</Box>
					<TextField
						className="cs-inscription cs-inscription--block"
						disabled={isLoading}
						multiline
						minRows={10}
						maxRows={24}
						value={notes}
						onChange={(event) => updateNotes(event.target.value)}
						placeholder="Share notes with your party here..."
						inputProps={{ 'aria-label': 'Party notes' }}
						sx={{
							width: '100%',
							m: 0,
							'& textarea.Mui-disabled': {
								color: 'inherit',
								WebkitTextFillColor: 'inherit',
							},
						}}
					/>
				</ListSection>
			) : (
				<Box className="cs-empty-note">
					Create or join a party to share notes with it.
				</Box>
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

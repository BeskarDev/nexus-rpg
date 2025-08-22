import { useColorMode } from '@docusaurus/theme-common'
import { Replay, Save } from '@mui/icons-material'
import {
	Box,
	CircularProgress,
	IconButton,
	TextField,
	Typography,
	Alert,
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
import React, { useEffect, useState, useCallback } from 'react'
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
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [migrationInProgress, setMigrationInProgress] = useState(false)
	const [partyLoading, setPartyLoading] = useState(false)

	const { docId: characterId } = useAppSelector(
		(state) => state.characterSheet.activeCharacter,
	)

	// Real-time party subscription
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

				// Get party for current character
				const initialPartyInfo = await PartyService.getPartyByCharacterId(characterId)
				if (initialPartyInfo) {
					setPartyInfo(initialPartyInfo)
					setNotes(initialPartyInfo.party.notes)
					
					// Set up real-time subscription
					unsubscribe = PartyService.subscribeToParty(
						initialPartyInfo.party.id,
						(updatedPartyInfo) => {
							if (updatedPartyInfo) {
								setPartyInfo(updatedPartyInfo)
								setNotes(updatedPartyInfo.party.notes)
							} else {
								// Party was deleted
								setPartyInfo(null)
								setNotes('')
							}
						}
					)
				} else {
					setPartyInfo(null)
					setNotes('')
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

	// Real-time notes update
	const updateNotes = useCallback(async (newNotes: string) => {
		setNotes(newNotes)
		
		if (partyInfo) {
			try {
				await PartyService.updatePartyNotes(partyInfo.party.id, newNotes)
			} catch (error) {
				console.error('Failed to update notes:', error)
				setError('Failed to save notes')
			}
		}
	}, [partyInfo])

	// Party management handlers
	const handleCreateParty = async (name: string) => {
		if (!currentUser || !characterId) return
		
		setPartyLoading(true)
		try {
			const partyId = await PartyService.createParty(name, characterId, currentUser.uid)
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
			await PartyService.removeCharacterFromParty(partyInfo.party.id, memberCharacterId)
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
			await PartyService.removeCharacterFromParty(partyInfo.party.id, characterId)
			setPartyInfo(null)
			setNotes('')
		} catch (error) {
			console.error('Failed to leave party:', error)
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
				loading={partyLoading || isLoading}
			/>

			{/* Notes Section */}
			{partyInfo ? (
				<>
					<Typography variant="h6" sx={{ mb: 1 }}>
						Party Notes
					</Typography>
					<Typography
						variant="caption"
						sx={{ mb: 1, display: 'block' }}
					>
						Notes update in real-time for all party members.
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
				</>
			) : (
				<Alert severity="info" sx={{ mt: 2 }}>
					Create or join a party to access shared notes.
				</Alert>
			)}

			{error && (
				<Alert severity="error" sx={{ mt: 2 }}>
					{error}
				</Alert>
			)}
		</>
	)
}

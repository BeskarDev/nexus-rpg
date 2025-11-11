import { Box, Typography } from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { Character, CharacterDocument } from '../../types/Character'
import { CharacterList, CharacterListSkeleton } from './CharacterList'
import { CharacterSheet } from './CharacterSheet'
import { CharacterSheetHeader } from './CharacterSheetHeader'
import { characterSheetActions } from './characterSheetReducer'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useAppSelector'
import { mapDocToCharacter } from './utils/mapDocToCharacter'
import { migrateDoc } from './utils/migrateDoc'
import { logger } from './utils'
import { firebaseService } from '../../dev/firebaseService'

const SAVE_CHARACTER_TIMEOUT = 1_000

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export const CharacterSheetContainer: React.FC = () => {
	const { userLoggedIn, currentUser, isAdmin, setIsAdmin, viewAsAdmin } =
		useAuth()
	const { activeCharacter, autosave, saveTimeout, unsavedChanges } =
		useAppSelector((state) => state.characterSheet)
	const dispatch = useAppDispatch()
	const [characters, setCharacters] = React.useState<CharacterDocument[]>([])
	const [allCharacters, setAllCharacters] = React.useState<CharacterDocument[]>(
		[],
	)
	const [loadingCharacters, setLoadingCharacters] = React.useState(true)

	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const idParam = urlParams.get('id')

	// Parse the ID parameter more carefully to handle mock data
	let collectionId: string | undefined
	let activeCharacterId: string | undefined

	if (idParam) {
		// For mock data format: "mock-collection-mock-character-1"
		// For production format: "collectionId-characterId"
		const parts = idParam.split('-')
		if (parts.length >= 2) {
			if (parts[0] === 'mock' && parts[1] === 'collection') {
				// Mock data case: "mock-collection-mock-character-1"
				collectionId = 'mock-collection'
				activeCharacterId = parts.slice(2).join('-') // "mock-character-1"
			} else {
				// Production case: "collectionId-characterId"
				collectionId = parts[0]
				activeCharacterId = parts.slice(1).join('-')
			}
		}
	}

	// Load characters when user is logged in (or in development mode)
	useEffect(() => {
		if (
			(userLoggedIn && currentUser) ||
			process.env.NODE_ENV === 'development'
		) {
			getDocuments()
		}
	}, [userLoggedIn, currentUser, activeCharacterId])

	// Filter characters based on viewAsAdmin toggle
	useEffect(() => {
		if (!isAdmin || !currentUser) return

		if (viewAsAdmin) {
			// Show all characters (admin view)
			setCharacters(allCharacters)
		} else {
			// Show only user's own characters (non-admin view)
			const userChars = allCharacters.filter(
				(char) => char.collectionId === currentUser.uid,
			)
			setCharacters(userChars)
		}
	}, [viewAsAdmin, isAdmin, currentUser, allCharacters])

	const getDocuments = async () => {
		setLoadingCharacters(true)
		try {
			const userUid = currentUser?.uid || 'dev-user'

			// Get user's collection
			const userChars = await firebaseService.getCollection(userUid)

			// Check for admin permissions and load additional collections
			const userInfo = await firebaseService.getUserInfo(userUid)
			setIsAdmin(Boolean(userInfo.allowedCollections.length))

			// Load additional collections if user has admin access
			if (userInfo.allowedCollections.length > 0) {
				const allChars = [...userChars]
				for (const adminCollectionId of userInfo.allowedCollections) {
					const adminChars =
						await firebaseService.getCollection(adminCollectionId)
					allChars.push(...adminChars)
				}
				setAllCharacters(allChars)
				setCharacters(allChars)
			} else {
				setAllCharacters(userChars)
				setCharacters(userChars)
			}
		} catch (error) {
			logger.error('Error fetching documents', error)
		} finally {
			setLoadingCharacters(false)
		}
	}

	const handleDeleteCharacter = async (char: CharacterDocument) => {
		await firebaseService.deleteDocument(char)
		setCharacters((chars) => chars.filter((c) => c.docId !== char.docId))
	}

	useEffect(() => {
		if (
			activeCharacterId &&
			(currentUser || process.env.NODE_ENV === 'development') &&
			unsavedChanges &&
			!saveTimeout
		) {
			dispatch(characterSheetActions.setSaveTimeout(true))
			setTimeout(() => {
				dispatch(characterSheetActions.setAutosave(true))
			}, SAVE_CHARACTER_TIMEOUT)
		}
	}, [unsavedChanges])

	useEffect(() => {
		if (
			activeCharacterId &&
			(currentUser || process.env.NODE_ENV === 'development') &&
			unsavedChanges &&
			autosave
		) {
			logger.debug('Auto save in progress')
			saveCharacter()
			dispatch(characterSheetActions.setAutosave(false))
			dispatch(characterSheetActions.setSaveTimeout(false))
		}
	}, [autosave])

	useEffect(() => {
		const fetchAndMigrateCharacter = async () => {
			if (
				collectionId &&
				activeCharacterId &&
				(currentUser || process.env.NODE_ENV === 'development') &&
				!activeCharacter
			) {
				// Try to get character from our service first
				let character = await firebaseService.getDocument(
					collectionId,
					activeCharacterId,
				)

				// If not found in service and we're in production, fall back to direct Firebase
				if (!character && process.env.NODE_ENV !== 'development') {
					const docSnapshot = await getDoc(
						doc(db, `${collectionId}/${activeCharacterId}`),
					)
					character = mapDocToCharacter(collectionId, docSnapshot)
					const migratedCharacter = await migrateDoc(collectionId, docSnapshot)

					if (JSON.stringify(character) !== JSON.stringify(migratedCharacter)) {
						logger.debug('Save migrated character', migratedCharacter)
						await updateDoc(migratedCharacter.docRef, {
							...migratedCharacter,
						} as Omit<Character, 'docRef' | 'docId'>)
					}

					character = migratedCharacter
				}

				if (character) {
					dispatch(characterSheetActions.setCharacter(character))
				}
			}
		}

		fetchAndMigrateCharacter()
	}, [collectionId, activeCharacterId, activeCharacter, currentUser])

	const saveCharacter = async () => {
		logger.debug('About to save character...')
		if (unsavedChanges) {
			dispatch(characterSheetActions.setLoadingSave(true))
			await firebaseService.updateDocument(activeCharacter)
			dispatch(characterSheetActions.setUnsavedChanges(false))
			dispatch(characterSheetActions.setLoadingSave(false))
		}
		logger.debug('Done saving character')
	}

	return (
		<>
			<CharacterSheetHeader
				activeCharacterId={activeCharacterId}
				saveCharacter={saveCharacter}
				characters={characters}
			/>
			{/* Show development notice when in development mode and not logged in */}
			{process.env.NODE_ENV === 'development' && !userLoggedIn && (
				<Box
					sx={{
						m: 2,
						p: 2,
						backgroundColor: 'rgba(255, 152, 0, 0.1)',
						border: '1px solid rgba(255, 152, 0, 0.5)',
						borderRadius: 1,
						textAlign: 'center',
					}}
				>
					<Typography variant="body2" color="orange">
						<strong>Development Mode:</strong> Using mock character data for
						testing. Login not required.
					</Typography>
				</Box>
			)}
			{!userLoggedIn && process.env.NODE_ENV !== 'development' && (
				<Box
					sx={{
						m: 5,
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<Typography variant="h6">Please log in first</Typography>
				</Box>
			)}
			{(userLoggedIn || process.env.NODE_ENV === 'development') &&
				!activeCharacterId &&
				(loadingCharacters ? (
					<CharacterListSkeleton adminView={isAdmin && viewAsAdmin} />
				) : (
					<CharacterList
						characters={characters}
						handleDeleteCharacter={handleDeleteCharacter}
					/>
				))}
			{(userLoggedIn || process.env.NODE_ENV === 'development') &&
				activeCharacterId &&
				activeCharacter && <CharacterSheet />}
		</>
	)
}

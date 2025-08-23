import { Box, Typography } from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { Character, CharacterDocument } from '../../types/Character'
import { CharacterList } from './CharacterList'
import { CharacterSheet } from './CharacterSheet'
import { CharacterSheetHeader } from './CharacterSheetHeader'
import { characterSheetActions } from './characterSheetReducer'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useAppSelector'
import { mapDocToCharacter } from './utils/mapDocToCharacter'
import { migrateDoc } from './utils/migrateDoc'
import { firebaseService } from '../../dev/firebaseService'

const SAVE_CHARACTER_TIMEOUT = 1_000

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export const CharacterSheetContainer: React.FC = () => {
	const { userLoggedIn, currentUser, isAdmin, setIsAdmin } = useAuth()
	const { activeCharacter, autosave, saveTimeout, unsavedChanges } =
		useAppSelector((state) => state.characterSheet)
	const dispatch = useAppDispatch()
	const [characters, setCharacters] = React.useState<CharacterDocument[]>([])

	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const idParam = urlParams.get('id')

	let collectionId: string | undefined
	let activeCharacterId: string | undefined

	if (idParam) {
		const parts = idParam.split('-')
		if (parts.length >= 2) {
			if (parts[0] === 'mock' && parts[1] === 'collection') {
				collectionId = 'mock-collection'
				activeCharacterId = parts.slice(2).join('-')
			} else {
				collectionId = parts[0]
				activeCharacterId = parts.slice(1).join('-')
			}
		}
	}

	useEffect(() => {
		if (
			(userLoggedIn && currentUser) ||
			process.env.NODE_ENV === 'development'
		) {
			getDocuments()
		}
	}, [userLoggedIn, currentUser, activeCharacterId])

	const getDocuments = async () => {
		try {
			const userUid = currentUser?.uid || 'dev-user'

			const userChars = await firebaseService.getCollection(userUid)
			setCharacters(userChars)

			const userInfo = await firebaseService.getUserInfo(userUid)
			setIsAdmin(Boolean(userInfo.allowedCollections.length))

			if (userInfo.allowedCollections.length > 0) {
				for (const adminCollectionId of userInfo.allowedCollections) {
					const adminChars =
						await firebaseService.getCollection(adminCollectionId)
					setCharacters((chars) => [...chars, ...adminChars])
				}
			}
		} catch (error) {
			console.error('Error fetching documents: ', error)
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
			console.log('auto save in progress')
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
				let character = await firebaseService.getDocument(
					collectionId,
					activeCharacterId,
				)

				if (!character && process.env.NODE_ENV !== 'development') {
					const docSnapshot = await getDoc(
						doc(db, `${collectionId}/${activeCharacterId}`),
					)
					character = mapDocToCharacter(collectionId, docSnapshot)
					const migratedCharacter = await migrateDoc(collectionId, docSnapshot)

					console.log(
						'migrated character',
						migratedCharacter.personal.playerName,
					)

					if (JSON.stringify(character) !== JSON.stringify(migratedCharacter)) {
						console.log('save migrated character', migratedCharacter)
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
		console.log('about to save character...')
		if (unsavedChanges) {
			dispatch(characterSheetActions.setLoadingSave(true))
			await firebaseService.updateDocument(activeCharacter)
			dispatch(characterSheetActions.setUnsavedChanges(false))
			dispatch(characterSheetActions.setLoadingSave(false))
		}
		console.log('done saving character')
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
				!activeCharacterId && (
					<CharacterList
						characters={characters}
						handleDeleteCharacter={handleDeleteCharacter}
					/>
				)}
			{(userLoggedIn || process.env.NODE_ENV === 'development') &&
				activeCharacterId &&
				activeCharacter && <CharacterSheet />}
		</>
	)
}

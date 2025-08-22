import { Box, Typography } from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import {
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	query,
	updateDoc,
} from 'firebase/firestore'
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
import { isDevelopmentEnvironment, getMockCharacters } from './utils/mockData'

const SAVE_CHARACTER_TIMEOUT = 1_000
const DOC_BLACKLIST = ['player-info']

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
	const [collectionId, activeCharacterId] = urlParams.get('id')?.split('-') ?? [
		undefined,
		undefined,
	]

	// Check if we're in development environment
	const isDev = isDevelopmentEnvironment()

	// Load mock characters in development if not logged in
	useEffect(() => {
		if (isDev && !userLoggedIn && !activeCharacterId) {
			console.log('Loading mock characters for development...')
			setCharacters(getMockCharacters())
			setIsAdmin(true) // Enable admin features for development
		}
	}, [isDev, userLoggedIn, activeCharacterId])

	// Load mock character data in development when a specific mock character is selected
	useEffect(() => {
		if (isDev && collectionId === 'mock-collection' && activeCharacterId && !activeCharacter) {
			console.log('Loading mock character for development:', activeCharacterId)
			const mockCharacters = getMockCharacters()
			const mockCharacter = mockCharacters.find(char => char.docId === activeCharacterId)
			if (mockCharacter) {
				dispatch(characterSheetActions.setCharacter(mockCharacter))
			}
		}
	}, [isDev, collectionId, activeCharacterId, activeCharacter, dispatch])

	// Fetch all characters when user is logged in and no active character
	useEffect(() => {
		if (userLoggedIn && currentUser && !activeCharacterId) {
			getDocuments()
		}
	}, [userLoggedIn, currentUser, activeCharacterId])

	const getDocuments = async () => {
		try {
			const userUid = currentUser.uid
			const collectionRef = collection(db, userUid)
			const q = query(collectionRef)
			const querySnapshot = await getDocs(q)

			const allowedCollections: string[] =
				querySnapshot.docs.find((doc) => doc.id === 'player-info')?.data()
					.allowedCollections ?? []
			setIsAdmin(Boolean(allowedCollections.length))

			const allDocs: CharacterDocument[] = querySnapshot.docs
				.filter((doc) => !DOC_BLACKLIST.includes(doc.id))
				.map((doc) => mapDocToCharacter(userUid, doc))

			setCharacters(allDocs)
			if (Boolean(allowedCollections.length)) {
				await allowedCollections.map(async (collectionId) => {
					const collectionRef = collection(db, collectionId)
					const q = query(collectionRef)
					const querySnapshot = await getDocs(q)
					setCharacters((chars) => [
						...chars,
						...querySnapshot.docs
							.filter((doc) => !DOC_BLACKLIST.includes(doc.id))
							.map((doc) => mapDocToCharacter(collectionId, doc)),
					])
				})
			}
		} catch (error) {
			console.error('Error fetching documents: ', error)
		}
	}

	const handleDeleteCharacter = async (char: CharacterDocument) => {
		// Don't delete mock characters from Firebase, just remove from local state
		if (isDev && char.collectionId === 'mock-collection') {
			console.log('Mock character deletion simulation - removing from local state')
			setCharacters((chars) => chars.filter((c) => c.docId !== char.docId))
			return
		}
		
		await deleteDoc(char.docRef)
		setCharacters((chars) => chars.filter((c) => c.docId !== char.docId))
	}

	useEffect(() => {
		if (activeCharacterId && currentUser && unsavedChanges && !saveTimeout) {
			dispatch(characterSheetActions.setSaveTimeout(true))
			setTimeout(() => {
				dispatch(characterSheetActions.setAutosave(true))
			}, SAVE_CHARACTER_TIMEOUT)
		}
	}, [activeCharacter])

	useEffect(() => {
		if (activeCharacterId && currentUser && unsavedChanges && autosave) {
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
				currentUser &&
				!activeCharacter
			) {
				const docSnapshot = await getDoc(
					doc(db, `${collectionId}/${activeCharacterId}`),
				)
				const character = mapDocToCharacter(collectionId, docSnapshot)
				const migratedCharacter = await migrateDoc(collectionId, docSnapshot)

				console.log('migrated character', migratedCharacter.personal.playerName)

				if (JSON.stringify(character) !== JSON.stringify(migratedCharacter)) {
					console.log('save migrated character', migratedCharacter)
					await updateDoc(migratedCharacter.docRef, {
						...migratedCharacter,
					} as Omit<Character, 'docRef' | 'docId'>)
				}

				dispatch(characterSheetActions.setCharacter(migratedCharacter))
			}
		}

		fetchAndMigrateCharacter()
	}, [collectionId, activeCharacterId, activeCharacter])

	const saveCharacter = async () => {
		console.log('about to save character...')
		
		// Don't save mock characters to Firebase
		if (isDev && collectionId === 'mock-collection') {
			console.log('Mock character save simulation - no actual save needed')
			dispatch(characterSheetActions.setUnsavedChanges(false))
			return
		}
		
		if (unsavedChanges) {
			dispatch(characterSheetActions.setLoadingSave(true))
			await updateDoc(activeCharacter.docRef, {
				...activeCharacter,
			} as Omit<Character, 'docRef' | 'docId'>)
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
			{/* Show development notice when using mock data */}
			{isDev && !userLoggedIn && (
				<Box
					sx={{
						m: 2,
						p: 2,
						backgroundColor: 'rgba(255, 152, 0, 0.1)',
						border: '1px solid rgba(255, 152, 0, 0.5)',
						borderRadius: 1,
						textAlign: 'center'
					}}
				>
					<Typography variant="body2" color="orange">
						<strong>Development Mode:</strong> Using mock character data for testing. Login not required.
					</Typography>
				</Box>
			)}
			{!userLoggedIn && !isDev && (
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
			{(userLoggedIn || isDev) && !activeCharacterId && (
				<CharacterList
					characters={characters}
					handleDeleteCharacter={handleDeleteCharacter}
				/>
			)}
			{(userLoggedIn || isDev) && activeCharacterId && activeCharacter && (
				<CharacterSheet />
			)}
		</>
	)
}

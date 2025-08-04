import { Box, Typography } from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore'
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
      if (collectionId && activeCharacterId && currentUser && !activeCharacter) {
        const docSnapshot = await getDoc(doc(db, `${collectionId}/${activeCharacterId}`))
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
			{!userLoggedIn && (
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
			{userLoggedIn && !activeCharacterId && (
				<CharacterList 
					characters={characters}
					handleDeleteCharacter={handleDeleteCharacter}
				/>
			)}
			{userLoggedIn && activeCharacterId && activeCharacter && (
				<CharacterSheet />
			)}
		</>
	)
}

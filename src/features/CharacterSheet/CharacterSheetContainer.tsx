import { Box, Typography } from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { Character } from '../../types/Character'
import { CharacterList } from './CharacterList'
import { CharacterSheet } from './CharacterSheet'
import { CharacterSheetHeader } from './CharacterSheetHeader'
import { characterSheetActions } from './characterSheetReducer'
import { useAppDispatch } from './hooks/useAppDispatch'
import { useAppSelector } from './hooks/useAppSelector'
import { mapDocToCharacter } from './utils/mapDocToCharacter'
import { migrateDoc } from './utils/migrateDoc'

const SAVE_CHARACTER_TIMEOUT = 30_000

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export const CharacterSheetContainer: React.FC = () => {
	const { userLoggedIn, currentUser } = useAuth()
	const { activeCharacter, autosave, saveTimeout, unsavedChanges } =
		useAppSelector((state) => state.characterSheet)
	const dispatch = useAppDispatch()

	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const activeCharacterId = urlParams.get('id') ?? undefined

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
		if (activeCharacterId && currentUser && !activeCharacter) {
			getDoc(doc(db, `${currentUser.uid}/${activeCharacterId}`)).then((doc) => {
				const character = mapDocToCharacter(doc)
				const migratedCharacter = migrateDoc(doc)

				if (JSON.stringify(character) !== JSON.stringify(migratedCharacter)) {
					console.log('save migrated character', migratedCharacter)
					updateDoc(migratedCharacter.docRef, {
						...migratedCharacter,
					} as Omit<Character, 'docRef' | 'docId'>)
				}

				dispatch(characterSheetActions.setCharacter(migratedCharacter))
			})
		}
	}, [activeCharacterId, activeCharacter])

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
			{userLoggedIn && !activeCharacterId && <CharacterList />}
			{userLoggedIn && activeCharacterId && activeCharacter && (
				<CharacterSheet />
			)}
		</>
	)
}

import { Box, Typography } from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { CharacterList } from './CharacterList'
import { CharacterSheet } from './CharacterSheet'
import { CharacterSheetHeader } from './CharacterSheetHeader'
import { Character, CharacterDocument } from './types/Character'
import { mapDocToCharacter } from './utils/mapDocToCharacter'
import { migrateDoc } from './utils/migrateDoc'

const SAVE_CHARACTER_TIMEOUT = 30_000

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export const CharacterSheetContainer: React.FC = () => {
	const { userLoggedIn, currentUser } = useAuth()
	const [activeCharacter, setActiveCharacter] =
		useState<CharacterDocument>(undefined)
	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [saveTimeout, setSaveTimeout] = useState(false)
	const [autosave, setAutosave] = useState(false)
	const [loadingSave, setLoadingSave] = useState(false)

	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const activeCharacterId = urlParams.get('id') ?? undefined

	useEffect(() => {
		if (activeCharacterId && currentUser && unsavedChanges && !saveTimeout) {
			setSaveTimeout(true)
			setTimeout(() => {
				setAutosave(true)
			}, SAVE_CHARACTER_TIMEOUT)
		}
	}, [activeCharacter])

	useEffect(() => {
		if (activeCharacterId && currentUser && unsavedChanges && autosave) {
			console.log('auto save in progress')
			saveCharacter()
			setAutosave(false)
			setSaveTimeout(false)
		}
	}, [autosave])

	useEffect(() => {
		if (activeCharacterId && currentUser) {
			getDoc(doc(db, `${currentUser.uid}/${activeCharacterId}`)).then((doc) => {
				const character = mapDocToCharacter(doc)
				const migratedCharacter = migrateDoc(doc)

				if (JSON.stringify(character) !== JSON.stringify(migratedCharacter)) {
					console.log('save migrated character', migratedCharacter)
					updateDoc(migratedCharacter.docRef, {
						...migratedCharacter,
					} as Omit<Character, 'docRef' | 'docId'>)
				}

				setActiveCharacter(migratedCharacter)
			})
		}
	}, [activeCharacterId])

	const updateCharacter = (update: DeepPartial<Character>) => {
		setUnsavedChanges(true)
		setActiveCharacter((prevCharacter) => {
			const newCharacter = { ...prevCharacter }

			function mergeDeep(target: any, source: any) {
				if (isObject(target) && isObject(source)) {
					for (const key in source) {
						if (isObject(source[key])) {
							// Recursive call for nested objects
							target[key] = mergeDeep(target[key] || {}, source[key])
						} else {
							// Update value for non-objects
							target[key] = source[key]
						}
					}
				} else {
					// Replace entire value if not objects
					return source
				}
				return target
			}

			return mergeDeep(newCharacter, update)
		})
	}

	function isObject(value: any) {
		return value !== null && typeof value === 'object'
	}

	const saveCharacter = async () => {
		console.log('about to save character...')
		if (unsavedChanges) {
			setLoadingSave(true)
			await updateDoc(activeCharacter.docRef, {
				...activeCharacter,
			} as Omit<Character, 'docRef' | 'docId'>)
			setUnsavedChanges(false)
			setLoadingSave(false)
		}
		console.log('done saving character')
	}

	return (
		<>
			<CharacterSheetHeader
				active={Boolean(activeCharacterId)}
				activeName={activeCharacter && activeCharacter.personal.name}
				unsavedChanges={unsavedChanges}
				saveCharacter={saveCharacter}
				loadingSave={loadingSave}
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
			{userLoggedIn && activeCharacterId && (
				<CharacterSheet
					characterId={activeCharacterId}
					character={activeCharacter}
					updateCharacter={updateCharacter}
				/>
			)}
		</>
	)
}

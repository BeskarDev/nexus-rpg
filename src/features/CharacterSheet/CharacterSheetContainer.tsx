import { Box, Typography } from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { CharacterList } from './CharacterList'
import { CharacterSheetHeader } from './CharacterSheetHeader'
import { CharacterSheet } from './CharacterSheet'
import { Character } from './CharacterList/CharacterList'
import { mapDocToCharacter } from './mapDocToCharacter'

const SAVE_CHARACTER_INTERVAL = 30_000

export const CharacterSheetContainer: React.FC = () => {
	const { userLoggedIn, currentUser } = useAuth()
	const [activeCharacter, setActiveCharacter] = useState<Character>(undefined)
	const [unsavedChanges, setUnsavedChanges] = useState(false)
	const [loadingSave, setLoadingSave] = useState(false)

	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const activeCharacterId = urlParams.get('id') ?? undefined

	useEffect(() => {
		if (activeCharacterId && currentUser) {
			const interval = setInterval(() => saveCharacter, SAVE_CHARACTER_INTERVAL)
			return () => clearInterval(interval)
		}
	}, [])

	useEffect(() => {
		if (activeCharacterId && currentUser) {
			getDoc(doc(db, `${currentUser.uid}/${activeCharacterId}`)).then((doc) => {
				setActiveCharacter(mapDocToCharacter(doc))
			})
		}
	}, [activeCharacterId])

	const updateCharacter = (newChar: Partial<Character>) => {
		setUnsavedChanges(true)
		setActiveCharacter((curr) => ({ ...curr, ...newChar }))
	}

	const saveCharacter = async () => {
		console.log('about to save character...')
		if (unsavedChanges) {
			setLoadingSave(true)
			await updateDoc(activeCharacter.docRef, {
				...activeCharacter,
			} as Omit<Character, 'docRef' | 'docId'>)
			setLoadingSave(false)
		}
		console.log('done saving character')
	}

	return (
		<>
			<CharacterSheetHeader
				active={Boolean(activeCharacterId)}
				activeName={activeCharacter && activeCharacter.name}
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
					character={activeCharacter}
					updateCharacter={updateCharacter}
				/>
			)}
		</>
	)
}

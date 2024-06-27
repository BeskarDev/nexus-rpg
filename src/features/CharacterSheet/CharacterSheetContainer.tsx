import {
	Box,
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { theme } from '@site/src/hooks/createTheme'
import { AuthProvider, useAuth } from '@site/src/hooks/firebaseAuthContext'
import React, { useEffect } from 'react'
import { CharacterSheetHeader } from './CharacterSheetHeader'
import { CharacterList } from './CharacterList'
import { db } from '@site/src/config/firebase'
import { getDoc, doc } from 'firebase/firestore'

export const CharacterSheetContainer: React.FC = () => {
	const { userLoggedIn, currentUser } = useAuth()
	const [activeCharacter, setActiveCharacter] = React.useState(undefined)

	if (!userLoggedIn) {
		return <Box>Please log in first</Box>
	}

	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	const activeCharacterId = urlParams.get('id') ?? undefined

	useEffect(() => {
		if (activeCharacterId) {
			getDoc(doc(db, `${currentUser.uid}/${activeCharacterId}`)).then((doc) => {
				setActiveCharacter(doc.data())
			})
		}
	}, [activeCharacterId])

	return (
		<>
			<CharacterSheetHeader
				active={Boolean(activeCharacterId)}
				activeName={activeCharacter && activeCharacter['name']}
			/>
			{!activeCharacterId && <CharacterList />}
			{activeCharacterId && <div>active character...</div>}
		</>
	)
}

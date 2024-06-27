import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { theme } from '@site/src/hooks/createTheme'
import { AuthProvider } from '@site/src/hooks/firebaseAuthContext'
import React from 'react'
import { CharacterSheetHeader } from './CharacterSheetHeader'
import { CharacterList } from './CharacterList'

export const CharacterSheetContainer: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	//if (userLoggedIn) {
	/* // Collection name you want to create (replace with your desired name)
		const userUid = auth.currentUser.uid // Store the user UID in a separate variable

		// Reference to the document within the user's collection
		const collectionRef = collection(db, userUid)

		// Sample data for the document
		const documentData = {
			field1: 'value1',
			field2: 'value2',
		}

		// Add the document with the prefixed name
		addDoc(collectionRef, documentData)
			.then((docRef) => {
				console.log('Document created successfully! Document ID:', docRef.id)
			})
			.catch((error) => {
				console.error('Error creating document:', error)
			}) */
	/* getDoc(userDocRef)
			.then((docSnapshot) => {
				if (docSnapshot.exists) {
					const userData = docSnapshot.data()
					console.log(userData) // This is the JS object containing all fields and values
				} else {
					console.log('No such document for user:', userUid)
				}
			})
			.catch((error) => {
				console.error('Error fetching user data:', error)
			})

		// Field to update and its new value (replace with your field name and value)
		const fieldToUpdate = 'other'
		const newValue = 'foobar'

		updateDoc(userDocRef, {
			[fieldToUpdate]: newValue,
		})
			.then(() => {
				console.log('User data updated successfully!')
			})
			.catch((error) => {
				console.error('Error updating user data:', error)
			}) */
	//}

	return (
		<AuthProvider>
			<Experimental_CssVarsProvider theme={customTheme}>
				<ThemeSwitcher />
				<CharacterSheetHeader />
				<CharacterList />
			</Experimental_CssVarsProvider>
		</AuthProvider>
	)
}

import {
	Box,
	Experimental_CssVarsProvider,
	Tab,
	Tabs,
	experimental_extendTheme,
} from '@mui/material'
import { LoginComponent } from '@site/src/components/LoginComponent'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { theme } from '@site/src/hooks/createTheme'
import { AuthProvider } from '@site/src/hooks/firebaseAuthContext'
import React, { useEffect } from 'react'
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
} from 'firebase/firestore'
import { app, auth, store } from '@site/src/config/firebase'

export const CharacterSheet: React.FC = () => {
	const [value, setValue] = React.useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	const customTheme = experimental_extendTheme(theme)

	if (auth?.currentUser) {
		const userUid = auth.currentUser.uid
		const userDocRef = doc(collection(store, 'user-data'), userUid)
		getDoc(userDocRef)
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
	}

	return (
		<AuthProvider>
			<Experimental_CssVarsProvider theme={customTheme}>
				<ThemeSwitcher />
				<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
					>
						<Tab id="0" label="Item One" />
						<Tab id="1" label="Item Two" />
						<Tab id="2" label="Item Three" />
					</Tabs>
				</Box>
				<LoginComponent />
			</Experimental_CssVarsProvider>
		</AuthProvider>
	)
}

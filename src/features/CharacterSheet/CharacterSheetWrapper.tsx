import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { theme } from '@site/src/hooks/createTheme'
import { AuthProvider } from '@site/src/hooks/firebaseAuthContext'
import React from 'react'
import { Provider } from 'react-redux'
import { CharacterSheetContainer } from './CharacterSheetContainer'
import { setupStore } from './store'
import './characterSheet.css'

export const CharacterSheetWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)
	const store = setupStore()

	return (
		<AuthProvider>
			<Experimental_CssVarsProvider theme={customTheme}>
				<ThemeSwitcher />
				<Provider store={store}>
					<CharacterSheetContainer />
				</Provider>
			</Experimental_CssVarsProvider>
		</AuthProvider>
	)
}

import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { theme } from '@site/src/hooks/createTheme'
import { AuthProvider } from '@site/src/hooks/firebaseAuthContext'
import React from 'react'
import { CharacterSheetContainer } from './CharacterSheetContainer'

export const CharacterSheetWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	return (
		<AuthProvider>
			<Experimental_CssVarsProvider theme={customTheme}>
				<ThemeSwitcher />
				<CharacterSheetContainer />
			</Experimental_CssVarsProvider>
		</AuthProvider>
	)
}

import React from 'react'
import {
	CssBaseline,
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { AuthProvider } from '@site/src/hooks/firebaseAuthContext'
import { theme } from '@site/src/hooks/createTheme'
import { PrintEverything } from './PrintEverything'

/**
 * The page's providers.
 *
 * `AuthProvider` sits HERE rather than inside the roster control, which is
 * where every other tool has it: the single `CharacterSelector` wraps itself
 * one instance at a time, and this page has one roster feeding one deck. A
 * provider per control would give the page two auth contexts for one question.
 */
export const PrintEverythingWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)
	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<ThemeSwitcher />
			<CssBaseline />
			<AuthProvider>
				<PrintEverything />
			</AuthProvider>
		</Experimental_CssVarsProvider>
	)
}

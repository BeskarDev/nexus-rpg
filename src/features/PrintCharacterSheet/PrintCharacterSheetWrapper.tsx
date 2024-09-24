import {
	CssBaseline,
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import React from 'react'
import './printCharacterSheetStyles.css'
import { PrintCharacterSheet } from './PrintCharacterSheet'
import { theme } from '@site/src/hooks/createTheme'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'

export const PrintCharacterSheetWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<ThemeSwitcher />
			<CssBaseline />
			<PrintCharacterSheet />
		</Experimental_CssVarsProvider>
	)
}

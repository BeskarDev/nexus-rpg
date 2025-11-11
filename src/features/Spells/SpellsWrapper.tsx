import React from 'react'
import { Experimental_CssVarsProvider, experimental_extendTheme, CssBaseline } from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { Spells } from './Spells'

const customTheme = experimental_extendTheme(theme)

export const SpellsWrapper: React.FC = () => {
	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<ThemeSwitcher />
			<CssBaseline />
			<Spells />
		</Experimental_CssVarsProvider>
	)
}

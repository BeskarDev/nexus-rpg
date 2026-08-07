import React from 'react'
import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
	CssBaseline,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { Abilities } from './Abilities'

const customTheme = experimental_extendTheme(theme)

export const AbilitiesWrapper: React.FC = () => {
	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<ThemeSwitcher />
			<CssBaseline />
			<Abilities />
		</Experimental_CssVarsProvider>
	)
}

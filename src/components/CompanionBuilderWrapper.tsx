import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { theme } from '@site/src/hooks/createTheme'
import React from 'react'
import { CompanionBuilder } from './CompanionBuilder'

export const CompanionBuilderWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<ThemeSwitcher />
			<CompanionBuilder />
		</Experimental_CssVarsProvider>
	)
}

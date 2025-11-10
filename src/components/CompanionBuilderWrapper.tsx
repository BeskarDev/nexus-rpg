import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { theme } from '@site/src/hooks/createTheme'
import React from 'react'
import { Provider } from 'react-redux'
import { setupCompanionBuilderStore } from '../features/CompanionBuilder/store'
import { CompanionBuilder } from './CompanionBuilder'

const store = setupCompanionBuilderStore()

export const CompanionBuilderWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<ThemeSwitcher />
			<Provider store={store}>
				<CompanionBuilder showImportButton={false} />
			</Provider>
		</Experimental_CssVarsProvider>
	)
}

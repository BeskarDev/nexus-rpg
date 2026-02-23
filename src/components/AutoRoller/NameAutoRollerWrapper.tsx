import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import React from 'react'
import { AutoRoller } from './AutoRoller'
import { generateName, nameGroups } from './generators'

export const NameAutoRollerWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<AutoRoller
				title="Name Generator"
				groups={nameGroups}
				generateResult={generateName}
			/>
		</Experimental_CssVarsProvider>
	)
}

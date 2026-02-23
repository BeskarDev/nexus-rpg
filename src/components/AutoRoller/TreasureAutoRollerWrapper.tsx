import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import React from 'react'
import { AutoRoller } from './AutoRoller'
import { generateTreasure, treasureGroups } from './generators'

export const TreasureAutoRollerWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<AutoRoller
				title="Treasure Generator"
				groups={treasureGroups}
				generateResult={generateTreasure}
			/>
		</Experimental_CssVarsProvider>
	)
}

import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { theme } from '@site/src/hooks/createTheme'
import React from 'react'
import { AutoRoller } from './AutoRoller'
import { creatureGroups, generateCreature } from './generators'

export const CreatureAutoRollerWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<ThemeSwitcher />
			<AutoRoller
				title="Creature Generator"
				groups={creatureGroups}
				generateResult={generateCreature}
			/>
		</Experimental_CssVarsProvider>
	)
}

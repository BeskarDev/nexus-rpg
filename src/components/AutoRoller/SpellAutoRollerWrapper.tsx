import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import React from 'react'
import { AutoRoller } from './AutoRoller'
import { generateSpell, spellGroups } from './generators'

export const SpellAutoRollerWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<AutoRoller
				title="Spell Generator"
				groups={spellGroups}
				generateResult={generateSpell}
			/>
		</Experimental_CssVarsProvider>
	)
}

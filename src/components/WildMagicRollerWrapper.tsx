import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import React from 'react'
import { WildMagicRoller } from './WildMagicRoller'

export const WildMagicRollerWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<WildMagicRoller />
		</Experimental_CssVarsProvider>
	)
}

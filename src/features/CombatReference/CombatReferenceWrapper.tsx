import {
	CssBaseline,
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import React from 'react'
import { theme } from '@site/src/hooks/createTheme'
import { CombatReference } from './CombatReference'
import './combatReferenceStyles.css'

/**
 * The doc page's entry point, matching the other print tools: the MUI theme the
 * shell's controls are drawn in, and nothing else. The sheets themselves use no
 * MUI — they are ink on paper and take their register from `print-codex.css`.
 */
export const CombatReferenceWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<CssBaseline />
			<CombatReference />
		</Experimental_CssVarsProvider>
	)
}

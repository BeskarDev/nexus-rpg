import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { theme } from '@site/src/hooks/createTheme'
import React from 'react'
import { AutoRoller } from './AutoRoller'
import {
	generateSettlement,
	settlementGroups,
	generateBuilding,
	buildingGroups,
} from './generators'

export const SettlementAutoRollerWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<ThemeSwitcher />
			<AutoRoller
				title="Settlement Generator"
				groups={settlementGroups}
				generateResult={generateSettlement}
			/>
			<AutoRoller
				title="District Buildings Generator"
				groups={buildingGroups}
				generateResult={generateBuilding}
			/>
		</Experimental_CssVarsProvider>
	)
}

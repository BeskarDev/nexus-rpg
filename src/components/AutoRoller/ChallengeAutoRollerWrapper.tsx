import {
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import React from 'react'
import { AutoRoller } from './AutoRoller'
import { challengeGroups, generateChallenge } from './generators'

export const ChallengeAutoRollerWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<AutoRoller
				title="Challenge Generator"
				groups={challengeGroups}
				generateResult={generateChallenge}
			/>
		</Experimental_CssVarsProvider>
	)
}

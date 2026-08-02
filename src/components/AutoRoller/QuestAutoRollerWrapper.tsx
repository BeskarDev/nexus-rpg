import {
	Experimental_CssVarsProvider,
	MenuItem,
	Select,
	experimental_extendTheme,
} from '@mui/material'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { theme } from '@site/src/hooks/createTheme'
import React, { useState } from 'react'
import { AutoRoller, OracleField } from './AutoRoller'
import { generateQuest, questGroups } from './generators'

const LEVEL_OPTIONS = [
	{ value: 0, label: 'Any level' },
	...Array.from({ length: 10 }, (_, index) => ({
		value: index + 1,
		label: `Level ${index + 1}`,
	})),
]

/**
 * The quest oracle.
 *
 * The second of the two wrappers that reimplemented `AutoRoller` rather than
 * configure it — 142 lines for one extra dropdown. Party level rides in
 * `extraControls` now, because the reward scaling reads it.
 */
export const QuestAutoRollerWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)
	const [partyLevel, setPartyLevel] = useState<number>(0)

	const roll = (category: string) => {
		const level =
			partyLevel === 0 ? Math.floor(Math.random() * 10) + 1 : partyLevel
		return generateQuest(category, level)
	}

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<ThemeSwitcher />
			<AutoRoller
				title="Quest Hooks Generator"
				groups={questGroups}
				generateResult={roll}
				extraControls={
					<OracleField label="Party level">
						<Select
							value={partyLevel}
							variant="outlined"
							size="small"
							onChange={(event) => setPartyLevel(Number(event.target.value))}
							className="cs-oracle__select"
							inputProps={{
								'aria-label': 'Party level, which scales the reward',
							}}
						>
							{LEVEL_OPTIONS.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</Select>
					</OracleField>
				}
			/>
		</Experimental_CssVarsProvider>
	)
}

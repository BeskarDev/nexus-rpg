import {
	Experimental_CssVarsProvider,
	MenuItem,
	Select,
	experimental_extendTheme,
} from '@mui/material'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { theme } from '@site/src/hooks/createTheme'
import React, { useEffect, useState } from 'react'
import { AutoRoller, OracleField } from './AutoRoller'
import {
	generateTreasure,
	treasureGroups,
	treasureSubGroups,
} from './generators'

/**
 * Quality reads in the game's OWN descriptors (M14 S3).
 *
 * This list said `Q3 (Masterwork)`, `Q4 (Lesser Magic)`, `Q8 (Mythical)` — the
 * magic-item-only names the owner retired when `cost-tables.md` was reconciled
 * with the sheet. A Q4 treasure is *formidable* whether it is a rope or a wand,
 * and `ITEM_QUALITY_LABELS` has said so since M13 S4d. This roller was the last
 * surface still using the old vocabulary.
 */
const QUALITY_OPTIONS = [
	{ value: 0, label: 'Any Quality' },
	{ value: 1, label: 'Q1 primitive' },
	{ value: 2, label: 'Q2 simple' },
	{ value: 3, label: 'Q3 complex' },
	{ value: 4, label: 'Q4 formidable' },
	{ value: 5, label: 'Q5 exceptional' },
	{ value: 6, label: 'Q6 epic' },
	{ value: 7, label: 'Q7 legendary' },
	{ value: 8, label: 'Q8 mythical' },
]

/**
 * The treasure oracle.
 *
 * It used to be a SECOND ROLLER: its own card, its own table select, its own
 * count, its own results list — 179 lines reimplementing `AutoRoller` because it
 * needed two extra dropdowns and the shared component had nowhere to put them.
 * `extraControls` is that nowhere, and this file is configuration again.
 */
export const TreasureAutoRollerWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)
	const [group, setGroup] = useState<string>(treasureGroups[0].id)
	const [subGroup, setSubGroup] = useState<string>('any')
	const [quality, setQuality] = useState<number>(0)

	// A sub-category belongs to its group; a stale one would roll on a table the
	// reader is no longer looking at.
	useEffect(() => setSubGroup('any'), [group])

	const subGroupOptions = treasureSubGroups[group] ?? []

	const roll = (groupId: string) => {
		const rolled = quality === 0 ? Math.floor(Math.random() * 8) + 1 : quality
		return generateTreasure(
			groupId,
			rolled,
			subGroupOptions.length > 0 ? subGroup : undefined,
		)
	}

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<ThemeSwitcher />
			<AutoRoller
				title="Treasure Generator"
				groups={treasureGroups}
				generateResult={roll}
				onGroupChange={setGroup}
				extraControls={
					<>
						{subGroupOptions.length > 0 && (
							<OracleField label="Sub-category">
								<Select
									value={subGroup}
									variant="outlined"
									size="small"
									onChange={(event) => setSubGroup(event.target.value)}
									className="cs-oracle__select"
									inputProps={{ 'aria-label': 'Treasure sub-category' }}
								>
									{subGroupOptions.map((option) => (
										<MenuItem key={option.id} value={option.id}>
											{option.label}
										</MenuItem>
									))}
								</Select>
							</OracleField>
						)}
						<OracleField label="Quality">
							<Select
								value={quality}
								variant="outlined"
								size="small"
								onChange={(event) => setQuality(Number(event.target.value))}
								className="cs-oracle__select"
								inputProps={{ 'aria-label': 'Treasure Quality' }}
							>
								{QUALITY_OPTIONS.map((option) => (
									<MenuItem key={option.value} value={option.value}>
										{option.label}
									</MenuItem>
								))}
							</Select>
						</OracleField>
					</>
				}
			/>
		</Experimental_CssVarsProvider>
	)
}

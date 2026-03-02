import {
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	Experimental_CssVarsProvider,
	experimental_extendTheme,
} from '@mui/material'
import { ThemeSwitcher } from '@site/src/components/ThemeSwitcher'
import { theme } from '@site/src/hooks/createTheme'
import React, { useState, useEffect } from 'react'
import { generateTreasure, treasureGroups, treasureSubGroups } from './generators'

const COUNT_OPTIONS = [1, 2, 3, 5, 10]
const QUALITY_OPTIONS = [
	{ value: 0, label: 'Random (Q1-Q8)' },
	{ value: 1, label: 'Q1 (Shoddy)' },
	{ value: 2, label: 'Q2 (Simple)' },
	{ value: 3, label: 'Q3 (Masterwork)' },
	{ value: 4, label: 'Q4 (Lesser Magic)' },
	{ value: 5, label: 'Q5 (Potent Magic)' },
	{ value: 6, label: 'Q6 (Greater Magic)' },
	{ value: 7, label: 'Q7 (Legendary)' },
	{ value: 8, label: 'Q8 (Mythical)' },
]

export const TreasureAutoRollerWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)
	const [selectedGroup, setSelectedGroup] = useState<string>(
		treasureGroups[0].id,
	)
	const [selectedSubGroup, setSelectedSubGroup] = useState<string>('any')
	const [quality, setQuality] = useState<number>(0)
	const [count, setCount] = useState<number>(1)
	const [results, setResults] = useState<string[]>([])

	// Reset sub-group when main group changes
	useEffect(() => {
		setSelectedSubGroup('any')
	}, [selectedGroup])

	const subGroupOptions = treasureSubGroups[selectedGroup] ?? []
	const showSubGroup = subGroupOptions.length > 0

	const handleRoll = () => {
		const newResults: string[] = []
		for (let i = 0; i < count; i++) {
			const q =
				quality === 0
					? Math.floor(Math.random() * 8) + 1
					: quality
			const sub = showSubGroup ? selectedSubGroup : undefined
			newResults.push(generateTreasure(selectedGroup, q, sub))
		}
		setResults(newResults)
	}

	return (
		<Experimental_CssVarsProvider theme={customTheme}>
			<ThemeSwitcher />
			<Box sx={{ mb: 3 }}>
				<Card variant="outlined">
					<CardContent>
						<Typography variant="h6" gutterBottom>
							🎲 Treasure Generator
						</Typography>

						<Box
							sx={{
								display: 'flex',
								gap: 2,
								alignItems: 'center',
								flexWrap: 'wrap',
								mb: 2,
							}}
						>
							<FormControl
								sx={{ minWidth: 200 }}
								size="small"
							>
								<InputLabel id="treasure-group-label">
									Table
								</InputLabel>
								<Select
									labelId="treasure-group-label"
									value={selectedGroup}
									label="Table"
									onChange={(e) =>
										setSelectedGroup(
											e.target.value,
										)
									}
								>
									{treasureGroups.map((g) => (
										<MenuItem
											key={g.id}
											value={g.id}
										>
											{g.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							{showSubGroup && (
								<FormControl
									sx={{ minWidth: 200 }}
									size="small"
								>
									<InputLabel id="treasure-subgroup-label">
										Sub-category
									</InputLabel>
									<Select
										labelId="treasure-subgroup-label"
										value={selectedSubGroup}
										label="Sub-category"
										onChange={(e) =>
											setSelectedSubGroup(
												e.target.value,
											)
										}
									>
										{subGroupOptions.map((sg) => (
											<MenuItem
												key={sg.id}
												value={sg.id}
											>
												{sg.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							)}

							<FormControl
								sx={{ minWidth: 180 }}
								size="small"
							>
								<InputLabel id="treasure-quality-label">
									Quality
								</InputLabel>
								<Select
									labelId="treasure-quality-label"
									value={quality}
									label="Quality"
									onChange={(e) =>
										setQuality(
											Number(e.target.value),
										)
									}
								>
									{QUALITY_OPTIONS.map((opt) => (
										<MenuItem
											key={opt.value}
											value={opt.value}
										>
											{opt.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<FormControl
								sx={{ minWidth: 80 }}
								size="small"
							>
								<InputLabel id="treasure-count-label">
									Count
								</InputLabel>
								<Select
									labelId="treasure-count-label"
									value={count}
									label="Count"
									onChange={(e) =>
										setCount(
											Number(e.target.value),
										)
									}
								>
									{COUNT_OPTIONS.map((n) => (
										<MenuItem key={n} value={n}>
											{n}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<Button
								variant="contained"
								color="primary"
								onClick={handleRoll}
							>
								🎲 Roll
							</Button>
						</Box>

						{results.length > 0 && (
							<Box
								sx={{
									mt: 2,
									p: 2,
									border: '2px solid',
									borderColor: 'primary.main',
									borderRadius: 1,
									backgroundColor:
										'background.paper',
								}}
							>
								{results.map((result, i) => (
									<Typography
										key={i}
										variant="body1"
										sx={{ mb: 0.5 }}
									>
										<strong>{i + 1}.</strong>{' '}
										{result}
									</Typography>
								))}
							</Box>
						)}
					</CardContent>
				</Card>
			</Box>
		</Experimental_CssVarsProvider>
	)
}

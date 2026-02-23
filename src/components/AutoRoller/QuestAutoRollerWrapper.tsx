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
import React, { useState } from 'react'
import { generateQuest, questGroups } from './generators'

const COUNT_OPTIONS = [1, 2, 3, 5]
const LEVEL_OPTIONS = [
	{ value: 0, label: 'Random (1-10)' },
	...Array.from({ length: 10 }, (_, i) => ({
		value: i + 1,
		label: `Level ${i + 1}`,
	})),
]

export const QuestAutoRollerWrapper: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)
	const [selectedCategory, setSelectedCategory] = useState<string>(
		questGroups[0].id,
	)
	const [partyLevel, setPartyLevel] = useState<number>(0)
	const [count, setCount] = useState<number>(1)
	const [results, setResults] = useState<string[]>([])

	const handleRoll = () => {
		const newResults: string[] = []
		for (let i = 0; i < count; i++) {
			const level =
				partyLevel === 0
					? Math.floor(Math.random() * 10) + 1
					: partyLevel
			newResults.push(generateQuest(selectedCategory, level))
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
							🎲 Rumors, Quest Hooks & Jobs Generator
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
								sx={{ minWidth: 160 }}
								size="small"
							>
								<InputLabel id="quest-category-label">
									Category
								</InputLabel>
								<Select
									labelId="quest-category-label"
									value={selectedCategory}
									label="Category"
									onChange={(e) =>
										setSelectedCategory(
											e.target.value,
										)
									}
								>
									{questGroups.map((g) => (
										<MenuItem
											key={g.id}
											value={g.id}
										>
											{g.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<FormControl
								sx={{ minWidth: 140 }}
								size="small"
							>
								<InputLabel id="quest-level-label">
									Party Level
								</InputLabel>
								<Select
									labelId="quest-level-label"
									value={partyLevel}
									label="Party Level"
									onChange={(e) =>
										setPartyLevel(
											Number(e.target.value),
										)
									}
								>
									{LEVEL_OPTIONS.map((opt) => (
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
								<InputLabel id="quest-count-label">
									Count
								</InputLabel>
								<Select
									labelId="quest-count-label"
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

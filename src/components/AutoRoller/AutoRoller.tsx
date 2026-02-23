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
} from '@mui/material'
import React, { useState } from 'react'

const COUNT_OPTIONS = [1, 2, 3, 5, 10]

interface AutoRollerGroup {
	id: string
	label: string
}

interface AutoRollerProps {
	title: string
	groups: AutoRollerGroup[]
	generateResult: (groupId: string) => string
	defaultGroup?: string
}

export const AutoRoller: React.FC<AutoRollerProps> = ({
	title,
	groups,
	generateResult,
	defaultGroup,
}) => {
	const [selectedGroup, setSelectedGroup] = useState<string>(
		defaultGroup || groups[0]?.id || '',
	)
	const [count, setCount] = useState<number>(1)
	const [results, setResults] = useState<string[]>([])

	const handleRoll = () => {
		const newResults: string[] = []
		for (let i = 0; i < count; i++) {
			newResults.push(generateResult(selectedGroup))
		}
		setResults(newResults)
	}

	return (
		<Box sx={{ mb: 3 }}>
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h6" gutterBottom>
						🎲 {title}
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
						<FormControl sx={{ minWidth: 200 }} size="small">
							<InputLabel id="auto-roller-group-label">
								Table
							</InputLabel>
							<Select
								labelId="auto-roller-group-label"
								value={selectedGroup}
								label="Table"
								onChange={(e) =>
									setSelectedGroup(e.target.value)
								}
							>
								{groups.map((g) => (
									<MenuItem key={g.id} value={g.id}>
										{g.label}
									</MenuItem>
								))}
							</Select>
						</FormControl>

						<FormControl sx={{ minWidth: 80 }} size="small">
							<InputLabel id="auto-roller-count-label">
								Count
							</InputLabel>
							<Select
								labelId="auto-roller-count-label"
								value={count}
								label="Count"
								onChange={(e) =>
									setCount(Number(e.target.value))
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
								backgroundColor: 'background.paper',
							}}
						>
							{results.map((result, i) => (
								<Typography
									key={i}
									variant="body1"
									sx={{ mb: 0.5 }}
								>
									<strong>{i + 1}.</strong> {result}
								</Typography>
							))}
						</Box>
					)}
				</CardContent>
			</Card>
		</Box>
	)
}

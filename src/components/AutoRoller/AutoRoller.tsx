import {
	Box,
	Button,
	Card,
	CardContent,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import React, { useState } from 'react'

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

						<TextField
							label="Count"
							type="number"
							size="small"
							value={count}
							onChange={(e) => {
								const v = parseInt(e.target.value, 10)
								if (v >= 1 && v <= 20) setCount(v)
							}}
							inputProps={{ min: 1, max: 20 }}
							sx={{ width: 80 }}
						/>

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

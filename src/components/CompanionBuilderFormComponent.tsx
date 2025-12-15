import React from 'react'
import { useDispatch } from 'react-redux'
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
	SelectChangeEvent,
	Button,
	Box,
	Typography,
	Paper,
} from '@mui/material'
import { Refresh as RefreshIcon } from '@mui/icons-material'
import { CompanionTrait } from '../types/companion'
import { getAvailableSizes, TIER_NAMES } from '../utils/typescript/companion/companionCalculations'
import companionTraits from '../utils/data/json/companion-traits.json'
import { companionBuilderActions } from '../features/CompanionBuilder/companionBuilderReducer'
import { useCompanionBuilderState } from '../hooks/useCompanionBuilderState'

interface CompanionBuilderFormProps {
	onReset: () => void
	showResetButton: boolean
	showImportButton?: boolean
	onImportCompanion?: () => void
}

// Color coding for types (similar to creature builder)
const getTypeColor = (type: string): string => {
	const colors: Record<string, string> = {
		Animal: '#48A06C',
		Beast: '#A86B35',
		Construct: '#9A9A9A',
		Elemental: '#4B91C0',
		Fey: '#914C70',
		Monstrosity: '#9C5635',
		Plant: '#3FA769',
		Undead: '#777777',
	}
	return colors[type] || '#3C6FA8'
}

export const CompanionBuilderFormComponent: React.FC<
	CompanionBuilderFormProps
> = ({
	onReset,
	showResetButton,
	showImportButton = false,
	onImportCompanion,
}) => {
	const dispatch = useDispatch()
	const { state } = useCompanionBuilderState()

	const { tier, size, trait } = state
	const types = companionTraits as CompanionTrait[]

	return (
		<Paper sx={{ p: 2 }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 2,
				}}
			>
				<Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600 }}>
					Core Stats
				</Typography>
				<Box sx={{ display: 'flex', gap: 1 }}>
					{showImportButton && onImportCompanion && (
						<Button
							size="small"
							onClick={onImportCompanion}
							variant="contained"
							color="primary"
							sx={{ minWidth: 'auto' }}
						>
							Import to Character
						</Button>
					)}
					{showResetButton && (
						<Button
							size="small"
							startIcon={<RefreshIcon />}
							onClick={onReset}
							sx={{ minWidth: 'auto' }}
						>
							Reset
						</Button>
					)}
				</Box>
			</Box>

			<Grid container spacing={1.5}>
				{/* Tier and Size */}
				<Grid item xs={6}>
					<FormControl fullWidth size="small">
						<InputLabel>Tier</InputLabel>
						<Select
							value={tier}
							label="Tier"
							onChange={(e: SelectChangeEvent<number>) => {
								const newTier = e.target.value as number
								dispatch(companionBuilderActions.setTier(newTier))

								// Reset size if not available in new tier
								const availableSizes = getAvailableSizes(newTier)
								if (size && !availableSizes.includes(size)) {
									dispatch(companionBuilderActions.setSize(''))
								}
							}}
						>
							{Object.entries(TIER_NAMES).map(([tierNum, name]) => (
								<MenuItem key={tierNum} value={parseInt(tierNum)}>
									Tier {tierNum} - {name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={6}>
					<FormControl fullWidth size="small">
						<InputLabel>Size</InputLabel>
						<Select
							value={size}
							label="Size"
							onChange={(e: SelectChangeEvent<string>) => {
								dispatch(companionBuilderActions.setSize(e.target.value))
							}}
							disabled={tier === undefined}
						>
							{getAvailableSizes(tier).map((s) => (
								<MenuItem key={s} value={s}>
									{s}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				{/* Trait - Full Width */}
				<Grid item xs={12}>
					<FormControl fullWidth size="small">
						<InputLabel>Trait</InputLabel>
						<Select
							value={trait?.name || ''}
							label="Trait"
							onChange={(e: SelectChangeEvent<string>) => {
								const selectedTrait = types.find(
									(t) => t.name === e.target.value,
								)
								dispatch(
									companionBuilderActions.setTrait(selectedTrait || null),
								)
							}}
							renderValue={(value) => {
								if (!value) return ''
								const selectedTrait = types.find((t) => t.name === value)
								return (
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
										<Box
											sx={{
												width: 12,
												height: 12,
												borderRadius: '50%',
												bgcolor: getTypeColor(selectedTrait?.type || ''),
											}}
										/>
										{value} ({selectedTrait?.type})
									</Box>
								)
							}}
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: 400,
									},
								},
							}}
						>
							{types.map((t) => (
								<MenuItem key={t.name} value={t.name}>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
										<Box
											sx={{
												width: 12,
												height: 12,
												borderRadius: '50%',
												bgcolor: getTypeColor(t.type),
											}}
										/>
										{t.name} ({t.type})
									</Box>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</Paper>
	)
}

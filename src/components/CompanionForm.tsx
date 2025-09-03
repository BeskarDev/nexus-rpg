import React from 'react'
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
	SelectChangeEvent,
	Button,
	Box,
} from '@mui/material'
import { CompanionTrait } from '../types/companion'
import { getAvailableSizes, TIER_NAMES } from '../utils/companionCalculations'
import companionTraits from '../utils/json/companion-traits.json'

interface CompanionFormProps {
	selectedTier: number
	selectedSize: string
	selectedTrait: CompanionTrait | null
	onTierChange: (tier: number) => void
	onSizeChange: (size: string) => void
	onTraitChange: (trait: CompanionTrait | null) => void
	onReset: () => void
	showResetButton: boolean
	showImportButton?: boolean
	onImportCompanion?: () => void
}

export const CompanionForm: React.FC<CompanionFormProps> = ({
	selectedTier,
	selectedSize,
	selectedTrait,
	onTierChange,
	onSizeChange,
	onTraitChange,
	onReset,
	showResetButton,
	showImportButton = false,
	onImportCompanion,
}) => {
	return (
		<>
			<Grid container columnSpacing={3} rowSpacing={1}>
				<Grid item xs={12} md={4}>
					<FormControl fullWidth sx={{ mb: { xs: 1, sm: 2 } }}>
						<InputLabel>Tier</InputLabel>
						<Select
							value={selectedTier}
							label="Tier"
							onChange={(e: SelectChangeEvent<number>) => {
								const newTier = e.target.value as number
								onTierChange(newTier)
							}}
						>
							{Object.entries(TIER_NAMES).map(([tier, name]) => (
								<MenuItem key={tier} value={parseInt(tier)}>
									{tier} - {name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} md={4}>
					<FormControl fullWidth sx={{ mb: { xs: 1, sm: 2 } }}>
						<InputLabel>Size</InputLabel>
						<Select
							value={selectedSize}
							label="Size"
							onChange={(e: SelectChangeEvent<string>) => {
								onSizeChange(e.target.value as string)
							}}
							disabled={selectedTier === undefined}
						>
							{getAvailableSizes(selectedTier).map((size) => (
								<MenuItem key={size} value={size}>
									{size}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12} md={4}>
					<FormControl fullWidth sx={{ mb: { xs: 1, sm: 2 } }}>
						<InputLabel>Trait</InputLabel>
						<Select
							value={selectedTrait?.name || ''}
							label="Trait"
							onChange={(e: SelectChangeEvent<string>) => {
								const trait = (companionTraits as CompanionTrait[]).find(
									(t) => t.name === e.target.value,
								)
								onTraitChange(trait || null)
							}}
							MenuProps={{
								PaperProps: {
									style: {
										maxHeight: 400,
									},
								},
							}}
						>
							{(companionTraits as CompanionTrait[]).map((trait) => (
								<MenuItem key={trait.name} value={trait.name}>
									{trait.name} ({trait.type})
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>

			{(showResetButton || showImportButton) && (
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: 2 }}>
					{showImportButton && onImportCompanion && (
						<Button 
							variant="contained" 
							size="small" 
							onClick={onImportCompanion}
							color="primary"
						>
							Import to Character
						</Button>
					)}
					{showResetButton && (
						<Button variant="outlined" size="small" onClick={onReset}>
							Reset All
						</Button>
					)}
				</Box>
			)}
		</>
	)
}

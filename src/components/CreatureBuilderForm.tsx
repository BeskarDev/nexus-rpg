import React from 'react'
import {
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
	SelectChangeEvent,
	TextField,
	Button,
	Box,
	Typography,
	Chip,
} from '@mui/material'
import {
	TIER_NAMES,
	getAvailableSizes,
	getAvailableArchetypes,
	validateTier,
} from '../utils/creatureBuilderCalculations'
import creatureTypes from '../utils/json/creature-types.json'
import { CreatureCategory } from '../types/CreatureBuilder'

interface CreatureBuilderFormProps {
	tier: number | null
	category: CreatureCategory
	size: string
	type: string
	archetype: string
	name: string
	onTierChange: (tier: number) => void
	onCategoryChange: (category: CreatureCategory) => void
	onSizeChange: (size: string) => void
	onTypeChange: (type: string) => void
	onArchetypeChange: (archetype: string) => void
	onNameChange: (name: string) => void
	onReset: () => void
	showResetButton: boolean
	// Stats for validation
	hp?: number
	av?: number
	parry?: number
	dodge?: number
	resist?: number
}

export const CreatureBuilderForm: React.FC<CreatureBuilderFormProps> = ({
	tier,
	category,
	size,
	type,
	archetype,
	name,
	onTierChange,
	onCategoryChange,
	onSizeChange,
	onTypeChange,
	onArchetypeChange,
	onNameChange,
	onReset,
	showResetButton,
	hp,
	av,
	parry,
	dodge,
	resist,
}) => {
	const types = creatureTypes as string[]

	// Validate tier if all stats are available
	const validation =
		tier !== null && hp && av && parry && dodge && resist
			? validateTier(tier, hp, av, parry, dodge, resist)
			: null

	return (
		<>
			<Grid container columnSpacing={3} rowSpacing={2}>
				{/* Row 1: Name and Tier */}
				<Grid item xs={12} md={6}>
					<TextField
						fullWidth
						label="Creature Name"
						value={name}
						onChange={(e) => onNameChange(e.target.value)}
						placeholder="Enter creature name"
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel>Tier</InputLabel>
						<Select
							value={tier ?? ''}
							label="Tier"
							onChange={(e: SelectChangeEvent<number>) => {
								const newTier = e.target.value as number
								onTierChange(newTier)
							}}
						>
							{Object.entries(TIER_NAMES).map(([tierNum, tierName]) => (
								<MenuItem key={tierNum} value={parseInt(tierNum)}>
									{tierNum} - {tierName}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				{/* Row 2: Category, Size, Type */}
				<Grid item xs={12} md={4}>
					<FormControl fullWidth>
						<InputLabel>Category</InputLabel>
						<Select
							value={category}
							label="Category"
							onChange={(e: SelectChangeEvent<CreatureCategory>) => {
								onCategoryChange(e.target.value as CreatureCategory)
							}}
						>
							<MenuItem value="Basic">Basic</MenuItem>
							<MenuItem value="Elite">Elite</MenuItem>
							<MenuItem value="Lord">Lord</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={4}>
					<FormControl fullWidth>
						<InputLabel>Size</InputLabel>
						<Select
							value={size}
							label="Size"
							onChange={(e: SelectChangeEvent<string>) => {
								onSizeChange(e.target.value)
							}}
						>
							{getAvailableSizes().map((s) => (
								<MenuItem key={s} value={s}>
									{s}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={4}>
					<FormControl fullWidth>
						<InputLabel>Type</InputLabel>
						<Select
							value={type}
							label="Type"
							onChange={(e: SelectChangeEvent<string>) => {
								onTypeChange(e.target.value)
							}}
						>
							{types.map((t) => (
								<MenuItem key={t} value={t}>
									{t}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				{/* Row 3: Archetype */}
				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel>Archetype</InputLabel>
						<Select
							value={archetype}
							label="Archetype"
							onChange={(e: SelectChangeEvent<string>) => {
								onArchetypeChange(e.target.value)
							}}
							disabled={tier === null}
						>
							{getAvailableArchetypes().map((a) => (
								<MenuItem key={a} value={a}>
									{a}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>

			{/* Validation warnings */}
			{validation && validation.warnings.length > 0 && (
				<Box sx={{ mt: 2 }}>
					<Typography variant="body2" color="warning.main" sx={{ mb: 1 }}>
						⚠️ Tier Validation Warnings:
					</Typography>
					{validation.warnings.map((warning, idx) => (
						<Chip
							key={idx}
							label={warning}
							color="warning"
							size="small"
							sx={{ mr: 1, mb: 1 }}
						/>
					))}
				</Box>
			)}

			{showResetButton && (
				<Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
					<Button variant="outlined" onClick={onReset}>
						Reset Builder
					</Button>
				</Box>
			)}
		</>
	)
}

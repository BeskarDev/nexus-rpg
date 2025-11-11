import React from 'react'
import { useDispatch } from 'react-redux'
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
	Paper,
} from '@mui/material'
import {
	Refresh as RefreshIcon,
	Warning as WarningIcon,
	Tune as TuneIcon,
} from '@mui/icons-material'
import {
	TIER_NAMES,
	getAvailableSizes,
	getAvailableArchetypes,
	validateTier,
} from '../utils/creatureBuilderCalculations'
import creatureTypes from '../utils/json/creature-types.json'
import { CreatureCategory } from '../types/CreatureBuilder'
import { creatureBuilderActions } from '../features/CreatureBuilder/creatureBuilderReducer'
import { useCreatureBuilderState } from '../hooks/useCreatureBuilderState'

interface CreatureBuilderFormProps {
	onReset: () => void
	showResetButton: boolean
	showAdvanced: boolean
	onToggleAdvanced: () => void
}

// Color coding for categories
const getCategoryColor = (category: CreatureCategory): string => {
	const colors = {
		Basic: '#3FA769',
		Elite: '#B28A3F',
		Lord: '#A14646',
	}
	return colors[category]
}

// Color coding for types
const getTypeColor = (type: string): string => {
	const colors: Record<string, string> = {
		Animal: '#48A06C',
		Beast: '#A86B35',
		Construct: '#9A9A9A',
		Dragon: '#A14646',
		Elemental: '#4B91C0',
		Fey: '#914C70',
		Fiend: '#8E3F66',
		Giant: '#B1642F',
		Humanoid: '#3C6FA8',
		Monstrosity: '#9C5635',
		Ooze: '#3E9B4E',
		Plant: '#3FA769',
		Undead: '#777777',
	}
	return colors[type] || '#3C6FA8'
}

// Color coding for archetypes
const getArchetypeColor = (archetype: string): string => {
	const colors: Record<string, string> = {
		Standard: '#9A9A9A', // Neutral grey
		Ambusher: '#374151', // Dark charcoal (stealth)
		Artillery: '#0369a1', // Vibrant sky blue (long range)
		Bruiser: '#dc2626', // Vibrant red (aggressive brawler)
		Defender: '#92400e', // Deep brown (tank/shield)
		Horde: '#ca8a04', // Golden yellow (many units)
		Controller: '#7c3aed', // Vibrant purple (magic/manipulation)
		Ranged: '#15803d', // Forest green (archer/shooter)
		Skirmisher: '#059669', // Emerald green (fast/mobile)
		Support: '#ec4899', // Vibrant pink (healer/buffer)
	}
	return colors[archetype] || '#9A9A9A'
}

export const CreatureBuilderForm: React.FC<CreatureBuilderFormProps> = ({
	onReset,
	showResetButton,
	showAdvanced,
	onToggleAdvanced,
}) => {
	const dispatch = useDispatch()
	const { state, builtCreature } = useCreatureBuilderState()

	const { tier, category, size, type, archetype, name } = state
	const hp = builtCreature?.baseHp
	const av = builtCreature ? parseInt(builtCreature.av) : undefined
	const parry = builtCreature?.parry
	const dodge = builtCreature?.dodge
	const resist = builtCreature?.resist

	const types = creatureTypes as string[]

	const validation =
		tier !== null && hp && av && parry && dodge && resist
			? validateTier(
					tier,
					hp,
					av,
					parry,
					dodge,
					resist,
					builtCreature?.armorType,
				)
			: null

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
					{showResetButton && (
						<Button
							size="small"
							startIcon={<TuneIcon />}
							onClick={onToggleAdvanced}
							variant={showAdvanced ? 'contained' : 'outlined'}
							sx={{ minWidth: 'auto' }}
						>
							Advanced
						</Button>
					)}
				</Box>
			</Box>{' '}
			<Grid container spacing={1.5}>
				{/* Name - Full Width */}
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="Name"
						value={name}
						onChange={(e) =>
							dispatch(creatureBuilderActions.setName(e.target.value))
						}
						placeholder="Creature name"
						size="small"
					/>
				</Grid>{' '}
				{/* Tier and Category */}
				<Grid item xs={6}>
					<FormControl fullWidth size="small">
						<InputLabel>Tier</InputLabel>
						<Select
							value={tier ?? ''}
							label="Tier"
							onChange={(e: SelectChangeEvent<number>) => {
								const newTier = e.target.value as number
								dispatch(creatureBuilderActions.setTier(newTier))
							}}
						>
							{Array.from({ length: 11 }, (_, i) => i).map((tierNum) => (
								<MenuItem key={tierNum} value={tierNum}>
									Tier {tierNum}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl fullWidth size="small">
						<InputLabel>Category</InputLabel>
						<Select
							value={category}
							label="Category"
							onChange={(e: SelectChangeEvent<CreatureCategory>) => {
								dispatch(
									creatureBuilderActions.setCategory(
										e.target.value as CreatureCategory,
									),
								)
							}}
							renderValue={(value) => (
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
									<Box
										sx={{
											width: 12,
											height: 12,
											borderRadius: '50%',
											bgcolor: getCategoryColor(value),
										}}
									/>
									{value}
								</Box>
							)}
						>
							{(['Basic', 'Elite', 'Lord'] as CreatureCategory[]).map((cat) => (
								<MenuItem key={cat} value={cat}>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
										<Box
											sx={{
												width: 12,
												height: 12,
												borderRadius: '50%',
												bgcolor: getCategoryColor(cat),
											}}
										/>
										{cat}
									</Box>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				{/* Size and Type */}
				<Grid item xs={6}>
					<FormControl fullWidth size="small">
						<InputLabel>Size</InputLabel>
						<Select
							value={size}
							label="Size"
							onChange={(e: SelectChangeEvent<string>) => {
								dispatch(creatureBuilderActions.setSize(e.target.value))
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
				<Grid item xs={6}>
					<FormControl fullWidth size="small">
						<InputLabel>Type</InputLabel>
						<Select
							value={type}
							label="Type"
							onChange={(e: SelectChangeEvent<string>) => {
								dispatch(creatureBuilderActions.setType(e.target.value))
							}}
							renderValue={(value) => (
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
									<Box
										sx={{
											width: 12,
											height: 12,
											borderRadius: '50%',
											bgcolor: getTypeColor(value),
										}}
									/>
									{value}
								</Box>
							)}
						>
							{types.map((t) => (
								<MenuItem key={t} value={t}>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
										<Box
											sx={{
												width: 12,
												height: 12,
												borderRadius: '50%',
												bgcolor: getTypeColor(t),
											}}
										/>
										{t}
									</Box>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				{/* Archetype - Full Width */}
				<Grid item xs={12}>
					<FormControl fullWidth size="small">
						<InputLabel>Archetype</InputLabel>
						<Select
							value={archetype}
							label="Archetype"
							onChange={(e: SelectChangeEvent<string>) => {
								dispatch(creatureBuilderActions.setArchetype(e.target.value))
							}}
							disabled={tier === null}
							renderValue={(value) => (
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
									<Box
										sx={{
											width: 12,
											height: 12,
											borderRadius: '50%',
											bgcolor: getArchetypeColor(value),
										}}
									/>
									{value}
								</Box>
							)}
						>
							{getAvailableArchetypes().map((a) => (
								<MenuItem key={a} value={a}>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
										<Box
											sx={{
												width: 12,
												height: 12,
												borderRadius: '50%',
												bgcolor: getArchetypeColor(a),
											}}
										/>
										{a}
									</Box>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			{/* Validation warnings */}
			{validation && validation.warnings.length > 0 && (
				<Box sx={{ mt: 2, p: 1.5, bgcolor: 'warning.light', borderRadius: 1 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
						<WarningIcon sx={{ fontSize: 18, color: 'warning.dark' }} />
						<Typography
							variant="caption"
							sx={{ fontWeight: 600, color: 'warning.dark' }}
						>
							Tier Validation
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
						{validation.warnings.map((warning, idx) => (
							<Chip
								key={idx}
								label={warning}
								size="small"
								sx={{
									height: 20,
									fontSize: '0.7rem',
									bgcolor: 'warning.main',
									color: 'warning.contrastText',
								}}
							/>
						))}
					</Box>
				</Box>
			)}
		</Paper>
	)
}

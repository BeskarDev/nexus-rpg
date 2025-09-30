import React, { useState } from 'react'
import {
	Box,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	TextField,
	Grid,
	MenuItem,
	Select,
	FormControl,
	InputLabel,
	Button,
	IconButton,
	Chip,
	Autocomplete,
} from '@mui/material'
import {
	ExpandMore,
	Add,
	Delete,
	Settings,
} from '@mui/icons-material'
import { CreatureAttack, CreatureAbility } from '../types/CreatureBuilder'

const ATTRIBUTE_DICE = ['d4', 'd6', 'd8', 'd10', 'd12', 'd12+1', 'd12+2']

const WEAPON_PROPERTIES = [
	'agile',
	'crush',
	'pierce',
	'slash',
	'reach',
	'light',
	'two-handed',
	'blast',
	'line',
	'cone',
]

const COMMON_CONDITIONS = [
	'bleeding',
	'blinded',
	'charmed',
	'confused',
	'deafened',
	'exhausted',
	'frightened',
	'grappled',
	'incapacitated',
	'invisible',
	'paralyzed',
	'petrified',
	'poisoned',
	'prone',
	'restrained',
	'stunned',
	'unconscious',
]

const DAMAGE_TYPES = [
	'physical',
	'fire',
	'frost',
	'lightning',
	'acid',
	'poison',
	'necrotic',
	'radiant',
	'psychic',
]

interface CreatureAdvancedSettingsProps {
	// Custom stats
	customHP: number | null
	customAV: number | null
	customStr: string | null
	customAgi: string | null
	customSpi: string | null
	customMnd: string | null
	customParry: number | null
	customDodge: number | null
	customResist: number | null
	// Arrays
	skills: string[]
	immunities: string[]
	resistances: string[]
	weaknesses: string[]
	attacks: CreatureAttack[]
	abilities: CreatureAbility[]
	// Handlers
	onCustomHPChange: (value: number | null) => void
	onCustomAVChange: (value: number | null) => void
	onCustomAttributeChange: (
		attr: 'str' | 'agi' | 'spi' | 'mnd',
		value: string | null,
	) => void
	onCustomDefenseChange: (
		defense: 'parry' | 'dodge' | 'resist',
		value: number | null,
	) => void
	onSkillsChange: (skills: string[]) => void
	onImmunitiesChange: (immunities: string[]) => void
	onResistancesChange: (resistances: string[]) => void
	onWeaknessesChange: (weaknesses: string[]) => void
	onAttacksChange: (attacks: CreatureAttack[]) => void
	onAbilitiesChange: (abilities: CreatureAbility[]) => void
	// Base values for display
	baseHP: number
	baseAV: string
	baseStr: string
	baseAgi: string
	baseSpi: string
	baseMnd: string
	baseParry: number
	baseDodge: number
	baseResist: number
}

export const CreatureAdvancedSettings: React.FC<
	CreatureAdvancedSettingsProps
> = ({
	customHP,
	customAV,
	customStr,
	customAgi,
	customSpi,
	customMnd,
	customParry,
	customDodge,
	customResist,
	skills,
	immunities,
	resistances,
	weaknesses,
	attacks,
	abilities,
	onCustomHPChange,
	onCustomAVChange,
	onCustomAttributeChange,
	onCustomDefenseChange,
	onSkillsChange,
	onImmunitiesChange,
	onResistancesChange,
	onWeaknessesChange,
	onAttacksChange,
	onAbilitiesChange,
	baseHP,
	baseAV,
	baseStr,
	baseAgi,
	baseSpi,
	baseMnd,
	baseParry,
	baseDodge,
	baseResist,
}) => {
	const [newAttack, setNewAttack] = useState<CreatureAttack>({
		name: '',
		properties: [],
		damage: '',
		description: '',
	})

	const [newAbility, setNewAbility] = useState<CreatureAbility>({
		name: '',
		description: '',
		recharge: '',
	})

	const handleAddAttack = () => {
		if (newAttack.name && newAttack.damage) {
			onAttacksChange([...attacks, newAttack])
			setNewAttack({ name: '', properties: [], damage: '', description: '' })
		}
	}

	const handleDeleteAttack = (index: number) => {
		onAttacksChange(attacks.filter((_, i) => i !== index))
	}

	const handleAddAbility = () => {
		if (newAbility.name && newAbility.description) {
			onAbilitiesChange([...abilities, newAbility])
			setNewAbility({ name: '', description: '', recharge: '' })
		}
	}

	const handleDeleteAbility = (index: number) => {
		onAbilitiesChange(abilities.filter((_, i) => i !== index))
	}

	return (
		<Box sx={{ mt: 3 }}>
			<Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Settings /> Advanced Settings
			</Typography>

			{/* Custom Stats Accordion */}
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMore />}>
					<Typography>Custom Stats Override</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2}>
						{/* HP and AV */}
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label={`HP (Base: ${baseHP})`}
								type="number"
								value={customHP ?? ''}
								onChange={(e) =>
									onCustomHPChange(
										e.target.value ? parseInt(e.target.value) : null,
									)
								}
								helperText="Leave empty to use calculated value"
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								fullWidth
								label={`AV (Base: ${baseAV})`}
								type="number"
								value={customAV ?? ''}
								onChange={(e) =>
									onCustomAVChange(
										e.target.value ? parseInt(e.target.value) : null,
									)
								}
								helperText="Leave empty to use calculated value"
							/>
						</Grid>

						{/* Attributes */}
						<Grid item xs={12}>
							<Typography variant="subtitle2" gutterBottom>
								Attributes
							</Typography>
						</Grid>
						<Grid item xs={6} md={3}>
							<FormControl fullWidth>
								<InputLabel>STR (Base: {baseStr})</InputLabel>
								<Select
									value={customStr ?? ''}
									label={`STR (Base: ${baseStr})`}
									onChange={(e) =>
										onCustomAttributeChange(
											'str',
											e.target.value || null,
										)
									}
								>
									<MenuItem value="">
										<em>Use Base</em>
									</MenuItem>
									{ATTRIBUTE_DICE.map((die) => (
										<MenuItem key={die} value={die}>
											{die}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6} md={3}>
							<FormControl fullWidth>
								<InputLabel>AGI (Base: {baseAgi})</InputLabel>
								<Select
									value={customAgi ?? ''}
									label={`AGI (Base: ${baseAgi})`}
									onChange={(e) =>
										onCustomAttributeChange(
											'agi',
											e.target.value || null,
										)
									}
								>
									<MenuItem value="">
										<em>Use Base</em>
									</MenuItem>
									{ATTRIBUTE_DICE.map((die) => (
										<MenuItem key={die} value={die}>
											{die}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6} md={3}>
							<FormControl fullWidth>
								<InputLabel>SPI (Base: {baseSpi})</InputLabel>
								<Select
									value={customSpi ?? ''}
									label={`SPI (Base: ${baseSpi})`}
									onChange={(e) =>
										onCustomAttributeChange(
											'spi',
											e.target.value || null,
										)
									}
								>
									<MenuItem value="">
										<em>Use Base</em>
									</MenuItem>
									{ATTRIBUTE_DICE.map((die) => (
										<MenuItem key={die} value={die}>
											{die}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6} md={3}>
							<FormControl fullWidth>
								<InputLabel>MND (Base: {baseMnd})</InputLabel>
								<Select
									value={customMnd ?? ''}
									label={`MND (Base: ${baseMnd})`}
									onChange={(e) =>
										onCustomAttributeChange(
											'mnd',
											e.target.value || null,
										)
									}
								>
									<MenuItem value="">
										<em>Use Base</em>
									</MenuItem>
									{ATTRIBUTE_DICE.map((die) => (
										<MenuItem key={die} value={die}>
											{die}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>

						{/* Defenses */}
						<Grid item xs={12}>
							<Typography variant="subtitle2" gutterBottom>
								Defenses
							</Typography>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								fullWidth
								label={`Parry (Base: ${baseParry})`}
								type="number"
								value={customParry ?? ''}
								onChange={(e) =>
									onCustomDefenseChange(
										'parry',
										e.target.value ? parseInt(e.target.value) : null,
									)
								}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								fullWidth
								label={`Dodge (Base: ${baseDodge})`}
								type="number"
								value={customDodge ?? ''}
								onChange={(e) =>
									onCustomDefenseChange(
										'dodge',
										e.target.value ? parseInt(e.target.value) : null,
									)
								}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<TextField
								fullWidth
								label={`Resist (Base: ${baseResist})`}
								type="number"
								value={customResist ?? ''}
								onChange={(e) =>
									onCustomDefenseChange(
										'resist',
										e.target.value ? parseInt(e.target.value) : null,
									)
								}
							/>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>

			{/* Skills & Traits Accordion */}
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMore />}>
					<Typography>Skills & Traits</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Autocomplete
								multiple
								freeSolo
								options={[]}
								value={skills}
								onChange={(_, newValue) => onSkillsChange(newValue)}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Skills"
										helperText="Add skills (e.g., Fighting (3), Perception (2))"
									/>
								)}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<Autocomplete
								multiple
								freeSolo
								options={COMMON_CONDITIONS}
								value={immunities}
								onChange={(_, newValue) => onImmunitiesChange(newValue)}
								renderInput={(params) => (
									<TextField {...params} label="Immunities" />
								)}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<Autocomplete
								multiple
								freeSolo
								options={DAMAGE_TYPES}
								value={resistances}
								onChange={(_, newValue) => onResistancesChange(newValue)}
								renderInput={(params) => (
									<TextField {...params} label="Resistances" />
								)}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<Autocomplete
								multiple
								freeSolo
								options={DAMAGE_TYPES}
								value={weaknesses}
								onChange={(_, newValue) => onWeaknessesChange(newValue)}
								renderInput={(params) => (
									<TextField {...params} label="Weaknesses" />
								)}
							/>
						</Grid>
					</Grid>
				</AccordionDetails>
			</Accordion>

			{/* Attacks Accordion */}
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMore />}>
					<Typography>Attacks ({attacks.length})</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box>
						{/* Existing Attacks */}
						{attacks.map((attack, index) => (
							<Box
								key={index}
								sx={{
									mb: 2,
									p: 2,
									border: '1px solid',
									borderColor: 'divider',
									borderRadius: 1,
								}}
							>
								<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
									<Typography variant="subtitle2">
										<strong>{attack.name}</strong>{' '}
										{attack.properties.length > 0 && (
											<em>({attack.properties.join(', ')})</em>
										)}
									</Typography>
									<IconButton
										size="small"
										onClick={() => handleDeleteAttack(index)}
									>
										<Delete />
									</IconButton>
								</Box>
								<Typography variant="body2">
									{attack.damage} damage
								</Typography>
								{attack.description && (
									<Typography variant="body2" color="text.secondary">
										{attack.description}
									</Typography>
								)}
							</Box>
						))}

						{/* Add New Attack */}
						<Box sx={{ mt: 2 }}>
							<Typography variant="subtitle2" gutterBottom>
								Add New Attack
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={12} md={4}>
									<TextField
										fullWidth
										label="Attack Name"
										value={newAttack.name}
										onChange={(e) =>
											setNewAttack({ ...newAttack, name: e.target.value })
										}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										fullWidth
										label="Damage (e.g., 6/8/10)"
										value={newAttack.damage}
										onChange={(e) =>
											setNewAttack({ ...newAttack, damage: e.target.value })
										}
										helperText="Format: weak/strong/critical"
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<Autocomplete
										multiple
										options={WEAPON_PROPERTIES}
										value={newAttack.properties}
										onChange={(_, newValue) =>
											setNewAttack({ ...newAttack, properties: newValue })
										}
										renderInput={(params) => (
											<TextField {...params} label="Properties" />
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										label="Description (optional)"
										value={newAttack.description}
										onChange={(e) =>
											setNewAttack({
												...newAttack,
												description: e.target.value,
											})
										}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant="outlined"
										startIcon={<Add />}
										onClick={handleAddAttack}
										disabled={!newAttack.name || !newAttack.damage}
									>
										Add Attack
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</AccordionDetails>
			</Accordion>

			{/* Abilities Accordion */}
			<Accordion>
				<AccordionSummary expandIcon={<ExpandMore />}>
					<Typography>Abilities ({abilities.length})</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Box>
						{/* Existing Abilities */}
						{abilities.map((ability, index) => (
							<Box
								key={index}
								sx={{
									mb: 2,
									p: 2,
									border: '1px solid',
									borderColor: 'divider',
									borderRadius: 1,
								}}
							>
								<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
									<Typography variant="subtitle2">
										<strong>{ability.name}</strong>
										{ability.recharge && ` (${ability.recharge})`}
									</Typography>
									<IconButton
										size="small"
										onClick={() => handleDeleteAbility(index)}
									>
										<Delete />
									</IconButton>
								</Box>
								<Typography variant="body2" color="text.secondary">
									{ability.description}
								</Typography>
							</Box>
						))}

						{/* Add New Ability */}
						<Box sx={{ mt: 2 }}>
							<Typography variant="subtitle2" gutterBottom>
								Add New Ability
							</Typography>
							<Grid container spacing={2}>
								<Grid item xs={12} md={4}>
									<TextField
										fullWidth
										label="Ability Name"
										value={newAbility.name}
										onChange={(e) =>
											setNewAbility({ ...newAbility, name: e.target.value })
										}
									/>
								</Grid>
								<Grid item xs={12} md={8}>
									<TextField
										fullWidth
										label="Recharge (optional)"
										value={newAbility.recharge}
										onChange={(e) =>
											setNewAbility({
												...newAbility,
												recharge: e.target.value,
											})
										}
										placeholder="e.g., Once per scene, Recharge 5-6"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										multiline
										rows={3}
										label="Description"
										value={newAbility.description}
										onChange={(e) =>
											setNewAbility({
												...newAbility,
												description: e.target.value,
											})
										}
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										variant="outlined"
										startIcon={<Add />}
										onClick={handleAddAbility}
										disabled={!newAbility.name || !newAbility.description}
									>
										Add Ability
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Box>
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}

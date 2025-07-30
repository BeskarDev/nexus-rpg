import React, { useState } from 'react'
import {
	Box,
	Typography,
	Chip,
	IconButton,
	Menu,
	MenuItem,
	TextField,
	Tooltip,
	Paper,
	Stack,
	Select,
	FormControl,
	InputLabel,
} from '@mui/material'
import {
	Add as AddIcon,
	Close as CloseIcon,
	Edit as EditIcon,
	CheckCircle,
	Delete as DeleteIcon,
	Bloodtype,
	VisibilityOff,
	Whatshot,
	Favorite,
	Psychology,
	RemoveRedEye,
	HearingDisabled,
	SentimentDissatisfied,
	CenterFocusWeak,
	SentimentVeryDissatisfied,
	PanTool,
	VisibilityOutlined,
	MyLocation,
	FlashOff,
	Coronavirus,
	ArrowDownward,
	ArrowForward,
	Link,
	VoiceOverOff,
	Speed,
	RotateLeft,
	StarRate,
	Air,
	Bedtime,
} from '@mui/icons-material'
import {
	StatusEffect,
	StatusEffectType,
	statusEffectTypeArray,
} from '@site/src/types/Character'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import conditionsData from '@site/src/utils/json/conditions.json'

// Icon mapping for status effects using Material-UI icons
const statusEffectIcons: Record<StatusEffectType, React.ReactElement> = {
	bleeding: <Bloodtype />,
	blinded: <VisibilityOff />,
	burning: <Whatshot />,
	charmed: <Favorite />,
	confused: <Psychology />,
	dazed: <RemoveRedEye />,
	deafened: <HearingDisabled />,
	deprived: <SentimentDissatisfied />,
	distracted: <CenterFocusWeak />,
	frightened: <SentimentVeryDissatisfied />,
	grappled: <PanTool />,
	hidden: <VisibilityOutlined />,
	marked: <MyLocation />,
	paralyzed: <FlashOff />,
	poisoned: <Coronavirus />,
	prone: <ArrowDownward />,
	pushed: <ArrowForward />,
	restrained: <Link />,
	silenced: <VoiceOverOff />,
	slowed: <Speed />,
	staggered: <RotateLeft />,
	stunned: <StarRate />,
	suffocating: <Air />,
	unconscious: <Bedtime />,
}

// Duration options for status effects
const durationOptions = [
	{ value: 'briefly', label: 'Briefly' },
	{ value: 'short', label: 'Short' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'long', label: 'Long' },
	{ value: '', label: 'Custom' },
]

interface StatusEffectsProps {
	statusEffects: StatusEffect[]
}

export const StatusEffects: React.FC<StatusEffectsProps> = ({
	statusEffects,
}) => {
	const dispatch = useAppDispatch()
	const [addMenuAnchor, setAddMenuAnchor] = useState<null | HTMLElement>(null)
	const [editingId, setEditingId] = useState<string | null>(null)
	const [editDuration, setEditDuration] = useState<number | undefined>(
		undefined,
	)
	const [editDurationType, setEditDurationType] = useState<string>('briefly')
	const [editIntensity, setEditIntensity] = useState<number | undefined>(
		undefined,
	)

	// Ensure statusEffects is always an array
	const safeStatusEffects = Array.isArray(statusEffects) ? statusEffects : []

	const handleAddMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAddMenuAnchor(event.currentTarget)
	}

	const handleAddMenuClose = () => {
		setAddMenuAnchor(null)
	}

	const handleAddStatusEffect = (statusEffectType: StatusEffectType) => {
		dispatch(characterSheetActions.addStatusEffect(statusEffectType))
		handleAddMenuClose()
	}

	const handleToggleStatusEffect = (id: string) => {
		dispatch(characterSheetActions.toggleStatusEffect(id))
	}

	const handleRemoveStatusEffect = (id: string) => {
		dispatch(characterSheetActions.removeStatusEffect(id))
	}

	const handleStartEdit = (statusEffect: StatusEffect) => {
		setEditingId(statusEffect.id)
		setEditDuration(statusEffect.duration)
		setEditIntensity(statusEffect.intensity)

		// Determine duration type
		if (statusEffect.duration === 1) {
			setEditDurationType('briefly')
		} else if (statusEffect.narrativeDuration) {
			setEditDurationType(statusEffect.narrativeDuration)
		} else if (statusEffect.duration !== undefined) {
			// This should not happen anymore, but keeping for compatibility
			setEditDurationType('custom')
		} else {
			// No duration set = custom
			setEditDurationType('custom')
		}
	}

	const handleSaveEdit = () => {
		if (editingId) {
			// Build update object and clear fields array
			const update: Partial<StatusEffect> = {}
			const clearFields: string[] = []

			// Handle duration and narrative duration
			if (editDurationType === 'briefly') {
				update.duration = 1
				clearFields.push('narrativeDuration')
			} else if (
				editDurationType === 'short' ||
				editDurationType === 'medium' ||
				editDurationType === 'long'
			) {
				update.narrativeDuration = editDurationType as
					| 'short'
					| 'medium'
					| 'long'
				clearFields.push('duration')
			} else if (editDurationType === '' || editDurationType === 'custom') {
				// Custom duration - no specific duration set, just clear narrative duration
				clearFields.push('narrativeDuration')
			}

			if (editIntensity !== undefined) {
				update.intensity = editIntensity
			}

			dispatch(
				characterSheetActions.updateStatusEffect({
					id: editingId,
					update,
					clearFields,
				}),
			)
		}
		setEditingId(null)
		setEditDuration(undefined)
		setEditDurationType('briefly')
		setEditIntensity(undefined)
	}

	const handleCancelEdit = () => {
		setEditingId(null)
		setEditDuration(undefined)
		setEditDurationType('briefly')
		setEditIntensity(undefined)
	}

	const getStatusEffectLabel = (statusEffect: StatusEffect) => {
		let label = statusEffect.name.replace(/\s*\(X\)/g, '') // Remove (X) from display name

		if (statusEffect.intensity !== undefined) {
			label += ` (${statusEffect.intensity})`
		}

		if (statusEffect.duration !== undefined) {
			if (statusEffect.duration === 1) {
				label += ` [briefly]`
			} else {
				label += ` [${statusEffect.duration} turns]`
			}
		} else if (statusEffect.narrativeDuration) {
			label += ` [${statusEffect.narrativeDuration}]`
		}

		return label
	}

	const getAvailableStatusEffects = () => {
		const existingTypes = safeStatusEffects.map((effect) => effect.name)
		return statusEffectTypeArray.filter((type) => !existingTypes.includes(type))
	}

	const getConditionDescription = (conditionName: string) => {
		const condition = conditionsData.find(
			(c) =>
				c.name.toLowerCase().replace(/\s*\(x\)/g, '') ===
				conditionName.toLowerCase().replace(/\s*\(x\)/g, ''),
		)
		return condition?.description || ''
	}

	const requiresIntensity = (conditionName: string) => {
		return (
			conditionName.includes('(X)') ||
			['bleeding', 'burning', 'marked'].includes(conditionName)
		)
	}

	return (
		<Paper
			sx={{
				py: 1,
				px: 2,
        mb: 1,
				maxWidth: '100%',
        boxShadow: 'none',
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<Typography variant="subtitle2" fontWeight="bold">
					Status Conditions
				</Typography>
				<Tooltip title="Add status effect">
					<IconButton size="small" onClick={handleAddMenuOpen}>
						<AddIcon fontSize="small" />
					</IconButton>
				</Tooltip>
			</Box>

			<Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap>
				{safeStatusEffects.map((statusEffect) => (
					<Box
						key={statusEffect.id}
						sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
					>
						{editingId === statusEffect.id ? (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: 1,
									p: 1,
									border: '1px solid',
									borderRadius: 1,
									flexWrap: 'wrap',
									minWidth: '300px',
								}}
							>
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
									{React.cloneElement(statusEffectIcons[statusEffect.name], {
										fontSize: 'small',
										color: 'primary',
									})}
									<Typography variant="caption" fontWeight="bold">
										{statusEffect.name.replace(/\s*\(X\)/g, '')}
									</Typography>
								</Box>

								<FormControl size="small" sx={{ minWidth: 120 }}>
									<InputLabel>Duration</InputLabel>
									<Select
										value={editDurationType}
										onChange={(e) => setEditDurationType(e.target.value)}
										label="Duration"
									>
										{durationOptions.map((option) => (
											<MenuItem key={option.value} value={option.value}>
												{option.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>

								{requiresIntensity(statusEffect.name) && (
									<TextField
										size="small"
										label="Intensity"
										type="number"
										value={editIntensity || ''}
										onChange={(e) =>
											setEditIntensity(
												e.target.value ? Number(e.target.value) : undefined,
											)
										}
										sx={{ width: '80px' }}
										inputProps={{ min: 1 }}
									/>
								)}

								<IconButton
									size="small"
									onClick={handleSaveEdit}
									color="primary"
								>
									<CheckCircle />
								</IconButton>
								<IconButton size="small" onClick={handleCancelEdit}>
									<CloseIcon />
								</IconButton>
								<IconButton
									size="small"
									onClick={() => {
										handleRemoveStatusEffect(statusEffect.id)
										setEditingId(null)
									}}
									color="error"
									sx={{ ml: 1 }}
									title="Remove status effect"
								>
									<DeleteIcon />
								</IconButton>
							</Box>
						) : (
							<Tooltip title={getConditionDescription(statusEffect.name)} arrow>
								<Chip
									icon={React.cloneElement(
										statusEffectIcons[statusEffect.name],
										{
											fontSize: 'small',
										},
									)}
									label={getStatusEffectLabel(statusEffect)}
									variant={statusEffect.active ? 'filled' : 'outlined'}
									color={statusEffect.active ? 'error' : 'default'}
									onClick={() => handleToggleStatusEffect(statusEffect.id)}
									onDelete={(event) => {
										event.stopPropagation()
										handleStartEdit(statusEffect)
									}}
									deleteIcon={<EditIcon />}
									sx={{
										'& .MuiChip-icon': {
											fontSize: '16px',
										},
										'& .MuiChip-label': {
											fontSize: '12px',
										},
										'& .MuiChip-deleteIcon': {
											fontSize: '16px',
											'&:hover': {
												color: 'primary.main',
											},
										},
										cursor: 'pointer',
										opacity: statusEffect.active ? 1 : 0.6,
									}}
								/>
							</Tooltip>
						)}
					</Box>
				))}
			</Stack>

			<Menu
				anchorEl={addMenuAnchor}
				open={Boolean(addMenuAnchor)}
				onClose={handleAddMenuClose}
				PaperProps={{
					style: {
						maxHeight: 400,
						width: '300px',
					},
				}}
			>
				{getAvailableStatusEffects().map((statusEffectType) => (
					<Tooltip
						key={statusEffectType}
						title={getConditionDescription(statusEffectType)}
						placement="left"
						arrow
					>
						<MenuItem
							onClick={() => handleAddStatusEffect(statusEffectType)}
							sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
						>
							{React.cloneElement(statusEffectIcons[statusEffectType], {
								fontSize: 'small',
							})}
							<Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
								{statusEffectType.replace(/\s*\(X\)/g, '')}
							</Typography>
						</MenuItem>
					</Tooltip>
				))}
				{getAvailableStatusEffects().length === 0 && (
					<MenuItem disabled>
						<Typography variant="body2" color="text.secondary">
							All status effects added
						</Typography>
					</MenuItem>
				)}
			</Menu>
		</Paper>
	)
}

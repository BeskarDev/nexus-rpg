import React, { useMemo, useState } from 'react'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Typography,
	Chip,
	IconButton,
	Tooltip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
} from '@mui/material'
import {
	ExpandMore,
	PlayArrow,
	Bolt,
	CircleOutlined,
	FlashOn,
	AllInclusive,
	Clear,
} from '@mui/icons-material'
import { Ability, Weapon, Item, Spell } from '../../../../types/Character'
import { ActionType } from '../../../../types/ActionType'
import { SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { characterSheetActions } from '../../characterSheetReducer'

type QuickRefGroup = {
	title: string
	icon: React.ReactNode
	items: QuickRefItem[]
}

type QuickRefItem = {
	id: string
	name: string
	description: string
	source: 'ability' | 'weapon' | 'item' | 'spell'
	actionType?: ActionType
	rank?: number
}

const getActionTypeIcon = (type: ActionType) => {
	switch (type) {
		case 'Action':
			return <PlayArrow fontSize="small" />
		case 'Quick Action':
			return <Bolt fontSize="small" />
		case 'Passive Ability':
			return <CircleOutlined fontSize="small" />
		case 'Triggered':
			return <FlashOn fontSize="small" />
		case 'Free':
			return <AllInclusive fontSize="small" />
		default:
			return <CircleOutlined fontSize="small" />
	}
}

export const QuickRefSection: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false)
	
	const {
		abilities = [],
		quickRefSelections = { abilities: [], weapons: [], items: [], spells: [] }
	} = useMemo(() => activeCharacter.skills, [activeCharacter.skills])
	
	const { weapons = [] } = useMemo(() => activeCharacter.items, [activeCharacter.items])
	const { items = [] } = useMemo(() => activeCharacter.items, [activeCharacter.items])
	const { spells = [] } = useMemo(() => activeCharacter.spells, [activeCharacter.spells])

	// Function to determine action type for dynamic items
	const determineActionType = (item: Weapon | Item | Spell): ActionType => {
		if ('properties' in item && item.properties) {
			// For spells and items, check properties for action type indicators
			const props = item.properties.toLowerCase()
			if (props.includes('quick action') || props.includes('reaction')) {
				return 'Quick Action'
			}
			if (props.includes('triggered') || props.includes('trigger')) {
				return 'Triggered'
			}
			if (props.includes('free') || props.includes('passive')) {
				return 'Free'
			}
		}
		
		// Check description for action type hints
		const description = ('description' in item ? item.description : ('effect' in item ? item.effect : '')) || ''
		const descLower = description.toLowerCase()
		if (descLower.includes('quick action') || descLower.includes('reaction')) {
			return 'Quick Action'
		}
		if (descLower.includes('triggered') || descLower.includes('trigger')) {
			return 'Triggered'
		}
		if (descLower.includes('free action') || descLower.includes('passive')) {
			return 'Free'
		}
		
		// Default based on item type
		if ('rank' in item) {
			// This is a spell
			return 'Action' // Most spells are actions
		}
		
		return 'Action' // Default for weapons and most items
	}

	// Get selected items organized by action type
	const quickRefGroups = useMemo((): QuickRefGroup[] => {
		const selectedAbilities = abilities.filter(ability => 
			quickRefSelections.abilities.includes(ability.id)
		)
		const selectedWeapons = weapons.filter(weapon => 
			quickRefSelections.weapons.includes(weapon.id)
		)
		const selectedItems = items.filter(item => 
			quickRefSelections.items.includes(item.id)
		)
		const selectedSpells = spells.filter(spell => 
			quickRefSelections.spells?.includes(spell.id)
		)

		// Convert to QuickRefItems
		const quickRefItems: QuickRefItem[] = [
			...selectedAbilities.map(ability => ({
				id: ability.id,
				name: ability.title,
				description: ability.description,
				source: 'ability' as const,
				actionType: ability.actionType,
				rank: ability.rank,
			})),
			...selectedWeapons.map(weapon => ({
				id: weapon.id,
				name: weapon.name,
				description: weapon.description || `${weapon.damage.base} + ${weapon.damage.weapon} ${weapon.damage.type} damage`,
				source: 'weapon' as const,
				actionType: determineActionType(weapon),
			})),
			...selectedItems.map(item => ({
				id: item.id,
				name: item.name,
				description: item.description,
				source: 'item' as const,
				actionType: determineActionType(item),
			})),
			...selectedSpells.map(spell => ({
				id: spell.id,
				name: spell.name,
				description: spell.effect,
				source: 'spell' as const,
				actionType: determineActionType(spell),
				rank: spell.rank,
			})),
		]

		// Group by action type
		const actions = quickRefItems.filter(item => item.actionType === 'Action')
		const quickActions = quickRefItems.filter(item => item.actionType === 'Quick Action')
		const passiveAbilities = quickRefItems.filter(item => item.actionType === 'Passive Ability')
		const triggered = quickRefItems.filter(item => item.actionType === 'Triggered')
		const free = quickRefItems.filter(item => item.actionType === 'Free')
		const other = quickRefItems.filter(item => item.actionType === 'Other')

		const groups: QuickRefGroup[] = []
		
		if (actions.length > 0) {
			groups.push({
				title: 'Actions',
				icon: <PlayArrow fontSize="small" />,
				items: actions,
			})
		}
		
		if (quickActions.length > 0) {
			groups.push({
				title: 'Quick Actions',
				icon: <Bolt fontSize="small" />,
				items: quickActions,
			})
		}
		
		if (passiveAbilities.length > 0) {
			groups.push({
				title: 'Passive Abilities',
				icon: <CircleOutlined fontSize="small" />,
				items: passiveAbilities,
			})
		}
		
		if (triggered.length > 0) {
			groups.push({
				title: 'Triggered',
				icon: <FlashOn fontSize="small" />,
				items: triggered,
			})
		}
		
		if (free.length > 0) {
			groups.push({
				title: 'Free',
				icon: <AllInclusive fontSize="small" />,
				items: free,
			})
		}
		
		if (other.length > 0) {
			groups.push({
				title: 'Other',
				icon: <CircleOutlined fontSize="small" />,
				items: other,
			})
		}

		return groups
	}, [abilities, weapons, items, spells, quickRefSelections])

	const totalSelected = quickRefSelections.abilities.length + 
						 quickRefSelections.weapons.length + 
						 quickRefSelections.items.length +
						 (quickRefSelections.spells?.length || 0)

	const handleClearAll = () => {
		setConfirmDialogOpen(true)
	}

	const handleConfirmClear = () => {
		dispatch(characterSheetActions.clearQuickRef())
		setConfirmDialogOpen(false)
	}

	const handleCancelClear = () => {
		setConfirmDialogOpen(false)
	}

	if (totalSelected === 0) {
		return (
			<Box sx={{ mb: 3 }}>
				<SectionHeader>Quick Ref</SectionHeader>
				<Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
					Select abilities, weapons, items, or spells using the bookmark icon to see them here for quick reference during play.
				</Typography>
			</Box>
		)
	}

	return (
		<Box sx={{ mb: 3 }}>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
				<SectionHeader sx={{ mb: 0 }}>Quick Ref</SectionHeader>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography variant="caption" color="text.secondary">
						{totalSelected} selected
					</Typography>
					<Tooltip title="Clear all Quick Ref selections">
						<IconButton size="small" onClick={handleClearAll}>
							<Clear fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>
			</Box>

			{quickRefGroups.map((group, index) => (
				<Accordion key={group.title} defaultExpanded={index === 0}>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							{group.icon}
							<Typography variant="subtitle2" fontWeight="bold">
								{group.title}
							</Typography>
							<Chip 
								label={group.items.length} 
								size="small" 
								sx={{ ml: 1, minWidth: 20, height: 20 }}
							/>
						</Box>
					</AccordionSummary>
					<AccordionDetails>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							{group.items.map((item) => (
								<Accordion key={item.id} disableGutters sx={{ boxShadow: 'none', border: '1px solid', borderColor: 'divider' }}>
									<AccordionSummary 
										expandIcon={<ExpandMore />}
										sx={{ minHeight: 'auto', '& .MuiAccordionSummary-content': { margin: '8px 0' } }}
									>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
											{getActionTypeIcon(item.actionType || 'Other')}
											<Typography variant="subtitle2" fontWeight="bold" sx={{ flexGrow: 1 }}>
												{item.name}
												{item.rank && item.rank >= 1 && item.rank <= 5 && (
													<>
														{' '}
														<Typography 
															component="span" 
															sx={{ color: 'text.secondary', fontSize: '1.15em' }}
														>
															{['①', '②', '③', '④', '⑤'][item.rank - 1]}
														</Typography>
													</>
												)}
											</Typography>
											<Chip 
												label={item.source} 
												size="small" 
												variant="outlined"
												sx={{ textTransform: 'capitalize' }}
											/>
										</Box>
									</AccordionSummary>
									<AccordionDetails>
										{item.description && (
											<Typography variant="body2" color="text.secondary">
												{item.description}
											</Typography>
										)}
									</AccordionDetails>
								</Accordion>
							))}
						</Box>
					</AccordionDetails>
				</Accordion>
			))}

			{/* Confirmation Dialog for Clear All */}
			<Dialog open={confirmDialogOpen} onClose={handleCancelClear}>
				<DialogTitle>Clear All Quick References</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to clear all Quick Reference selections? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelClear}>Cancel</Button>
					<Button onClick={handleConfirmClear} color="error" autoFocus>
						Clear All
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}
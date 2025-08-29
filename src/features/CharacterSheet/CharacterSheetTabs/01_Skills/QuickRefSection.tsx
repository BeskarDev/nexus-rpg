import React, { useMemo } from 'react'
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
} from '@mui/material'
import {
	ExpandMore,
	PlayArrow,
	Bolt,
	CircleOutlined,
	Clear,
} from '@mui/icons-material'
import { Ability, Weapon, Item } from '../../../../types/Character'
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
	source: 'ability' | 'weapon' | 'item'
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
		default:
			return <CircleOutlined fontSize="small" />
	}
}

export const QuickRefSection: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	
	const {
		abilities = [],
		quickRefSelections = { abilities: [], weapons: [], items: [] }
	} = useMemo(() => activeCharacter.skills, [activeCharacter.skills])
	
	const { weapons = [] } = useMemo(() => activeCharacter.items, [activeCharacter.items])
	const { items = [] } = useMemo(() => activeCharacter.items, [activeCharacter.items])

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
				actionType: 'Action' as const, // Weapons are typically actions
			})),
			...selectedItems.map(item => ({
				id: item.id,
				name: item.name,
				description: item.description,
				source: 'item' as const,
				actionType: 'Other' as const, // Items vary, default to Other
			})),
		]

		// Group by action type
		const actions = quickRefItems.filter(item => item.actionType === 'Action')
		const quickActions = quickRefItems.filter(item => item.actionType === 'Quick Action')
		const passiveAbilities = quickRefItems.filter(item => item.actionType === 'Passive Ability')
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
		
		if (other.length > 0) {
			groups.push({
				title: 'Other',
				icon: <CircleOutlined fontSize="small" />,
				items: other,
			})
		}

		return groups
	}, [abilities, weapons, items, quickRefSelections])

	const totalSelected = quickRefSelections.abilities.length + 
						 quickRefSelections.weapons.length + 
						 quickRefSelections.items.length

	const handleClearAll = () => {
		dispatch(characterSheetActions.clearQuickRef())
	}

	if (totalSelected === 0) {
		return (
			<Box sx={{ mb: 3 }}>
				<SectionHeader>Quick Ref</SectionHeader>
				<Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
					Select abilities, weapons, or items using the checkboxes to see them here for quick reference during play.
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
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
							{group.items.map((item) => (
								<Box key={item.id} sx={{ 
									border: '1px solid',
									borderColor: 'divider',
									borderRadius: 1,
									p: 2,
								}}>
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
										{getActionTypeIcon(item.actionType || 'Other')}
										<Typography variant="subtitle2" fontWeight="bold">
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
									{item.description && (
										<Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
											{item.description}
										</Typography>
									)}
								</Box>
							))}
						</Box>
					</AccordionDetails>
				</Accordion>
			))}
		</Box>
	)
}
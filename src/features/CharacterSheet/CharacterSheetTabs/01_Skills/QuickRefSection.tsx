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
	Clear,
	Bookmark,
} from '@mui/icons-material'
import { Ability, Weapon, Item, Spell, Damage, BaseDamageType } from '../../../../types/Character'
import { ActionType, getActionTypeIcon } from '../../../../types/ActionType'
import { SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { characterSheetActions } from '../../characterSheetReducer'
import { getSkillChipColor } from '../../../../constants/skills'

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
	sourceCategory?: string // for abilities: 'Talent', 'Folk', etc.
	actionType?: ActionType
	rank?: number
	properties?: string // for items/weapons/spells
	damage?: string // for weapons/spells that deal damage
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
	const spells = useMemo(() => activeCharacter.spells.spells || [], [activeCharacter.spells.spells])

	// Helper function to calculate actual damage values
	const calculateDamageDisplay = (damage: Damage, type: 'weapon' | 'spell'): string => {
		const baseDamage = (() => {
			switch (damage.base) {
				case 'STR':
					return activeCharacter.statistics.strength.value / 2
				case 'AGI':
					return activeCharacter.statistics.agility.value / 2
				case 'SPI':
					return activeCharacter.statistics.spirit.value / 2
				case 'MND':
					return activeCharacter.statistics.mind.value / 2
				case '':
					return 0
				default:
					return damage.base as number
			}
		})()

		const spellCatalystDamage = type === 'spell' ? activeCharacter.spells.spellCatalystDamage : 0

		if (damage.staticDamage) {
			const staticValue = baseDamage + damage.weapon + spellCatalystDamage + damage.other
			return `${staticValue} ${damage.type}`
		} else {
			const weakDamage = baseDamage + damage.weapon + spellCatalystDamage + damage.other + damage.otherWeak
			const strongDamage = baseDamage + damage.weapon * 2 + spellCatalystDamage * 2 + damage.other + damage.otherStrong
			const criticalDamage = baseDamage + damage.weapon * 3 + spellCatalystDamage * 3 + damage.other + damage.otherCritical
			return `${weakDamage}/${strongDamage}/${criticalDamage} ${damage.type}`
		}
	}

	// Helper function to get category color, ensuring no duplicates
	const getCategoryColor = (category: string, sourceType: 'ability' | 'weapon' | 'item' | 'spell'): string => {
		// For abilities, use skill colors based on category
		if (sourceType === 'ability') {
			switch (category) {
				case 'Talent':
					return getSkillChipColor('Fighting') // Brown
				case 'Combat Art':
					return getSkillChipColor('Athletics') // Green
				case 'Folk':
					return getSkillChipColor('Influence') // Gold
				case 'Background':
					return getSkillChipColor('Education') // Blue
				default:
					return getSkillChipColor('Insight') // Light blue
			}
		}
		
		// For other types, use distinct colors that don't conflict with ability categories
		switch (sourceType) {
			case 'weapon':
				return getSkillChipColor('Fortitude') // Red (distinct from all other categories)
			case 'item':
				return getSkillChipColor('Crafting') // Gray
			case 'spell':
				return getSkillChipColor('Arcana') // Purple
			default:
				return getSkillChipColor('Perception') // Medium blue
		}
	}
	// Function to determine action type for dynamic items
	const determineActionType = (item: Weapon | Item | Spell): ActionType => {
		if ('properties' in item && item.properties) {
			// For spells and items, check properties for action type indicators
			const props = item.properties.toLowerCase()
			if (props.includes('quick action') || props.includes('reaction') || props.includes('quick')) {
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
				sourceCategory: ability.tag || 'Ability', // Show category instead of generic "Ability"
				actionType: ability.actionType,
				rank: ability.rank,
			})),
			...selectedWeapons.map(weapon => {
				const damageStr = weapon.damage ? calculateDamageDisplay(weapon.damage, 'weapon') : undefined
				return {
					id: weapon.id,
					name: weapon.name,
					description: weapon.description || '',
					source: 'weapon' as const,
					sourceCategory: 'Weapon',
					actionType: determineActionType(weapon),
					properties: weapon.properties || undefined,
					damage: damageStr,
				}
			}),
			...selectedItems.map(item => ({
				id: item.id,
				name: item.name,
				description: item.description,
				source: 'item' as const,
				sourceCategory: 'Item',
				actionType: determineActionType(item),
				properties: item.properties || undefined,
			})),
			...selectedSpells.map(spell => {
				const damageStr = spell.dealsDamage && spell.damage ? 
					calculateDamageDisplay(spell.damage, 'spell') : undefined
				return {
					id: spell.id,
					name: spell.name,
					description: spell.effect,
					source: 'spell' as const,
					sourceCategory: 'Spell',
					actionType: determineActionType(spell),
					rank: spell.rank,
					properties: spell.properties || undefined,
					damage: damageStr,
				}
			}),
		]

		// Group by action type
		const actions = quickRefItems.filter(item => item.actionType === 'Action')
		const quickActions = quickRefItems.filter(item => item.actionType === 'Quick Action')
		const passiveAbilities = quickRefItems.filter(item => item.actionType === 'Passive')
		const triggered = quickRefItems.filter(item => item.actionType === 'Triggered')
		const free = quickRefItems.filter(item => item.actionType === 'Free')
		const other = quickRefItems.filter(item => item.actionType === 'Other')

		const groups: QuickRefGroup[] = []
		
		if (actions.length > 0) {
			groups.push({
				title: 'Actions',
				icon: getActionTypeIcon('Action'),
				items: actions.sort((a, b) => a.name.localeCompare(b.name)),
			})
		}
		
		if (quickActions.length > 0) {
			groups.push({
				title: 'Quick Actions',
				icon: getActionTypeIcon('Quick Action'),
				items: quickActions.sort((a, b) => a.name.localeCompare(b.name)),
			})
		}
		
		if (triggered.length > 0) {
			groups.push({
				title: 'Triggered',
				icon: getActionTypeIcon('Triggered'),
				items: triggered.sort((a, b) => a.name.localeCompare(b.name)),
			})
		}
		
		if (free.length > 0) {
			groups.push({
				title: 'Free',
				icon: getActionTypeIcon('Free'),
				items: free.sort((a, b) => a.name.localeCompare(b.name)),
			})
		}
		
		if (passiveAbilities.length > 0) {
			groups.push({
				title: 'Passive',
				icon: getActionTypeIcon('Passive'),
				items: passiveAbilities.sort((a, b) => a.name.localeCompare(b.name)),
			})
		}
		
		if (other.length > 0) {
			groups.push({
				title: 'Other',
				icon: getActionTypeIcon('Other'),
				items: other.sort((a, b) => a.name.localeCompare(b.name)),
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

	const handleRemoveItem = (itemId: string, source: 'ability' | 'weapon' | 'item' | 'spell') => {
		switch (source) {
			case 'ability':
				dispatch(characterSheetActions.toggleQuickRefAbility(itemId))
				break
			case 'weapon':
				dispatch(characterSheetActions.toggleQuickRefWeapon(itemId))
				break
			case 'item':
				dispatch(characterSheetActions.toggleQuickRefItem(itemId))
				break
			case 'spell':
				dispatch(characterSheetActions.toggleQuickRefSpell(itemId))
				break
		}
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
				<Accordion 
					key={group.title} 
					defaultExpanded={index === 0}
					disableGutters
					sx={{ 
						flexGrow: 1, 
						mt: 0, 
						mr: 1, 
						width: '100%',
						boxShadow: 'none', 
						border: '1px solid', 
						borderColor: 'divider'
					}}
				>
					<AccordionSummary 
						expandIcon={<ExpandMore />}
						sx={{
							gap: 1,
							pt: 0,
							px: 1,
							flexDirection: 'row-reverse',
							'& .MuiAccordionSummary-content': {
								display: 'block',
							},
						}}
					>
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
					<AccordionDetails sx={{ pt: 0, px: 1 }}>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							{group.items.map((item) => (
								<Accordion 
									key={item.id} 
									disableGutters 
									sx={{ 
										flexGrow: 1, 
										mt: 0, 
										mr: 1, 
										width: '100%',
										boxShadow: 'none', 
										border: '1px solid', 
										borderColor: 'divider'
									}}
								>
									<AccordionSummary 
										expandIcon={<ExpandMore />}
										sx={{
											gap: 1,
											pt: 0,
											px: 1,
											flexDirection: 'row-reverse',
											'& .MuiAccordionSummary-content': {
												display: 'block',
											},
										}}
									>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
											<Typography variant="subtitle2" fontWeight="bold" sx={{ flexGrow: 1 }}>
												{item.name}
												{item.rank && item.rank >= 1 && item.rank <= 5 && (
														<Typography 
															component="span" 
															sx={{ color: 'text.secondary', fontSize: '1.15em', ml: 1 }}
														>
															{['①', '②', '③', '④', '⑤'][item.rank - 1]}
														</Typography>
												)}
											</Typography>
											<Chip 
												label={item.sourceCategory || item.source} 
												size="small" 
												variant="outlined"
												sx={{ 
													textTransform: 'capitalize',
													backgroundColor: getCategoryColor(item.sourceCategory || item.source, item.source) + '20',
													borderColor: getCategoryColor(item.sourceCategory || item.source, item.source),
													color: getCategoryColor(item.sourceCategory || item.source, item.source),
													flexShrink: 0,
													fontSize: '0.75rem'
												}}
											/>
										</Box>
									</AccordionSummary>
									<AccordionDetails sx={{ p: 1, pt: 0 }}>
										<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
											{/* Properties caption for items, weapons, and spells */}
											{item.properties && (
												<Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
													Properties: {item.properties}
												</Typography>
											)}
											{/* Damage caption for weapons and spells */}
											{item.damage && (
												<Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
													Damage: {item.damage}
												</Typography>
											)}
											{/* Description */}
											{item.description && (
												<Typography variant="body2" color="text.secondary">
													{item.description}
												</Typography>
											)}
											{/* Remove from Quick Ref button */}
											<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
												<Tooltip title="Remove from Quick Ref">
													<IconButton
														size="small"
														onClick={() => handleRemoveItem(item.id, item.source)}
														sx={{ 
															color: 'primary.main'
														}}
													>
														<Bookmark />
													</IconButton>
												</Tooltip>
											</Box>
										</Box>
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

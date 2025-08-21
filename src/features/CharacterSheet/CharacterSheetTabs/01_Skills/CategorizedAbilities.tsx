import { AddCircle, ExpandMore, Build, Search } from '@mui/icons-material'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	Typography,
	Tooltip,
	Menu,
	MenuItem,
	FormControlLabel,
	Checkbox,
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Ability } from '../../../../types/Character'
import { SectionHeader } from '../../CharacterSheet'
import { ABILITY_TAGS, AbilityTag } from '../../../../types/AbilityTag'

import { DynamicList } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { CombatArtsSearchDialog } from './CombatArtsSearchDialog'
import { TalentsSearchDialog } from '../02_Items/SearchDialog/TalentsSearchDialog'
import { AbilityRow } from './AbilityRow'

export const CategorizedAbilities: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { abilities, abilityCategoryVisibility } = useMemo(
		() => activeCharacter.skills,
		[activeCharacter.skills],
	)

	const [settingsMenuAnchor, setSettingsMenuAnchor] =
		useState<null | HTMLElement>(null)
	const [isCombatArtsDialogOpen, setIsCombatArtsDialogOpen] = useState(false)
	const [isTalentsDialogOpen, setIsTalentsDialogOpen] = useState(false)

	const abilitiesByTag = useMemo(() => {
		const grouped: Record<AbilityTag, Ability[]> = {
			'Combat Art': [],
			Talent: [],
			Folk: [],
			Other: [],
		}

		abilities.forEach((ability) => {
			const tag = ability.tag || 'Other'
			grouped[tag].push(ability)
		})

		return grouped
	}, [abilities])

	const addNewAbility = (tag: AbilityTag) => {
		dispatch(characterSheetActions.addNewAbility({ tag }))
	}

	const updateAbility = (update: Partial<Ability>, abilityId: string) => {
		const index = abilities.findIndex((a) => a.id === abilityId)
		if (index >= 0) {
			dispatch(characterSheetActions.updateAbility({ update, index }))
		}
	}

	const moveAbilityToCategory = (abilityId: string, newTag: AbilityTag) => {
		const index = abilities.findIndex((a) => a.id === abilityId)
		if (index >= 0) {
			dispatch(
				characterSheetActions.updateAbility({
					update: { tag: newTag },
					index,
				}),
			)
		}
	}

	const deleteAbility = (ability: Ability) => {
		dispatch(characterSheetActions.deleteAbility(ability))
	}

	const toggleCategoryVisibility = (tag: AbilityTag) => {
		dispatch(characterSheetActions.toggleAbilityCategoryVisibility(tag))
	}

	const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setSettingsMenuAnchor(event.currentTarget)
	}

	const handleSettingsMenuClose = () => {
		setSettingsMenuAnchor(null)
	}

	const onAbilityReorder =
		(tag: AbilityTag) =>
		({ source, destination }: DropResult) => {
			// dropped outside the list
			if (!destination) return

			const tagAbilities = abilitiesByTag[tag]
			const sourceAbility = tagAbilities[source.index]

			// Check if we're dragging within the same category
			if (source.droppableId === destination.droppableId) {
				// Same category reordering
				const destinationAbility = tagAbilities[destination.index]
				const sourceGlobalIndex = abilities.findIndex(
					(a) => a.id === sourceAbility.id,
				)
				const destinationGlobalIndex = abilities.findIndex(
					(a) => a.id === destinationAbility.id,
				)

				dispatch(
					characterSheetActions.reorderAbility({
						source: sourceGlobalIndex,
						destination: destinationGlobalIndex,
					}),
				)
			}
		}

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', width: '25rem' }}>
			{/* Header with category settings menu */}
			<Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
				<SectionHeader sx={{ mb: 0 }}>Abilities</SectionHeader>
				<Tooltip title="toggle ability categories">
					<IconButton
						size="small"
						onClick={handleSettingsMenuOpen}
						sx={{
							border: '1px solid',
							borderColor: 'divider',
						}}
					>
						<Build fontSize="inherit" />
					</IconButton>
				</Tooltip>

				<Menu
					anchorEl={settingsMenuAnchor}
					open={Boolean(settingsMenuAnchor)}
					onClose={handleSettingsMenuClose}
					transformOrigin={{ horizontal: 'left', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
				>
					{ABILITY_TAGS.map((tag) => {
						const isVisible = abilityCategoryVisibility?.[tag] ?? true
						return (
							<MenuItem key={tag} dense>
								<FormControlLabel
									control={
										<Checkbox
											checked={isVisible}
											onChange={() => {
												toggleCategoryVisibility(tag)
											}}
											size="small"
										/>
									}
									label={tag}
									sx={{ width: '100%', margin: 0 }}
								/>
							</MenuItem>
						)
					})}
				</Menu>
			</Box>

			{ABILITY_TAGS.map((tag) => {
				const tagAbilities = abilitiesByTag[tag]
				const isVisible = abilityCategoryVisibility?.[tag] ?? true

				if (!isVisible) {
					return null
				}

				return (
					<Accordion key={tag} defaultExpanded sx={{ flexGrow: 1 }}>
						<AccordionSummary expandIcon={<ExpandMore />}>
							<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
								<SectionHeader sx={{ mb: 0 }}>{tag}</SectionHeader>
								<IconButton
									onClick={(event) => {
										addNewAbility(tag)
										event.stopPropagation()
									}}
								>
									<AddCircle />
								</IconButton>
								{tag === 'Combat Art' && (
									<Tooltip title="Search Combat Arts from database">
										<IconButton
											size="small"
											onClick={(event) => {
												setIsCombatArtsDialogOpen(true)
												event.stopPropagation()
											}}
											sx={{ ml: -1 }}
										>
											<Search />
										</IconButton>
									</Tooltip>
								)}
								{tag === 'Talent' && (
									<Tooltip title="Search Talents from database">
										<IconButton
											size="small"
											onClick={(event) => {
												setIsTalentsDialogOpen(true)
												event.stopPropagation()
											}}
											sx={{ ml: -1 }}
										>
											<Search />
										</IconButton>
									</Tooltip>
								)}
							</Box>
						</AccordionSummary>
						<AccordionDetails sx={{ overflowY: 'auto', maxHeight: '30rem' }}>
							<DynamicList
								droppableId={`abilities-${tag}`}
								onDragEnd={onAbilityReorder(tag)}
							>
								{tagAbilities.map((ability, index) => (
									<DynamicListItem
										key={ability.id}
										id={ability.id}
										index={index}
										sx={{ alignItems: 'center' }}
									>
										<AbilityRow
											key={ability.id}
											title={ability.title}
											description={ability.description}
											tag={ability.tag}
											actionType={ability.actionType}
											rank={ability.rank}
											availableTags={ABILITY_TAGS}
											updateAbility={(update) =>
												updateAbility(update, ability.id)
											}
											moveToCategory={(newTag) =>
												moveAbilityToCategory(ability.id, newTag)
											}
											deleteAbility={() => deleteAbility(ability)}
										/>
									</DynamicListItem>
								))}
							</DynamicList>
						</AccordionDetails>
					</Accordion>
				)
			})}

			<CombatArtsSearchDialog
				open={isCombatArtsDialogOpen}
				onClose={() => setIsCombatArtsDialogOpen(false)}
				character={activeCharacter}
				onImportCombatArts={(combatArts) => {
					combatArts.forEach((combatArt) => {
						dispatch(characterSheetActions.importAbilities([combatArt]))
					})
					setIsCombatArtsDialogOpen(false)
				}}
			/>

			<TalentsSearchDialog
				open={isTalentsDialogOpen}
				onClose={() => setIsTalentsDialogOpen(false)}
				character={activeCharacter}
				onImportTalents={(talents) => {
					talents.forEach((talent) => {
						dispatch(characterSheetActions.importAbilities([talent]))
					})
					setIsTalentsDialogOpen(false)
				}}
			/>
		</Box>
	)
}

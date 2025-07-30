import { AddCircle, ExpandMore } from '@mui/icons-material'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
} from '@mui/material'
import React, { useMemo } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Ability } from '../../../../types/Character'
import { SectionHeader } from '../../CharacterSheet'

import { DynamicList } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { AbilityRow } from './AbilityRow'

export type AbilityTag = 'Combat Art' | 'Talent' | 'Folk' | 'Other'

const ABILITY_TAGS: AbilityTag[] = ['Combat Art', 'Talent', 'Folk', 'Other']

export const CategorizedAbilities: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { abilities } = useMemo(
		() => activeCharacter.skills,
		[activeCharacter.skills],
	)

	const abilitiesByTag = useMemo(() => {
		const grouped: Record<AbilityTag, Ability[]> = {
			'Combat Art': [],
			'Talent': [],
			'Folk': [],
			'Other': [],
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
		const index = abilities.findIndex(a => a.id === abilityId)
		if (index >= 0) {
			dispatch(characterSheetActions.updateAbility({ update, index }))
		}
	}

	const moveAbilityToCategory = (abilityId: string, newTag: AbilityTag) => {
		const index = abilities.findIndex(a => a.id === abilityId)
		if (index >= 0) {
			dispatch(characterSheetActions.updateAbility({ 
				update: { tag: newTag }, 
				index 
			}))
		}
	}

	const deleteAbility = (ability: Ability) => {
		dispatch(characterSheetActions.deleteAbility(ability))
	}

	const onAbilityReorder = (tag: AbilityTag) => ({ source, destination }: DropResult) => {
		// dropped outside the list
		if (!destination) return

		const tagAbilities = abilitiesByTag[tag]
		const sourceAbility = tagAbilities[source.index]
		
		// Check if we're dragging within the same category
		if (source.droppableId === destination.droppableId) {
			// Same category reordering
			const destinationAbility = tagAbilities[destination.index]
			const sourceGlobalIndex = abilities.findIndex(a => a.id === sourceAbility.id)
			const destinationGlobalIndex = abilities.findIndex(a => a.id === destinationAbility.id)

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
			{ABILITY_TAGS.map((tag) => {
				const tagAbilities = abilitiesByTag[tag]
				
				return (
					<Accordion 
						key={tag}
						defaultExpanded 
						sx={{ flexGrow: 1 }}
					>
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
										sx={{ alignItems: 'baseline' }}
									>
										<AbilityRow
											key={ability.id}
											title={ability.title}
											description={ability.description}
											tag={ability.tag}
											availableTags={ABILITY_TAGS}
											updateAbility={(update) => updateAbility(update, ability.id)}
											moveToCategory={(newTag) => moveAbilityToCategory(ability.id, newTag)}
											deleteAbility={() => deleteAbility(ability)}
										/>
									</DynamicListItem>
								))}
							</DynamicList>
						</AccordionDetails>
					</Accordion>
				)
			})}
		</Box>
	)
}

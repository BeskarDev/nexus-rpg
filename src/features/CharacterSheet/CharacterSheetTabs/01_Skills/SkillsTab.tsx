import { AddCircle, ExpandMore, HelpOutline } from '@mui/icons-material'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	Tooltip,
} from '@mui/material'
import React, { useMemo } from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Ability, CharacterDocument, Skill } from '../../../../types/Character'
import { AttributeField, SectionHeader } from '../../CharacterSheet'

import { DynamicList, reorder } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { AbilityRow } from '../AbilityRow'
import { SkillRow } from './SkillRow'

export const SkillsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { xp, skills, abilities } = activeCharacter.skills

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const spendXP = useMemo(() => {
		const newSpendXP = skills
			.map((s) => s.xp)
			.reduce((partialSum, a) => partialSum + a, 0)
		if (newSpendXP != xp.spend) {
			updateCharacter({ skills: { xp: { spend: newSpendXP } } })
		}
		return newSpendXP
	}, [activeCharacter])

	const addNewSkill = () => {
		dispatch(characterSheetActions.addNewSkill())
	}

	const updateSkill = (update: Partial<Skill>, index: number) => {
		dispatch(characterSheetActions.updateSkill({ update, index }))
	}

	const deleteSkill = (skill: Skill) => {
		dispatch(characterSheetActions.deleteSkill(skill))
	}

	const onSkillReorder = ({ source, destination }: DropResult) => {
		// dropped outside the list
		if (!destination) return

		const newSkills = reorder(skills, source.index, destination.index)
		return updateCharacter({
			skills: { xp, skills: newSkills, abilities },
		})
	}

	const addNewAbility = () => {
		dispatch(characterSheetActions.addNewAbility())
	}

	const updateAbility = (update: string, index: number) => {
		dispatch(characterSheetActions.updateAbility({ update, index }))
	}

	const deleteAbility = (ability: Ability) => {
		dispatch(characterSheetActions.deleteAbility(ability))
	}

	const onAbilityReorder = ({ source, destination }: DropResult) => {
		// dropped outside the list
		if (!destination) return

		const newAbilities = reorder(abilities, source.index, destination.index)
		return updateCharacter({
			skills: { xp, skills, abilities: newAbilities },
		})
	}

	return (
		<Box
			sx={{
				display: 'flex',
				columnGap: { md: 4, sm: 2, xs: 1 },
				flexWrap: 'wrap',
			}}
		>
			<Box sx={{ mb: 2, maxWidth: '24rem' }}>
				<Box sx={{ mx: 'auto', display: 'flex' }}>
					<AttributeField
						type="number"
						value={xp.total}
						onChange={(event) =>
							updateCharacter({
								skills: { xp: { total: Number(event.target.value) } },
							})
						}
						label="Total XP"
						helperText=""
						sx={{ maxWidth: '7rem' }}
						inputProps={{
							sx: {
								textAlign: 'right',
							},
						}}
					/>
					<AttributeField
						disabled
						value={spendXP}
						label="Spend XP"
						helperText=""
						sx={{ maxWidth: '7rem' }}
					/>
				</Box>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Skills</SectionHeader>
					<Tooltip title="0-1 XP (rank 0), 2-5 XP (rank 1), 6-11 XP (rank 2), 12-19 XP (rank 3), 20-29 XP (rank 4), 30 XP (rank 5)">
						<HelpOutline fontSize="small" sx={{ mb: 0.75 }} />
					</Tooltip>
					<IconButton onClick={addNewSkill} sx={{ mb: 0.75 }}>
						<AddCircle />
					</IconButton>
				</Box>
				<DynamicList droppableId="skills" onDragEnd={onSkillReorder}>
					{skills.map((s, index) => (
						<DynamicListItem key={s.id} id={s.id} index={index}>
							<SkillRow
								skill={s}
								updateSkill={(update) => updateSkill(update, index)}
								deleteSkill={() => deleteSkill(s)}
							/>
						</DynamicListItem>
					))}
				</DynamicList>
			</Box>

			<Accordion sx={{ flexGrow: 1, maxWidth: '30rem' }}>
				<AccordionSummary expandIcon={<ExpandMore />}>
					<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
						<SectionHeader>Abilities</SectionHeader>
						<IconButton
							onClick={(event) => {
								addNewAbility()
								event.stopPropagation()
							}}
							sx={{ mb: 0.75 }}
						>
							<AddCircle />
						</IconButton>
					</Box>
				</AccordionSummary>
				<AccordionDetails>
					<DynamicList droppableId="abilities" onDragEnd={onAbilityReorder}>
						{abilities.map((a, index) => (
							<DynamicListItem key={a.id} id={a.id} index={index}>
								<AbilityRow
									key={a.id}
									ability={a.description}
									updateAbility={(update) => updateAbility(update, index)}
									deleteAbility={() => deleteAbility(a)}
								/>
							</DynamicListItem>
						))}
					</DynamicList>
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}

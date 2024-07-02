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
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'
import { Character, Skill } from '../../types/Character'

import { DynamicList, reorder } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { AbilityRow } from '../AbilityRow'
import { SkillRow } from './SkillRow'

export type SkillsTabProps = {
	character: Character
	updateCharacter: (update: DeepPartial<Character>) => void
}

export const SkillsTab: React.FC<SkillsTabProps> = ({
	character,
	updateCharacter,
}) => {
	const { xp, skills, abilities } = character.skills

	const spendXP = useMemo(() => {
		const newSpendXP = skills
			.map((s) => s.xp)
			.reduce((partialSum, a) => partialSum + a, 0)
		if (newSpendXP != xp.spend) {
			updateCharacter({ skills: { xp: { spend: newSpendXP } } })
		}
		return newSpendXP
	}, [character])

	const addNewSkill = () => {
		skills.splice(0, 0, {
			id: crypto.randomUUID(),
			name: 'new skill',
			rank: 0,
			xp: 0,
		})
		updateCharacter({
			skills: { xp, skills, abilities },
		})
	}

	const updateSkill = (update: Partial<Skill>, index: number) => {
		const newSkills = [...skills]
		newSkills[index] = { ...skills[index], ...update }
		return updateCharacter({
			skills: { skills: newSkills },
		})
	}

	const deleteSkill = (skill: Skill) => {
		const newSkills = [...skills].filter((s) => s != skill)
		updateCharacter({
			skills: { xp, skills: newSkills, abilities },
		})
		skills.pop()
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
		abilities.splice(0, 0, { id: crypto.randomUUID(), description: '' })
		updateCharacter({
			skills: { xp, skills, abilities },
		})
	}

	const updateAbility = (update: string, index: number) => {
		abilities[index] = { ...abilities[index], description: update }
		return updateCharacter({
			skills: { abilities },
		})
	}

	const deleteAbility = (index: number) => {
		const newAbilities = [...abilities].filter((_, i) => i != index)
		updateCharacter({
			skills: { xp, skills, abilities: newAbilities },
		})
		abilities.pop()
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
									deleteAbility={() => deleteAbility(index)}
								/>
							</DynamicListItem>
						))}
					</DynamicList>
				</AccordionDetails>
			</Accordion>
		</Box>
	)
}

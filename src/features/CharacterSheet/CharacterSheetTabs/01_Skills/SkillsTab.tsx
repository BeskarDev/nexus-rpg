import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'

import { AddCircle, HelpOutline } from '@mui/icons-material'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'
import { Character, Skill } from '../../types/Character'

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

	const addNewSkill = () => {
		skills.push({ name: 'new skill', rank: 0, xp: 0 })
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

	const addNewAbility = () => {
		abilities.push('')
		updateCharacter({
			skills: { xp, skills, abilities },
		})
	}

	const updateAbility = (update: string, index: number) => {
		abilities[index] = update
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
						type="number"
						value={xp.spend}
						onChange={(event) =>
							updateCharacter({
								skills: { xp: { spend: Number(event.target.value) } },
							})
						}
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
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					{skills.map((s, index) => (
						<SkillRow
							key={s.name + index}
							skill={s}
							updateSkill={(update) => updateSkill(update, index)}
							deleteSkill={() => deleteSkill(s)}
						/>
					))}
				</Box>
			</Box>

			<Box sx={{ flexGrow: 1, maxWidth: '30rem' }}>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Abilities</SectionHeader>
					<IconButton onClick={addNewAbility} sx={{ mb: 0.75 }}>
						<AddCircle />
					</IconButton>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					{abilities.map((a, index) => (
						<AbilityRow
							key={a + index}
							ability={a}
							updateAbility={(update) => updateAbility(update, index)}
							deleteAbility={() => deleteAbility(index)}
						/>
					))}
				</Box>
			</Box>
		</Box>
	)
}

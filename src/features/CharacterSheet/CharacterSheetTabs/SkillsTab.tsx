import { Box, IconButton } from '@mui/material'
import React from 'react'

import { AddCircle } from '@mui/icons-material'
import { AttributeField, SectionHeader } from '../CharacterSheet'
import { DeepPartial } from '../CharacterSheetContainer'
import { Character, Skill } from '../types/Character'

import { AbilityRow } from './AbilityRow'
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
		skills[index] = { ...skills[index], ...update }
		return updateCharacter({
			skills: { skills },
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
				justifyContent: 'center',
			}}
		>
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

			<Box sx={{ width: '100%', flexGrow: 1 }} />

			<Box sx={{ mb: 2 }}>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Skills</SectionHeader>
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

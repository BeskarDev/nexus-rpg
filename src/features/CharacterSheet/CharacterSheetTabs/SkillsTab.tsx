import { Box, IconButton } from '@mui/material'
import React, { useEffect, useMemo } from 'react'

import { AddCircle } from '@mui/icons-material'
import { AttributeField, SectionHeader } from '../CharacterSheet'
import { DeepPartial } from '../CharacterSheetContainer'
import { Character, Skill } from '../types/Character'
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

	const skillRows = useMemo(() => {
		console.log('reset rows')
		return [...character.skills.skills]
	}, [character.skills.skills, character.skills.skills.length])

	useEffect(() => {
		if (skills) {
			console.log('skills', skills)
		}
	}, [skills.length])

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
		const newSkills = skills.filter((s) => s != skill)
		updateCharacter({
			skills: { xp, skills: newSkills, abilities },
		})
		skills.pop()
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
			<Box>
				<SectionHeader>XP</SectionHeader>
				<Box sx={{ display: 'flex' }}>
					<AttributeField
						type="number"
						value={xp.total}
						onChange={(event) =>
							updateCharacter({
								skills: { xp: { total: Number(event.target.value) } },
							})
						}
						label="Total XP"
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
						sx={{ maxWidth: '7rem' }}
					/>
				</Box>
			</Box>

			<Box sx={{ width: '100%', flexGrow: 1 }} />

			<Box>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Skills</SectionHeader>
					<IconButton onClick={addNewSkill} sx={{ mb: 0.75 }}>
						<AddCircle />
					</IconButton>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					{skillRows.map((s, index) => (
            <>
              <div>I'm also here...</div>
              <SkillRow
                key={s.name + index}
                skill={s}
                updateSkill={(update) => updateSkill(update, index)}
                deleteSkill={() => deleteSkill(s)}
              />
            </>
					))}
				</Box>
			</Box>

			<Box>
				<SectionHeader>Abilities</SectionHeader>
				<Box sx={{ display: 'flex', gap: 1 }}></Box>
			</Box>
		</Box>
	)
}

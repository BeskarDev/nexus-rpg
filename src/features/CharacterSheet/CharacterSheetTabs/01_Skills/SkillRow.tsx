import { Box, IconButton, TextField } from '@mui/material'
import React, { useMemo, useState } from 'react'

import { Delete } from '@mui/icons-material'
import { AttributeField } from '../../CharacterSheet'
import { Skill } from '../../types/Character'

export type SkillRowProps = {
	skill: Skill
	updateSkill: (update: Partial<Skill>) => void
	deleteSkill: () => void
}

export const SkillRow: React.FC<SkillRowProps> = ({
	skill,
	updateSkill,
	deleteSkill,
}) => {
	const [name, setName] = useState(skill.name)

	const skillRank = useMemo(() => {
		let rank: number
		switch (true) {
			case skill.xp <= 1:
				rank = 0
				break
			case skill.xp <= 5:
				rank = 1
				break
			case skill.xp <= 11:
				rank = 2
				break
			case skill.xp <= 19:
				rank = 3
				break
			case skill.xp <= 29:
				rank = 4
				break
			default:
				rank = 5
				break
		}
		if (rank != skill.rank) {
			updateSkill({ rank })
		}
		return rank
	}, [skill.xp])

	return (
		<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
			<AttributeField
				disabled
				type="number"
				size="small"
				value={skillRank}
				label="Rank"
				sx={{
					maxWidth: '4rem',
					'& .MuiOutlinedInput-root': {
						'& .MuiOutlinedInput-notchedOutline': {
							borderWidth: '2px',
						},
					},
				}}
			/>
			<TextField
				variant="standard"
				value={name}
				onChange={(event) => setName(event.target.value)}
				onBlur={() => updateSkill({ name })}
				sx={{ maxWidth: '12rem' }}
			/>
			<AttributeField
				type="number"
				size="small"
				value={skill.xp}
				onChange={(event) =>
					updateSkill({
						xp: Number(event.target.value),
					})
				}
				label="XP"
				sx={{ maxWidth: '4rem' }}
			/>
			<IconButton
				size="small"
				edge="end"
				aria-label="delete"
				onClick={deleteSkill}
			>
				<Delete />
			</IconButton>
		</Box>
	)
}

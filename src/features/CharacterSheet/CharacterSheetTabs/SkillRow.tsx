import { Box, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'

import { Delete } from '@mui/icons-material'
import { AttributeField } from '../CharacterSheet'
import { Skill } from '../types/Character'

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
  console.log('render row for', skill)
	const [name, setName] = useState(skill.name)

	return (
		<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      <Box>IM HERE!</Box>
			<AttributeField
				type="number"
				size="small"
				value={skill.rank}
				onChange={(event) =>
					updateSkill({
						rank: Number(event.target.value),
					})
				}
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
			<IconButton size="small" edge="end" aria-label="delete" onClick={deleteSkill}>
				<Delete />
			</IconButton>
		</Box>
	)
}

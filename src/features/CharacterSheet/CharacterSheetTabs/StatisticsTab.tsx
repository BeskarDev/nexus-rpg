import { Box, TextField } from '@mui/material'
import React from 'react'

import { AttributeField, SectionHeader } from '../CharacterSheet'
import { DeepPartial } from '../CharacterSheetContainer'
import { Character } from '../types/Character'

export type StatisticsTabProps = {
	character: Character
	updateCharacter: (update: DeepPartial<Character>) => void
}

export const StatisticsTab: React.FC<StatisticsTabProps> = ({
	character,
	updateCharacter,
}) => {
	return (
		<Box
			sx={{ display: 'flex', gap: { md: 4, sm: 2, xs: 1 }, flexWrap: 'wrap' }}
		>
			<Box>
				<SectionHeader>Health & Wounds</SectionHeader>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<TextField
						type="number"
						value={character.statistics.health.total}
						onChange={(event) =>
							updateCharacter({
								statistics: { health: { total: Number(event.target.value) } },
							})
						}
						label="Total Health"
						helperText="12 + Strength"
						sx={{ maxWidth: '10rem' }}
					/>
					<TextField
						type="number"
						value={character.statistics.health.current}
						onChange={(event) =>
							updateCharacter({
								statistics: { health: { current: Number(event.target.value) } },
							})
						}
						label="Current Health"
						sx={{ maxWidth: '7rem' }}
					/>
				</Box>
			</Box>
			<Box>
				<SectionHeader>Attributes</SectionHeader>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<AttributeField
						value={character.statistics.strength.value}
						onChange={(event) =>
							updateCharacter({
								statistics: { strength: { value: event.target.value } },
							})
						}
						label="Strength"
					/>
					<AttributeField
						value={character.statistics.agility.value}
						onChange={(event) =>
							updateCharacter({
								statistics: { agility: { value: event.target.value } },
							})
						}
						label="Agility"
					/>
					<AttributeField
						value={character.statistics.spirit.value}
						onChange={(event) =>
							updateCharacter({
								statistics: { spirit: { value: event.target.value } },
							})
						}
						label="Spirit"
					/>
					<AttributeField
						value={character.statistics.mind.value}
						onChange={(event) =>
							updateCharacter({
								statistics: { mind: { value: event.target.value } },
							})
						}
						label="Mind"
					/>
				</Box>
			</Box>
			<Box>
				<SectionHeader>Defenses</SectionHeader>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<AttributeField
						type="number"
						value={character.statistics.parry}
						onChange={(event) =>
							updateCharacter({
								statistics: { parry: Number(event.target.value) },
							})
						}
						label="Parry"
						helperText="7 + Fighting"
						sx={{ maxWidth: '7rem' }}
					/>
					<AttributeField
						type="number"
						value={character.statistics.dodge}
						onChange={(event) =>
							updateCharacter({
								statistics: { dodge: Number(event.target.value) },
							})
						}
						label="Dodge"
						helperText="5 + 1/2 Agility"
						sx={{ maxWidth: '7rem' }}
					/>
					<AttributeField
						type="number"
						value={character.statistics.resist}
						onChange={(event) =>
							updateCharacter({
								statistics: { resist: Number(event.target.value) },
							})
						}
						label="Resist"
						helperText="5 + 1/2 Spirit"
						sx={{ maxWidth: '7rem' }}
					/>
				</Box>
			</Box>
		</Box>
	)
}

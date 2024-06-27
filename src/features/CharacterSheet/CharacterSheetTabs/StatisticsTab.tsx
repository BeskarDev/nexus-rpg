import { Box, TextField } from '@mui/material'
import React from 'react'

import { AttributeField, SectionHeader } from '../CharacterSheet'
import { DeepPartial } from '../CharacterSheetContainer'
import { Character } from '../types/Character'
import { WoundCheckbox } from './WoundCheckbox'

export type StatisticsTabProps = {
	character: Character
	updateCharacter: (update: DeepPartial<Character>) => void
}

export const StatisticsTab: React.FC<StatisticsTabProps> = ({
	character,
	updateCharacter,
}) => {
	const {
		health,
		av,
		strength,
		agility,
		spirit,
		mind,
		parry,
		dodge,
		resist,
		resolve,
	} = character.statistics
	return (
		<Box
			sx={{ display: 'flex', gap: { md: 4, sm: 2, xs: 1 }, flexWrap: 'wrap' }}
		>
			<Box>
				<SectionHeader>Health</SectionHeader>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<TextField
						type="number"
						value={health.total}
						onChange={(event) =>
							updateCharacter({
								statistics: { health: { total: Number(event.target.value) } },
							})
						}
						label="Max. HP"
						helperText="12 + Strength"
						sx={{ maxWidth: '10rem' }}
					/>
					<TextField
						type="number"
						value={health.temp}
						onChange={(event) =>
							updateCharacter({
								statistics: { health: { temp: Number(event.target.value) } },
							})
						}
						label="Temp. HP"
						sx={{ maxWidth: '5rem' }}
					/>
					<TextField
						type="number"
						value={health.current}
						onChange={(event) =>
							updateCharacter({
								statistics: { health: { current: Number(event.target.value) } },
							})
						}
						label="Current HP"
						sx={{ maxWidth: '7rem' }}
					/>
				</Box>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap',
					gap: 1,
				}}
			>
				<SectionHeader>Wounds</SectionHeader>
				<Box>
					<WoundCheckbox
						checked={health.woundOne}
						onChange={() =>
							updateCharacter({
								statistics: {
									health: { woundOne: !health.woundOne },
								},
							})
						}
					/>
					<WoundCheckbox
						checked={health.woundTwo}
						onChange={() =>
							updateCharacter({
								statistics: {
									health: { woundTwo: !health.woundTwo },
								},
							})
						}
					/>
					<WoundCheckbox
						checked={health.woundThree}
						onChange={() =>
							updateCharacter({
								statistics: {
									health: { woundThree: !health.woundThree },
								},
							})
						}
					/>
				</Box>
			</Box>
			<Box>
				<SectionHeader>Attributes</SectionHeader>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<AttributeField
						value={strength.value}
						onChange={(event) =>
							updateCharacter({
								statistics: { strength: { value: event.target.value } },
							})
						}
						label="Strength"
					/>
					<AttributeField
						value={agility.value}
						onChange={(event) =>
							updateCharacter({
								statistics: { agility: { value: event.target.value } },
							})
						}
						label="Agility"
					/>
					<AttributeField
						value={spirit.value}
						onChange={(event) =>
							updateCharacter({
								statistics: { spirit: { value: event.target.value } },
							})
						}
						label="Spirit"
					/>
					<AttributeField
						value={mind.value}
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
						value={parry}
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
						value={dodge}
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
						value={resist}
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

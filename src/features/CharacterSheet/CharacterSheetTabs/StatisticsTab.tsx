import { Box } from '@mui/material'
import React, { useMemo } from 'react'

import { AttributeField, SectionHeader } from '../CharacterSheet'
import { DeepPartial } from '../CharacterSheetContainer'
import { Character } from '../types/Character'

import { WoundCheckbox } from './WoundCheckbox'

export type StatisticsTabProps = {
	character: Character
	updateCharacter: (update: DeepPartial<Character>) => void
}

export const StatisticsTab: React.FC<StatisticsTabProps> = ({
	character: {
		statistics: {
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
		},
	},
	updateCharacter,
}) => {
	const totalAV: number = useMemo(
		() => av.armor + av.helmet + av.shield + av.other,
		[av.armor + av.helmet + av.shield + av.other],
	)

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
				<SectionHeader>Health</SectionHeader>
				<Box sx={{ display: 'flex' }}>
					<AttributeField
						type="number"
						value={health.current}
						onChange={(event) =>
							updateCharacter({
								statistics: { health: { current: Number(event.target.value) } },
							})
						}
						label="Current HP"
						sx={{
							maxWidth: '10rem',
							'& .MuiOutlinedInput-root': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderWidth: '2px',
								},
							},
						}}
					/>
					<AttributeField
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
					<AttributeField
						type="number"
						value={health.total}
						onChange={(event) =>
							updateCharacter({
								statistics: { health: { total: Number(event.target.value) } },
							})
						}
						label="Max. HP"
						helperText="12 + Strength"
						sx={{ maxWidth: '7rem' }}
					/>
				</Box>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap',
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

			<Box sx={{ width: '100%', flexGrow: 1 }} />

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

			<Box>
				<SectionHeader>Resolve</SectionHeader>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<AttributeField
						type="number"
						value={resolve}
						onChange={(event) =>
							updateCharacter({
								statistics: { resolve: Number(event.target.value) },
							})
						}
						helperText="max. 3"
						sx={{
							maxWidth: '7rem',
							'& .MuiOutlinedInput-root': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderWidth: '2px',
								},
							},
						}}
					/>
				</Box>
			</Box>

			<Box>
				<SectionHeader>AV</SectionHeader>
				<Box sx={{ display: 'flex' }}>
					<AttributeField
						type="number"
						value={av.armor}
						onChange={(event) =>
							updateCharacter({
								statistics: { av: { armor: Number(event.target.value) } },
							})
						}
						label="Armor"
					/>
					<AttributeField
						type="number"
						value={av.helmet}
						onChange={(event) =>
							updateCharacter({
								statistics: { av: { helmet: Number(event.target.value) } },
							})
						}
						label="Helmet"
					/>
					<AttributeField
						type="number"
						value={av.shield}
						onChange={(event) =>
							updateCharacter({
								statistics: { av: { shield: Number(event.target.value) } },
							})
						}
						label="Shield"
					/>
					<AttributeField
						type="number"
						value={av.other}
						onChange={(event) =>
							updateCharacter({
								statistics: { av: { other: Number(event.target.value) } },
							})
						}
						label="Other"
					/>
					<AttributeField
						value={totalAV}
						label="Total"
						disabled
						sx={{ ml: 1 }}
					/>
				</Box>
			</Box>
		</Box>
	)
}

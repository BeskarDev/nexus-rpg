import { Box } from '@mui/material'
import React, { useMemo } from 'react'

import { Character } from '../../../../types/Character'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'

import { AttributeColumn } from './AttributeColumn'
import { RestingButtonGroup } from './RestingButtonGroup'
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
	} = character
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
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'right',
					width: '100%',
					flexGrow: 1,
					mb: 2,
				}}
			>
				<RestingButtonGroup
					character={character}
					updateCharacter={updateCharacter}
				/>
			</Box>
			<Box>
				<SectionHeader>Attributes</SectionHeader>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<AttributeColumn
						attribute={strength}
						updateAttribute={(update) =>
							updateCharacter({
								statistics: { strength: { ...strength, ...update } },
							})
						}
						label="Strength"
					/>
					<AttributeColumn
						attribute={agility}
						updateAttribute={(update) =>
							updateCharacter({
								statistics: { agility: { ...agility, ...update } },
							})
						}
						label="Agility"
					/>
					<AttributeColumn
						attribute={spirit}
						updateAttribute={(update) =>
							updateCharacter({
								statistics: { spirit: { ...spirit, ...update } },
							})
						}
						label="Spirit"
					/>
					<AttributeColumn
						attribute={mind}
						updateAttribute={(update) =>
							updateCharacter({
								statistics: { mind: { ...mind, ...update } },
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
						helperText="12 + STR"
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
						{...health.woundOne}
						setWound={(update) =>
							updateCharacter({
								statistics: {
									health: { woundOne: { ...health.woundOne, ...update } },
								},
							})
						}
					/>
					<WoundCheckbox
						{...health.woundTwo}
						setWound={(update) =>
							updateCharacter({
								statistics: {
									health: { woundTwo: { ...health.woundTwo, ...update } },
								},
							})
						}
					/>
					<WoundCheckbox
						{...health.woundThree}
						setWound={(update) =>
							updateCharacter({
								statistics: {
									health: { woundThree: { ...health.woundThree, ...update } },
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
						sx={{ maxWidth: '6rem' }}
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
						helperText="5 + ½ AGI"
						sx={{ maxWidth: '6rem' }}
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
						helperText="5 + ½ SPI"
						sx={{ maxWidth: '6rem' }}
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
						disabled
						value={totalAV}
						label="Total"
						sx={{
							mr: 1,
							'& .MuiOutlinedInput-root': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderWidth: '2px',
								},
							},
						}}
					/>
					<AttributeField
						type="number"
						size="small"
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
						size="small"
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
						size="small"
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
						size="small"
						value={av.other}
						onChange={(event) =>
							updateCharacter({
								statistics: { av: { other: Number(event.target.value) } },
							})
						}
						label="Other"
					/>
				</Box>
			</Box>
		</Box>
	)
}

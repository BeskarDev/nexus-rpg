import { Box, Typography } from '@mui/material'
import React from 'react'

import { AttributeField } from '../../CharacterSheet'

import {
	BubbleChart,
	DirectionsRun,
	PanTool,
	Visibility,
} from '@mui/icons-material'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { AttributeColumn } from './AttributeColumn'
import { AvField } from './AvField'
import { RestingButtonGroup } from './RestingButtonGroup'
import { RoundTextField } from './RoundTextField'
import { WoundCheckbox } from './WoundCheckbox'

export const StatisticsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
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
	} = activeCharacter.statistics

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

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
					flexWrap: 'wrap-reverse',
					width: '100%',
					flexGrow: 1,
					mb: 2,
					gap: 2,
				}}
			>
				<RoundTextField
					type="number"
					value={resolve}
					onChange={(event) =>
						updateCharacter({
							statistics: { resolve: Number(event.target.value) },
						})
					}
					label="Resolve"
					helperText="max. 3"
					sx={{
						mt: 0,
						mr: 'auto',
					}}
				/>
				<RestingButtonGroup
					character={activeCharacter}
					updateCharacter={updateCharacter}
				/>
			</Box>
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					width: '100%',
					gap: 1,
				}}
			>
				<Box sx={{ display: 'flex', width: '100%', overflowX: 'auto', gap: 1 }}>
					<AttributeColumn
						attribute={strength}
						updateAttribute={(update) =>
							updateCharacter({
								statistics: { strength: { ...strength, ...update } },
							})
						}
						label="Strength"
						icon={<PanTool fontSize="inherit" />}
					/>
					<AttributeColumn
						attribute={agility}
						updateAttribute={(update) =>
							updateCharacter({
								statistics: { agility: { ...agility, ...update } },
							})
						}
						label="Agility"
						icon={<DirectionsRun fontSize="inherit" />}
					/>
					<AttributeColumn
						attribute={spirit}
						updateAttribute={(update) =>
							updateCharacter({
								statistics: { spirit: { ...spirit, ...update } },
							})
						}
						label="Spirit"
						icon={<Visibility fontSize="inherit" />}
					/>
					<AttributeColumn
						attribute={mind}
						updateAttribute={(update) =>
							updateCharacter({
								statistics: { mind: { ...mind, ...update } },
							})
						}
						label="Mind"
						icon={<BubbleChart fontSize="inherit" />}
					/>
				</Box>
				<Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
					<AvField />
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
							maxWidth: '6rem',
							'& .MuiOutlinedInput-root': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderWidth: '2px',
								},
							},
						}}
					/>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						<AttributeField
							size="small"
							type="number"
							value={health.temp}
							onChange={(event) =>
								updateCharacter({
									statistics: { health: { temp: Number(event.target.value) } },
								})
							}
							label="Temp. HP"
						/>
						<AttributeField
							size="small"
							type="number"
							value={health.total}
							onChange={(event) =>
								updateCharacter({
									statistics: { health: { total: Number(event.target.value) } },
								})
							}
							label="Max. HP"
							helperText="12 + STR"
						/>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'top',
						}}
					>
						<Typography variant="caption">Wounds</Typography>
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
											health: {
												woundThree: { ...health.woundThree, ...update },
											},
										},
									})
								}
							/>
						</Box>
					</Box>
				</Box>
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
		</Box>
	)
}

import { Box, Tooltip } from '@mui/material'
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
import { FatigueTracker } from './FatigueTracker'
import { RestingButtonGroup } from './RestingButtonGroup'
import { RoundTextField } from './RoundTextField'
import { StatusEffects } from './StatusEffects'

export const StatisticsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const {
		health,
		fatigue,
		av,
		strength,
		agility,
		spirit,
		mind,
		parry,
		dodge,
		resist,
		resolve,
		statusEffects,
	} = activeCharacter.statistics

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	// Calculate effective max HP (base max HP minus fatigue penalty)
	const fatigueHpPenalty = (fatigue?.current || 0) * 2
	const effectiveMaxHP = health.total - fatigueHpPenalty

	// Count total wounds across all attributes
	const totalWounds = [strength, agility, spirit, mind].filter(
		(attr) => attr.wounded,
	).length

	// Ensure current HP doesn't exceed effective max HP
	React.useEffect(() => {
		if (health.current > effectiveMaxHP) {
			updateCharacter({
				statistics: { health: { current: effectiveMaxHP } },
			})
		}
	}, [effectiveMaxHP, health.current])

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				maxWidth: '100%',
			}}
		>
			{/* Top row - Resolve, Fatigue, Resting */}
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 1,
					alignItems: 'flex-start',
					justifyContent: 'space-between',
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
					}}
				/>

				<RestingButtonGroup
					character={activeCharacter}
					updateCharacter={updateCharacter}
				/>
			</Box>

			{/* Status Effects */}
			<StatusEffects statusEffects={statusEffects || []} />

			{/* Main stats row */}
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 1,
					alignItems: 'flex-start',
				}}
			>
				{/* Attributes */}
				<Box
					sx={{
						display: 'flex',
						gap: 0.5,
						overflowX: 'auto',
						minWidth: 0,
						flexShrink: 0,
						height: '6.5rem',
					}}
				>
					<AttributeColumn
						attribute={strength}
						updateAttribute={(update) =>
							updateCharacter({
								statistics: { strength: { ...strength, ...update } },
							})
						}
						label="Strength"
						icon={<PanTool fontSize="inherit" />}
						totalWounds={totalWounds}
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
						totalWounds={totalWounds}
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
						totalWounds={totalWounds}
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
						totalWounds={totalWounds}
					/>
				</Box>
			</Box>

			{/* Health, AV and Defenses row */}
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 1,
					alignItems: 'flex-start',
				}}
			>
				<AvField />

				{/* HP section */}
				<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'flex-start' }}>
					<AttributeField
						type="number"
						value={health.current}
						onChange={(event) => {
							const newCurrent = Number(event.target.value)
							const clampedCurrent = Math.min(newCurrent, effectiveMaxHP)
							updateCharacter({
								statistics: { health: { current: clampedCurrent } },
							})
						}}
						label="Current HP"
						sx={{
							maxWidth: '5rem',
							'& .MuiOutlinedInput-root': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderWidth: '2px',
								},
							},
						}}
						InputProps={{
							sx: {
								color:
									health.current === effectiveMaxHP
										? 'success.main'
										: health.current <= 0
											? 'error.main'
											: 'text.primary',
							},
						}}
					/>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
						{/* Tooltip for Temp HP */}
						<Tooltip title="Temporary HP: Used first when taking damage. Does not replenish on rest and vanishes when depleted. Only the highest value applies if gained from multiple sources.">
							<span>
								<AttributeField
									size="small"
									type="number"
									value={health.temp}
									onChange={(event) =>
										updateCharacter({
											statistics: {
												health: { temp: Number(event.target.value) },
											},
										})
									}
									label="Temp"
									sx={{ maxWidth: '4rem', mb: 0 }}
								/>
							</span>
						</Tooltip>
						{/* Tooltip for Max HP */}
						<Tooltip title="Max HP: 12 + Strength. Increases by +2 per level. Fatigue reduces max HP. Cannot exceed 50 from all sources.">
							<span>
								<AttributeField
									size="small"
									type="number"
									value={health.total}
									onChange={(event) =>
										updateCharacter({
											statistics: {
												health: { total: Number(event.target.value) },
											},
										})
									}
									label="Max"
									sx={{ maxWidth: '4rem', mb: 0 }}
								/>
							</span>
						</Tooltip>
					</Box>

					{/* Fatigue Tracker */}
					<Box sx={{ ml: 1, mt: '-2px', maxWidth: '5rem' }}>
						<FatigueTracker
							current={fatigue?.current || 0}
							max={fatigue?.max || 6}
							onFatigueChange={(newFatigue) =>
								updateCharacter({
									statistics: { fatigue: newFatigue },
								})
							}
						/>
					</Box>
				</Box>

				<Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
					{/* Defenses */}
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
						sx={{ maxWidth: '5.5rem' }}
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
						sx={{ maxWidth: '5.5rem' }}
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
						sx={{ maxWidth: '5.5rem' }}
					/>
				</Box>
			</Box>
		</Box>
	)
}

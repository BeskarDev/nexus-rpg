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
import { calculateMaxHp } from '../../utils/calculateHp'
import { AttributeColumn } from './AttributeColumn'
import { AvField } from './AvField'
import { ParryField } from './ParryField'
import { DodgeField } from './DodgeField'
import { ResistField } from './ResistField'
import { HpField } from './HpField'
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
		resolve,
		statusEffects,
	} = activeCharacter.statistics

	React.useEffect(() => {
		if (
			fatigue?.current === 6 &&
			!statusEffects.some((s) => s.name === 'unconscious')
		) {
			updateCharacter({
				statistics: {
					statusEffects: [
						...statusEffects,
						{
							id: crypto.randomUUID(),
							name: 'unconscious',
							active: true,
							duration: undefined,
							narrativeDuration: undefined,
							intensity: undefined,
						},
					],
				},
			})
		}
	}, [fatigue?.current])

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	// Calculate max HP using new formula and effective max HP (minus fatigue penalty)
	const maxHP = React.useMemo(() => {
		return calculateMaxHp(
			strength.value,
			activeCharacter.skills.xp.total,
			health.maxHpModifier || 0,
		)
	}, [strength.value, activeCharacter.skills.xp.total, health.maxHpModifier])

	const fatigueHpPenalty = (fatigue?.current || 0) * 2
	const effectiveMaxHP = maxHP - fatigueHpPenalty

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
			<StatusEffects statusEffects={statusEffects} />

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

				{/* HP section - using new HpField component */}
				<HpField />

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

				<Box sx={{ display: 'flex', flexDirection: 'row', gap: 0.5 }}>
					{/* Defenses */}
					<ParryField />
					<DodgeField />
					<ResistField />
				</Box>
			</Box>
		</Box>
	)
}

import { Box } from '@mui/material'
import React from 'react'

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
import { AttributeCard } from './AttributeCard'
import { AvCard } from './AvCard'
import { ParryCard } from './ParryCard'
import { DodgeCard } from './DodgeCard'
import { ResistCard } from './ResistCard'
import { HpField } from './HpField'
import { FatigueCard } from './FatigueCard'
import { RestingButtonGroup } from './RestingButtonGroup'
import { ResolveCard } from './ResolveCard'
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
			health.auto || 0,
		)
	}, [
		strength.value,
		activeCharacter.skills.xp.total,
		health.maxHpModifier,
		health.auto,
	])

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
				gap: 1.5,
				width: '100%',
			}}
		>
			{/* Top row - Resolve and Resting */}
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 1,
					alignItems: 'flex-start',
					justifyContent: 'space-between',
				}}
			>
				<ResolveCard />

				<RestingButtonGroup
					character={activeCharacter}
					updateCharacter={updateCharacter}
				/>
			</Box>

			{/* Status Effects */}
			<StatusEffects statusEffects={statusEffects} />

			{/* Attributes - Compact single row */}
			<Box
				sx={{
					display: 'flex',
					gap: 0.75,
					flexWrap: 'nowrap',
					justifyContent: 'center',
				}}
			>
				<AttributeCard
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
				<AttributeCard
					attribute={agility}
					updateAttribute={(update) =>
						updateCharacter({
							statistics: { agility: { ...agility, ...update } },
						})
					}
					label="Agility"
					color="#81c784"
					icon={<DirectionsRun fontSize="inherit" />}
					totalWounds={totalWounds}
				/>
				<AttributeCard
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
				<AttributeCard
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

			{/* HP, AV, and Fatigue row */}
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 0.75,
					alignItems: 'stretch',
					justifyContent: 'center',
				}}
			>
				<AvCard />
				<HpField />
				<FatigueCard
					current={fatigue?.current || 0}
					max={fatigue?.max || 6}
					onFatigueChange={(newFatigue) =>
						updateCharacter({
							statistics: { fatigue: newFatigue },
						})
					}
				/>
			</Box>

			{/* Defenses row - Parry, Dodge, Resist */}
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 0.75,
					alignItems: 'stretch',
					justifyContent: 'center',
          width: '100%',
				}}
			>
				<ParryCard />
				<DodgeCard />
				<ResistCard />
			</Box>
		</Box>
	)
}

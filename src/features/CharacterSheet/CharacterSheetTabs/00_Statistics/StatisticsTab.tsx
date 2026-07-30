import { Box, alpha } from '@mui/material'
import React from 'react'

import ATTRIBUTE_COLORS from '../../../../utils/colors'
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
import { HpCard } from './HpCard'
import { FatigueCard } from './FatigueCard'
import { RestingButtonGroup } from './RestingButtonGroup'
import { ResolveCard } from './ResolveCard'
import { StatusEffects } from './StatusEffects'

/**
 * The one grid every register on the plate shares (M9 S6).
 *
 * Four columns of one fixed width, centred as a group, with `align-items: start`
 * so each card's header is the first row in its cell and every label on a
 * register lands on the same baseline.
 *
 * Two defects this replaced. The registers used to size their own columns from
 * content, so STR/AGI/SPI/MND drifted out of line with AV/Parry/Dodge/Resist by
 * a few more pixels per column. And `alignItems: center` on cards of unequal
 * height put the labels of one register on three different baselines.
 *
 * The track is a fixed width rather than `1fr` because fractional columns
 * stretch to fill the plate, which spread three items thinly across a desktop
 * width. `minmax(0, …)` keeps the zero floor so the columns can still shrink
 * at 430px instead of overflowing.
 */
const REGISTER_GRID = {
	display: 'grid',
	// Fixed column WIDTH rather than fractions: `1fr` columns stretch to fill the
	// plate, which spread the content thin and left big gaps at desktop widths.
	// A fixed track keeps every register dense and centred (see justifyContent)
	// while still sharing one column grid, so the registers stay aligned.
	gridTemplateColumns: 'repeat(4, minmax(0, 5.5rem))',
	justifyContent: 'center',
	alignItems: 'start',
	// Cells STRETCH rather than centre: a centred item's left edge is not the
	// column boundary, so the defence register's dividers would sit at ragged
	// positions. Each card centres its own contents internally, so stretching the
	// cell still leaves the value centred under its label.
	justifyItems: 'stretch',
	gap: 0.75,
} as const

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
			{/*
				M9 S6 — ONE plate, three ruled registers.

				The first pass at this slice fixed tile uniformity (F3) but replaced it
				with *container* variety: six different treatments stacked down the column
				— a framed tile, a bronze button group, a frameless grey bar, two centred
				tiles, a wide plate, a full-width band — at six different widths with no
				shared measure. That reads as six things, not one artifact.

				So: a single frame holds every stat, registers are divided by engraved
				hairlines (the codex rule for grouping without a box), all on one measure.
				Hierarchy comes from type size and the meter, not from giving one group a
				heavier box than its neighbour.

				What is deliberately NOT in the plate: the resting buttons are *actions*,
				and Status Conditions is transient state that grows a list. Neither is a
				stat, so both sit below it with their own containers.

				Register order is by how often a value is touched in play: live resources
				→ attributes (read every roll) → defences (read when attacked).
			*/}
			<Box
				sx={{
					borderRadius: 1,
					border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.28)}`,
					bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
					position: 'relative',
					px: 1,
					py: 0.75,
				}}
			>
				{(['tl', 'tr', 'br', 'bl'] as const).map((pos) => (
					<span key={pos} className={`cs-rivet cs-rivet-${pos}`} aria-hidden="true" />
				))}

				{/* Register 1 — the live resources: changed constantly mid-combat. */}
				<Box
					sx={{
						...REGISTER_GRID,
						pb: 0.75,
						// HP carries a meter as well as a value, so it takes two of the four
						// columns. Every other cell is one column, which is what keeps this
						// register on the same grid as the two below it.
						'& > *:first-of-type': { gridColumn: 'span 2' },
					}}
				>
					<HpCard />
					<ResolveCard />
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
				{/*
					Register 2 — the attributes. Read on every roll, changed at level-up, so
					they sit between the live resources and the defences. Divided from the
					register above by an engraved hairline rather than a box of their own.

					Stays `nowrap` at every width: four columns at 3.5rem plus gaps fit
					inside 430px, and wrapping them 2×2 would break the at-a-glance
					comparison across all four that DieToken's shape ladder exists for.
				*/}
				<Box
					sx={{
						...REGISTER_GRID,
						borderTop: (theme) => `1px solid ${alpha(theme.palette.divider, 0.22)}`,
						py: 0.75,
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
						sigil="strength"
						color={ATTRIBUTE_COLORS.strength}
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
						color={ATTRIBUTE_COLORS.agility}
						sigil="agility"
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
						sigil="spirit"
						color={ATTRIBUTE_COLORS.spirit}
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
						sigil="mind"
						color={ATTRIBUTE_COLORS.mind}
						totalWounds={totalWounds}
					/>
				</Box>

				{/*
					Register 3 — the defences: every number that says "what protects you".
					Read when attacked, edited almost never, so this is the lightest register
					on the plate. Each value is its own tap target and opens its existing
					calculator; the derivations are untouched.
				*/}
				<Box
					sx={{
						...REGISTER_GRID,
						borderTop: (theme) => `1px solid ${alpha(theme.palette.divider, 0.22)}`,
						pt: 0.75,
						// Dividers ride on the grid cells, so they land on the column
						// boundaries the registers above already use.
						'& > *:not(:first-of-type)': {
							borderLeft: (theme) => `1px solid ${alpha(theme.palette.divider, 0.22)}`,
						},
					}}
				>
					<AvCard />
					<ParryCard />
					<DodgeCard />
					<ResistCard />
				</Box>
			</Box>

			{/* Actions, not stats — so outside the plate. */}
			<RestingButtonGroup
				character={activeCharacter}
				updateCharacter={updateCharacter}
			/>

			{/* Transient state that grows a list — its own container, below the plate. */}
			<StatusEffects statusEffects={statusEffects} />
		</Box>
	)
}

import { Typography } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
import React from 'react'
import { CharacterSheetCard, CardHeader, PipRow } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

export type FatigueCardProps = {
	current: number
	max: number
	onFatigueChange: (fatigue: { current: number; max: number }) => void
}

export const FatigueCard: React.FC<FatigueCardProps> = ({
	current,
	max,
	onFatigueChange,
}) => {
	const fatigueHpPenalty = current * 2

	return (
		<CharacterSheetCard
			// M9 S6: frameless inside the stats plate, which supplies the single
			// frame. Prominence comes from the meter and the numerals, not a box.
			weight="column"
			header={
				<CardHeader
					icon={<StatSigil name="fatigue" size="1.15em" />}
					label="Fatigue"
					color={UI_COLORS.amber}
				/>
			}
			minWidth="5rem"
			info="Fatigue: Each level reduces max HP by 2 (at 6, you fall unconscious)"
			footer={
				<Typography
					variant="caption"
					color="warning.main"
					sx={{ fontSize: '0.6rem' }}
				>
					{fatigueHpPenalty > 0 ? `-${fatigueHpPenalty} HP` : '\u00A0'}
				</Typography>
			}
		>
			<PipRow
				label="Fatigue"
				count={max}
				value={current}
				onChange={(next) => onFatigueChange({ current: next, max })}
				sigil="fatigue"
				tone="warning.main"
				wrap
			/>
		</CharacterSheetCard>
	)
}

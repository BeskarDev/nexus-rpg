import { Box, Checkbox, Typography } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
import React from 'react'
import { CharacterSheetCard, CardHeader } from '../../components'
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
	const handleFatigueChange = (index: number) => {
		const newCurrent = index < current ? index : index + 1
		onFatigueChange({ current: newCurrent, max })
	}

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
			<Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
				{Array.from({ length: max }).map((_, index) => (
					<Checkbox
						key={index}
						size="small"
						// A sigil is always solid mass, so an unspent pip cannot be the
						// hollow outline it used to be. Colour carries the state instead:
						// dimmed for not-yet-taken, full amber once taken.
						icon={
							<Box sx={{ display: 'flex', color: 'text.disabled', opacity: 0.55 }}>
								<StatSigil name="fatigue" size="0.85rem" />
							</Box>
						}
						checkedIcon={
							<Box sx={{ display: 'flex', color: 'warning.main' }}>
								<StatSigil name="fatigue" size="0.85rem" />
							</Box>
						}
						checked={index < current}
						onChange={() => handleFatigueChange(index)}
						sx={{ p: 0.25 }}
					/>
				))}
			</Box>
		</CharacterSheetCard>
	)
}

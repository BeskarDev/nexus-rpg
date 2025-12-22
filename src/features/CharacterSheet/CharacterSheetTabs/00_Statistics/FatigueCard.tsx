import { WaterDrop, WaterDropOutlined } from '@mui/icons-material'
import { Box, Checkbox, Typography } from '@mui/material'
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
			header={
				<CardHeader icon={<WaterDrop />} label="Fatigue" color={UI_COLORS.amber} />
			}
			minWidth="5rem"
			tooltip="Fatigue: Each level reduces max HP by 2 (at 6, you fall unconscious)"
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
						icon={<WaterDropOutlined sx={{ fontSize: '0.85rem' }} />}
						checkedIcon={
							<WaterDrop color="warning" sx={{ fontSize: '0.85rem' }} />
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

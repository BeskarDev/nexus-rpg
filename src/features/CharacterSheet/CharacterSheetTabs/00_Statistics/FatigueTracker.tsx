import { WaterDrop, WaterDropOutlined } from '@mui/icons-material'
import { Box, Checkbox, Typography } from '@mui/material'
import React from 'react'

export type FatigueProps = {
	current: number
	max: number
	onFatigueChange: (fatigue: { current: number; max: number }) => void
}

export const FatigueTracker: React.FC<FatigueProps> = ({
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
		<Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 0.5 }}>
			<Typography variant="caption" sx={{ fontWeight: 'bold', color: 'text.disabled' }}>
				Fatigue
			</Typography>
			
			<Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
				{Array.from({ length: max }).map((_, index) => (
					<Checkbox
						key={index}
						size="small"
						icon={<WaterDropOutlined />}
						checkedIcon={<WaterDrop color="warning" />}
						checked={index < current}
						onChange={() => handleFatigueChange(index)}
						sx={{ p: 0.25 }}
					/>
				))}
			</Box>
			
			{fatigueHpPenalty > 0 && (
				<Typography variant="caption" color="warning.main">
					-{fatigueHpPenalty} max HP
				</Typography>
			)}
		</Box>
	)
}

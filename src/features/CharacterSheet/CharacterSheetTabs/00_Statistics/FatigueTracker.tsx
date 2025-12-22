import { WaterDrop, WaterDropOutlined } from '@mui/icons-material'
import { Box, Checkbox, Typography, alpha } from '@mui/material'
import { UI_COLORS } from '../../../../utils/colors'
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
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				borderRadius: 1,
				border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.2)}`,
				bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
				p: 0.5,
				minWidth: '5rem',
			}}
		>
			{/* Header */}
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
				<WaterDrop sx={{ fontSize: '0.7rem', color: UI_COLORS.amber }} />
				<Typography
					variant="caption"
					sx={{
						fontWeight: 700,
						fontSize: '0.65rem',
						color: UI_COLORS.amber,
						textTransform: 'uppercase',
					}}
				>
					Fatigue
				</Typography>
			</Box>

			{/* Fatigue checkboxes */}
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

			{/* HP penalty display */}
			<Typography
				variant="caption"
				color="warning.main"
				sx={{ fontSize: '0.6rem' }}
			>
				{fatigueHpPenalty > 0 ? `-${fatigueHpPenalty} HP` : '\u00A0'}
			</Typography>
		</Box>
	)
}

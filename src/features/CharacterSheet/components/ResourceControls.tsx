import React from 'react'
import {
	Box,
	IconButton,
	Menu,
	Typography,
	Button,
	LinearProgress,
} from '@mui/material'
import { Settings, Remove, Add } from '@mui/icons-material'

export interface ResourceControlsProps {
	current: number
	max: number
	temp?: number
	percentage: number
	label: string
	color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
	anchorEl: HTMLElement | null
	onOpenMenu: (event: React.MouseEvent<HTMLElement>) => void
	onCloseMenu: () => void
	onApplyDamage: (amount: number) => void
	onApplyHealing: (amount: number) => void
	onApplyTemp?: (amount: number) => void
	adjustmentAmount: number
	onAdjustmentChange: (amount: number) => void
	showTempControls?: boolean
}

export const ResourceControls: React.FC<ResourceControlsProps> = ({
	current,
	max,
	temp = 0,
	percentage,
	label,
	color = 'success',
	anchorEl,
	onOpenMenu,
	onCloseMenu,
	onApplyDamage,
	onApplyHealing,
	onApplyTemp,
	adjustmentAmount,
	onAdjustmentChange,
	showTempControls = false,
}) => {
	const open = Boolean(anchorEl)
	const totalDisplay = max + temp

	const getProgressColor = () => {
		if (percentage >= 50) return color
		if (percentage >= 20) return 'warning'
		return 'error'
	}

	return (
		<Box>
			<Box display="flex" alignItems="center" gap={1}>
				<Typography variant="body2" sx={{ minWidth: 60 }}>
					{label}:
				</Typography>
				<Typography variant="body2" sx={{ minWidth: 80 }}>
					{current}/{max}
					{temp > 0 && ` (+${temp})`}
				</Typography>
				<IconButton size="small" onClick={onOpenMenu}>
					<Settings fontSize="small" />
				</IconButton>
			</Box>
			
			<LinearProgress
				variant="determinate"
				value={Math.min(100, percentage)}
				color={getProgressColor()}
				sx={{
					height: 8,
					borderRadius: 4,
					backgroundColor: 'rgba(0,0,0,0.1)',
				}}
			/>

			<Menu anchorEl={anchorEl} open={open} onClose={onCloseMenu}>
				<Box sx={{ p: 2, minWidth: 200 }}>
					<Box display="flex" alignItems="center" gap={1} mb={2}>
						<IconButton
							size="small"
							onClick={() => onAdjustmentChange(Math.max(0, adjustmentAmount - 1))}
						>
							<Remove fontSize="small" />
						</IconButton>
						<Typography sx={{ minWidth: 40, textAlign: 'center' }}>
							{adjustmentAmount}
						</Typography>
						<IconButton
							size="small"
							onClick={() => onAdjustmentChange(adjustmentAmount + 1)}
						>
							<Add fontSize="small" />
						</IconButton>
					</Box>

					<Box display="flex" gap={1} mb={1}>
						<Button
							size="small"
							variant="outlined"
							color="error"
							onClick={() => onApplyDamage(adjustmentAmount)}
							disabled={adjustmentAmount === 0}
						>
							Damage
						</Button>
						<Button
							size="small"
							variant="outlined"
							color="success"
							onClick={() => onApplyHealing(adjustmentAmount)}
							disabled={adjustmentAmount === 0}
						>
							Heal
						</Button>
					</Box>

					{showTempControls && onApplyTemp && (
						<Button
							size="small"
							variant="outlined"
							color="info"
							onClick={() => onApplyTemp(adjustmentAmount)}
							disabled={adjustmentAmount === 0}
							fullWidth
						>
							Temp {label}
						</Button>
					)}
				</Box>
			</Menu>
		</Box>
	)
}
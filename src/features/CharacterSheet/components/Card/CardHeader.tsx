import React from 'react'
import { Box, Typography } from '@mui/material'
import { CardHeaderProps } from './types'

export const CardHeader: React.FC<CardHeaderProps> = ({
	icon,
	label,
	color = '#9e9e9e',
	sx,
	'data-testid': testId,
}) => {
	return (
		<Box
			sx={{ display: 'flex', alignItems: 'center', gap: 0.25, ...sx }}
			data-testid={testId}
		>
			{icon && (
				<Box sx={{ fontSize: '0.7rem', color, display: 'flex' }}>
					{icon}
				</Box>
			)}
			<Typography
				variant="caption"
				sx={{
					fontWeight: 700,
					fontSize: '0.65rem',
					color,
					textTransform: 'uppercase',
					letterSpacing: '0.5px',
				}}
			>
				{label}
			</Typography>
		</Box>
	)
}

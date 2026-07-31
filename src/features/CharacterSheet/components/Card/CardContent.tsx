import React from 'react'
import { Typography } from '@mui/material'
import { CardContentProps } from './types'

export const CardContent: React.FC<CardContentProps> = ({
	value,
	sx,
	color,
	'data-testid': testId,
}) => {
	return (
		<Typography
			data-testid={testId}
			sx={{
				fontWeight: 'bold',
				// M13 S3.5: 0.95rem (15.2px) was the largest thing on the Statistics
				// plate, for the values a player reads every round. A hardcoded rem
				// literal, too, bypassing the scale. Now the card-title step.
				fontSize: 'var(--nexus-text-lg)',
				lineHeight: 1.4,
				textAlign: 'center',
				mt: 0.25,
				...(color && { color }),
				...sx,
			}}
		>
			{value}
		</Typography>
	)
}

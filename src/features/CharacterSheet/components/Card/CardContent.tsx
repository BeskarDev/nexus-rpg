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
				fontSize: '0.95rem',
				lineHeight: 2,
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

import React from 'react'
import { Box } from '@mui/material'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

export const TabPanel: React.FC<TabPanelProps> = ({
	children,
	value,
	index,
	...other
}) => {
	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`companion-tabpanel-${index}`}
			aria-labelledby={`companion-tab-${index}`}
			{...other}
		>
			{value === index && <Box sx={{ p: { xs: 1.5, sm: 3 } }}>{children}</Box>}
		</div>
	)
}

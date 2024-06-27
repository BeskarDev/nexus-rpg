import { Box, Tabs, Tab } from '@mui/material'
import React from 'react'

export const CharacterSheet: React.FC = () => {
	const [value, setValue] = React.useState(0)

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
			<Tabs
				value={value}
				onChange={handleChange}
				aria-label="basic tabs example"
			>
				<Tab id="0" label="Item One" />
				<Tab id="1" label="Item Two" />
				<Tab id="2" label="Item Three" />
			</Tabs>
		</Box>
	)
}

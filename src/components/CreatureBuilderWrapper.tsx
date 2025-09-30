import React from 'react'
import { Box } from '@mui/material'
import BrowserOnly from '@docusaurus/BrowserOnly'

export const CreatureBuilderWrapper: React.FC = () => {
	return (
		<BrowserOnly fallback={<div>Loading...</div>}>
			{() => {
				const { CreatureBuilder } = require('./CreatureBuilder')
				return (
					<Box sx={{ my: 3 }}>
						<CreatureBuilder />
					</Box>
				)
			}}
		</BrowserOnly>
	)
}

import React from 'react'
import { Box } from '@mui/material'
import { ItemLocation } from '../../../../../types/ItemLocation'
import { LocationNameCard } from '../LocationNameCard'
import { LocationLoadCard } from '../LocationLoadCard'

interface LocationLoadDisplayProps {
	location: ItemLocation
	name: string
	currentLoad: number
	maxLoad: number
	onNameChange: (name: string) => void
	onMaxLoadChange: (maxLoad: number) => void
}

export const LocationLoadDisplay: React.FC<LocationLoadDisplayProps> = ({
	location,
	name,
	currentLoad,
	maxLoad,
	onNameChange,
	onMaxLoadChange,
}) => {
	return (
		<Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
			<LocationNameCard
				location={location}
				name={name}
				onNameChange={onNameChange}
			/>
			<LocationLoadCard
				currentLoad={currentLoad}
				maxLoad={maxLoad}
				onMaxLoadChange={onMaxLoadChange}
			/>
		</Box>
	)
}

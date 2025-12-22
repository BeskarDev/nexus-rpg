import React from 'react'
import { ItemLocation } from '../../../../../types/ItemLocation'
import { LocationHeaderCard } from '../LocationHeaderCard'

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
		<LocationHeaderCard
			location={location}
			name={name}
			currentLoad={currentLoad}
			maxLoad={maxLoad}
			onNameChange={onNameChange}
			onMaxLoadChange={onMaxLoadChange}
		/>
	)
}

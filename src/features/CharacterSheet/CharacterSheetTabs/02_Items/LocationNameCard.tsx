import React, { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import { Pets, Storage } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { ItemLocation } from '../../../../types/ItemLocation'

export type LocationNameCardProps = {
	location: ItemLocation
	name: string
	onNameChange: (name: string) => void
}

export const LocationNameCard: React.FC<LocationNameCardProps> = ({
	location,
	name,
	onNameChange,
}) => {
	// Local state to prevent focus loss during typing
	const [localName, setLocalName] = useState(name)

	// Update local state when props change
	useEffect(() => {
		setLocalName(name)
	}, [name])

	const icon = location === 'mount' ? <Pets /> : <Storage />
	const label = location === 'mount' ? 'Mount' : 'Storage'

	return (
		<CharacterSheetCard
			header={<CardHeader icon={icon} label={label} color={UI_COLORS.greyBlue} />}
			minWidth="6rem"
			maxWidth="8rem"
			tooltip={`${label} name`}
		>
			<TextField
				size="small"
				variant="standard"
				value={localName}
				onChange={(event) => setLocalName(event.target.value)}
				onBlur={() => onNameChange(localName)}
				placeholder={location === 'mount' ? 'Mount name' : 'Storage location'}
				InputProps={{
					disableUnderline: true,
					sx: {
						fontSize: '0.85rem',
						'& input': {
							textAlign: 'center',
							p: 0,
						},
					},
				}}
				sx={{ width: '100%' }}
			/>
		</CharacterSheetCard>
	)
}

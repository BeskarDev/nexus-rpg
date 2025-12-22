import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField, alpha } from '@mui/material'
import { Pets, Storage } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'
import { ItemLocation } from '../../../../types/ItemLocation'

export type LocationHeaderCardProps = {
	location: ItemLocation
	name: string
	currentLoad: number
	maxLoad: number
	onNameChange: (name: string) => void
	onMaxLoadChange: (maxLoad: number) => void
}

const getLoadColor = (currentLoad: number, maxLoad: number) => {
	if (maxLoad > 0) {
		if (currentLoad >= maxLoad) {
			return UI_COLORS.danger
		} else if (currentLoad >= maxLoad * 0.8) {
			return UI_COLORS.warning
		}
	}
	return UI_COLORS.greyBlue
}

export const LocationHeaderCard: React.FC<LocationHeaderCardProps> = ({
	location,
	name,
	currentLoad,
	maxLoad,
	onNameChange,
	onMaxLoadChange,
}) => {
	// Local state to prevent focus loss during typing
	const [localName, setLocalName] = useState(name)
	const [localMaxLoad, setLocalMaxLoad] = useState(maxLoad)

	// Update local state when props change
	useEffect(() => {
		setLocalName(name)
	}, [name])

	useEffect(() => {
		setLocalMaxLoad(maxLoad)
	}, [maxLoad])

	const loadColor = getLoadColor(currentLoad, maxLoad)
	const icon = location === 'mount' ? <Pets /> : <Storage />
	const label = location === 'mount' ? 'Mount' : 'Storage'

	return (
		<CharacterSheetCard
			header={<CardHeader icon={icon} label={label} color={loadColor} />}
			minWidth="14rem"
			tooltip={`${label}: Container for storing items`}
			borderColor={currentLoad >= maxLoad && maxLoad > 0 ? loadColor : undefined}
		>
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '100%' }}>
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
								p: 0.5,
							},
						},
					}}
					sx={{ flex: 1, maxWidth: '8rem' }}
				/>
				<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'baseline' }}>
					<Typography
						sx={{
							fontWeight: 'bold',
							fontSize: '0.85rem',
							color: loadColor,
						}}
					>
						{currentLoad}
					</Typography>
					<Typography sx={{ fontSize: '0.7rem', color: 'text.secondary' }}>
						/
					</Typography>
					<TextField
						type="number"
						size="small"
						variant="standard"
						value={localMaxLoad}
						onChange={(event) => setLocalMaxLoad(Number(event.target.value))}
						onBlur={() => onMaxLoadChange(localMaxLoad)}
						InputProps={{
							disableUnderline: true,
							inputProps: { min: 0 },
							sx: {
								fontWeight: 'bold',
								fontSize: '0.85rem',
								color: loadColor,
								'& input': {
									textAlign: 'center',
									p: 0,
									width: '2.5rem',
								},
							},
						}}
					/>
				</Box>
			</Box>
		</CharacterSheetCard>
	)
}

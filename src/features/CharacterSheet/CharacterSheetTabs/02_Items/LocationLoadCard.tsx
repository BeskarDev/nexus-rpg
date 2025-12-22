import React, { useState, useEffect } from 'react'
import { Box, Typography, TextField } from '@mui/material'
import { FitnessCenter } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

export type LocationLoadCardProps = {
	currentLoad: number
	maxLoad: number
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

export const LocationLoadCard: React.FC<LocationLoadCardProps> = ({
	currentLoad,
	maxLoad,
	onMaxLoadChange,
}) => {
	// Local state to prevent focus loss during typing
	const [localMaxLoad, setLocalMaxLoad] = useState(maxLoad)

	// Update local state when props change
	useEffect(() => {
		setLocalMaxLoad(maxLoad)
	}, [maxLoad])

	const loadColor = getLoadColor(currentLoad, maxLoad)

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<FitnessCenter />} label="Load" color={loadColor} />}
			minWidth="6rem"
			maxWidth="8rem"
			tooltip="Load capacity for this location"
			borderColor={currentLoad >= maxLoad && maxLoad > 0 ? loadColor : undefined}
		>
			<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'baseline', justifyContent: 'center' }}>
				<Typography
					sx={{
						fontWeight: 'bold',
						fontSize: '0.85rem',
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
							'& input': {
								textAlign: 'center',
								p: 0,
								width: '2.5rem',
							},
						},
					}}
				/>
			</Box>
		</CharacterSheetCard>
	)
}

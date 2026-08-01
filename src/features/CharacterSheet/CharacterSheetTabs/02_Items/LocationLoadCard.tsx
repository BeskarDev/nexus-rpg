import React from 'react'
import { Box, TextField, Typography } from '@mui/material'
import { SheetField } from '../../components'
import { useFieldDraft } from '../../hooks/useFieldDraft'
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
	const draft = useFieldDraft(maxLoad, onMaxLoadChange)
	const loadColor = getLoadColor(currentLoad, maxLoad)

	return (
		<SheetField
			label="Load"
			sigil="load"
			tone={loadColor}
			minWidth="5.5rem"
			maxWidth="7rem"
			info="Load capacity for this location"
			borderColor={
				currentLoad >= maxLoad && maxLoad > 0 ? loadColor : undefined
			}
		>
			{/* Compound value: the carried total is derived and read-only, only the
			    capacity is editable — so this stays hand-composed rather than
			    becoming a `FieldText`, which models a single editable value. */}
			<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'baseline' }}>
				<Typography
					sx={{
						fontWeight: 'bold',
						fontSize: 'var(--nexus-text-lg)',
						lineHeight: 1.2,
						color: 'text.primary',
						ml: 2,
					}}
				>
					{currentLoad}
				</Typography>
				<Typography sx={{ fontSize: '1rem', color: 'text.secondary', ml: 1 }}>
					/
				</Typography>
				<TextField
					type="number"
					size="small"
					variant="standard"
					value={draft.value}
					onChange={(event) => draft.onChange(Number(event.target.value))}
					onBlur={draft.onBlur}
					inputProps={{ 'aria-label': 'Load capacity' }}
					InputProps={{
						disableUnderline: true,
						inputProps: { min: 0, 'aria-label': 'Load capacity' },
						sx: {
							fontWeight: 'bold',
							fontSize: 'var(--nexus-text-lg)',
							color: 'text.primary',
							'& input': {
								textAlign: 'center',
								p: 0,
								width: '2rem',
								color: 'text.primary',
							},
						},
					}}
				/>
			</Box>
		</SheetField>
	)
}

import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import { AttributeField } from '../../CharacterSheet'
import { Equipment } from '../../types/Character'

export type EquipmentRowProps = {
	label: string
	equipment: Equipment
	updateEquipment: (update: Partial<Equipment>) => void
}

export const EquipmentRow: React.FC<EquipmentRowProps> = ({
	label,
	equipment: initialEquipment,
	updateEquipment,
}) => {
	const [equipment, setEquipment] = useState<Equipment>(initialEquipment)

	return (
		<>
			<Typography variant="body2" fontWeight="bold">
				{label}
			</Typography>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
					pb: 1,
				}}
			>
				<TextField
					variant="standard"
					value={equipment.name}
					onChange={(event) =>
						setEquipment((w) => ({ ...w, name: event.target.value }))
					}
					onBlur={() => updateEquipment({ name: equipment.name })}
					label="Name"
					sx={{ maxWidth: '12rem', flexGrow: 1 }}
				/>
				<TextField
					variant="standard"
					multiline
					minRows={1}
					maxRows={1}
					value={equipment.properties}
					onChange={(event) =>
						setEquipment((w) => ({ ...w, properties: event.target.value }))
					}
					onBlur={() => updateEquipment({ properties: equipment.properties })}
					label="Properties"
					sx={{ maxWidth: '16rem', flexGrow: 1 }}
					inputProps={{ sx: { fontSize: 12 } }}
				/>
				<AttributeField
					type="number"
					size="small"
					value={initialEquipment.cost}
					onChange={(event) =>
						updateEquipment({ cost: Number(event.target.value) })
					}
					label="Cost"
					sx={{ maxWidth: '8rem', flexGrow: 0 }}
					inputProps={{
						sx: {
							textAlign: 'right',
						},
					}}
				/>
				<AttributeField
					type="number"
					size="small"
					value={initialEquipment.load}
					onChange={(event) =>
						updateEquipment({ load: Number(event.target.value) })
					}
					label="Load"
					sx={{ maxWidth: '4rem', flexGrow: 0 }}
				/>
			</Box>
		</>
	)
}

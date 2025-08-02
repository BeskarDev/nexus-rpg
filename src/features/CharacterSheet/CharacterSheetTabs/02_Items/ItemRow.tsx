import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	MenuItem,
	TextField,
} from '@mui/material'
import React, { useState } from 'react'

import { Delete, ExpandMore } from '@mui/icons-material'
import {
	ContainerType,
	containerTypeArray,
	EquipmentSlotType,
	equipmentSlotTypeArray,
	Item,
} from '../../../../types/Character'
import { ItemLocation, ITEM_LOCATIONS } from '../../../../types/ItemLocation'
import { AttributeField } from '../../CharacterSheet'

export type ItemRowProps = {
	item: Item
	updateItem: (update: Partial<Item>) => void
	deleteItem: () => void
}

export const ItemRow: React.FC<ItemRowProps> = ({
	item: initialItem,
	updateItem,
	deleteItem,
}) => {
	const [item, setItem] = useState<Item>(initialItem)
	const [expanded, setExpanded] = useState(false)

	return (
		<Accordion
			expanded={expanded}
			disableGutters
			sx={{ flexGrow: 1, maxWidth: '47rem', mt: 0 }}
		>
			<AccordionSummary
				expandIcon={<ExpandMore onClick={() => setExpanded(!expanded)} />}
				sx={{
					gap: 1,
					pt: 0,
          px: 0,
					flexDirection: 'row-reverse',
					'& .MuiAccordionSummary-content': {
						display: 'block',
					},
				}}
			>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						columnGap: 1,
						maxWidth: '47rem',
					}}
				>
					<TextField
						size="small"
						variant="standard"
						value={item.name}
						onChange={(event) =>
							setItem((w) => ({ ...w, name: event.target.value }))
						}
						onBlur={() => updateItem({ name: item.name })}
						label="Name"
						sx={{ maxWidth: { sm: '12rem', xs: '8rem' } }}
					/>
					<TextField
						size="small"
						variant="standard"
						value={item.properties}
						onChange={(event) =>
							setItem((w) => ({ ...w, properties: event.target.value }))
						}
						onBlur={() => updateItem({ properties: item.properties })}
						label="Properties"
						sx={{ maxWidth: { sm: '12rem', xs: '7rem' } }}
					/>
					<AttributeField
						disabled
						size="small"
						variant="standard"
						value={initialItem.location === 'worn' && initialItem.slot ? initialItem.slot : (initialItem.location || 'carried')}
						label={initialItem.location === 'worn' && initialItem.slot ? "Slot" : "Location"}
						sx={{ maxWidth: '6rem' }}
					/>
					<AttributeField
						size="small"
						variant="standard"
						value={initialItem.cost}
						onChange={(event) =>
							updateItem({ cost: Number(event.target.value) })
						}
						label="Cost"
						sx={{ maxWidth: '3.5rem' }}
					/>
					<AttributeField
						size="small"
						variant="standard"
						value={initialItem.load}
            onChange={(event) =>
              updateItem({ load: Number(event.target.value) })
            }
						label="Load"
						sx={{ maxWidth: '1.5rem' }}
					/>
					<AttributeField
						type="number"
						size="small"
						variant="standard"
						value={initialItem.amount}
						onChange={(event) =>
							updateItem({ amount: Number(event.target.value) })
						}
						label="Amount"
						sx={{ maxWidth: '2.5rem', flexGrow: 0 }}
					/>
				</Box>
			</AccordionSummary>
			<AccordionDetails>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
						columnGap: 1,
						maxWidth: '47rem',
					}}
				>
					<TextField
						size="small"
						multiline
						minRows={1}
						maxRows={5}
						value={item.description}
						onChange={(event) =>
							setItem((i) => ({ ...i, description: event.target.value }))
						}
						onBlur={() => updateItem({ description: item.description })}
						label="Description"
					/>
					<AttributeField
						select
						size="small"
						variant="standard"
						value={initialItem.location || 'carried'}
						onChange={(event) => {
							const newLocation = event.target.value as ItemLocation
							updateItem({ location: newLocation })
							// Clear slot if not worn
							if (newLocation !== 'worn' && initialItem.slot) {
								updateItem({ slot: '' })
							}
						}}
						label="Location"
						sx={{ maxWidth: '8rem' }}
					>
						{ITEM_LOCATIONS.filter(loc => loc !== 'weapons').map((location) => (
							<MenuItem key={location} value={location}>
								{location}
							</MenuItem>
						))}
					</AttributeField>
					<AttributeField
						disabled={!initialItem.location || initialItem.location !== 'worn'}
						select
						size="small"
						variant="standard"
						value={initialItem.slot}
						onChange={(event) =>
							updateItem({ slot: event.target.value as EquipmentSlotType })
						}
						label="Equipped Slot"
						sx={{ maxWidth: '5rem' }}
					>
						{equipmentSlotTypeArray.map((slot) => (
							<MenuItem key={slot} value={slot}>
								{slot}
							</MenuItem>
						))}
					</AttributeField>
					{(initialItem.location === 'mount' || initialItem.location === 'storage') && (
						<TextField
							size="small"
							variant="standard"
							value={initialItem.location === 'mount' ? (initialItem.mountInfo || '') : (initialItem.storageInfo || '')}
							onChange={(event) => {
								if (initialItem.location === 'mount') {
									updateItem({ mountInfo: event.target.value })
								} else {
									updateItem({ storageInfo: event.target.value })
								}
							}}
							label={initialItem.location === 'mount' ? 'Mount' : 'Storage Location'}
							sx={{ maxWidth: '8rem' }}
						/>
					)}
					<IconButton
						size="small"
						edge="end"
						aria-label="delete"
						onClick={deleteItem}
					>
						<Delete />
					</IconButton>
				</Box>
			</AccordionDetails>
		</Accordion>
	)
}

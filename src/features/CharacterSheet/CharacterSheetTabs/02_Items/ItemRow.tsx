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
						sx={{ maxWidth: { sm: '12rem', xs: '8.25rem' } }}
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
					{initialItem.container != 'worn' && (
						<AttributeField
							disabled
							size="small"
							variant="standard"
							value={initialItem.container}
							label="Container"
							sx={{ maxWidth: '3.5rem' }}
						/>
					)}
					{initialItem.container == 'worn' && (
						<AttributeField
							disabled
							size="small"
							variant="standard"
							value={initialItem.slot}
							label="Slot"
							sx={{ maxWidth: '3.5rem' }}
						/>
					)}
					<AttributeField
						disabled
						size="small"
						variant="standard"
						value={initialItem.cost}
						label="Cost"
						sx={{ maxWidth: '3.5rem' }}
					/>
					<AttributeField
						disabled
						size="small"
						variant="standard"
						value={initialItem.load}
						label="Load"
						sx={{ maxWidth: '1.5rem' }}
					/>
					<AttributeField
						type="number"
						size="small"
						value={initialItem.amount}
						onChange={(event) =>
							updateItem({ amount: Number(event.target.value) })
						}
						label="Amount"
						sx={{ maxWidth: '4rem', flexGrow: 0 }}
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
						value={initialItem.container}
						onChange={(event) =>
							updateItem({ container: event.target.value as ContainerType })
						}
						label="Container"
						sx={{ maxWidth: '5rem' }}
					>
						{containerTypeArray.map((container) => (
							<MenuItem key={container} value={container}>
								{container}
							</MenuItem>
						))}
					</AttributeField>
					<AttributeField
						disabled={initialItem.container != 'worn'}
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
					<AttributeField
						type="number"
						size="small"
						value={initialItem.cost}
						onChange={(event) =>
							updateItem({ cost: Number(event.target.value) })
						}
						label="Cost"
						sx={{ maxWidth: '7.5rem' }}
						inputProps={{
							sx: {
								textAlign: 'right',
							},
						}}
					/>
					<AttributeField
						type="number"
						size="small"
						value={initialItem.load}
						onChange={(event) =>
							updateItem({ load: Number(event.target.value) })
						}
						label="Load"
						sx={{ maxWidth: '4rem' }}
					/>
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

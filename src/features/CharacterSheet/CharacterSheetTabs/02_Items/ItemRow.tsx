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
					{initialItem.container != 'worn' && (
						<AttributeField
							disabled
							size="small"
							variant="standard"
							value={initialItem.container}
							label="Storage"
							sx={{ maxWidth: '3.75rem' }}
						/>
					)}
					{initialItem.container == 'worn' && (
						<AttributeField
              disabled
							size="small"
							variant="standard"
							value={initialItem.slot}
							label="Slot"
							sx={{ maxWidth: '3.75rem' }}
						/>
					)}
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
						value={initialItem.container}
						onChange={(event) =>
							updateItem({ container: event.target.value as ContainerType })
						}
						label="Storage"
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

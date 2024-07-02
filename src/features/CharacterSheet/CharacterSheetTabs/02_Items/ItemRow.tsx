import { Box, IconButton, TextField } from '@mui/material'
import React, { useState } from 'react'

import { Delete } from '@mui/icons-material'
import { AttributeField } from '../../CharacterSheet'
import { Item } from '../../types/Character'

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

	return (
		<Box
			sx={{
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				flexWrap: 'wrap',
				columnGap: 1,
				pb: 1,
			}}
		>
			<TextField
				variant="standard"
				value={item.name}
				onChange={(event) =>
					setItem((w) => ({ ...w, name: event.target.value }))
				}
				onBlur={() => updateItem({ name: item.name })}
				label="Name"
				sx={{ maxWidth: { sm: '13rem', xs: '100%' }, flexGrow: 1 }}
			/>
			<TextField
				variant="standard"
				multiline
				minRows={1}
				maxRows={1}
				value={item.properties}
				onChange={(event) =>
					setItem((w) => ({ ...w, properties: event.target.value }))
				}
				onBlur={() => updateItem({ properties: item.properties })}
				label="Properties"
				sx={{ maxWidth: { sm: '20rem', xs: '100%' }, flexGrow: 1 }}
				inputProps={{ sx: { fontSize: 12 } }}
			/>
			<AttributeField
				type="number"
				size="small"
				value={initialItem.cost}
				onChange={(event) => updateItem({ cost: Number(event.target.value) })}
				label="Cost"
				sx={{ maxWidth: '6rem', flexGrow: 0 }}
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
				onChange={(event) => updateItem({ load: Number(event.target.value) })}
				label="Load"
				sx={{ maxWidth: '4rem', flexGrow: 0 }}
			/>
			<AttributeField
				type="number"
				size="small"
				value={initialItem.amount}
				onChange={(event) => updateItem({ amount: Number(event.target.value) })}
				label="Amount"
				sx={{ maxWidth: '4rem', flexGrow: 0 }}
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
	)
}

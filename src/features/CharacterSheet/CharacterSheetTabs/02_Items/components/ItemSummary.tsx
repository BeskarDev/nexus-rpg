import { TextField } from '@mui/material'
import React from 'react'
import { Item } from '@site/src/types/Character'
import { AttributeField } from '@site/src/features/CharacterSheet/CharacterSheet'

export type ItemSummaryProps = {
	item: Item
	onNameChange: (name: string) => void
	onNameBlur: () => void
	onPropertiesChange: (properties: string[]) => void
	onPropertiesBlur: () => void
	onCostChange: (cost: number) => void
	onLoadChange: (load: number) => void
	onAmountChange: (amount: number) => void
}

/**
 * ItemSummary - The collapsed summary view for an item row.
 */
export const ItemSummary: React.FC<ItemSummaryProps> = ({
	item,
	onNameChange,
	onNameBlur,
	onPropertiesChange,
	onPropertiesBlur,
	onCostChange,
	onLoadChange,
	onAmountChange,
}) => {
	return (
		<>
			<TextField
				size="small"
				variant="standard"
				value={item.name}
				onChange={(event) => onNameChange(event.target.value)}
				onBlur={onNameBlur}
				label="Name"
				sx={{ maxWidth: { sm: '10rem', xs: '7rem' } }}
			/>
			<TextField
				size="small"
				variant="standard"
				value={item.properties?.join(', ') || ''}
				onChange={(event) =>
					onPropertiesChange(
						event.target.value
							.split(',')
							.map((p) => p.trim())
							.filter((p) => p),
					)
				}
				onBlur={onPropertiesBlur}
				label="Properties"
				sx={{ maxWidth: { sm: '10rem', xs: '7rem' } }}
			/>
			<AttributeField
				disabled
				size="small"
				variant="standard"
				value={
					item.location === 'worn' && item.slot
						? item.slot
						: item.location || 'carried'
				}
				label={item.location === 'worn' && item.slot ? 'Slot' : 'Location'}
				sx={{ maxWidth: '4.25rem' }}
			/>
			<AttributeField
				size="small"
				variant="standard"
				value={item.cost}
				onChange={(event) => onCostChange(Number(event.target.value))}
				label="Cost"
				sx={{ maxWidth: '2.5rem' }}
			/>
			<AttributeField
				size="small"
				variant="standard"
				value={(item as any).load || (item as any).weight || 0}
				onChange={(event) => onLoadChange(Number(event.target.value))}
				label="Load"
				sx={{ maxWidth: '1.5rem' }}
			/>
			<AttributeField
				type="number"
				size="small"
				variant="standard"
				value={item.amount}
				onChange={(event) => onAmountChange(Number(event.target.value))}
				label="Amount"
				sx={{ maxWidth: '2.5rem', flexGrow: 0 }}
			/>
			<AttributeField
				disabled
				size="small"
				variant="standard"
				value={`${3 - (item.uses || 0)}/3`}
				label="Uses"
				sx={{
					maxWidth: '2.5rem',
				}}
				InputProps={{
					sx: {
						color:
							(item.uses || 0) === 3
								? 'error.main'
								: (item.uses || 0) === 2
									? 'warning.main'
									: 'text.primary',
					},
				}}
			/>
		</>
	)
}

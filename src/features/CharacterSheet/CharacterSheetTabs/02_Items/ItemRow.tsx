import {
	Box,
	Checkbox,
	FormGroup,
	IconButton,
	MenuItem,
	TextField,
	Typography,
	Tooltip,
} from '@mui/material'
import React, { useState } from 'react'

import {
	Delete,
	BookmarkBorder,
	Bookmark,
} from '@mui/icons-material'
import {
	ContainerType,
	containerTypeArray,
	DurabilityDie,
	durabilityDieArray,
	EquipmentSlotType,
	equipmentSlotTypeArray,
	Item,
	Character,
} from '../../../../types/Character'
import { ItemLocation, ITEM_LOCATIONS } from '../../../../types/ItemLocation'
import { AttributeField } from '../../CharacterSheet'
import { QualityTier, qualityTierLabels } from './utils/magicItemsConfig'
import { UnifiedListItem } from '@site/src/components/DynamicList'

export type ItemRowProps = {
	item: Item
	character?: Character
	updateItem: (update: Partial<Item>) => void
	deleteItem: () => void
	isInQuickRef?: boolean
	onToggleQuickRef?: (itemId: string) => void
}

export const ItemRow: React.FC<ItemRowProps> = ({
	item: initialItem,
	updateItem,
	deleteItem,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	const [item, setItem] = useState<Item>(initialItem)

	const summaryContent = (
		<>
			<TextField
				size="small"
				variant="standard"
				value={item.name}
				onChange={(event) =>
					setItem((w) => ({ ...w, name: event.target.value }))
				}
				onBlur={() => updateItem({ name: item.name })}
				label="Name"
				sx={{ maxWidth: { sm: '10rem', xs: '7rem' } }}
			/>
			<TextField
				size="small"
				variant="standard"
			value={item.properties?.join(', ') || ''}
			onChange={(event) =>
				setItem((w) => ({ ...w, properties: event.target.value.split(',').map(p => p.trim()).filter(p => p) }))
				}
				onBlur={() => updateItem({ properties: item.properties })}
				label="Properties"
				sx={{ maxWidth: { sm: '10rem', xs: '7rem' } }}
			/>
			<AttributeField
				disabled
				size="small"
				variant="standard"
				value={
					initialItem.location === 'worn' && initialItem.slot
						? initialItem.slot
						: initialItem.location || 'carried'
				}
				label={
					initialItem.location === 'worn' && initialItem.slot
						? 'Slot'
						: 'Location'
				}
				sx={{ maxWidth: '4.25rem' }}
			/>
			<AttributeField
				size="small"
				variant="standard"
				value={initialItem.cost}
				onChange={(event) =>
					updateItem({ cost: Number(event.target.value) })
				}
				label="Cost"
				sx={{ maxWidth: '2.5rem' }}
			/>
			<AttributeField
				size="small"
				variant="standard"
				value={
					(initialItem as any).load || (initialItem as any).weight || 0
				}
				onChange={(event) =>
					updateItem({
						load: Number(event.target.value),
						weight: Number(event.target.value),
					} as any)
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
			<AttributeField
				disabled
				size="small"
				variant="standard"
				value={`${3 - (initialItem.uses || 0)}/3`}
				label="Uses"
				sx={{
					maxWidth: '2.5rem',
				}}
				InputProps={{
					sx: {
						color:
							(initialItem.uses || 0) === 3
								? 'error.main'
								: (initialItem.uses || 0) === 2
									? 'warning.main'
									: 'text.primary',
					},
				}}
			/>
		</>
	)

	const detailsContent = (
		<>
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
			{/* Quality field for all items */}
			<AttributeField
				select
				size="small"
				variant="standard"
				value={initialItem.quality || ''}
				onChange={(event) => {
					const value = event.target.value
					const newQuality =
						value === '' ? undefined : (Number(value) as QualityTier)
					updateItem({ quality: newQuality })
				}}
				label="Quality"
				sx={{ maxWidth: '3rem' }}
			>
				<MenuItem value="">-</MenuItem>
				{(Object.keys(qualityTierLabels) as unknown as QualityTier[]).map(
					(quality) => (
						<MenuItem key={quality} value={quality}>
							Q{quality}
						</MenuItem>
					),
				)}
			</AttributeField>
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
				sx={{ maxWidth: '4.25rem' }}
			>
				{ITEM_LOCATIONS.map((location) => (
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
				sx={{ maxWidth: '4.25rem' }}
			>
				{equipmentSlotTypeArray.map((slot) => (
					<MenuItem key={slot} value={slot}>
						{slot}
					</MenuItem>
				))}
			</AttributeField>
			<Box
				sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, p: 0.5 }}
			>
				<Typography variant="caption">Uses</Typography>
				<FormGroup row sx={{ gap: 0.25 }}>
					{[1, 2, 3].map((useNumber) => (
						<Checkbox
							key={useNumber}
							size="small"
							checked={(initialItem.uses || 0) >= useNumber}
							onChange={(event) => {
								const newUses = event.target.checked
									? useNumber
									: useNumber - 1
								updateItem({ uses: newUses })
							}}
							sx={{ p: 0.25 }}
						/>
					))}
				</FormGroup>
				{(initialItem.uses || 0) >= 3 &&
					initialItem.location === 'worn' &&
					initialItem.slot && (
						<Typography variant="caption" color="error">
							Item is damaged
						</Typography>
					)}
			</Box>
			<AttributeField
				select
				size="small"
				variant="standard"
				value={initialItem.durability || ''}
				onChange={(event) =>
					updateItem({ durability: event.target.value as DurabilityDie })
				}
				label="Durability"
				sx={{ maxWidth: '4.25rem' }}
			>
				{durabilityDieArray.map((die) => (
					<MenuItem key={die} value={die}>
						{die || 'None'}
					</MenuItem>
				))}
			</AttributeField>
			{onToggleQuickRef && (
				<Tooltip
					title={
						isInQuickRef ? 'Remove from Quick Ref' : 'Add to Quick Ref'
					}
				>
					<IconButton
						size="small"
						onClick={() => onToggleQuickRef(initialItem.id)}
						sx={{
							color: isInQuickRef ? 'primary.main' : 'action.disabled',
						}}
					>
						{isInQuickRef ? <Bookmark /> : <BookmarkBorder />}
					</IconButton>
				</Tooltip>
			)}
			<IconButton
				size="small"
				edge="end"
				aria-label="delete"
				onClick={deleteItem}
			>
				<Delete />
			</IconButton>
		</>
	)

	return (
		<UnifiedListItem
			summaryContent={summaryContent}
			detailsContent={detailsContent}
		/>
	)
}

import { Box, MenuItem, TextField } from '@mui/material'
import React from 'react'
import {
	DurabilityDie,
	durabilityDieArray,
	EquipmentSlotType,
	equipmentSlotTypeArray,
	Item,
} from '@site/src/types/Character'
import { ItemLocation, ITEM_LOCATIONS } from '@site/src/types/ItemLocation'
import { AttributeField } from '@site/src/features/CharacterSheet/CharacterSheet'
import { QualityTier, qualityTierLabels } from '../utils/magicItemsConfig'
import { QuickRefButton, DeleteButton, UsesDisplay } from '@site/src/features/CharacterSheet/components'

export type ItemDetailsProps = {
	item: Item
	onDescriptionChange: (description: string) => void
	onDescriptionBlur: () => void
	onQualityChange: (quality: QualityTier | undefined) => void
	onLocationChange: (location: ItemLocation) => void
	onSlotChange: (slot: EquipmentSlotType) => void
	onUsesChange: (uses: number) => void
	onDurabilityChange: (durability: DurabilityDie) => void
	onDelete: () => void
	isInQuickRef?: boolean
	onToggleQuickRef?: (itemId: string) => void
}

/**
 * ItemDetails - The expanded details view for an item row.
 */
export const ItemDetails: React.FC<ItemDetailsProps> = ({
	item,
	onDescriptionChange,
	onDescriptionBlur,
	onQualityChange,
	onLocationChange,
	onSlotChange,
	onUsesChange,
	onDurabilityChange,
	onDelete,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	return (
		<>
			<TextField
				size="small"
				multiline
				minRows={1}
				maxRows={5}
				value={item.description}
				onChange={(event) => onDescriptionChange(event.target.value)}
				onBlur={onDescriptionBlur}
				label="Description"
			/>
			{/* Quality field for all items */}
			<AttributeField
				select
				size="small"
				variant="standard"
				value={item.quality || ''}
				onChange={(event) => {
					const value = event.target.value
					const newQuality =
						value === '' ? undefined : (Number(value) as QualityTier)
					onQualityChange(newQuality)
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
				value={item.location || 'carried'}
				onChange={(event) => {
					const newLocation = event.target.value as ItemLocation
					onLocationChange(newLocation)
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
				disabled={!item.location || item.location !== 'worn'}
				select
				size="small"
				variant="standard"
				value={item.slot}
				onChange={(event) =>
					onSlotChange(event.target.value as EquipmentSlotType)
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
			<UsesDisplay
				uses={item.uses || 0}
				onUsesChange={onUsesChange}
				showDamageWarning={
					(item.uses || 0) >= 3 && item.location === 'worn' && !!item.slot
				}
				damageWarningText="Item is damaged"
			/>
			<AttributeField
				select
				size="small"
				variant="standard"
				value={item.durability || ''}
				onChange={(event) =>
					onDurabilityChange(event.target.value as DurabilityDie)
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
			<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
				{onToggleQuickRef && (
					<QuickRefButton
						itemId={item.id}
						isInQuickRef={isInQuickRef}
						onToggle={onToggleQuickRef}
					/>
				)}
				<DeleteButton onDelete={onDelete} />
			</Box>
		</>
	)
}

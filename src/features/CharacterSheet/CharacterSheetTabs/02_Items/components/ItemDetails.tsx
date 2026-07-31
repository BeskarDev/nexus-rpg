import { Box, MenuItem } from '@mui/material'
import React from 'react'
import {
	DurabilityDie,
	durabilityDieArray,
	EquipmentSlotType,
	equipmentSlotTypeArray,
	Item,
} from '@site/src/types/Character'
import { ItemLocation, ITEM_LOCATIONS } from '@site/src/types/ItemLocation'
import { QualityTier, qualityTierLabels } from '../utils/magicItemsConfig'
import {
	DeleteButton,
	QuickRefButton,
} from '@site/src/features/CharacterSheet/components'
import { DetailField, DetailsGroup, DetailsPanel } from './DetailsPanel'
import { useFieldDraft } from '../../../hooks/useFieldDraft'

export type ItemDetailsProps = {
	item: Item
	onNameChange: (name: string) => void
	onPropertiesChange: (properties: string[]) => void
	onDescriptionChange: (description: string) => void
	onCostChange: (cost: number) => void
	onLoadChange: (load: number) => void
	onAmountChange: (amount: number) => void
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
 * Everything that defines an item (M13 S4b).
 *
 * Per D5 this is the **only** place an item is edited, apart from the two
 * counters the row keeps. That resolves three defects at once: `location` and
 * `uses` used to be shown read-only in the row and edited here, so a value had
 * two homes; `cost` / `load` / `amount` were row fields on an item and details
 * fields on a weapon, the same three values on opposite faces in one tab; and
 * the row carried an editable name, which meant a list of things was a list of
 * form controls.
 *
 * Grouped by what a field IS rather than by type — identity, numbers,
 * placement, condition — under `FieldGroupLabel`s. Named groups rather than
 * rules, per S1: a rule cuts a panel into strips and says nothing, a label says
 * what the group is.
 */
export const ItemDetails: React.FC<ItemDetailsProps> = ({
	item,
	onNameChange,
	onPropertiesChange,
	onDescriptionChange,
	onCostChange,
	onLoadChange,
	onAmountChange,
	onQualityChange,
	onLocationChange,
	onSlotChange,
	onUsesChange,
	onDurabilityChange,
	onDelete,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	const name = useFieldDraft(item.name, onNameChange)
	const description = useFieldDraft(item.description ?? '', onDescriptionChange)
	const properties = useFieldDraft(
		Array.isArray(item.properties) ? item.properties.join(', ') : '',
		(value) =>
			onPropertiesChange(
				value
					.split(',')
					.map((p) => p.trim())
					.filter(Boolean),
			),
	)

	return (
		<DetailsPanel
			actions={
				<>
					{onToggleQuickRef && (
						<QuickRefButton
							itemId={item.id}
							isInQuickRef={isInQuickRef}
							onToggle={onToggleQuickRef}
						/>
					)}
					<DeleteButton onDelete={onDelete} />
				</>
			}
		>
			<DetailsGroup label="Identity" wide>
				<DetailField
					label="Name"
					value={name.value}
					onChange={(event) => name.onChange(event.target.value)}
					onBlur={name.onBlur}
					width="12rem"
				/>
				<DetailField
					label="Properties"
					value={properties.value}
					onChange={(event) => properties.onChange(event.target.value)}
					onBlur={properties.onBlur}
					width="18rem"
				/>
				<DetailField
					label="Description"
					multiline
					minRows={1}
					maxRows={5}
					value={description.value}
					onChange={(event) => description.onChange(event.target.value)}
					onBlur={description.onBlur}
					width="100%"
				/>
			</DetailsGroup>

			<DetailsGroup label="Numbers">
				<DetailField
					type="number"
					label="Cost"
					align="center"
					value={item.cost ?? 0}
					onChange={(event) => onCostChange(Number(event.target.value))}
				/>
				<DetailField
					type="number"
					label="Load"
					align="center"
					value={item.load ?? item.weight ?? 0}
					onChange={(event) => onLoadChange(Number(event.target.value))}
				/>
				<DetailField
					type="number"
					label="Amount"
					align="center"
					value={item.amount}
					onChange={(event) => onAmountChange(Number(event.target.value))}
				/>
				<DetailField
					select
					label="Quality"
					value={item.quality || ''}
					onChange={(event) =>
						onQualityChange(
							event.target.value
								? (Number(event.target.value) as QualityTier)
								: undefined,
						)
					}
					width="8rem"
				>
					<MenuItem value="">-</MenuItem>
					{Object.entries(qualityTierLabels).map(([quality, label]) => (
						<MenuItem key={quality} value={quality}>
							{label}
						</MenuItem>
					))}
				</DetailField>
			</DetailsGroup>

			<DetailsGroup label="Placement">
				<DetailField
					select
					label="Location"
					value={item.location || 'carried'}
					onChange={(event) =>
						onLocationChange(event.target.value as ItemLocation)
					}
					width="8rem"
				>
					{ITEM_LOCATIONS.map((location) => (
						<MenuItem key={location} value={location}>
							{location}
						</MenuItem>
					))}
				</DetailField>
				{item.location === 'worn' && (
					<DetailField
						select
						label="Equipped Slot"
						value={item.slot || ''}
						onChange={(event) =>
							onSlotChange(event.target.value as EquipmentSlotType)
						}
						width="9rem"
					>
						{equipmentSlotTypeArray.map((slot) => (
							<MenuItem key={slot} value={slot}>
								{slot}
							</MenuItem>
						))}
					</DetailField>
				)}
			</DetailsGroup>

			<DetailsGroup label="Condition">
				<DetailField
					type="number"
					label="Uses"
					align="center"
					value={item.uses || 0}
					inputProps={{ min: 0, max: 3 }}
					onChange={(event) =>
						onUsesChange(
							Math.min(3, Math.max(0, Number(event.target.value))),
						)
					}
				/>
				<DetailField
					select
					label="Durability"
					value={item.durability || ''}
					onChange={(event) =>
						onDurabilityChange(event.target.value as DurabilityDie)
					}
					width="8rem"
				>
					{durabilityDieArray.map((die) => (
						<MenuItem key={die} value={die}>
							{die}
						</MenuItem>
					))}
				</DetailField>
			</DetailsGroup>
		</DetailsPanel>
	)
}

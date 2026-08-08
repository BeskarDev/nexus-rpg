import React from 'react'
import {
	Character,
	DurabilityDie,
	EquipmentSlotType,
	Item,
} from '../../../../types/Character'
import { ItemLocation } from '../../../../types/ItemLocation'
import { UnifiedListItem } from '@site/src/features/CharacterSheet/components/DynamicList'
import { LEDGER_TEMPLATE, LedgerShape } from './components/ledgerColumns'
import { ItemSummary, ItemDetails } from './components'

export type ItemRowProps = {
	item: Item
	character?: Character
	/** `worn` adds the body-slot column; every other section omits it. */
	shape?: Extract<LedgerShape, 'item' | 'worn'>
	updateItem: (update: Partial<Item>) => void
	deleteItem: () => void
	isInQuickRef?: boolean
	onToggleQuickRef?: (itemId: string) => void
}

export const ItemRow: React.FC<ItemRowProps> = ({
	item,
	shape = 'item',
	updateItem,
	deleteItem,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	const handleLocationChange = (newLocation: ItemLocation) => {
		updateItem({ location: newLocation })
		// Clear slot if not worn
		if (newLocation !== 'worn' && item.slot) {
			updateItem({ slot: undefined })
		}
	}

	// M13 S4b: no local draft state left. Every field the row used to edit locally
	// and commit on blur moved into the details panel, which owns its own drafts.
	return (
		<UnifiedListItem
			summaryClassName="cs-ledger-row-grid"
			summarySx={{
				gridTemplateColumns: LEDGER_TEMPLATE,
				columnGap: 1,
			}}
			summaryContent={
				<ItemSummary
					item={item}
					showSlot={shape === 'worn'}
					onUsesChange={(uses) => updateItem({ uses })}
				/>
			}
			detailsContent={
				<ItemDetails
					item={item}
					onNameChange={(name) => updateItem({ name })}
					onPropertiesChange={(properties) => updateItem({ properties })}
					onDescriptionChange={(description) => updateItem({ description })}
					onCostChange={(cost) => updateItem({ cost })}
					onLoadChange={(load) => updateItem({ load, weight: load })}
					onAmountChange={(amount) => updateItem({ amount })}
					onQualityChange={(quality) => updateItem({ quality })}
					onLocationChange={handleLocationChange}
					onSlotChange={(slot) =>
						updateItem({ slot: slot as EquipmentSlotType })
					}
					onUsesChange={(uses) => updateItem({ uses })}
					onDurabilityChange={(durability) =>
						updateItem({ durability: durability as DurabilityDie })
					}
					onDelete={deleteItem}
					isInQuickRef={isInQuickRef}
					onToggleQuickRef={onToggleQuickRef}
				/>
			}
		/>
	)
}

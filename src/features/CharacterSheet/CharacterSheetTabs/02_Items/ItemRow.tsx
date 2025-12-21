import React, { useState } from 'react'
import {
	DurabilityDie,
	EquipmentSlotType,
	Item,
	Character,
} from '../../../../types/Character'
import { ItemLocation } from '../../../../types/ItemLocation'
import { UnifiedListItem } from '@site/src/components/DynamicList'
import { ItemSummary, ItemDetails } from './components'

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

const handleLocationChange = (newLocation: ItemLocation) => {
	updateItem({ location: newLocation })
	// Clear slot if not worn
	if (newLocation !== 'worn' && initialItem.slot) {
		updateItem({ slot: undefined })
	}
}

return (
<UnifiedListItem
summaryContent={
<ItemSummary
item={{ ...item, uses: initialItem.uses }}
onNameChange={(name) => setItem((i) => ({ ...i, name }))}
onNameBlur={() => updateItem({ name: item.name })}
onPropertiesChange={(properties) =>
setItem((i) => ({ ...i, properties }))
}
onPropertiesBlur={() => updateItem({ properties: item.properties })}
onCostChange={(cost) => updateItem({ cost })}
onLoadChange={(load) =>
updateItem({
load,
weight: load,
} as any)
}
onAmountChange={(amount) => updateItem({ amount })}
/>
}
detailsContent={
<ItemDetails
item={initialItem}
onDescriptionChange={(description) =>
setItem((i) => ({ ...i, description }))
}
onDescriptionBlur={() =>
updateItem({ description: item.description })
}
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

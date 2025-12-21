import React, { useState } from 'react'
import { DurabilityDie, Weapon } from '../../../../types/Character'
import { ItemLocation } from '../../../../types/ItemLocation'
import { QualityTier } from './utils/magicItemsConfig'
import { UnifiedListItem } from '@site/src/components/DynamicList'
import { WeaponSummary, WeaponDetails } from './components'

export type WeaponRowProps = {
weapon: Weapon
updateWeapon: (update: Partial<Weapon>) => void
deleteWeapon: () => void
isInQuickRef?: boolean
onToggleQuickRef?: (weaponId: string) => void
}

export const WeaponRow: React.FC<WeaponRowProps> = ({
weapon: initialWeapon,
updateWeapon,
deleteWeapon,
isInQuickRef = false,
onToggleQuickRef,
}) => {
const [weapon, setWeapon] = useState<Weapon>(initialWeapon)

return (
<UnifiedListItem
summaryContent={
<WeaponSummary
weapon={{ ...weapon, uses: initialWeapon.uses, damage: initialWeapon.damage }}
onNameChange={(name) => setWeapon((w) => ({ ...w, name }))}
onNameBlur={() => updateWeapon({ name: weapon.name })}
onDamageUpdate={(update) =>
updateWeapon({ damage: { ...initialWeapon.damage, ...update } })
}
onPropertiesChange={(properties) =>
setWeapon((w) => ({ ...w, properties }))
}
onPropertiesBlur={() => updateWeapon({ properties: weapon.properties })}
/>
}
detailsContent={
<WeaponDetails
weapon={initialWeapon}
onDescriptionChange={(description) =>
setWeapon((w) => ({ ...w, description }))
}
onDescriptionBlur={() =>
updateWeapon({ description: weapon.description })
}
onCostChange={(cost) => updateWeapon({ cost })}
onLoadChange={(load) => updateWeapon({ load })}
onAmountChange={(amount) => updateWeapon({ amount })}
onQualityChange={(quality) => updateWeapon({ quality })}
onLocationChange={(location) =>
updateWeapon({ location: location as ItemLocation })
}
onMountInfoChange={(mountInfo) => updateWeapon({ mountInfo })}
onStorageInfoChange={(storageInfo) => updateWeapon({ storageInfo })}
onUsesChange={(uses) => updateWeapon({ uses })}
onDurabilityChange={(durability) =>
updateWeapon({ durability: durability as DurabilityDie })
}
onDelete={deleteWeapon}
isInQuickRef={isInQuickRef}
onToggleQuickRef={onToggleQuickRef}
/>
}
/>
)
}

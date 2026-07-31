import React from 'react'
import { DurabilityDie, Weapon } from '../../../../types/Character'
import { ItemLocation } from '../../../../types/ItemLocation'
import { UnifiedListItem } from '@site/src/features/CharacterSheet/components/DynamicList'
import { useAppSelector } from '../../hooks/useAppSelector'
import { calculateDamageValue } from '../../utils/calculateDamageDisplay'
import { LEDGER_TEMPLATE } from './components/ledgerColumns'
import { WeaponSummary, WeaponDetails } from './components'

export type WeaponRowProps = {
	weapon: Weapon
	updateWeapon: (update: Partial<Weapon>) => void
	deleteWeapon: () => void
	isInQuickRef?: boolean
	onToggleQuickRef?: (weaponId: string) => void
}

export const WeaponRow: React.FC<WeaponRowProps> = ({
	weapon,
	updateWeapon,
	deleteWeapon,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	const character = useAppSelector(
		(state) => state.characterSheet.activeCharacter,
	)

	// M13 S4b: no local draft state left. Every field the row used to edit locally
	// and commit on blur — name, properties — moved into the details panel, which
	// owns its own drafts; the two the row keeps commit immediately on change.
	return (
		<UnifiedListItem
			/* The row's cells sit on the section's shared column tracks, so a list
				reads down its columns instead of each row re-declaring its own. The
				`display: grid` is switched on by the ledger media query in
				characterSheet.css; below it this template is inert and the row wraps. */
			summaryClassName="cs-ledger-row-grid"
			summarySx={{
				gridTemplateColumns: LEDGER_TEMPLATE,
				columnGap: 1,
			}}
			summaryContent={
				<WeaponSummary
					weapon={weapon}
					damage={calculateDamageValue(weapon.damage, 'weapon', character)}
					onUsesChange={(uses) => updateWeapon({ uses })}
				/>
			}
			detailsContent={
				<WeaponDetails
					weapon={weapon}
					onNameChange={(name) => updateWeapon({ name })}
					onPropertiesChange={(properties) => updateWeapon({ properties })}
					onDescriptionChange={(description) => updateWeapon({ description })}
					onDamageUpdate={(update) =>
						updateWeapon({ damage: { ...weapon.damage, ...update } })
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

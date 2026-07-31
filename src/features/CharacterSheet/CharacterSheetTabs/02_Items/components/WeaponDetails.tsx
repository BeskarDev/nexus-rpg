import { MenuItem } from '@mui/material'
import React from 'react'
import {
	DurabilityDie,
	durabilityDieArray,
	Weapon,
} from '@site/src/types/Character'
import { ItemLocation, ITEM_LOCATIONS } from '@site/src/types/ItemLocation'
import { QualityTier, qualityTierLabels } from '../utils/magicItemsConfig'
import {
	DeleteButton,
	QuickRefButton,
} from '@site/src/features/CharacterSheet/components'
import { DamageFields } from '../../DamageFields'
import { DetailField, DetailsGroup, DetailsPanel } from './DetailsPanel'
import { useFieldDraft } from '../../../hooks/useFieldDraft'

export type WeaponDetailsProps = {
	weapon: Weapon
	onNameChange: (name: string) => void
	onPropertiesChange: (properties: string) => void
	onDescriptionChange: (description: string) => void
	onDamageUpdate: (update: Partial<Weapon['damage']>) => void
	onCostChange: (cost: number) => void
	onLoadChange: (load: number) => void
	onAmountChange: (amount: number) => void
	onQualityChange: (quality: QualityTier | undefined) => void
	onLocationChange: (location: ItemLocation) => void
	onMountInfoChange: (mountInfo: string) => void
	onStorageInfoChange: (storageInfo: string) => void
	onUsesChange: (uses: number) => void
	onDurabilityChange: (durability: DurabilityDie) => void
	onDelete: () => void
	isInQuickRef?: boolean
	onToggleQuickRef?: (weaponId: string) => void
}

/**
 * Everything that defines a weapon (M13 S4b).
 *
 * The damage editor lives here now. It used to be a **gear icon in the summary
 * row opening its own popover** — a nested disclosure inside a row that already
 * expands, and the only one of its kind on the sheet. A weapon's damage is
 * defined the same way its cost and quality are, so it is defined in the same
 * place.
 */
export const WeaponDetails: React.FC<WeaponDetailsProps> = ({
	weapon,
	onNameChange,
	onPropertiesChange,
	onDescriptionChange,
	onDamageUpdate,
	onCostChange,
	onLoadChange,
	onAmountChange,
	onQualityChange,
	onLocationChange,
	onMountInfoChange,
	onStorageInfoChange,
	onUsesChange,
	onDurabilityChange,
	onDelete,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	const name = useFieldDraft(weapon.name, onNameChange)
	const properties = useFieldDraft(weapon.properties ?? '', onPropertiesChange)
	const description = useFieldDraft(weapon.description ?? '', onDescriptionChange)
	const placementInfo =
		weapon.location === 'mount'
			? { value: weapon.mountInfo ?? '', onChange: onMountInfoChange, label: 'Mount' }
			: weapon.location === 'storage'
				? {
						value: weapon.storageInfo ?? '',
						onChange: onStorageInfoChange,
						label: 'Storage Location',
					}
				: undefined

	return (
		<DetailsPanel
			actions={
				<>
					{onToggleQuickRef && (
						<QuickRefButton
							itemId={weapon.id}
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

			<DetailsGroup label="Damage">
				<DamageFields
					inline
					type="weapon"
					damage={weapon.damage}
					updateDamage={onDamageUpdate}
				/>
			</DetailsGroup>

			<DetailsGroup label="Numbers">
				<DetailField
					type="number"
					label="Cost"
					align="center"
					value={weapon.cost}
					onChange={(event) => onCostChange(Number(event.target.value))}
				/>
				<DetailField
					type="number"
					label="Load"
					align="center"
					value={weapon.load}
					onChange={(event) => onLoadChange(Number(event.target.value))}
				/>
				<DetailField
					type="number"
					label="Amount"
					align="center"
					value={weapon.amount ?? 0}
					onChange={(event) => onAmountChange(Number(event.target.value))}
				/>
				<DetailField
					select
					label="Quality"
					value={weapon.quality || ''}
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
					value={weapon.location || 'carried'}
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
				{placementInfo && (
					<DetailField
						label={placementInfo.label}
						value={placementInfo.value}
						onChange={(event) => placementInfo.onChange(event.target.value)}
						width="9rem"
					/>
				)}
			</DetailsGroup>

			<DetailsGroup label="Condition">
				<DetailField
					type="number"
					label="Uses"
					align="center"
					value={weapon.uses || 0}
					inputProps={{ min: 0, max: 3 }}
					onChange={(event) =>
						onUsesChange(Math.min(3, Math.max(0, Number(event.target.value))))
					}
				/>
				<DetailField
					select
					label="Durability"
					value={weapon.durability || ''}
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

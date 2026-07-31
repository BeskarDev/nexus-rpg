import { MenuItem } from '@mui/material'
import React from 'react'
import {
	DurabilityDie,
	durabilityDieArray,
	Weapon,
} from '@site/src/types/Character'
import { ItemLocation, ITEM_LOCATIONS } from '@site/src/types/ItemLocation'
import {
	ItemQuality,
	ITEM_QUALITIES,
	qualityLong,
	qualityShort,
} from '../utils/itemQuality'
import { LOCATION_SIGIL, MarkedOption } from '../utils/itemMarks'
import {
	DeleteButton,
	DetailField,
	DetailsGroup,
	DetailsPanel,
	Inscription,
	PipRow,
	QuickRefButton,
	RecordPlate,
	RecordRow,
} from '@site/src/features/CharacterSheet/components'
import { UI_COLORS } from '@site/src/utils/colors'
import { DamageEquation } from '../../DamageEquation'
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
	onQualityChange: (quality: ItemQuality | undefined) => void
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
 * Everything that defines a weapon (M13 S4b, rebuilt S4d).
 *
 * The damage editor lives here. It used to be a **gear icon in the summary row
 * opening its own popover** — a nested disclosure inside a row that already
 * expands, and the only one of its kind on the sheet. A weapon's damage is defined
 * the same way its cost and quality are, so it is defined in the same place.
 *
 * ## The anatomy (S4d)
 *
 * The **inscription** (what it is) and the **equation** (what it does) on the left,
 * the **record plate** (what it is worth, where it is, what state it is in) down the
 * right. Three shapes rather than five identical field groups, so a glance at the
 * panel tells you which part you are looking at before you read a single label.
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
	const description = useFieldDraft(
		weapon.description ?? '',
		onDescriptionChange,
	)
	const uses = weapon.uses || 0
	const placementInfo =
		weapon.location === 'mount'
			? {
					value: weapon.mountInfo ?? '',
					onChange: onMountInfoChange,
					label: 'Mount',
					sigil: 'location-mount' as const,
				}
			: weapon.location === 'storage'
				? {
						value: weapon.storageInfo ?? '',
						onChange: onStorageInfoChange,
						label: 'Where',
						sigil: 'location-storage' as const,
					}
				: undefined

	return (
		<DetailsPanel
			aside={
				<RecordPlate
					label="Record"
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
					<RecordRow sigil="catalyst" label="Quality">
						<DetailField
							select
							value={weapon.quality || ''}
							onChange={(event) =>
								onQualityChange(
									event.target.value
										? (Number(event.target.value) as ItemQuality)
										: undefined,
								)
							}
							width="8.5rem"
							inputProps={{ 'aria-label': 'Quality' }}
							// The closed field shows the rating alone; the list shows the
							// descriptor with it. See `qualityShort` for why.
							SelectProps={{
								renderValue: (value: unknown) =>
									value ? qualityShort(Number(value) as ItemQuality) : '—',
							}}
						>
							<MenuItem value="">—</MenuItem>
							{ITEM_QUALITIES.map((quality) => (
								<MenuItem key={quality} value={quality}>
									{qualityLong(quality)}
								</MenuItem>
							))}
						</DetailField>
					</RecordRow>
					<RecordRow sigil="load" label="Load">
						<DetailField
							type="number"
							align="center"
							value={weapon.load}
							onChange={(event) => onLoadChange(Number(event.target.value))}
							inputProps={{ 'aria-label': 'Load' }}
						/>
					</RecordRow>
					<RecordRow sigil="coins" label="Cost">
						<DetailField
							type="number"
							align="center"
							value={weapon.cost}
							onChange={(event) => onCostChange(Number(event.target.value))}
							inputProps={{ 'aria-label': 'Cost' }}
						/>
					</RecordRow>
					<RecordRow sigil="xp" label="Amount">
						<DetailField
							type="number"
							align="center"
							value={weapon.amount ?? 0}
							onChange={(event) => onAmountChange(Number(event.target.value))}
							inputProps={{ 'aria-label': 'Amount' }}
						/>
					</RecordRow>
					<RecordRow sigil="location-storage" label="Location" section>
						<DetailField
							select
							value={weapon.location || 'carried'}
							onChange={(event) =>
								onLocationChange(event.target.value as ItemLocation)
							}
							width="8.5rem"
							inputProps={{ 'aria-label': 'Location' }}
						>
							{ITEM_LOCATIONS.map((location) => (
								<MenuItem key={location} value={location}>
									<MarkedOption sigil={LOCATION_SIGIL[location]}>
										{location}
									</MarkedOption>
								</MenuItem>
							))}
						</DetailField>
					</RecordRow>
					{placementInfo && (
						<RecordRow sigil={placementInfo.sigil} label={placementInfo.label}>
							<DetailField
								value={placementInfo.value}
								onChange={(event) => placementInfo.onChange(event.target.value)}
								width="8.5rem"
								inputProps={{ 'aria-label': placementInfo.label }}
							/>
						</RecordRow>
					)}
					<RecordRow sigil="hp" label="Durability">
						<DetailField
							select
							value={weapon.durability || ''}
							onChange={(event) =>
								onDurabilityChange(event.target.value as DurabilityDie)
							}
							width="8.5rem"
							inputProps={{ 'aria-label': 'Durability' }}
						>
							{durabilityDieArray.map((die) => (
								<MenuItem key={die} value={die}>
									{die}
								</MenuItem>
							))}
						</DetailField>
					</RecordRow>

					<RecordRow sigil="wound" label="Uses">
						<PipRow
							count={3}
							value={uses}
							onChange={onUsesChange}
							sigil="wound"
							emptySigil="hp"
							tone={uses >= 3 ? UI_COLORS.danger : UI_COLORS.warning}
							label="Uses"
						/>
					</RecordRow>
					{/* Only there when the location gives it a meaning — a mount's name is
						not a fact about a weapon in a backpack. */}
				</RecordPlate>
			}
		>
			<DetailsGroup label="Identity" sigil="name">
				<Inscription
					subject
					grow={2}
					label="Name"
					value={name.value}
					onChange={(event) => name.onChange(event.target.value)}
					onBlur={name.onBlur}
				/>
				<Inscription
					grow={3}
					label="Properties"
					placeholder="reach, two-handed, ..."
					value={properties.value}
					onChange={(event) => properties.onChange(event.target.value)}
					onBlur={properties.onBlur}
				/>
				<Inscription
					block
					multiline
					maxRows={6}
					label="Description"
					value={description.value}
					onChange={(event) => description.onChange(event.target.value)}
					onBlur={description.onBlur}
					sx={{ flex: '1 1 100%' }}
				/>
			</DetailsGroup>

			{/* No `trailing` preview here any more: the equation opens WITH its result,
				so a second copy beside the heading would be the same number twice. */}
			<DetailsGroup label="Damage" sigil="parry">
				<DamageEquation
					type="weapon"
					damage={weapon.damage}
					updateDamage={onDamageUpdate}
				/>
			</DetailsGroup>
		</DetailsPanel>
	)
}

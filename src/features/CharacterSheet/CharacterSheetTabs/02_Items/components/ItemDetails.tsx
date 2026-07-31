import { MenuItem } from '@mui/material'
import React from 'react'
import {
	DurabilityDie,
	durabilityDieArray,
	EquipmentSlotType,
	equipmentSlotTypeArray,
	Item,
} from '@site/src/types/Character'
import { ItemLocation, ITEM_LOCATIONS } from '@site/src/types/ItemLocation'
import {
	ItemQuality,
	ITEM_QUALITIES,
	qualityLong,
	qualityShort,
} from '../utils/itemQuality'
import { LOCATION_SIGIL, MarkedOption, slotSigil } from '../utils/itemMarks'
import {
	DeleteButton,
	PipRow,
	QuickRefButton,
	RecordPlate,
	RecordRow,
} from '@site/src/features/CharacterSheet/components'
import { UI_COLORS } from '@site/src/utils/colors'
import {
	DetailField,
	DetailsGroup,
	DetailsPanel,
	Inscription,
} from './DetailsPanel'
import { useFieldDraft } from '../../../hooks/useFieldDraft'

export type ItemDetailsProps = {
	item: Item
	onNameChange: (name: string) => void
	onPropertiesChange: (properties: string[]) => void
	onDescriptionChange: (description: string) => void
	onCostChange: (cost: number) => void
	onLoadChange: (load: number) => void
	onAmountChange: (amount: number) => void
	onQualityChange: (quality: ItemQuality | undefined) => void
	onLocationChange: (location: ItemLocation) => void
	onSlotChange: (slot: EquipmentSlotType) => void
	onUsesChange: (uses: number) => void
	onDurabilityChange: (durability: DurabilityDie) => void
	onDelete: () => void
	isInQuickRef?: boolean
	onToggleQuickRef?: (itemId: string) => void
}

/**
 * Everything that defines an item (M13 S4b, rebuilt S4d).
 *
 * Per D5 this is the **only** place an item is edited, apart from the one counter
 * the row keeps. That resolves three defects at once: `location` and `uses` used to
 * be shown read-only in the row and edited here, so a value had two homes; `cost` /
 * `load` / `amount` were row fields on an item and details fields on a weapon, the
 * same three values on opposite faces in one tab; and the row carried an editable
 * name, which meant a list of things was a list of form controls.
 *
 * ## The anatomy (S4d)
 *
 * Two registers with fixed homes rather than a wrapping flow of five groups: the
 * **inscription** on the left says what the thing is, the **record plate** on the
 * right says what it is worth and where it is kept. See `DetailsPanel` for why a
 * fixed anatomy beats a responsive one here, and `RecordPlate` for why seven
 * labelled boxes became seven ruled rows.
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
	const uses = item.uses || 0

	return (
		<DetailsPanel
			aside={
				<RecordPlate
					label="Record"
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
					<RecordRow sigil="catalyst" label="Quality">
						<DetailField
							select
							value={item.quality || ''}
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
							value={item.load ?? item.weight ?? 0}
							onChange={(event) => onLoadChange(Number(event.target.value))}
							inputProps={{ 'aria-label': 'Load' }}
						/>
					</RecordRow>
					<RecordRow sigil="coins" label="Cost">
						<DetailField
							type="number"
							align="center"
							value={item.cost ?? 0}
							onChange={(event) => onCostChange(Number(event.target.value))}
							inputProps={{ 'aria-label': 'Cost' }}
						/>
					</RecordRow>
					<RecordRow sigil="xp" label="Amount">
						<DetailField
							type="number"
							align="center"
							value={item.amount}
							onChange={(event) => onAmountChange(Number(event.target.value))}
							inputProps={{ 'aria-label': 'Amount' }}
						/>
					</RecordRow>
					<RecordRow sigil="location-storage" label="Location" section>
						<DetailField
							select
							value={item.location || 'carried'}
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
					{item.location === 'worn' && (
						<RecordRow sigil="av" label="Slot">
							<DetailField
								select
								value={item.slot || ''}
								onChange={(event) =>
									onSlotChange(event.target.value as EquipmentSlotType)
								}
								width="8.5rem"
								inputProps={{ 'aria-label': 'Equipped slot' }}
							>
								{equipmentSlotTypeArray.map((slot) => (
									<MenuItem key={slot} value={slot}>
										<MarkedOption sigil={slotSigil(slot)}>
											{slot || '—'}
										</MarkedOption>
									</MenuItem>
								))}
							</DetailField>
						</RecordRow>
					)}
					<RecordRow sigil="hp" label="Durability">
						<DetailField
							select
							value={item.durability || ''}
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
					{/* Only worn equipment occupies a body slot, so the row is only there
						when it means something — the same reason `slot` is not a column in
						every ledger shape. */}
					{/* Wear is pips, the same control the row carries — the one field on
						the old panel with a hard 0-3 range and no way to see it. */}
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
					placeholder="comma separated"
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
		</DetailsPanel>
	)
}

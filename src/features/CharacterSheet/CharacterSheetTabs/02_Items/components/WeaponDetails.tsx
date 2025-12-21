import { Box, MenuItem, TextField } from '@mui/material'
import React from 'react'
import {
	DurabilityDie,
	durabilityDieArray,
	Weapon,
} from '@site/src/types/Character'
import { ItemLocation, ITEM_LOCATIONS } from '@site/src/types/ItemLocation'
import { AttributeField } from '@site/src/features/CharacterSheet/CharacterSheet'
import { QualityTier, qualityTierLabels } from '../utils/magicItemsConfig'
import { QuickRefButton, DeleteButton, UsesDisplay } from '@site/src/features/CharacterSheet/components'

export type WeaponDetailsProps = {
	weapon: Weapon
	onDescriptionChange: (description: string) => void
	onDescriptionBlur: () => void
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
 * WeaponDetails - The expanded details view for a weapon row.
 */
export const WeaponDetails: React.FC<WeaponDetailsProps> = ({
	weapon,
	onDescriptionChange,
	onDescriptionBlur,
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
	return (
		<>
			<TextField
				size="small"
				multiline
				minRows={1}
				maxRows={5}
				value={weapon.description}
				onChange={(event) => onDescriptionChange(event.target.value)}
				onBlur={onDescriptionBlur}
				label="Description"
			/>
			<AttributeField
				type="number"
				size="small"
				value={weapon.cost}
				onChange={(event) => onCostChange(Number(event.target.value))}
				label="Cost"
				sx={{ maxWidth: '6rem', flexGrow: 0 }}
				inputProps={{
					sx: {
						textAlign: 'right',
					},
				}}
			/>
			<AttributeField
				type="number"
				size="small"
				value={weapon.load}
				onChange={(event) => onLoadChange(Number(event.target.value))}
				label="Load"
				sx={{ maxWidth: '4rem', flexGrow: 0 }}
			/>
			<AttributeField
				type="number"
				size="small"
				value={weapon.amount || 1}
				onChange={(event) => onAmountChange(Number(event.target.value))}
				label="Amount"
				sx={{ maxWidth: '4rem', flexGrow: 0 }}
			/>
			{/* Quality field for all weapons */}
			<AttributeField
				select
				size="small"
				variant="standard"
				value={weapon.quality || ''}
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
				value={weapon.location || 'worn'}
				onChange={(event) => onLocationChange(event.target.value as ItemLocation)}
				label="Location"
				sx={{ maxWidth: '4.25rem' }}
			>
				{ITEM_LOCATIONS.map((location) => (
					<MenuItem key={location} value={location}>
						{location}
					</MenuItem>
				))}
			</AttributeField>
			{(weapon.location === 'mount' || weapon.location === 'storage') && (
				<TextField
					size="small"
					variant="standard"
					value={
						weapon.location === 'mount'
							? weapon.mountInfo || ''
							: weapon.storageInfo || ''
					}
					onChange={(event) => {
						if (weapon.location === 'mount') {
							onMountInfoChange(event.target.value)
						} else {
							onStorageInfoChange(event.target.value)
						}
					}}
					label={weapon.location === 'mount' ? 'Mount' : 'Storage Location'}
					sx={{ maxWidth: '8rem' }}
				/>
			)}
			<UsesDisplay
				uses={weapon.uses || 0}
				onUsesChange={onUsesChange}
				showDamageWarning={(weapon.uses || 0) >= 3}
				damageWarningText="Weapon is damaged"
			/>
			<AttributeField
				select
				size="small"
				variant="standard"
				value={weapon.durability || ''}
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
			<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', my: 'auto' }}>
				{onToggleQuickRef && (
					<QuickRefButton
						itemId={weapon.id}
						isInQuickRef={isInQuickRef}
						onToggle={onToggleQuickRef}
					/>
				)}
				<DeleteButton onDelete={onDelete} />
			</Box>
		</>
	)
}

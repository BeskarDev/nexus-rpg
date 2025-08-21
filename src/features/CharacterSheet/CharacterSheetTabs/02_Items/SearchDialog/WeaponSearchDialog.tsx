import React, { useState } from 'react'
import { Typography, Chip } from '@mui/material'
import { SearchDialog, SearchDialogColumn } from './GenericSearchDialog'
import weaponsData from '../../../../../utils/json/weapons.json'
import {
	Weapon,
	CharacterDocument,
	BaseDamageType,
	DamageType,
} from '../../../../../types/Character'

// Function to get color for weapon types
const getWeaponTypeColor = (
	type: string,
): 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
	switch (type) {
		case 'Axe':
			return 'error'
		case 'Blade':
			return 'primary'
		case 'Bow':
			return 'success'
		case 'Brawling':
			return 'warning'
		case 'Crossbow':
			return 'info'
		case 'Mace':
			return 'secondary'
		case 'Polearm':
			return 'error'
		case 'Shield':
			return 'info'
		case 'Thrown':
			return 'warning'
		default:
			return 'secondary'
	}
}

export type WeaponSearchDialogProps = {
	open: boolean
	onClose: () => void
	onImportWeapons: (weapons: Partial<Weapon>[]) => void
	character: CharacterDocument
}

type WeaponData = {
	name: string
	quality: string
	type: string
	damage: string
	properties: string
	load: string
	cost: string
}

export const WeaponSearchDialog: React.FC<WeaponSearchDialogProps> = ({
	open,
	onClose,
	onImportWeapons,
	character,
}) => {
	const [selectedWeapons, setSelectedWeapons] = useState<Set<string>>(new Set())

	// Helper function to determine the base damage type for a weapon
	const getBaseDamageType = (weapon: WeaponData): BaseDamageType => {
		const weaponType = weapon.type.toLowerCase()
		const properties = weapon.properties.toLowerCase()

		// Check if it's a ranged weapon type
		const isRanged =
			weaponType === 'bow' ||
			weaponType === 'crossbow' ||
			weaponType === 'thrown' ||
			properties.includes('thrown') ||
			properties.includes('range')

		const isThrown = weaponType === 'thrown' || properties.includes('thrown')
		const isAgile = properties.includes('agile')

		const strValue = character.statistics.strength.value
		const agiValue = character.statistics.agility.value

		// Special case: thrown ranged weapons use STR if it's higher than AGI
		if (isRanged && isThrown) {
			return strValue > agiValue ? 'STR' : 'AGI'
		}

		// Other ranged weapons always use AGI
		if (isRanged) {
			return 'AGI'
		}

		// Agile weapons use AGI if character has higher AGI than STR
		if (isAgile) {
			return agiValue > strValue ? 'AGI' : 'STR'
		}

		// Default to STR for melee weapons
		return 'STR'
	}

	const columns: SearchDialogColumn<WeaponData>[] = [
		{
			key: 'name',
			label: 'Name',
			render: (value, weapon) => (
				<>
					<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
						{weapon.name}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						Quality {weapon.quality}
					</Typography>
				</>
			),
		},
		{
			key: 'type',
			label: 'Type',
			render: (value) => (
				<Chip
					label={value}
					size="small"
					variant="outlined"
					color={getWeaponTypeColor(value)}
					sx={{ fontSize: '0.75rem' }}
				/>
			),
		},
		{
			key: 'damage',
			label: 'Dmg',
			align: 'center',
			render: (value, weapon) => {
				const baseDamage = getBaseDamageType(weapon)
				return (
					<>
						<Typography variant="body2">{value}</Typography>
						<Typography
							variant="caption"
							color="text.secondary"
							display="block"
						>
							({baseDamage})
						</Typography>
					</>
				)
			},
		},
		{
			key: 'load',
			label: 'Load',
			align: 'center',
			render: (value) => <Typography variant="body2">{value}</Typography>,
		},
		{
			key: 'cost',
			label: 'Cost',
			align: 'center',
			render: (value) => <Typography variant="body2">{value}</Typography>,
		},
		{
			key: 'properties',
			label: 'Properties',
			sortable: false,
			render: (value) => (
				<Typography
					variant="caption"
					sx={{
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						lineHeight: 1.2,
					}}
				>
					{value}
				</Typography>
			),
		},
	]

	const handleImport = () => {
		const weaponsToImport = (weaponsData as WeaponData[])
			.filter((weapon) => selectedWeapons.has(weapon.name))
			.map((weapon) => ({
				id: crypto.randomUUID(),
				name: weapon.name,
				damage: {
					base: getBaseDamageType(weapon),
					weapon: parseInt(weapon.damage) || 0,
					other: 0,
					otherWeak: 0,
					otherStrong: 0,
					otherCritical: 0,
					type: 'physical' as DamageType,
				},
				properties: weapon.properties,
				description: `${weapon.type} weapon (Quality ${weapon.quality})`,
				cost: parseInt(weapon.cost) || 0,
				load: parseInt(weapon.load) || 0,
			}))

		onImportWeapons(weaponsToImport)
	}

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title="Search Weapons"
			data={weaponsData as WeaponData[]}
			columns={columns}
			searchFields={['name', 'type', 'properties']}
			selectedItems={selectedWeapons}
			onSelectionChange={setSelectedWeapons}
			onImport={handleImport}
			getItemKey={(weapon) => weapon.name}
			importButtonText="Import"
			searchPlaceholder="Search by name, type, or properties..."
		/>
	)
}

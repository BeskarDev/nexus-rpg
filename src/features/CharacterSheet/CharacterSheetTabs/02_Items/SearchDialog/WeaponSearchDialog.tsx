import React, { useMemo, useState } from 'react'
import {
	Typography,
	Chip,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Button,
	Checkbox,
	ListItemText,
	InputAdornment,
} from '@mui/material'
import { AttachMoney, ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { SearchDialog, SearchDialogColumn } from './GenericSearchDialog'
import weaponsData from '../../../../../utils/data/json/weapons.json'
import {
	Weapon,
	CharacterDocument,
	BaseDamageType,
	DamageType,
} from '../../../../../types/Character'
import { QualityTier } from '../utils/magicItemsConfig'

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
	const [qualityFilter, setQualityFilter] = useState<string[]>([])
	const [typeFilter, setTypeFilter] = useState<string[]>([])
	const [costMin, setCostMin] = useState('')
	const [costMax, setCostMax] = useState('')

	const qualityOptions = useMemo(
		() =>
			Array.from(
				new Set((weaponsData as WeaponData[]).map((weapon) => weapon.quality)),
			),
		[],
	)

	const typeOptions = useMemo(
		() =>
			Array.from(
				new Set((weaponsData as WeaponData[]).map((weapon) => weapon.type)),
			),
		[],
	)

	const filteredWeapons = useMemo(
		() =>
			(weaponsData as WeaponData[]).filter((weapon) => {
				const matchesQuality =
					!qualityFilter.length || qualityFilter.includes(weapon.quality)

				const matchesType =
					!typeFilter.length || typeFilter.includes(weapon.type)

				const parsedCost = Number.parseInt(weapon.cost, 10)
				const cost = Number.isNaN(parsedCost) ? null : parsedCost
				const min = costMin === '' ? Number.NEGATIVE_INFINITY : Number(costMin)
				const max = costMax === '' ? Number.POSITIVE_INFINITY : Number(costMax)
				const matchesCost =
					cost === null
						? costMin === '' && costMax === ''
						: cost >= min && cost <= max

				return matchesQuality && matchesType && matchesCost
			}),
		[weaponsData, qualityFilter, typeFilter, costMin, costMax],
	)

	const resetFilters = () => {
		setQualityFilter([])
		setTypeFilter([])
		setCostMin('')
		setCostMax('')
	}

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
				quality: parseInt(weapon.quality) as QualityTier,
			}))

		onImportWeapons(weaponsToImport)
	}

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title="Search Weapons"
			data={filteredWeapons as WeaponData[]}
			columns={columns}
			searchFields={['name', 'type', 'properties']}
			selectedItems={selectedWeapons}
			onSelectionChange={setSelectedWeapons}
			onImport={handleImport}
			getItemKey={(weapon) => weapon.name}
			importButtonText="Import"
			searchPlaceholder="Search by name, type, or properties..."
			filters={
				<>
					<FormControl size="small" sx={{ minWidth: '10rem' }}>
						<InputLabel id="weapon-quality-filter-label">Quality</InputLabel>
						<Select
							multiple
							labelId="weapon-quality-filter-label"
							value={qualityFilter}
							label="Quality"
							onChange={(event) =>
								setQualityFilter(event.target.value as string[])
							}
							renderValue={(selected) =>
								selected.length ? selected.join(', ') : 'All qualities'
							}
						>
							{qualityOptions.map((quality) => (
								<MenuItem key={quality} value={quality}>
									<Checkbox checked={qualityFilter.indexOf(quality) > -1} />
									<ListItemText primary={quality} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl size="small" sx={{ minWidth: '10rem' }}>
						<InputLabel id="weapon-type-filter-label">Weapon Type</InputLabel>
						<Select
							multiple
							labelId="weapon-type-filter-label"
							value={typeFilter}
							label="Weapon Type"
							onChange={(event) => setTypeFilter(event.target.value as string[])}
							renderValue={(selected) =>
								selected.length ? selected.join(', ') : 'All types'
							}
						>
							{typeOptions.map((type) => (
								<MenuItem key={type} value={type}>
									<Checkbox checked={typeFilter.indexOf(type) > -1} />
									<ListItemText primary={type} />
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<TextField
						label="Min"
						size="small"
						type="number"
						value={costMin}
						onChange={(event) => setCostMin(event.target.value)}
						sx={{ width: '7rem' }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AttachMoney fontSize="small" />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<ArrowDownward fontSize="small" />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						label="Max"
						size="small"
						type="number"
						value={costMax}
						onChange={(event) => setCostMax(event.target.value)}
						sx={{ width: '7rem' }}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AttachMoney fontSize="small" />
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<ArrowUpward fontSize="small" />
								</InputAdornment>
							),
						}}
					/>

					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
						<Button
							variant="text"
							size="small"
							onClick={resetFilters}
							disabled={
								!qualityFilter.length &&
								!typeFilter.length &&
								!costMin &&
								!costMax
							}
						>
							Clear filters
						</Button>
					</Box>
				</>
			}
		/>
	)
}

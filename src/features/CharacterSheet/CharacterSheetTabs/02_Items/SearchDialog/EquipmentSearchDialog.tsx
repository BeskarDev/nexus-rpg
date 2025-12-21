import React, { useState, useMemo } from 'react'
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
import equipmentData from '../../../../../utils/data/json/equipment.json'
import armorData from '../../../../../utils/data/json/armor.json'
import {
	Item,
	CharacterDocument,
	ContainerType,
	EquipmentSlotType,
} from '../../../../../types/Character'
import { QualityTier } from '../utils/magicItemsConfig'

// Function to get color for equipment categories
const getCategoryColor = (
	category: string,
): 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
	switch (category) {
		case 'Alchemy':
			return 'primary'
		case 'Animals':
			return 'success'
		case 'Clothes':
			return 'secondary'
		case 'Container':
			return 'info'
		case 'Gear':
			return 'warning'
		case 'Supply':
			return 'secondary'
		case 'Toolkit':
			return 'info'
		case 'Trade Good':
			return 'warning'
		case 'Transportation':
			return 'success'
		case 'Armor':
			return 'error' // For armor items
		default:
			return 'secondary'
	}
}

export type EquipmentSearchDialogProps = {
	open: boolean
	onClose: () => void
	onImportEquipment: (equipment: Partial<Item>[]) => void
	character: CharacterDocument
	targetLocation?: 'worn' | 'carried' | 'mount' | 'storage'
}

type EquipmentData = {
	name: string
	quality: string
	category: string
	load: string
	cost: string
	description: string
}

type ArmorData = {
	name: string
	quality: string
	type: string
	av: string
	properties: string
	load: string
	cost: string
}

type CombinedItemData = {
	name: string
	quality: string
	category: string
	load: string
	cost: string
	description: string
	av?: string
	properties?: string
	type: 'equipment' | 'armor'
}

export const EquipmentSearchDialog: React.FC<EquipmentSearchDialogProps> = ({
	open,
	onClose,
	onImportEquipment,
	character,
	targetLocation = 'carried',
}) => {
	const [selectedEquipment, setSelectedEquipment] = useState<Set<string>>(
		new Set(),
	)
	const [qualityFilter, setQualityFilter] = useState<string[]>([])
	const [categoryFilter, setCategoryFilter] = useState<string[]>([])
	const [costMin, setCostMin] = useState('')
	const [costMax, setCostMax] = useState('')

	// Combine equipment and armor data into unified structure
	const combinedData = useMemo(() => {
		const equipment: CombinedItemData[] = (
			equipmentData as EquipmentData[]
		).map((item) => ({
			...item,
			type: 'equipment' as const,
		}))

		const armor: CombinedItemData[] = (armorData as ArmorData[]).map((item) => {
			// Build properties string with AV and other properties in consistent format
			let properties = `AV +${item.av}`
			if (item.properties !== '-') {
				properties += `, ${item.properties}`
			}

			return {
				name: item.name,
				quality: item.quality,
				category: item.type,
				load: item.load,
				cost: item.cost,
				description: '', // Leave description empty for armor
				av: item.av,
				properties,
				type: 'armor' as const,
			}
		})

		const allItems = [...equipment, ...armor]

		// Filter based on target location
		if (targetLocation === 'worn') {
			// For Equipment section, only show equippable items (armor and certain equipment categories)
			const equippableCategories = ['Clothes', 'Container', 'Toolkit', 'Gear']
			return allItems.filter(
				(item) =>
					item.type === 'armor' ||
					(item.type === 'equipment' &&
						equippableCategories.includes(item.category)),
			)
		}

		// For other locations, show all items
		return allItems
	}, [targetLocation])

	const qualityOptions = useMemo(
		() =>
			Array.from(new Set(combinedData.map((item) => item.quality))).filter(
				Boolean,
			),
		[combinedData],
	)

	const categoryOptions = useMemo(
		() => Array.from(new Set(combinedData.map((item) => item.category))),
		[combinedData],
	)

	const filteredData = useMemo(
		() =>
			combinedData.filter((item) => {
				const matchesQuality =
					!qualityFilter.length || qualityFilter.includes(item.quality)
				const matchesCategory =
					!categoryFilter.length || categoryFilter.includes(item.category)

				const parsedCost = Number.parseInt(item.cost, 10)
				const cost = Number.isNaN(parsedCost) ? null : parsedCost
				const min = costMin === '' ? Number.NEGATIVE_INFINITY : Number(costMin)
				const max = costMax === '' ? Number.POSITIVE_INFINITY : Number(costMax)
				const matchesCost =
					cost === null
						? costMin === '' && costMax === ''
						: cost >= min && cost <= max

				return matchesQuality && matchesCategory && matchesCost
			}),
		[combinedData, qualityFilter, categoryFilter, costMin, costMax],
	)

	const resetFilters = () => {
		setQualityFilter([])
		setCategoryFilter([])
		setCostMin('')
		setCostMax('')
	}

	const columns: SearchDialogColumn<CombinedItemData>[] = [
		{
			key: 'name',
			label: 'Name',
			render: (value, item) => (
				<>
					<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
						{item.name}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						Quality {item.quality}
					</Typography>
				</>
			),
		},
		{
			key: 'category',
			label: 'Category',
			render: (value, item) => (
				<Chip
					label={value}
					size="small"
					variant="outlined"
					color={getCategoryColor(value)}
					sx={{ fontSize: '0.75rem' }}
				/>
			),
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
			key: 'description',
			label: 'Properties',
			sortable: false,
			render: (value, item) => (
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
					{item.properties || value}
				</Typography>
			),
		},
	]

	const getEquipmentSlot = (item: CombinedItemData): EquipmentSlotType | '' => {
		if (item.type !== 'armor') return ''

		const category = item.category.toLowerCase()

		// Map armor types to equipment slots
		if (category.includes('helmet')) return 'head'
		if (category.includes('light armor') || category.includes('heavy armor'))
			return 'body'

		return ''
	}

	const getEquipmentContainer = (item: CombinedItemData): string => {
		if (item.type === 'armor') {
			const suggestedSlot = getEquipmentSlot(item)
			if (!suggestedSlot) return 'backpack'

			// For armor items, default to worn unless specifically needed elsewhere
			return 'worn'
		}

		// For regular equipment items, default to backpack
		return 'backpack'
	}

	const handleImport = () => {
		const equipmentToImport = combinedData
			.filter((item) => selectedEquipment.has(item.name))
			.map((item) => ({
				id: crypto.randomUUID(),
				name: item.name,
				description: item.description,
				properties: item.properties
					? item.properties.split(',').map((p) => p.trim())
					: [],
				cost: parseInt(item.cost) || 0,
				weight: item.load === '-' ? 0 : parseInt(item.load) || 0,
				container: (targetLocation === 'worn'
					? 'worn'
					: 'backpack') as ContainerType,
				amount: 1,
				quality: parseInt(item.quality) as QualityTier,
				// Add slot assignment for armor pieces when worn
				...(targetLocation === 'worn' && item.type === 'armor'
					? {
							slot: getEquipmentSlot(item),
						}
					: {}),
			}))

		onImportEquipment(equipmentToImport)
	}

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title="Search Equipment & Items"
			data={filteredData}
			columns={columns}
			searchFields={['name', 'category', 'description', 'properties']}
			selectedItems={selectedEquipment}
			onSelectionChange={setSelectedEquipment}
			onImport={handleImport}
			getItemKey={(item) => item.name}
			importButtonText="Import"
			searchPlaceholder="Search by name, category, description, or properties..."
			filters={
				<>
					<FormControl size="small" sx={{ minWidth: '10rem' }}>
						<InputLabel id="equipment-quality-filter-label">Quality</InputLabel>
						<Select
							multiple
							labelId="equipment-quality-filter-label"
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

					<FormControl size="small" sx={{ minWidth: '12rem' }}>
						<InputLabel id="equipment-category-filter-label">
							Item Type
						</InputLabel>
						<Select
							multiple
							labelId="equipment-category-filter-label"
							value={categoryFilter}
							label="Item Type"
							onChange={(event) =>
								setCategoryFilter(event.target.value as string[])
							}
							renderValue={(selected) =>
								selected.length ? selected.join(', ') : 'All types'
							}
						>
							{categoryOptions.map((category) => (
								<MenuItem key={category} value={category}>
									<Checkbox checked={categoryFilter.indexOf(category) > -1} />
									<ListItemText primary={category} />
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
								!categoryFilter.length &&
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

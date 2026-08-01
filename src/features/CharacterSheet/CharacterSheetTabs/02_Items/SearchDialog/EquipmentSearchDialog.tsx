import React, { useState, useMemo } from 'react'
import { Typography, TextField, Button } from '@mui/material'
import { SheetChip } from '../../../components'
import { parseCostValue } from './costUtils'
import type { SearchDialogColumn } from '../../../components'
import {
	SearchDialog,
	FilterSelect,
	entrySummary,
	EntryProse,
	MetaBand,
	MetaBandField,
	MetaBandLabel,
	MetaBandValue,
} from '../../../components'
import equipmentData from '../../../../../utils/data/json/equipment.json'
import armorData from '../../../../../utils/data/json/armor.json'
import {
	Item,
	CharacterDocument,
	ContainerType,
	EquipmentSlotType,
} from '../../../../../types/Character'
import { QualityTier } from '../utils/magicItemsConfig'

/**
 * `getCategoryColor` is gone (M13 S8).
 *
 * It mapped ten equipment categories onto MUI's SEMANTIC palette — armour was
 * `error`, gear was `warning` — which is a local palette in the exact sense the
 * milestone's chip item names: colours invented in one file, meaning nothing
 * anywhere else, and reading as status when they encode a category.
 *
 * The replacement is no hue at all. The chip system's rule is that a hue is an
 * identity a reader LEARNS (skills, damage types), and an equipment category is a
 * filter facet met once inside a search dialog. So these ink in the structural
 * bronze `SheetChip` defaults to — the same call the Skills tab already made for
 * languages, which have no skill behind them either.
 */

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

				const cost = parseCostValue(item.cost)
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

	/*
		Where each item stands against this character's purse and pack (F11.2).

		`character` was declared and never read here. Two facts the dialog was
		already holding:

		- **owned** — the sheet already carries one by this name. Not a bar: a second
		  torch is a legitimate thing to want, which is why it is `owned` and not
		  `blocked`.
		- **cost** — `items.coins` against the entry's price. `parseCostValue` is the
		  same reader the Min/Max filter uses, so "affordable" here and "under 50"
		  there cannot disagree. An entry with no parseable price (a `-`) is never
		  barred: unknown is not the same as unaffordable.
	*/
	const standingOf = useMemo(() => {
		const coins = character.items?.coins ?? 0
		const owned = new Set(
			(character.items?.items ?? []).map((entry) =>
				entry.name.trim().toLowerCase(),
			),
		)
		return (item: CombinedItemData) => {
			const price = parseCostValue(String(item.cost ?? ''))
			return {
				owned: owned.has(item.name.trim().toLowerCase()),
				blocked:
					price !== null && price > coins ? `costs ${item.cost}` : undefined,
			}
		}
	}, [character.items?.coins, character.items?.items])

	const columns: SearchDialogColumn<CombinedItemData>[] = [
		{
			key: 'name',
			label: 'Name',
			width: 'minmax(0, 1.4fr)',
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
			width: '9rem',
			render: (value) => <SheetChip>{value}</SheetChip>,
		},
		{
			key: 'load',
			label: 'Load',
			align: 'center',
			width: '3rem',
			render: (value) => <Typography variant="body2">{value}</Typography>,
		},
		{
			key: 'cost',
			label: 'Cost',
			align: 'center',
			width: '4rem',
			render: (value) => <Typography variant="body2">{value}</Typography>,
		},
		{
			key: 'description',
			label: 'Properties',
			sortable: false,
			width: 'minmax(0, 1.6fr)',
			render: (value, item) => (
				<Typography component="span" className="cs-entry-summary">
					{entrySummary(String((item.properties || value) ?? ''))}
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
				cost: parseCostValue(item.cost) || 0,
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
			itemNoun="item"
			getStanding={standingOf}
			// A band, not a plate (owner review). `RecordPlate` is the sheet's shape
			// for an entity's facts when there are eight of them and half take a
			// control; here there are five short read-only values, and five ruled
			// courses at a 6.5rem label measure is a tall sparse column for
			// "Load 1, Cost 25". `MetaBand` is the same facts as one bounded line
			// that wraps — the idiom the Items tab's purse strip already uses, one
			// rank down. No separators between fields: a vertical rule there is the
			// bar-as-grouping-device this theme has rejected three times.
			renderDetails={(item: CombinedItemData) => (
				<div className="cs-entry-prose">
					<MetaBand variant="sub">
						<MetaBandField>
							<MetaBandLabel>Category</MetaBandLabel>
							<MetaBandValue>{item.category}</MetaBandValue>
						</MetaBandField>
						<MetaBandField>
							<MetaBandLabel>Quality</MetaBandLabel>
							<MetaBandValue>{item.quality}</MetaBandValue>
						</MetaBandField>
						{item.av && (
							<MetaBandField>
								<MetaBandLabel sigil="av">AV</MetaBandLabel>
								<MetaBandValue>{item.av}</MetaBandValue>
							</MetaBandField>
						)}
						<MetaBandField>
							<MetaBandLabel sigil="load">Load</MetaBandLabel>
							<MetaBandValue>{item.load}</MetaBandValue>
						</MetaBandField>
						<MetaBandField>
							<MetaBandLabel sigil="coins">Cost</MetaBandLabel>
							<MetaBandValue>{item.cost}</MetaBandValue>
						</MetaBandField>
					</MetaBand>
					{item.properties && (
						<p className="cs-entry-prose__para">
							<strong>Properties.</strong>{' '}
							{entrySummary(String(item.properties))}
						</p>
					)}
					{/* Through the parser, not printed raw: 20 equipment descriptions
						carry `<br/>`, and React escapes an unparsed string so the tag
						renders as the literal characters `<br/>` mid-sentence. */}
					{item.description && (
						<EntryProse source={item.description} name={item.name} />
					)}
				</div>
			)}
			// Alphabetical. It opened in JSON authoring order until now (F11.6).
			defaultSort={{ key: 'name' }}
			filters={
				/* No wrapper: the dialog's filter band is the flex row now, so a second
					one inside it was a box in a box. */
				<>
					<FilterSelect
						label="Quality"
						allLabel="All qualities"
						options={qualityOptions}
						value={qualityFilter}
						onChange={setQualityFilter}
						minWidth="10rem"
					/>

					<FilterSelect
						label="Item Type"
						allLabel="All types"
						options={categoryOptions}
						value={categoryFilter}
						onChange={setCategoryFilter}
						minWidth="12rem"
					/>

					{/* Three Material icons retired here (M13 S8): a dollar sign for a
						currency the setting does not have, plus an up and a down arrow
						restating the words "Min" and "Max" beside them. The labels say it,
						and they now say which quantity as well. */}
					<TextField
						label="Min cost"
						size="small"
						type="number"
						value={costMin}
						onChange={(event) => setCostMin(event.target.value)}
						sx={{ width: '7rem' }}
					/>
					<TextField
						label="Max cost"
						size="small"
						type="number"
						value={costMax}
						onChange={(event) => setCostMax(event.target.value)}
						sx={{ width: '7rem' }}
					/>

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
				</>
			}
		/>
	)
}

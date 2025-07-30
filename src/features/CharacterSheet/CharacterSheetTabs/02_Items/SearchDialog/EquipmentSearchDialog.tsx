import React, { useState, useMemo } from 'react'
import { Typography, Chip } from '@mui/material'
import { SearchDialog, SearchDialogColumn } from './GenericSearchDialog'
import equipmentData from '../../../../../utils/json/equipment.json'
import armorData from '../../../../../utils/json/armor.json'
import { Item, CharacterDocument } from '../../../../../types/Character'

export type EquipmentSearchDialogProps = {
	open: boolean
	onClose: () => void
	onImportEquipment: (equipment: Partial<Item>[]) => void
	character: CharacterDocument
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
}) => {
	const [selectedEquipment, setSelectedEquipment] = useState<Set<string>>(new Set())

	// Combine equipment and armor data into unified structure
	const combinedData = useMemo(() => {
		const equipment: CombinedItemData[] = (equipmentData as EquipmentData[]).map(item => ({
			...item,
			type: 'equipment' as const
		}))

		const armor: CombinedItemData[] = (armorData as ArmorData[]).map(item => {
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
				type: 'armor' as const
			}
		})

		return [...equipment, ...armor]
	}, [])

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
			)
		},
		{
			key: 'category',
			label: 'Category',
			render: (value, item) => (
				<Chip 
					label={value} 
					size="small" 
					variant="outlined"
					color={item.type === 'armor' ? 'primary' : 'default'}
					sx={{ fontSize: '0.75rem' }}
				/>
			)
		},
		{
			key: 'load',
			label: 'Load',
			align: 'center',
			render: (value) => (
				<Typography variant="body2">
					{value}
				</Typography>
			)
		},
		{
			key: 'cost',
			label: 'Cost',
			align: 'center',
			render: (value) => (
				<Typography variant="body2">
					{value}
				</Typography>
			)
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
						lineHeight: 1.2
					}}
				>
					{item.properties || value}
				</Typography>
			)
		}
	]

	const getEquipmentSlot = (item: CombinedItemData): string => {
		if (item.type !== 'armor') return ''
		
		const category = item.category.toLowerCase()
		
		// Map armor types to equipment slots
		if (category.includes('helmet')) return 'head'
		if (category.includes('light armor') || category.includes('heavy armor')) return 'body'
		
		return ''
	}

	const getEquipmentContainer = (item: CombinedItemData): string => {
		if (item.type === 'armor') {
			const suggestedSlot = getEquipmentSlot(item)
			if (!suggestedSlot) return 'backpack'
			
			// Check if the suggested slot is already occupied by worn equipment
			const currentItems = character.items?.items || []
			const isSlotOccupied = currentItems.some(eq => eq.slot === suggestedSlot && eq.container === 'worn')
			
			// If slot is free, auto-equip as worn, otherwise put in backpack
			return isSlotOccupied ? 'backpack' : 'worn'
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
				properties: item.properties || '',
				slot: getEquipmentSlot(item) as any,
				cost: parseInt(item.cost) || 0,
				load: item.load === '-' ? 0 : parseInt(item.load) || 0,
				container: getEquipmentContainer(item) as any,
				amount: 1,
			}))

		onImportEquipment(equipmentToImport)
	}

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title="Search Equipment & Items"
			data={combinedData}
			columns={columns}
			searchFields={['name', 'category', 'description', 'properties']}
			selectedItems={selectedEquipment}
			onSelectionChange={setSelectedEquipment}
			onImport={handleImport}
			getItemKey={(item) => item.name}
			importButtonText="Import"
			searchPlaceholder="Search by name, category, description, or properties..."
		/>
	)
}

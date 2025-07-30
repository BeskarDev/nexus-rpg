import React, { useState } from 'react'
import { Typography, Chip } from '@mui/material'
import { SearchDialog, SearchDialogColumn } from './GenericSearchDialog'
import equipmentData from '../../../../../utils/json/equipment.json'
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

export const EquipmentSearchDialog: React.FC<EquipmentSearchDialogProps> = ({
	open,
	onClose,
	onImportEquipment,
	character,
}) => {
	const [selectedEquipment, setSelectedEquipment] = useState<Set<string>>(new Set())

	const columns: SearchDialogColumn<EquipmentData>[] = [
		{
			key: 'name',
			label: 'Name',
			render: (value, equipment) => (
				<>
					<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
						{equipment.name}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						Quality {equipment.quality}
					</Typography>
				</>
			)
		},
		{
			key: 'category',
			label: 'Category',
			render: (value) => (
				<Chip 
					label={value} 
					size="small" 
					variant="outlined"
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
			label: 'Description',
			sortable: false,
			render: (value) => (
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
					{value}
				</Typography>
			)
		}
	]

	const handleImport = () => {
		const equipmentToImport = (equipmentData as EquipmentData[])
			.filter((equipment) => selectedEquipment.has(equipment.name))
			.map((equipment) => ({
				id: crypto.randomUUID(),
				name: equipment.name,
				description: equipment.description,
				cost: parseInt(equipment.cost) || 0,
				load: equipment.load === '-' ? 0 : parseInt(equipment.load) || 0,
			}))

		onImportEquipment(equipmentToImport)
	}

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title="Search Equipment & Items"
			data={equipmentData as EquipmentData[]}
			columns={columns}
			searchFields={['name', 'category', 'description']}
			selectedItems={selectedEquipment}
			onSelectionChange={setSelectedEquipment}
			onImport={handleImport}
			getItemKey={(equipment) => equipment.name}
			importButtonText="Import"
			searchPlaceholder="Search by name, category, or description..."
		/>
	)
}

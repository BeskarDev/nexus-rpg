import React, { useState } from 'react'
import { Typography, Chip, Box } from '@mui/material'
import {
	SingleSelectionDialog,
	SingleSelectionDialogColumn,
} from './SingleSelectionDialog'
import folkData from '../../../utils/data/json/folk.json'

export type FolkSelectionDialogProps = {
	open: boolean
	onClose: () => void
	onSelectFolk: (folk: FolkData) => void
	selectedFolk?: string
}

export type FolkData = {
	name: string
	category: string
	quote: string
	description: string
	known_cultures: Array<{ name: string; description: string }>
	far_away_cultures: Array<{ name: string; description: string }>
	abilities: Array<{ name: string; description: string }>
	languages: string[]
}

export const FolkSelectionDialog: React.FC<FolkSelectionDialogProps> = ({
	open,
	onClose,
	onSelectFolk,
	selectedFolk,
}) => {
	const [selectedFolkKey, setSelectedFolkKey] = useState<string | null>(
		selectedFolk || null,
	)

	const columns: SingleSelectionDialogColumn<FolkData>[] = [
		{
			key: 'name',
			label: 'Folk',
			render: (value, folk) => (
				<Box>
					<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
						{folk.name}
					</Typography>
					<Chip
						label={folk.category}
						size="small"
						variant="outlined"
						color={folk.category === 'Old Folk' ? 'primary' : 'secondary'}
						sx={{ fontSize: '0.75rem', mt: 0.5 }}
					/>
				</Box>
			),
		},
		{
			key: 'quote',
			label: 'Description',
			sortable: false,
			render: (value, folk) => (
				<Box>
					<Typography
						variant="caption"
						sx={{
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							fontStyle: 'italic',
							color: 'text.secondary',
							mb: 0.5,
						}}
					>
						"{folk.quote}"
					</Typography>
					<Typography
						variant="caption"
						sx={{
							display: '-webkit-box',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							lineHeight: 1.2,
						}}
					>
						{folk.description}
					</Typography>
				</Box>
			),
		},
		{
			key: 'abilities',
			label: 'Abilities',
			sortable: false,
			render: (value, folk) => (
				<Box>
					{folk.abilities.slice(0, 2).map((ability, index) => (
						<Typography
							key={index}
							variant="caption"
							sx={{
								display: 'block',
								fontWeight: 'medium',
								mb: 0.25,
							}}
						>
							{ability.name}
						</Typography>
					))}
					{folk.abilities.length > 2 && (
						<Typography variant="caption" color="text.secondary">
							+{folk.abilities.length - 2} more...
						</Typography>
					)}
				</Box>
			),
		},
		{
			key: 'languages',
			label: 'Languages',
			sortable: false,
			render: (value, folk) => (
				<Box>
					{folk.languages.map((language, index) => (
						<Chip
							key={index}
							label={language}
							size="small"
							variant="outlined"
							sx={{
								fontSize: '0.7rem',
								mb: 0.25,
								mr: 0.25,
							}}
						/>
					))}
				</Box>
			),
		},
	]

	const handleConfirm = () => {
		if (selectedFolkKey) {
			const folk = (folkData as FolkData[]).find(
				(f) => f.name === selectedFolkKey,
			)
			if (folk) {
				onSelectFolk(folk)
			}
		}
		onClose()
	}

	return (
		<SingleSelectionDialog
			open={open}
			onClose={onClose}
			title="Select Folk"
			data={folkData as FolkData[]}
			columns={columns}
			searchFields={['name', 'category', 'quote', 'description']}
			selectedItem={selectedFolkKey}
			onSelectionChange={setSelectedFolkKey}
			onConfirm={handleConfirm}
			getItemKey={(folk) => folk.name}
			confirmButtonText="Select Folk"
			searchPlaceholder="Search by name, category, or description..."
		/>
	)
}

import React, { useState } from 'react'
import { Typography, Box } from '@mui/material'
import { SheetChip } from './SheetChip'
import { entrySummary } from './EntryProse'
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
	cultures: Array<{ name: string; region: string; description: string }>
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
			width: 'minmax(0, 1fr)',
			render: (value, folk) => (
				<Box>
					<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
						{folk.name}
					</Typography>
					{/* Old Folk / New Folk was `primary` vs `secondary` — MUI's brand slots
						standing in for a distinction the rules make in words (M13 S8).
						Structural bronze, like every other category chip on the sheet. */}
					<Box sx={{ mt: 0.5 }}>
						<SheetChip variant="plate">{folk.category}</SheetChip>
					</Box>
				</Box>
			),
		},
		{
			key: 'quote',
			label: 'Description',
			sortable: false,
			width: 'minmax(0, 2fr)',
			render: (value, folk) => (
				<Box>
					{/* Only when there is one. Eleven of the twelve folk carry no quote,
						and the quotation marks were rendered unconditionally — so every row
						opened with a bare `""` above its description (M13 S8, found in the
						running app). */}
					{folk.quote?.trim() && (
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
							“{folk.quote}”
						</Typography>
					)}
					<Typography component="span" className="cs-entry-summary">
						{entrySummary(String(folk.description ?? ''))}
					</Typography>
				</Box>
			),
		},
		{
			key: 'abilities',
			label: 'Abilities',
			sortable: false,
			width: 'minmax(0, 1fr)',
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
			width: 'minmax(0, 1fr)',
			render: (value, folk) => (
				// The same banner the Skills tab gives a language, and for the reason it
				// records there: a language has no skill behind it, so it takes the
				// structural ink rather than an identity hue.
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
					{folk.languages.map((language, index) => (
						<SheetChip key={index}>{language}</SheetChip>
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
			// Alphabetical rather than the JSON's authoring order (F11.6).
			defaultSort={{ key: 'name' }}
			itemNoun="folk"
			itemNounPlural="folk"
			searchPlaceholder="Search by name, category, or description..."
		/>
	)
}

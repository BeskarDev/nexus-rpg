import React, { useState } from 'react'
import { Typography, Chip, Box } from '@mui/material'
import { SearchDialog, SearchDialogColumn } from '../CharacterSheetTabs/02_Items/SearchDialog/GenericSearchDialog'
import upbringingsData from '../../../utils/json/upbringings.json'

export type UpbringingSelectionDialogProps = {
	open: boolean
	onClose: () => void
	onSelectUpbringing: (upbringing: UpbringingData) => void
	selectedUpbringing?: string
}

export type UpbringingData = {
	name: string
	description: string
	'suggested skills': string
}

export const UpbringingSelectionDialog: React.FC<UpbringingSelectionDialogProps> = ({
	open,
	onClose,
	onSelectUpbringing,
	selectedUpbringing,
}) => {
	const [selectedUpbringings, setSelectedUpbringings] = useState<Set<string>>(
		new Set(selectedUpbringing ? [selectedUpbringing] : [])
	)

	const columns: SearchDialogColumn<UpbringingData>[] = [
		{
			key: 'name',
			label: 'Upbringing',
			render: (value, upbringing) => (
				<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
					{upbringing.name}
				</Typography>
			),
		},
		{
			key: 'description',
			label: 'Description',
			sortable: false,
			render: (value, upbringing) => (
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
					{upbringing.description}
				</Typography>
			),
		},
		{
			key: 'suggested skills',
			label: 'Suggested Skills',
			sortable: false,
			render: (value, upbringing) => (
				<Box>
					{upbringing['suggested skills'].split(', ').map((skill, index) => (
						<Chip
							key={index}
							label={skill.trim()}
							size="small"
							variant="outlined"
							sx={{ 
								fontSize: '0.7rem', 
								mb: 0.25,
								mr: 0.25
							}}
						/>
					))}
				</Box>
			),
		},
	]

	const handleImport = () => {
		if (selectedUpbringings.size === 1) {
			const selectedUpbringingName = Array.from(selectedUpbringings)[0]
			const upbringing = (upbringingsData as UpbringingData[]).find(u => u.name === selectedUpbringingName)
			if (upbringing) {
				onSelectUpbringing(upbringing)
			}
		}
		onClose()
	}

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title="Select Upbringing"
			data={upbringingsData as UpbringingData[]}
			columns={columns}
			searchFields={['name', 'description', 'suggested skills']}
			selectedItems={selectedUpbringings}
			onSelectionChange={setSelectedUpbringings}
			onImport={handleImport}
			getItemKey={(upbringing) => upbringing.name}
			importButtonText="Select Upbringing"
			searchPlaceholder="Search by name, description, or suggested skills..."
		/>
	)
}
import React, { useState } from 'react'
import { Typography, Box } from '@mui/material'
import { SheetChip } from './SheetChip'
import {
	SingleSelectionDialog,
	SingleSelectionDialogColumn,
} from './SingleSelectionDialog'
import upbringingsData from '../../../utils/data/json/upbringings.json'
import { getSkillChipColor } from '../../../constants/skills'

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

export const UpbringingSelectionDialog: React.FC<
	UpbringingSelectionDialogProps
> = ({ open, onClose, onSelectUpbringing, selectedUpbringing }) => {
	const [selectedUpbringingKey, setSelectedUpbringingKey] = useState<
		string | null
	>(selectedUpbringing || null)

	const columns: SingleSelectionDialogColumn<UpbringingData>[] = [
		{
			key: 'name',
			label: 'Upbringing',
			width: 'minmax(0, 1fr)',
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
			width: 'minmax(0, 2.4fr)',
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
			width: 'minmax(0, 1.2fr)',
			render: (value, upbringing) => (
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
					{upbringing['suggested skills'].split(', ').map((skill, index) => (
						<SheetChip key={index} tone={getSkillChipColor(skill.trim())}>
							{skill.trim()}
						</SheetChip>
					))}
				</Box>
			),
		},
	]

	const handleConfirm = () => {
		if (selectedUpbringingKey) {
			const upbringing = (upbringingsData as UpbringingData[]).find(
				(u) => u.name === selectedUpbringingKey,
			)
			if (upbringing) {
				onSelectUpbringing(upbringing)
			}
		}
		onClose()
	}

	return (
		<SingleSelectionDialog
			open={open}
			onClose={onClose}
			title="Select Upbringing"
			data={upbringingsData as UpbringingData[]}
			columns={columns}
			searchFields={['name', 'description', 'suggested skills']}
			selectedItem={selectedUpbringingKey}
			onSelectionChange={setSelectedUpbringingKey}
			onConfirm={handleConfirm}
			getItemKey={(upbringing) => upbringing.name}
			confirmButtonText="Select Upbringing"
			itemNoun="upbringing"
			searchPlaceholder="Search by name, description, or suggested skills..."
		/>
	)
}

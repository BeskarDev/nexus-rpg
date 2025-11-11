import React, { useState } from 'react'
import { Typography, Chip, Box } from '@mui/material'
import {
	SingleSelectionDialog,
	SingleSelectionDialogColumn,
} from './SingleSelectionDialog'
import upbringingsData from '../../../utils/json/upbringings.json'
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
								mr: 0.25,
								borderColor: getSkillChipColor(skill.trim()),
								color: getSkillChipColor(skill.trim()),
								'&:hover': {
									backgroundColor: getSkillChipColor(skill.trim()) + '20',
								},
							}}
						/>
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
			searchPlaceholder="Search by name, description, or suggested skills..."
		/>
	)
}

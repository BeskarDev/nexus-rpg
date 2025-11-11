import React, { useState } from 'react'
import { Typography, Chip, Box } from '@mui/material'
import {
	SingleSelectionDialog,
	SingleSelectionDialogColumn,
} from './SingleSelectionDialog'
import backgroundsData from '../../../utils/json/backgrounds.json'
import { getSkillChipColor } from '../../../constants/skills'

export type BackgroundSelectionDialogProps = {
	open: boolean
	onClose: () => void
	onSelectBackground: (background: BackgroundData) => void
	selectedBackground?: string
}

export type BackgroundData = {
	name: string
	description: string
	'suggested skills': string
	'starting item': string
}

export const BackgroundSelectionDialog: React.FC<
	BackgroundSelectionDialogProps
> = ({ open, onClose, onSelectBackground, selectedBackground }) => {
	const [selectedBackgroundKey, setSelectedBackgroundKey] = useState<
		string | null
	>(selectedBackground || null)

	const columns: SingleSelectionDialogColumn<BackgroundData>[] = [
		{
			key: 'name',
			label: 'Background',
			render: (value, background) => (
				<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
					{background.name}
				</Typography>
			),
		},
		{
			key: 'description',
			label: 'Description',
			sortable: false,
			render: (value, background) => (
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
					{background.description}
				</Typography>
			),
		},
		{
			key: 'suggested skills',
			label: 'Suggested Skills',
			sortable: false,
			render: (value, background) => (
				<Box>
					{background['suggested skills'].split(', ').map((skill, index) => (
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
		{
			key: 'starting item',
			label: 'Starting Item',
			sortable: false,
			render: (value, background) => (
				<Typography
					variant="caption"
					sx={{
						fontWeight: 'medium',
						color: 'primary.main',
					}}
				>
					{background['starting item']}
				</Typography>
			),
		},
	]

	const handleConfirm = () => {
		if (selectedBackgroundKey) {
			const background = (backgroundsData as BackgroundData[]).find(
				(b) => b.name === selectedBackgroundKey,
			)
			if (background) {
				onSelectBackground(background)
			}
		}
		onClose()
	}

	return (
		<SingleSelectionDialog
			open={open}
			onClose={onClose}
			title="Select Background"
			data={backgroundsData as BackgroundData[]}
			columns={columns}
			searchFields={[
				'name',
				'description',
				'suggested skills',
				'starting item',
			]}
			selectedItem={selectedBackgroundKey}
			onSelectionChange={setSelectedBackgroundKey}
			onConfirm={handleConfirm}
			getItemKey={(background) => background.name}
			confirmButtonText="Select Background"
			searchPlaceholder="Search by name, description, skills, or starting item..."
		/>
	)
}

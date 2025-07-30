import React, { useState } from 'react'
import { Typography, Chip } from '@mui/material'
import { SearchDialog, SearchDialogColumn } from './GenericSearchDialog'
import talentsData from '../../../../../utils/json/talents.json'
import { CharacterDocument } from '../../../../../types/Character'

export type TalentsSearchDialogProps = {
	open: boolean
	onClose: () => void
	onImportTalents: (talents: any[]) => void
	character: CharacterDocument
}

type TalentData = {
	name: string
	'skill requirement': string
	description: string
}

export const TalentsSearchDialog: React.FC<TalentsSearchDialogProps> = ({
	open,
	onClose,
	onImportTalents,
	character,
}) => {
	const [selectedTalents, setSelectedTalents] = useState<Set<string>>(new Set())

	const columns: SearchDialogColumn<TalentData>[] = [
		{
			key: 'name',
			label: 'Talent',
			render: (value, talent) => (
				<>
					<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
						{talent.name}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						Requires: {talent['skill requirement']}
					</Typography>
				</>
			)
		},
		{
			key: 'skill requirement',
			label: 'Skill',
			render: (value) => (
				<Chip 
					label={value} 
					size="small" 
					variant="outlined"
					color="secondary"
					sx={{ fontSize: '0.75rem' }}
				/>
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
						WebkitLineClamp: 3,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						lineHeight: 1.2
					}}
					dangerouslySetInnerHTML={{
						__html: value.replace(/<br\/>/g, ' ').replace(/<[^>]*>/g, '')
					}}
				/>
			)
		}
	]

	const handleImport = () => {
		const talentsToImport = (talentsData as TalentData[])
			.filter((talent) => selectedTalents.has(talent.name))
			.map((talent) => ({
				id: crypto.randomUUID(),
				name: talent.name,
				description: talent.description,
				skillRequirement: talent['skill requirement'],
				rank: 1,
			}))

		onImportTalents(talentsToImport)
	}

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title="Search Talents"
			data={talentsData as TalentData[]}
			columns={columns}
			searchFields={['name', 'skill requirement', 'description']}
			selectedItems={selectedTalents}
			onSelectionChange={setSelectedTalents}
			onImport={handleImport}
			getItemKey={(talent) => talent.name}
			importButtonText="Import"
			searchPlaceholder="Search by name, skill requirement, or description..."
		/>
	)
}

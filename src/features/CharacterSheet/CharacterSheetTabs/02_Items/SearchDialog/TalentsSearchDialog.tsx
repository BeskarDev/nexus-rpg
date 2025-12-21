import React, { useState } from 'react'
import { Typography, Chip } from '@mui/material'
import { SearchDialog, SearchDialogColumn } from './GenericSearchDialog'
import talentsData from '../../../../../utils/data/json/talents.json'
import { CharacterDocument } from '../../../../../types/Character'
import { sanitizeHtml } from '../../../../../utils/typescript/htmlSanitizer'
import {
	getSkillChipColor,
	normalizeSkillName,
} from '../../../../../constants/skills'

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
				<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
					{talent.name}
				</Typography>
			),
		},
		{
			key: 'skill requirement',
			label: 'Skill',
			render: (value) => {
				const normalized = normalizeSkillName(value) || value
				return (
					<Chip
						label={normalized}
						size="small"
						variant="outlined"
						sx={{
							fontSize: '0.75rem',
							borderColor: getSkillChipColor(normalized),
							color: getSkillChipColor(normalized),
							fontWeight: 600,
						}}
					/>
				)
			},
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
						lineHeight: 1.2,
						whiteSpace: 'pre-line', // Preserve newlines from sanitized HTML
					}}
				>
					{sanitizeHtml(value)}
				</Typography>
			),
		},
	]

	const handleImport = () => {
		const talentsToImport = (talentsData as TalentData[])
			.filter((talent) => selectedTalents.has(talent.name))
			.map((talent) => ({
				id: crypto.randomUUID(),
				title: talent.name,
				description: sanitizeHtml(talent.description),
				tag: 'Talent' as const,
				rank: 1, // Default to rank 1
				skill:
					normalizeSkillName(talent['skill requirement']) ||
					talent['skill requirement'],
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

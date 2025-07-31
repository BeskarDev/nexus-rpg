import React, { useState } from 'react'
import { Typography, Chip } from '@mui/material'
import { SearchDialog, SearchDialogColumn } from './GenericSearchDialog'
import talentsData from '../../../../../utils/json/talents.json'
import { CharacterDocument } from '../../../../../types/Character'
import { sanitizeHtml } from '../../../../../utils/htmlSanitizer'

// 16 Skills, 6 MUI colors: primary, secondary, error, warning, info, success
// Ziel: Keine Farbe direkt nacheinander im Alphabet wiederholen
const skillColorMap: Record<string, 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'> = {
  'Athletics':   'primary',
  'Fortitude':   'secondary',
  'Influence':   'error',
  'Insight':     'warning',
  'Perception':  'info',
  'Stealth':     'success',
  'Arcana':      'secondary',
  'Archery':     'error',
  'Crafting':    'warning',
  'Education':   'info',
  'Fighting':    'success',
  'Lore':        'primary',
  'Mysticism':   'error',
  'Nature':      'warning',
  'Streetwise':  'info',
  'Survival':    'success',
}

const getSkillColor = (skill: string): 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' => {
  return skillColorMap[skill] || 'secondary';
}

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
					color={getSkillColor(value)}
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
						lineHeight: 1.2,
						whiteSpace: 'pre-line' // Preserve newlines from sanitized HTML
					}}
				>
					{sanitizeHtml(value)}
				</Typography>
			)
		}
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

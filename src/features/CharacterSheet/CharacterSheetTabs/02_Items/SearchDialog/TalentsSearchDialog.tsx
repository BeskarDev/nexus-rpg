import React, { useMemo, useState } from 'react'
import {
	Typography,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Checkbox,
	ListItemText,
} from '@mui/material'
import { SheetChip } from '../../../components'
import type { SearchDialogColumn } from '../../../components'
import { SearchDialog } from '../../../components'
import talentsData from '../../../../../utils/data/json/talents.json'
import { CharacterDocument } from '../../../../../types/Character'
import { sanitizeHtml } from '../../../../../utils/typescript/htmlSanitizer'
import {
	getSkillChipColor,
	normalizeSkillName,
} from '../../../../../constants/skills'
import { buildTalentFields } from '../../../utils/talentFactory'

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
	const [skillFilter, setSkillFilter] = useState<string[]>([])

	const skillOptions = useMemo(
		() =>
			Array.from(
				new Set(
					(talentsData as TalentData[]).map(
						(talent) =>
							normalizeSkillName(talent['skill requirement']) ||
							talent['skill requirement'],
					),
				),
			).sort(),
		[],
	)

	const filteredTalents = useMemo(
		() =>
			(talentsData as TalentData[]).filter((talent) => {
				const normalized =
					normalizeSkillName(talent['skill requirement']) ||
					talent['skill requirement']
				return (
					!skillFilter.length ||
					skillFilter.some((skill) => skill === normalized)
				)
			}),
		[skillFilter],
	)

	const columns: SearchDialogColumn<TalentData>[] = [
		{
			key: 'name',
			label: 'Talent',
			width: 'minmax(0, 1.2fr)',
			render: (value, talent) => (
				<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
					{talent.name}
				</Typography>
			),
		},
		{
			key: 'skill requirement',
			label: 'Skill',
			width: '9rem',
			render: (value) => {
				const normalized = normalizeSkillName(value) || value
				// The same stamp the Skills tab shows for the same skill (M13 S8) —
				// identity in the ink, not in an outlined Material pill.
				return (
					<SheetChip tone={getSkillChipColor(normalized)}>
						{normalized}
					</SheetChip>
				)
			},
		},
		{
			key: 'description',
			label: 'Description',
			sortable: false,
			width: 'minmax(0, 2fr)',
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
				...buildTalentFields(talent),
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
			data={filteredTalents}
			columns={columns}
			searchFields={['name', 'skill requirement', 'description']}
			selectedItems={selectedTalents}
			onSelectionChange={setSelectedTalents}
			onImport={handleImport}
			getItemKey={(talent) => talent.name}
			importButtonText="Import"
			itemNoun="talent"
			searchPlaceholder="Search by name, skill requirement, or description..."
			filters={
				/* No wrapper: the dialog's filter band is the flex row now. */
				<FormControl size="small" sx={{ minWidth: '12rem' }}>
					<InputLabel id="talent-skill-filter-label">Skill</InputLabel>
					<Select
						multiple
						// `renderValue` is not called for an empty selection unless the
						// control is told to render one, so every filter sat as a blank
						// box under a static label instead of saying "All …" (M13 S8).
						displayEmpty
						labelId="talent-skill-filter-label"
						value={skillFilter}
						label="Skill"
						onChange={(event) => setSkillFilter(event.target.value as string[])}
						renderValue={(selected) =>
							selected.length ? selected.join(', ') : 'All skills'
						}
					>
						{skillOptions.map((skill) => (
							<MenuItem key={skill} value={skill}>
								<Checkbox checked={skillFilter.indexOf(skill) > -1} />
								<ListItemText primary={skill} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
			}
		/>
	)
}

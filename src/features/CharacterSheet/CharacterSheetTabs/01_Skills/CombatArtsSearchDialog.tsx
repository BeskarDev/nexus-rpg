import React, { useState } from 'react'
import { Typography, Chip } from '@mui/material'
import { SearchDialog, SearchDialogColumn } from '../02_Items/SearchDialog/GenericSearchDialog'
import combatArtsData from '../../../../utils/json/combat-arts.json'
import { CharacterDocument, Ability } from '../../../../types/Character'

// Helper function to sanitize HTML tags from text
const sanitizeHtml = (html: string): string => {
	return html
		.replace(/<br\s*\/?>/gi, '\n') // Replace <br> and <br/> with newlines
		.replace(/<\/?strong>/gi, '') // Remove <strong> tags
		.replace(/<\/?em>/gi, '') // Remove <em> tags
		.replace(/<\/?b>/gi, '') // Remove <b> tags
		.replace(/<\/?i>/gi, '') // Remove <i> tags
		.replace(/<\/?u>/gi, '') // Remove <u> tags
		.replace(/<[^>]*>/g, '') // Remove any remaining HTML tags
		.trim()
}

export type CombatArtsSearchDialogProps = {
	open: boolean
	onClose: () => void
	onImportCombatArts: (combatArts: Partial<Ability>[]) => void
	character: CharacterDocument
}

type CombatArtData = {
	name: string
	category: string
	weapons: string
	effect: string
}

export const CombatArtsSearchDialog: React.FC<CombatArtsSearchDialogProps> = ({
	open,
	onClose,
	onImportCombatArts,
	character,
}) => {
	const [selectedCombatArts, setSelectedCombatArts] = useState<Set<string>>(new Set())

	const columns: SearchDialogColumn<CombatArtData>[] = [
		{
			key: 'name',
			label: 'Combat Art',
			render: (value, combatArt) => (
				<>
					<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
						{combatArt.name}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						{combatArt.category}
					</Typography>
				</>
			)
		},
		{
			key: 'weapons',
			label: 'Weapons',
			render: (value) => (
				<Typography 
					variant="caption" 
					sx={{ 
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						lineHeight: 1.2
					}}
				>
					{value}
				</Typography>
			)
		},
		{
			key: 'category',
			label: 'Type',
			render: (value) => (
				<Chip 
					label={value} 
					size="small" 
					variant="outlined"
					color={value === 'Supreme' ? 'primary' : 'default'}
					sx={{ fontSize: '0.75rem' }}
				/>
			)
		},
		{
			key: 'effect',
			label: 'Effect',
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
		const combatArtsToImport = (combatArtsData as CombatArtData[])
			.filter((combatArt) => selectedCombatArts.has(combatArt.name))
			.map((combatArt) => ({
				id: crypto.randomUUID(),
				title: combatArt.name,
				description: sanitizeHtml(combatArt.effect),
				tag: 'Combat Art' as const,
				actionType: 'Action' as const,
			}))

		onImportCombatArts(combatArtsToImport)
	}

	return (
		<SearchDialog
			open={open}
			onClose={onClose}
			title="Search Combat Arts"
			data={combatArtsData as CombatArtData[]}
			columns={columns}
			searchFields={['name', 'category', 'weapons', 'effect']}
			selectedItems={selectedCombatArts}
			onSelectionChange={setSelectedCombatArts}
			onImport={handleImport}
			getItemKey={(combatArt) => combatArt.name}
			importButtonText="Import"
			searchPlaceholder="Search by name, category, weapons, or effect..."
		/>
	)
}

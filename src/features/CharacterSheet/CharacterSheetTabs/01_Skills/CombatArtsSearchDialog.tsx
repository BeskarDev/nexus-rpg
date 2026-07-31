import React, { useState } from 'react'
import { Typography } from '@mui/material'
import { SheetChip } from '../../components'
import { SearchDialog } from '../../components'
import type { SearchDialogColumn } from '../../components'
import combatArtsData from '../../../../utils/data/json/combat-arts.json'
import { CharacterDocument, Ability } from '../../../../types/Character'
import { sanitizeHtml } from '../../../../utils/typescript/htmlSanitizer'

/**
 * `getCategoryColor` is gone (M13 S8) — see `EquipmentSearchDialog` for the general
 * reason. Basic was `info` and Supreme was `error`, so the rarer and better combat
 * art was the one painted in the colour the rest of the app uses for a failure.
 */

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
	const [selectedCombatArts, setSelectedCombatArts] = useState<Set<string>>(
		new Set(),
	)

	const columns: SearchDialogColumn<CombatArtData>[] = [
		{
			key: 'name',
			label: 'Combat Art',
			width: 'minmax(0, 1.2fr)',
			render: (value, combatArt) => (
				<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
					{combatArt.name}
				</Typography>
			),
		},
		{
			key: 'weapons',
			label: 'Weapons',
			width: 'minmax(0, 1fr)',
			render: (value) => (
				<Typography
					variant="caption"
					sx={{
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						lineHeight: 1.2,
					}}
				>
					{value}
				</Typography>
			),
		},
		{
			key: 'category',
			label: 'Type',
			width: '7rem',
			render: (value) => <SheetChip>{value}</SheetChip>,
		},
		{
			key: 'effect',
			label: 'Effect',
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
			itemNoun="combat art"
			searchPlaceholder="Search by name, category, weapons, or effect..."
		/>
	)
}

import React, { useState } from 'react'
import { Typography, Box } from '@mui/material'
import { SheetChip } from './SheetChip'
import { entrySummary } from './EntryProse'
import {
	SingleSelectionDialog,
	SingleSelectionDialogColumn,
} from './SingleSelectionDialog'
import archetypeData from '../../../utils/data/json/archetypes.json'

export type ArchetypeSelectionDialogProps = {
	open: boolean
	onClose: () => void
	onSelectArchetype: (archetype: ArchetypeData) => void
	selectedArchetype?: string
}

export type ArchetypeData = {
	name: string
	role: string
	description: string
	bestFor: string
	primarySkills: string[]
	attributes: {
		STR: number
		AGI: number
		SPI: number
		MND: number
	}
	suggestedSkills: string
	/** Name plus the one-line gloss the docs page prints beside it (M22 D2). */
	recommendedTalents: Array<{ name: string; gloss: string }>
	recommendedCombatArts?: Array<{ name: string; gloss: string }>
	recommendedCompanions?: string[]
	recommendedFamiliars?: string[]
	/**
	 * Catalogue references, not display strings (M22 D4). `item` is the name as
	 * it appears in `weapons.json` / `armor.json` / `equipment.json`, verbatim,
	 * so cost and load resolve rather than being restated.
	 */
	startingEquipment: Array<{ item: string; quantity?: number; note?: string }>
	/** The standard-gear toolkit this archetype picks. Costs 0, load already counted. */
	toolkit?: string
	upbringing: string
	background: string
	spellData?: {
		magicSkill: string
		/**
		 * `balance` — both options are open and spells are chosen freely across
		 * them. `devotion` — pick ONE option and take its set whole (M22 D5).
		 * Flattening the two is what made a Champion start with all 12 spells.
		 */
		mode: 'balance' | 'devotion'
		options: Array<{
			name: string
			blurb?: string
			spells: Array<{ name: string; rank: number }>
		}>
	}
}

export const ArchetypeSelectionDialog: React.FC<
	ArchetypeSelectionDialogProps
> = ({ open, onClose, onSelectArchetype, selectedArchetype }) => {
	const [selectedArchetypeKey, setSelectedArchetypeKey] = useState<
		string | null
	>(selectedArchetype || null)

	const columns: SingleSelectionDialogColumn<ArchetypeData>[] = [
		{
			key: 'name',
			label: 'Archetype',
			width: 'minmax(0, 1fr)',
			render: (value, archetype) => (
				<Box>
					<Typography variant="body2" sx={{ fontWeight: 'medium' }}>
						{archetype.name}
					</Typography>
					<Box sx={{ mt: 0.5 }}>
						<SheetChip variant="plate">{archetype.role}</SheetChip>
					</Box>
				</Box>
			),
		},
		{
			key: 'description',
			label: 'Description',
			sortable: false,
			width: 'minmax(0, 2fr)',
			render: (value, archetype) => (
				<Box>
					<Typography
						component="span"
						className="cs-entry-summary"
						sx={{ mb: 0.5 }}
					>
						{entrySummary(String(archetype.description ?? ''))}
					</Typography>
					<Typography
						variant="caption"
						sx={{
							display: 'block',
							fontWeight: 'medium',
							color: 'text.secondary',
							mt: 0.5,
						}}
					>
						Best for: {archetype.bestFor}
					</Typography>
				</Box>
			),
		},
		{
			key: 'primarySkills',
			label: 'Primary Skills',
			sortable: false,
			width: 'minmax(0, 1fr)',
			render: (value, archetype) => (
				<Box>
					{archetype.primarySkills.map((skill, index) => (
						<Typography
							key={index}
							variant="caption"
							sx={{
								display: 'block',
								fontWeight: 'medium',
								color: 'primary.main',
							}}
						>
							• {skill}
						</Typography>
					))}
				</Box>
			),
		},
	]

	return (
		<SingleSelectionDialog
			open={open}
			onClose={onClose}
			title="Select Character Archetype"
			data={archetypeData as ArchetypeData[]}
			columns={columns}
			searchFields={['name', 'role', 'description', 'bestFor']}
			selectedItem={selectedArchetypeKey}
			onSelectionChange={setSelectedArchetypeKey}
			onConfirm={() => {
				if (selectedArchetypeKey) {
					const archetype = archetypeData.find(
						(a) => a.name === selectedArchetypeKey,
					)
					if (archetype) {
						onSelectArchetype(archetype as ArchetypeData)
					}
				}
			}}
			getItemKey={(item) => item.name}
			confirmButtonText="Select Archetype"
			// Alphabetical rather than the JSON's authoring order (F11.6).
			defaultSort={{ key: 'name' }}
			itemNoun="archetype"
			searchPlaceholder="Search archetypes by name, role, or description..."
		/>
	)
}

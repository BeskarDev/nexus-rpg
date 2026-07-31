import React, { useState } from 'react'
import { Typography, Box } from '@mui/material'
import { SheetChip } from './SheetChip'
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
	recommendedTalents: string[]
	recommendedCombatArts?: string[]
	recommendedCompanions?: string[]
	recommendedFamiliars?: string[]
	startingEquipment: string[]
	upbringing: string
	background: string
	spellData?: {
		magicSkill: string
		specialization: string
		traditions?: string[]
		disciplines?: string[]
		startingSpells: Array<{
			name: string
			rank: number
			tradition?: string
			discipline?: string
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
						variant="caption"
						sx={{
							display: '-webkit-box',
							WebkitLineClamp: 3,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
							lineHeight: 1.3,
							mb: 0.5,
						}}
					>
						{archetype.description}
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
			itemNoun="archetype"
			searchPlaceholder="Search archetypes by name, role, or description..."
		/>
	)
}

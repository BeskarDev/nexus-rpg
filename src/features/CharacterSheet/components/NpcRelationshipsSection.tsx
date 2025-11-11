import { AddCircle } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { DynamicList } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import React from 'react'
import { DropResult } from '@hello-pangea/dnd'
import { NpcRelationship } from '@site/src/types/Character'
import { SectionHeader } from '../CharacterSheet'
import { NpcRow } from '../CharacterSheetTabs/04_Personal/NpcRow'

export type NpcRelationshipsSectionProps = {
	npcRelationships: NpcRelationship[]
	onAdd: () => void
	onUpdate: (update: Partial<NpcRelationship>, index: number) => void
	onDelete: (index: number) => void
	onReorder: (result: DropResult) => void
}

/**
 * Component for managing NPC relationships using the new unified structure
 */
export const NpcRelationshipsSection: React.FC<
	NpcRelationshipsSectionProps
> = ({ npcRelationships, onAdd, onUpdate, onDelete, onReorder }) => {
	// Ensure we have a valid array to work with
	const validNpcRelationships = npcRelationships || []

	return (
		<Box sx={{ mb: 1, maxWidth: '34rem' }}>
			<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
				<SectionHeader>NPC Relationships</SectionHeader>
				<IconButton onClick={onAdd} sx={{ mb: 0.5 }}>
					<AddCircle />
				</IconButton>
			</Box>
			<DynamicList
				droppableId="npc-relationships"
				onDragEnd={onReorder}
				sx={{
					overflowY: 'auto',
					overflowX: 'hidden',
					maxHeight: '30rem',
				}}
			>
				{validNpcRelationships.map((npc, index) => (
					<DynamicListItem
						key={npc.id}
						id={npc.id}
						index={index}
						dragDisabled={false}
						sx={{ pr: 0, mb: 0.5 }}
					>
						<NpcRow
							key={npc.id}
							npcRelationship={npc}
							updateNpc={(update) => onUpdate(update, index)}
							deleteNpc={() => onDelete(index)}
						/>
					</DynamicListItem>
				))}
			</DynamicList>
		</Box>
	)
}

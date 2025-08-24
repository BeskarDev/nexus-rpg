import { AddCircle } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { DynamicList } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import { Relation } from '@site/src/types/Character'
import { SectionHeader } from '../CharacterSheet'
import { NpcRow } from '../CharacterSheetTabs/04_Personal/NpcRow'

export type PersonalListSectionProps = {
	title: string
	items: Relation[]
	showControls: boolean
	onAdd: () => void
	onUpdate: (update: string, index: number) => void
	onDelete: (index: number) => void
	onReorder: (result: DropResult) => void
	droppableId: string
}

/**
 * Reusable component for managing lists in the Personal tab (allies, contacts, rivals)
 */
export const PersonalListSection: React.FC<PersonalListSectionProps> = ({
	title,
	items,
	showControls,
	onAdd,
	onUpdate,
	onDelete,
	onReorder,
	droppableId,
}) => {
	return (
		<Box sx={{ maxWidth: '100%', mb: 1 }}>
			<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
				<SectionHeader>{title}</SectionHeader>
				{showControls && (
					<IconButton onClick={onAdd} sx={{ mb: 0.75 }}>
						<AddCircle />
					</IconButton>
				)}
			</Box>
			<DynamicList
				droppableId={droppableId}
				onDragEnd={onReorder}
				sx={{
					overflowY: 'auto',
					overflowX: 'hidden',
					maxHeight: '25vh',
				}}
			>
				{items.map((item, index) => (
					<DynamicListItem
						key={item.id}
						id={item.id}
						index={index}
						dragDisabled={!showControls}
						sx={{ pr: 0 }}
					>
						<NpcRow
							key={item.id}
							description={item.description}
							updateNpc={(update) => onUpdate(update, index)}
							deleteNpc={() => onDelete(index)}
							dragDisabled={!showControls}
						/>
					</DynamicListItem>
				))}
			</DynamicList>
		</Box>
	)
}
import { List } from '@mui/material'
import React from 'react'
import {
	DragDropContext,
	Droppable,
	OnDragEndResponder,
} from 'react-beautiful-dnd'
import { DynamicListItem } from './DynamicListItem'

export type Item = {}

export type DynamicListProps = {
	items: Item[]
	onDragEnd: OnDragEndResponder
}

export const DynamicList: React.FC<DynamicListProps> = React.memo(
	({ items, onDragEnd }) => {
		return (
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable-list">
					{(provided) => (
						<List ref={provided.innerRef} {...provided.droppableProps}>
							{items.map((item: Item, index: number) => (
								<DynamicListItem item={item} index={index} key={item.id} />
							))}
							{provided.placeholder}
						</List>
					)}
				</Droppable>
			</DragDropContext>
		)
	},
)

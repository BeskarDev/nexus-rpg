import { List, ListProps } from '@mui/material'
import React from 'react'
import {
	DragDropContext,
	Droppable,
	OnDragEndResponder,
} from 'react-beautiful-dnd'

export type DynamicListProps = {
	onDragEnd: OnDragEndResponder
} & ListProps

export const DynamicList: React.FC<DynamicListProps> = React.memo(
	({ onDragEnd, children, ...props }) => {
		return (
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="droppable-list">
					{(provided) => (
						<List
							ref={provided.innerRef}
							{...provided.droppableProps}
							{...props}
						>
							{children}
						</List>
					)}
				</Droppable>
			</DragDropContext>
		)
	},
)

import { List, ListProps } from '@mui/material'
import React from 'react'
import {
	DragDropContext,
	Droppable,
	OnDragEndResponder,
} from 'react-beautiful-dnd'

export type DynamicListProps = {
	droppableId: string
	onDragEnd: OnDragEndResponder
} & ListProps

export const DynamicList: React.FC<DynamicListProps> = React.memo(
	({ droppableId, onDragEnd, children, ...props }) => {
		return (
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId={droppableId}>
					{(provided) => (
						<>
							{children && (
								<List
									disablePadding
									ref={provided.innerRef}
									{...provided.droppableProps}
									{...props}
									sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
								>
									{children}
								</List>
							)}
							{provided.placeholder}
						</>
					)}
				</Droppable>
			</DragDropContext>
		)
	},
)

import { DragHandle } from '@mui/icons-material'
import { ListItem, ListItemIcon, ListItemProps } from '@mui/material'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export type DynamicListItemProps = {
	id: string
	index: number
} & ListItemProps

export const DynamicListItem: React.FC<DynamicListItemProps> = ({
	id,
	index,
	children,
	...props
}) => {
	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<ListItem
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...props}
				>
					<ListItemIcon {...provided.dragHandleProps}>
						<DragHandle />
					</ListItemIcon>
					{children}
				</ListItem>
			)}
		</Draggable>
	)
}
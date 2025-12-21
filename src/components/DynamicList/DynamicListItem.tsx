import { DragHandle } from '@mui/icons-material'
import { ListItem, ListItemIcon, ListItemProps } from '@mui/material'
import React from 'react'
import { Draggable } from '@hello-pangea/dnd'

export type DynamicListItemProps = {
	id: string
	index: number
	dragDisabled?: boolean
	showDragHandle?: boolean
} & ListItemProps

export const DynamicListItem: React.FC<DynamicListItemProps> = ({
	id,
	index,
	dragDisabled,
	showDragHandle = false,
	children,
	...props
}) => {
	return (
		<Draggable draggableId={id} index={index} isDragDisabled={dragDisabled}>
			{(provided) => (
				<ListItem
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...props}
					sx={{ p: 0, ...props.sx }}
				>
					{showDragHandle && !dragDisabled && (
						<ListItemIcon
							{...provided.dragHandleProps}
							sx={{ minWidth: '32px' }}
						>
							<DragHandle />
						</ListItemIcon>
					)}
					{children}
				</ListItem>
			)}
		</Draggable>
	)
}

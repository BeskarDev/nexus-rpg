import { DragHandle } from '@mui/icons-material'
import { Box, ListItem, ListItemIcon, ListItemProps } from '@mui/material'
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
				<Box
					ref={provided.innerRef}
					{...provided.draggableProps}
					sx={{ width: '100%' }}
				>
					<ListItem
						{...props}
						sx={{ p: 0, ...props.sx }}
					>
						{/* 
						 * Always render the drag handle element but hide it visually when not needed.
						 * @hello-pangea/dnd requires the dragHandleProps element to exist even when hidden.
						 */}
						<ListItemIcon
							{...provided.dragHandleProps}
							sx={{
								minWidth: showDragHandle ? '32px' : 0,
								opacity: showDragHandle ? 1 : 0,
								width: showDragHandle ? 'auto' : 0,
								overflow: 'hidden',
							}}
						>
							<DragHandle />
						</ListItemIcon>
						{children}
					</ListItem>
				</Box>
			)}
		</Draggable>
	)
}

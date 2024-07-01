import InboxIcon from '@mui/icons-material/Inbox'
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Item } from './DynamicList'

export type DynamicListItemProps = {
	item: Item
	index: number
}

export const DynamicListItem: React.FC<DynamicListItemProps> = ({
	item,
	index,
}) => {
	return (
		<Draggable draggableId={item.id} index={index}>
			{(provided, snapshot) => (
				<ListItem
					ref={provided.innerRef}
					{...provided.draggableProps}
					sx={snapshot.isDragging ? { background: 'rgb(235,235,235)' } : ''}
				>
					<ListItemAvatar {...provided.dragHandleProps}>
						<Avatar>
							<InboxIcon />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={item.primary + index}
						secondary={item.secondary + index}
					/>
				</ListItem>
			)}
		</Draggable>
	)
}

import React from 'react'
import {
	Avatar,
	Box,
	IconButton,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Tooltip,
	Typography,
} from '@mui/material'
import { ExitToApp, PersonRemove, Delete } from '@mui/icons-material'
import { PartyMember } from '@site/src/types/Party'

export interface PartyMemberItemProps {
	member: PartyMember
	isCurrentUser: boolean
	isOnlyMember: boolean
	onLeaveParty: () => void
	onRemoveMember: () => void
	onDeleteParty: () => void
}

export const PartyMemberItem: React.FC<PartyMemberItemProps> = ({
	member,
	isCurrentUser,
	isOnlyMember,
	onLeaveParty,
	onRemoveMember,
	onDeleteParty,
}) => {
	const memberName = `${member.name} (${member.folk} ${member.background}, Level ${member.level})`

	return (
		<ListItem
			sx={{
				border: '1px solid',
				borderColor: 'divider',
				borderRadius: 1,
				mb: 1,
				bgcolor: isCurrentUser ? 'action.hover' : 'background.paper',
			}}
		>
			<ListItemAvatar>
				<Avatar src={member.profilePicture} alt={member.name}>
					{member.name.charAt(0).toUpperCase()}
				</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={memberName}
				secondary={`Player: ${member.playerName}`}
				sx={{ mr: 1 }}
			/>
			<Box sx={{ display: 'flex', gap: 1 }}>
				{isCurrentUser ? (
					isOnlyMember ? (
						<Tooltip title="Delete Party">
							<IconButton onClick={onDeleteParty} color="error" size="small">
								<Delete />
							</IconButton>
						</Tooltip>
					) : (
						<Tooltip title="Leave Party">
							<IconButton onClick={onLeaveParty} color="warning" size="small">
								<ExitToApp />
							</IconButton>
						</Tooltip>
					)
				) : (
					<Tooltip title="Remove from Party">
						<IconButton onClick={onRemoveMember} color="error" size="small">
							<PersonRemove />
						</IconButton>
					</Tooltip>
				)}
			</Box>
		</ListItem>
	)
}

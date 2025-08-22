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
import { ExitToApp, PersonRemove } from '@mui/icons-material'
import { PartyMember } from '@site/src/types/Party'

export interface PartyMemberItemProps {
	member: PartyMember
	isCurrentUser: boolean
	onLeaveParty: () => void
	onRemoveMember: () => void
}

export const PartyMemberItem: React.FC<PartyMemberItemProps> = ({
	member,
	isCurrentUser,
	onLeaveParty,
	onRemoveMember,
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
					<Tooltip title="Leave Party">
						<IconButton 
							onClick={onLeaveParty}
							color="warning"
							size="small"
						>
							<ExitToApp />
						</IconButton>
					</Tooltip>
				) : (
					<Tooltip title="Remove from Party">
						<IconButton 
							onClick={onRemoveMember}
							color="error"
							size="small"
						>
							<PersonRemove />
						</IconButton>
					</Tooltip>
				)}
			</Box>
		</ListItem>
	)
}
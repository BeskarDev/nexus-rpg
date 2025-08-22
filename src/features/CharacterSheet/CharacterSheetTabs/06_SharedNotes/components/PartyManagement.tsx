import React, { useState } from 'react'
import {
	Box,
	Button,
	TextField,
	Typography,
	List,
	Paper,
	Alert,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	DialogContentText,
	Snackbar,
	IconButton,
	Tooltip,
} from '@mui/material'
import { Add, ContentCopy, Edit, Save, Cancel } from '@mui/icons-material'
import { PartyInfo } from '@site/src/types/Party'
import { PartyMemberItem } from './PartyMemberItem'

export interface PartyManagementProps {
	characterId: string
	partyInfo: PartyInfo | null
	onCreateParty: (name: string) => Promise<void>
	onAddMember: (characterId: string) => Promise<void>
	onRemoveMember: (characterId: string) => Promise<void>
	onLeaveParty: () => Promise<void>
	onDeleteParty: () => Promise<void>
	onUpdatePartyName: (newName: string) => Promise<void>
	loading: boolean
}

export const PartyManagement: React.FC<PartyManagementProps> = ({
	characterId,
	partyInfo,
	onCreateParty,
	onAddMember,
	onRemoveMember,
	onLeaveParty,
	onDeleteParty,
	onUpdatePartyName,
	loading,
}) => {
	const [partyName, setPartyName] = useState('')
	const [newMemberCharacterId, setNewMemberCharacterId] = useState('')
	const [isEditingName, setIsEditingName] = useState(false)
	const [editedPartyName, setEditedPartyName] = useState('')
	const [confirmDialog, setConfirmDialog] = useState<{
		open: boolean
		title: string
		message: string
		action: () => void
	}>({ open: false, title: '', message: '', action: () => {} })
	const [snackbar, setSnackbar] = useState<{
		open: boolean
		message: string
		severity: 'success' | 'error'
	}>({ open: false, message: '', severity: 'success' })

	const handleCreateParty = async () => {
		if (!partyName.trim()) return
		
		try {
			await onCreateParty(partyName.trim())
			setPartyName('')
			setSnackbar({
				open: true,
				message: 'Party created successfully!',
				severity: 'success'
			})
		} catch (error) {
			console.error('Party creation error:', error)
			let errorMessage = 'Failed to create party'
			if (error instanceof Error) {
				errorMessage = error.message || errorMessage
			}
			setSnackbar({
				open: true,
				message: errorMessage,
				severity: 'error'
			})
		}
	}

	const handleAddMember = async () => {
		if (!newMemberCharacterId.trim()) return
		
		try {
			await onAddMember(newMemberCharacterId.trim())
			setNewMemberCharacterId('')
			setSnackbar({
				open: true,
				message: 'Member added successfully!',
				severity: 'success'
			})
		} catch (error) {
			let errorMessage = 'Failed to add member'
			if (error instanceof Error) {
				errorMessage = error.message || errorMessage
			}
			setSnackbar({
				open: true,
				message: errorMessage,
				severity: 'error'
			})
		}
	}

	const handleEditPartyName = () => {
		if (partyInfo) {
			setEditedPartyName(partyInfo.party.name)
			setIsEditingName(true)
		}
	}

	const handleSavePartyName = async () => {
		if (!editedPartyName.trim()) return
		
		try {
			await onUpdatePartyName(editedPartyName.trim())
			setIsEditingName(false)
			setSnackbar({
				open: true,
				message: 'Party name updated successfully!',
				severity: 'success'
			})
		} catch (error) {
			setSnackbar({
				open: true,
				message: 'Failed to update party name',
				severity: 'error'
			})
		}
	}

	const handleCancelEdit = () => {
		setIsEditingName(false)
		setEditedPartyName('')
	}

	const handleCopyCharacterId = () => {
		navigator.clipboard.writeText(characterId)
		setSnackbar({
			open: true,
			message: 'Character ID copied to clipboard!',
			severity: 'success'
		})
	}

	const showConfirmDialog = (title: string, message: string, action: () => void) => {
		setConfirmDialog({ open: true, title, message, action })
	}

	const executeConfirmAction = async () => {
		try {
			await confirmDialog.action()
			setConfirmDialog({ open: false, title: '', message: '', action: () => {} })
			setSnackbar({
				open: true,
				message: 'Action completed successfully!',
				severity: 'success'
			})
		} catch (error) {
			console.error('Confirm action error:', error)
			let errorMessage = 'Action failed'
			if (error instanceof Error) {
				errorMessage = error.message || errorMessage
			}
			setSnackbar({
				open: true,
				message: errorMessage,
				severity: 'error'
			})
		}
	}

	return (
		<Box sx={{ mb: 3 }}>
			{/* Character ID Display */}
			<Paper sx={{ p: 2, mb: 2 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Typography variant="body2" color="text.secondary">
						Character ID:
					</Typography>
					<Typography 
						component="code"
						sx={{ 
							fontFamily: 'monospace',
							bgcolor: (theme) => theme.palette.mode === 'dark' ? 'grey.800' : 'grey.100',
							px: 1,
							py: 0.5,
							borderRadius: 0.5,
							flexGrow: 1
						}}
					>
						{characterId}
					</Typography>
					<Tooltip title="Copy Character ID">
						<IconButton size="small" onClick={handleCopyCharacterId}>
							<ContentCopy fontSize="small" />
						</IconButton>
					</Tooltip>
				</Box>
			</Paper>

			{/* Party Creation or Management */}
			{!partyInfo ? (
				<Paper sx={{ p: 2 }}>
					<Typography variant="h6" sx={{ mb: 2 }}>
						Create Adventuring Party
					</Typography>
					<Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
						<TextField
							label="Party Name"
							value={partyName}
							onChange={(e) => setPartyName(e.target.value)}
							size="small"
							fullWidth
							disabled={loading}
						/>
						<Button
							variant="contained"
							onClick={handleCreateParty}
							disabled={!partyName.trim() || loading}
							startIcon={<Add />}
						>
							Create
						</Button>
					</Box>
					<Alert severity="info">
						Create a party to share notes and coordinate with other players. Once created, you can invite others by sharing character IDs.
					</Alert>
				</Paper>
			) : (
				<Paper sx={{ p: 2 }}>
					{/* Party Name with Edit Functionality */}
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
						{isEditingName ? (
							<>
								<TextField
									value={editedPartyName}
									onChange={(e) => setEditedPartyName(e.target.value)}
									size="small"
									fullWidth
									disabled={loading}
									autoFocus
								/>
								<Tooltip title="Save">
									<IconButton 
										onClick={handleSavePartyName}
										disabled={!editedPartyName.trim() || loading}
										color="primary"
										size="small"
									>
										<Save />
									</IconButton>
								</Tooltip>
								<Tooltip title="Cancel">
									<IconButton 
										onClick={handleCancelEdit}
										disabled={loading}
										size="small"
									>
										<Cancel />
									</IconButton>
								</Tooltip>
							</>
						) : (
							<>
								<Typography variant="h6" sx={{ flexGrow: 1 }}>
									{partyInfo.party.name}
								</Typography>
								<Tooltip title="Edit party name">
									<IconButton 
										onClick={handleEditPartyName}
										disabled={loading}
										size="small"
									>
										<Edit />
									</IconButton>
								</Tooltip>
							</>
						)}
					</Box>
					
					{/* Add Member Section */}
					<Box sx={{ mb: 3 }}>
						<Typography variant="subtitle2" sx={{ mb: 1 }}>
							Invite New Member
						</Typography>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<TextField
								label="Character ID"
								value={newMemberCharacterId}
								onChange={(e) => setNewMemberCharacterId(e.target.value)}
								size="small"
								fullWidth
								disabled={loading}
								placeholder="user-id-character-id"
							/>
							<Button
								variant="outlined"
								onClick={handleAddMember}
								disabled={!newMemberCharacterId.trim() || loading}
								startIcon={<Add />}
							>
								Add
							</Button>
						</Box>
					</Box>

					{/* Party Members */}
					<Typography variant="subtitle2" sx={{ mb: 1 }}>
						Party Members ({partyInfo.members.length})
					</Typography>
					<List sx={{ p: 0 }}>
						{partyInfo.members.map((member) => (
							<PartyMemberItem
								key={member.characterId}
								member={member}
								isCurrentUser={member.characterId === characterId}
								isOnlyMember={partyInfo.members.length === 1}
								onLeaveParty={() => 
									showConfirmDialog(
										'Leave Party',
										'Are you sure you want to leave this party? This cannot be undone.',
										onLeaveParty
									)
								}
								onDeleteParty={() =>
									showConfirmDialog(
										'Delete Party',
										'Are you sure you want to delete this party? This will permanently remove all party data including shared notes.',
										onDeleteParty
									)
								}
								onRemoveMember={() =>
									showConfirmDialog(
										'Remove Member',
										`Are you sure you want to remove ${member.name} from the party?`,
										() => onRemoveMember(member.characterId)
									)
								}
							/>
						))}
					</List>
				</Paper>
			)}

			{/* Confirmation Dialog */}
			<Dialog open={confirmDialog.open} onClose={() => setConfirmDialog(prev => ({ ...prev, open: false }))}>
				<DialogTitle>{confirmDialog.title}</DialogTitle>
				<DialogContent>
					<DialogContentText>{confirmDialog.message}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setConfirmDialog(prev => ({ ...prev, open: false }))}>
						Cancel
					</Button>
					<Button onClick={executeConfirmAction} color="error" autoFocus>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>

			{/* Snackbar for notifications */}
			<Snackbar
				open={snackbar.open}
				autoHideDuration={3000}
				onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert 
					severity={snackbar.severity} 
					onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	)
}
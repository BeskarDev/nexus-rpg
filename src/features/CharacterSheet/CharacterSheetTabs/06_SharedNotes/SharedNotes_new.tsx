import { useColorMode } from '@docusaurus/theme-common'
import { Save, Warning, Refresh } from '@mui/icons-material'
import {
	Box,
	CircularProgress,
	IconButton,
	TextField,
	Typography,
	Alert,
	Button,
	Tooltip,
} from '@mui/material'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import React from 'react'
import { SectionHeader } from '../../CharacterSheet'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useDeviceSize } from '../../utils/useDeviceSize'
import { useNotesSync } from '../../hooks/useNotesSync'
import { useDialog } from '../../hooks/useDialog'
import { ConfirmationDialog } from '../../components/ConfirmationDialog'
import { ConflictResolutionDialog } from '../../components/ConflictResolutionDialog'
import { PartyService } from '../../services/PartyService'
import { PartyManagement } from './components/PartyManagement'

export const SharedNotes: React.FC = () => {
	const { currentUser } = useAuth()
	const { isMobile } = useDeviceSize()
	const { colorMode } = useColorMode()
	const refreshDialog = useDialog()

	const activeCharacter = useAppSelector(
		(state) => state.characterSheet.activeCharacter,
	)

	const characterId = activeCharacter
		? `${activeCharacter.collectionId}-${activeCharacter.docId}`
		: ''

	const notesSync = useNotesSync(currentUser?.uid, characterId)

	const handleSaveNotes = async () => {
		await notesSync.saveNotes()
	}

	const handleRefreshNotes = () => {
		if (notesSync.hasUnsavedChanges) {
			refreshDialog.open()
		} else {
			notesSync.refreshFromServer()
		}
	}

	const handleRefreshConfirmation = () => {
		notesSync.refreshFromServer()
		refreshDialog.close()
	}

	const handlePartyCreate = async (name: string) => {
		if (!currentUser || !characterId) return

		const partyId = await PartyService.createParty(
			name,
			characterId,
			currentUser.uid,
		)
		// The subscription will automatically update partyInfo
	}

	const handlePartyAddMember = async (newCharacterId: string) => {
		if (!notesSync.partyInfo) return
		await PartyService.addCharacterToParty(
			notesSync.partyInfo.party.id,
			newCharacterId,
		)
	}

	const handlePartyRemoveMember = async (memberCharacterId: string) => {
		if (!notesSync.partyInfo) return
		await PartyService.removeCharacterFromParty(
			notesSync.partyInfo.party.id,
			memberCharacterId,
		)
	}

	const handlePartyLeave = async () => {
		if (!notesSync.partyInfo || !characterId) return
		await PartyService.removeCharacterFromParty(
			notesSync.partyInfo.party.id,
			characterId,
		)
	}

	if (notesSync.isLoading) {
		return (
			<Box
				display="flex"
				justifyContent="center"
				alignItems="center"
				minHeight={200}
			>
				<CircularProgress />
				<Typography variant="body1" ml={2}>
					{notesSync.migrationInProgress
						? 'Migrating shared notes to new system...'
						: 'Loading party data...'}
				</Typography>
			</Box>
		)
	}

	if (notesSync.error) {
		return (
			<Box p={2}>
				<Alert severity="error" sx={{ mb: 2 }}>
					{notesSync.error}
				</Alert>
			</Box>
		)
	}

	return (
		<Box p={2}>
			<SectionHeader title="Party Notes" />

			{notesSync.partyInfo && (
				<PartyManagement
					partyInfo={notesSync.partyInfo}
					currentCharacterId={characterId}
					onCreateParty={handlePartyCreate}
					onAddMember={handlePartyAddMember}
					onRemoveMember={handlePartyRemoveMember}
					onLeaveParty={handlePartyLeave}
				/>
			)}

			<Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
				<Typography variant="h6">Shared Notes</Typography>
				<Box display="flex" alignItems="center" gap={1}>
					{notesSync.hasServerChanges && (
						<Tooltip title="Server has newer changes">
							<Warning color="warning" />
						</Tooltip>
					)}
					<Tooltip title="Refresh from server">
						<IconButton onClick={handleRefreshNotes} size="small">
							<Refresh />
						</IconButton>
					</Tooltip>
					<Tooltip title="Save notes">
						<IconButton
							onClick={handleSaveNotes}
							disabled={!notesSync.hasUnsavedChanges || notesSync.isSaving}
							color={notesSync.hasUnsavedChanges ? 'primary' : 'default'}
							size="small"
						>
							{notesSync.isSaving ? (
								<CircularProgress size={20} />
							) : (
								<Save />
							)}
						</IconButton>
					</Tooltip>
				</Box>
			</Box>

			{notesSync.hasUnsavedChanges && (
				<Alert severity="info" sx={{ mb: 2 }}>
					You have unsaved changes. Click the save button to sync with your party.
				</Alert>
			)}

			<TextField
				multiline
				fullWidth
				minRows={isMobile ? 8 : 15}
				maxRows={isMobile ? 20 : 30}
				value={notesSync.notes}
				onChange={(e) => notesSync.setNotes(e.target.value)}
				placeholder="Write shared notes for your party here..."
				variant="outlined"
				sx={{
					'& .MuiInputBase-input': {
						fontSize: '0.9rem',
						fontFamily: 'monospace',
						backgroundColor: colorMode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)',
					},
				}}
			/>

			<ConflictResolutionDialog
				open={notesSync.showConflictDialog}
				onClose={() => notesSync.setShowConflictDialog(false)}
				onUseLocal={() => notesSync.resolveConflict(false)}
				onUseServer={() => notesSync.resolveConflict(true)}
				localNotes={notesSync.notes}
				serverNotes={notesSync.conflictNotes}
			/>

			<ConfirmationDialog
				open={refreshDialog.isOpen}
				onClose={refreshDialog.close}
				onConfirm={handleRefreshConfirmation}
				title="Refresh Notes"
				message="You have unsaved changes that will be lost. Are you sure you want to refresh from the server?"
				confirmText="Refresh"
				confirmColor="warning"
			/>
		</Box>
	)
}
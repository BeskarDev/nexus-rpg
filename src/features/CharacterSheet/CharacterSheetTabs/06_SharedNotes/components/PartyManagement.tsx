import React, { useState } from 'react'
import {
	Box,
	Button,
	TextField,
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
import { ContentCopy } from '@mui/icons-material'
import { PartyInfo } from '@site/src/types/Party'
import { logger } from '../../../utils'
import { PartyMemberItem } from './PartyMemberItem'
import { PartyNameCard } from '../PartyNameCard'
import {
	ListSection,
	MarkButton,
	MetaBand,
	MetaBandField,
	MetaBandLabel,
	MetaBandNote,
	MetaBandValue,
	RuleInfo,
	metaBandInputClass,
	metaBandInputSx,
} from '../../../components'
import { PARTY_HEADINGS, partyHeaderTemplate } from './partyColumns'

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
				severity: 'success',
			})
		} catch (error) {
			logger.error('Party creation error', error)
			let errorMessage = 'Failed to create party'
			if (error instanceof Error) {
				errorMessage = error.message || errorMessage
			}
			setSnackbar({
				open: true,
				message: errorMessage,
				severity: 'error',
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
				severity: 'success',
			})
		} catch (error) {
			let errorMessage = 'Failed to add member'
			if (error instanceof Error) {
				errorMessage = error.message || errorMessage
			}
			setSnackbar({
				open: true,
				message: errorMessage,
				severity: 'error',
			})
		}
	}

	const handleUpdatePartyName = async (newName: string) => {
		try {
			await onUpdatePartyName(newName)
			setSnackbar({
				open: true,
				message: 'Party name updated successfully!',
				severity: 'success',
			})
		} catch (error) {
			setSnackbar({
				open: true,
				message: 'Failed to update party name',
				severity: 'error',
			})
			throw error // Re-throw so PartyNameCard knows it failed
		}
	}

	const handleCopyCharacterId = () => {
		navigator.clipboard.writeText(characterId)
		setSnackbar({
			open: true,
			message: 'Character ID copied to clipboard!',
			severity: 'success',
		})
	}

	const showConfirmDialog = (
		title: string,
		message: string,
		action: () => void,
	) => {
		setConfirmDialog({ open: true, title, message, action })
	}

	const executeConfirmAction = async () => {
		try {
			await confirmDialog.action()
			setConfirmDialog({
				open: false,
				title: '',
				message: '',
				action: () => {},
			})
			setSnackbar({
				open: true,
				message: 'Action completed successfully!',
				severity: 'success',
			})
		} catch (error) {
			logger.error('Confirm action error', error)
			let errorMessage = 'Action failed'
			if (error instanceof Error) {
				errorMessage = error.message || errorMessage
			}
			setSnackbar({
				open: true,
				message: errorMessage,
				severity: 'error',
			})
		}
	}

	return (
		<Box sx={{ mb: 1.5 }}>
			{/*
				M13 S7 — the party's facts as a BAND, its members as a ledger.
				
				What this replaced: three stacked MUI `Paper` panels. One held the character's
				own id in a `grey.800 / grey.100` monospace block — the last
				`palette.mode === 'dark' ? … : …` conditional on the sheet, which is the exact
				pattern M9 D3 replaced with mode-tracking tokens everywhere else. One held the
				party name card, an "Invite New Member" heading, a labelled id field and an
				outlined Add button. One held a `subtitle2` count over a MUI `List`.
				
				They are one meta band (the party's name, its size, your id) and one
				`ListSection` of rows. The invite field lives in the section's control strip
				beside the verb that uses it, because an id you paste and a button you press are
				one action and were two panels apart.
			*/}
			{!partyInfo ? (
				<Box className="cs-empty-note" sx={{ display: 'grid', gap: 1 }}>
					<span>
						A party shares one page of notes. Create one and invite the other
						players by character id — yours is <code>{characterId}</code>.
					</span>
					<Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
						<TextField
							className={metaBandInputClass.text}
							variant="standard"
							size="small"
							value={partyName}
							onChange={(event) => setPartyName(event.target.value)}
							placeholder="Party name"
							disabled={loading}
							inputProps={{ 'aria-label': 'Party name' }}
							sx={{ ...metaBandInputSx, flex: '1 1 12rem', maxWidth: '18rem' }}
						/>
						<MarkButton
							glyph="+"
							label="Create party"
							onClick={handleCreateParty}
						/>
					</Box>
				</Box>
			) : (
				<>
					<MetaBand>
						<MetaBandField>
							<MetaBandLabel sigil="party">Party</MetaBandLabel>
							<PartyNameCard
								partyName={partyInfo.party.name}
								onSave={handleUpdatePartyName}
								loading={loading}
							/>
						</MetaBandField>
						<MetaBandField nowrap>
							<MetaBandLabel sigil="folk">Members</MetaBandLabel>
							<MetaBandValue>{partyInfo.members.length}</MetaBandValue>
						</MetaBandField>
						<MetaBandField nowrap>
							<MetaBandLabel sigil="name">Your ID</MetaBandLabel>
							<MetaBandNote>{characterId}</MetaBandNote>
							<Tooltip title="Copy your character id">
								<IconButton
									size="small"
									onClick={handleCopyCharacterId}
									aria-label="Copy your character id"
								>
									<ContentCopy fontSize="inherit" />
								</IconButton>
							</Tooltip>
						</MetaBandField>
					</MetaBand>

					<ListSection
						label="Party Members"
						count={partyInfo.members.length}
						collapsible
						defaultExpanded
						className="cs-ledger-cols"
						info={
							<RuleInfo label="About party members">
								Invite a player by pasting their character id — they can copy it
								from their own Party tab. Removing a member only unlinks them
								from the party; their character is untouched.
							</RuleInfo>
						}
						actions={
							<>
								<TextField
									className={metaBandInputClass.text}
									variant="standard"
									size="small"
									value={newMemberCharacterId}
									onChange={(event) =>
										setNewMemberCharacterId(event.target.value)
									}
									placeholder="character id"
									disabled={loading}
									inputProps={{ 'aria-label': 'Character id to invite' }}
									sx={{ ...metaBandInputSx, width: '11rem' }}
								/>
								<MarkButton
									glyph="+"
									label="Invite member"
									onClick={handleAddMember}
								/>
							</>
						}
					>
						<Box
							className="cs-ledger-head"
							aria-hidden="true"
							sx={{
								gridTemplateColumns: partyHeaderTemplate(),
								// Fills the working column (M13 S11); the column carries the ceiling.
								maxWidth: '100%',
							}}
						>
							{PARTY_HEADINGS.map((heading, index) => (
								<span key={index} style={{ textAlign: heading.align }}>
									{heading.label}
								</span>
							))}
						</Box>
						{partyInfo.members.map((member) => (
							<PartyMemberItem
								key={member.characterId}
								member={member}
								isCurrentUser={member.characterId === characterId}
								isOnlyMember={partyInfo.members.length === 1}
								onLeaveParty={() =>
									showConfirmDialog(
										'Leave Party',
										'Leave this party? Its shared notes stay with the other members.',
										onLeaveParty,
									)
								}
								onDeleteParty={() =>
									showConfirmDialog(
										'Delete Party',
										'Delete this party? Its shared notes are removed permanently.',
										onDeleteParty,
									)
								}
								onRemoveMember={() =>
									showConfirmDialog(
										'Remove Member',
										`Remove ${member.name} from the party?`,
										() => onRemoveMember(member.characterId),
									)
								}
							/>
						))}
					</ListSection>
				</>
			)}

			{/* Confirmation Dialog */}
			<Dialog
				open={confirmDialog.open}
				onClose={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
			>
				<DialogTitle>{confirmDialog.title}</DialogTitle>
				<DialogContent>
					<DialogContentText>{confirmDialog.message}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() =>
							setConfirmDialog((prev) => ({ ...prev, open: false }))
						}
					>
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
				onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
			>
				<Alert
					severity={snackbar.severity}
					onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
				>
					{snackbar.message}
				</Alert>
			</Snackbar>
		</Box>
	)
}

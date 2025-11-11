import {
	Box,
	IconButton,
	TextField,
	TextFieldProps,
	MenuItem,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Chip,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Tooltip,
} from '@mui/material'
import React, { useState } from 'react'

import { Delete, ExpandMore } from '@mui/icons-material'
import {
	NpcRelationship,
	npcRoleArray,
	npcDispositionArray,
	NpcRole,
	NpcDisposition,
} from '@site/src/types/Character'

// Role descriptions from the documentation
const roleDescriptions: Record<NpcRole, string> = {
	Adventurer:
		'Adventurers are those who live for excitement, danger, and the thrill of exploration or combat. They might be mercenaries, bounty hunters, treasure hunters, outlaws, or wanderers who often take on high-risk tasks.',
	Artisan:
		'Artisans are skilled crafters or builders, masters of their trade. They might be blacksmiths, carpenters, weavers, or architects who shape the world with their hands.',
	Authority:
		'Authorities hold positions of power, law, or governance. They could be nobles, guards, judges, or anyone who wields social or political influence.',
	Scholar:
		'Scholars are seekers of knowledge—whether academic, religious, or medical. They could be priests, healers, historians, or shamans who value study and wisdom above all else.',
	Scoundrel:
		'Scoundrels are those who thrive in the shadows, relying on trickery, deceit, and manipulation to get what they want. They could be thieves, con artists, spies, or anyone with a hidden agenda.',
	Seeker:
		"Seekers are individuals driven by a quest—whether for knowledge, wealth, or personal expression. They might be merchants, guides, entertainers, or anyone seeking something they don't yet possess.",
}

// Disposition descriptions from the documentation
const dispositionDescriptions: Record<NpcDisposition, string> = {
	[-3]: 'Actively despises the adventurer and will work to undermine them even at personal cost.',
	[-2]: "Opposes the adventurer's goals and requires significant persuasion or leverage to cooperate.",
	[-1]: 'Distrusts the adventurer but may be convinced to assist for appropriate compensation.',
	[0]: 'Has no strong feelings toward the adventurer and interacts purely transactionally.',
	[1]: 'Views the adventurer favorably and is willing to offer modest assistance or discount.',
	[2]: 'Considers the adventurer as family, close friend, or honored ally and offers substantial support.',
}

export type NpcRowProps = {
	npcRelationship: NpcRelationship
	updateNpc: (update: Partial<NpcRelationship>) => void
	deleteNpc: () => void
} & Omit<TextFieldProps, 'value' | 'onChange'>

const getDispositionColor = (
	disposition: NpcDisposition,
): 'success' | 'info' | 'default' | 'warning' | 'error' => {
	if (disposition === 2) return 'success'
	if (disposition === 1) return 'info'
	if (disposition === 0) return 'default'
	if (disposition === -1) return 'warning'
	return 'error'
}

const getDispositionLabel = (disposition: NpcDisposition): string => {
	const item = npcDispositionArray.find((d) => d.value === disposition)
	return item
		? `${item.label} (${disposition >= 0 ? '+' : ''}${disposition})`
		: 'Unknown'
}

const getRoleDescription = (role: NpcRole): string => {
	return roleDescriptions[role] || 'No description available.'
}

const getDispositionDescription = (disposition: NpcDisposition): string => {
	return dispositionDescriptions[disposition] || 'No description available.'
}

export const NpcRow: React.FC<NpcRowProps> = ({
	npcRelationship,
	updateNpc,
	deleteNpc,
	...props
}) => {
	const [localData, setLocalData] = useState(npcRelationship)
	const [expanded, setExpanded] = useState(false)
	const [confirmDelete, setConfirmDelete] = useState(false)

	const handleFieldUpdate = (field: keyof NpcRelationship, value: any) => {
		const updatedData = { ...localData, [field]: value }
		setLocalData(updatedData)
		updateNpc({ [field]: value })
	}

	const handleDescriptionBlur = () => {
		updateNpc({ description: localData.description })
	}

	const handleDeleteClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		setConfirmDelete(true)
	}

	const handleConfirmDelete = () => {
		deleteNpc()
		setConfirmDelete(false)
	}

	const handleCancelDelete = () => {
		setConfirmDelete(false)
	}

	return (
		<>
			<Accordion
				expanded={expanded}
				onChange={(_, isExpanded) => setExpanded(isExpanded)}
				disableGutters
				sx={{ flexGrow: 1, mt: 0, mr: 1, width: '100%' }}
			>
				<AccordionSummary
					expandIcon={<ExpandMore />}
					sx={{
						gap: 1,
						pt: 0,
						px: 1,
						flexDirection: 'row-reverse',
						'& .MuiAccordionSummary-content': {
							display: 'block',
						},
					}}
				>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							flexWrap: 'wrap',
						}}
					>
						<TextField
							size="small"
							variant="standard"
							value={localData.name || 'Unnamed NPC'}
							onChange={(e) => handleFieldUpdate('name', e.target.value)}
							label="Name"
							sx={{
								flexGrow: 1,
								flexShrink: 1,
								maxWidth: '12rem',
							}}
						/>
						<Tooltip title={getRoleDescription(localData.role)} arrow>
							<Chip
								size="small"
								label={localData.role}
								variant="outlined"
								sx={{
									minWidth: '4rem',
									flexShrink: 0,
									fontSize: '0.75rem',
								}}
							/>
						</Tooltip>
						<Tooltip
							title={getDispositionDescription(localData.disposition)}
							arrow
						>
							<Chip
								size="small"
								label={getDispositionLabel(localData.disposition)}
								color={getDispositionColor(localData.disposition)}
								variant="outlined"
								sx={{
									flexShrink: 0,
									fontSize: '0.75rem',
									maxWidth: { xs: '6rem', sm: 'none' },
								}}
							/>
						</Tooltip>
						<IconButton
							size="small"
							edge="end"
							aria-label="delete"
							onClick={handleDeleteClick}
							sx={{ flexShrink: 0, ml: 'auto' }}
						>
							<Delete />
						</IconButton>
					</Box>
				</AccordionSummary>
				<AccordionDetails>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						<Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
							<TextField
								select
								label="Role"
								value={localData.role}
								onChange={(e) =>
									handleFieldUpdate('role', e.target.value as NpcRole)
								}
								sx={{ minWidth: '8rem' }}
								size="small"
							>
								{npcRoleArray.map((role) => (
									<MenuItem key={role} value={role}>
										{role}
									</MenuItem>
								))}
							</TextField>
							<TextField
								select
								label="Disposition"
								value={localData.disposition}
								onChange={(e) =>
									handleFieldUpdate(
										'disposition',
										parseInt(e.target.value) as NpcDisposition,
									)
								}
								sx={{ minWidth: '10rem' }}
								size="small"
							>
								{npcDispositionArray.map((disp) => (
									<MenuItem key={disp.value} value={disp.value}>
										{disp.label} ({disp.value >= 0 ? '+' : ''}
										{disp.value})
									</MenuItem>
								))}
							</TextField>
						</Box>
						<TextField
							multiline
							minRows={2}
							maxRows={6}
							label="Description"
							value={localData.description}
							onChange={(e) =>
								setLocalData((prev) => ({
									...prev,
									description: e.target.value,
								}))
							}
							onBlur={handleDescriptionBlur}
							placeholder="Describe this NPC and your relationship with them..."
							sx={{ width: '100%' }}
							size="small"
						/>
					</Box>
				</AccordionDetails>
			</Accordion>

			{/* Delete Confirmation Dialog */}
			<Dialog
				open={confirmDelete}
				onClose={handleCancelDelete}
				aria-labelledby="delete-dialog-title"
			>
				<DialogTitle id="delete-dialog-title">
					Delete NPC Relationship
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete your relationship with "
						{localData.name || 'this NPC'}"? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelDelete}>Cancel</Button>
					<Button onClick={handleConfirmDelete} color="error" autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

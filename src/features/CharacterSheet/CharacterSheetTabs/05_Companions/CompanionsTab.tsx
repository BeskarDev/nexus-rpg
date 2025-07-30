import {
	Add,
	Delete,
	Edit,
	Save,
	Cancel,
	ExpandMore,
} from '@mui/icons-material'
import {
	Box,
	Button,
	IconButton,
	TextField,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Tooltip,
	Checkbox,
	FormControlLabel,
} from '@mui/material'
import React, { useState, useMemo, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { DropResult } from 'react-beautiful-dnd'
import { SectionHeader } from '../../CharacterSheet'
import { Companion } from '../../../../types/Character'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { DynamicList } from '@site/src/components/DynamicList/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'

export const CompanionsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const companions = useMemo(
		() => activeCharacter?.companions || [],
		[activeCharacter],
	)

	const [editingId, setEditingId] = useState<string | null>(null)
	const [editName, setEditName] = useState('')
	const [editMarkdown, setEditMarkdown] = useState('')
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [companionToDelete, setCompanionToDelete] = useState<string | null>(
		null,
	)
	const [expandedAccordions, setExpandedAccordions] = useState<Set<string>>(new Set())

	// Initialize with first companion expanded only when companions are first loaded
	useEffect(() => {
		if (companions.length > 0 && expandedAccordions.size === 0) {
			setExpandedAccordions(new Set([companions[0].id]))
		}
	}, [companions.length]) // Only depend on companions.length, not expandedAccordions.size

	const addCompanion = () => {
		const newCompanionId = Date.now().toString()
		dispatch(characterSheetActions.addNewCompanion())
		// Start editing the new companion (it will be at index 0)
		setEditingId(newCompanionId)
		setEditName('New Companion')
		setEditMarkdown('')
		// Auto-expand the new companion's accordion
		setExpandedAccordions(prev => new Set([newCompanionId, ...prev]))
	}

	const deleteCompanion = (companionId: string) => {
		const companion = companions.find((c) => c.id === companionId)
		if (companion) {
			dispatch(characterSheetActions.deleteCompanion(companion))
		}
	}

	const updateCompanion = (update: Partial<Companion>, index: number) => {
		const companion = companions[index]
		if (companion) {
			dispatch(
				characterSheetActions.updateCompanion({
					id: companion.id,
					updates: update,
				}),
			)
		}
	}

	const handleDeleteConfirm = () => {
		if (companionToDelete) {
			deleteCompanion(companionToDelete)
			setEditingId(null)
			setEditName('')
			setEditMarkdown('')
		}
		setDeleteDialogOpen(false)
		setCompanionToDelete(null)
	}

	const onCompanionReorder = ({ source, destination }: DropResult) => {
		// dropped outside the list
		if (!destination) return

		dispatch(
			characterSheetActions.reorderCompanion({
				source: source.index,
				destination: destination.index,
			}),
		)
	}

	const handleDeleteClick = (companion: Companion) => {
		setCompanionToDelete(companion.id)
		setDeleteDialogOpen(true)
	}

	const handleCurrentHPChange = (companionId: string, value: string) => {
		const newValue = parseInt(value) || 0
		dispatch(
			characterSheetActions.updateCompanion({
				id: companionId,
				updates: { currentHP: newValue },
			}),
		)
	}

	const handleMaxHPChange = (companionId: string, value: string) => {
		const newValue = parseInt(value) || 0
		dispatch(
			characterSheetActions.updateCompanion({
				id: companionId,
				updates: { maxHP: newValue },
			}),
		)
	}

	const handleWoundedChange = (companionId: string, checked: boolean) => {
		dispatch(
			characterSheetActions.updateCompanion({
				id: companionId,
				updates: { wounded: checked },
			}),
		)
	}

	const extractHPFromMarkdown = (markdown: string): number | null => {
		// Look for HP patterns in table format only
		const patterns = [
			// Table format: | 20 | 3 (natural light) | d6 | ...
			/\|\s*(\d+)\s*\|\s*\d+.*?\|\s*d\d+/i,
			// Table format with HP header: | HP | AV | ... followed by | 20 | 3 | ...
			/\|\s*HP\s*\|.*?\n.*?\|\s*(\d+)\s*\|/i,
		]

		for (const pattern of patterns) {
			const match = markdown.match(pattern)
			if (match && match[1]) {
				const hp = parseInt(match[1])
				if (!isNaN(hp) && hp > 0) {
					return hp
				}
			}
		}
		return null
	}

	const handleDeleteCancel = () => {
		setDeleteDialogOpen(false)
		setCompanionToDelete(null)
	}

	const handleAccordionToggle = (companionId: string) => {
		setExpandedAccordions(prev => {
			const newSet = new Set(prev)
			if (newSet.has(companionId)) {
				newSet.delete(companionId)
			} else {
				newSet.add(companionId)
			}
			return newSet
		})
	}

	const startEditing = (companion: Companion) => {
		setEditingId(companion.id)
		setEditName(companion.name)
		setEditMarkdown(companion.markdown)
		// Auto-expand the accordion when editing starts
		setExpandedAccordions(prev => new Set([...prev, companion.id]))
	}

	const saveEditing = () => {
		if (!editingId) return

		const index = companions.findIndex((c) => c.id === editingId)
		if (index !== -1) {
			const updates = { name: editName, markdown: editMarkdown }
			updateCompanion(updates, index)
			
			// Auto-fill HP from markdown after saving
			const companion = companions[index]
			if (companion && editMarkdown) {
				const extractedHP = extractHPFromMarkdown(editMarkdown)
				if (extractedHP !== null) {
					// Update HP values automatically
					setTimeout(() => {
						dispatch(
							characterSheetActions.updateCompanion({
								id: companion.id,
								updates: { 
									maxHP: extractedHP,
									currentHP: companion.currentHP || extractedHP
								},
							}),
						)
					}, 100) // Small delay to ensure the markdown update is processed first
				}
			}
		}
		setEditingId(null)
		setEditName('')
		setEditMarkdown('')
	}

	const cancelEditing = () => {
		setEditingId(null)
		setEditName('')
		setEditMarkdown('')
	}

	return (
		<Box sx={{ maxWidth: '47rem' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 1,
				}}
			>
				<SectionHeader>Companions</SectionHeader>
				<Tooltip title="Add Companion">
					<Button
						variant="contained"
						startIcon={<Add />}
						onClick={addCompanion}
					>
						Add Companion
					</Button>
				</Tooltip>
			</Box>

			{companions.length > 0 && (
				<DynamicList droppableId="companions" onDragEnd={onCompanionReorder}>
					{companions.map((companion, index) => (
						<DynamicListItem key={companion.id} id={companion.id} index={index}>
							<Accordion 
								expanded={expandedAccordions.has(companion.id)}
								onChange={() => handleAccordionToggle(companion.id)}
							>
								<AccordionSummary expandIcon={<ExpandMore />}>
									<Box
										sx={{
											display: 'flex',
											alignItems: 'center',
											gap: 2,
											flex: 1,
											mr: 2,
										}}
									>
										{editingId === companion.id ? (
											<TextField
												value={editName}
												onChange={(e) => setEditName(e.target.value)}
												size="small"
												variant="outlined"
												placeholder="Companion Name"
												onClick={(e) => e.stopPropagation()}
												sx={{ flex: 1 }}
											/>
										) : (
											<Typography variant="h6" sx={{ flex: 1 }}>
												{companion.name || 'Unnamed Companion'}
											</Typography>
										)}

										{/* HP Fields */}
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
											<TextField
												label="Current HP"
												type="number"
												size="small"
												value={companion.currentHP || 0}
												onChange={(e) => {
													e.stopPropagation()
													handleCurrentHPChange(companion.id, e.target.value)
												}}
												onClick={(e) => e.stopPropagation()}
												sx={{ width: 80 }}
											/>
											<Typography>/</Typography>
											<TextField
												label="Max HP"
												type="number"
												size="small"
												value={companion.maxHP || 0}
												onChange={(e) => {
													e.stopPropagation()
													handleMaxHPChange(companion.id, e.target.value)
												}}
												onClick={(e) => e.stopPropagation()}
												sx={{ width: 80 }}
											/>
										</Box>

										{/* Wounded Checkbox */}
										<FormControlLabel
											control={
												<Checkbox
													checked={companion.wounded || false}
													onChange={(e) => {
														e.stopPropagation()
														handleWoundedChange(companion.id, e.target.checked)
													}}
													onClick={(e) => e.stopPropagation()}
												/>
											}
											label="Wounded"
											onClick={(e) => e.stopPropagation()}
										/>

										{/* Action Buttons */}
										<Box sx={{ display: 'flex', gap: 0.5 }}>
											{editingId === companion.id ? (
												<>
													<Tooltip title="Save Changes">
														<IconButton
															onClick={(e) => {
																e.stopPropagation()
																saveEditing()
															}}
															color="primary"
															size="small"
														>
															<Save />
														</IconButton>
													</Tooltip>
													<Tooltip title="Cancel Edit">
														<IconButton
															onClick={(e) => {
																e.stopPropagation()
																cancelEditing()
															}}
															size="small"
														>
															<Cancel />
														</IconButton>
													</Tooltip>
												</>
											) : (
												<Tooltip title="Edit Companion">
													<IconButton
														onClick={(e) => {
															e.stopPropagation()
															startEditing(companion)
														}}
														size="small"
													>
														<Edit />
													</IconButton>
												</Tooltip>
											)}
											<Tooltip title="Delete Companion">
												<IconButton
													onClick={(e) => {
														e.stopPropagation()
														handleDeleteClick(companion)
													}}
													color="error"
													size="small"
												>
													<Delete />
												</IconButton>
											</Tooltip>
										</Box>
									</Box>
								</AccordionSummary>
								<AccordionDetails>
									{editingId === companion.id ? (
										<TextField
											multiline
											rows={10}
											fullWidth
											value={editMarkdown}
											onChange={(e) => setEditMarkdown(e.target.value)}
											placeholder="Enter companion description in Markdown..."
											variant="outlined"
										/>
									) : (
										<Box
											sx={{ '& .markdown-content': { fontSize: '0.875rem' } }}
										>
											<ReactMarkdown remarkPlugins={[remarkGfm]}>
												{companion.markdown || 'No description available.'}
											</ReactMarkdown>
										</Box>
									)}
								</AccordionDetails>
							</Accordion>
						</DynamicListItem>
					))}
				</DynamicList>
			)}

			{companions.length === 0 && (
				<Typography
					variant="body1"
					color="text.secondary"
					sx={{ textAlign: 'center', py: 4 }}
				>
					No companions added yet. Click "Add Companion" to get started.
				</Typography>
			)}

			{/* Delete Confirmation Dialog */}
			<Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
				<DialogTitle>Delete Companion</DialogTitle>
				<DialogContent>
					<Typography>
						Are you sure you want to delete this companion? This action cannot
						be undone.
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDeleteCancel}>Cancel</Button>
					<Button
						onClick={handleDeleteConfirm}
						color="error"
						variant="contained"
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

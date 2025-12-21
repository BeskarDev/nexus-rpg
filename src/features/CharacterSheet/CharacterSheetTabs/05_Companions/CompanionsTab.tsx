import { Add, HelpOutline, Info, Build } from '@mui/icons-material'
import {
	Box,
	Button,
	Typography,
	Tooltip,
	IconButton,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from '@mui/material'
import React, { useState, useMemo } from 'react'
import { DropResult } from '@hello-pangea/dnd'
import { Provider } from 'react-redux'
import { setupCompanionBuilderStore } from '@site/src/features/CompanionBuilder/store'
import { SectionHeader } from '../../CharacterSheet'
import { Companion } from '../../../../types/Character'
import { useAppSelector } from '../../hooks/useAppSelector'
import { DynamicList } from '@site/src/components/DynamicList/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { CompanionAccordion } from './components/CompanionAccordion'
import { DeleteCompanionDialog } from './components/DeleteCompanionDialog'
import { useCompanionActions } from './hooks/useCompanionActions'
import { useAccordionState } from './hooks/useAccordionState'
import { CompanionBuilder } from '@site/src/components/CompanionBuilder'

const companionBuilderStore = setupCompanionBuilderStore()

export const CompanionsTab: React.FC = () => {
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const companions = useMemo(
		() => activeCharacter?.companions || [],
		[activeCharacter],
	)

	// Custom hooks for managing state and actions
	const {
		addCompanion,
		deleteCompanion,
		updateCompanion,
		updateCompanionWithAutoHP,
		reorderCompanions,
	} = useCompanionActions()

	const {
		expandedAccordions,
		toggleAccordion,
		expandAccordion,
		expandNewCompanion,
	} = useAccordionState(companions)

	// Edit state
	const [editingId, setEditingId] = useState<string | null>(null)
	const [editName, setEditName] = useState('')
	const [editMarkdown, setEditMarkdown] = useState('')

	// Delete dialog state
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [companionToDelete, setCompanionToDelete] = useState<string | null>(
		null,
	)

	const handleAddCompanion = () => {
		const newCompanionId = addCompanion()
		// Start editing the new companion
		setEditingId(newCompanionId)
		setEditName('New Companion')
		setEditMarkdown('')
		// Auto-expand the new companion's accordion
		expandNewCompanion(newCompanionId)
	}

	const handleDeleteConfirm = () => {
		if (companionToDelete) {
			deleteCompanion(companionToDelete, companions)
			setEditingId(null)
			setEditName('')
			setEditMarkdown('')
		}
		setDeleteDialogOpen(false)
		setCompanionToDelete(null)
	}

	const handleDeleteCancel = () => {
		setDeleteDialogOpen(false)
		setCompanionToDelete(null)
	}

	const onCompanionReorder = ({ source, destination }: DropResult) => {
		if (!destination) return
		reorderCompanions(source.index, destination.index)
	}

	const handleDeleteClick = (companion: Companion) => {
		setCompanionToDelete(companion.id)
		setDeleteDialogOpen(true)
	}

	const handleCurrentHPChange = (companionId: string, value: string) => {
		const newValue = parseInt(value) || 0
		updateCompanion(companionId, { currentHP: newValue })
	}

	const handleMaxHPChange = (companionId: string, value: string) => {
		const newValue = parseInt(value) || 0
		updateCompanion(companionId, { maxHP: newValue })
	}

	const handleWoundedChange = (companionId: string, wounded: boolean) => {
		updateCompanion(companionId, { wounded })
	}

	const startEditing = (companion: Companion) => {
		setEditingId(companion.id)
		setEditName(companion.name)
		setEditMarkdown(companion.markdown)
		// Auto-expand the accordion when editing starts
		expandAccordion(companion.id)
	}

	const saveEditing = () => {
		if (!editingId) return

		const companion = companions.find((c) => c.id === editingId)
		if (companion) {
			const updates = { name: editName, markdown: editMarkdown }
			updateCompanionWithAutoHP(editingId, updates, companion.currentHP)
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

	const handleImportFromBuilder = (name: string, markdown: string) => {
		// Create a new companion with the imported data
		const newCompanionId = addCompanion()

		// Update the new companion with the imported data
		updateCompanionWithAutoHP(newCompanionId, { name, markdown })

		// Auto-expand the new companion's accordion and start editing
		expandNewCompanion(newCompanionId)
		setEditingId(newCompanionId)
		setEditName(name)
		setEditMarkdown(markdown)
	}

	return (
		<Box sx={{ maxWidth: 'var(--cs-max-width-lg)' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					mb: 1,
				}}
			>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<SectionHeader sx={{ mb: 0 }}>Companions</SectionHeader>
					<Tooltip
						title="You can import companions from the Companion Builder in the Mounts & Companions section. Simply copy the generated markdown and paste it into a companion's description field."
						arrow
						placement="right"
					>
						<HelpOutline fontSize="small" />
					</Tooltip>
				</Box>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Tooltip title="Use the Companion Builder to create stat blocks">
						<span>
							<Provider store={companionBuilderStore}>
								<CompanionBuilder
									showImportButton={true}
									onImportCompanion={handleImportFromBuilder}
								/>
							</Provider>
						</span>
					</Tooltip>
					<Tooltip title="Add a new companion to your character sheet">
						<Button
							variant="contained"
							startIcon={<Add />}
							onClick={handleAddCompanion}
						>
							Add Companion
						</Button>
					</Tooltip>
				</Box>
			</Box>{' '}
			{companions.length > 0 && (
				<DynamicList droppableId="companions" onDragEnd={onCompanionReorder}>
					{companions.map((companion, index) => (
						<DynamicListItem key={companion.id} id={companion.id} index={index}>
							<CompanionAccordion
								companion={companion}
								isExpanded={expandedAccordions.has(companion.id)}
								editingId={editingId}
								editName={editName}
								editMarkdown={editMarkdown}
								onToggle={toggleAccordion}
								onEditNameChange={setEditName}
								onEditMarkdownChange={setEditMarkdown}
								onCurrentHPChange={handleCurrentHPChange}
								onMaxHPChange={handleMaxHPChange}
								onWoundedChange={handleWoundedChange}
								onStartEditing={startEditing}
								onSaveEditing={saveEditing}
								onCancelEditing={cancelEditing}
								onDeleteClick={handleDeleteClick}
							/>
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
					No companions added yet. Use the "Companion Builder" to create stat
					blocks or click "Add Companion" to start manually.
				</Typography>
			)}
			{/* Delete Confirmation Dialog */}
			<DeleteCompanionDialog
				open={deleteDialogOpen}
				onConfirm={handleDeleteConfirm}
				onCancel={handleDeleteCancel}
			/>
		</Box>
	)
}

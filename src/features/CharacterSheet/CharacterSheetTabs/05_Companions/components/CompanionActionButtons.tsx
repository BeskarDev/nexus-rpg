import {
	Edit,
	Save,
	Cancel,
	Delete,
	Check,
	CheckOutlined,
	CheckCircle,
} from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { Companion } from '../../../../../types/Character'

interface CompanionActionButtonsProps {
	companion: Companion
	editingId: string | null
	onStartEditing: (companion: Companion) => void
	onSaveEditing: () => void
	onCancelEditing: () => void
	onDeleteClick: (companion: Companion) => void
}

export const CompanionActionButtons: React.FC<CompanionActionButtonsProps> = ({
	companion,
	editingId,
	onStartEditing,
	onSaveEditing,
	onCancelEditing,
	onDeleteClick,
}) => {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			{editingId === companion.id ? (
				<>
					<Tooltip title="Save Changes">
						<IconButton
							onClick={(e) => {
								e.stopPropagation()
								onSaveEditing()
							}}
							size="small"
						>
							<CheckCircle />
						</IconButton>
					</Tooltip>
					<Tooltip title="Cancel Edit">
						<IconButton
							onClick={(e) => {
								e.stopPropagation()
								onCancelEditing()
							}}
							size="small"
							sx={{ ml: 0.5 }}
						>
							<Cancel />
						</IconButton>
					</Tooltip>
					<Tooltip title="Delete Companion">
						<IconButton
							onClick={(e) => {
								e.stopPropagation()
								onDeleteClick(companion)
							}}
							color="error"
							size="small"
							sx={{ ml: 1 }}
						>
							<Delete />
						</IconButton>
					</Tooltip>
				</>
			) : (
				<Box sx={{ display: 'flex', alignItems: 'center' }}>
					<Tooltip title="Edit Companion">
						<IconButton
							onClick={(e) => {
								e.stopPropagation()
								onStartEditing(companion)
							}}
							size="small"
						>
							<Edit />
						</IconButton>
					</Tooltip>
				</Box>
			)}
		</Box>
	)
}

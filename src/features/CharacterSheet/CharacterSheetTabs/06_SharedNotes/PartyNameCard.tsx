import React, { useState } from 'react'
import { Box, TextField, IconButton, Tooltip } from '@mui/material'
import { Groups, Edit, Save, Cancel } from '@mui/icons-material'
import { CharacterSheetCard, CardHeader } from '../../components'
import { UI_COLORS } from '../../../../utils/colors'

interface PartyNameCardProps {
	partyName: string
	onSave: (newName: string) => Promise<void>
	loading?: boolean
}

export const PartyNameCard: React.FC<PartyNameCardProps> = ({
	partyName,
	onSave,
	loading = false,
}) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editedName, setEditedName] = useState(partyName)

	const handleEdit = () => {
		setEditedName(partyName)
		setIsEditing(true)
	}

	const handleSave = async () => {
		if (!editedName.trim()) return
		await onSave(editedName.trim())
		setIsEditing(false)
	}

	const handleCancel = () => {
		setIsEditing(false)
		setEditedName(partyName)
	}

	return (
		<CharacterSheetCard
			header={<CardHeader icon={<Groups />} label="Party" color={UI_COLORS.greyBlue} />}
			tooltip="Adventuring party name"
			minWidth="12rem"
			maxWidth="20rem"
		>
			{isEditing ? (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, width: '100%' }}>
					<TextField
						variant="standard"
						size="small"
						value={editedName}
						onChange={(e) => setEditedName(e.target.value)}
						disabled={loading}
						autoFocus
						InputProps={{
							disableUnderline: true,
							sx: {
								fontSize: '0.95rem',
								fontWeight: 'bold',
								flex: 1,
								'& input': {
									textAlign: 'center',
									p: 0.5,
								},
							},
						}}
						sx={{ flex: 1 }}
					/>
					<Tooltip title="Save">
						<IconButton
							onClick={handleSave}
							disabled={!editedName.trim() || loading}
							color="primary"
							size="small"
							sx={{ p: 0.25 }}
						>
							<Save sx={{ fontSize: '1rem' }} />
						</IconButton>
					</Tooltip>
					<Tooltip title="Cancel">
						<IconButton
							onClick={handleCancel}
							disabled={loading}
							size="small"
							sx={{ p: 0.25 }}
						>
							<Cancel sx={{ fontSize: '1rem' }} />
						</IconButton>
					</Tooltip>
				</Box>
			) : (
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, width: '100%' }}>
					<Box
						sx={{
							flex: 1,
							fontSize: '0.95rem',
							fontWeight: 'bold',
							textAlign: 'center',
							py: 0.5,
						}}
					>
						{partyName}
					</Box>
					<Tooltip title="Edit party name">
						<IconButton
							onClick={handleEdit}
							disabled={loading}
							size="small"
							sx={{ p: 0.25 }}
						>
							<Edit sx={{ fontSize: '1rem' }} />
						</IconButton>
					</Tooltip>
				</Box>
			)}
		</CharacterSheetCard>
	)
}

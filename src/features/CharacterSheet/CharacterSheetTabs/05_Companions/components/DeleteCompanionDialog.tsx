import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Typography,
} from '@mui/material'
import React from 'react'

interface DeleteCompanionDialogProps {
	open: boolean
	onConfirm: () => void
	onCancel: () => void
}

export const DeleteCompanionDialog: React.FC<DeleteCompanionDialogProps> = ({
	open,
	onConfirm,
	onCancel,
}) => {
	return (
		<Dialog open={open} onClose={onCancel}>
			<DialogTitle>Delete Companion</DialogTitle>
			<DialogContent>
				<Typography>
					Are you sure you want to delete this companion? This action cannot be
					undone.
				</Typography>
			</DialogContent>
			<DialogActions>
				<Button onClick={onCancel}>Cancel</Button>
				<Button onClick={onConfirm} color="error" variant="contained">
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	)
}

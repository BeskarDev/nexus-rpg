import React from 'react'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material'

export interface ConfirmationDialogProps {
	open: boolean
	onClose: () => void
	onConfirm: () => void
	title: string
	message: string
	confirmText?: string
	cancelText?: string
	confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
	open,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	confirmColor = 'primary',
}) => {
	const handleConfirm = () => {
		onConfirm()
		onClose()
	}

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="inherit">
					{cancelText}
				</Button>
				<Button onClick={handleConfirm} color={confirmColor} variant="contained">
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	)
}
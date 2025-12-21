import { Delete, Warning } from '@mui/icons-material'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from '@mui/material'
import React from 'react'

export type DeleteButtonProps = {
	handleDeleteCharacter: () => void
	characterName?: string
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
	handleDeleteCharacter,
	characterName,
}) => {
	const [open, setOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleAbort = () => {
		setOpen(false)
	}

	const handleConfirm = async () => {
		handleDeleteCharacter()
		setOpen(false)
	}

	return (
		<>
			<IconButton edge="end" aria-label="delete" onClick={handleOpen}>
				<Delete />
			</IconButton>
			<Dialog
				open={open}
				onClose={handleAbort}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle
					id="alert-dialog-title"
					sx={{
						borderBottom: 1,
						borderColor: 'divider',
						mb: 2,
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<Warning />
					{'Remove Character'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						{characterName
							? `Are you sure you want to delete "${characterName}"?`
							: 'Are you sure you want to delete that character?'}
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ p: 2 }}>
					<Button onClick={handleAbort}>No</Button>
					<Button
						variant="contained"
						color="error"
						onClick={handleConfirm}
						autoFocus
					>
						Yes
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

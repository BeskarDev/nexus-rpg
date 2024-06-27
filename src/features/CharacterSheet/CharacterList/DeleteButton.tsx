import React, { useState } from 'react'
import {
	Avatar,
	AvatarProps,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material'
import { Delete, Person, Warning } from '@mui/icons-material'
import { LoginComponent } from '@site/src/components/LoginComponent'
import { Character } from './CharacterList'
import { deleteDoc } from 'firebase/firestore'

export type DeleteButtonProps = {
	char: Character
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ char }) => {
	const [open, setOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleAbort = () => {
		setOpen(false)
	}

	const handleConfirm = async () => {
		await deleteDoc(char.docRef)
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
						Are you sure you want to delete that character?
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

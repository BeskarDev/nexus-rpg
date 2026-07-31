import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'
import { ConfirmDialog } from '../components/ConfirmDialog'

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
			{/* One confirm shape across the sheet (M13 S8). The `Warning` icon in the
				title bar and the Yes/No pair are gone: the caution band says the same
				thing in the sheet's own register, and a named verb says what the press
				does without the reader having to have read the question. */}
			<ConfirmDialog
				open={open}
				title="Remove character"
				confirmLabel="Delete character"
				onConfirm={handleConfirm}
				onCancel={handleAbort}
			>
				{characterName
					? `Deleting “${characterName}” removes the character permanently. This cannot be undone.`
					: 'Deleting this character removes it permanently. This cannot be undone.'}
			</ConfirmDialog>
		</>
	)
}

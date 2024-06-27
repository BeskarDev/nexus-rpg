import {
	Box,
	Tabs,
	Tab,
	Button,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	IconButton,
	Link,
} from '@mui/material'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import React, { useEffect } from 'react'
import { UserAvatar } from './UserAvatar'
import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import { db } from '@site/src/config/firebase'
import { Reply, Star } from '@mui/icons-material'

const MAX_NAME_LENGTH = 1_000

export type CharacterSheetHeaderProps = {
	active: boolean
	activeName?: string
}

export const CharacterSheetHeader: React.FC<CharacterSheetHeaderProps> = ({
	active,
	activeName,
}) => {
	const { userLoggedIn, currentUser } = useAuth()
	const [open, setOpen] = React.useState(false)
	const [name, setName] = React.useState('')

	const handleOpen = () => {
		setOpen(true)
	}

	const handleAbort = () => {
		setOpen(false)
	}

	const handleConfirm = async () => {
		createNewCharacter()
		setOpen(false)
	}

	const createNewCharacter = async () => {
		try {
			const userUid = currentUser.uid
			const collectionRef = collection(db, userUid)
			await addDoc(collectionRef, { name })
			setName('')
			setOpen(false)
			window.location.href = window.location.href.split('?')[0]
		} catch (error) {
			console.error('Error creating document: ', error)
		}
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					borderBottom: 1,
					borderColor: 'divider',
					alignItems: 'center',
					pb: 1,
					mb: 2,
				}}
			>
				{active && (
					<Link href={window.location.href.split('?')[0]}>
						<IconButton>
							<Reply />
						</IconButton>
					</Link>
				)}
				<Typography variant="h5">
					{!active && 'Your Characters'}
					{active && activeName}
				</Typography>
				<Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
					{!active && (
						<Button
							variant="outlined"
							size="small"
							disabled={!userLoggedIn}
							onClick={handleOpen}
						>
							new character
						</Button>
					)}
					<UserAvatar />
				</Box>
			</Box>
			<Dialog
				open={open}
				onClose={handleAbort}
				fullWidth
				maxWidth="xs"
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
					<Star />
					{'New Character'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description" sx={{ mb: 2 }}>
						What's your characters name?
					</DialogContentText>
					<TextField
						required
						fullWidth
						type="text"
						label="character name"
						placeholder="type your character's name"
						value={name}
						onChange={(e) => {
							if (e.target.value.length <= MAX_NAME_LENGTH) {
								setName(e.target.value)
							}
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault()
								handleConfirm()
							}
						}}
						InputLabelProps={{ shrink: true }}
					/>
				</DialogContent>
				<DialogActions sx={{ p: 2 }}>
					<Button onClick={handleAbort}>Cancel</Button>
					<Button
						variant="contained"
						disabled={!name}
						onClick={handleConfirm}
						autoFocus
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

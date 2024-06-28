import { useColorMode } from '@docusaurus/theme-common'
import { Reply, Save, Star } from '@mui/icons-material'
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Link,
	TextField,
	Typography,
} from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { UserAvatar } from './UserAvatar'
import { createInitialCharacter } from './utils/createInitialCharacter'

const MAX_NAME_LENGTH = 1_000

export type CharacterSheetHeaderProps = {
	active: boolean
	activeName?: string
	unsavedChanges: boolean
	saveCharacter: () => void
	loadingSave: boolean
}

export const CharacterSheetHeader: React.FC<CharacterSheetHeaderProps> = ({
	active,
	activeName,
	unsavedChanges,
	saveCharacter,
	loadingSave,
}) => {
	const { userLoggedIn, currentUser } = useAuth()
	const { colorMode } = useColorMode()
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
			await addDoc(collectionRef, createInitialCharacter(name))
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
					position: 'sticky',
					top: '60px',
					zIndex: 100,
					backgroundColor:
						colorMode === 'dark' ? 'var(--ifm-background-color)' : 'white',
					display: 'flex',
					gap: 2,
					borderBottom: 1,
					borderColor: 'divider',
					alignItems: 'center',
					py: 1,
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
				<Typography
					variant="h6"
					sx={{
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}}
				>
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
					{active && (
						<IconButton disabled={!unsavedChanges} onClick={saveCharacter}>
							{loadingSave ? <CircularProgress size={20} /> : <Save />}
						</IconButton>
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

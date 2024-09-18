import { useColorMode } from '@docusaurus/theme-common'
import { Download, Reply, Save, Star } from '@mui/icons-material'
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
	Tooltip,
	Typography,
} from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import { addDoc, collection } from 'firebase/firestore'
import React from 'react'
import { useAppSelector } from './hooks/useAppSelector'
import { UserAvatar } from './UserAvatar'
import { createInitialCharacter } from './utils/createInitialCharacter'
import { downloadFile } from './utils/donwloadFile'
import { Character, CharacterDocument } from '@site/src/types/Character'

const MAX_NAME_LENGTH = 1_000

export type CharacterSheetHeaderProps = {
	activeCharacterId: string
	saveCharacter: () => void
}

export const CharacterSheetHeader: React.FC<CharacterSheetHeaderProps> = ({
	activeCharacterId,
	saveCharacter,
}) => {
	const { userLoggedIn, currentUser } = useAuth()
	const { activeCharacter, loadingSave, unsavedChanges } = useAppSelector(
		(state) => state.characterSheet,
	)

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

	const downloadCharacter = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		downloadFile({
			data: JSON.stringify({
				...activeCharacter,
				docId: undefined,
				docRef: undefined,
			} as CharacterDocument),
			fileName: `${activeCharacter.personal.name.replaceAll(' ', '_')}-nexus-character-sheet.json`,
			fileType: 'text/json',
		})
	}

	return (
		<>
			<Box
				sx={{
					position: 'sticky',
					top: '60px',
					zIndex: 100,
					backgroundColor: 'var(--ifm-background-color)',
					display: 'flex',
					gap: 2,
					borderBottom: 1,
					borderColor: 'divider',
					alignItems: 'center',
					py: 1,
					mb: 2,
				}}
			>
				{activeCharacterId && (
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
					{!activeCharacterId && 'Your Characters'}
					{activeCharacterId && activeCharacter?.personal.name}
				</Typography>
				<Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
					{!activeCharacterId && (
						<Button
							variant="outlined"
							size="small"
							disabled={!userLoggedIn}
							onClick={handleOpen}
						>
							new character
						</Button>
					)}
					{activeCharacterId && (
						<>
							<Tooltip title="save character">
								<span>
									<IconButton
										disabled={!unsavedChanges}
										onClick={saveCharacter}
									>
										{loadingSave ? <CircularProgress size={20} /> : <Save />}
									</IconButton>
								</span>
							</Tooltip>
							<Tooltip title="download character">
								<IconButton onClick={downloadCharacter}>
									<Download />
								</IconButton>
							</Tooltip>
						</>
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

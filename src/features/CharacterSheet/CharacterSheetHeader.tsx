import { ArrowBackIosNew, ChevronLeft, Download, Reply, Save, Star, Upload } from '@mui/icons-material'
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  IconButton,
  Link,
  TextField,
  Tooltip,
  Typography,
  Alert,
  Divider,
} from '@mui/material'
import { db } from '@site/src/config/firebase'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import { CharacterDocument } from '@site/src/types/Character'
import { addDoc, collection, doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { Character } from '@site/src/types/Character'
import { useAppSelector } from './hooks/useAppSelector'
import { UserAvatar } from './UserAvatar'
import { calculateCharacterLevel } from './utils/calculateCharacterLevel'
import { createInitialCharacter } from './utils/createInitialCharacter'
import { downloadFile } from './utils/donwloadFile'
import { downloadAllCharacters } from './utils/downloadAllCharacters'

const MAX_NAME_LENGTH = 1_000

export type CharacterSheetHeaderProps = {
	activeCharacterId: string
	saveCharacter: () => void
	characters: CharacterDocument[]
}

export const CharacterSheetHeader: React.FC<CharacterSheetHeaderProps> = ({
	activeCharacterId,
	saveCharacter,
	characters,
}) => {
	const { userLoggedIn, currentUser } = useAuth()
	const { activeCharacter, loadingSave, unsavedChanges } = useAppSelector(
		(state) => state.characterSheet,
	)

	const [open, setOpen] = React.useState(false)
	const [name, setName] = React.useState('')
	const [includeStartingGear, setIncludeStartingGear] = React.useState(false)
	const [downloadingAll, setDownloadingAll] = React.useState(false)
	const [importedCharacter, setImportedCharacter] = React.useState<Character | null>(null)
	const [importError, setImportError] = React.useState<string | null>(null)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleAbort = () => {
		setOpen(false)
		setName('')
		setIncludeStartingGear(false)
		setImportedCharacter(null)
		setImportError(null)
	}

	const handleConfirm = async () => {
		createNewCharacter()
		setOpen(false)
	}

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (!file) return

		// Reset previous state
		setImportError(null)
		setImportedCharacter(null)

		const reader = new FileReader()
		reader.onload = (e) => {
			try {
				const jsonString = e.target?.result as string
				const parsedCharacter = JSON.parse(jsonString) as Character

				// Basic validation to ensure it's a character object
				if (!parsedCharacter.personal?.name) {
					throw new Error('Invalid character file: missing character name')
				}

				if (!parsedCharacter.personal?.playerName) {
					throw new Error('Invalid character file: missing player name')
				}

				// Set the imported character and auto-fill the name
				setImportedCharacter(parsedCharacter)
				setName(parsedCharacter.personal.name)
				setImportError(null)

			} catch (error) {
				console.error('Error parsing character file:', error)
				setImportError('Invalid character file. Please select a valid Nexus RPG character JSON file.')
				setImportedCharacter(null)
				setName('')
			}
		}

		reader.onerror = () => {
			setImportError('Error reading file. Please try again.')
			setImportedCharacter(null)
			setName('')
		}

		reader.readAsText(file)
	}

	const createNewCharacter = async () => {
		try {
			const userUid = currentUser.uid
			const collectionRef = collection(db, userUid)
      
      const playerName = (await getDoc(doc(db, userUid, 'player-info'))).data()?.name || 'Unknown'

			let characterData: Character

			if (importedCharacter) {
				// Use imported character data but update player name to current user
				characterData = {
					...importedCharacter,
					personal: {
						...importedCharacter.personal,
						name: name, // Use the name from the input field (allows user to modify)
						playerName: playerName, // Set to current user's player name
					}
				}
			} else {
				// Create new character from scratch
				characterData = createInitialCharacter(name, playerName, includeStartingGear)
			}

			await addDoc(collectionRef, characterData)
			setName('')
			setIncludeStartingGear(false)
			setImportedCharacter(null)
			setImportError(null)
			setOpen(false)
			window.location.href = window.location.href.split('?')[0]
		} catch (error) {
			console.error('Error creating document: ', error)
			setImportError('Error creating character. Please try again.')
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

	const downloadAllCharactersAsZip = async (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault()
		setDownloadingAll(true)
		try {
			await downloadAllCharacters(characters)
		} finally {
			setDownloadingAll(false)
		}
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
							<ArrowBackIosNew />
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
					{activeCharacterId &&
						activeCharacter &&
						`${activeCharacter?.personal.name} (Level ${calculateCharacterLevel(activeCharacter?.skills.xp.spend)})`}
				</Typography>
				<Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
					{!activeCharacterId && (
						<>
							<Tooltip title={`Download all ${characters.length} character${characters.length !== 1 ? 's' : ''} as ZIP`}>
								<span>
									<IconButton 
										disabled={!userLoggedIn || characters.length === 0 || downloadingAll}
										onClick={downloadAllCharactersAsZip}
									>
										{downloadingAll ? <CircularProgress size={20} /> : <Download />}
									</IconButton>
								</span>
							</Tooltip>
							<Button
								variant="outlined"
								size="small"
								disabled={!userLoggedIn}
								onClick={handleOpen}
							>
								new character
							</Button>
						</>
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
						{importedCharacter 
							? `Import and customize "${importedCharacter.personal.name}"` 
							: "What's your characters name?"
						}
					</DialogContentText>

					{!importedCharacter && (
						<>
							<Box sx={{ mb: 2 }}>
								<Button
									variant="outlined"
									component="label"
									startIcon={<Upload />}
									fullWidth
									sx={{ mb: 1 }}
								>
									Upload Character JSON
									<input
										type="file"
										accept=".json"
										hidden
										onChange={handleFileUpload}
									/>
								</Button>
								<Typography variant="caption" color="text.secondary">
									Import a previously exported Nexus RPG character
								</Typography>
							</Box>

							<Divider sx={{ my: 2 }}>
								<Typography variant="caption" color="text.secondary">
									OR
								</Typography>
							</Divider>
						</>
					)}

					{importError && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{importError}
						</Alert>
					)}

					<TextField
						required
						fullWidth
						type="text"
						label="character name"
						placeholder={importedCharacter ? "Modify character name" : "type your character's name"}
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

					{!importedCharacter && (
						<FormControlLabel
							control={
								<Checkbox
									checked={includeStartingGear}
									onChange={(e) => setIncludeStartingGear(e.target.checked)}
								/>
							}
							label="Include starting gear from character creation"
							sx={{ mt: 1 }}
						/>
					)}

					{importedCharacter && (
						<>
							<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
								✓ Character data loaded successfully
							</Typography>
							<Box sx={{ mt: 1 }}>
								<Button 
									variant="text" 
									size="small"
									onClick={() => {
										setImportedCharacter(null)
										setName('')
										setImportError(null)
									}}
								>
									Start over with new character
								</Button>
							</Box>
						</>
					)}
				</DialogContent>
				<DialogActions sx={{ p: 2 }}>
					<Button onClick={handleAbort}>Cancel</Button>
					<Button
						variant="contained"
						disabled={!name}
						onClick={handleConfirm}
						autoFocus
					>
						{importedCharacter ? 'Import Character' : 'Create Character'}
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

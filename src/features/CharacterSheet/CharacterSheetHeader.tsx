import {
	ArrowBackIosNew,
	ChevronLeft,
	Download,
	Reply,
	Save,
	Star,
	Upload,
} from '@mui/icons-material'
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
import { createInitialCharacter, CharacterCreationOptions } from './utils/createInitialCharacter'
import { downloadFile } from './utils/donwloadFile'
import { downloadAllCharacters } from './utils/downloadAllCharacters'
import { logger } from './utils'
import { 
	FolkSelectionDialog, 
	UpbringingSelectionDialog, 
	BackgroundSelectionDialog,
	FolkData,
	UpbringingData,
	BackgroundData
} from './components'

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
	const [includeStartingGear, setIncludeStartingGear] = React.useState(true)
	const [downloadingAll, setDownloadingAll] = React.useState(false)
	const [importedCharacter, setImportedCharacter] =
		React.useState<Character | null>(null)
	const [importError, setImportError] = React.useState<string | null>(null)

	// Character creation selection states
	const [selectedFolk, setSelectedFolk] = React.useState<FolkData | null>(null)
	const [selectedUpbringing, setSelectedUpbringing] = React.useState<UpbringingData | null>(null)
	const [selectedBackground, setSelectedBackground] = React.useState<BackgroundData | null>(null)
	
	// Dialog states
	const [folkDialogOpen, setFolkDialogOpen] = React.useState(false)
	const [upbringingDialogOpen, setUpbringingDialogOpen] = React.useState(false)
	const [backgroundDialogOpen, setBackgroundDialogOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleAbort = () => {
		setOpen(false)
		setName('')
		setIncludeStartingGear(true)
		setImportedCharacter(null)
		setImportError(null)
		// Reset selection states
		setSelectedFolk(null)
		setSelectedUpbringing(null)
		setSelectedBackground(null)
		// Close all dialogs
		setFolkDialogOpen(false)
		setUpbringingDialogOpen(false)
		setBackgroundDialogOpen(false)
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
				logger.error('Error parsing character file', error)
				setImportError(
					'Invalid character file. Please select a valid Nexus RPG character JSON file.',
				)
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

			const playerName =
				(await getDoc(doc(db, userUid, 'player-info'))).data()?.name ||
				'Unknown'

			let characterData: Character

			if (importedCharacter) {
				// Use imported character data but update player name to current user
				characterData = {
					...importedCharacter,
					personal: {
						...importedCharacter.personal,
						name: name, // Use the name from the input field (allows user to modify)
						playerName: playerName, // Set to current user's player name
					},
				}
			} else {
				// Create new character from scratch
				const options: CharacterCreationOptions = {
					includeStartingGear,
					folk: selectedFolk || undefined,
					upbringing: selectedUpbringing || undefined,
					background: selectedBackground || undefined,
				}
				characterData = createInitialCharacter(name, playerName, options)
			}

			await addDoc(collectionRef, characterData)
			setName('')
			setIncludeStartingGear(true)
			setImportedCharacter(null)
			setImportError(null)
			// Reset selections
			setSelectedFolk(null)
			setSelectedUpbringing(null)
			setSelectedBackground(null)
			setOpen(false)
			window.location.href = window.location.href.split('?')[0]
		} catch (error) {
			logger.error('Error creating document', error)
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

	const downloadAllCharactersAsZip = async (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
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
							<Tooltip
								title={`Download all ${characters.length} character${characters.length !== 1 ? 's' : ''} as ZIP`}
							>
								<span>
									<IconButton
										disabled={
											!userLoggedIn || characters.length === 0 || downloadingAll
										}
										onClick={downloadAllCharactersAsZip}
									>
										{downloadingAll ? (
											<CircularProgress size={20} />
										) : (
											<Download />
										)}
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
							: "What's your characters name?"}
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
						placeholder={
							importedCharacter
								? 'Modify character name'
								: "type your character's name"
						}
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
						<>
							<Typography variant="body2" sx={{ mt: 2, mb: 2, fontWeight: 'medium' }}>
								Optional Character Details
							</Typography>
							
							<Box sx={{ display: 'grid', gap: 2, mb: 2 }}>
								{/* Folk Selection */}
								<Box>
									<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
										Folk
									</Typography>
									<Button
										variant="outlined"
										size="small"
										onClick={() => setFolkDialogOpen(true)}
										fullWidth
										sx={{ 
											justifyContent: 'flex-start',
											textTransform: 'none',
											color: selectedFolk ? 'text.primary' : 'text.secondary',
											fontWeight: selectedFolk ? 'medium' : 'normal'
										}}
									>
										{selectedFolk ? selectedFolk.name : 'Select Folk'}
									</Button>
								</Box>
								
								{/* Upbringing Selection */}
								<Box>
									<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
										Upbringing
									</Typography>
									<Button
										variant="outlined"
										size="small"
										onClick={() => setUpbringingDialogOpen(true)}
										fullWidth
										sx={{ 
											justifyContent: 'flex-start',
											textTransform: 'none',
											color: selectedUpbringing ? 'text.primary' : 'text.secondary',
											fontWeight: selectedUpbringing ? 'medium' : 'normal'
										}}
									>
										{selectedUpbringing ? selectedUpbringing.name : 'Select Upbringing'}
									</Button>
								</Box>
								
								{/* Background Selection */}
								<Box>
									<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
										Background
									</Typography>
									<Button
										variant="outlined"
										size="small"
										onClick={() => setBackgroundDialogOpen(true)}
										fullWidth
										sx={{ 
											justifyContent: 'flex-start',
											textTransform: 'none',
											color: selectedBackground ? 'text.primary' : 'text.secondary',
											fontWeight: selectedBackground ? 'medium' : 'normal'
										}}
									>
										{selectedBackground ? selectedBackground.name : 'Select Background'}
									</Button>
								</Box>
							</Box>

							{(selectedFolk || selectedUpbringing || selectedBackground) && (
								<Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
									Selected details will auto-fill abilities, languages, and starting items.
								</Typography>
							)}
						</>
					)}

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

			{/* Selection Dialogs */}
			<FolkSelectionDialog
				open={folkDialogOpen}
				onClose={() => setFolkDialogOpen(false)}
				onSelectFolk={(folk) => {
					setSelectedFolk(folk)
					setFolkDialogOpen(false)
				}}
				selectedFolk={selectedFolk?.name}
			/>

			<UpbringingSelectionDialog
				open={upbringingDialogOpen}
				onClose={() => setUpbringingDialogOpen(false)}
				onSelectUpbringing={(upbringing) => {
					setSelectedUpbringing(upbringing)
					setUpbringingDialogOpen(false)
				}}
				selectedUpbringing={selectedUpbringing?.name}
			/>

			<BackgroundSelectionDialog
				open={backgroundDialogOpen}
				onClose={() => setBackgroundDialogOpen(false)}
				onSelectBackground={(background) => {
					setSelectedBackground(background)
					setBackgroundDialogOpen(false)
				}}
				selectedBackground={selectedBackground?.name}
			/>
		</>
	)
}

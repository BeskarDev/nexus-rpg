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
	Tab,
	Tabs,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
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
import {
	createInitialCharacter,
	CharacterCreationOptions,
} from './utils/createInitialCharacter'
import { downloadFile } from './utils/donwloadFile'
import { downloadAllCharacters } from './utils/downloadAllCharacters'
import { logger } from './utils'
import {
	FolkSelectionDialog,
	UpbringingSelectionDialog,
	BackgroundSelectionDialog,
	ArchetypeSelectionDialog,
	FolkData,
	UpbringingData,
	BackgroundData,
	ArchetypeData,
} from './components'
import upbringingData from '../../utils/json/upbringings.json'
import backgroundData from '../../utils/json/backgrounds.json'

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
	const [activeTab, setActiveTab] = React.useState(0)

	// Character creation selection states
	const [selectedFolk, setSelectedFolk] = React.useState<FolkData | null>(null)
	const [selectedUpbringing, setSelectedUpbringing] =
		React.useState<UpbringingData | null>(null)
	const [selectedBackground, setSelectedBackground] =
		React.useState<BackgroundData | null>(null)
	const [selectedArchetype, setSelectedArchetype] =
		React.useState<ArchetypeData | null>(null)
	const [selectedCompanion, setSelectedCompanion] = React.useState<
		string | null
	>(null)
	const [selectedFamiliar, setSelectedFamiliar] = React.useState<string | null>(
		null,
	)

	// Dialog states
	const [folkDialogOpen, setFolkDialogOpen] = React.useState(false)
	const [upbringingDialogOpen, setUpbringingDialogOpen] = React.useState(false)
	const [backgroundDialogOpen, setBackgroundDialogOpen] = React.useState(false)
	const [archetypeDialogOpen, setArchetypeDialogOpen] = React.useState(false)

	const handleOpen = () => {
		setOpen(true)
	}

	const handleAbort = () => {
		setOpen(false)
		setName('')
		setIncludeStartingGear(true)
		setActiveTab(0)
		setImportedCharacter(null)
		setImportError(null)
		// Reset selection states
		setSelectedFolk(null)
		setSelectedUpbringing(null)
		setSelectedBackground(null)
		setSelectedArchetype(null)
		// Close all dialogs
		setFolkDialogOpen(false)
		setUpbringingDialogOpen(false)
		setBackgroundDialogOpen(false)
		setArchetypeDialogOpen(false)
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
				// Tab 0 (Quick Start) always includes starting gear
				const shouldIncludeGear = activeTab === 0 ? true : includeStartingGear

				const options: CharacterCreationOptions = {
					includeStartingGear: shouldIncludeGear,
					folk: selectedFolk || undefined,
					upbringing: selectedUpbringing || undefined,
					background: selectedBackground || undefined,
					archetype: selectedArchetype || undefined,
					selectedCompanion: selectedCompanion || undefined,
					selectedFamiliar: selectedFamiliar || undefined,
				}
				characterData = createInitialCharacter(name, playerName, options)
			}

			const docRef = await addDoc(collectionRef, characterData)
			setName('')
			setIncludeStartingGear(true)
			setImportedCharacter(null)
			setImportError(null)
			// Reset selections
			setSelectedFolk(null)
			setSelectedUpbringing(null)
			setSelectedBackground(null)
			setSelectedArchetype(null)
			setSelectedCompanion(null)
			setSelectedFamiliar(null)
			setActiveTab(0)
			setOpen(false)

			// Redirect to the newly created character
			const characterId = `${userUid}-${docRef.id}`
			window.location.href = `${window.location.href.split('?')[0]}?id=${characterId}`
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
				maxWidth="sm"
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle
					id="alert-dialog-title"
					sx={{
						borderBottom: 1,
						borderColor: 'divider',
						pb: 1,
						display: 'flex',
						alignItems: 'center',
						gap: 1,
					}}
				>
					<Star />
					{'New Character'}
				</DialogTitle>

				{!importedCharacter && (
					<Tabs
						value={activeTab}
						onChange={(_, newValue) => setActiveTab(newValue)}
						sx={{
							borderBottom: 1,
							borderColor: 'divider',
							px: 3,
						}}
					>
						<Tab label="Quick Start" sx={{ textTransform: 'none' }} />
						<Tab label="Custom" sx={{ textTransform: 'none' }} />
						<Tab label="Blank" sx={{ textTransform: 'none' }} />
						<Tab label="Import" sx={{ textTransform: 'none' }} />
					</Tabs>
				)}

				<DialogContent sx={{ pt: 3 }}>
					{importError && (
						<Alert severity="error" sx={{ mb: 2 }}>
							{importError}
						</Alert>
					)}

					{importedCharacter ? (
						<>
							<DialogContentText sx={{ mb: 2 }}>
								Import and customize "{importedCharacter.personal.name}"
							</DialogContentText>
							<TextField
								required
								fullWidth
								type="text"
								label="Character Name"
								placeholder="Modify character name"
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
								sx={{ mb: 2 }}
							/>
							<Typography variant="body2" color="text.secondary">
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
										setActiveTab(0)
									}}
								>
									Start over with new character
								</Button>
							</Box>
						</>
					) : (
						<>
							{/* Tab 0: Quick Start (Archetype + Folk) */}
							{activeTab === 0 && (
								<Box>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mb: 3 }}
									>
										Choose an archetype for a ready-to-play character with
										pre-selected attributes, skills, and equipment.
									</Typography>

									<TextField
										required
										fullWidth
										type="text"
										label="Character Name"
										placeholder="Enter your character's name"
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
										sx={{ mb: 3 }}
									/>

									<Box sx={{ display: 'grid', gap: 2 }}>
										{/* Archetype Selection */}
										<Box>
											<Typography
												variant="subtitle2"
												sx={{ mb: 1, fontWeight: 'medium' }}
											>
												Archetype *
											</Typography>
											<Button
												variant="outlined"
												onClick={() => setArchetypeDialogOpen(true)}
												fullWidth
												sx={{
													justifyContent: 'flex-start',
													textTransform: 'none',
													py: 1.5,
													color: selectedArchetype
														? 'text.primary'
														: 'text.secondary',
													fontWeight: selectedArchetype ? 'medium' : 'normal',
													borderColor: selectedArchetype
														? 'primary.main'
														: undefined,
													borderWidth: selectedArchetype ? 2 : 1,
												}}
											>
												{selectedArchetype
													? `${selectedArchetype.name} (${selectedArchetype.role})`
													: 'Select Archetype'}
											</Button>
											{selectedArchetype && (
												<Typography
													variant="caption"
													color="text.secondary"
													sx={{ display: 'block', mt: 0.5 }}
												>
													{selectedArchetype.description}
												</Typography>
											)}

											{/* Companion Selection (if archetype has Animal Companion talent) */}
											{selectedArchetype?.recommendedTalents?.includes(
												'Animal Companion',
											) &&
												selectedArchetype?.recommendedCompanions &&
												selectedArchetype.recommendedCompanions.length > 0 && (
													<Box sx={{ mt: 2 }}>
														<FormControl fullWidth>
															<InputLabel id="companion-select-label">
																Animal Companion (Optional)
															</InputLabel>
															<Select
																labelId="companion-select-label"
																value={selectedCompanion || ''}
																onChange={(e) =>
																	setSelectedCompanion(e.target.value || null)
																}
																label="Animal Companion (Optional)"
															>
																<MenuItem value="">
																	<em>None</em>
																</MenuItem>
																{selectedArchetype.recommendedCompanions.map(
																	(companion) => (
																		<MenuItem key={companion} value={companion}>
																			{companion}
																		</MenuItem>
																	),
																)}
															</Select>
														</FormControl>
														<Typography
															variant="caption"
															color="text.secondary"
															sx={{ display: 'block', mt: 0.5 }}
														>
															Your archetype grants you an animal companion to
															aid you in your adventures.
														</Typography>
													</Box>
												)}

											{/* Familiar Selection (if archetype has Conjure Familiar spell) */}
											{selectedArchetype?.spellData?.startingSpells?.some(
												(spell) => spell.name === 'Conjure Familiar',
											) &&
												selectedArchetype?.recommendedFamiliars &&
												selectedArchetype.recommendedFamiliars.length > 0 && (
													<Box sx={{ mt: 2 }}>
														<FormControl fullWidth>
															<InputLabel id="familiar-select-label">
																Familiar (Optional)
															</InputLabel>
															<Select
																labelId="familiar-select-label"
																value={selectedFamiliar || ''}
																onChange={(e) =>
																	setSelectedFamiliar(e.target.value || null)
																}
																label="Familiar (Optional)"
															>
																<MenuItem value="">
																	<em>None</em>
																</MenuItem>
																{selectedArchetype.recommendedFamiliars.map(
																	(familiar) => (
																		<MenuItem key={familiar} value={familiar}>
																			{familiar}
																		</MenuItem>
																	),
																)}
															</Select>
														</FormControl>
														<Typography
															variant="caption"
															color="text.secondary"
															sx={{ display: 'block', mt: 0.5 }}
														>
															Choose a tiny creature to serve as your magical
															familiar and companion.
														</Typography>
													</Box>
												)}
										</Box>

										{/* Folk Selection */}
										<Box>
											<Typography
												variant="subtitle2"
												sx={{ mb: 1, fontWeight: 'medium' }}
											>
												Folk *
											</Typography>
											<Button
												variant="outlined"
												onClick={() => setFolkDialogOpen(true)}
												fullWidth
												sx={{
													justifyContent: 'flex-start',
													textTransform: 'none',
													py: 1.5,
													color: selectedFolk
														? 'text.primary'
														: 'text.secondary',
													fontWeight: selectedFolk ? 'medium' : 'normal',
													borderColor: selectedFolk
														? 'primary.main'
														: undefined,
													borderWidth: selectedFolk ? 2 : 1,
												}}
											>
												{selectedFolk ? selectedFolk.name : 'Select Folk'}
											</Button>
										</Box>
									</Box>
								</Box>
							)}

							{/* Tab 1: Custom (Upbringing + Background + Folk) */}
							{activeTab === 1 && (
								<Box>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mb: 3 }}
									>
										Build your character from scratch by choosing upbringing,
										background, and folk.
									</Typography>

									<TextField
										required
										fullWidth
										type="text"
										label="Character Name"
										placeholder="Enter your character's name"
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
										sx={{ mb: 3 }}
									/>

									<Box sx={{ display: 'grid', gap: 2, mb: 3 }}>
										{/* Folk Selection */}
										<Box>
											<Typography
												variant="subtitle2"
												sx={{ mb: 1, fontWeight: 'medium' }}
											>
												Folk (Optional)
											</Typography>
											<Button
												variant="outlined"
												onClick={() => setFolkDialogOpen(true)}
												fullWidth
												sx={{
													justifyContent: 'flex-start',
													textTransform: 'none',
													py: 1.5,
													color: selectedFolk
														? 'text.primary'
														: 'text.secondary',
													fontWeight: selectedFolk ? 'medium' : 'normal',
												}}
											>
												{selectedFolk ? selectedFolk.name : 'Select Folk'}
											</Button>
										</Box>

										{/* Upbringing Selection */}
										<Box>
											<Typography
												variant="subtitle2"
												sx={{ mb: 1, fontWeight: 'medium' }}
											>
												Upbringing (Optional)
											</Typography>
											<Button
												variant="outlined"
												onClick={() => setUpbringingDialogOpen(true)}
												fullWidth
												sx={{
													justifyContent: 'flex-start',
													textTransform: 'none',
													py: 1.5,
													color: selectedUpbringing
														? 'text.primary'
														: 'text.secondary',
													fontWeight: selectedUpbringing ? 'medium' : 'normal',
												}}
											>
												{selectedUpbringing
													? selectedUpbringing.name
													: 'Select Upbringing'}
											</Button>
										</Box>

										{/* Background Selection */}
										<Box>
											<Typography
												variant="subtitle2"
												sx={{ mb: 1, fontWeight: 'medium' }}
											>
												Background (Optional)
											</Typography>
											<Button
												variant="outlined"
												onClick={() => setBackgroundDialogOpen(true)}
												fullWidth
												sx={{
													justifyContent: 'flex-start',
													textTransform: 'none',
													py: 1.5,
													color: selectedBackground
														? 'text.primary'
														: 'text.secondary',
													fontWeight: selectedBackground ? 'medium' : 'normal',
												}}
											>
												{selectedBackground
													? selectedBackground.name
													: 'Select Background'}
											</Button>
										</Box>
									</Box>

									<FormControlLabel
										control={
											<Checkbox
												checked={includeStartingGear}
												onChange={(e) =>
													setIncludeStartingGear(e.target.checked)
												}
											/>
										}
										label="Include starting gear"
									/>
								</Box>
							)}

							{/* Tab 2: Blank */}
							{activeTab === 2 && (
								<Box>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mb: 3 }}
									>
										Start with a completely blank character sheet.
									</Typography>

									<TextField
										required
										fullWidth
										type="text"
										label="Character Name"
										placeholder="Enter your character's name"
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
										sx={{ mb: 3 }}
									/>

									<FormControlLabel
										control={
											<Checkbox
												checked={includeStartingGear}
												onChange={(e) =>
													setIncludeStartingGear(e.target.checked)
												}
											/>
										}
										label="Include starting gear"
									/>
								</Box>
							)}

							{/* Tab 3: Import */}
							{activeTab === 3 && (
								<Box>
									<Typography
										variant="body2"
										color="text.secondary"
										sx={{ mb: 3 }}
									>
										Import a previously exported character from a JSON file.
									</Typography>

									<Button
										variant="outlined"
										component="label"
										startIcon={<Upload />}
										fullWidth
										sx={{ py: 2 }}
									>
										Upload Character JSON
										<input
											type="file"
											accept=".json"
											hidden
											onChange={handleFileUpload}
										/>
									</Button>
									<Typography
										variant="caption"
										color="text.secondary"
										sx={{ display: 'block', mt: 1 }}
									>
										Select a valid Nexus RPG character JSON file
									</Typography>
								</Box>
							)}
						</>
					)}
				</DialogContent>
				<DialogActions sx={{ p: 2, pt: 1 }}>
					<Button onClick={handleAbort}>Cancel</Button>
					<Button
						variant="contained"
						disabled={
							!name ||
							(activeTab === 0 && (!selectedArchetype || !selectedFolk))
						}
						onClick={handleConfirm}
						autoFocus
					>
						{importedCharacter ? 'Import Character' : 'Create Character'}
					</Button>
				</DialogActions>
			</Dialog>

			{/* Selection Dialogs */}
			<ArchetypeSelectionDialog
				open={archetypeDialogOpen}
				onClose={() => setArchetypeDialogOpen(false)}
				onSelectArchetype={(archetype) => {
					setSelectedArchetype(archetype)
					// Reset companion and familiar selections when archetype changes
					setSelectedCompanion(null)
					setSelectedFamiliar(null)
					// Auto-set upbringing and background based on archetype
					if (archetype.upbringing) {
						const upbringing = (upbringingData as UpbringingData[]).find(
							(u) => u.name === archetype.upbringing,
						)
						if (upbringing) {
							setSelectedUpbringing(upbringing)
						}
					}
					if (archetype.background) {
						const background = (backgroundData as BackgroundData[]).find(
							(b) => b.name === archetype.background,
						)
						if (background) {
							setSelectedBackground(background)
						}
					}
					setArchetypeDialogOpen(false)
				}}
				selectedArchetype={selectedArchetype?.name}
			/>

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

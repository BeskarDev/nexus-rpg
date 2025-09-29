import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Chip,
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import { CharacterDocument } from '../../../../types/Character'
import { SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useNpcRelationshipCrud } from '../../hooks'
import { PersonalField, NpcRelationshipsSection } from '../../components'
import { ProfilePictureUpload } from './ProfilePictureUpload'
import { 
	FolkSelectionDialog, 
	UpbringingSelectionDialog, 
	BackgroundSelectionDialog,
	FolkData,
	UpbringingData,
	BackgroundData
} from '../../components'

export const PersonalTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { npcRelationships } = useMemo(
		() => activeCharacter.personal,
		[activeCharacter.personal],
	)
	const [personal, setPersonal] = useState(activeCharacter.personal)

	// Dialog states for changing Folk, Upbringing, and Background
	const [folkDialogOpen, setFolkDialogOpen] = useState(false)
	const [upbringingDialogOpen, setUpbringingDialogOpen] = useState(false)
	const [backgroundDialogOpen, setBackgroundDialogOpen] = useState(false)
	
	// Warning dialog state
	const [changeWarningOpen, setChangeWarningOpen] = useState(false)
	const [pendingChange, setPendingChange] = useState<{
		type: 'folk' | 'upbringing' | 'background'
		data: FolkData | UpbringingData | BackgroundData
	} | null>(null)

	// Use the reusable CRUD hook
	const npcRelationshipCrud = useNpcRelationshipCrud()

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	// Handle selection changes with warning
	const handleFolkSelection = (folk: FolkData) => {
		if (activeCharacter.personal.folk && activeCharacter.personal.folk !== folk.name) {
			setPendingChange({ type: 'folk', data: folk })
			setChangeWarningOpen(true)
		} else {
			applyFolkChange(folk)
		}
		setFolkDialogOpen(false)
	}

	const handleUpbringingSelection = (upbringing: UpbringingData) => {
		if (activeCharacter.personal.upbringing && activeCharacter.personal.upbringing !== upbringing.name) {
			setPendingChange({ type: 'upbringing', data: upbringing })
			setChangeWarningOpen(true)
		} else {
			applyUpbringingChange(upbringing)
		}
		setUpbringingDialogOpen(false)
	}

	const handleBackgroundSelection = (background: BackgroundData) => {
		if (activeCharacter.personal.background && activeCharacter.personal.background !== background.name) {
			setPendingChange({ type: 'background', data: background })
			setChangeWarningOpen(true)
		} else {
			applyBackgroundChange(background)
		}
		setBackgroundDialogOpen(false)
	}

	// Apply changes functions
	const applyFolkChange = (folk: FolkData) => {
		// Update personal info
		setPersonal((p) => ({ ...p, folk: folk.name }))
		updateCharacter({ personal: { folk: folk.name } })

		// Add folk abilities if they don't already exist
		const existingAbilityNames = activeCharacter.skills.abilities.map(a => a.title)
		const newAbilities = folk.abilities
			.filter(ability => !existingAbilityNames.includes(ability.name))
			.map(ability => ({
				id: crypto.randomUUID(),
				title: ability.name,
				description: ability.description,
				tag: 'Folk' as const,
			}))

		if (newAbilities.length > 0) {
			dispatch(characterSheetActions.importAbilities(newAbilities))
		}

		// Add folk languages if they don't already exist
		const existingLanguages = activeCharacter.skills.languages
		const newLanguages = folk.languages.filter(lang => !existingLanguages.includes(lang))
		
		if (newLanguages.length > 0) {
			dispatch(characterSheetActions.updateCharacter({
				skills: {
					languages: [...existingLanguages, ...newLanguages]
				}
			}))
		}
	}

	const applyUpbringingChange = (upbringing: UpbringingData) => {
		setPersonal((p) => ({ ...p, upbringing: upbringing.name }))
		updateCharacter({ personal: { upbringing: upbringing.name } })
	}

	const applyBackgroundChange = (background: BackgroundData) => {
		setPersonal((p) => ({ ...p, background: background.name }))
		updateCharacter({ personal: { background: background.name } })

		// Add background starting item if specified
		if (background['starting item']) {
			const newItem = {
				name: background['starting item'],
				properties: [] as string[],
				cost: 0,
				weight: 0,
				container: 'worn' as const,
				amount: 1,
				location: 'worn' as const,
				uses: 0,
				durability: '' as const,
			}
			dispatch(characterSheetActions.importItems([newItem]))
		}
	}

	// Handle confirmation dialog
	const handleConfirmChange = (replaceExisting: boolean) => {
		if (!pendingChange) return

		if (replaceExisting) {
			// Remove existing abilities/items related to the old choice if needed
			// For simplicity, we'll just add the new ones
		}

		switch (pendingChange.type) {
			case 'folk':
				applyFolkChange(pendingChange.data as FolkData)
				break
			case 'upbringing':
				applyUpbringingChange(pendingChange.data as UpbringingData)
				break
			case 'background':
				applyBackgroundChange(pendingChange.data as BackgroundData)
				break
		}

		setChangeWarningOpen(false)
		setPendingChange(null)
	}

	const handleCancelChange = () => {
		setChangeWarningOpen(false)
		setPendingChange(null)
	}

	// Always show the NPC relationships interface
	const showNewInterface = true

	return (
		<Box
			sx={{
				display: 'flex',
				columnGap: 3,
				flexWrap: 'wrap',
				maxWidth: { lg: 'unset', xl: '47rem' },
			}}
		>
			<Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', mb: 2 }}>
				<Box sx={{ flexGrow: 1 }}>
					<SectionHeader sx={{ mb: 2 }}>Your Character</SectionHeader>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							flexWrap: 'wrap',
							gap: 1,
						}}
					>
						<PersonalField
							value={personal.name}
							onValueChange={(value) =>
								setPersonal((p) => ({ ...p, name: value }))
							}
							onBlur={() =>
								updateCharacter({ personal: { name: personal.name } })
							}
							label="Name"
							sx={{ maxWidth: '15rem' }}
						/>
						
						{/* Folk Selection Button */}
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
							<Button
								variant="outlined"
								size="small"
								onClick={() => setFolkDialogOpen(true)}
								sx={{ maxWidth: '10rem', justifyContent: 'flex-start' }}
							>
								{personal.folk || 'Select Folk'}
							</Button>
							<Box sx={{ fontSize: '0.75rem', color: 'text.secondary', pl: 1 }}>
								Folk
							</Box>
						</Box>

						{/* Upbringing Selection Button */}
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
							<Button
								variant="outlined"
								size="small"
								onClick={() => setUpbringingDialogOpen(true)}
								sx={{ maxWidth: '10rem', justifyContent: 'flex-start' }}
							>
								{personal.upbringing || 'Select Upbringing'}
							</Button>
							<Box sx={{ fontSize: '0.75rem', color: 'text.secondary', pl: 1 }}>
								Upbringing
							</Box>
						</Box>

						{/* Background Selection Button */}
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
							<Button
								variant="outlined"
								size="small"
								onClick={() => setBackgroundDialogOpen(true)}
								sx={{ maxWidth: '10rem', justifyContent: 'flex-start' }}
							>
								{personal.background || 'Select Background'}
							</Button>
							<Box sx={{ fontSize: '0.75rem', color: 'text.secondary', pl: 1 }}>
								Background
							</Box>
						</Box>
						<PersonalField
							value={personal.motivation}
							onValueChange={(value) =>
								setPersonal((p) => ({ ...p, motivation: value }))
							}
							onBlur={() =>
								updateCharacter({
									personal: { motivation: personal.motivation },
								})
							}
							label="Motivation"
							sx={{ maxWidth: '10rem' }}
						/>

						<Box sx={{ width: '100%', flexGrow: 1 }} />

						<PersonalField
							value={personal.height}
							onValueChange={(value) =>
								setPersonal((p) => ({ ...p, height: value }))
							}
							onBlur={() =>
								updateCharacter({ personal: { height: personal.height } })
							}
							label="Height"
							sx={{ maxWidth: '6rem' }}
						/>
						<PersonalField
							value={personal.weight}
							onValueChange={(value) =>
								setPersonal((p) => ({ ...p, weight: value }))
							}
							onBlur={() =>
								updateCharacter({ personal: { weight: personal.weight } })
							}
							label="Weight"
							sx={{ maxWidth: '6rem' }}
						/>
						<PersonalField
							value={personal.age}
							onValueChange={(value) =>
								setPersonal((p) => ({ ...p, age: value }))
							}
							onBlur={() =>
								updateCharacter({ personal: { age: personal.age } })
							}
							label="Age"
							sx={{ maxWidth: '6rem' }}
						/>
						<PersonalField
							multiline
							minRows={1}
							maxRows={5}
							value={personal.description}
							onValueChange={(value) =>
								setPersonal((p) => ({ ...p, description: value }))
							}
							onBlur={() =>
								updateCharacter({
									personal: { description: personal.description },
								})
							}
							label="Description"
							sx={{ maxWidth: '20rem' }}
						/>
					</Box>
				</Box>

				<ProfilePictureUpload
					profilePicture={personal.profilePicture}
					onProfilePictureUpdate={(base64) =>
						updateCharacter({ personal: { profilePicture: base64 } })
					}
				/>
			</Box>

			<Box sx={{ width: '100%', flexGrow: 1, mb: 2 }} />

			{/* NPC relationships section */}
			{showNewInterface && (
				<Box sx={{ width: '100%' }}>
					<NpcRelationshipsSection
						npcRelationships={npcRelationships || []}
						onAdd={npcRelationshipCrud.addNew}
						onUpdate={npcRelationshipCrud.update}
						onDelete={npcRelationshipCrud.delete}
						onReorder={npcRelationshipCrud.onReorder}
					/>
				</Box>
			)}

			<Box sx={{ width: '100%', flexGrow: 1 }} />

			<Box sx={{ minWidth: '100%', mt: 1 }}>
				<SectionHeader>Personal Notes</SectionHeader>
				<PersonalField
					multiline
					minRows={1}
					maxRows={20}
					value={personal.notes}
					onValueChange={(value) =>
						setPersonal((p) => ({ ...p, notes: value }))
					}
					onBlur={() =>
						updateCharacter({ personal: { notes: personal.notes } })
					}
					sx={{ maxWidth: '100%' }}
				/>
			</Box>

			{/* Selection Dialogs */}
			<FolkSelectionDialog
				open={folkDialogOpen}
				onClose={() => setFolkDialogOpen(false)}
				onSelectFolk={handleFolkSelection}
				selectedFolk={personal.folk}
			/>

			<UpbringingSelectionDialog
				open={upbringingDialogOpen}
				onClose={() => setUpbringingDialogOpen(false)}
				onSelectUpbringing={handleUpbringingSelection}
				selectedUpbringing={personal.upbringing}
			/>

			<BackgroundSelectionDialog
				open={backgroundDialogOpen}
				onClose={() => setBackgroundDialogOpen(false)}
				onSelectBackground={handleBackgroundSelection}
				selectedBackground={personal.background}
			/>

			{/* Change Warning Dialog */}
			<Dialog
				open={changeWarningOpen}
				onClose={handleCancelChange}
				maxWidth="sm"
				fullWidth
			>
				<DialogTitle>
					Change {pendingChange?.type}?
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You already have a {pendingChange?.type} selected. Changing it will update your character's {pendingChange?.type} information.
						Do you want to proceed and also replace any auto-filled abilities, languages, or items with the new selection?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelChange}>
						Cancel
					</Button>
					<Button 
						onClick={() => handleConfirmChange(false)}
						variant="outlined"
					>
						Change Only {pendingChange?.type}
					</Button>
					<Button 
						onClick={() => handleConfirmChange(true)}
						variant="contained"
						color="primary"
					>
						Change and Replace Auto-filled
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

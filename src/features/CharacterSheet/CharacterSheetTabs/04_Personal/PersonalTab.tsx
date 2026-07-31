import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'
import React, { useMemo, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CharacterDocument } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useNpcRelationshipCrud } from '../../hooks'
import {
	DetailsGroup,
	Inscription,
	NpcRelationshipsSection,
} from '../../components'
import { PersonalRecord } from './PersonalRecord'
import { ProfilePictureUpload } from './ProfilePictureUpload'
import {
	FolkSelectionDialog,
	UpbringingSelectionDialog,
	BackgroundSelectionDialog,
	FolkData,
	UpbringingData,
	BackgroundData,
} from '../../components'
import { personalTabSchema } from '../../utils/validation'

/**
 * Parses a comma-separated string of suggested skills and returns an array of skill names
 */
/** The `personal` keys this tab edits as free text. */
type PersonalKey =
	| 'name'
	| 'folk'
	| 'upbringing'
	| 'background'
	| 'motivation'
	| 'height'
	| 'weight'
	| 'age'
	| 'description'

const parseSuggestedSkills = (
	suggestedSkills: string | undefined,
): string[] => {
	if (!suggestedSkills) return []

	return suggestedSkills
		.split(',')
		.map((skill) => skill.trim())
		.filter((skill) => skill.length > 0)
}

/**
 * Resolves skill conflicts according to game rules.
 * Currently handles the Arcana/Mysticism mutual exclusivity rule.
 */
const resolveSkillConflicts = (skills: string[]): string[] => {
	const skillSet = new Set(skills)

	// Handle Arcana/Mysticism mutual exclusivity
	if (skillSet.has('Arcana') && skillSet.has('Mysticism')) {
		// If both are present, keep Arcana and remove Mysticism
		skillSet.delete('Mysticism')
	}

	return Array.from(skillSet)
}
import folkData from '../../../../utils/data/json/folk.json'
import upbringingData from '../../../../utils/data/json/upbringings.json'
import backgroundData from '../../../../utils/data/json/backgrounds.json'

export const PersonalTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { npcRelationships } = useMemo(
		() => activeCharacter.personal,
		[activeCharacter.personal],
	)

	// Initialize react-hook-form with Yup schema validation
	const {
		formState: { errors },
		reset,
		watch,
		setValue,
		trigger,
	} = useForm({
		resolver: yupResolver(personalTabSchema),
		defaultValues: {
			name: activeCharacter.personal.name || '',
			folk: activeCharacter.personal.folk || '',
			upbringing: activeCharacter.personal.upbringing || '',
			background: activeCharacter.personal.background || '',
			motivation: activeCharacter.personal.motivation || '',
			height: activeCharacter.personal.height || '',
			weight: activeCharacter.personal.weight || '',
			age: activeCharacter.personal.age || '',
			description: activeCharacter.personal.description || '',
			notes: activeCharacter.personal.notes || '',
		},
		mode: 'onBlur', // Validate on blur to match existing behavior
	})

	// Watch form values for local state updates
	const formValues = watch()

	// Update form when character changes externally (e.g., loading different character)
	useEffect(() => {
		reset({
			name: activeCharacter.personal.name || '',
			folk: activeCharacter.personal.folk || '',
			upbringing: activeCharacter.personal.upbringing || '',
			background: activeCharacter.personal.background || '',
			motivation: activeCharacter.personal.motivation || '',
			height: activeCharacter.personal.height || '',
			weight: activeCharacter.personal.weight || '',
			age: activeCharacter.personal.age || '',
			description: activeCharacter.personal.description || '',
			notes: activeCharacter.personal.notes || '',
		})
	}, [activeCharacter.docId, reset])

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
		if (
			activeCharacter.personal.folk &&
			activeCharacter.personal.folk !== folk.name
		) {
			setPendingChange({ type: 'folk', data: folk })
			setChangeWarningOpen(true)
		} else {
			applyFolkChange(folk)
		}
		setFolkDialogOpen(false)
	}

	const handleUpbringingSelection = (upbringing: UpbringingData) => {
		if (
			activeCharacter.personal.upbringing &&
			activeCharacter.personal.upbringing !== upbringing.name
		) {
			setPendingChange({ type: 'upbringing', data: upbringing })
			setChangeWarningOpen(true)
		} else {
			applyUpbringingChange(upbringing)
		}
		setUpbringingDialogOpen(false)
	}

	const handleBackgroundSelection = (background: BackgroundData) => {
		if (
			activeCharacter.personal.background &&
			activeCharacter.personal.background !== background.name
		) {
			setPendingChange({ type: 'background', data: background })
			setChangeWarningOpen(true)
		} else {
			applyBackgroundChange(background)
		}
		setBackgroundDialogOpen(false)
	}

	// Apply changes functions - name only (no auto-fill)
	const applyFolkNameOnly = (folk: FolkData) => {
		// Only update the name field
		setPersonal((p) => ({ ...p, folk: folk.name }))
		updateCharacter({ personal: { folk: folk.name } })
		reset({ ...formValues, folk: folk.name })
	}

	const applyUpbringingNameOnly = (upbringing: UpbringingData) => {
		// Only update the name field
		setPersonal((p) => ({ ...p, upbringing: upbringing.name }))
		updateCharacter({ personal: { upbringing: upbringing.name } })
		reset({ ...formValues, upbringing: upbringing.name })
	}

	const applyBackgroundNameOnly = (background: BackgroundData) => {
		// Only update the name field
		setPersonal((p) => ({ ...p, background: background.name }))
		updateCharacter({ personal: { background: background.name } })
		reset({ ...formValues, background: background.name })
	}

	// Apply changes functions - full replacement (with auto-fill)
	const applyFolkChange = (folk: FolkData) => {
		// Remove old folk content if there was a previous folk selected
		if (activeCharacter.personal.folk) {
			const oldFolk = (folkData as FolkData[]).find(
				(f) => f.name === activeCharacter.personal.folk,
			)
			if (oldFolk) {
				// Remove old folk abilities
				if (oldFolk.abilities && Array.isArray(oldFolk.abilities)) {
					oldFolk.abilities.forEach((ability) => {
						const existingAbility = activeCharacter.skills.abilities.find(
							(a) => a.title === ability.name && a.tag === 'Folk',
						)
						if (existingAbility) {
							dispatch(characterSheetActions.deleteAbility(existingAbility))
						}
					})
				}

				// Remove old folk languages (but keep Tradespeak)
				if (oldFolk.languages && Array.isArray(oldFolk.languages)) {
					oldFolk.languages.forEach((language) => {
						if (language !== 'Tradespeak') {
							dispatch(characterSheetActions.removeLanguage(language))
						}
					})
				}
			}
		}

		// Update personal info
		setPersonal((p) => ({ ...p, folk: folk.name }))
		updateCharacter({ personal: { folk: folk.name } })
		reset({ ...formValues, folk: folk.name })

		// Add new folk abilities
		if (folk.abilities && Array.isArray(folk.abilities)) {
			const newAbilities = folk.abilities.map((ability) => ({
				id: crypto.randomUUID(),
				title: ability.name,
				description: ability.description,
				tag: 'Folk' as const,
			}))

			if (newAbilities.length > 0) {
				dispatch(characterSheetActions.importAbilities(newAbilities))
			}
		}

		// Add new folk languages
		if (folk.languages && Array.isArray(folk.languages)) {
			folk.languages.forEach((language) => {
				dispatch(characterSheetActions.addLanguage(language))
			})
		}
	}

	const applyUpbringingChange = (upbringing: UpbringingData) => {
		// Remove old upbringing skills if there was a previous upbringing selected
		if (activeCharacter.personal.upbringing) {
			const oldUpbringing = (upbringingData as UpbringingData[]).find(
				(u) => u.name === activeCharacter.personal.upbringing,
			)
			if (oldUpbringing && oldUpbringing['suggested skills']) {
				const oldSkills = parseSuggestedSkills(
					oldUpbringing['suggested skills'],
				)

				// Only remove skills that actually exist in the character's skill list
				const existingSkillNames = activeCharacter.skills.skills.map(
					(s) => s.name,
				)
				oldSkills.forEach((skillName) => {
					if (existingSkillNames.includes(skillName)) {
						dispatch(characterSheetActions.removeSkill(skillName))
					}
				})
			}
		}

		setPersonal((p) => ({ ...p, upbringing: upbringing.name }))
		updateCharacter({ personal: { upbringing: upbringing.name } })
		reset({ ...formValues, upbringing: upbringing.name })

		// Add new upbringing suggested skills with conflict resolution
		if (upbringing['suggested skills']) {
			const suggestedSkills = parseSuggestedSkills(
				upbringing['suggested skills'],
			)

			// Get current character skills to check for conflicts and duplicates
			const existingSkillNames = activeCharacter.skills.skills.map(
				(s) => s.name,
			)

			// Filter out skills that already exist
			const newSkills = suggestedSkills.filter(
				(skillName) => !existingSkillNames.includes(skillName),
			)

			// Apply conflict resolution
			const resolvedSkills = resolveSkillConflicts([
				...existingSkillNames,
				...newSkills,
			])

			// Find which skills need to be removed due to conflicts
			const skillsToRemove = existingSkillNames.filter(
				(skillName) => !resolvedSkills.includes(skillName),
			)
			skillsToRemove.forEach((skillName) => {
				dispatch(characterSheetActions.removeSkill(skillName))
			})

			// Add the new skills that survived conflict resolution
			const finalNewSkills = resolvedSkills.filter(
				(skillName) => !existingSkillNames.includes(skillName),
			)
			finalNewSkills.forEach((skillName) => {
				dispatch(characterSheetActions.addSkill(skillName))
			})
		}
	}

	const applyBackgroundChange = (background: BackgroundData) => {
		// Remove old background content if there was a previous background selected
		if (activeCharacter.personal.background) {
			const oldBackground = (backgroundData as BackgroundData[]).find(
				(b) => b.name === activeCharacter.personal.background,
			)
			if (oldBackground) {
				// Remove old background skills
				if (oldBackground['suggested skills']) {
					const oldSkills = parseSuggestedSkills(
						oldBackground['suggested skills'],
					)

					// Only remove skills that actually exist in the character's skill list
					const existingSkillNames = activeCharacter.skills.skills.map(
						(s) => s.name,
					)
					oldSkills.forEach((skillName) => {
						if (existingSkillNames.includes(skillName)) {
							dispatch(characterSheetActions.removeSkill(skillName))
						}
					})
				}

				// Remove old background starting item
				// Note: This is more complex as we'd need to track which items came from backgrounds
				// For now, we'll just add the new item and let users manually remove old ones if needed
			}
		}

		setPersonal((p) => ({ ...p, background: background.name }))
		updateCharacter({ personal: { background: background.name } })
		reset({ ...formValues, background: background.name })

		// Add new background suggested skills with conflict resolution
		if (background['suggested skills']) {
			const suggestedSkills = parseSuggestedSkills(
				background['suggested skills'],
			)

			// Get current character skills to check for conflicts and duplicates
			const existingSkillNames = activeCharacter.skills.skills.map(
				(s) => s.name,
			)

			// Filter out skills that already exist
			const newSkills = suggestedSkills.filter(
				(skillName) => !existingSkillNames.includes(skillName),
			)

			// Apply conflict resolution
			const resolvedSkills = resolveSkillConflicts([
				...existingSkillNames,
				...newSkills,
			])

			// Find which skills need to be removed due to conflicts
			const skillsToRemove = existingSkillNames.filter(
				(skillName) => !resolvedSkills.includes(skillName),
			)
			skillsToRemove.forEach((skillName) => {
				dispatch(characterSheetActions.removeSkill(skillName))
			})

			// Add the new skills that survived conflict resolution
			const finalNewSkills = resolvedSkills.filter(
				(skillName) => !existingSkillNames.includes(skillName),
			)
			finalNewSkills.forEach((skillName) => {
				dispatch(characterSheetActions.addSkill(skillName))
			})
		}

		// Add new background starting item if specified
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

		switch (pendingChange.type) {
			case 'folk':
				if (replaceExisting) {
					applyFolkChange(pendingChange.data as FolkData)
				} else {
					applyFolkNameOnly(pendingChange.data as FolkData)
				}
				break
			case 'upbringing':
				if (replaceExisting) {
					applyUpbringingChange(pendingChange.data as UpbringingData)
				} else {
					applyUpbringingNameOnly(pendingChange.data as UpbringingData)
				}
				break
			case 'background':
				if (replaceExisting) {
					applyBackgroundChange(pendingChange.data as BackgroundData)
				} else {
					applyBackgroundNameOnly(pendingChange.data as BackgroundData)
				}
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

	/**
	 * The identity fields, as data (M13 S6).
	 *
	 * They were nine card components — `NameCard`, `FolkCard`, `UpbringingCard`,
	 * `BackgroundCard`, `MotivationCard`, `HeightCard`, `WeightCard`, `AgeCard`,
	 * `DescriptionCard` — which differed in a label, a sigil and a prop name, and each
	 * carried its own copy of the same validate-then-commit blur. A list, one row
	 * renderer, one blur helper.
	 */
	const commit = (key: PersonalKey) => async () => {
		await trigger(key)
		updateCharacter({ personal: { [key]: formValues[key] } })
	}
	const set = (key: PersonalKey) => (value: string) =>
		setValue(key, value, { shouldDirty: true })

	const identityFields = [
		{ label: 'Name', sigil: 'name' as const, key: 'name' as const },
		{
			label: 'Folk',
			sigil: 'folk' as const,
			key: 'folk' as const,
			onPick: () => setFolkDialogOpen(true),
		},
		{
			label: 'Upbringing',
			sigil: 'upbringing' as const,
			key: 'upbringing' as const,
			onPick: () => setUpbringingDialogOpen(true),
		},
		{
			label: 'Background',
			sigil: 'background' as const,
			key: 'background' as const,
			onPick: () => setBackgroundDialogOpen(true),
		},
		{
			label: 'Motivation',
			sigil: 'motivation' as const,
			key: 'motivation' as const,
		},
		{
			label: 'Height',
			sigil: 'height' as const,
			key: 'height' as const,
			section: true,
		},
		{ label: 'Weight', sigil: 'weight' as const, key: 'weight' as const },
		{ label: 'Age', sigil: 'age' as const, key: 'age' as const },
	].map((field) => ({
		label: field.label,
		sigil: field.sigil,
		value: formValues[field.key] ?? '',
		onChange: set(field.key),
		onBlur: commit(field.key),
		error: errors[field.key]?.message,
		onPick: 'onPick' in field ? field.onPick : undefined,
		section: 'section' in field ? field.section : undefined,
	}))

	return (
		<Box sx={{ width: '100%' }}>
			{/* No tab header here: a `TabHeader` holds facts about the whole tab and the
				commands that act on it, and this tab has neither — its facts ARE its content.
				An empty plate with the tab's name in it would be the title repeat the tab bar
				already covers (S6, owner review). */}

			{/* The portrait beside the record, which is how a character sheet has always
				opened: a likeness and the facts about the person in it. The record is the
				wider column because it holds eight lines against one image. */}
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'flex-start',
					gap: 1.5,
					mb: 1.5,
				}}
			>
				<Box sx={{ flex: '1 1 20rem', minWidth: 0 }}>
					<PersonalRecord fields={identityFields} />
				</Box>
				<ProfilePictureUpload
					profilePicture={personal.profilePicture}
					onProfilePictureUpdate={(base64) =>
						updateCharacter({ personal: { profilePicture: base64 } })
					}
				/>
			</Box>

			{/* Description and notes are PROSE, so they are inscriptions rather than fields
				in the plate — the same split the Items details panel makes between what a
				thing is and what is written about it. */}
			<Box sx={{ mb: 1.5 }}>
				<DetailsGroup label="Description" sigil="description">
					<Inscription
						block
						multiline
						maxRows={8}
						label="Appearance and bearing"
						value={formValues.description ?? ''}
						onChange={(event) =>
							setValue('description', event.target.value, { shouldDirty: true })
						}
						onBlur={commit('description')}
						sx={{ flex: '1 1 100%' }}
					/>
				</DetailsGroup>
			</Box>

			{showNewInterface && (
				<NpcRelationshipsSection
					npcRelationships={npcRelationships || []}
					onAdd={npcRelationshipCrud.addNew}
					onUpdate={npcRelationshipCrud.update}
					onDelete={npcRelationshipCrud.delete}
					onReorder={npcRelationshipCrud.onReorder}
				/>
			)}

			<Box sx={{ mt: 1.5 }}>
				<DetailsGroup label="Personal Notes" sigil="description">
					<Inscription
						block
						multiline
						maxRows={20}
						label="Anything else worth keeping"
						value={formValues.notes ?? ''}
						onChange={(event) =>
							setValue('notes', event.target.value, { shouldDirty: true })
						}
						onBlur={() =>
							updateCharacter({ personal: { notes: formValues.notes } })
						}
						sx={{ flex: '1 1 100%' }}
					/>
				</DetailsGroup>
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
				<DialogTitle>Change {pendingChange?.type}?</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You already have a {pendingChange?.type} selected. How would you
						like to handle this change?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCancelChange}>Cancel</Button>
					<Button onClick={() => handleConfirmChange(false)} variant="outlined">
						Change Name Only
					</Button>
					<Button
						onClick={() => handleConfirmChange(true)}
						variant="contained"
						color="primary"
					>
						Replace & Auto-fill
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

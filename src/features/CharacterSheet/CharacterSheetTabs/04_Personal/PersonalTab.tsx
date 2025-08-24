import {
	Box,
	IconButton,
	Button,
	Switch,
	Typography,
	FormControlLabel,
	Tooltip,
} from '@mui/material'
import React, { useMemo, useState } from 'react'

import { Build } from '@mui/icons-material'
import { CharacterDocument } from '../../../../types/Character'
import { SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { useListCrud, useNpcRelationshipCrud } from '../../hooks'
import { PersonalField, PersonalListSection, NpcRelationshipsSection } from '../../components'
import { ProfilePictureUpload } from './ProfilePictureUpload'

export const PersonalTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { allies, contacts, rivals, npcRelationships } = useMemo(
		() => activeCharacter.personal,
		[activeCharacter.personal],
	)
	const [personal, setPersonal] = useState(activeCharacter.personal)
	const [showControls, setShowReorder] = useState(false) // State to toggle reorder icons

	// Use the reusable CRUD hooks
	const allyCrud = useListCrud('ally')
	const contactCrud = useListCrud('contact')
	const rivalCrud = useListCrud('rival')
	const npcRelationshipCrud = useNpcRelationshipCrud()

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const toggleReorder = () => {
		setShowReorder((prev) => !prev)
	}

	// Determine if we should show the new unified NPC relationships or the legacy lists
	const hasNewNpcRelationships = npcRelationships && npcRelationships.length > 0
	const hasLegacyRelationships = (allies && allies.length > 0) || (contacts && contacts.length > 0) || (rivals && rivals.length > 0)

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
					<Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
						<SectionHeader sx={{ mb: 0 }}>Your Character</SectionHeader>
						<Tooltip title="enable this to add, delete, or reorder lists">
							<IconButton
								size="small"
								onClick={toggleReorder}
								color={showControls ? 'primary' : 'default'}
								sx={{
									border: '1px solid',
									borderColor: 'divider',
								}}
							>
								<Build fontSize="inherit" />
							</IconButton>
						</Tooltip>
					</Box>
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
						<PersonalField
							value={personal.folk}
							onValueChange={(value) =>
								setPersonal((p) => ({ ...p, folk: value }))
							}
							onBlur={() =>
								updateCharacter({ personal: { folk: personal.folk } })
							}
							label="Folk"
							sx={{ maxWidth: '10rem' }}
						/>
						<PersonalField
							value={personal.upbringing}
							onValueChange={(value) =>
								setPersonal((p) => ({ ...p, upbringing: value }))
							}
							onBlur={() =>
								updateCharacter({
									personal: { upbringing: personal.upbringing },
								})
							}
							label="Upbringing"
							sx={{ maxWidth: '10rem' }}
						/>
						<PersonalField
							value={personal.background}
							onValueChange={(value) =>
								setPersonal((p) => ({ ...p, background: value }))
							}
							onBlur={() =>
								updateCharacter({
									personal: { background: personal.background },
								})
							}
							label="Background"
							sx={{ maxWidth: '10rem' }}
						/>
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

			{/* New unified NPC relationships section */}
			<NpcRelationshipsSection
				npcRelationships={npcRelationships || []}
				showControls={showControls}
				onAdd={npcRelationshipCrud.addNew}
				onUpdate={npcRelationshipCrud.update}
				onDelete={npcRelationshipCrud.delete}
				onReorder={npcRelationshipCrud.onReorder}
			/>

			{/* Legacy relationship lists - only show if they exist and new system is empty */}
			{hasLegacyRelationships && !hasNewNpcRelationships && (
				<>
					<PersonalListSection
						title="Allies"
						items={allies}
						showControls={showControls}
						onAdd={allyCrud.addNew}
						onUpdate={allyCrud.update}
						onDelete={allyCrud.delete}
						onReorder={allyCrud.onReorder}
						droppableId="allies"
					/>

					<PersonalListSection
						title="Contacts"
						items={contacts}
						showControls={showControls}
						onAdd={contactCrud.addNew}
						onUpdate={contactCrud.update}
						onDelete={contactCrud.delete}
						onReorder={contactCrud.onReorder}
						droppableId="contacts"
					/>

					<PersonalListSection
						title="Rivals"
						items={rivals}
						showControls={showControls}
						onAdd={rivalCrud.addNew}
						onUpdate={rivalCrud.update}
						onDelete={rivalCrud.delete}
						onReorder={rivalCrud.onReorder}
						droppableId="rivals"
					/>
				</>
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
		</Box>
	)
}

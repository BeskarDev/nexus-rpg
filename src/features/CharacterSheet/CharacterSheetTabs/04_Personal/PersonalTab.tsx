import {
	Box,
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

export const PersonalTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { npcRelationships } = useMemo(
		() => activeCharacter.personal,
		[activeCharacter.personal],
	)
	const [personal, setPersonal] = useState(activeCharacter.personal)

	// Use the reusable CRUD hook
	const npcRelationshipCrud = useNpcRelationshipCrud()

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
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
		</Box>
	)
}

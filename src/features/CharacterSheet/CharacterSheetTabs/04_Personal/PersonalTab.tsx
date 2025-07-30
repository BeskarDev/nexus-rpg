import {
	Box,
	IconButton,
	TextField,
	Button,
	Switch,
	Typography,
	FormControlLabel,
  Tooltip,
} from '@mui/material'
import React, { useMemo, useState } from 'react'

import { AddCircle, BuildCircle, Reorder } from '@mui/icons-material'
import { DynamicList, reorder } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { DropResult } from 'react-beautiful-dnd'
import { CharacterDocument } from '../../../../types/Character'
import { SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { NpcRow } from './NpcRow'
import { ProfilePictureUpload } from './ProfilePictureUpload'

export const PersonalTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { allies, contacts, rivals } = useMemo(
		() => activeCharacter.personal,
		[activeCharacter.personal],
	)
	const [personal, setPersonal] = useState(activeCharacter.personal)
	const [showControls, setShowReorder] = useState(false) // State to toggle reorder icons

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const toggleReorder = () => {
		setShowReorder((prev) => !prev)
	}

	const addNewAlly = () => {
		dispatch(characterSheetActions.addNewAlly())
	}

	const updateAlly = (update: string, index: number) => {
		dispatch(characterSheetActions.updateAlly({ update, index }))
	}

	const deleteAlly = (index: number) => {
		dispatch(characterSheetActions.deleteAlly(index))
	}

	const onAllyReorder = ({ source, destination }: DropResult) => {
		// dropped outside the list
		if (!destination) return

		dispatch(
			characterSheetActions.reorderAlly({
				source: source.index,
				destination: destination.index,
			}),
		)
	}

	const addNewContact = () => {
		dispatch(characterSheetActions.addNewContact())
	}

	const updateContact = (update: string, index: number) => {
		dispatch(characterSheetActions.updateContact({ update, index }))
	}

	const deleteContact = (index: number) => {
		dispatch(characterSheetActions.deleteContact(index))
	}

	const onContactReorder = ({ source, destination }: DropResult) => {
		// dropped outside the list
		if (!destination) return

		dispatch(
			characterSheetActions.reorderContact({
				source: source.index,
				destination: destination.index,
			}),
		)
	}

	const addNewRival = () => {
		dispatch(characterSheetActions.addNewRival())
	}

	const updateRival = (update: string, index: number) => {
		dispatch(characterSheetActions.updateRival({ update, index }))
	}

	const deleteRival = (index: number) => {
		dispatch(characterSheetActions.deleteRival(index))
	}

	const onRivalReorder = ({ source, destination }: DropResult) => {
		// dropped outside the list
		if (!destination) return

		dispatch(
			characterSheetActions.reorderRival({
				source: source.index,
				destination: destination.index,
			}),
		)
	}

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
						<Typography fontWeight="bold">Your Character</Typography>
						<Tooltip title="enable this to add, delete, or reorder lists">
							<IconButton
								onClick={toggleReorder}
								color={showControls ? 'primary' : 'default'}
							>
								<BuildCircle />
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
						<TextField
							variant="standard"
							value={personal.name}
							onChange={(event) =>
								setPersonal((p) => ({ ...p, name: event.target.value }))
							}
							onBlur={() =>
								updateCharacter({ personal: { name: personal.name } })
							}
							label="Name"
							sx={{ maxWidth: '15rem' }}
						/>
						<TextField
							variant="standard"
							value={personal.folk}
							onChange={(event) =>
								setPersonal((p) => ({ ...p, folk: event.target.value }))
							}
							onBlur={() =>
								updateCharacter({ personal: { folk: personal.folk } })
							}
							label="Folk"
							sx={{ maxWidth: '10rem' }}
						/>
						<TextField
							variant="standard"
							value={personal.upbringing}
							onChange={(event) =>
								setPersonal((p) => ({ ...p, upbringing: event.target.value }))
							}
							onBlur={() =>
								updateCharacter({ personal: { upbringing: personal.upbringing } })
							}
							label="Upbringing"
							sx={{ maxWidth: '10rem' }}
						/>
						<TextField
							variant="standard"
							value={personal.background}
							onChange={(event) =>
								setPersonal((p) => ({ ...p, background: event.target.value }))
							}
							onBlur={() =>
								updateCharacter({ personal: { background: personal.background } })
							}
							label="Background"
							sx={{ maxWidth: '10rem' }}
						/>
						<TextField
							variant="standard"
							value={personal.motivation}
							onChange={(event) =>
								setPersonal((p) => ({ ...p, motivation: event.target.value }))
							}
							onBlur={() =>
								updateCharacter({ personal: { motivation: personal.motivation } })
							}
							label="Motivation"
							sx={{ maxWidth: '10rem' }}
						/>

						<Box sx={{ width: '100%', flexGrow: 1 }} />

						<TextField
							variant="standard"
							value={personal.height}
							onChange={(event) =>
								setPersonal((p) => ({ ...p, height: event.target.value }))
							}
							onBlur={() =>
								updateCharacter({ personal: { height: personal.height } })
							}
							label="Height"
							sx={{ maxWidth: '6rem' }}
						/>
						<TextField
							variant="standard"
							value={personal.weight}
							onChange={(event) =>
								setPersonal((p) => ({ ...p, weight: event.target.value }))
							}
							onBlur={() =>
								updateCharacter({ personal: { weight: personal.weight } })
							}
							label="Weight"
							sx={{ maxWidth: '6rem' }}
						/>
						<TextField
							variant="standard"
							value={personal.age}
							onChange={(event) =>
								setPersonal((p) => ({ ...p, age: event.target.value }))
							}
							onBlur={() => updateCharacter({ personal: { age: personal.age } })}
							label="Age"
							sx={{ maxWidth: '6rem' }}
						/>
						<TextField
							variant="standard"
							multiline
							minRows={1}
							maxRows={5}
							value={personal.description}
							onChange={(event) =>
								setPersonal((p) => ({ ...p, description: event.target.value }))
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

			<Box sx={{ maxWidth: '100%', mb: 1 }}>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Allies</SectionHeader>
          {showControls && (
            <IconButton onClick={addNewAlly} sx={{ mb: 0.75 }}>
              <AddCircle />
            </IconButton>
          )}
				</Box>
				<DynamicList
					droppableId="allies"
					onDragEnd={onAllyReorder}
					sx={{
						overflowY: 'auto',
						overflowX: 'hidden',
						maxHeight: '25vh',
					}}
				>
					{allies.map((a, index) => (
						<DynamicListItem
							key={a.id}
							id={a.id}
							index={index}
							dragDisabled={!showControls}
						>
							<NpcRow
								key={a.id}
								description={a.description}
								updateNpc={(update) => updateAlly(update, index)}
								deleteNpc={() => deleteAlly(index)}
								dragDisabled={!showControls}
							/>
						</DynamicListItem>
					))}
				</DynamicList>
			</Box>

			<Box sx={{ maxWidth: '100%', mb: 1 }}>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Contacts</SectionHeader>
          {showControls && (
            <IconButton onClick={addNewContact} sx={{ mb: 0.75 }}>
              <AddCircle />
            </IconButton>
          )}
				</Box>
				<DynamicList
					droppableId="contacts"
					onDragEnd={onContactReorder}
					sx={{
						overflowY: 'auto',
						overflowX: 'hidden',
						maxHeight: '20vh',
					}}
				>
					{contacts.map((c, index) => (
						<DynamicListItem
							key={c.id}
							id={c.id}
							index={index}
							dragDisabled={!showControls}
						>
							<NpcRow
								key={c.id}
								description={c.description}
								updateNpc={(update) => updateContact(update, index)}
								deleteNpc={() => deleteContact(index)}
								dragDisabled={!showControls}
							/>
						</DynamicListItem>
					))}
				</DynamicList>
			</Box>

			<Box sx={{ maxWidth: '100%', mb: 1 }}>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Rivals</SectionHeader>
          {showControls && (
            <IconButton onClick={addNewRival} sx={{ mb: 0.75 }}>
              <AddCircle />
            </IconButton>
          )}
				</Box>
				<DynamicList
					droppableId="rivals"
					onDragEnd={onRivalReorder}
					sx={{
						overflowY: 'auto',
						overflowX: 'hidden',
						maxHeight: '20vh',
					}}
				>
					{rivals.map((r, index) => (
						<DynamicListItem
							key={r.id}
							id={r.id}
							index={index}
							dragDisabled={!showControls}
						>
							<NpcRow
								key={r.id}
								description={r.description}
								updateNpc={(update) => updateRival(update, index)}
								deleteNpc={() => deleteRival(index)}
								dragDisabled={!showControls}
							/>
						</DynamicListItem>
					))}
				</DynamicList>
			</Box>

			<Box sx={{ width: '100%', flexGrow: 1 }} />

			<Box sx={{ minWidth: '100%', mt: 1 }}>
				<SectionHeader>Personal Notes</SectionHeader>
				<TextField
					multiline
					minRows={1}
					maxRows={20}
					value={personal.notes}
					onChange={(event) =>
						setPersonal((p) => ({ ...p, notes: event.target.value }))
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

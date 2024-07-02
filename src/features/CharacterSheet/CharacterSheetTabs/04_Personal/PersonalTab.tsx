import { Box, IconButton, TextField } from '@mui/material'
import React, { useId, useState } from 'react'

import { AddCircle } from '@mui/icons-material'
import { SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'
import { Character } from '../../types/Character'
import { AbilityRow } from '../AbilityRow'

export type PersonalTabProps = {
	character: Character
	updateCharacter: (update: DeepPartial<Character>) => void
}

export const PersonalTab: React.FC<PersonalTabProps> = ({
	character,
	updateCharacter,
}) => {
	const {
		name,
		folk,
		upbringing,
		background,
		height,
		weight,
		age,
		description,
		motivation,
		allies,
		contacts,
		rivals,
		notes,
	} = character.personal

	const [personal, setPersonal] = useState(character.personal)

	const addNewAlly = () => {
		allies.push({ id: useId(), description: '' })
		updateCharacter({
			personal: { allies },
		})
	}

	const updateAlly = (update: string, index: number) => {
		const newAllies = [...allies]
		newAllies[index] = { ...allies[index], description: update }
		return updateCharacter({
			personal: { allies: newAllies },
		})
	}

	const deleteAlly = (index: number) => {
		const newAllies = [...allies].filter((_, i) => i != index)
		updateCharacter({
			personal: {
				name,
				folk,
				upbringing,
				background,
				height,
				weight,
				age,
				description,
				motivation,
				allies: newAllies,
				contacts,
				rivals,
				notes,
			},
		})
		allies.pop()
	}

	const addNewContact = () => {
		contacts.push({ id: useId(), description: '' })
		updateCharacter({
			personal: { contacts },
		})
	}

	const updateContact = (update: string, index: number) => {
		const newContacts = [...contacts]
		newContacts[index] = { ...contacts[index], description: update }
		return updateCharacter({
			personal: { contacts: newContacts },
		})
	}

	const deleteContact = (index: number) => {
		const newContacts = [...contacts].filter((_, i) => i != index)
		updateCharacter({
			personal: {
				name,
				folk,
				upbringing,
				background,
				height,
				weight,
				age,
				description,
				motivation,
				allies,
				contacts: newContacts,
				rivals,
				notes,
			},
		})
		contacts.pop()
	}

	const addNewRival = () => {
		rivals.push({ id: useId(), description: '' })
		updateCharacter({
			personal: { rivals },
		})
	}

	const updateRival = (update: string, index: number) => {
		const newRivals = [...rivals]
		newRivals[index] = { ...rivals[index], description: update }
		return updateCharacter({
			personal: { rivals: newRivals },
		})
	}

	const deleteRival = (index: number) => {
		const newRivals = [...rivals].filter((_, i) => i != index)
		updateCharacter({
			personal: {
				name,
				folk,
				upbringing,
				background,
				height,
				weight,
				age,
				description,
				motivation,
				allies,
				contacts,
				rivals: newRivals,
				notes,
			},
		})
		rivals.pop()
	}

	return (
		<Box
			sx={{
				display: 'flex',
				columnGap: { md: 4, sm: 2, xs: 1 },
				flexWrap: 'wrap',
			}}
		>
			<Box>
				<SectionHeader>Your Character</SectionHeader>
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

			<Box sx={{ width: '100%', flexGrow: 1, mb: 1 }} />

			<Box sx={{ maxWidth: '100%', flexGrow: 1, mb: 1 }}>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Allies</SectionHeader>
					<IconButton onClick={addNewAlly} sx={{ mb: 0.75 }}>
						<AddCircle />
					</IconButton>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					{allies.map((a, index) => (
						<AbilityRow
							key={a.id}
							ability={a.description}
							updateAbility={(update) => updateAlly(update, index)}
							deleteAbility={() => deleteAlly(index)}
						/>
					))}
				</Box>
			</Box>

			<Box sx={{ maxWidth: '100%', flexGrow: 1, mb: 1 }}>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Contacts</SectionHeader>
					<IconButton onClick={addNewContact} sx={{ mb: 0.75 }}>
						<AddCircle />
					</IconButton>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					{contacts.map((c, index) => (
						<AbilityRow
							key={c.id}
							ability={c.description}
							updateAbility={(update) => updateContact(update, index)}
							deleteAbility={() => deleteContact(index)}
						/>
					))}
				</Box>
			</Box>

			<Box sx={{ maxWidth: '100%', flexGrow: 1, mb: 1 }}>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<SectionHeader>Rivals</SectionHeader>
					<IconButton onClick={addNewRival} sx={{ mb: 0.75 }}>
						<AddCircle />
					</IconButton>
				</Box>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
					{rivals.map((r, index) => (
						<AbilityRow
							key={r.id}
							ability={r.description}
							updateAbility={(update) => updateRival(update, index)}
							deleteAbility={() => deleteRival(index)}
						/>
					))}
				</Box>
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

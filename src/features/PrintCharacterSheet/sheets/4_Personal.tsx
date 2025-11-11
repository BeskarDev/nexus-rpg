import { Box, TextField, Typography } from '@mui/material'
import { SheetLayout } from './SheetLayout'
import { Character, NpcRelationship, Relation } from '@site/src/types/Character'
import { CharacterHeaderTextField } from '../PrintCharacterSheet'
import parse from 'html-react-parser'
import { useMemo } from 'react'

export const PersonalSheet: React.FC<{ char: Character }> = ({ char }) => {
	// Handle both new and legacy NPC relationship formats
	const { isNewFormat, groupedRelationships, allies, contacts, rivals } = useMemo<{
		isNewFormat: boolean
		groupedRelationships: Map<number, NpcRelationship[]>
		allies: Relation[]
		contacts: Relation[]
		rivals: Relation[]
	}>(() => {
		// If using new format
		if (char.personal.npcRelationships && char.personal.npcRelationships.length > 0) {
			// Group NPCs by disposition level
			const grouped = new Map<number, NpcRelationship[]>()
			char.personal.npcRelationships.forEach((npc) => {
				if (!grouped.has(npc.disposition)) {
					grouped.set(npc.disposition, [])
				}
				grouped.get(npc.disposition)!.push(npc)
			})
			return {
				isNewFormat: true,
				groupedRelationships: grouped,
				allies: [],
				contacts: [],
				rivals: [],
			}
		}
		// Fall back to legacy format
		return {
			isNewFormat: false,
			groupedRelationships: new Map(),
			allies: char.personal.allies || [],
			contacts: char.personal.contacts || [],
			rivals: char.personal.rivals || [],
		}
	}, [char.personal])

	const getDispositionLabel = (disposition: number): string => {
		if (disposition >= 2) return 'Intimate (+2)'
		if (disposition === 1) return 'Friendly (+1)'
		if (disposition === 0) return 'Indifferent (0)'
		if (disposition === -1) return 'Suspicious (-1)'
		if (disposition === -2) return 'Hostile (-2)'
		return 'Hateful (-3)'
	}

	const formatNpcRelationship = (npc: NpcRelationship) => {
		return `${npc.name} (${npc.role}): ${npc.description}`
	}

	// Sort disposition levels from highest to lowest
	const sortedDispositions = Array.from(groupedRelationships.keys()).sort((a, b) => b - a)

	return (
		<SheetLayout>
			<Box sx={{ display: 'flex', gap: 1, mt: -0.5 }}>
				<CharacterHeaderTextField
					value={char.personal.motivation}
					label="Motivation"
				/>
				<CharacterHeaderTextField
					size="small"
					value={char.personal.height}
					label="Height"
				/>
				<CharacterHeaderTextField
					size="small"
					value={char.personal.weight}
					label="Weight"
				/>
				<CharacterHeaderTextField
					size="small"
					value={char.personal.age}
					label="Age"
				/>
			</Box>
			<TextField
				size="small"
				multiline
				rows={3}
				value={char.personal.description}
				label="Physical Description"
			/>
			<Box sx={{ display: 'flex', gap: 1, height: '80%', overflowY: 'hidden' }}>
				<Box
					sx={{
						border: '1px dotted black',
						borderRadius: '0.5rem',
						px: 1,
						height: '100%',
						width: '50%',
						overflowY: 'hidden',
					}}
				>
					{isNewFormat ? (
						<>
							<Typography color="text.secondary" variant="caption" sx={{ fontWeight: 'bold' }}>
								NPC Relationships
							</Typography>
							{sortedDispositions.map((disposition) => {
								const npcs = groupedRelationships.get(disposition)!
								return (
									<Box key={disposition}>
										<Typography color="text.secondary" variant="caption" sx={{ fontSize: '9px', fontStyle: 'italic' }}>
											{getDispositionLabel(disposition)}
										</Typography>
										<Box component="ul" sx={{ pl: 3, mb: 0, '& li + li': { mt: 0.5 } }}>
											{npcs.map((npc, index) => (
												<Typography
													key={npc.id || `npc-${index}`}
													component="li"
													variant="body2"
													sx={{ fontSize: '10px' }}
												>
													{formatNpcRelationship(npc)}
												</Typography>
											))}
										</Box>
									</Box>
								)
							})}
						</>
					) : (
						<>
							<Typography color="text.secondary" variant="caption">
								Allies
							</Typography>
							<Box component="ul" sx={{ pl: 3, mb: 1, '& li + li': { mt: 1 } }}>
								{allies.map((ally, index) => (
									<Typography
										key={ally.id || `ally-${index}`}
										component="li"
										variant="body2"
										sx={{ fontSize: '10px' }}
									>
										{ally.description}
									</Typography>
								))}
							</Box>
							<Typography color="text.secondary" variant="caption">
								Contacts
							</Typography>
							<Box component="ul" sx={{ pl: 3, mb: 1, '& li + li': { mt: 1 } }}>
								{contacts.map((contact, index) => (
									<Typography
										key={contact.id || `contact-${index}`}
										component="li"
										variant="body2"
										sx={{ fontSize: '10px' }}
									>
										{contact.description}
									</Typography>
								))}
							</Box>
							<Typography color="text.secondary" variant="caption">
								Rivals
							</Typography>
							<Box component="ul" sx={{ pl: 3, mb: 1, '& li + li': { mt: 1 } }}>
								{rivals.map((rival, index) => (
									<Typography
										key={rival.id || `rival-${index}`}
										component="li"
										variant="body2"
										sx={{ fontSize: '10px' }}
									>
										{rival.description}
									</Typography>
								))}
							</Box>
						</>
					)}
				</Box>
				<Box
					sx={{
						border: '1px dotted black',
						borderRadius: '0.5rem',
						px: 1,
						width: '50%',
						height: '100%',
					}}
				>
					<Typography color="text.secondary" variant="caption">
						Personal Notes
					</Typography>
					<Box
						sx={{
							height: '95%',
							fontSize: '10px',
						}}
					>
						{parse(char.personal.notes)}
					</Box>
				</Box>
			</Box>
		</SheetLayout>
	)
}

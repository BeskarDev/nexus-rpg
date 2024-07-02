import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	TextField,
	Tooltip,
} from '@mui/material'
import React from 'react'

import { AddCircle, ExpandMore, HelpOutline } from '@mui/icons-material'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'
import { Character, Spell } from '../../types/Character'
import { SpellRow } from './SpellRow'

export type SpellsTabProps = {
	character: Character
	updateCharacter: (update: DeepPartial<Character>) => void
}

export const SpellsTab: React.FC<SpellsTabProps> = ({
	character,
	updateCharacter,
}) => {
	const { magicSkill, specialization, focus, spells } = character.spells

	const addNewSpell = () => {
		spells.push({
			id: crypto.randomUUID(),
			name: 'new spell',
			rank: 0,
			cost: 0,
			target: '',
			range: '',
			properties: '',
			effect: '',
		})
		updateCharacter({
			spells: { magicSkill, specialization, focus, spells },
		})
	}

	const updateSpell = (update: Partial<Spell>, index: number) => {
		const newSpells = [...spells]
		newSpells[index] = { ...spells[index], ...update }
		return updateCharacter({
			spells: { spells: newSpells },
		})
	}

	const deleteSpell = (spell: Spell) => {
		const newSpells = [...spells].filter((s) => s != spell)
		updateCharacter({
			spells: { magicSkill, specialization, focus, spells: newSpells },
		})
		spells.pop()
	}

	return (
		<Box
			sx={{
				display: 'flex',
				columnGap: { md: 4, sm: 2, xs: 1 },
				flexWrap: 'wrap',
			}}
		>
			<Box sx={{ mb: 2 }}>
				<Box
					sx={{
						mx: 'auto',
						display: 'flex',
						alignItems: 'center',
						flexWrap: 'wrap',
					}}
				>
					<TextField
						variant="standard"
						value={magicSkill}
						onChange={(event) =>
							updateCharacter({
								spells: { magicSkill: event.target.value },
							})
						}
						label="Magic Skill"
						sx={{ maxWidth: '7rem' }}
					/>
					<TextField
						variant="standard"
						value={specialization}
						onChange={(event) =>
							updateCharacter({
								spells: { specialization: event.target.value },
							})
						}
						label="Specialization"
						sx={{ maxWidth: '16rem', mr: 1 }}
					/>
					<AttributeField
						type="number"
						value={focus.current}
						onChange={(event) =>
							updateCharacter({
								spells: { focus: { current: Number(event.target.value) } },
							})
						}
						label="Current Focus"
						helperText=""
						sx={{
							maxWidth: '7rem',
							'& .MuiOutlinedInput-root': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderWidth: '2px',
								},
							},
						}}
					/>
					<AttributeField
						type="number"
						value={focus.total}
						onChange={(event) =>
							updateCharacter({
								spells: { focus: { total: Number(event.target.value) } },
							})
						}
						label="Max. Focus"
						sx={{ maxWidth: '6rem', mr: 1 }}
					/>
					<Tooltip title="(SPI/MND - 2) + (2 * Mysticism/Arcana)">
						<HelpOutline fontSize="small" sx={{ mb: 0.75 }} />
					</Tooltip>
				</Box>

				<Box sx={{ width: '100%', flexGrow: 1 }} />

				<Accordion>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
							<SectionHeader>Spells</SectionHeader>
							<IconButton
								onClick={(event) => {
									addNewSpell()
									event.stopPropagation()
								}}
								sx={{ mb: 0.75 }}
							>
								<AddCircle />
							</IconButton>
						</Box>
					</AccordionSummary>
					<AccordionDetails
						sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
					>
						{spells.map((s, index) => (
							<SpellRow
								key={s.id}
								spell={s}
								updateSpell={(update) => updateSpell(update, index)}
								deleteSpell={() => deleteSpell(s)}
							/>
						))}
					</AccordionDetails>
				</Accordion>
			</Box>
		</Box>
	)
}

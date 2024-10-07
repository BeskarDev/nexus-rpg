import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	TextField,
	Tooltip,
} from '@mui/material'
import React, { useMemo } from 'react'

import { AddCircle, ExpandMore, HelpOutline } from '@mui/icons-material'
import { DynamicList, reorder } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { DropResult } from 'react-beautiful-dnd'
import { CharacterDocument, Spell } from '../../../../types/Character'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { SpellRow } from './SpellRow'

export const SpellsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { magicSkill, specialization, focus, spellCatalystDamage, spells } =
		useMemo(() => activeCharacter.spells, [activeCharacter.spells])

	const updateCharacter = (update: DeepPartial<CharacterDocument>) => {
		dispatch(characterSheetActions.updateCharacter(update))
	}

	const addNewSpell = () => {
		dispatch(characterSheetActions.addNewSpell())
	}

	const updateSpell = (update: Partial<Spell>, index: number) => {
		dispatch(characterSheetActions.updateSpell({ update, index }))
	}

	const deleteSpell = (spell: Spell) => {
		dispatch(characterSheetActions.deleteSpell(spell))
	}

	const onSpellReorder = ({ source, destination }: DropResult) => {
		// dropped outside the list
		if (!destination) return

		dispatch(
			characterSheetActions.reorderSpell({
				source: source.index,
				destination: destination.index,
			}),
		)
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
						gap: 1,
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
						sx={{ maxWidth: '8rem' }}
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
						sx={{ mr: 1 }}
					/>
				</Box>
				<Box
					sx={{
						mt: 1,
						mx: 'auto',
						display: 'flex',
						alignItems: 'flex-start',
						flexWrap: 'wrap',
						gap: 1,
					}}
				>
					<AttributeField
						size="small"
						type="number"
						value={spellCatalystDamage}
						onChange={(event) =>
							updateCharacter({
								spells: { spellCatalystDamage: Number(event.target.value) },
							})
						}
						label="Spell Catalyst"
						helperText=" "
						sx={{
							maxWidth: '5.5rem',
						}}
					/>
					<Tooltip title="bonus damage per SL from your Spell Catalyst">
						<HelpOutline fontSize="small" sx={{ mt: 1, mb: 0.75 }} />
					</Tooltip>
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
							ml: 'auto',
							maxWidth: '6rem',
							'& .MuiOutlinedInput-root': {
								'& .MuiOutlinedInput-notchedOutline': {
									borderWidth: '2px',
								},
							},
						}}
					/>
					<AttributeField
						size="small"
						type="number"
						value={focus.total}
						onChange={(event) =>
							updateCharacter({
								spells: { focus: { total: Number(event.target.value) } },
							})
						}
						label="Max. Focus"
						helperText=" "
						sx={{ maxWidth: '5rem', mr: 1 }}
					/>
					<Tooltip title="(SPI/MND - 2) + (2 * Mysticism/Arcana)">
						<HelpOutline fontSize="small" sx={{ mt: 1, mb: 0.75 }} />
					</Tooltip>
				</Box>

				<Box sx={{ width: '100%', flexGrow: 1 }} />

				<Accordion defaultExpanded>
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

					<AccordionDetails sx={{ overflowY: 'auto', maxHeight: '60vh' }}>
						<DynamicList droppableId="spells" onDragEnd={onSpellReorder}>
							{spells.map((s, index) => (
								<DynamicListItem
									key={s.id}
									id={s.id}
									index={index}
									sx={{ alignItems: 'baseline' }}
								>
									<SpellRow
										key={s.id}
										spell={s}
										updateSpell={(update) => updateSpell(update, index)}
										deleteSpell={() => deleteSpell(s)}
									/>
								</DynamicListItem>
							))}
						</DynamicList>
					</AccordionDetails>
				</Accordion>
			</Box>
		</Box>
	)
}

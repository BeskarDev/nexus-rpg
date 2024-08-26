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
	const { magicSkill, specialization, focus, spells } = useMemo(
		() => activeCharacter.spells,
		[activeCharacter.spells],
	)

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

					<AccordionDetails>
						<DynamicList droppableId="spells" onDragEnd={onSpellReorder}>
							{spells.map((s, index) => (
								<DynamicListItem key={s.id} id={s.id} index={index}>
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

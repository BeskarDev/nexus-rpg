import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	TextField,
	Tooltip,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from '@mui/material'
import React, { useMemo, useState } from 'react'

import { AddCircle, ExpandMore, HelpOutline, Search } from '@mui/icons-material'
import { DynamicList, reorder } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { DropResult } from 'react-beautiful-dnd'
import { CharacterDocument, Spell } from '../../../../types/Character'
import { AttributeField, SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { FocusField } from '../00_Statistics/FocusField'
import { SpellRow } from './SpellRow'
import { SpellsSearchDialog } from './SpellsSearchDialog'

export const SpellsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { magicSkill, specialization, focus, spellCatalystDamage, spells } =
		useMemo(() => activeCharacter.spells, [activeCharacter.spells])

	const [isSpellsDialogOpen, setIsSpellsDialogOpen] = useState(false)

	// Get Quick Ref selections
	const quickRefSelections = activeCharacter.skills.quickRefSelections || { 
		abilities: [], 
		weapons: [], 
		items: [], 
		spells: [] 
	}

	// Quick Ref handler for spells
	const handleToggleSpellQuickRef = (spellId: string) => {
		dispatch(characterSheetActions.toggleQuickRefSpell(spellId))
	}

	// Determine magic type based on magic skill
	const magicType: 'Arcana' | 'Mysticism' | null =
		magicSkill === 'Mysticism'
			? 'Mysticism'
			: magicSkill === 'Arcana'
				? 'Arcana'
				: null

	// Auto-detect magic skill from character's skills
	const detectedMagicSkill = useMemo(() => {
		const skills = activeCharacter.skills.skills || []
		const hasArcana = skills.some((skill) => skill.name === 'Arcana')
		const hasMysticism = skills.some((skill) => skill.name === 'Mysticism')

		if (hasArcana) return 'Arcana'
		if (hasMysticism) return 'Mysticism'
		return ''
	}, [activeCharacter.skills.skills])

	// Auto-sync magic skill if it doesn't match detected skill
	React.useEffect(() => {
		if (detectedMagicSkill !== magicSkill) {
			updateCharacter({
				spells: { magicSkill: detectedMagicSkill },
			})
		}
	}, [detectedMagicSkill, magicSkill])

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
				maxWidth: '38rem',
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
					<FormControl variant="standard" sx={{ minWidth: '8rem' }}>
						<InputLabel>Magic Skill</InputLabel>
						<Select
							value={magicSkill}
							onChange={(event) =>
								updateCharacter({
									spells: { magicSkill: event.target.value },
								})
							}
							label="Magic Skill"
							disabled={true}
						>
							<MenuItem value="">None</MenuItem>
							<MenuItem value="Arcana">Arcana</MenuItem>
							<MenuItem value="Mysticism">Mysticism</MenuItem>
						</Select>
					</FormControl>
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
						gap: 2,
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
					<FocusField />
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
							<Tooltip
								title={`Search ${magicType === 'Arcana' ? 'Arcane' : magicType === 'Mysticism' ? 'Mystic' : ''} Spells from database`}
							>
								<IconButton
									size="small"
									onClick={(event) => {
										setIsSpellsDialogOpen(true)
										event.stopPropagation()
									}}
									sx={{ ml: -1, mb: 0.75 }}
									disabled={!magicType}
								>
									<Search />
								</IconButton>
							</Tooltip>
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
										isInQuickRef={quickRefSelections.spells?.includes(s.id)}
										onToggleQuickRef={handleToggleSpellQuickRef}
									/>
								</DynamicListItem>
							))}
						</DynamicList>
					</AccordionDetails>
				</Accordion>
			</Box>

			<SpellsSearchDialog
				open={isSpellsDialogOpen}
				onClose={() => setIsSpellsDialogOpen(false)}
				character={activeCharacter}
				magicType={magicType!}
				onImportSpells={(spells) => {
					spells.forEach((spell) => {
						dispatch(characterSheetActions.importSpells([spell]))
					})
					setIsSpellsDialogOpen(false)
				}}
			/>
		</Box>
	)
}

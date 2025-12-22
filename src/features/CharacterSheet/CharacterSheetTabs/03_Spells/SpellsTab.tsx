import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	IconButton,
	TextField,
	Tooltip,
	Typography,
	alpha,
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import { UI_COLORS } from '../../../../utils/colors'

import { AddCircle, ExpandMore, Search, SwapVert } from '@mui/icons-material'
import { DynamicList, reorder } from '@site/src/components/DynamicList'
import { DynamicListItem } from '@site/src/components/DynamicList/DynamicListItem'
import { DropResult } from '@hello-pangea/dnd'
import { CharacterDocument, Spell } from '../../../../types/Character'
import { SectionHeader } from '../../CharacterSheet'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { SpellRow } from './SpellRow'
import { SpellsSearchDialog } from './SpellsSearchDialog'
import { MagicSkillCard } from './MagicSkillCard'
import { SpecializationCard } from './SpecializationCard'
import { CatalystCard } from './CatalystCard'
import { FocusCard } from './FocusCard'

export const SpellsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { magicSkill, specialization, focus, spellCatalystDamage, spells } =
		useMemo(() => activeCharacter.spells, [activeCharacter.spells])

	const [isSpellsDialogOpen, setIsSpellsDialogOpen] = useState(false)
	const [reorderMode, setReorderMode] = useState(false)

	// Get Quick Ref selections
	const quickRefSelections = activeCharacter.skills.quickRefSelections || {
		abilities: [],
		weapons: [],
		items: [],
		spells: [],
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
				width: '100%',
			}}
		>
			<Box sx={{ mb: 2, width: '100%' }}>
				{/* Magic Info Cards Row */}
				<Box
					sx={{
						display: 'flex',
						alignItems: 'flex-start',
						flexWrap: 'wrap',
						gap: 0.75,
						mb: 1,
					}}
				>
					<MagicSkillCard magicSkill={magicSkill} />
					<SpecializationCard 
						specialization={specialization}
						updateCharacter={updateCharacter}
					/>
					<CatalystCard
						spellCatalystDamage={spellCatalystDamage}
						updateCharacter={updateCharacter}
					/>
					<FocusCard />
				</Box>

				<Accordion defaultExpanded>
					<AccordionSummary expandIcon={<ExpandMore />}>
						<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
							<SectionHeader>Spells</SectionHeader>
							<Tooltip title={reorderMode ? 'Exit reorder mode' : 'Reorder spells'}>
								<IconButton
									size="small"
									onClick={(event) => {
										event.stopPropagation()
										setReorderMode(!reorderMode)
									}}
									sx={{
										mb: 0.75,
										border: '1px solid',
										borderColor: reorderMode ? 'primary.main' : 'divider',
										color: reorderMode ? 'primary.main' : 'inherit',
									}}
								>
									<SwapVert fontSize="inherit" />
								</IconButton>
							</Tooltip>
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
								<span>
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
								</span>
							</Tooltip>
						</Box>
					</AccordionSummary>{' '}
					<AccordionDetails>
						<DynamicList droppableId="spells" onDragEnd={onSpellReorder}>
							{spells.map((s, index) => (
								<DynamicListItem
									key={s.id}
									id={s.id}
									index={index}
									showDragHandle={reorderMode}
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

import { Box, IconButton, Tooltip } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { Autorenew, Search, SwapVert } from '@mui/icons-material'
import { DynamicList } from '@site/src/features/CharacterSheet/components/DynamicList'
import { DynamicListItem } from '@site/src/features/CharacterSheet/components/DynamicList/DynamicListItem'
import { DropResult } from '@hello-pangea/dnd'
import { CharacterDocument, Spell } from '../../../../types/Character'
import { DeepPartial } from '../../CharacterSheetContainer'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { SpellRow } from './SpellRow'
import { ListSection, MarkButton, TabHeader } from '../../components'
import { SPELL_HEADINGS, spellHeaderTemplate } from './components/spellColumns'
import { SpellsSearchDialog } from './SpellsSearchDialog'
import { SpellsHeader } from './SpellsHeader'
import { RefreshUpdatesDialog } from '../../components/RefreshUpdatesDialog'
import { computeSpellUpdates } from '../../utils/computeContentUpdates'

export const SpellsTab: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const { magicSkill, specialization, focus, spellCatalystDamage, spells } =
		useMemo(() => activeCharacter.spells, [activeCharacter.spells])

	const [isSpellsDialogOpen, setIsSpellsDialogOpen] = useState(false)
	const [isRefreshDialogOpen, setIsRefreshDialogOpen] = useState(false)
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

	// Detect spells that have drifted from the latest JSON rulebook versions
	const spellUpdates = useMemo(
		() => computeSpellUpdates(spells, magicType),
		[spells, magicType],
	)

	const applySpellUpdates = (selectedIds: string[]) => {
		const idSet = new Set(selectedIds)
		spellUpdates
			.filter((u) => idSet.has(u.id))
			.forEach((u) => {
				dispatch(
					characterSheetActions.updateSpell({
						update: u.next,
						index: u.index,
					}),
				)
			})
		setIsRefreshDialogOpen(false)
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
				{/* M13 S6: every tab opens on the same plate — the carved frame spent once,
					holding the tab's name and the band of facts about the whole tab. */}
				<TabHeader>
					<SpellsHeader
						magicSkill={magicSkill}
						specialization={specialization}
						spellCatalystDamage={spellCatalystDamage}
						updateCharacter={updateCharacter}
					/>
				</TabHeader>

				{/* M13 S5: was an MUI `Accordion` with a bold `SectionHeader` and a
					hand-built row of icon buttons — the same arrangement S4 replaced on the
					Items tab, and the last copy of it on the sheet. `ListSection` supplies
					the washed heading, the count, the collapse and the levelled control
					strip; what stays here is only what this list actually owns. */}
				<ListSection
					label="Spells"
					count={spells.length}
					collapsible
					defaultExpanded
					className="cs-ledger-cols"
					actions={
						/* Section-specific tools first, then the three verbs every section
							has (reorder, add, search) — the same order the Skills tab's
							strip takes, so a reader learns one shape rather than one per
							tab. */
						<>
							<Tooltip
								title={
									spellUpdates.length
										? `Update ${spellUpdates.length} spell${spellUpdates.length === 1 ? '' : 's'} to their latest versions`
										: 'Spells are up to date'
								}
							>
								{/* `pending`, so it pulses — see the Skills tab's twin and the
									`data-state` block in characterSheet.css. Spells that have
									drifted from the rulebook are an outstanding action of yours,
									which is the state this sheet animates. */}
								<IconButton
									size="small"
									onClick={() => setIsRefreshDialogOpen(true)}
									data-state={spellUpdates.length ? 'pending' : undefined}
									aria-label={
										spellUpdates.length
											? `Refresh spells — ${spellUpdates.length} out of date`
											: 'Refresh spells'
									}
								>
									<Autorenew fontSize="inherit" />
								</IconButton>
							</Tooltip>
							<Tooltip
								title={reorderMode ? 'Exit reorder mode' : 'Reorder spells'}
							>
								<IconButton
									size="small"
									data-state={reorderMode ? 'on' : 'off'}
									onClick={() => setReorderMode(!reorderMode)}
								>
									<SwapVert fontSize="inherit" />
								</IconButton>
							</Tooltip>
							<MarkButton glyph="+" label="Add spell" onClick={addNewSpell} />
							<Tooltip
								title={`Search ${magicType === 'Arcana' ? 'Arcane' : magicType === 'Mysticism' ? 'Mystic' : ''} spells from the rulebook`}
							>
								<span>
									<IconButton
										size="small"
										onClick={() => setIsSpellsDialogOpen(true)}
										disabled={!magicType}
									>
										<Search fontSize="inherit" />
									</IconButton>
								</span>
							</Tooltip>
						</>
					}
				>
					{/* The ledger's column header — decorative, since every cell still
						carries its own label for the accessibility tree. */}
					{spells.length > 0 && (
						<Box
							className="cs-ledger-head"
							aria-hidden="true"
							sx={{
								gridTemplateColumns: spellHeaderTemplate(),
								// Fills the working column (M13 S11); the column carries the ceiling.
								maxWidth: '100%',
							}}
						>
							{SPELL_HEADINGS.map((heading, index) => (
								<span key={index} style={{ textAlign: heading.align }}>
									{heading.label}
								</span>
							))}
						</Box>
					)}
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
				</ListSection>
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

			<RefreshUpdatesDialog
				open={isRefreshDialogOpen}
				onClose={() => setIsRefreshDialogOpen(false)}
				title="Refresh spells from rulebook"
				itemNoun="spell"
				metaColumns={[
					{ label: 'Discipline', width: 'minmax(0, 1fr)' },
					{ label: 'Rank', width: '3.5rem' },
				]}
				entries={spellUpdates.map((u) => ({
					id: u.id,
					name: u.name,
					meta: [u.type || '—', String(u.rank)],
					changes: u.changes,
				}))}
				onConfirm={applySpellUpdates}
			/>
		</Box>
	)
}

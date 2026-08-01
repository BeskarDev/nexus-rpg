import { Autorenew, Build, Search, SwapVert } from '@mui/icons-material'
import StatSigil from '@site/src/components/codex/StatSigil'
import {
	Box,
	IconButton,
	Tooltip,
	Menu,
	MenuItem,
	FormControlLabel,
	Checkbox,
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import { DropResult } from '@hello-pangea/dnd'
import { Ability } from '../../../../types/Character'
import { ABILITY_TAGS, AbilityTag } from '../../../../types/AbilityTag'

import {
	ListSection,
	ListSectionHeader,
	MarkButton,
	SheetChip,
} from '../../components'
import { getSkillChipColor } from '../../../../constants/skills'
import { DynamicList } from '@site/src/features/CharacterSheet/components/DynamicList'
import { DynamicListItem } from '@site/src/features/CharacterSheet/components/DynamicList/DynamicListItem'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { CombatArtsSearchDialog } from './CombatArtsSearchDialog'
import { TalentsSearchDialog } from '../02_Items/SearchDialog/TalentsSearchDialog'
import { AbilityRow } from './AbilityRow'
import { QuickRefSection } from './QuickRefSection'
import { getTalentPointSummaries } from '../../utils/calculateTalentPoints'
import { TalentPointsDialog } from './components'
import { calculateCharacterLevel } from '../../utils/calculateCharacterLevel'
import { calculateMaxXpPerSkill } from '../../utils/validation'
import { RefreshUpdatesDialog } from '../../components/RefreshUpdatesDialog'
import { computeTalentUpdates } from '../../utils/computeContentUpdates'

export const CategorizedAbilities: React.FC = () => {
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const {
		abilities,
		skills: trainedSkills = [],
		xp,
		abilityCategoryVisibility,
		quickRefSelections = { abilities: [], weapons: [], items: [] },
	} = useMemo(() => activeCharacter.skills, [activeCharacter.skills])

	const [settingsMenuAnchor, setSettingsMenuAnchor] =
		useState<null | HTMLElement>(null)
	const [isCombatArtsDialogOpen, setIsCombatArtsDialogOpen] = useState(false)
	const [isTalentsDialogOpen, setIsTalentsDialogOpen] = useState(false)
	const [isTalentRefreshDialogOpen, setIsTalentRefreshDialogOpen] =
		useState(false)
	const [isTalentInfoDialogOpen, setIsTalentInfoDialogOpen] = useState(false)
	const [reorderMode, setReorderMode] = useState<Record<AbilityTag, boolean>>({
		'Combat Art': false,
		Talent: false,
		Folk: false,
		Other: false,
	})

	const toggleReorderMode = (tag: AbilityTag) => {
		setReorderMode((prev) => ({
			...prev,
			[tag]: !prev[tag],
		}))
	}

	const totalSpentXp =
		xp?.spend ?? trainedSkills.reduce((sum, skill) => sum + (skill.xp || 0), 0)
	const characterLevel = calculateCharacterLevel(totalSpentXp)
	const maxXpPerSkill = calculateMaxXpPerSkill(totalSpentXp)

	const { summaries: talentSummaries, unassignedSpent } = useMemo(
		() => getTalentPointSummaries(trainedSkills, abilities),
		[trainedSkills, abilities],
	)
	/*
		What the header's alert is for.

		It used to fire on unspent points ALONE, which left the one state that is
		actually wrong — more points committed than the skill has earned — with no
		surface anywhere on the sheet. `overspentTalentSummaries` was computed for
		it and never read, and `missingTalentSummaries` was a second binding for
		the same rows as `openTalentSummaries`. Both are gone; the dialog does its
		own grouping from the full list.
	*/
	const hasOverspentTalents = talentSummaries.some(
		(summary) => summary.overspent > 0,
	)
	const hasOpenTalentPoints = talentSummaries.some(
		(summary) => summary.available > summary.spent,
	)
	const showTalentNotice =
		hasOverspentTalents || hasOpenTalentPoints || unassignedSpent > 0

	const abilitiesByTag = useMemo(() => {
		const grouped: Record<AbilityTag, Ability[]> = {
			'Combat Art': [],
			Talent: [],
			Folk: [],
			Other: [],
		}

		abilities.forEach((ability) => {
			const tag = ability.tag || 'Other'
			grouped[tag].push(ability)
		})

		return grouped
	}, [abilities])

	// Detect talents that have drifted from the latest JSON rulebook versions
	const talentUpdates = useMemo(
		() => computeTalentUpdates(abilities),
		[abilities],
	)

	const applyTalentUpdates = (selectedIds: string[]) => {
		const idSet = new Set(selectedIds)
		talentUpdates
			.filter((u) => idSet.has(u.id))
			.forEach((u) => {
				dispatch(
					characterSheetActions.updateAbility({
						update: u.next,
						index: u.index,
					}),
				)
			})
		setIsTalentRefreshDialogOpen(false)
	}

	const addNewAbility = (tag: AbilityTag) => {
		dispatch(characterSheetActions.addNewAbility({ tag }))
	}

	const updateAbility = (update: Partial<Ability>, abilityId: string) => {
		const index = abilities.findIndex((a) => a.id === abilityId)
		if (index >= 0) {
			dispatch(characterSheetActions.updateAbility({ update, index }))
		}
	}

	const moveAbilityToCategory = (abilityId: string, newTag: AbilityTag) => {
		const index = abilities.findIndex((a) => a.id === abilityId)
		if (index >= 0) {
			dispatch(
				characterSheetActions.updateAbility({
					update: { tag: newTag },
					index,
				}),
			)
		}
	}

	const deleteAbility = (ability: Ability) => {
		dispatch(characterSheetActions.deleteAbility(ability))
	}

	const toggleQuickRef = (abilityId: string) => {
		dispatch(characterSheetActions.toggleQuickRefAbility(abilityId))
	}

	const toggleCategoryVisibility = (tag: AbilityTag) => {
		dispatch(characterSheetActions.toggleAbilityCategoryVisibility(tag))
	}

	const handleSettingsMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setSettingsMenuAnchor(event.currentTarget)
	}

	const handleSettingsMenuClose = () => {
		setSettingsMenuAnchor(null)
	}

	const onAbilityReorder =
		(tag: AbilityTag) =>
		({ source, destination }: DropResult) => {
			// dropped outside the list
			if (!destination) return

			const tagAbilities = abilitiesByTag[tag]
			const sourceAbility = tagAbilities[source.index]

			// Check if we're dragging within the same category
			if (source.droppableId === destination.droppableId) {
				// Same category reordering
				const destinationAbility = tagAbilities[destination.index]
				const sourceGlobalIndex = abilities.findIndex(
					(a) => a.id === sourceAbility.id,
				)
				const destinationGlobalIndex = abilities.findIndex(
					(a) => a.id === destinationAbility.id,
				)

				dispatch(
					characterSheetActions.reorderAbility({
						source: sourceGlobalIndex,
						destination: destinationGlobalIndex,
					}),
				)
			}
		}

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				maxWidth: 'var(--cs-max-width-lg)',
			}}
		>
			{/* Quick Ref Section */}
			<QuickRefSection />

			{/* M13 S3: the tab's own heading, on the shared ruled header. It carries
				no count — it is the title of the whole list, and the per-tag headers
				below it are what have quantities. */}
			<ListSectionHeader
				label="Abilities"
				sx={{ mb: 1 }}
				actions={
					<Tooltip title="toggle ability categories">
						<IconButton size="small" onClick={handleSettingsMenuOpen}>
							<Build fontSize="inherit" />
						</IconButton>
					</Tooltip>
				}
			/>
			<Box>
				<Menu
					anchorEl={settingsMenuAnchor}
					open={Boolean(settingsMenuAnchor)}
					onClose={handleSettingsMenuClose}
					transformOrigin={{ horizontal: 'left', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
				>
					{ABILITY_TAGS.map((tag) => {
						const isVisible = abilityCategoryVisibility?.[tag] ?? true
						return (
							<MenuItem key={tag} dense>
								<FormControlLabel
									control={
										<Checkbox
											checked={isVisible}
											onChange={() => {
												toggleCategoryVisibility(tag)
											}}
											size="small"
										/>
									}
									label={tag}
									sx={{ width: '100%', margin: 0 }}
								/>
							</MenuItem>
						)
					})}
				</Menu>
			</Box>

			{ABILITY_TAGS.map((tag) => {
				const tagAbilities = abilitiesByTag[tag]
				const isVisible = abilityCategoryVisibility?.[tag] ?? true

				if (!isVisible) {
					return null
				}

				return (
					<ListSection
						key={tag}
						label={tag}
						count={tagAbilities.length}
						collapsible
						defaultExpanded
						actions={
							/* Two registers, and the order says which is which (owner call).
								A section's OWN tools come first — talent points, refresh from
								the rulebook — then the three verbs every section has: reorder,
								add, search. Refresh used to sit last, so the one control that
								appears on a single tag was on the far side of the three that
								appear on all of them, and the strip's shape changed per tag
								with no rule behind where anything sat. */
							<>
								{tag === 'Talent' && (
									<Tooltip
										title={
											showTalentNotice
												? 'Spend your talent points'
												: 'Talent points'
										}
									>
										{/* The ledger's doorway, always present — the dialog now
											reports the SETTLED state too, so a reader who has
											nothing to spend still has something to check. The
											warning ink is the alert; the control is not.

											The mark is the ziggurat (`xp`), which is both where
											talent points come from and the TalentCard's own
											keystone, rather than Material's warning triangle.

											`alert`, not `pending`: unspent points are a standing
											condition, not an outstanding action of yours, and no
											single press resolves them. Warning ink, no motion. */}
										<IconButton
											size="small"
											data-state={showTalentNotice ? 'alert' : undefined}
											aria-label="Talent points"
											onClick={() => setIsTalentInfoDialogOpen(true)}
										>
											<StatSigil name="xp" size="1em" />
										</IconButton>
									</Tooltip>
								)}
								{tag === 'Talent' && (
									<Tooltip
										title={
											talentUpdates.length
												? `Update ${talentUpdates.length} talent${talentUpdates.length === 1 ? '' : 's'} to their latest versions`
												: 'Talents are up to date'
										}
									>
										{/* `pending`, so it pulses: talents have drifted from the
											rulebook and one press reconciles them. Same device the
											party notes' unsaved-changes control uses, because it is
											the same kind of state — an action of yours is
											outstanding, and a colour alone is read past. */}
										<IconButton
											size="small"
											onClick={() => setIsTalentRefreshDialogOpen(true)}
											data-state={talentUpdates.length ? 'pending' : undefined}
											aria-label={
												talentUpdates.length
													? `Refresh talents — ${talentUpdates.length} out of date`
													: 'Refresh talents'
											}
										>
											<Autorenew fontSize="inherit" />
										</IconButton>
									</Tooltip>
								)}
								<Tooltip
									title={
										reorderMode[tag] ? 'Exit reorder mode' : 'Reorder abilities'
									}
								>
									{/* The one control in a header that keeps a box, because here
										the border is INFORMATION: it says reorder mode is on. Off,
										it drops to the same bare bronze as its neighbours. */}
									<IconButton
										size="small"
										data-state={reorderMode[tag] ? 'on' : 'off'}
										onClick={() => toggleReorderMode(tag)}
									>
										<SwapVert fontSize="inherit" />
									</IconButton>
								</Tooltip>
								<MarkButton
									glyph="+"
									label={`Add ${tag}`}
									onClick={() => addNewAbility(tag)}
								/>
								{tag === 'Combat Art' && (
									<Tooltip title="Search Combat Arts from database">
										<IconButton
											size="small"
											onClick={() => setIsCombatArtsDialogOpen(true)}
										>
											<Search fontSize="inherit" />
										</IconButton>
									</Tooltip>
								)}
								{tag === 'Talent' && (
									<Tooltip title="Search Talents from database">
										<IconButton
											size="small"
											onClick={() => setIsTalentsDialogOpen(true)}
										>
											<Search fontSize="inherit" />
										</IconButton>
									</Tooltip>
								)}
							</>
						}
					>
						<DynamicList
							droppableId={`abilities-${tag}`}
							onDragEnd={onAbilityReorder(tag)}
						>
							{tagAbilities.map((ability, index) => (
								<DynamicListItem
									key={ability.id}
									id={ability.id}
									index={index}
									showDragHandle={reorderMode[tag]}
									sx={{ alignItems: 'center' }}
								>
									<AbilityRow
										key={ability.id}
										title={ability.title}
										description={ability.description}
										tag={ability.tag}
										actionType={ability.actionType}
										rank={ability.rank}
										skill={ability.skill}
										availableTags={[...ABILITY_TAGS]}
										updateAbility={(update) =>
											updateAbility(update, ability.id)
										}
										moveToCategory={(newTag) =>
											moveAbilityToCategory(ability.id, newTag)
										}
										deleteAbility={() => deleteAbility(ability)}
										abilityId={ability.id}
										isInQuickRef={quickRefSelections.abilities.includes(
											ability.id,
										)}
										onToggleQuickRef={toggleQuickRef}
									/>
								</DynamicListItem>
							))}
						</DynamicList>
					</ListSection>
				)
			})}

			<CombatArtsSearchDialog
				open={isCombatArtsDialogOpen}
				onClose={() => setIsCombatArtsDialogOpen(false)}
				character={activeCharacter}
				onImportCombatArts={(combatArts) => {
					combatArts.forEach((combatArt) => {
						dispatch(characterSheetActions.importAbilities([combatArt]))
					})
					setIsCombatArtsDialogOpen(false)
				}}
			/>

			<TalentsSearchDialog
				open={isTalentsDialogOpen}
				onClose={() => setIsTalentsDialogOpen(false)}
				character={activeCharacter}
				onImportTalents={(talents) => {
					talents.forEach((talent) => {
						dispatch(characterSheetActions.importAbilities([talent]))
					})
					setIsTalentsDialogOpen(false)
				}}
			/>

			<RefreshUpdatesDialog
				open={isTalentRefreshDialogOpen}
				onClose={() => setIsTalentRefreshDialogOpen(false)}
				title="Refresh talents from rulebook"
				itemNoun="talent"
				metaColumns={[
					{ label: 'Skill', width: 'minmax(0, 1fr)' },
					{ label: 'Rank', width: '3.5rem' },
				]}
				entries={talentUpdates.map((u) => ({
					id: u.id,
					name: u.name,
					meta: [
						/* A skill is named by a chip everywhere else on this tab, and the
							dialog is about to overwrite the field that names it. */
						u.skill ? (
							<SheetChip
								key="skill"
								tone={getSkillChipColor(u.skill)}
								surface="var(--ifm-background-surface-color)"
							>
								{u.skill}
							</SheetChip>
						) : (
							'—'
						),
						u.rank ? String(u.rank) : '—',
					],
					changes: u.changes,
				}))}
				onConfirm={applyTalentUpdates}
			/>

			<TalentPointsDialog
				open={isTalentInfoDialogOpen}
				onClose={() => setIsTalentInfoDialogOpen(false)}
				summaries={talentSummaries}
				unassignedSpent={unassignedSpent}
				characterLevel={characterLevel}
				maxXpPerSkill={maxXpPerSkill}
				onBrowseTalents={() => {
					setIsTalentInfoDialogOpen(false)
					setIsTalentsDialogOpen(true)
				}}
			/>
		</Box>
	)
}

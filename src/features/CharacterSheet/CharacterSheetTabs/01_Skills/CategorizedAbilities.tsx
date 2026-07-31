import {
	Autorenew,
	Build,
	Search,
	WarningAmberOutlined,
	SwapVert,
} from '@mui/icons-material'
import {
	Box,
	Chip,
	IconButton,
	Tooltip,
	Menu,
	MenuItem,
	FormControlLabel,
	Checkbox,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import { DropResult } from '@hello-pangea/dnd'
import { Ability } from '../../../../types/Character'
import { ABILITY_TAGS, AbilityTag } from '../../../../types/AbilityTag'

import { ListSection, ListSectionHeader, MarkButton } from '../../components'
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
import { getSkillChipColor } from '../../../../constants/skills'
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
		xp?.spend ??
		trainedSkills.reduce((sum, skill) => sum + (skill.xp || 0), 0)
	const characterLevel = calculateCharacterLevel(totalSpentXp)
	const maxXpPerSkill = calculateMaxXpPerSkill(totalSpentXp)

	const { summaries: talentSummaries, unassignedSpent } = useMemo(
		() => getTalentPointSummaries(trainedSkills, abilities),
		[trainedSkills, abilities],
	)
	const missingTalentSummaries = talentSummaries.filter(
		(summary) => summary.missing > 0,
	)
	const overspentTalentSummaries = talentSummaries.filter(
		(summary) => summary.overspent > 0,
	)
	const openTalentSummaries = talentSummaries.filter(
		(summary) => summary.available > summary.spent,
	)
	const showTalentNotice = openTalentSummaries.length > 0

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
							<>
								{tag === 'Talent' && openTalentSummaries.length > 0 && (
									<Tooltip title="Spend your talent points!">
										{/* An alert, not a toggle — it had a box for no reason
											other than that its neighbour had one. The warning ink
											is what marks it. */}
										<IconButton
											size="small"
											color="warning"
											onClick={() => setIsTalentInfoDialogOpen(true)}
										>
											<WarningAmberOutlined fontSize="inherit" />
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
								{tag === 'Talent' && (
									<Tooltip
										title={
											talentUpdates.length
												? `Update ${talentUpdates.length} talent${talentUpdates.length === 1 ? '' : 's'} to their latest versions`
												: 'Talents are up to date'
										}
									>
										<IconButton
											size="small"
											onClick={() => setIsTalentRefreshDialogOpen(true)}
											color={talentUpdates.length ? 'warning' : 'default'}
										>
											<Autorenew fontSize="inherit" />
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
										updateAbility={(update) => updateAbility(update, ability.id)}
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
				entries={talentUpdates.map((u) => ({
					id: u.id,
					name: u.name,
					sublabel: u.sublabel,
					changes: u.changes,
				}))}
				onConfirm={applyTalentUpdates}
			/>

			<Dialog
				open={showTalentNotice && isTalentInfoDialogOpen}
				onClose={() => setIsTalentInfoDialogOpen(false)}
				maxWidth="xs"
				fullWidth
			>
				<DialogTitle>Talent points</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ mb: 1 }}>
						Every 2 XP spent in a skill grants 1 talent point for that skill&apos;s
						talents. Level {characterLevel} (max {maxXpPerSkill} XP per skill).
					</DialogContentText>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
						{openTalentSummaries.map((summary) => {
							const open = Math.max(summary.available - summary.spent, 0)
							const text = `${summary.spent}/${summary.available} TP used`
							return (
								<Box
									key={`tp-${summary.skill}`}
									sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.primary' }}
								>
									<Box
										component="span"
										sx={{
											width: 10,
											height: 10,
											borderRadius: '50%',
											bgcolor: getSkillChipColor(summary.skill),
										}}
									/>
									<Typography variant="body2">
										{summary.skill}: {text}
									</Typography>
								</Box>
							)
						})}
						{unassignedSpent > 0 && (
							<Typography variant="body2">
								Assign skills to {unassignedSpent} untagged talent point
								{unassignedSpent > 1 ? 's' : ''}.
							</Typography>
						)}
					</Box>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setIsTalentInfoDialogOpen(false)}>Close</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}

import React, { useMemo, useState } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { Autorenew, SwapVert } from '@mui/icons-material'
import { DropResult } from '@hello-pangea/dnd'
import { Provider } from 'react-redux'
import { setupCompanionBuilderStore } from '@site/src/features/CompanionBuilder/store'
import { CompanionBuilder } from '@site/src/components/CompanionBuilder'
import { ownerFromCharacter } from '@site/src/utils/typescript/companion/companionBond'
import { DynamicList } from '@site/src/features/CharacterSheet/components/DynamicList/DynamicList'
import { DynamicListItem } from '@site/src/features/CharacterSheet/components/DynamicList/DynamicListItem'
import {
	ConfirmDialog,
	ListSection,
	MarkButton,
	RuleInfo,
} from '../../components'
import { RefreshUpdatesDialog } from '../../components/RefreshUpdatesDialog'
import type {
	CompanionBuild,
	CompanionBuildResult,
} from '@site/src/types/companion'
import { computeCompanionUpdates } from './utils/companionUpdates'
import { useAppSelector } from '../../hooks/useAppSelector'
import { CompanionRow } from './components/CompanionRow'
import { COMPANION_HEADINGS, companionHeaderTemplate } from './companionColumns'
import { useCompanionActions } from './hooks/useCompanionActions'

const companionBuilderStore = setupCompanionBuilderStore()

/**
 * The companions a character keeps, as a ledger (M13 S7).
 *
 * ## What this replaced
 *
 * A hand-built header (`SectionHeader` + a `HelpOutline` tooltip + a contained "Add
 * Companion" button with a Material `Add` icon) over a `DynamicList` of MUI `Accordion`s,
 * plus a delete confirmation dialog and three pieces of tab-level draft state
 * (`editingId`, `editName`, `editMarkdown`) driving an explicit edit mode.
 *
 * All of that is gone. The list is a `ListSection` with the levelled control strip every
 * other list on the sheet has; the rows are `CompanionRow`; the drafts are per-row and
 * commit on blur, which is what the rest of the sheet does and what makes the mode
 * unnecessary. See `CompanionRow` for the row's own account.
 *
 * ## What is kept, and why
 *
 * The **Companion Builder** stays a labelled command rather than becoming an icon: it
 * opens a separate tool that generates a stat block, which is the same class of thing as
 * the Items tab's Magic Item Builder and reads correctly beside it. And its explanation
 * stays, because "paste the generated markdown into a companion" is not guessable — it is
 * a `RuleInfo` gloss on the section now rather than a bare `HelpOutline` floating beside
 * the heading.
 */
export const CompanionsTab: React.FC = () => {
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)
	const companions = useMemo(
		() => activeCharacter?.companions || [],
		[activeCharacter],
	)
	const [reorderMode, setReorderMode] = useState(false)
	// The owner's Animal Companion rank, Nature and Wild Companion, to prefill the
	// builder's Bond register. Editable there, since the talent's rank 2 and rank 3
	// choices are not stored on the character.
	const owner = useMemo(
		() => ownerFromCharacter(activeCharacter),
		[activeCharacter],
	)

	const {
		addCompanion,
		deleteCompanion,
		updateCompanion,
		updateCompanionWithAutoHP,
		importCompanion,
		applyCompanionRebuild,
		reorderCompanions,
	} = useCompanionActions()

	/** The companion open in the builder for a rebuild, if any. */
	const [rebuildTarget, setRebuildTarget] = useState<{
		companionId: string
		companionName: string
		build: CompanionBuild
	} | null>(null)
	/** A rebuilt stat block waiting for the player to confirm the replacement. */
	const [pendingRebuild, setPendingRebuild] = useState<{
		companionId: string
		result: CompanionBuildResult
	} | null>(null)
	const [refreshOpen, setRefreshOpen] = useState(false)

	// Builder-made companions whose block no longer matches the current rules and
	// the owner as they are now.
	const companionUpdates = useMemo(
		() => computeCompanionUpdates(companions, owner),
		[companions, owner],
	)

	const confirmRebuild = () => {
		if (!pendingRebuild) return
		const companion = companions.find(
			(entry) => entry.id === pendingRebuild.companionId,
		)
		if (companion) applyCompanionRebuild(companion, pendingRebuild.result)
		setPendingRebuild(null)
		setRebuildTarget(null)
	}

	const applyRefresh = (selectedIds: string[]) => {
		const chosen = new Set(selectedIds)
		companionUpdates
			.filter((update) => chosen.has(update.id))
			.forEach((update) => {
				const companion = companions.find((entry) => entry.id === update.id)
				if (companion) applyCompanionRebuild(companion, update.result)
			})
		setRefreshOpen(false)
	}

	const onReorder = ({ source, destination }: DropResult) => {
		if (!destination) return
		reorderCompanions(source.index, destination.index)
	}

	const importFromBuilder = (
		name: string,
		markdown: string,
		build: CompanionBuild,
	) => importCompanion(name, markdown, build)

	return (
		<Box sx={{ width: '100%' }}>
			<ListSection
				label="Companions"
				count={companions.length}
				collapsible
				defaultExpanded
				className="cs-ledger-cols"
				info={
					<RuleInfo label="About companions">
						A companion is a creature that fights or travels with you — a mount,
						a summoned spirit, a hired hand. Build one in the{' '}
						<b>Companion Builder</b>, then paste the generated stat block into
						its markdown; the HP in that block fills the companion's pool
						automatically. A companion imported from the builder can be rebuilt
						from its row, and the refresh mark updates every one of them to the
						current rules.
					</RuleInfo>
				}
				actions={
					<>
						<Tooltip
							title={
								companionUpdates.length
									? `Update ${companionUpdates.length} companion${companionUpdates.length === 1 ? '' : 's'} to the current rules`
									: 'Companions are up to date'
							}
						>
							{/* The Spells and Skills tabs' refresh, for builder-made companions:
								their saved build regenerated against the current rules and the
								owner's current talent, Nature and spells. `pending` pulses. */}
							<IconButton
								size="small"
								onClick={() => setRefreshOpen(true)}
								data-state={companionUpdates.length ? 'pending' : undefined}
								aria-label={
									companionUpdates.length
										? `Refresh companions — ${companionUpdates.length} out of date`
										: 'Refresh companions'
								}
							>
								<Autorenew fontSize="inherit" />
							</IconButton>
						</Tooltip>
						<Tooltip
							title={reorderMode ? 'Exit reorder mode' : 'Reorder companions'}
						>
							<IconButton
								size="small"
								data-state={reorderMode ? 'on' : 'off'}
								onClick={() => setReorderMode(!reorderMode)}
							>
								<SwapVert fontSize="inherit" />
							</IconButton>
						</Tooltip>
						<MarkButton
							glyph="+"
							label="Add companion"
							onClick={() => addCompanion()}
						/>
						{/* A real command, like the Magic Item Builder on the Items tab: it opens
							a separate tool rather than changing something here. */}
						<Provider store={companionBuilderStore}>
							<CompanionBuilder
								onImportCompanion={importFromBuilder}
								owner={owner}
								rebuild={rebuildTarget}
								onUpdateCompanion={(companionId, result) =>
									setPendingRebuild({ companionId, result })
								}
								onRebuildClose={() => setRebuildTarget(null)}
							/>
						</Provider>
					</>
				}
			>
				{companions.length > 0 ? (
					<>
						<Box
							className="cs-ledger-head"
							aria-hidden="true"
							sx={{
								gridTemplateColumns: companionHeaderTemplate(),
								// Fills the working column (M13 S11); the column carries the ceiling.
								maxWidth: '100%',
							}}
						>
							{COMPANION_HEADINGS.map((heading, index) => (
								<span key={index} style={{ textAlign: heading.align }}>
									{heading.label}
								</span>
							))}
						</Box>
						<DynamicList droppableId="companions" onDragEnd={onReorder}>
							{companions.map((companion, index) => (
								<DynamicListItem
									key={companion.id}
									id={companion.id}
									index={index}
									showDragHandle={reorderMode}
									sx={{ alignItems: 'baseline' }}
								>
									<CompanionRow
										companion={companion}
										updateCompanion={(update) =>
											updateCompanion(companion.id, update)
										}
										updateWithAutoHP={(update) =>
											updateCompanionWithAutoHP(
												companion.id,
												update,
												companion.currentHP,
											)
										}
										deleteCompanion={() =>
											deleteCompanion(companion.id, companions)
										}
										onRebuild={
											companion.build
												? () =>
														setRebuildTarget({
															companionId: companion.id,
															companionName: companion.name,
															build: companion.build!,
														})
												: undefined
										}
									/>
								</DynamicListItem>
							))}
						</DynamicList>
					</>
				) : (
					<Typography
						sx={{
							px: 1,
							py: 2,
							fontFamily: 'var(--nexus-font-ui)',
							fontSize: 'var(--nexus-text-dense)',
							color: 'text.secondary',
						}}
					>
						No companions yet. Add one, or build a stat block in the Companion
						Builder and import it.
					</Typography>
				)}
			</ListSection>

			{/* The one confirmation shape: a rebuild overwrites the stat block, and any
				hand edits in it cannot be rebuilt from the rulebook. */}
			<ConfirmDialog
				open={Boolean(pendingRebuild)}
				title="Update companion?"
				confirmLabel="Update companion"
				onConfirm={confirmRebuild}
				onCancel={() => setPendingRebuild(null)}
			>
				<strong>This replaces the stat block.</strong> Any edits you made to its
				markdown by hand are lost. The companion keeps its name and wounds, and
				its current HP is capped at the new maximum.
			</ConfirmDialog>

			<RefreshUpdatesDialog
				open={refreshOpen}
				onClose={() => setRefreshOpen(false)}
				title="Refresh companions from the rules"
				itemNoun="companion"
				metaColumns={[{ label: 'Creature', width: 'minmax(0, 1fr)' }]}
				entries={companionUpdates.map((update) => ({
					id: update.id,
					name: update.name,
					meta: [update.trait],
					changes: update.changes,
				}))}
				onConfirm={applyRefresh}
			/>
		</Box>
	)
}

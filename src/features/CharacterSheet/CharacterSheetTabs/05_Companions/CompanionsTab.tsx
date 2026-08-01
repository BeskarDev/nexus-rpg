import React, { useMemo, useState } from 'react'
import { Box, IconButton, Tooltip, Typography } from '@mui/material'
import { SwapVert } from '@mui/icons-material'
import { DropResult } from '@hello-pangea/dnd'
import { Provider } from 'react-redux'
import { setupCompanionBuilderStore } from '@site/src/features/CompanionBuilder/store'
import { CompanionBuilder } from '@site/src/components/CompanionBuilder'
import { DynamicList } from '@site/src/features/CharacterSheet/components/DynamicList/DynamicList'
import { DynamicListItem } from '@site/src/features/CharacterSheet/components/DynamicList/DynamicListItem'
import { ListSection, MarkButton, RuleInfo } from '../../components'
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

	const {
		addCompanion,
		deleteCompanion,
		updateCompanion,
		updateCompanionWithAutoHP,
		reorderCompanions,
	} = useCompanionActions()

	const onReorder = ({ source, destination }: DropResult) => {
		if (!destination) return
		reorderCompanions(source.index, destination.index)
	}

	const importFromBuilder = (name: string, markdown: string) => {
		const id = addCompanion()
		updateCompanionWithAutoHP(id, { name, markdown })
	}

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
						automatically.
					</RuleInfo>
				}
				actions={
					<>
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
							<CompanionBuilder onImportCompanion={importFromBuilder} />
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
								maxWidth: 'var(--cs-max-width-lg)',
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
		</Box>
	)
}

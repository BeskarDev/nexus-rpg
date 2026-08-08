import React, { useState } from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import { SwapVert } from '@mui/icons-material'
import { DropResult } from '@hello-pangea/dnd'
import { NpcRelationship } from '@site/src/types/Character'
import { DynamicList } from './DynamicList'
import { DynamicListItem } from './DynamicList/DynamicListItem'
import { ListSection } from './ListSection'
import { MarkButton } from './MarkButton'
import { NpcRow } from '../CharacterSheetTabs/04_Personal/NpcRow'
import {
	NPC_HEADINGS,
	npcHeaderTemplate,
} from '../CharacterSheetTabs/04_Personal/npcColumns'

export type NpcRelationshipsSectionProps = {
	npcRelationships: NpcRelationship[]
	onAdd: () => void
	onUpdate: (update: Partial<NpcRelationship>, index: number) => void
	onDelete: (index: number) => void
	onReorder: (result: DropResult) => void
}

/**
 * The people a character knows, as a ledger (M13 S6).
 *
 * ## What changed
 *
 * It was a bold `SectionHeader` beside a bare `AddCircle` icon button, over a list capped
 * at `maxHeight: 30rem` with `overflow-y: auto` and a `34rem` measure. Three faults:
 *
 * - The header was the ad-hoc arrangement `ListSection` exists to replace — the fifth copy
 *   of it, and the last one on the sheet after S3 through S5 took the other four.
 * - **The inner scroll.** A list inside a scrolling page that scrolls on its own means the
 *   page's scrollbar stops meaning "there is more", and on a phone a drag near the list
 *   either scrolls the list or the page depending on a few pixels. The tab scrolls; the
 *   list does not.
 * - The `34rem` cap made this the one list on the sheet that did not share the ledger
 *   measure, so its rows lined up with nothing.
 *
 * It also gains a reorder toggle: the list was always drag-reorderable, and the handle
 * was permanently visible on every row, where every other list on the sheet hides it
 * behind the toggle in its control strip.
 */
export const NpcRelationshipsSection: React.FC<
	NpcRelationshipsSectionProps
> = ({ npcRelationships, onAdd, onUpdate, onDelete, onReorder }) => {
	const [reorderMode, setReorderMode] = useState(false)
	const relationships = npcRelationships || []

	return (
		<ListSection
			label="NPC Relationships"
			count={relationships.length}
			collapsible
			defaultExpanded
			className="cs-ledger-cols"
			actions={
				<>
					<Tooltip
						title={reorderMode ? 'Exit reorder mode' : 'Reorder relationships'}
					>
						<IconButton
							size="small"
							data-state={reorderMode ? 'on' : 'off'}
							onClick={() => setReorderMode(!reorderMode)}
						>
							<SwapVert fontSize="inherit" />
						</IconButton>
					</Tooltip>
					<MarkButton glyph="+" label="Add relationship" onClick={onAdd} />
				</>
			}
		>
			{relationships.length > 0 && (
				<Box
					className="cs-ledger-head"
					aria-hidden="true"
					sx={{
						gridTemplateColumns: npcHeaderTemplate(),
						// Fills the working column (M13 S11); the column carries the ceiling.
						maxWidth: '100%',
					}}
				>
					{NPC_HEADINGS.map((heading, index) => (
						<span key={index} style={{ textAlign: heading.align }}>
							{heading.label}
						</span>
					))}
				</Box>
			)}
			<DynamicList droppableId="npc-relationships" onDragEnd={onReorder}>
				{relationships.map((npc, index) => (
					<DynamicListItem
						key={npc.id}
						id={npc.id}
						index={index}
						showDragHandle={reorderMode}
						sx={{ alignItems: 'baseline' }}
					>
						<NpcRow
							key={npc.id}
							npcRelationship={npc}
							updateNpc={(update) => onUpdate(update, index)}
							deleteNpc={() => onDelete(index)}
						/>
					</DynamicListItem>
				))}
			</DynamicList>
		</ListSection>
	)
}

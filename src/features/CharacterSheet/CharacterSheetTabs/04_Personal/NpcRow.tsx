import React, { useEffect, useState } from 'react'
import { Box, MenuItem, Typography } from '@mui/material'
import { UnifiedListItem } from '@site/src/features/CharacterSheet/components/DynamicList'
import {
	DeleteButton,
	DetailField,
	DetailsGroup,
	DetailsPanel,
	Inscription,
	RecordPlate,
	RecordRow,
} from '@site/src/features/CharacterSheet/components'
import {
	NpcDisposition,
	NpcRelationship,
	NpcRole,
	npcDispositionArray,
	npcRoleArray,
} from '@site/src/types/Character'
import { NPC_TEMPLATE } from './npcColumns'
import {
	NPC_DISPOSITION_DESCRIPTION,
	NPC_ROLE_DESCRIPTION,
	npcDispositionLabel,
	npcDispositionTone,
} from './npcRules'

export type NpcRowProps = {
	npcRelationship: NpcRelationship
	updateNpc: (update: Partial<NpcRelationship>) => void
	deleteNpc: () => void
}

/**
 * One relationship, as a ledger row that opens into its record (M13 S6).
 *
 * ## What it was
 *
 * A wrapping flex summary holding an editable name field, two MUI `Chip`s in Material
 * palette colours, and a delete button that opened a confirmation `Dialog`. Four faults,
 * three of them ones every other tab has already had fixed:
 *
 * - **The row was a form** — the name was editable in the summary while role, disposition
 *   and description were edited in the details, so one NPC had two editing surfaces.
 * - **The chips carried Material colours** (`color="success"`, `color="error"`) rather than
 *   the sheet's alert inks, and they were the only stock-palette chips left on the sheet.
 * - **The rules were trapped in tooltips.** Each role and disposition has a published
 *   description, and the only way to read one was to hover a chip — invisible on a phone,
 *   and unavailable in the panel where you actually choose the value.
 * - **Delete asked twice.** A confirmation dialog for one row of freeform notes, where
 *   every other list on the sheet deletes on the spot.
 *
 * ## What it is
 *
 * Read cells on the shared four-track grid, and a details panel on the S4d expanded-row
 * pattern: the record plate for role and disposition (each with its rules text under the
 * select that sets it), an inscription for the notes. Disposition reads `friendly +1` in
 * the sheet's own alert ink, which is the same vocabulary encumbrance and wear use.
 */
export const NpcRow: React.FC<NpcRowProps> = ({
	npcRelationship,
	updateNpc,
	deleteNpc,
}) => {
	const [draft, setDraft] = useState(npcRelationship)
	// Keep the draft in step when the record changes underneath — a reorder, or another
	// device's write arriving.
	useEffect(() => setDraft(npcRelationship), [npcRelationship])

	return (
		<UnifiedListItem
			summaryClassName="cs-ledger-row-grid"
			summarySx={{ gridTemplateColumns: NPC_TEMPLATE, columnGap: 1 }}
			summaryContent={
				<>
					<Cell label="Name" strong>
						{npcRelationship.name || 'Unnamed'}
					</Cell>
					<Cell label="Role" muted>
						{npcRelationship.role}
					</Cell>
					<Cell
						label="Disposition"
						tone={npcDispositionTone(npcRelationship.disposition)}
					>
						{npcDispositionLabel(npcRelationship.disposition)}
					</Cell>
					<Cell label="Notes" muted>
						{npcRelationship.description}
					</Cell>
				</>
			}
			detailsContent={
				<DetailsPanel
					// Wider than the default: this aside carries rules PROSE under the selects,
					// not just figures.
					asideWidth="24rem"
					aside={
						<>
							<RecordPlate
								label="Standing"
								actions={
									<DeleteButton
										onDelete={deleteNpc}
										entityKind="NPC"
										entityName={draft.name}
									/>
								}
							>
								<RecordRow sigil="folk" label="Role">
									<DetailField
										select
										value={draft.role}
										onChange={(event) =>
											updateNpc({ role: event.target.value as NpcRole })
										}
										width="8rem"
										inputProps={{ 'aria-label': 'Role' }}
									>
										{npcRoleArray.map((role) => (
											<MenuItem key={role} value={role}>
												{role}
											</MenuItem>
										))}
									</DetailField>
								</RecordRow>
								<RecordRow sigil="party" label="Disposition">
									<DetailField
										select
										value={draft.disposition}
										onChange={(event) =>
											updateNpc({
												disposition: Number(
													event.target.value,
												) as NpcDisposition,
											})
										}
										width="8rem"
										inputProps={{ 'aria-label': 'Disposition' }}
									>
										{npcDispositionArray.map((entry) => (
											<MenuItem key={entry.value} value={entry.value}>
												{npcDispositionLabel(entry.value)}
											</MenuItem>
										))}
									</DetailField>
								</RecordRow>
							</RecordPlate>
							{/* The rules text, where the value is chosen rather than behind a hover.
							Both descriptions are published and neither is guessable from the word
							alone — "Seeker" and "disposition +1" are not self-explaining. */}
							<DetailsGroup label="What that means" sigil="description">
								<Gloss>
									<b>{draft.role}.</b> {NPC_ROLE_DESCRIPTION[draft.role]}
								</Gloss>
								<Gloss>
									<b>{npcDispositionLabel(draft.disposition)}.</b>{' '}
									{NPC_DISPOSITION_DESCRIPTION[draft.disposition]}
								</Gloss>
							</DetailsGroup>
						</>
					}
				>
					<DetailsGroup label="Who they are" sigil="name">
						<Inscription
							subject
							grow={2}
							label="Name"
							value={draft.name}
							onChange={(event) =>
								setDraft((npc) => ({ ...npc, name: event.target.value }))
							}
							onBlur={() => updateNpc({ name: draft.name })}
						/>
						<Inscription
							block
							multiline
							maxRows={8}
							label="How you know them"
							value={draft.description}
							onChange={(event) =>
								setDraft((npc) => ({ ...npc, description: event.target.value }))
							}
							onBlur={() => updateNpc({ description: draft.description })}
							sx={{ flex: '1 1 100%' }}
						/>
					</DetailsGroup>
				</DetailsPanel>
			}
		/>
	)
}

/** One read cell of the NPC row. */
const Cell: React.FC<{
	children: React.ReactNode
	label: string
	muted?: boolean
	strong?: boolean
	tone?: string
}> = ({ children, label, muted, strong, tone }) => (
	<Typography
		component="div"
		title={typeof children === 'string' ? children : undefined}
		sx={{
			minWidth: 0,
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			fontSize: 'var(--nexus-text-dense)',
			...(muted && { color: 'text.secondary' }),
			...(strong && { fontWeight: 600 }),
			...(tone && tone !== 'inherit' && { color: tone }),
		}}
	>
		<span className="cs-cell-label">{label}</span>
		{children}
	</Typography>
)

/** A line of published rules text, in the register a gloss reads in. */
const Gloss: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<Typography
		component="p"
		sx={{
			flex: '1 1 100%',
			m: 0,
			fontSize: 'var(--nexus-text-xs)',
			lineHeight: 1.45,
			color: 'text.secondary',
		}}
	>
		{children}
	</Typography>
)

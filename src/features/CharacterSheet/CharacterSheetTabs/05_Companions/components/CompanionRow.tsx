import React, { useEffect, useState } from 'react'
import { Box, LinearProgress, Menu, Typography } from '@mui/material'
import { UnifiedListItem } from '@site/src/features/CharacterSheet/components/DynamicList'
import {
	AdjustStepper,
	DeleteButton,
	DetailField,
	DetailsGroup,
	DetailsPanel,
	Inscription,
	RecordPlate,
	RecordRow,
	PipRow,
	ToggleMark,
} from '@site/src/features/CharacterSheet/components'
import { Companion } from '@site/src/types/Character'
import { UI_COLORS } from '@site/src/utils/colors'
import { COMPANION_TEMPLATE } from '../companionColumns'
import { CompanionStatBlock } from './CompanionStatBlock'

export type CompanionRowProps = {
	companion: Companion
	updateCompanion: (update: Partial<Companion>) => void
	/** Re-reads HP out of the markdown when the stat block itself changes. */
	updateWithAutoHP: (update: Partial<Companion>) => void
	deleteCompanion: () => void
}

/** The pool's ink, by how much of it is left — the sheet's own alert register. */
const hpTone = (current: number, max: number) => {
	const percentage = max > 0 ? (current / max) * 100 : 0
	if (percentage >= 50) return UI_COLORS.success
	if (percentage >= 25) return UI_COLORS.warning
	return UI_COLORS.danger
}

/**
 * One companion, as a ledger row that opens into its stat block (M13 S7).
 *
 * ## What it was
 *
 * An MUI `Accordion` per companion, whose SUMMARY held an `h6` name (or a text field, in
 * edit mode), a full `SheetField` HP card with its own popover, a wound pip, and four
 * action buttons carrying seven Material icons between them — `Edit`, `Save`, `Cancel`,
 * `Delete`, `Check`, `CheckOutlined`, `CheckCircle`. Opening it revealed either rendered
 * markdown or a raw textarea, depending on a tab-level `editingId`.
 *
 * Four faults, and the last is the interesting one:
 *
 * - **A card inside a row.** The HP card brought a framed tile, a keystone-less plate and
 *   its own popover into a row that already expands — the same nesting S4b removed from
 *   the weapon row's damage gear.
 * - **Seven Material icons** on a sheet that has spent three slices retiring them.
 * - **A delete confirmation dialog**, where every other list on the sheet deletes on the
 *   spot (S6 removed the NPC one for the same reason).
 * - **An explicit edit MODE, held at the tab level.** One `editingId` for the whole list
 *   meant the tab owned three pieces of draft state (`editName`, `editMarkdown`, the id),
 *   a save button that committed both fields at once, and a cancel that discarded them —
 *   while every other row on this sheet commits a field on blur and needs no mode at all.
 *
 * ## What it is
 *
 * A three-track ledger line — name, the pool with its meter, the wound pip — over a
 * details panel on the S4d pattern. The markdown is an `Inscription`, and a `ToggleMark`
 * switches between editing it and reading it rendered, which is the one thing an edit mode
 * was genuinely buying: a stat block pasted from the Companion Builder is meant to be read
 * as a table, not as pipes and dashes. That toggle is per-row local state, because it is a
 * view preference rather than anything the character owns.
 */
export const CompanionRow: React.FC<CompanionRowProps> = ({
	companion,
	updateCompanion,
	updateWithAutoHP,
	deleteCompanion,
}) => {
	const [draft, setDraft] = useState(companion)
	const [editing, setEditing] = useState(!companion.markdown)
	const [hpAnchor, setHpAnchor] = useState<null | HTMLElement>(null)
	useEffect(() => setDraft(companion), [companion])

	const current = companion.currentHP || 0
	const max = companion.maxHP || 0
	// `wounded` is the pre-S7 boolean; `migrateCharacterData` converts it, and this covers a
	// document read before that migration has run.
	const wounds = companion.wounds ?? (companion.wounded ? 1 : 0)
	const tone = hpTone(current, max)
	const setCurrent = (value: number) =>
		updateCompanion({ currentHP: Math.max(0, Math.min(max, value)) })

	return (
		<>
			<UnifiedListItem
				summaryClassName="cs-ledger-row-grid"
				summarySx={{ gridTemplateColumns: COMPANION_TEMPLATE, columnGap: 1 }}
				summaryContent={
					<>
						<Typography
							component="div"
							sx={{
								minWidth: 0,
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								fontSize: 'var(--nexus-text-dense)',
								fontWeight: 600,
							}}
						>
							<span className="cs-cell-label">Name</span>
							{companion.name || 'Unnamed'}
						</Typography>

						{/* The pool opens its own editor on click, the way the HP and Focus cards do.
						No `stopPropagation` here: `UnifiedListItem` now stops any event that
						started on a control from reaching the row's disclosure, so a summary
						control does not have to know it is inside one (S7, owner review). */}
						<Box
							component="button"
							type="button"
							className="cs-band-trigger"
							aria-haspopup="dialog"
							aria-label={`Damage or heal ${companion.name || 'companion'} — ${current} of ${max}`}
							onClick={(event) => setHpAnchor(event.currentTarget)}
						>
							<span className="cs-cell-label">HP</span>
							<Box
								component="span"
								sx={{
									fontFamily: 'var(--nexus-font-ui)',
									fontWeight: 700,
									fontVariantNumeric: 'tabular-nums',
									fontSize: 'var(--nexus-text-dense)',
									color: tone,
								}}
							>
								{current}/{max}
							</Box>
							<Box sx={{ width: '2.75rem' }}>
								<LinearProgress
									variant="determinate"
									value={max > 0 ? Math.min((current / max) * 100, 100) : 0}
									aria-hidden="true"
									sx={{
										height: 4,
										'& .MuiLinearProgress-bar': { backgroundColor: tone },
									}}
								/>
							</Box>
						</Box>

						{/* TWO pips, because a companion has two Health Marks: at two Wounds they are
							instantly dead (S7, owner correction). It was one, which could not record
							the mark that decides whether the companion lives. `PipRow` brings the
							fill-up-to / clear-back-to behaviour Fatigue and item wear already have. */}
						<Box sx={{ display: 'flex', justifyContent: 'center' }}>
							<PipRow
								count={2}
								value={wounds}
								onChange={(next) => updateCompanion({ wounds: next })}
								sigil="wound"
								emptySigil="hp"
								tone={UI_COLORS.danger}
								label={`${companion.name || 'Companion'} wounds`}
							/>
						</Box>
					</>
				}
				detailsContent={
					<DetailsPanel
						aside={
							<RecordPlate
								label="Record"
								actions={<DeleteButton onDelete={deleteCompanion} />}
							>
								{/* The name is a PLATE ROW, not its own group (S7, owner review). It was
							appearing three times in one open row — the summary line, an Identity
							group with a single field in it, and the stat block's own heading. The
							summary and the card heading both have to be there, so the editable one
							goes where every other editable fact about this companion already is. */}
								<RecordRow sigil="name" label="Name">
									<DetailField
										value={draft.name}
										onChange={(event) =>
											setDraft((c) => ({ ...c, name: event.target.value }))
										}
										onBlur={() => updateCompanion({ name: draft.name })}
										width="100%"
										align="left"
										inputProps={{ 'aria-label': 'Companion name' }}
										sx={{ flex: '1 1 auto' }}
									/>
								</RecordRow>
								<RecordRow sigil="hp" label="Current HP" section>
									<DetailField
										type="number"
										align="center"
										value={current}
										onChange={(event) => setCurrent(Number(event.target.value))}
										inputProps={{ min: 0, 'aria-label': 'Current HP' }}
									/>
								</RecordRow>
								<RecordRow sigil="av" label="Max HP">
									<DetailField
										type="number"
										align="center"
										value={max}
										onChange={(event) =>
											updateCompanion({ maxHP: Number(event.target.value) })
										}
										inputProps={{ min: 0, 'aria-label': 'Max HP' }}
									/>
								</RecordRow>
								<RecordRow sigil="wound" label="Wounds">
									<PipRow
										count={2}
										value={wounds}
										onChange={(next) => updateCompanion({ wounds: next })}
										sigil="wound"
										emptySigil="hp"
										tone={UI_COLORS.danger}
										label="Wounds"
									/>
								</RecordRow>
							</RecordPlate>
						}
					>
						{/* The stat block. Reading it rendered is the one thing the old edit MODE
						was buying — a block pasted from the Companion Builder is meant to be read
						as a table, not as pipes and dashes — so that survives as a per-row view
						toggle rather than as tab-level draft state. */}
						<DetailsGroup
							label="Stat block"
							sigil="description"
							trailing={
								<ToggleMark
									checked={editing}
									onChange={setEditing}
									title="Edit the markdown instead of reading it rendered"
								>
									edit markdown
								</ToggleMark>
							}
						>
							{editing ? (
								<Inscription
									block
									multiline
									maxRows={20}
									label="Markdown"
									placeholder="Paste a stat block from the Companion Builder, or write one."
									value={draft.markdown}
									onChange={(event) =>
										setDraft((c) => ({ ...c, markdown: event.target.value }))
									}
									// `updateWithAutoHP`: the builder's block states the companion's HP in
									// a table, and re-reading it on commit is why pasting a stat block
									// fills the pool without anyone retyping it.
									onBlur={() => updateWithAutoHP({ markdown: draft.markdown })}
									sx={{ flex: '1 1 100%' }}
								/>
							) : (
								// The codex's own creature card when the block parses, the raw markdown
								// when it does not — see `CompanionStatBlock`.
								<CompanionStatBlock
									name={companion.name}
									markdown={companion.markdown}
								/>
							)}
						</DetailsGroup>
					</DetailsPanel>
				}
			/>
			{/*
				The HP editor is a SIBLING of the row, not a child of its summary (S7, owner
				review round 2).
				
				`UnifiedListItem` stops summary controls from toggling the row, and that fixed
				the pips and the fields — but not this, because React bubbles events through the
				COMPONENT tree: a `Menu` rendered inside `summaryContent` sends every click in
				its popover, including the one that dismisses it, up through the summary and into
				the disclosure. Guarding it there is not enough on its own, and the honest fix is
				structural: a portalled surface does not belong inside a row's summary, so it
				lives beside the row and is only anchored from it.
			*/}
			<Menu
				anchorEl={hpAnchor}
				open={Boolean(hpAnchor)}
				onClose={() => setHpAnchor(null)}
				slotProps={{ paper: { className: 'cs-tokens' } }}
				MenuListProps={{ sx: { p: 2, width: '26rem', maxWidth: '92vw' } }}
			>
				<Box>
					<AdjustStepper
						decreaseLabel="Damage"
						increaseLabel="Healing"
						onDecrease={(amount) => setCurrent(current - amount)}
						onIncrease={(amount) => setCurrent(current + amount)}
					/>
				</Box>
			</Menu>
		</>
	)
}

import React, { useEffect, useState } from 'react'
import {
	Box,
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Typography,
} from '@mui/material'
import { FieldChange } from '../utils/computeContentUpdates'
import { UnifiedListItem } from './DynamicList'
import { SheetChip } from './SheetChip'

export type RefreshUpdateEntry = {
	id: string
	name: string
	/**
	 * The entry's values for `metaColumns`, in the same order.
	 *
	 * Nodes rather than strings because a talent's meta column is its SKILL, and a
	 * skill is named by a `SheetChip` everywhere else on the sheet. The caller
	 * builds them: `computeContentUpdates` stays a pure data function with no
	 * opinion about how a skill is drawn.
	 */
	meta?: React.ReactNode[]
	changes: FieldChange[]
}

/** A named track in the ledger, between the name and the change count. */
export type RefreshMetaColumn = {
	label: string
	/** A grid track — `minmax(0, 1fr)`, `4rem`. */
	width: string
}

export type RefreshUpdatesDialogProps = {
	open: boolean
	onClose: () => void
	title: string
	/** singular noun, e.g. "spell" or "talent" */
	itemNoun: string
	entries: RefreshUpdateEntry[]
	/**
	 * What the entries' `meta` values are called. Empty gives a two-track ledger
	 * of name and change count, which is still a ledger.
	 */
	metaColumns?: RefreshMetaColumn[]
	onConfirm: (selectedIds: string[]) => void
}

/**
 * The choice track, and the reserve for the disclosure mark on the other side.
 *
 * The chevron is `AccordionSummary`'s `expandIcon`, so it sits OUTSIDE the summary
 * grid — 10px of mark plus the summary's 8px gap. The header has to reserve the
 * same or its last column stops agreeing with the rows beneath it.
 */
const CHOICE_TRACK = '30px'
const CHEVRON_RESERVE = '18px'

/**
 * The choice control, sized to its track.
 *
 * `CheckMark` is an 18px mark and MUI pads a checkbox by 9px, which is a 36px box
 * — wider than any track worth spending on a control in the gutter, and it would
 * have overflowed a fixed one silently. 6px of padding puts the box at exactly
 * `CHOICE_TRACK`, still clear of the S3.5 24px floor.
 */
const CHOICE_SX = { p: '6px' }

/**
 * One field's before and after, as a course of the record (M13 S8).
 *
 * It was a `<Table>` per entry with a bold label cell and two `Typography`s in the
 * value cell, inked from MUI's `error.main` and `success.main`. The shape is right
 * — label left, value right, one fact per line, which is `RecordPlate`'s — but the
 * colours were the app's semantic palette rather than the sheet's, and a struck
 * line in `error` red reads as *something is wrong* when it means *this is what
 * you have now*.
 *
 * `--cs-danger` and `--cs-success` are the sheet's own names for those two inks and
 * track both colour modes. The struck line is also dimmed: what a diff wants said
 * loudest is the value you are moving TO.
 */
const ChangeCourse: React.FC<{ change: FieldChange }> = ({ change }) => (
	<Box className="cs-change-row">
		<Typography component="span" className="cs-change-row__label">
			{change.field}
		</Typography>
		<Box className="cs-change-row__values">
			<Typography component="div" className="cs-change-row__before">
				{change.before || '(empty)'}
			</Typography>
			<Typography component="div" className="cs-change-row__after">
				{change.after || '(empty)'}
			</Typography>
		</Box>
	</Box>
)

/**
 * Replace the character's copies of published content with the rulebook's current
 * versions — the one dialog on the sheet that OVERWRITES rather than adds.
 *
 * ## Why the choice is a control here, and the row's own state everywhere else
 *
 * S8 gave `UnifiedListItem` a selectable variant and made it exclusive with the
 * expanding one: a row cannot be both a disclosure and a choice, because that is
 * one gesture with two meanings. This dialog is the case that needs both — you
 * decide whether to take an update, and you want to read the diff before deciding.
 *
 * So the row expands, and the choice is an explicit **control inside the summary**.
 * That is the resolution the exclusivity rule implies rather than an exception to
 * it: when both are genuinely needed, the choice stops being implicit. The row
 * primitive already protects this — a click on a control inside a summary does not
 * reach the disclosure (S7).
 *
 * The warning is not an MUI `Alert`. This action cannot be undone, so it keeps its
 * own bounded band in the caution register the save strip already uses, rather than
 * Material's filled severity box.
 *
 * ## The second pass (M13 S3, 2026-08-01)
 *
 * S8 put the row on the ledger and left three things a ledger has that this did not:
 *
 * - **A column grid.** The summary was a flex line with the change count pushed
 *   right by `ml: auto`, so the middle fact wandered by row length. It reads
 *   `--cs-search-cols` now, the same declare-once custom property the search
 *   ledger's header and rows share.
 * - **A meta line.** Every entry arrives checked and the only way to take ONE was
 *   to uncheck the rest by hand — a list of twelve where the sheet's other
 *   multi-choice list has had `Choose all` since S8.
 * - **Two facts in one caption.** `sublabel` was `[skill, 'Rank 2'].join(' · ')`,
 *   which is one column pretending to be two. They are two tracks the caller
 *   names, and a talent's skill is a `SheetChip` in its own tone, as it is in the
 *   talent-point plate and the search dialogs.
 */
export const RefreshUpdatesDialog: React.FC<RefreshUpdatesDialogProps> = ({
	open,
	onClose,
	title,
	itemNoun,
	entries,
	metaColumns = [],
	onConfirm,
}) => {
	const [selected, setSelected] = useState<Set<string>>(new Set())

	// Select everything by default whenever the dialog (re)opens with new data.
	// Keyed on the entry ids (not the array reference) so unrelated re-renders
	// while the dialog is open don't wipe the user's checkbox choices.
	const entryIdKey = entries.map((e) => e.id).join('|')
	useEffect(() => {
		if (open) {
			setSelected(new Set(entryIdKey ? entryIdKey.split('|') : []))
		}
	}, [open, entryIdKey])

	const toggle = (id: string) => {
		setSelected((prev) => {
			const next = new Set(prev)
			if (next.has(id)) {
				next.delete(id)
			} else {
				next.add(id)
			}
			return next
		})
	}

	const nothingToUpdate = entries.length === 0
	const allSelected = entries.length > 0 && selected.size === entries.length
	const toggleAll = () =>
		setSelected(allSelected ? new Set() : new Set(entries.map((e) => e.id)))

	/*
		One template, read by the header and by every row from the stylesheet — the
		same construction `SearchDialog` uses, and for the same reason: the tracks
		only exist above 700px, and a breakpoint cannot live in `sx`.

		The name track is `1.7fr` against the meta columns' `1fr` because the name
		is the fact you scan for and the only one that runs long.
	*/
	const rowTemplate = [
		CHOICE_TRACK,
		'minmax(0, 1.7fr)',
		...metaColumns.map((column) => column.width),
		'5.5rem',
	].join(' ')

	return (
		<Dialog
			open={open}
			onClose={onClose}
			maxWidth="md"
			fullWidth
			// The same chrome the search dialogs carry, and for the same reason: a
			// portalled paper is outside `.character-sheet-page`, where every
			// sheet-scoped rule resolves to nothing.
			PaperProps={{ className: 'cs-tokens cs-search-dialog' }}
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent sx={{ pt: 2 }}>
				{nothingToUpdate ? (
					/* The same empty state the search ledger uses — it says what is not
						there rather than reporting a count of zero. */
					<Box className="cs-search-empty">
						<Typography component="p" className="cs-search-empty__line">
							Every {itemNoun} matches the rulebook
						</Typography>
					</Box>
				) : (
					<>
						<Box className="cs-dialog-notice" role="note">
							<strong>Back up your character before updating.</strong> This
							replaces the selected {itemNoun}s with their latest versions from
							the rulebook, including recalculated damage values. This cannot be
							undone.
						</Box>

						{/* What is in front of you, and the one control acting on all of it
							— the band register the tabs and the search ledger already use.
							Every entry arrives chosen, so the control's first press is the
							one that matters: take one update out of twelve without
							unchecking eleven by hand. */}
						<Box className="cs-search-meta">
							<Typography component="span" className="cs-search-meta__count">
								{entries.length} {itemNoun}
								{entries.length === 1 ? '' : 's'} · {selected.size} chosen
							</Typography>
							<Button
								variant="text"
								size="small"
								onClick={toggleAll}
								className="cs-search-meta__all"
							>
								{allSelected ? 'Clear selection' : 'Choose all'}
							</Button>
						</Box>

						<Box
							className="cs-search-ledger"
							style={
								{
									'--cs-search-cols': rowTemplate,
									'--cs-search-head-cols': `${rowTemplate} ${CHEVRON_RESERVE}`,
								} as React.CSSProperties
							}
						>
							<Box className="cs-search-ledger__head">
								{/* Blank over the choice track: a heading above a control names
									a column of facts that is not there. */}
								<span aria-hidden="true" />
								<span>{itemNoun}</span>
								{metaColumns.map((column) => (
									<span key={column.label}>{column.label}</span>
								))}
								<span style={{ textAlign: 'right' }}>Changes</span>
								<span aria-hidden="true" />
							</Box>

							<Box className="cs-search-ledger__rows">
								{entries.map((entry) => (
									<UnifiedListItem
										key={entry.id}
										maxWidth="none"
										summaryClassName="cs-refresh-row"
										detailsContent={
											<Box className="cs-change-plate">
												{entry.changes.map((change) => (
													<ChangeCourse key={change.field} change={change} />
												))}
											</Box>
										}
										summaryContent={
											<>
												<Checkbox
													checked={selected.has(entry.id)}
													onChange={() => toggle(entry.id)}
													sx={CHOICE_SX}
													inputProps={{
														'aria-label': `Update ${entry.name}`,
													}}
												/>
												<Typography
													component="span"
													className="cs-refresh-row__name"
												>
													{entry.name}
												</Typography>
												{metaColumns.map((column, index) => (
													<Box key={column.label} sx={{ minWidth: 0 }}>
														{/* The column's name travels with its value and
															hides above the breakpoint, which is what
															`.cs-cell-label` does on the tab ledgers: below
															it the header is gone and a wrapped row is
															otherwise a bare run of words. */}
														<Typography
															component="span"
															className="cs-cell-label"
														>
															{column.label}
														</Typography>
														{entry.meta?.[index] ?? '—'}
													</Box>
												))}
												<Box
													sx={{
														display: 'flex',
														justifyContent: 'flex-end',
														minWidth: 0,
													}}
												>
													<SheetChip variant="plate">
														{`${entry.changes.length} change${entry.changes.length === 1 ? '' : 's'}`}
													</SheetChip>
												</Box>
											</>
										}
									/>
								))}
							</Box>
						</Box>
					</>
				)}
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>Cancel</Button>
				{!nothingToUpdate && (
					<Button
						variant="contained"
						disabled={selected.size === 0}
						onClick={() => onConfirm(Array.from(selected))}
					>
						Update {selected.size} {itemNoun}
						{selected.size === 1 ? '' : 's'}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	)
}

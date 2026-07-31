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
	sublabel?: string
	changes: FieldChange[]
}

export type RefreshUpdatesDialogProps = {
	open: boolean
	onClose: () => void
	title: string
	/** singular noun, e.g. "spell" or "talent" */
	itemNoun: string
	entries: RefreshUpdateEntry[]
	onConfirm: (selectedIds: string[]) => void
}

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
 */
export const RefreshUpdatesDialog: React.FC<RefreshUpdatesDialogProps> = ({
	open,
	onClose,
	title,
	itemNoun,
	entries,
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
						<Box className="cs-search-ledger__rows">
							{entries.map((entry) => (
								<UnifiedListItem
									key={entry.id}
									maxWidth="none"
									summaryContent={
										<>
											<Checkbox
												checked={selected.has(entry.id)}
												onChange={() => toggle(entry.id)}
												inputProps={{
													'aria-label': `Update ${entry.name}`,
												}}
											/>
											<Typography component="span" sx={{ fontWeight: 600 }}>
												{entry.name}
											</Typography>
											{entry.sublabel && (
												<Typography variant="caption" color="text.secondary">
													{entry.sublabel}
												</Typography>
											)}
											<Box sx={{ ml: 'auto' }}>
												<SheetChip variant="plate">
													{`${entry.changes.length} change${entry.changes.length === 1 ? '' : 's'}`}
												</SheetChip>
											</Box>
										</>
									}
									detailsContent={
										<Box className="cs-change-plate">
											{entry.changes.map((change) => (
												<ChangeCourse key={change.field} change={change} />
											))}
										</Box>
									}
								/>
							))}
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

import React, { ReactNode } from 'react'
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material'

export interface ConfirmDialogProps {
	open: boolean
	/** What the dialog is about, as a statement — "Remove character". */
	title: string
	/** What will happen, in the reader's terms. Include what cannot be recovered. */
	children: ReactNode
	/** The verb, not "Yes" — a reader should be able to act on the button alone. */
	confirmLabel: string
	onConfirm: () => void
	onCancel: () => void
	cancelLabel?: string
}

/**
 * The sheet's confirmation, for the four actions that survived the audit
 * (M13 S8).
 *
 * ## Why there are only four
 *
 * The sheet deletes on the spot everywhere else — an item, a spell, a companion,
 * an NPC all go without asking, because every one of them can be brought back
 * from the rulebook in two presses and a dialog per deletion is friction charged
 * on every use to insure against a rare mistake. S6 removed the NPC one, S7
 * removed the companion one.
 *
 * A confirmation earns its place only where the thing lost **cannot be
 * reconstructed from the rulebook**:
 *
 * | Where | What is unrecoverable |
 * |---|---|
 * | `CharacterList/DeleteButton` | the character document itself |
 * | `SkillsTab` skill removal | the skill's rank and its accumulated XP (and, for Crafting, every profession under it) |
 * | `QuickRefSection` clear-all | every quick-ref pick at once, gathered across four tabs |
 * | `MagicItemBuilderDialog` close | a multi-step draft the sheet never persisted |
 *
 * ## What it is
 *
 * The four were four hand-built Material dialogs: one with a `Warning` icon and
 * `Yes`/`No` buttons, two with `DialogContentText` and a `color="error"` button,
 * one inline in the builder. Same decision, four shapes, and none of them in the
 * sheet's voice.
 *
 * One shape now: the dialog chrome the theme already gives, the caution band the
 * refresh dialog uses for "this cannot be undone", and a **named verb** on the
 * confirm rather than `Yes`. `Yes` answers a question the reader has to have read;
 * `Delete character` says what the press does on its own.
 */
export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
	open,
	title,
	children,
	confirmLabel,
	onConfirm,
	onCancel,
	cancelLabel = 'Cancel',
}) => (
	<Dialog
		open={open}
		onClose={onCancel}
		maxWidth="xs"
		fullWidth
		// Portalled outside `.character-sheet-page`; `cs-tokens` is what makes the
		// caution band's ink resolve out here.
		PaperProps={{ className: 'cs-tokens cs-search-dialog' }}
	>
		<DialogTitle>{title}</DialogTitle>
		<DialogContent sx={{ pt: 2 }}>
			<Box className="cs-dialog-notice" role="note">
				{children}
			</Box>
		</DialogContent>
		<DialogActions>
			<Button onClick={onCancel}>{cancelLabel}</Button>
			<Button
				variant="contained"
				onClick={onConfirm}
				autoFocus
				className="cs-confirm-danger"
			>
				{confirmLabel}
			</Button>
		</DialogActions>
	</Dialog>
)

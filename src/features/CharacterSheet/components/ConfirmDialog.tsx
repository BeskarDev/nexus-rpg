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
 * The sheet's one confirmation shape (M13 S8).
 *
 * ## Where it is used
 *
 * | Where | What is lost |
 * |---|---|
 * | `DeleteButton` | any content entity — ability, weapon, item, spell, NPC, companion |
 * | `CharacterList/DeleteButton` | the character document itself |
 * | `SkillsTab` skill removal | the skill's rank and its accumulated XP (and, for Crafting, every profession under it) |
 * | `QuickRefSection` clear-all | every quick-ref pick at once, gathered across four tabs |
 * | `MagicItemBuilderDialog` close | a multi-step draft the sheet never persisted |
 *
 * The first row is new (2026-08-02, owner call) and it reverses the audit this
 * component was built for. That audit kept confirmations only where the loss
 * could not be rebuilt from the rulebook, and counted a deleted item as cheap
 * because the ITEM is in the rulebook. What is actually lost is the player's copy
 * of it — the rank bought, the quality and durability spent, the location stowed —
 * and the press that loses it sits in a 24px strip next to two harmless ones.
 * `DeleteButton`'s docblock carries the full reasoning; it now gates every content
 * delete on the sheet by construction rather than by call-site discipline.
 *
 * What still deletes on the spot is what a player removes SEVERAL TIMES A
 * SESSION and would curse a dialog for: a status effect, a language, a profession
 * chip, a quick-ref pin.
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

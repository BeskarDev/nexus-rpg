import { IconButton, Tooltip } from '@mui/material'
import { Delete } from '@mui/icons-material'
import React, { useState } from 'react'
// Imported from the file rather than the `components` barrel: the barrel exports
// this component too, so going through it would be a cycle.
import { ConfirmDialog } from './ConfirmDialog'

export type DeleteButtonProps = {
	/** Callback when the delete is confirmed */
	onDelete: () => void
	/** What kind of thing this deletes — "ability", "weapon". Names the dialog. */
	entityKind?: string
	/** The thing's own name, shown in the dialog so the reader sees WHICH one. */
	entityName?: string
	/**
	 * Opt out of the confirmation, for a caller that already wraps the action in
	 * one of its own. Only `PartyMemberItem` does.
	 */
	confirm?: boolean
	/** Tooltip text */
	tooltipText?: string
	/** Optional size */
	size?: 'small' | 'medium'
	/** Optional edge position */
	edge?: 'start' | 'end' | false
}

/**
 * The destructive control in a control strip, and the sheet's one delete gate.
 *
 * ## The plate
 *
 * It wears the same stamped plate as its neighbours (levelled in
 * `characterSheet.css`) and marks itself `data-danger` so the strip's CSS can take
 * the plate and glyph to the danger ink ON HOVER only — a delete that is
 * permanently red is an alarm you stop seeing, and it would be the loudest thing
 * in a details panel of quiet fields (M13 S4d).
 *
 * ## Why the confirmation lives HERE (2026-08-02, owner call)
 *
 * The sheet used to delete on the spot everywhere but four places, on the
 * reasoning that anything reconstructible from the rulebook is cheap to lose, and
 * a dialog is friction charged on every use to insure against a rare mistake.
 *
 * That priced the mistake wrong. What is lost is not the rulebook entry — it is
 * **your copy of it**: the ability at the rank you bought, the weapon with its
 * quality and durability spent, the item where you had stowed it. Rebuilding that
 * is a search, a pick, and re-entering every field you had tuned, at the table,
 * with four people waiting. And the press that triggers it is a miss: delete sits
 * in the same 24px control strip as quick-ref and move-category.
 *
 * Building it into the button rather than into each caller is the whole point.
 * Seven call sites would be seven chances to forget and an eighth added later —
 * the same argument that put the ledger grid template behind a test in S8c. **A
 * caller opts OUT explicitly** (`confirm={false}`, one caller, which has its own
 * dialog) rather than opting in.
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
	onDelete,
	entityKind = 'entry',
	entityName,
	confirm = true,
	tooltipText = 'Delete',
	size = 'small',
	edge = 'end',
}) => {
	const [confirming, setConfirming] = useState(false)

	return (
		<>
			<Tooltip title={tooltipText}>
				<IconButton
					size={size}
					edge={edge}
					aria-label="delete"
					data-danger="true"
					onClick={() => (confirm ? setConfirming(true) : onDelete())}
				>
					<Delete fontSize={size} />
				</IconButton>
			</Tooltip>

			{confirm && (
				<ConfirmDialog
					open={confirming}
					title={`Delete ${entityKind}`}
					// The verb WITH its object. `Delete` alone, on a dialog that appeared
					// after a mis-press, does not say what is about to go.
					confirmLabel={`Delete ${entityKind}`}
					onConfirm={() => {
						setConfirming(false)
						onDelete()
					}}
					onCancel={() => setConfirming(false)}
				>
					{entityName ? (
						<>
							<strong>{entityName}</strong> will be removed from your sheet,
							along with anything you had set on it. This cannot be undone.
						</>
					) : (
						`This ${entityKind} will be removed from your sheet, along with anything you had set on it. This cannot be undone.`
					)}
				</ConfirmDialog>
			)}
		</>
	)
}

import { IconButton, Tooltip } from '@mui/material'
import { Bookmark, BookmarkBorder } from '@mui/icons-material'
import React from 'react'

export type QuickRefButtonProps = {
	/** Item ID to toggle */
	itemId: string
	/** Whether the item is currently in quick ref */
	isInQuickRef: boolean
	/** Callback when toggling quick ref */
	onToggle: (itemId: string) => void
	/** Optional size */
	size?: 'small' | 'medium'
}

/**
 * The quick-ref toggle: a control that is also a STATE.
 *
 * `data-state` is the sheet's idiom for that (S3) — the strip's CSS fills the plate
 * when it is on, the same way the reorder toggle does, so it does not need a colour
 * of its own. It had `color: action.disabled` when off, which is MUI's grey and the
 * only grey in a bronze control strip (M13 S4d).
 */
export const QuickRefButton: React.FC<QuickRefButtonProps> = ({
	itemId,
	isInQuickRef,
	onToggle,
	size = 'small',
}) => {
	return (
		<Tooltip
			title={isInQuickRef ? 'Remove from Quick Ref' : 'Add to Quick Ref'}
		>
			<IconButton
				size={size}
				data-state={isInQuickRef ? 'on' : 'off'}
				aria-pressed={isInQuickRef}
				onClick={() => onToggle(itemId)}
			>
				{isInQuickRef ? (
					<Bookmark fontSize={size} />
				) : (
					<BookmarkBorder fontSize={size} />
				)}
			</IconButton>
		</Tooltip>
	)
}

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
 * QuickRefButton - A reusable bookmark toggle button for adding/removing items from quick reference.
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
				onClick={() => onToggle(itemId)}
				sx={{
					p: 0.5,
					color: isInQuickRef ? 'primary.main' : 'action.disabled',
				}}
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

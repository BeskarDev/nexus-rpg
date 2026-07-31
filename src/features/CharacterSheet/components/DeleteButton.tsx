import { IconButton, Tooltip } from '@mui/material'
import { Delete } from '@mui/icons-material'
import React from 'react'

export type DeleteButtonProps = {
	/** Callback when delete is clicked */
	onDelete: () => void
	/** Tooltip text */
	tooltipText?: string
	/** Optional size */
	size?: 'small' | 'medium'
	/** Optional edge position */
	edge?: 'start' | 'end' | false
}

/**
 * The destructive control in a control strip.
 *
 * It wears the same stamped plate as its neighbours (levelled in
 * `characterSheet.css`) and marks itself `data-danger` so the strip's CSS can take
 * the plate and glyph to the danger ink ON HOVER only — a delete that is
 * permanently red is an alarm you stop seeing, and it would be the loudest thing
 * in a details panel of quiet fields (M13 S4d).
 */
export const DeleteButton: React.FC<DeleteButtonProps> = ({
	onDelete,
	tooltipText = 'Delete',
	size = 'small',
	edge = 'end',
}) => {
	return (
		<Tooltip title={tooltipText}>
			<IconButton
				size={size}
				edge={edge}
				aria-label="delete"
				data-danger="true"
				onClick={onDelete}
			>
				<Delete fontSize={size} />
			</IconButton>
		</Tooltip>
	)
}

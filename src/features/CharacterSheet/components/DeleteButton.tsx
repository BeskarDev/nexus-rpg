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
 * DeleteButton - A reusable delete icon button with tooltip.
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
				onClick={onDelete}
				sx={{ p: 0.5 }}
			>
				<Delete fontSize={size} />
			</IconButton>
		</Tooltip>
	)
}

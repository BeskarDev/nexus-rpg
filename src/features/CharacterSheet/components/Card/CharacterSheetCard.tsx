import React from 'react'
import { Box, IconButton, Tooltip, alpha } from '@mui/material'
import { Settings } from '@mui/icons-material'
import { CharacterSheetCardProps } from './types'

export const CharacterSheetCard: React.FC<CharacterSheetCardProps> = ({
	header,
	children,
	footer,
	tooltip,
	configMenu,
	onConfigClick,
	showConfigButton = false,
	minWidth,
	maxWidth,
	sx,
	borderColor,
	'data-testid': testId,
}) => {
	const cardContent = (
		<Box
			data-testid={testId}
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				borderRadius: 1,
				border: (theme) =>
					borderColor
						? `1px solid ${borderColor}`
						: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
				bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
				p: 0.5,
				position: 'relative',
				minWidth: minWidth || '4rem',
				...(maxWidth && { maxWidth }),
				...sx,
			}}
		>
			{/* Header */}
			{header && header}

			{/* Main Content */}
			<Box sx={{ ...(footer ? {} : { pb: 0.5 }) }}>
				{children}
			</Box>

			{/* Footer */}
			{footer && footer}

			{/* Config Button */}
			{showConfigButton && onConfigClick && (
				<IconButton
					size="small"
					onClick={onConfigClick}
					sx={{
						position: 'absolute',
						top: 0,
						right: 0,
						p: 0.25,
						opacity: 0.6,
						'&:hover': { opacity: 1 },
					}}
					data-testid={testId ? `${testId}-config-button` : undefined}
				>
					<Settings sx={{ fontSize: '0.65rem' }} />
				</IconButton>
			)}

			{/* Config Menu (rendered as sibling) */}
			{configMenu}
		</Box>
	)

	// Wrap in tooltip if provided
	if (tooltip) {
		return <Tooltip title={tooltip}>{cardContent}</Tooltip>
	}

	return cardContent
}

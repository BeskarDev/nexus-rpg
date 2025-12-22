/* eslint-disable no-mixed-spaces-and-tabs */
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
	const [isMenuOpen, setIsMenuOpen] = React.useState(false)

	const handleConfigClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setIsMenuOpen(true)
		onConfigClick?.(event)
	}

	// Clone configMenu to add onClose handler
	const configMenuWithClose = configMenu
		? React.cloneElement(configMenu as React.ReactElement, {
				onClose: (e: any) => {
					setIsMenuOpen(false)
					;(configMenu as any).props?.onClose?.(e)
				},
		  })
		: null

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
			<Box
				sx={{
					...(footer ? {} : { pb: 0.5 }),
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
				}}
			>
				{children}
			</Box>

			{/* Footer */}
			{footer && footer}

			{/* Config Button */}
			{showConfigButton && onConfigClick && (
				<IconButton
					size="small"
					onClick={handleConfigClick}
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
		</Box>
	)

	// Wrap in tooltip if provided and menu is not open
	// Always render a single child into Tooltip (required by MUI).
	// Render the config menu outside the Tooltip so the Tooltip receives
	// only one child element.
	return (
		<>
			<Tooltip title={tooltip || ''} disableHoverListener={!tooltip || isMenuOpen}>
				{cardContent}
			</Tooltip>
			{/* Config Menu (rendered outside tooltip but near card) */}
			{configMenuWithClose}
		</>
	)
}

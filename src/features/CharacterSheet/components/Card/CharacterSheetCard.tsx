/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react'
import { Box, IconButton, Tooltip, alpha } from '@mui/material'
import { Settings } from '@mui/icons-material'
import { CardFrame } from '@site/src/components/codex/ornaments'
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
	// M9 S3: the codex kit's cartouche keystone + corner rails (its own motif,
	// per the card-family table in codex-theme/SKILL.md). Off by default —
	// several CharacterSheetCard contexts (weapon/equipment rows) stack tightly
	// with near-zero gap, and the keystone's ~16px overhang needs real
	// clearance above it (ornament-craft §9) or it collides with the card
	// stacked above. Opt in per usage where the surrounding layout has room.
	frame = false,
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
				// The cartouche keystone overhangs ~16px above the border (see
				// CardFrame's own module CSS); this is that clearance, matching the
				// codex kit's own convention for a keystone this weight.
				...(frame && { mt: '1.15rem' }),
				...(maxWidth && { maxWidth }),
				...sx,
			}}
		>
			{/* M9 S3: corner marks, codex-kit register. `frame` cards get the full
				cartouche keystone + corner rails (CardFrame supplies its own
				corners); everything else gets the lighter rivet dots instead — most
				CharacterSheetCard instances are small stat tiles (AvCard etc., as
				narrow as 4rem) that a full rail system was never sized for. */}
			{frame ? (
				<CardFrame keystone="sheet" />
			) : (
				(['tl', 'tr', 'br', 'bl'] as const).map((pos) => (
					<span key={pos} className={`cs-rivet cs-rivet-${pos}`} aria-hidden="true" />
				))
			)}
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

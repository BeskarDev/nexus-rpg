import {
	Box,
	IconButton,
	Menu,
	Tooltip,
	Typography,
	alpha,
} from '@mui/material'
import { Settings } from '@mui/icons-material'
import React, { useState, ReactNode } from 'react'
import { UI_COLORS } from '../../../utils/colors'

export type StatCardProps = {
	/** Icon component to display */
	icon?: ReactNode
	/** Label text (e.g., "STR", "AV", "Coins") */
	label: string
	/** Main value to display (number or string) */
	value: string | number
	/** Color for icon and label */
	color?: string
	/** Tooltip text for the card */
	tooltip?: string
	/** Whether to show a config/settings button */
	showConfig?: boolean
	/** Callback when config button is clicked (if not using built-in menu) */
	onConfigClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	/** Content to show in config menu (if using built-in menu) */
	configContent?: ReactNode
	/** Whether to highlight as a "wounded" state (red border) */
	isWounded?: boolean
	/** Min width of the card (defaults to 3.5rem) */
	minWidth?: string
	/** Max width of the card (defaults to 4rem) */
	maxWidth?: string
	/** Padding for the card (defaults to 0.5) */
	padding?: number
	/** Font size for the value (defaults to 1rem) */
	valueFontSize?: string
	/** Additional content below the value */
	additionalContent?: ReactNode
	/** Additional sx props for the card container */
	sx?: object
}

/**
 * StatCard - A reusable game-UI style card for displaying statistics.
 * Used across Statistics, Items, Spells, and other tabs for consistent game-like UI.
 */
export const StatCard: React.FC<StatCardProps> = ({
	icon,
	label,
	value,
	color = UI_COLORS.greyBlue, // default gray-blue
	tooltip,
	showConfig = false,
	onConfigClick,
	configContent,
	isWounded = false,
	minWidth = '3.5rem',
	maxWidth = '4.5rem',
	padding = 0.5,
	valueFontSize = '1rem',
	additionalContent,
	sx,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleConfigClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		if (onConfigClick) {
			onConfigClick(event)
		} else {
			setAnchorEl(event.currentTarget)
		}
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const cardContent = (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minWidth,
				maxWidth,
				borderRadius: 1,
				border: (theme) =>
					`1px solid ${isWounded ? theme.palette.error.main : alpha(theme.palette.divider, 0.2)}`,
				bgcolor: (theme) => alpha(theme.palette.background.paper, 0.3),
				p: padding,
				position: 'relative',
				transition: 'border-color 0.2s ease-in-out',
				'&:hover': {
					// `color` may be a `var(--cs-*)` custom property (M9 S1) — alpha()
					// can only parse a resolved color, not a CSS var, so this is a
					// color-mix() rather than an alpha() call (the only such site, F7).
					borderColor: isWounded
						? undefined
						: `color-mix(in srgb, ${color} 60%, transparent)`,
				},
				...sx,
			}}
		>
			{/* Icon + Label row */}
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
				{icon && (
					<Box sx={{ fontSize: '0.7rem', color: color, display: 'flex' }}>
						{icon}
					</Box>
				)}
				{/* M9 S3: same cartouche-register small-caps treatment as CardHeader,
					at the token scale's smallest step (3xs) — the raw 0.55rem this
					replaced was one of the sizes the type-scale token ladder exists
					to retire. */}
				<Typography
					variant="caption"
					sx={{
						fontFamily: 'var(--nexus-font-ui)',
						fontWeight: 700,
						fontSize: 'var(--nexus-text-3xs)',
						color: color,
						fontVariant: 'small-caps',
						letterSpacing: '0.03em',
					}}
				>
					{label}
				</Typography>
			</Box>

			{/* Value display - centered. Display serif (M9 S2): a stat value is a
				carved numeral, not field content, so it takes the same font as a
				card title rather than the sheet's UI sans. */}
			<Typography
				sx={{
					fontFamily: 'var(--nexus-font-display)',
					fontWeight: 'bold',
					fontSize: valueFontSize,
					lineHeight: 1.2,
					textAlign: 'center',
				}}
			>
				{value}
			</Typography>

			{/* Config button in top-right corner */}
			{showConfig && (
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
				>
					<Settings sx={{ fontSize: '0.65rem' }} />
				</IconButton>
			)}

			{/* Additional content below value */}
			{additionalContent}
		</Box>
	)

	// Wrap in Tooltip if provided
	const wrappedCard = tooltip ? (
		<Tooltip title={tooltip}>{cardContent}</Tooltip>
	) : (
		cardContent
	)

	// If there's config content and using built-in menu
	if (configContent && !onConfigClick) {
		return (
			<>
				{wrappedCard}
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{ sx: { p: 2, maxWidth: '17.5rem' } }}
				>
					{configContent}
				</Menu>
			</>
		)
	}

	return wrappedCard
}

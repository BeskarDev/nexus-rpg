import React from 'react'
import { Box, Typography } from '@mui/material'
import { CardHeaderProps } from './types'
import { UI_COLORS } from '../../../../utils/colors'

export const CardHeader: React.FC<CardHeaderProps> = ({
	icon,
	label,
	color = UI_COLORS.grey,
	sx,
	'data-testid': testId,
}) => {
	return (
		<Box
			sx={{ display: 'flex', alignItems: 'center', gap: 0.25, ...sx }}
			data-testid={testId}
		>
			{icon && (
				<Box sx={{ fontSize: 'var(--nexus-text-xs)', color, display: 'flex', '& svg': { fontSize: 'inherit' } }}>
					{icon}
				</Box>
			)}
			{/* M9 S3: the codex kit's cartouche label register (small-caps, UI font)
				without its bordered nameplate box — that box hardcodes an
				ink-forward color with no per-instance override, which would lose
				the attribute/skill identity hue this label carries, and its padding
				doesn't fit a StatCard's ~3.5rem width. */}
			<Typography
				variant="caption"
				sx={{
					fontFamily: 'var(--nexus-font-ui)',
					fontWeight: 700,
					// M13 S3.5: one step up, from 11px. Small caps render at about cap
					// height, so this label had roughly the optical presence of 8px text
					// — on the surface a player scans mid-fight, beside body copy set at
					// 14. It stays a step below the value it names.
					fontSize: 'var(--nexus-text-xs)',
					color,
					fontVariant: 'small-caps',
					letterSpacing: '0.04em',
				}}
			>
				{label}
			</Typography>
		</Box>
	)
}

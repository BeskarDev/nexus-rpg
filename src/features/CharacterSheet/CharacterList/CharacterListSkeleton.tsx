import React from 'react'
import { Box, Skeleton } from '@mui/material'
import { CHARACTER_TEMPLATE } from './characterColumns'

interface CharacterListSkeletonProps {
	adminView?: boolean
}

/**
 * The list while it loads (M13 S12).
 *
 * It draws the SHAPE the list is about to have — the same grid, the same four
 * columns, the same row height — rather than a generic three-circle placeholder.
 * The old one drew circular avatars and full-width text bars, so the page
 * reflowed twice: once when the skeleton appeared and again when the real rows
 * replaced it with a different geometry. A skeleton that lies about the layout is
 * worse than no skeleton.
 */
const SkeletonRow: React.FC = () => (
	<Box
		className="cs-ledger-row cs-ledger-row-grid cs-character-row"
		sx={{ gridTemplateColumns: CHARACTER_TEMPLATE }}
		aria-hidden="true"
	>
		<Skeleton variant="rectangular" width={30} height={30} />
		<Skeleton variant="text" width="70%" height={22} />
		<Skeleton variant="text" width="60%" height={16} />
		<Skeleton variant="text" width="60%" height={16} />
		<Skeleton variant="text" width={18} height={16} sx={{ mx: 'auto' }} />
		<span />
		<span />
	</Box>
)

export const CharacterListSkeleton: React.FC<CharacterListSkeletonProps> = ({
	adminView = false,
}) => (
	<Box className="cs-character-list cs-ledger-cols" aria-busy="true">
		{(adminView ? [1, 2] : [1]).map((group) => (
			<Box key={group} sx={{ mb: adminView ? 2 : 0 }}>
				{adminView && (
					<Box sx={{ py: 0.75 }}>
						<Skeleton variant="text" width={140} height={18} />
					</Box>
				)}
				{[1, 2, 3, 4].slice(0, adminView ? 2 : 4).map((row) => (
					<SkeletonRow key={row} />
				))}
			</Box>
		))}
	</Box>
)

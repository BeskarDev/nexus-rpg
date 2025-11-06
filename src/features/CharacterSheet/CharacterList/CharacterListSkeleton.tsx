import React from 'react'
import {
	Box,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Skeleton,
	Typography,
} from '@mui/material'

interface CharacterListSkeletonProps {
	adminView?: boolean
}

export const CharacterListSkeleton: React.FC<CharacterListSkeletonProps> = ({
	adminView = false,
}) => {
	if (adminView) {
		// Admin view with grouped players
		return (
			<Box>
				{[1, 2, 3].map((groupIndex) => (
					<Box key={groupIndex}>
						{/* Player name header */}
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								mt: 2,
								mb: 1,
								px: 1,
								py: 0.5,
							}}
						>
							<Skeleton
								variant="circular"
								width={24}
								height={24}
								sx={{ mr: 1 }}
							/>
							<Skeleton variant="text" width={150} height={24} />
						</Box>
						{/* Characters in the group */}
						<List>
							{[1, 2].map((charIndex) => (
								<ListItem key={`${groupIndex}-${charIndex}`}>
									<ListItemAvatar>
										<Skeleton variant="circular" width={40} height={40} />
									</ListItemAvatar>
									<ListItemText
										primary={
											<Skeleton
												variant="text"
												width={`${60 + Math.random() * 30}%`}
												height={24}
											/>
										}
									/>
									<Box sx={{ ml: 2 }}>
										<Skeleton variant="circular" width={40} height={40} />
									</Box>
								</ListItem>
							))}
						</List>
					</Box>
				))}
			</Box>
		)
	}

	// Regular view
	return (
		<List>
			{[1, 2, 3, 4].map((index) => (
				<ListItem key={index}>
					<ListItemAvatar>
						<Skeleton variant="circular" width={40} height={40} />
					</ListItemAvatar>
					<ListItemText
						primary={
							<Skeleton
								variant="text"
								width={`${60 + Math.random() * 30}%`}
								height={24}
							/>
						}
					/>
					<Box sx={{ ml: 2 }}>
						<Skeleton variant="circular" width={40} height={40} />
					</Box>
				</ListItem>
			))}
		</List>
	)
}

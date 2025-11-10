import { ListAlt, ChevronLeft, ChevronRight, Expand, ExpandMore } from '@mui/icons-material'
import {
	Avatar,
	Box,
	Collapse,
	IconButton,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Typography, // Import Typography for headers
} from '@mui/material'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import React, { useState, useEffect } from 'react'
import { CharacterDocument } from '../../../types/Character'
import { DeleteButton } from './DeleteButton'
import { calculateCharacterLevel } from '../utils/calculateCharacterLevel'

export interface CharacterListProps {
	characters: CharacterDocument[]
	handleDeleteCharacter: (char: CharacterDocument) => Promise<void>
}

export const CharacterList: React.FC<CharacterListProps> = ({
	characters,
	handleDeleteCharacter,
}) => {
	const { isAdmin, currentUser, viewAsAdmin } = useAuth()
	
	// Track which player sections are expanded (for admin view)
	// Default: expand admin's own characters, collapse others
	const [expandedPlayers, setExpandedPlayers] = useState<Set<string>>(new Set())

	// Initialize expanded players when characters are loaded
	useEffect(() => {
		if (!isAdmin || !viewAsAdmin || !currentUser || characters.length === 0) return
		
		// Find the admin's player name from their characters
		const adminChars = characters.filter(char => char.collectionId === currentUser.uid)
		if (adminChars.length > 0) {
			const adminPlayerName = adminChars[0]?.personal.playerName || currentUser.uid
			setExpandedPlayers(new Set([adminPlayerName]))
		}
	}, [characters.length, isAdmin, viewAsAdmin, currentUser])

	const buildCharacterName = (char: CharacterDocument) =>
		`${char.personal.name} (${char.personal.folk} ${char.personal.background}, Level ${calculateCharacterLevel(char.skills.xp.spend)})`

	const togglePlayerExpanded = (playerName: string) => {
		setExpandedPlayers(prev => {
			const newSet = new Set(prev)
			if (newSet.has(playerName)) {
				newSet.delete(playerName)
			} else {
				newSet.add(playerName)
			}
			return newSet
		})
	}

	// Show empty state if no characters
	if (characters.length === 0) {
		return (
			<Box
				sx={{
					textAlign: 'center',
					py: 6,
					px: 2,
				}}
			>
				<Typography variant="h6" gutterBottom>
					No Characters Yet
				</Typography>
				<Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
					Get started by creating your first character!
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Click the <strong>"New Character"</strong> button above to choose between
					creating a quickstart character or building one from scratch.
				</Typography>
			</Box>
		)
	}

	return (
		<List>
			{isAdmin && viewAsAdmin
				? // Group characters by playerName if the user is an admin viewing as admin
					Object.entries(
						characters.reduce(
							(groups, char) => {
								const playerName = char.personal.playerName || 'Unknown Player'
								if (!groups[playerName]) {
									groups[playerName] = []
								}
								groups[playerName].push(char)
								return groups
							},
							{} as Record<string, CharacterDocument[]>,
						),
					)
						.sort(([a], [b]) => a.localeCompare(b)) // Sort playerName alphabetically
						.map(([playerName, playerCharacters]) => {
							const isExpanded = expandedPlayers.has(playerName)
							return (
								<React.Fragment key={playerName}>
									<Box 
										sx={{ 
											display: 'flex', 
											alignItems: 'center', 
											mt: 2, 
											mb: 1,
											cursor: 'pointer',
											'&:hover': {
												backgroundColor: 'action.hover',
											},
											borderRadius: 1,
											px: 1,
											py: 0.5,
										}}
										onClick={() => togglePlayerExpanded(playerName)}
									>
										<IconButton 
											size="small"
											sx={{ mr: 0.5 }}
										>
											{isExpanded ? <ExpandMore /> : <ChevronRight />}
										</IconButton>
										<Typography variant="subtitle2">
											{playerName} ({playerCharacters.length})
										</Typography>
									</Box>
									<Collapse in={isExpanded} timeout="auto" unmountOnExit>
										{playerCharacters
											.sort((a, b) => buildCharacterName(a).localeCompare(buildCharacterName(b))) // Sort characters alphabetically by name
											.map((char) => (
												<ListItem
													key={char.docId}
													secondaryAction={
														<DeleteButton
															handleDeleteCharacter={() =>
																handleDeleteCharacter(char)
															}
														/>
													}
												>
													<Link
														href={`${window.location.href.split('?')[0]}?id=${char.collectionId}-${char.docId}`}
														sx={{ width: '100%', textDecoration: 'none' }}
													>
														<ListItemButton sx={{ borderRadius: 30, mr: 2 }}>
															<ListItemAvatar>
																<Avatar src={char.personal.profilePicture}>
																	<ListAlt />
																</Avatar>
															</ListItemAvatar>
															<ListItemText
																primary={buildCharacterName(char)}
																sx={{ textDecoration: 'none' }}
															/>
														</ListItemButton>
													</Link>
												</ListItem>
											))}
									</Collapse>
								</React.Fragment>
							)
						})
				: // Render characters normally if the user is not an admin
					characters.map((char) => (
						<ListItem
							key={char.docId}
							secondaryAction={
								<DeleteButton
									handleDeleteCharacter={() => handleDeleteCharacter(char)}
								/>
							}
						>
							<Link
								href={`${window.location.href.split('?')[0]}?id=${char.collectionId}-${char.docId}`}
								sx={{ width: '100%', textDecoration: 'none' }}
							>
								<ListItemButton sx={{ borderRadius: 30, mr: 2 }}>
									<ListItemAvatar>
										<Avatar src={char.personal.profilePicture}>
											<ListAlt />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={buildCharacterName(char)}
										sx={{ textDecoration: 'none' }}
									/>
								</ListItemButton>
							</Link>
						</ListItem>
					))}
		</List>
	)
}

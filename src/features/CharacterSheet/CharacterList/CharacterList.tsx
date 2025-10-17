import { ListAlt } from '@mui/icons-material'
import {
	Avatar,
	Link,
	List,
	ListItem,
	ListItemAvatar,
	ListItemButton,
	ListItemText,
	Typography, // Import Typography for headers
} from '@mui/material'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import React from 'react'
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
	const { isAdmin } = useAuth()

	const buildCharacterName = (char: CharacterDocument) =>
		`${char.personal.name} (${char.personal.folk} ${char.personal.background}, Level ${calculateCharacterLevel(char.skills.xp.spend)})`

	return (
		<List>
			{isAdmin
				? // Group characters by playerName if the user is an admin
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
						.map(([playerName, playerCharacters]) => (
							<React.Fragment key={playerName}>
								<Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
									{playerName}
								</Typography>
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
							</React.Fragment>
						))
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

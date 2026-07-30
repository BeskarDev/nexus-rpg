import { ChevronRight, ExpandMore } from '@mui/icons-material'
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
import { Cartouche } from '@site/src/components/codex/ornaments'
import SigilIcon from '@site/src/components/codex/SigilIcon'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import React, { useState, useEffect } from 'react'
import { CharacterDocument } from '../../../types/Character'
import { DeleteButton } from './DeleteButton'
import { calculateCharacterLevel } from '../utils/calculateCharacterLevel'

export interface CharacterListProps {
	characters: CharacterDocument[]
	handleDeleteCharacter: (char: CharacterDocument) => Promise<void>
}

/* M9 S8 — the character list is a CONTENTS PAGE, not a tile grid
   (codex-theme § Composition). Ruled rows: name left in the display serif, the
   folk/background line beneath it, the level as a cartouche tag on the right,
   one engraved hairline between entries. The old pill (`borderRadius: 30`) and
   the circular avatar were the two things that read as a web-app contact list. */
const ROW_RULE =
	'1px solid color-mix(in srgb, var(--nexus-bronze) 22%, transparent)'

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
		if (!isAdmin || !viewAsAdmin || !currentUser || characters.length === 0)
			return

		// Find the admin's player name from their characters
		const adminChars = characters.filter(
			(char) => char.collectionId === currentUser.uid,
		)
		if (adminChars.length > 0) {
			const adminPlayerName =
				adminChars[0]?.personal.playerName || currentUser.uid
			setExpandedPlayers(new Set([adminPlayerName]))
		}
	}, [characters.length, isAdmin, viewAsAdmin, currentUser])

	const buildCharacterName = (char: CharacterDocument) =>
		`${char.personal.name} (${char.personal.folk} ${char.personal.background}, Level ${calculateCharacterLevel(char.skills.xp.spend)})`

	const buildCharacterMeta = (char: CharacterDocument) =>
		[char.personal.folk, char.personal.background].filter(Boolean).join(' · ')

	const togglePlayerExpanded = (playerName: string) => {
		setExpandedPlayers((prev) => {
			const newSet = new Set(prev)
			if (newSet.has(playerName)) {
				newSet.delete(playerName)
			} else {
				newSet.add(playerName)
			}
			return newSet
		})
	}

	/** One ruled entry in the contents page. */
	const renderCharacterRow = (char: CharacterDocument) => (
		<ListItem
			key={char.docId}
			disablePadding
			sx={{ borderBottom: ROW_RULE }}
			secondaryAction={
				<DeleteButton
					handleDeleteCharacter={() => handleDeleteCharacter(char)}
					characterName={char.personal.name}
				/>
			}
		>
			<Link
				href={`${window.location.href.split('?')[0]}?id=${char.collectionId}-${char.docId}`}
				sx={{ width: '100%', textDecoration: 'none' }}
			>
				<ListItemButton
					sx={{
						borderRadius: 0,
						py: 1,
						pr: 7,
						gap: 1,
						'&:hover': {
							backgroundColor:
								'color-mix(in srgb, var(--nexus-bronze) 8%, transparent)',
						},
					}}
				>
					<ListItemAvatar sx={{ minWidth: 44 }}>
						<Avatar
							src={char.personal.profilePicture}
							variant="square"
							sx={{
								width: 34,
								height: 34,
								borderRadius: '2px',
								backgroundColor: 'transparent',
								color: 'var(--nexus-bronze)',
								border:
									'1px solid color-mix(in srgb, var(--nexus-bronze) 45%, transparent)',
							}}
						>
							<SigilIcon name="scroll" size={18} aria-hidden="true" />
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={char.personal.name}
						secondary={buildCharacterMeta(char)}
						primaryTypographyProps={{
							sx: {
								fontFamily: 'var(--nexus-font-display)',
								fontWeight: 600,
								letterSpacing: '0.02em',
							},
						}}
						secondaryTypographyProps={{
							sx: { fontSize: 'var(--nexus-text-2xs)' },
						}}
						sx={{ textDecoration: 'none', my: 0 }}
					/>
					<Cartouche compact>
						{`Level ${calculateCharacterLevel(char.skills.xp.spend)}`}
					</Cartouche>
				</ListItemButton>
			</Link>
		</ListItem>
	)

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
					Click the <strong>"New Character"</strong> button above to choose
					between creating a quickstart character or building one from scratch.
				</Typography>
			</Box>
		)
	}

	return (
		<List disablePadding sx={{ borderTop: ROW_RULE }}>
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
											cursor: 'pointer',
											borderBottom: ROW_RULE,
											backgroundColor:
												'color-mix(in srgb, var(--nexus-bronze) 8%, transparent)',
											'&:hover': {
												backgroundColor:
													'color-mix(in srgb, var(--nexus-bronze) 14%, transparent)',
											},
											px: 1,
											py: 0.5,
										}}
										onClick={() => togglePlayerExpanded(playerName)}
									>
										<IconButton size="small" sx={{ mr: 0.5 }}>
											{isExpanded ? <ExpandMore /> : <ChevronRight />}
										</IconButton>
										<Typography
											variant="subtitle2"
											sx={{
												fontFamily: 'var(--nexus-font-ui)',
												fontVariant: 'small-caps',
												letterSpacing: '0.05em',
											}}
										>
											{playerName} ({playerCharacters.length})
										</Typography>
									</Box>
									<Collapse in={isExpanded} timeout="auto" unmountOnExit>
										{playerCharacters
											.sort((a, b) =>
												buildCharacterName(a).localeCompare(
													buildCharacterName(b),
												),
											) // Sort characters alphabetically by name
											.map(renderCharacterRow)}
									</Collapse>
								</React.Fragment>
							)
						})
				: // Render characters normally if the user is not an admin
					characters.map(renderCharacterRow)}
		</List>
	)
}

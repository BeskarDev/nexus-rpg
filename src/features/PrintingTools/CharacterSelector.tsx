import React, { useEffect, useState } from 'react'
import {
	Alert,
	Box,
	CircularProgress,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	SelectChangeEvent,
	Stack,
	Typography,
	useTheme,
} from '@mui/material'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import { firebaseService } from '@site/src/dev/firebaseService'
import { CharacterDocument } from '@site/src/types/Character'

export interface CharacterSelectorProps {
	onCharacterSelect: (character: CharacterDocument | null) => void
	selectedCharacterId?: string
	label?: string
	helperText?: string
}

/**
 * A reusable component that allows users to select one of their characters
 * from Firebase. This component handles authentication, loading states, and
 * provides a user-friendly interface for character selection.
 */
export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
	onCharacterSelect,
	selectedCharacterId,
	label = 'Select Character',
	helperText = 'Choose a character to automatically load their abilities',
}) => {
	const theme = useTheme()
	const { userLoggedIn, currentUser, isAdmin, viewAsAdmin } = useAuth()
	const [characters, setCharacters] = useState<CharacterDocument[]>([])
	const [allCharacters, setAllCharacters] = useState<CharacterDocument[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [selectedId, setSelectedId] = useState<string>(
		selectedCharacterId || '',
	)

	// Load characters when authentication state changes
	useEffect(() => {
		if (userLoggedIn && currentUser) {
			loadCharacters()
		} else if (process.env.NODE_ENV === 'development') {
			// In development mode, load mock data even without auth
			loadCharacters()
		}
	}, [userLoggedIn, currentUser])

	// Filter characters based on admin view toggle
	useEffect(() => {
		if (!isAdmin || !currentUser) {
			setCharacters(allCharacters)
			return
		}

		if (viewAsAdmin) {
			// Show all characters (admin view)
			setCharacters(allCharacters)
		} else {
			// Show only user's own characters
			const userChars = allCharacters.filter(
				(char) => char.collectionId === currentUser.uid,
			)
			setCharacters(userChars)
		}
	}, [viewAsAdmin, isAdmin, currentUser, allCharacters])

	const loadCharacters = async () => {
		setLoading(true)
		setError(null)
		try {
			const userUid = currentUser?.uid || 'dev-user'

			// Get user's collection
			const userChars = await firebaseService.getCollection(userUid)

			// Check for admin permissions and load additional collections
			const userInfo = await firebaseService.getUserInfo(userUid)

			// Load additional collections if user has admin access
			if (userInfo.allowedCollections.length > 0) {
				const allChars = [...userChars]
				for (const adminCollectionId of userInfo.allowedCollections) {
					const adminChars =
						await firebaseService.getCollection(adminCollectionId)
					allChars.push(...adminChars)
				}
				setAllCharacters(allChars)
				setCharacters(allChars)
			} else {
				setAllCharacters(userChars)
				setCharacters(userChars)
			}
		} catch (err) {
			console.error('Failed to load characters:', err)
			setError('Failed to load characters. Please try again.')
		} finally {
			setLoading(false)
		}
	}

	const handleChange = (event: SelectChangeEvent<string>) => {
		const characterId = event.target.value
		setSelectedId(characterId)

		if (!characterId) {
			onCharacterSelect(null)
			return
		}

		const character = characters.find(
			(char) => `${char.collectionId}-${char.docId}` === characterId,
		)
		onCharacterSelect(character || null)
	}

	if (!userLoggedIn && process.env.NODE_ENV !== 'development') {
		return (
			<Alert severity="info" sx={{ mb: 2 }}>
				Please log in to load characters from your account.
			</Alert>
		)
	}

	if (loading) {
		return (
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
				<CircularProgress size={24} />
				<Typography variant="body2">Loading characters...</Typography>
			</Box>
		)
	}

	if (error) {
		return (
			<Alert severity="error" sx={{ mb: 2 }}>
				{error}
			</Alert>
		)
	}

	if (characters.length === 0) {
		return (
			<Alert severity="info" sx={{ mb: 2 }}>
				No characters found. Create a character first to use this feature.
			</Alert>
		)
	}

	return (
		<Stack gap={1}>
			<FormControl fullWidth>
				<InputLabel id="character-selector-label">{label}</InputLabel>
				<Select
					labelId="character-selector-label"
					id="character-selector"
					value={selectedId}
					label={label}
					onChange={handleChange}
					sx={{
						backgroundColor:
							theme.palette.mode === 'dark' ? '#1e1e1e' : 'white',
					}}
				>
					<MenuItem value="">
						<em>None - Select manually below</em>
					</MenuItem>
					{characters.map((character) => {
						const characterId = `${character.collectionId}-${character.docId}`
						return (
							<MenuItem key={characterId} value={characterId}>
								{character.personal.name}
								{character.personal.playerName &&
									` (${character.personal.playerName})`}
							</MenuItem>
						)
					})}
				</Select>
			</FormControl>
			{helperText && (
				<Typography variant="caption" color="text.secondary">
					{helperText}
				</Typography>
			)}
		</Stack>
	)
}

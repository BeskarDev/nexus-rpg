import React, { useState } from 'react'
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
} from '@mui/material'
import { CharacterDocument } from '@site/src/types/Character'
import { characterKey, useCharacterRoster } from './useCharacterRoster'

export interface CharacterSelectorProps {
	onCharacterSelect: (character: CharacterDocument | null) => void
	selectedCharacterId?: string
	label?: string
	helperText?: string
}

/**
 * Whatever the roster has to say before it has characters to offer.
 *
 * Shared by the single and multi selectors: signed out, loading, failed and
 * empty are the same four states whichever control is going to render the
 * roster, and they were worth exactly one copy.
 */
export const RosterStatus: React.FC<{
	loading: boolean
	error: string | null
	userLoggedIn: boolean
	empty: boolean
}> = ({ loading, error, userLoggedIn, empty }) => {
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

	if (empty) {
		return (
			<Alert severity="info" sx={{ mb: 2 }}>
				No characters found. Create a character first to use this feature.
			</Alert>
		)
	}

	return null
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
	const { characters, loading, error, userLoggedIn } = useCharacterRoster()
	const [selectedId, setSelectedId] = useState<string>(
		selectedCharacterId || '',
	)

	const handleChange = (event: SelectChangeEvent<string>) => {
		const characterId = event.target.value
		setSelectedId(characterId)

		if (!characterId) {
			onCharacterSelect(null)
			return
		}

		const character = characters.find(
			(char) => characterKey(char) === characterId,
		)
		onCharacterSelect(character || null)
	}

	// Signed out, loading, failed or empty: the status IS the control, and there
	// is no dropdown worth drawing behind it.
	if (
		(!userLoggedIn && process.env.NODE_ENV !== 'development') ||
		loading ||
		error ||
		characters.length === 0
	) {
		return (
			<RosterStatus
				loading={loading}
				error={error}
				userLoggedIn={userLoggedIn}
				empty={characters.length === 0}
			/>
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
					MenuProps={{
						PaperProps: {
							style: {
								maxHeight: 48 * 6 + 8, // 6 items + padding
							},
						},
					}}
					sx={{
						backgroundColor: 'background.default',
					}}
				>
					<MenuItem value="">
						<em>None - Select manually below</em>
					</MenuItem>
					{characters.map((character) => (
						<MenuItem
							key={characterKey(character)}
							value={characterKey(character)}
						>
							{character.personal.name}
							{character.personal.playerName &&
								` (${character.personal.playerName})`}
						</MenuItem>
					))}
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

import { Box, Typography } from '@mui/material'
import { useAuth } from '@site/src/hooks/firebaseAuthContext'
import React, { useState, useEffect } from 'react'
import { CharacterDocument } from '../../../types/Character'
import { ListSection } from '../components'
import { CharacterRow } from './CharacterRow'
import { CHARACTER_HEADINGS, CHARACTER_TEMPLATE } from './characterColumns'

export interface CharacterListProps {
	characters: CharacterDocument[]
	handleDeleteCharacter: (char: CharacterDocument) => Promise<void>
}

/**
 * The character list, as the sheet's own ledger (M13 S12).
 *
 * ## What it was, and why it was left behind
 *
 * M9 S8 made this a CONTENTS PAGE rather than a tile grid, which was the right
 * call and is still the shape: ruled rows, a mark, a name, a line saying what is
 * inside. Then M13 re-cut every list on the sheet ITSELF — one row primitive, one
 * section primitive, ruled column headings, cells that align down a page — and
 * this list, being one screen earlier in the journey, kept the M9 construction.
 *
 * The result was the first thing a player sees not matching anything after it: a
 * MUI `List` of `ListItemButton`s with a circular-avatar slot, a
 * `folk · background` subtitle in place of columns, and the level as a cartouche
 * pinned to the far right of a 1400px row — 700px from the name it describes,
 * which is the same stranded-fragment fault S4e fixed on the load band.
 *
 * ## What it is
 *
 * The same four facts as columns: **Name, Folk, Background, Level**, under the
 * same ruled headings every tab uses, with the same `ReadCell`s. The admin's
 * per-player grouping is `ListSection` — the sheet's one section primitive, with
 * its count and its carved caret — instead of a hand-rolled header with a
 * Material chevron pair.
 *
 * The empty state stops apologising in three paragraphs and says the one thing a
 * reader needs, in the quiet register the rest of the sheet uses for an empty
 * course.
 */
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

	const togglePlayerExpanded = (playerName: string) => {
		setExpandedPlayers((prev) => {
			const next = new Set(prev)
			if (next.has(playerName)) {
				next.delete(playerName)
			} else {
				next.add(playerName)
			}
			return next
		})
	}

	/** By name, so a player's shelf reads in one order however it arrived. */
	const byName = (a: CharacterDocument, b: CharacterDocument) =>
		(a.personal.name || '').localeCompare(b.personal.name || '')

	/* The ledger's column header, decorative — every cell carries its own label
	   below the breakpoint, where the columns collapse and the header is gone. */
	const headings = (
		<Box
			className="cs-ledger-head"
			aria-hidden="true"
			sx={{ gridTemplateColumns: CHARACTER_TEMPLATE, maxWidth: '100%' }}
		>
			{CHARACTER_HEADINGS.map((heading, index) => (
				<span
					key={heading.label || `blank-${index}`}
					style={{ textAlign: heading.align }}
				>
					{heading.label}
				</span>
			))}
		</Box>
	)

	const rows = (list: CharacterDocument[]) =>
		[...list]
			.sort(byName)
			.map((char) => (
				<CharacterRow
					key={char.docId}
					character={char}
					onDelete={() => handleDeleteCharacter(char)}
				/>
			))

	if (characters.length === 0) {
		return (
			<Box className="cs-character-list cs-ledger-cols">
				<Typography className="cs-character-empty">
					No characters yet. <strong>New character</strong> above starts one,
					either from a quickstart or from scratch.
				</Typography>
			</Box>
		)
	}

	if (isAdmin && viewAsAdmin) {
		const byPlayer = characters.reduce(
			(groups, char) => {
				const playerName = char.personal.playerName || 'Unknown Player'
				groups[playerName] = [...(groups[playerName] ?? []), char]
				return groups
			},
			{} as Record<string, CharacterDocument[]>,
		)

		return (
			<Box className="cs-character-list">
				{Object.entries(byPlayer)
					.sort(([a], [b]) => a.localeCompare(b))
					.map(([playerName, playerCharacters]) => (
						<ListSection
							key={playerName}
							label={playerName}
							count={playerCharacters.length}
							className="cs-ledger-cols"
							collapsible
							expanded={expandedPlayers.has(playerName)}
							onExpandedChange={() => togglePlayerExpanded(playerName)}
						>
							{headings}
							{rows(playerCharacters)}
						</ListSection>
					))}
			</Box>
		)
	}

	return (
		<Box className="cs-character-list">
			<ListSection
				label="Characters"
				count={characters.length}
				className="cs-ledger-cols"
			>
				{headings}
				{rows(characters)}
			</ListSection>
		</Box>
	)
}

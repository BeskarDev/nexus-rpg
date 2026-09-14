import React, { useMemo, useState } from 'react'
import { CharacterDocument } from '@site/src/types/Character'
import { PrintToggle } from './PrintToggle'
import { RosterStatus } from './CharacterSelector'
import { characterKey, useCharacterRoster } from './useCharacterRoster'

export interface CharacterMultiSelectorProps {
	/** The keys currently ticked, as `characterKey` produces them. */
	selectedKeys: string[]
	onChange: (characters: CharacterDocument[], keys: string[]) => void
	helperText?: string
}

/**
 * Above this many rows the roster gets a search box (owner, 2026-09-14).
 *
 * An admin sees every player's characters, not their own five, and a flat
 * unscrolled column of 20+ toggles pushes the categories and the print verb
 * off the screen — the control panel's whole flow is source → selection →
 * count → verb, and a roster that owns the viewport breaks it.
 *
 * The threshold exists so a small roster stays a plain list: a search box over
 * four names is furniture asking to be ignored.
 */
const SEARCHABLE_FROM = 8

/** Character name, player name, both lowercased — what a search reads. */
const haystack = (character: CharacterDocument): string =>
	`${character.personal?.name ?? ''} ${character.personal?.playerName ?? ''}`.toLowerCase()

/**
 * The roster as a CHECKLIST, for a tool that prints for a party (M22 S2).
 *
 * A dropdown is right when the answer is one character, and it is what every
 * other print tool uses. Print Everything's answer is "these three of my five",
 * which a dropdown makes into three separate trips and shows the state of only
 * while it is open. A checkbox per character shows the whole answer at rest,
 * which is what the page's count and page estimate are computed from.
 *
 * Deliberately NOT a MUI `Checkbox` list: the codex theme's checkmark socket is
 * what a toggle looks like here, and `.pt-toggle` is the class the print tools
 * already carry it on.
 *
 * **It has to survive an admin's roster**, which is every player's characters
 * rather than one person's: search, a scroll box, and a count that states how
 * many are ticked including any the search is currently hiding.
 */
export const CharacterMultiSelector: React.FC<CharacterMultiSelectorProps> = ({
	selectedKeys,
	onChange,
	helperText,
}) => {
	const { characters, loading, error, userLoggedIn } = useCharacterRoster()
	const [search, setSearch] = useState('')

	/**
	 * Grouped by player, then by character name.
	 *
	 * The roster's order is the DECK's order, and an admin printing for a table
	 * wants one player's characters together in the stack. Firestore returns
	 * them collection by collection, which is close to that but not it — a
	 * player with characters in two collections is scattered.
	 */
	const roster = useMemo(
		() =>
			[...characters].sort(
				(a, b) =>
					(a.personal?.playerName ?? '').localeCompare(
						b.personal?.playerName ?? '',
					) || (a.personal?.name ?? '').localeCompare(b.personal?.name ?? ''),
			),
		[characters],
	)

	const query = search.trim().toLowerCase()
	const shown = useMemo(
		() =>
			query
				? roster.filter((character) => haystack(character).includes(query))
				: roster,
		[roster, query],
	)

	/** Whatever the keys become, resolved back to documents in roster order. */
	const commit = (keys: string[]) =>
		onChange(
			roster.filter((character) => keys.includes(characterKey(character))),
			keys,
		)

	const toggle = (key: string) =>
		commit(
			selectedKeys.includes(key)
				? selectedKeys.filter((existing) => existing !== key)
				: [...selectedKeys, key],
		)

	/**
	 * Select or deselect what is VISIBLE, never the whole roster.
	 *
	 * With a search active the buttons are the fast path for "everyone of
	 * Tamar's", so they act on the filtered rows and leave the rest of the
	 * selection alone. With no search active, shown IS the roster and this is
	 * the plain meaning anyway.
	 */
	const setShown = (on: boolean) => {
		const shownKeys = shown.map(characterKey)
		commit(
			on
				? [
						...selectedKeys,
						...shownKeys.filter((key) => !selectedKeys.includes(key)),
					]
				: selectedKeys.filter((key) => !shownKeys.includes(key)),
		)
	}

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

	const searchable = roster.length >= SEARCHABLE_FROM
	const selectedCount = selectedKeys.length

	return (
		<div className="pt-roster">
			{searchable && (
				<input
					type="search"
					className="pt-roster__search"
					value={search}
					onChange={(event) => setSearch(event.target.value)}
					placeholder="Search by character or player…"
					aria-label="Search characters"
				/>
			)}

			<div
				className={`pt-roster__list${searchable ? ' is-scrolling' : ''}`}
				role="group"
				aria-label="Characters"
			>
				{shown.map((character) => {
					const key = characterKey(character)
					return (
						<PrintToggle
							key={key}
							className="pt-toggle--tight"
							checked={selectedKeys.includes(key)}
							onChange={() => toggle(key)}
							label={character.personal.name || 'Unnamed'}
							note={character.personal.playerName || undefined}
						/>
					)
				})}
				{shown.length === 0 && (
					<p className="pt-roster__hint">No character matches that search.</p>
				)}
			</div>

			<div className="pt-select-row">
				<button
					type="button"
					className="pt-verb-quiet"
					onClick={() => setShown(true)}
					disabled={shown.length === 0}
				>
					{query ? 'Select shown' : 'Select all'}
				</button>
				<button
					type="button"
					className="pt-verb-quiet"
					onClick={() => setShown(false)}
					disabled={shown.length === 0}
				>
					{query ? 'Deselect shown' : 'Deselect all'}
				</button>
			</div>

			{/* The selected count is the ANSWER to what a search is hiding: with a
			    filter on, ticked rows scroll out of view, and a reader who cannot
			    see them still has to know they are in the deck. */}
			<p className="pt-roster__tally">
				{selectedCount} of {roster.length} selected
				{query && shown.length !== roster.length && (
					<> · {shown.length} shown</>
				)}
			</p>

			{helperText && <p className="pt-roster__hint">{helperText}</p>}
		</div>
	)
}

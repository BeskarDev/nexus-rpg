import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
} from '@mui/material'
import {
	MagicItem,
	MagicItemCategory,
	magicItemCategories,
} from '@site/src/types/MagicItem'
import type { CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import {
	useAutofitPending,
	useSpillPlan,
	whenAutofitSettled,
} from '@site/src/components/autofit'
import {
	CARD_PAGE,
	CARD_PAGE_MARGIN,
	CARD_SIZE,
	deckDocumentTitle,
	itemsPerPage,
	PrintPages,
	CharacterSelector,
	PrintToolShell,
	usePagePrintStyle,
} from '../PrintingTools'
import { characterTreasure } from './characterTreasure'
import { MagicItemCard } from './MagicItemCard'
import './magicItemsStyles.css'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
}

/**
 * One item in the tool's list, whatever it came from (M19 D5).
 *
 * A deck can hold a character's relics and a design pasted as JSON in the same
 * run, so both sources share a shape. The `key` is what everything downstream
 * selects, spills and prints by — never the name, which is the duplicate bug
 * M18 fixed on the spell tool.
 */
interface ItemEntry {
	key: string
	source: 'character' | 'pasted'
	characterName?: string
	/** Has rules text worth a card (M19 D6). Pasted items always do. */
	candidate: boolean
	item: MagicItem
}

export const MagicItems: React.FC = () => {
	const [entries, setEntries] = React.useState<ItemEntry[]>([])
	const [selectedItems, setSelectedItems] = React.useState<string[]>([])
	/**
	 * A character's possessions are mostly rope and rations, so only those with
	 * rules text are offered by default (M19 D6). The rule is a heuristic about
	 * free text, so it HIDES rather than filters: this switch shows everything,
	 * and the count beside it says what is being held back (D4).
	 */
	const [showAllItems, setShowAllItems] = React.useState(false)
	/**
	 * A corrected category, per entry key. `inferCategory` reads a lantern out of
	 * a name, which is a guess — so the guess is editable rather than final (D8).
	 */
	const [categoryOverrides, setCategoryOverrides] = React.useState<
		Record<string, MagicItemCategory>
	>({})
	const [categoryFilter, setCategoryFilter] = React.useState<
		MagicItemCategory | 'all'
	>('all')
	const [jsonString, setJsonString] = React.useState<string>('')
	const [parseError, setParseError] = React.useState<string>('')
	const [showJsonImport, setShowJsonImport] = React.useState(true)

	const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
		const {
			target: { value },
		} = event
		setSelectedItems(typeof value === 'string' ? value.split(',') : value)
	}

	const handleCategoryFilterChange = (
		event: SelectChangeEvent<MagicItemCategory | 'all'>,
	) => {
		setCategoryFilter(event.target.value as MagicItemCategory | 'all')
	}

	const handleJsonUpload = (jsonStr: string) => {
		setJsonString(jsonStr)
		setParseError('')
		try {
			if (jsonStr.trim()) {
				const parsed = JSON.parse(jsonStr)
				// Handle both single item and array of items
				const items: MagicItem[] = Array.isArray(parsed) ? parsed : [parsed]

				// Validate that items have required fields
				const validItems = items.filter(
					(item) => item.name && item.category && item.description,
				)

				if (validItems.length === 0) {
					setParseError(
						'No valid items found. Each item must have at least: name, category, and description.',
					)
					return
				}

				// Pasted items are keyed by name within their own source: a paste is
				// a hand-written list and a name is all it has. A character's item
				// is keyed by the sheet's id, so the two never collide even when a
				// player pastes an item their character already carries (D5).
				const pastedEntries: ItemEntry[] = validItems.map((item) => ({
					key: `pasted:${item.name}`,
					source: 'pasted' as const,
					candidate: true,
					item,
				}))

				setEntries((prev) => {
					const existing = new Set(prev.map((entry) => entry.key))
					return [
						...prev,
						...pastedEntries.filter((entry) => !existing.has(entry.key)),
					]
				})

				// Automatically select newly added items
				setSelectedItems((prev) =>
					Array.from(new Set([...prev, ...pastedEntries.map((e) => e.key)])),
				)

				setParseError(
					`Successfully loaded ${validItems.length} magic item${validItems.length !== 1 ? 's' : ''}.`,
				)
			}
		} catch (error) {
			console.error('Failed to parse magic items JSON:', error)
			setParseError(
				'Failed to parse JSON. Please check the format and try again.',
			)
		}
	}

	/**
	 * Load a character's treasure (M19 D9).
	 *
	 * Several characters accumulate, as the spell tool does. Loading the same
	 * character twice adds nothing — every entry carries the sheet's own `id`,
	 * so a repeat is recognised rather than duplicated, while the same item
	 * carried by two DIFFERENT characters is two entries and two cards.
	 */
	const handleCharacterSelect = (character: CharacterDocument | null) => {
		if (!character) return
		const treasure = characterTreasure(character).map((entry) => ({
			key: `character:${entry.key}`,
			source: 'character' as const,
			characterName: entry.characterName,
			candidate: entry.candidate,
			item: entry.item,
		}))
		setEntries((prev) => {
			const existing = new Set(prev.map((entry) => entry.key))
			return [...prev, ...treasure.filter((entry) => !existing.has(entry.key))]
		})
		// Selected by default, but only what has rules text: loading a character
		// should not silently queue their bedroll for printing.
		setSelectedItems((prev) =>
			Array.from(
				new Set([
					...prev,
					...treasure.filter((e) => e.candidate).map((e) => e.key),
				]),
			),
		)
	}

	const componentRef = useRef()
	// Trap 2: a print that opens before the cards have settled prints the
	// pre-fit layout, and the dialog blocks the session, so there is no second
	// chance to get it right (M18 D2).
	const settlingCards = useAutofitPending()

	/** Every entry with its corrected category applied. */
	const resolved = useMemo(
		() =>
			entries.map((entry) =>
				categoryOverrides[entry.key]
					? {
							...entry,
							item: { ...entry.item, category: categoryOverrides[entry.key] },
						}
					: entry,
			),
		[entries, categoryOverrides],
	)

	/** How many of a character's possessions the candidate rule is holding back. */
	const hiddenCount = useMemo(
		() => resolved.filter((entry) => !entry.candidate).length,
		[resolved],
	)

	const availableItems = useMemo(
		() =>
			resolved
				.filter((entry) => showAllItems || entry.candidate)
				.filter(
					(entry) =>
						categoryFilter === 'all' || entry.item.category === categoryFilter,
				),
		[resolved, showAllItems, categoryFilter],
	)

	const filteredItems = useMemo(
		() => availableItems.filter((entry) => selectedItems.includes(entry.key)),
		[availableItems, selectedItems],
	)

	const selectAll = () =>
		setSelectedItems(availableItems.map((entry) => entry.key))
	const deselectAll = () => setSelectedItems([])

	/**
	 * The character-sourced entries in the deck, whose category was inferred and
	 * may need correcting (M19 D8). A pasted item states its own.
	 */
	const selectedCharacterItems = useMemo(
		() => filteredItems.filter((entry) => entry.source === 'character'),
		[filteredItems],
	)

	/**
	 * One character's deck is named after them; a mixed deck is not about a
	 * person, so it is left unnamed rather than named after whoever was first.
	 */
	const printSubject = useMemo(() => {
		const names = new Set(
			filteredItems
				.map((entry) => entry.characterName)
				.filter((name): name is string => Boolean(name)),
		)
		return names.size === 1 ? [...names][0] : undefined
	}, [filteredItems])

	// From the card and page geometry rather than a hand-written 9 — the same
	// call the preview paginates by, so the count and the pages cannot drift.
	// The spill runs BEFORE pagination (M18 D3, trap 11): a card that becomes
	// two children after the grid is computed lands on the wrong page.
	// The plan is told which keys are live, so deselecting an item retires its
	// cut instead of leaving it in the continuation count (M21 D5).
	const planKeys = useMemo(
		() => filteredItems.map((entry) => entry.key),
		[filteredItems],
	)
	const spillPlan = useSpillPlan(planKeys)
	const printedCards = useMemo(
		() =>
			filteredItems.flatMap((entry) =>
				spillPlan.partsFor(entry.key).map((part) => ({ entry, part })),
			),
		[filteredItems, spillPlan.partsFor],
	)

	const sheetCount = Math.ceil(
		printedCards.length / itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN),
	)

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		onBeforeGetContent: whenAutofitSettled,
		// Chrome names the PDF after `document.title`; without this a treasure
		// hoard and a spell deck download under the same name.
		documentTitle: deckDocumentTitle({
			kind: 'magic-items',
			count: printedCards.length,
			subject: printSubject,
		}),
	})

	// A document-level rule, so it goes in the document head — never in the
	// flow, where a `<style>` printed itself on the page as text (M19).
	usePagePrintStyle('@page { size: 192mm 267mm; }')

	return (
		<>
			<PrintToolShell
				controlsLabel="Select Items"
				previewLabel="Preview"
				controls={
					<>
						<div className="pt-section">
							<div className="pt-section__head">
								<span className="pt-section__step">I</span>
								<span className="pt-section__label">Source</span>
							</div>
							{/* The tool used to take raw JSON and nothing else, which made it
							    the one printing tool a player could not use: printing the
							    sword their character carries meant hand-writing it as JSON
							    first (M19). Several characters accumulate. */}
							<div className="pt-source">
								<CharacterSelector
									onCharacterSelect={handleCharacterSelect}
									label="Load character's items"
									helperText="Adds that character's weapons and items that have rules text."
								/>
							</div>
							<button
								type="button"
								className={`pt-import-toggle${showJsonImport ? ' is-open' : ''}`}
								onClick={() => setShowJsonImport(!showJsonImport)}
								aria-expanded={showJsonImport}
								aria-controls="pt-import-magic-items"
							>
								<span className="pt-import-toggle__caret" aria-hidden="true" />
								Paste magic items JSON
							</button>
							<div
								id="pt-import-magic-items"
								className={`pt-import-body${showJsonImport ? '' : ' is-hidden'}`}
							>
								<textarea
									value={jsonString}
									onChange={(event) => handleJsonUpload(event.target.value)}
									placeholder="Paste magic items JSON here (single item or array)…"
									aria-label="Magic items JSON import"
								/>
								{parseError && (
									<p
										style={{
											fontSize: 'var(--nexus-text-xs)',
											margin: '0.25rem 0 0',
										}}
									>
										{parseError}
									</p>
								)}
							</div>
						</div>
						<div className="pt-section">
							<div className="pt-section__head">
								<span className="pt-section__step">II</span>
								<span className="pt-section__label">Selection</span>
							</div>
							<FormControl size="small" fullWidth sx={{ mb: 0.5 }}>
								<InputLabel>Category</InputLabel>
								<Select
									value={categoryFilter}
									onChange={handleCategoryFilterChange}
									input={<OutlinedInput label="Category" />}
								>
									{/* Rendered from the union rather than typed out: the
									    vocabulary grew from four names to twelve (M19 D8) and a
									    hand-written list is a second place to forget one. */}
									<MenuItem value="all">All Categories</MenuItem>
									{magicItemCategories.map((category) => (
										<MenuItem key={category} value={category}>
											{category}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl size="small" fullWidth>
								<InputLabel>Magic Items</InputLabel>
								<Select
									multiple
									value={selectedItems}
									onChange={handleChange}
									input={<OutlinedInput label="Magic Items" />}
									renderValue={(selected) => `${selected.length} selected`}
									MenuProps={MenuProps}
								>
									{/* Keyed by the ENTRY, never by the name: a character's
									    "Bronze Khopesh" and a pasted one are two different
									    objects, and so are two characters' (M19 D9). */}
									{availableItems.map((entry) => (
										<MenuItem key={entry.key} value={entry.key}>
											<Checkbox
												checked={selectedItems.indexOf(entry.key) > -1}
											/>
											<ListItemText
												primary={entry.item.name}
												secondary={[
													entry.item.category,
													entry.characterName,
													entry.candidate ? undefined : 'no rules text',
												]
													.filter(Boolean)
													.join(' · ')}
											/>
										</MenuItem>
									))}
								</Select>
							</FormControl>
							{/*
							 * The inferred category, correctable.
							 *
							 * `inferCategory` reads "Storm Lantern" as a Utility item by
							 * pattern-matching a name, which is a guess about free text and
							 * will sometimes be wrong (M19 D8). Only shown for a character's
							 * items — a pasted item states its own category.
							 */}
							{selectedCharacterItems.length > 0 && (
								<div className="pt-select-row pt-select-row--stack">
									{selectedCharacterItems.map((entry) => (
										<FormControl key={entry.key} size="small" fullWidth>
											<InputLabel>{entry.item.name}</InputLabel>
											<Select
												value={entry.item.category}
												onChange={(event) =>
													setCategoryOverrides((prev) => ({
														...prev,
														[entry.key]: event.target
															.value as MagicItemCategory,
													}))
												}
												input={<OutlinedInput label={entry.item.name} />}
												MenuProps={MenuProps}
											>
												{magicItemCategories.map((category) => (
													<MenuItem key={category} value={category}>
														{category}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									))}
								</div>
							)}
							{/* What the candidate rule is holding back, and the switch that
							    reveals it. A filter nobody can see is a filter nobody can
							    correct (M19 D4). */}
							{hiddenCount > 0 && (
								<button
									type="button"
									className="pt-verb-quiet pt-verb-quiet--block"
									onClick={() => setShowAllItems((shown) => !shown)}
									aria-pressed={showAllItems}
								>
									{showAllItems
										? `Hide the ${hiddenCount} without rules text`
										: `Show all items (${hiddenCount} more without rules text)`}
								</button>
							)}
							<div className="pt-select-row">
								<button
									type="button"
									className="pt-verb-quiet"
									onClick={selectAll}
								>
									Select all
								</button>
								<button
									type="button"
									className="pt-verb-quiet"
									onClick={deselectAll}
								>
									Deselect all
								</button>
							</div>
						</div>
						<div className="pt-section">
							<div className="pt-count">
								<strong>{filteredItems.length}</strong>{' '}
								{filteredItems.length === 1 ? 'card' : 'cards'} selected
								{/* A spill that doubles a card's paper is stated, not
								    silent (M18 D3). */}
								{spillPlan.continuations > 0 && (
									<>
										{' '}
										→ <strong>{printedCards.length}</strong> printed (
										{spillPlan.continuations === 1
											? '1 continuation'
											: `${spillPlan.continuations} continuations`}
										)
									</>
								)}
								{filteredItems.length > 0 && (
									<>
										{' '}
										· <strong>{sheetCount}</strong>{' '}
										{sheetCount === 1 ? 'sheet' : 'sheets'}
									</>
								)}
							</div>
							<button
								type="button"
								className="pt-print-verb"
								onClick={handlePrint}
								disabled={filteredItems.length === 0 || settlingCards > 0}
							>
								{settlingCards > 0 ? 'Fitting cards…' : 'Print'}
							</button>
						</div>
					</>
				}
				preview={
					<div ref={componentRef}>
						<PrintPages
							page={CARD_PAGE}
							item={CARD_SIZE}
							margin={CARD_PAGE_MARGIN}
							empty={
								<p className="pt-empty">
									Paste magic items JSON in the controls panel to preview them
									here.
								</p>
							}
						>
							{printedCards.map(({ entry, part }) => (
								<MagicItemCard
									key={`${entry.key}#${part.part}`}
									{...entry.item}
									start={part.start}
									end={part.end}
									part={part.part}
									totalParts={part.totalParts}
									onFitted={(result) =>
										spillPlan.report(entry.key, part.start, result)
									}
								/>
							))}
						</PrintPages>
					</div>
				}
			/>
		</>
	)
}

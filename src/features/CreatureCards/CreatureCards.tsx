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
import { Character, CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef, useState } from 'react'
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
	CharacterSelector,
	deckDocumentTitle,
	itemsPerPage,
	PrintPages,
	PrintToolShell,
	usePagePrintStyle,
} from '../PrintingTools'
import './creatureCardsStyles.css'
import { CreatureCompactCard } from './CreatureCompactCard'
import { parseCreatureMarkdown } from './parseCreatureMarkdown'
import {
	companionId,
	creatureEntries,
	pastedId,
	type CreatureEntry,
} from './creatureSources'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 6 + ITEM_PADDING_TOP,
			width: 320,
		},
	},
}

/**
 * How many cards a creature needs is MEASURED, not counted (M18 D3, S4).
 *
 * What stood here was a 190-line layout strategy: `getCreatureCardStrategy`
 * picked one, two or three cards by adding up the lengths of a creature's
 * skills, attacks and abilities against thresholds of 700 and 400 characters.
 * It was the type ladder's mistake one level up, and it decided the card count
 * before anything had been laid out.
 *
 * ## The catalogue (M21 D1)
 *
 * The deck had two sources — a character's companions and pasted markdown — and
 * `creatures.json`, the canonical source that generates every tier page, was
 * simply not imported. A GM preparing an encounter had to find the creature in
 * the docs, copy its stat block out as markdown and paste it back in. All three
 * sources now produce a `CreatureEntry` with an ID (D6), because selection keyed
 * by NAME collapses a Wolf from the catalogue onto a Wolf companion — and, as
 * the data turned out, two different Manticores onto one entry.
 */

type TierFilter = 'all' | number
type CategoryFilter = 'all' | string

export const CreatureCards: React.FC = () => {
	const [markdownInput, setMarkdownInput] = useState<string>('')
	const [imported, setImported] = useState<CreatureEntry[]>([])
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [error, setError] = useState<string>('')
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>('')
	const [subject, setSubject] = useState<string | undefined>(undefined)
	const [showJsonImport, setShowJsonImport] = useState(false)
	const [showMarkdownPaste, setShowMarkdownPaste] = useState(false)
	const [tierFilter, setTierFilter] = useState<TierFilter>('all')
	const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all')

	// The catalogue is static, so it is adapted once. A malformed record is
	// reported rather than dropped in silence.
	const catalogue = useMemo(() => creatureEntries(), [])

	const addEntries = (entries: CreatureEntry[]) => {
		if (entries.length === 0) return
		setImported((current) => {
			const seen = new Set(current.map((entry) => entry.id))
			return [...current, ...entries.filter((entry) => !seen.has(entry.id))]
		})
		setSelectedIds((current) =>
			Array.from(new Set([...current, ...entries.map((entry) => entry.id)])),
		)
	}

	/** A character's companions, keyed by the document they came off (D6). */
	const companionEntries = (
		docId: string,
		companions: { markdown?: string }[] | undefined,
	): CreatureEntry[] => {
		const markdown = (companions ?? [])
			.map((companion) => companion.markdown)
			.filter((md) => md && md.trim())
			.join('\n\n')
		if (!markdown) return []
		return parseCreatureMarkdown(markdown).map((creature) => ({
			id: companionId(docId, creature.name),
			source: 'companion' as const,
			creature,
		}))
	}

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		if (!character) return
		try {
			addEntries(
				companionEntries(
					character.docId ?? character.personal?.name ?? 'character',
					character.companions,
				),
			)
			setSubject(character.personal?.name)
			setError('')
		} catch (err) {
			console.error('Failed to parse companion:', err)
			setError('Failed to parse companion data. Please check the format.')
		}
	}

	const handleCharacterUpload = (jsonString: string) => {
		setCharacterJsonString(jsonString)
		if (!jsonString.trim()) return
		try {
			const character: Character = JSON.parse(jsonString)
			addEntries(
				companionEntries(
					character.personal?.name ?? 'imported',
					character.companions,
				),
			)
			setSubject(character.personal?.name)
			setError('')
		} catch (err) {
			console.error('Failed to parse character JSON:', err)
			setError('Failed to parse character data. Please check the JSON format.')
		}
	}

	const handleParseMarkdown = () => {
		try {
			const parsed = parseCreatureMarkdown(markdownInput)
			if (parsed.length === 0) {
				setError('No creature stat blocks found in that markdown.')
				return
			}
			addEntries(
				parsed.map((creature, index) => ({
					id: pastedId(index, creature.name),
					source: 'pasted' as const,
					creature,
				})),
			)
			setError('')
		} catch (err) {
			setError(`Failed to parse markdown: ${err.message}`)
		}
	}

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => setMarkdownInput(e.target?.result as string)
			reader.readAsText(file)
		}
	}

	const allEntries = useMemo(
		() => [...imported, ...catalogue.entries],
		[imported, catalogue.entries],
	)

	const categories = useMemo(
		() =>
			Array.from(
				new Set(allEntries.map((entry) => entry.creature.category)),
			).sort(),
		[allEntries],
	)
	const tiers = useMemo(
		() =>
			Array.from(new Set(allEntries.map((entry) => entry.creature.tier))).sort(
				(a, b) => a - b,
			),
		[allEntries],
	)

	/**
	 * The filters shape the MENU, never the selection (D9).
	 *
	 * They are how a GM FINDS a creature in a 150-entry catalogue. Filtering the
	 * selection instead would mean changing a filter silently changed what
	 * prints.
	 */
	const menuEntries = useMemo(
		() =>
			allEntries.filter(
				(entry) =>
					(tierFilter === 'all' || entry.creature.tier === tierFilter) &&
					(categoryFilter === 'all' ||
						entry.creature.category === categoryFilter),
			),
		[allEntries, tierFilter, categoryFilter],
	)

	const selectedEntries = useMemo(
		() => allEntries.filter((entry) => selectedIds.includes(entry.id)),
		[allEntries, selectedIds],
	)

	const handleSelectionChange = (
		event: SelectChangeEvent<typeof selectedIds>,
	) => {
		const {
			target: { value },
		} = event
		setSelectedIds(typeof value === 'string' ? value.split(',') : value)
	}

	const componentRef = useRef()
	// Trap 2: a print that opens before the cards have settled prints the
	// pre-fit layout, and the dialog blocks the session, so there is no second
	// chance to get it right (M18 D2).
	const settlingCards = useAutofitPending()

	// The spill runs BEFORE pagination (M18 D3, trap 11). A creature is one
	// card's worth of blocks; a creature with more than that becomes two
	// children here, before `PrintPages` computes the grid.
	//
	// Keyed by ID, and the plan is told which keys are live, so deselecting a
	// creature retires its cut instead of leaving it in the count (D5, D6).
	const planKeys = useMemo(
		() => selectedEntries.map((entry) => entry.id),
		[selectedEntries],
	)
	const spillPlan = useSpillPlan(planKeys)
	const allCards = useMemo(
		() =>
			selectedEntries.flatMap((entry) =>
				spillPlan.partsFor(entry.id).map((part) => (
					<CreatureCompactCard
						key={`${entry.id}#${part.part}`}
						{...entry.creature}
						start={part.start}
						end={part.end}
						part={part.part}
						totalParts={part.totalParts}
						onFitted={(result) => spillPlan.report(entry.id, part.start, result)}
					/>
				)),
			),
		[selectedEntries, spillPlan.partsFor],
	)

	// From the card and page geometry rather than a hand-written 9 — the same
	// call the preview paginates by, so the count and the pages cannot drift.
	const sheetCount = Math.ceil(
		allCards.length / itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN),
	)

	// One character's companions are a deck about that person; a mixed deck of
	// catalogue creatures is not, so it stays unnamed rather than named after
	// whoever happened to be loaded first.
	const printSubject = useMemo(() => {
		const sources = new Set(selectedEntries.map((entry) => entry.source))
		return sources.size === 1 && sources.has('companion') ? subject : undefined
	}, [selectedEntries, subject])

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		onBeforeGetContent: whenAutofitSettled,
		// Chrome names the PDF after `document.title`, so a session's opponents
		// and a player's spell deck used to download under the same name.
		documentTitle: deckDocumentTitle({
			kind: 'creatures',
			count: allCards.length,
			subject: printSubject,
		}),
	})

	// A document-level rule, so it goes in the document head — never in the
	// flow, where a `<style>` printed itself on the page as text (M19).
	usePagePrintStyle('@page { size: 192mm 267mm; }')

	return (
		<PrintToolShell
			controlsLabel="Select Creatures"
			previewLabel="Preview"
			controls={
				<>
					<div className="pt-section">
						<div className="pt-section__head">
							<span className="pt-section__step">I</span>
							<span className="pt-section__label">Source</span>
						</div>
						<div className="pt-source">
							<CharacterSelector
								onCharacterSelect={handleCharacterSelect}
								label="Load character's companions"
								helperText="Adds the character's companion creatures beside the catalogue."
							/>
							<button
								type="button"
								className={`pt-import-toggle${showMarkdownPaste ? ' is-open' : ''}`}
								onClick={() => setShowMarkdownPaste(!showMarkdownPaste)}
								aria-expanded={showMarkdownPaste}
								aria-controls="pt-import-creature-markdown"
							>
								<span className="pt-import-toggle__caret" aria-hidden="true" />
								Paste creature markdown
							</button>
							<div
								id="pt-import-creature-markdown"
								className={`pt-import-body${showMarkdownPaste ? '' : ' is-hidden'}`}
							>
								<textarea
									value={markdownInput}
									onChange={(e) => setMarkdownInput(e.target.value)}
									placeholder="Paste creature stat block markdown here…"
									aria-label="Creature markdown input"
								/>
								<div className="pt-select-row" style={{ marginTop: '0.35rem' }}>
									<button
										type="button"
										className="pt-verb-quiet"
										onClick={handleParseMarkdown}
										disabled={!markdownInput.trim()}
									>
										Parse creatures
									</button>
									<label
										style={{
											display: 'inline-flex',
											alignItems: 'center',
											gap: '0.3rem',
											cursor: 'pointer',
										}}
									>
										<input
											type="file"
											accept=".md,.txt"
											style={{ display: 'none' }}
											onChange={handleFileUpload}
										/>
										<span className="pt-verb-quiet">Upload file</span>
									</label>
								</div>
								{error && (
									<p
										style={{
											color: 'var(--ifm-color-danger)',
											fontSize: 'var(--nexus-text-xs)',
											margin: '0.25rem 0 0',
										}}
									>
										{error}
									</p>
								)}
							</div>
							<button
								type="button"
								className={`pt-import-toggle${showJsonImport ? ' is-open' : ''}`}
								onClick={() => setShowJsonImport(!showJsonImport)}
								aria-expanded={showJsonImport}
								aria-controls="pt-import-creature-json"
							>
								<span className="pt-import-toggle__caret" aria-hidden="true" />
								Import character as JSON
							</button>
							<div
								id="pt-import-creature-json"
								className={`pt-import-body${showJsonImport ? '' : ' is-hidden'}`}
							>
								<textarea
									value={characterJsonString}
									onChange={(event) => handleCharacterUpload(event.target.value)}
									placeholder="Paste character JSON here…"
									aria-label="Character JSON import"
								/>
							</div>
						</div>
					</div>
					<div className="pt-section">
						<div className="pt-section__head">
							<span className="pt-section__step">II</span>
							<span className="pt-section__label">Selection</span>
						</div>
						<div className="pt-select-row" style={{ marginBottom: '0.4rem' }}>
							<FormControl size="small" fullWidth>
								<InputLabel>Tier</InputLabel>
								<Select
									value={String(tierFilter)}
									onChange={(event) =>
										setTierFilter(
											event.target.value === 'all'
												? 'all'
												: Number(event.target.value),
										)
									}
									input={<OutlinedInput label="Tier" />}
								>
									<MenuItem value="all">All tiers</MenuItem>
									{tiers.map((tier) => (
										<MenuItem key={tier} value={String(tier)}>
											Tier {tier}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<FormControl size="small" fullWidth>
								<InputLabel>Category</InputLabel>
								<Select
									value={categoryFilter}
									onChange={(event) => setCategoryFilter(event.target.value)}
									input={<OutlinedInput label="Category" />}
								>
									<MenuItem value="all">All categories</MenuItem>
									{categories.map((category) => (
										<MenuItem key={category} value={category}>
											{category}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</div>
						<FormControl size="small" fullWidth>
							<InputLabel>Creatures</InputLabel>
							<Select
								multiple
								value={selectedIds}
								onChange={handleSelectionChange}
								input={<OutlinedInput label="Creatures" />}
								renderValue={(selected) => `${selected.length} selected`}
								MenuProps={MenuProps}
							>
								{/* Keyed and valued by ID, never by name (D6). Two creatures
								    called Manticore are two different creatures. */}
								{menuEntries.map((entry) => (
									<MenuItem key={entry.id} value={entry.id}>
										<Checkbox checked={selectedIds.indexOf(entry.id) > -1} />
										<ListItemText
											primary={entry.creature.name}
											secondary={`T${entry.creature.tier} ${entry.creature.category}${
												entry.source === 'catalogue'
													? ''
													: ` · ${entry.source}`
											}`}
										/>
									</MenuItem>
								))}
							</Select>
						</FormControl>
						{/* No select-all and no tier-bulk selection (D9, owner Q3):
						    building an encounter is its own tool, and when it exists it
						    becomes another import source here. A "select all of tier 4"
						    button would be a worse version of it that has to be removed
						    later. `Clear` stays — undoing a selection is not the same
						    shape of job. */}
						<div className="pt-select-row">
							<button
								type="button"
								className="pt-verb-quiet"
								onClick={() => setSelectedIds([])}
							>
								Clear
							</button>
						</div>
					</div>
					<div className="pt-section">
						<div className="pt-count">
							{selectedEntries.length > 0 ? (
								<>
									{selectedEntries.length === 1
										? '1 creature'
										: `${selectedEntries.length} creatures`}{' '}
									selected → <strong>{allCards.length}</strong>{' '}
									{allCards.length === 1 ? 'card' : 'cards'} printed
									{spillPlan.continuations > 0 && (
										<>
											{' '}
											(
											{spillPlan.continuations === 1
												? '1 continuation'
												: `${spillPlan.continuations} continuations`}
											)
										</>
									)}{' '}
									· <strong>{sheetCount}</strong>{' '}
									{sheetCount === 1 ? 'sheet' : 'sheets'}
								</>
							) : (
								'No creatures selected'
							)}
							{/* Never a silent drop: a creature whose first block will not
							    fit on a card of its own used to vanish from the layout
							    without a word (F7). */}
							{spillPlan.oversize.length > 0 && (
								<div className="pt-count__warning">
									{spillPlan.oversize.length} creature
									{spillPlan.oversize.length === 1 ? '' : 's'} will not fit on a
									card even split — the stat block is over budget.
								</div>
							)}
							{catalogue.errors.length > 0 && (
								<div className="pt-count__warning">
									{catalogue.errors.length} catalogue entr
									{catalogue.errors.length === 1 ? 'y' : 'ies'} could not be
									read:{' '}
									{catalogue.errors
										.map((entry) => `${entry.name} (${entry.reason})`)
										.join(', ')}
								</div>
							)}
						</div>
						<button
							type="button"
							className="pt-print-verb"
							onClick={handlePrint}
							disabled={allCards.length === 0 || settlingCards > 0}
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
								Pick creatures from the catalogue in the controls panel to
								preview cards here.
							</p>
						}
					>
						{allCards}
					</PrintPages>
				</div>
			}
		/>
	)
}

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
import { Ability, Attack, Creature } from '@site/src/types/Creature'
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
 * How many cards a creature needs is MEASURED, not counted (M18 D3, S4).
 *
 * What stood here was a 190-line layout strategy: `getCreatureCardStrategy`
 * picked one, two or three cards by adding up the lengths of a creature's
 * skills, attacks and abilities against thresholds of 700 and 400 characters,
 * and `splitAttacks` / `splitAbilities` chunked them at 900 and 700. It was the
 * type ladder's mistake one level up — character count was no more a proxy for
 * "how many cards" than for "what size type" (F1) — and it decided the card
 * count before anything had been laid out, so a creature that fitted got two
 * cards and a creature that did not got its text clipped anyway (F4).
 *
 * The creature is now one card's worth of blocks (`creatureBlocks`), and the
 * measured spill splits it where it actually stops fitting.
 */

export const CreatureCards: React.FC = () => {
	const [markdownInput, setMarkdownInput] = useState<string>('')
	const [creatures, setCreatures] = useState<Creature[]>([])
	const [selectedCreatures, setSelectedCreatures] = useState<string[]>([])
	const [error, setError] = useState<string>('')
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>('')
	const [selectedCharacter, setSelectedCharacter] =
		React.useState<CharacterDocument | null>(null)
	const [showJsonImport, setShowJsonImport] = useState(false)
	const [showMarkdownPaste, setShowMarkdownPaste] = useState(false)

	const handleMarkdownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setMarkdownInput(event.target.value)
	}

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		setSelectedCharacter(character)
		if (character && character.companions && character.companions.length > 0) {
			// Companions have markdown field - parse that directly
			const companionMarkdown = character.companions
				.map((companion) => companion.markdown)
				.filter((md) => md && md.trim())
				.join('\n\n')

			if (companionMarkdown) {
				try {
					const parsedCreatures = parseCreatureMarkdown(companionMarkdown)
					setCreatures((prev) => {
						const existingNames = new Set(prev.map((c) => c.name))
						const newCreatures = parsedCreatures.filter(
							(c) => !existingNames.has(c.name),
						)
						return [...prev, ...newCreatures]
					})
					setSelectedCreatures((prev) => {
						const existingNames = new Set(prev)
						parsedCreatures.forEach((c) => existingNames.add(c.name))
						return Array.from(existingNames)
					})
					setError('')
				} catch (err) {
					console.error('Failed to parse companion:', err)
					setError('Failed to parse companion data. Please check the format.')
				}
			}
		}
	}

	const handleCharacterUpload = (jsonString: string) => {
		setCharacterJsonString(jsonString)
		try {
			if (jsonString.trim()) {
				const character: Character = JSON.parse(jsonString)
				if (character.companions && character.companions.length > 0) {
					const companionMarkdown = character.companions
						.map((companion) => companion.markdown)
						.filter((md) => md && md.trim())
						.join('\n\n')

					if (companionMarkdown) {
						const parsedCreatures = parseCreatureMarkdown(companionMarkdown)
						setCreatures((prev) => {
							const existingNames = new Set(prev.map((c) => c.name))
							const newCreatures = parsedCreatures.filter(
								(c) => !existingNames.has(c.name),
							)
							return [...prev, ...newCreatures]
						})
						setSelectedCreatures((prev) => {
							const existingNames = new Set(prev)
							parsedCreatures.forEach((c) => existingNames.add(c.name))
							return Array.from(existingNames)
						})
					}
				}
			}
		} catch (error) {
			console.error('Failed to parse character JSON:', error)
			setError('Failed to parse character data. Please check the JSON format.')
		}
	}

	const handleParseMarkdown = () => {
		try {
			const parsedCreatures = parseCreatureMarkdown(markdownInput)
			setCreatures(parsedCreatures)
			setSelectedCreatures(parsedCreatures.map((c) => c.name))
			setError('')
			console.warn('Successfully parsed creatures:', parsedCreatures)
		} catch (err) {
			const errorMessage = `Failed to parse markdown: ${err.message}`
			setError(errorMessage)
			setCreatures([])
			setSelectedCreatures([])
			console.error('Parse error:', err)
		}
	}

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = (e) => {
				const content = e.target?.result as string
				setMarkdownInput(content)
			}
			reader.readAsText(file)
		}
	}

	const handleCreatureSelectionChange = (
		event: SelectChangeEvent<typeof selectedCreatures>,
	) => {
		const {
			target: { value },
		} = event
		setSelectedCreatures(typeof value === 'string' ? value.split(',') : value)
	}

	const componentRef = useRef()
	// Trap 2: a print that opens before the cards have settled prints the
	// pre-fit layout, and the dialog blocks the session, so there is no second
	// chance to get it right (M18 D2).
	const settlingCards = useAutofitPending()

	const filteredCreatures = useMemo(
		() =>
			creatures.filter((creature) => selectedCreatures.includes(creature.name)),
		[creatures, selectedCreatures],
	)

	const selectAll = () =>
		setSelectedCreatures(creatures.map((creature) => creature.name))
	const deselectAll = () => setSelectedCreatures([])

	// The spill runs BEFORE pagination (M18 D3, trap 11). A creature is one
	// card's worth of blocks; a creature with more than that becomes two
	// children here, before `PrintPages` computes the grid.
	const spillPlan = useSpillPlan()
	const allCards = useMemo(
		() =>
			filteredCreatures.flatMap((creature) =>
				spillPlan
					.partsFor(creature.name)
					.map((part) => (
						<CreatureCompactCard
							key={`${creature.name}#${part.part}`}
							{...creature}
							start={part.start}
							end={part.end}
							part={part.part}
							totalParts={part.totalParts}
							onFitted={(result) =>
								spillPlan.report(creature.name, part.start, result)
							}
						/>
					)),
			),
		[filteredCreatures, spillPlan.partsFor],
	)

	// From the card and page geometry rather than a hand-written 9 — the same
	// call the preview paginates by, so the count and the pages cannot drift.
	const sheetCount = Math.ceil(
		allCards.length / itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN),
	)

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		onBeforeGetContent: whenAutofitSettled,
		// Chrome names the PDF after `document.title`, so a session's opponents
		// and a player's spell deck used to download under the same name.
		documentTitle: deckDocumentTitle({
			kind: 'creatures',
			count: allCards.length,
		}),
	})

	// A document-level rule, so it goes in the document head — never in the
	// flow, where a `<style>` printed itself on the page as text (M19).
	usePagePrintStyle('@page { size: 192mm 267mm; }')

	return (
		<>
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
									helperText="Adds the character's companion creatures to the list."
								/>
								<button
									type="button"
									className={`pt-import-toggle${showMarkdownPaste ? ' is-open' : ''}`}
									onClick={() => setShowMarkdownPaste(!showMarkdownPaste)}
									aria-expanded={showMarkdownPaste}
									aria-controls="pt-import-creature-markdown"
								>
									<span
										className="pt-import-toggle__caret"
										aria-hidden="true"
									/>
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
									<div
										className="pt-select-row"
										style={{ marginTop: '0.35rem' }}
									>
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
									<span
										className="pt-import-toggle__caret"
										aria-hidden="true"
									/>
									Import character as JSON
								</button>
								<div
									id="pt-import-creature-json"
									className={`pt-import-body${showJsonImport ? '' : ' is-hidden'}`}
								>
									<textarea
										value={characterJsonString}
										onChange={(event) =>
											handleCharacterUpload(event.target.value)
										}
										placeholder="Paste character JSON here…"
										aria-label="Character JSON import"
									/>
								</div>
							</div>
						</div>
						{creatures.length > 0 && (
							<div className="pt-section">
								<div className="pt-section__head">
									<span className="pt-section__step">II</span>
									<span className="pt-section__label">Selection</span>
								</div>
								<FormControl size="small" fullWidth>
									<InputLabel>Creatures</InputLabel>
									<Select
										multiple
										value={selectedCreatures}
										onChange={handleCreatureSelectionChange}
										input={<OutlinedInput label="Creatures" />}
										renderValue={(selected) => `${selected.length} selected`}
										MenuProps={MenuProps}
									>
										{creatures.map(({ name }) => (
											<MenuItem key={name} value={name}>
												<Checkbox
													checked={selectedCreatures.indexOf(name) > -1}
												/>
												<ListItemText primary={name} />
											</MenuItem>
										))}
									</Select>
								</FormControl>
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
						)}
						<div className="pt-section">
							<div className="pt-count">
								{allCards.length > 0 ? (
									<>
										<strong>{allCards.length}</strong>{' '}
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
									Load creatures in the controls panel to preview cards here.
								</p>
							}
						>
							{allCards}
						</PrintPages>
					</div>
				}
			/>
		</>
	)
}

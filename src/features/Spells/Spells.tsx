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
import { ArcaneSpell } from '@site/src/types/ArcaneSpell'
import { Character, CharacterDocument } from '@site/src/types/Character'
import { MysticSpell } from '@site/src/types/MysticSpell'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import {
	useAutofitPending,
	useSpillPlan,
	whenAutofitSettled,
} from '@site/src/components/autofit'
import arcaneSpellData from '../../utils/data/json/arcane-spells.json'
import mysticSpellData from '../../utils/data/json/mystic-spells.json'
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
import { SpellCard } from './SpellCard'
import './spellsStyles.css'

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

type SpellType = 'all' | 'arcane' | 'mystic'

type UnifiedSpell = {
	/**
	 * `arcane:Acid Splash`. Five spell names exist in BOTH lists — Acid Splash,
	 * Chain Lightning, Cone of Cold, Haste, True Strike — as genuinely different
	 * spells with a discipline and a tradition of their own. Selecting by name
	 * resolved both entries to whichever came first, so "Select all" printed the
	 * arcane one twice and the mystic one never (owner, 2026-08-07).
	 */
	id: string
	name: string
	type: 'arcane' | 'mystic'
	category: string // discipline or tradition
} & (ArcaneSpell | MysticSpell)

type SpellSelection = {
	id: string
	characterName?: string
}

export const Spells: React.FC = () => {
	const [selectedSpells, setSelectedSpells] = React.useState<string[]>([])
	const [selectedSpellsList, setSelectedSpellsList] = React.useState<
		SpellSelection[]
	>([])
	const [spellTypeFilter, setSpellTypeFilter] = React.useState<SpellType>('all')
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>('')
	const [_selectedCharacter, setSelectedCharacter] =
		React.useState<CharacterDocument | null>(null)
	const [showJsonImport, setShowJsonImport] = React.useState(false)

	// Combine both spell lists with type information
	const allSpells: UnifiedSpell[] = useMemo(() => {
		const arcane: UnifiedSpell[] = (arcaneSpellData as ArcaneSpell[]).map(
			(spell) => ({
				...spell,
				id: `arcane:${spell.name}`,
				type: 'arcane' as const,
				category: spell.discipline,
			}),
		)
		const mystic: UnifiedSpell[] = (mysticSpellData as MysticSpell[]).map(
			(spell) => ({
				...spell,
				id: `mystic:${spell.name}`,
				type: 'mystic' as const,
				category: spell.tradition,
			}),
		)
		return [...arcane, ...mystic].sort((a, b) => a.name.localeCompare(b.name))
	}, [])

	const availableSpells = useMemo(() => {
		if (spellTypeFilter === 'all') return allSpells
		return allSpells.filter((spell) => spell.type === spellTypeFilter)
	}, [allSpells, spellTypeFilter])

	const handleChange = (event: SelectChangeEvent<typeof selectedSpells>) => {
		const {
			target: { value },
		} = event
		const ids = typeof value === 'string' ? value.split(',') : value
		setSelectedSpells(ids)
		// Update the list to match manual selections (no character attribution)
		setSelectedSpellsList((prev) => {
			// Keep character-attributed selections
			const characterSelections = prev.filter((s) => s.characterName)
			// Add manual selections without duplicates in the manual category
			const manualSelections = ids
				.filter((id) => !prev.some((s) => s.id === id && !s.characterName))
				.map((id) => ({ id }))
			// Remove manual selections that are no longer in the selected list
			const filteredManual = prev
				.filter((s) => !s.characterName)
				.filter((s) => ids.includes(s.id))
			return [...characterSelections, ...filteredManual, ...manualSelections]
		})
	}

	const handleSpellTypeFilterChange = (event: SelectChangeEvent<SpellType>) => {
		setSpellTypeFilter(event.target.value as SpellType)
	}

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		setSelectedCharacter(character)
		if (character) {
			const characterName = character.personal.name
			// A character names its spells; the deck selects them by id. Where a
			// name exists in both lists the arcane one wins, which is what the
			// tool did before ids existed.
			const characterSpellIds = (
				character.spells?.spells?.map((spell) => spell.name) || []
			)
				.map((name) => allSpells.find((spell) => spell.name === name)?.id)
				.filter((id): id is string => Boolean(id))
			// Add character's spells to the list with character attribution
			setSelectedSpellsList((prev) => [
				...prev,
				...characterSpellIds.map((id) => ({ id, characterName })),
			])
			// Also update the selected spells for the dropdown
			setSelectedSpells((prev) => {
				const existingSpells = new Set(prev)
				characterSpellIds.forEach((id) => existingSpells.add(id))
				return Array.from(existingSpells)
			})
		}
	}

	const handleCharacterUpload = (jsonString: string) => {
		setCharacterJsonString(jsonString)
		try {
			if (jsonString.trim()) {
				const character: Character = JSON.parse(jsonString)
				const characterName = character.personal?.name || 'Uploaded Character'
				const characterSpellIds = (
					character.spells?.spells?.map((spell) => spell.name) || []
				)
					.map((name) => allSpells.find((spell) => spell.name === name)?.id)
					.filter((id): id is string => Boolean(id))
				// Add character's spells to the list with character attribution
				setSelectedSpellsList((prev) => [
					...prev,
					...characterSpellIds.map((id) => ({ id, characterName })),
				])
				// Also update the selected spells for the dropdown
				setSelectedSpells((prev) => {
					const existingSpells = new Set(prev)
					characterSpellIds.forEach((id) => existingSpells.add(id))
					return Array.from(existingSpells)
				})
			}
		} catch (error) {
			console.error('Failed to parse character JSON:', error)
		}
	}

	const componentRef = useRef()
	// Trap 2: a print that opens before the cards have settled prints the
	// pre-fit layout, and the dialog blocks the session, so there is no second
	// chance to get it right (M18 D2).
	const settlingCards = useAutofitPending()

	const filteredSpells = useMemo(() => {
		return selectedSpellsList
			.map((selection) => {
				const spell = availableSpells.find((s) => s.id === selection.id)
				if (!spell) return null
				return { ...spell, characterName: selection.characterName }
			})
			.filter((s) => s !== null) as Array<
			UnifiedSpell & { characterName?: string }
		>
	}, [availableSpells, selectedSpellsList])

	const selectAll = () => {
		setSelectedSpells(availableSpells.map((spell) => spell.id))
		// Add all spells as manual selections (no character attribution)
		setSelectedSpellsList((prev) => {
			const characterSelections = prev.filter((s) => s.characterName)
			const allSpells = availableSpells.map((spell) => ({ id: spell.id }))
			return [...characterSelections, ...allSpells]
		})
	}
	const deselectAll = () => {
		setSelectedSpells([])
		setSelectedSpellsList([])
	}

	// The spill runs BEFORE pagination (M18 D3, trap 11): a spell that becomes
	// two cards after the grid is computed lands on the wrong page and pushes
	// everything after it. `printedCards` is the final child list.
	const spillPlan = useSpillPlan()
	const printedCards = useMemo(
		() =>
			filteredSpells.flatMap((spell, index) => {
				const planKey = `${spell.id}-${spell.characterName || 'manual'}-${index}`
				return spillPlan
					.partsFor(planKey)
					.map((part) => ({ spell, planKey, part }))
			}),
		[filteredSpells, spillPlan.partsFor],
	)

	// From the card and page geometry, not a hand-written 9 — the same call the
	// preview paginates by, so the stated count and the drawn pages cannot drift.
	const sheetCount = Math.ceil(
		printedCards.length / itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN),
	)

	// One character's deck is named after them; a mixed or unattributed deck is
	// not about a person, so it is left unnamed rather than named after whoever
	// happened to be first.
	const printSubject = useMemo(() => {
		const names = new Set(
			filteredSpells
				.map((entry) => entry.characterName)
				.filter((name): name is string => Boolean(name)),
		)
		return names.size === 1 ? [...names][0] : undefined
	}, [filteredSpells])

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		onBeforeGetContent: whenAutofitSettled,
		// Chrome names the PDF after `document.title`, so without this every deck
		// this site prints lands in the download folder as "Nexus RPG".
		documentTitle: deckDocumentTitle({
			kind: 'spells',
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
				controlsLabel="Select Spells"
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
									label="Load character's spells"
									helperText="Adds the character's spells to the selection below."
								/>
								<button
									type="button"
									className={`pt-import-toggle${showJsonImport ? ' is-open' : ''}`}
									onClick={() => setShowJsonImport(!showJsonImport)}
									aria-expanded={showJsonImport}
									aria-controls="pt-import-spells"
								>
									<span
										className="pt-import-toggle__caret"
										aria-hidden="true"
									/>
									Import character as JSON
								</button>
								<div
									id="pt-import-spells"
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
						<div className="pt-section">
							<div className="pt-section__head">
								<span className="pt-section__step">II</span>
								<span className="pt-section__label">Selection</span>
							</div>
							<FormControl size="small" fullWidth sx={{ mb: 0.5 }}>
								<InputLabel>Spell Type</InputLabel>
								<Select
									value={spellTypeFilter}
									onChange={handleSpellTypeFilterChange}
									input={<OutlinedInput label="Spell Type" />}
								>
									<MenuItem value="all">All Spells</MenuItem>
									<MenuItem value="arcane">Arcane Only</MenuItem>
									<MenuItem value="mystic">Mystic Only</MenuItem>
								</Select>
							</FormControl>
							<FormControl size="small" fullWidth>
								<InputLabel>Spells</InputLabel>
								<Select
									multiple
									value={selectedSpells}
									onChange={handleChange}
									input={<OutlinedInput label="Spells" />}
									renderValue={(selected) => `${selected.length} selected`}
									MenuProps={MenuProps}
								>
									{/* Keyed and valued by ID, not by name: five spell names exist in
									    BOTH lists, and selecting by name resolved both of them to
									    whichever came first. The selection state moved to ids and this
									    menu did not, so every manual pick resolved to nothing: empty
									    preview, dead print button (owner, 2026-08-07). */}
									{availableSpells.map(({ id, name, type }) => (
										<MenuItem key={id} value={id}>
											<Checkbox checked={selectedSpells.indexOf(id) > -1} />
											<ListItemText
												primary={name}
												secondary={type === 'arcane' ? 'Arcane' : 'Mystic'}
											/>
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
						<div className="pt-section">
							<div className="pt-count">
								{filteredSpells.length === 1
									? '1 card'
									: `${filteredSpells.length} cards`}{' '}
								selected
								{/* A spill that doubles a spell's paper is stated, not
								    silent (M18 D3): a whole discipline spilling is a
								    content signal and belongs in front of the owner. */}
								{spillPlan.continuations > 0 && (
									<>
										{' '}
										→ {printedCards.length} printed (
										{spillPlan.continuations === 1
											? '1 continuation'
											: `${spillPlan.continuations} continuations`}
										)
									</>
								)}
								{filteredSpells.length > 0 && (
									<>
										{' '}
										· {sheetCount === 1 ? '1 sheet' : `${sheetCount} sheets`}
									</>
								)}
								{spillPlan.oversize.length > 0 && (
									<div className="pt-count__warning">
										{spillPlan.oversize.length} entr
										{spillPlan.oversize.length === 1 ? 'y' : 'ies'} will not fit
										on a card even split — the rules text is over budget.
									</div>
								)}
							</div>
							<button
								type="button"
								className="pt-print-verb"
								onClick={handlePrint}
								disabled={filteredSpells.length === 0 || settlingCards > 0}
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
									Select spells in the controls panel to preview them here.
								</p>
							}
						>
							{printedCards.map(({ spell, planKey, part }) => (
								<div
									key={`${planKey}#${part.part}`}
									title={
										spell.characterName
											? `For character: ${spell.characterName}`
											: undefined
									}
								>
									<SpellCard
										{...spell}
										start={part.start}
										end={part.end}
										part={part.part}
										totalParts={part.totalParts}
										onFitted={(result) =>
											spillPlan.report(planKey, part.start, result)
										}
									/>
								</div>
							))}
						</PrintPages>
					</div>
				}
			/>
		</>
	)
}

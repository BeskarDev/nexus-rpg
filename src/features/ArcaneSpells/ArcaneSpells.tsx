import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	SelectChangeEvent,
	experimental_extendTheme,
} from '@mui/material'
import { theme } from '@site/src/hooks/createTheme'
import { ArcaneSpell } from '@site/src/types/ArcaneSpell'
import { Character, CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef, useState } from 'react'
import { useReactToPrint } from 'react-to-print'
import {
	useAutofitPending,
	useSpillPlan,
	whenAutofitSettled,
} from '@site/src/components/autofit'
import arcaneSpellData from '../../utils/data/json/arcane-spells.json'
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
import { ArcaneSpellCard } from './ArcaneSpellCard'
import './arcaneSpellsStyles.css'

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

type SpellSelection = {
	name: string
	characterName?: string
}

export const ArcaneSpells: React.FC = () => {
	const customTheme = experimental_extendTheme(theme)
	const [selectedArcaneSpells, setSelectedArcaneSpells] = React.useState<
		string[]
	>([])
	const [selectedArcaneSpellsList, setSelectedArcaneSpellsList] =
		React.useState<SpellSelection[]>([])
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>('')
	const [selectedCharacter, setSelectedCharacter] =
		React.useState<CharacterDocument | null>(null)
	const [showJsonImport, setShowJsonImport] = useState(false)

	const handleChange = (
		event: SelectChangeEvent<typeof selectedArcaneSpells>,
	) => {
		const {
			target: { value },
		} = event
		const spells = typeof value === 'string' ? value.split(',') : value
		setSelectedArcaneSpells(spells)
		// Update the list to match manual selections (no character attribution)
		setSelectedArcaneSpellsList((prev) => {
			// Keep character-attributed selections
			const characterSelections = prev.filter((s) => s.characterName)
			// Add manual selections without duplicates in the manual category
			const manualSelections = spells
				.filter(
					(name) => !prev.some((s) => s.name === name && !s.characterName),
				)
				.map((name) => ({ name }))
			// Remove manual selections that are no longer in the selected list
			const filteredManual = prev
				.filter((s) => !s.characterName)
				.filter((s) => spells.includes(s.name))
			return [...characterSelections, ...filteredManual, ...manualSelections]
		})
	}

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		setSelectedCharacter(character)
		if (character) {
			const characterName = character.personal.name
			const characterSpellNames =
				character.spells?.spells?.map((spell) => spell.name) || []
			// Add character's spells to the list with character attribution
			setSelectedArcaneSpellsList((prev) => [
				...prev,
				...characterSpellNames.map((name) => ({ name, characterName })),
			])
			// Also update the selected spells for the dropdown
			setSelectedArcaneSpells((prev) => {
				const existingSpells = new Set(prev)
				characterSpellNames.forEach((name) => existingSpells.add(name))
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
				const characterSpellNames =
					character.spells?.spells?.map((spell) => spell.name) || []
				// Add character's spells to the list with character attribution
				setSelectedArcaneSpellsList((prev) => [
					...prev,
					...characterSpellNames.map((name) => ({ name, characterName })),
				])
				// Also update the selected spells for the dropdown
				setSelectedArcaneSpells((prev) => {
					const existingSpells = new Set(prev)
					characterSpellNames.forEach((name) => existingSpells.add(name))
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
	const arcaneSpells: ArcaneSpell[] = arcaneSpellData

	const filteredArcaneSpells = useMemo(() => {
		return selectedArcaneSpellsList
			.map((selection) => {
				const spell = arcaneSpells.find((s) => s.name === selection.name)
				if (!spell) return null
				return { ...spell, characterName: selection.characterName }
			})
			.filter((s) => s !== null) as Array<
			ArcaneSpell & { characterName?: string }
		>
	}, [arcaneSpells, selectedArcaneSpellsList])

	const selectAll = () => {
		setSelectedArcaneSpells(arcaneSpells.map((ca) => ca.name))
		// Add all spells as manual selections (no character attribution)
		setSelectedArcaneSpellsList((prev) => {
			const characterSelections = prev.filter((s) => s.characterName)
			const allSpells = arcaneSpells.map((spell) => ({ name: spell.name }))
			return [...characterSelections, ...allSpells]
		})
	}
	const deselectAll = () => {
		setSelectedArcaneSpells([])
		setSelectedArcaneSpellsList([])
	}

	// The spill runs BEFORE pagination (M18 D3, trap 11): a spell that becomes
	// two cards after the grid is computed lands on the wrong page and pushes
	// everything after it. `printedCards` is the final child list.
	const spillPlan = useSpillPlan()
	const printedCards = useMemo(
		() =>
			filteredArcaneSpells.flatMap((spell, index) => {
				const planKey = `${spell.name}-${spell.characterName || 'manual'}-${index}`
				return spillPlan
					.partsFor(planKey)
					.map((part) => ({ spell, planKey, part }))
			}),
		[filteredArcaneSpells, spillPlan.partsFor],
	)

	// From the card and page geometry rather than a hand-written 9 — the same
	// call the preview paginates by, so the count and the pages cannot drift.
	const sheetCount = Math.ceil(
		printedCards.length / itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN),
	)

	// One character's deck is named after them; a mixed or unattributed deck is
	// not about a person, so it is left unnamed rather than named after whoever
	// happened to be first.
	const printSubject = useMemo(() => {
		const names = new Set(
			filteredArcaneSpells
				.map((entry) => entry.characterName)
				.filter((name): name is string => Boolean(name)),
		)
		return names.size === 1 ? [...names][0] : undefined
	}, [filteredArcaneSpells])

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		onBeforeGetContent: whenAutofitSettled,
		// Chrome names the PDF after `document.title`, so without this every deck
		// this site prints lands in the download folder as "Nexus RPG".
		documentTitle: deckDocumentTitle({
			kind: 'arcane-spells',
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
						{/* Step I — Source */}
						<div className="pt-section">
							<div className="pt-section__head">
								<span className="pt-section__step">I</span>
								<span className="pt-section__label">Source</span>
							</div>
							<div className="pt-source">
								<CharacterSelector
									onCharacterSelect={handleCharacterSelect}
									label="Load character's arcane spells"
									helperText="Adds the character's arcane spells to the selection below."
								/>
								<button
									type="button"
									className={`pt-import-toggle${showJsonImport ? ' is-open' : ''}`}
									onClick={() => setShowJsonImport(!showJsonImport)}
									aria-expanded={showJsonImport}
									aria-controls="pt-import-arcane-spells"
								>
									<span
										className="pt-import-toggle__caret"
										aria-hidden="true"
									/>
									Import character as JSON
								</button>
								<div
									id="pt-import-arcane-spells"
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

						{/* Step II — Selection */}
						<div className="pt-section">
							<div className="pt-section__head">
								<span className="pt-section__step">II</span>
								<span className="pt-section__label">Selection</span>
							</div>
							<FormControl size="small" fullWidth>
								<InputLabel>Arcane Spells</InputLabel>
								<Select
									multiple
									value={selectedArcaneSpells}
									onChange={handleChange}
									input={<OutlinedInput label="Arcane Spells" />}
									renderValue={(selected) => `${selected.length} selected`}
									MenuProps={MenuProps}
								>
									{arcaneSpells.map(({ name }) => (
										<MenuItem key={name} value={name}>
											<Checkbox
												checked={selectedArcaneSpells.indexOf(name) > -1}
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

						{/* Step III — Count + verb */}
						<div className="pt-section">
							<div className="pt-count">
								{filteredArcaneSpells.length === 1
									? '1 card'
									: `${filteredArcaneSpells.length} cards`}{' '}
								selected
								{/* A spill that doubles a spell's paper is stated, not
								    silent (M18 D3). */}
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
								{filteredArcaneSpells.length > 0 && (
									<>
										{' '}
										· {sheetCount === 1 ? '1 sheet' : `${sheetCount} sheets`}
									</>
								)}
							</div>
							<button
								type="button"
								className="pt-print-verb"
								onClick={handlePrint}
								disabled={
									filteredArcaneSpells.length === 0 || settlingCards > 0
								}
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
									Select arcane spells in the controls panel to preview them
									here.
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
									<ArcaneSpellCard
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

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
import { CombatArt } from '@site/src/types/CombatArt'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import {
	useAutofitPending,
	useSpillPlan,
	whenAutofitSettled,
} from '@site/src/components/autofit'
import combatArtsData from '../../utils/data/json/combat-arts.json'
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
import { CombatArtCard } from './CombatArtCard'
import './combatArtStyles.css'

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

type CombatArtSelection = {
	name: string
	characterName?: string
}

export const CombatArts: React.FC = () => {
	const [selectedCombatArts, setSelectedCombatArts] = React.useState<string[]>(
		[],
	)
	const [selectedCombatArtsList, setSelectedCombatArtsList] = React.useState<
		CombatArtSelection[]
	>([])
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>('')
	const [selectedCharacter, setSelectedCharacter] =
		React.useState<CharacterDocument | null>(null)
	const [showJsonImport, setShowJsonImport] = React.useState(false)

	const handleChange = (
		event: SelectChangeEvent<typeof selectedCombatArts>,
	) => {
		const {
			target: { value },
		} = event
		const arts = typeof value === 'string' ? value.split(',') : value
		setSelectedCombatArts(arts)
		// Update the list to match manual selections (no character attribution)
		setSelectedCombatArtsList((prev) => {
			// Keep character-attributed selections
			const characterSelections = prev.filter((s) => s.characterName)
			// Add manual selections without duplicates in the manual category
			const manualSelections = arts
				.filter(
					(name) => !prev.some((s) => s.name === name && !s.characterName),
				)
				.map((name) => ({ name }))
			// Remove manual selections that are no longer in the selected list
			const filteredManual = prev
				.filter((s) => !s.characterName)
				.filter((s) => arts.includes(s.name))
			return [...characterSelections, ...filteredManual, ...manualSelections]
		})
	}

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		setSelectedCharacter(character)
		if (character) {
			const characterName = character.personal.name
			const characterAbilityNames =
				character.skills?.abilities?.map((ability) => ability.title) || []
			// Filter to only include abilities that exist in the combat arts data
			const validCombatArts = characterAbilityNames.filter((name) =>
				combatArts.some((ca) => ca.name === name),
			)
			// Add character's combat arts to the list with character attribution
			setSelectedCombatArtsList((prev) => [
				...prev,
				...validCombatArts.map((name) => ({ name, characterName })),
			])
			// Also update the selected arts for the dropdown
			setSelectedCombatArts((prev) => {
				const existingArts = new Set(prev)
				validCombatArts.forEach((name) => existingArts.add(name))
				return Array.from(existingArts)
			})
		}
	}

	const handleCharacterUpload = (jsonString: string) => {
		setCharacterJsonString(jsonString)
		try {
			if (jsonString.trim()) {
				const character: Character = JSON.parse(jsonString)
				const characterName = character.personal?.name || 'Uploaded Character'
				const characterAbilityNames =
					character.skills?.abilities?.map((ability) => ability.title) || []
				// Filter to only include abilities that exist in the combat arts data
				const validCombatArts = characterAbilityNames.filter((name) =>
					combatArts.some((ca) => ca.name === name),
				)
				// Add character's combat arts to the list with character attribution
				setSelectedCombatArtsList((prev) => [
					...prev,
					...validCombatArts.map((name) => ({ name, characterName })),
				])
				// Also update the selected arts for the dropdown
				setSelectedCombatArts((prev) => {
					const existingArts = new Set(prev)
					validCombatArts.forEach((name) => existingArts.add(name))
					return Array.from(existingArts)
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
	const combatArts: CombatArt[] = combatArtsData

	const filteredCombatArts = useMemo(() => {
		return selectedCombatArtsList
			.map((selection) => {
				const combatArt = combatArts.find((ca) => ca.name === selection.name)
				if (!combatArt) return null
				return { ...combatArt, characterName: selection.characterName }
			})
			.filter((ca) => ca !== null) as Array<
			CombatArt & { characterName?: string }
		>
	}, [combatArts, selectedCombatArtsList])

	const selectAll = () => {
		setSelectedCombatArts(combatArts.map((ca) => ca.name))
		// Add all combat arts as manual selections (no character attribution)
		setSelectedCombatArtsList((prev) => {
			const characterSelections = prev.filter((s) => s.characterName)
			const allArts = combatArts.map((ca) => ({ name: ca.name }))
			return [...characterSelections, ...allArts]
		})
	}
	const deselectAll = () => {
		setSelectedCombatArts([])
		setSelectedCombatArtsList([])
	}

	// From the card and page geometry rather than a hand-written 9 — the same
	// call the preview paginates by, so the count and the pages cannot drift.
	// The spill runs BEFORE pagination (M18 D3, trap 11): a card that becomes
	// two children after the grid is computed lands on the wrong page.
	// The plan is told which keys are live, so deselecting an art retires its
	// cut instead of leaving it in the continuation count (M21 D5).
	const planKeys = useMemo(
		() =>
			filteredCombatArts.map(
				(combatArt, index) =>
					`${combatArt.name}-${combatArt.characterName || 'manual'}-${index}`,
			),
		[filteredCombatArts],
	)
	const spillPlan = useSpillPlan(planKeys)
	const printedCards = useMemo(
		() =>
			filteredCombatArts.flatMap((combatArt, index) => {
				const planKey = planKeys[index]
				return spillPlan
					.partsFor(planKey)
					.map((part) => ({ combatArt, planKey, part }))
			}),
		[filteredCombatArts, planKeys, spillPlan.partsFor],
	)

	const sheetCount = Math.ceil(
		printedCards.length / itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN),
	)

	// One character's deck is named after them; a mixed or unattributed deck is
	// not about a person, so it is left unnamed rather than named after whoever
	// happened to be first.
	const printSubject = useMemo(() => {
		const names = new Set(
			filteredCombatArts
				.map((entry) => entry.characterName)
				.filter((name): name is string => Boolean(name)),
		)
		return names.size === 1 ? [...names][0] : undefined
	}, [filteredCombatArts])

	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
		onBeforeGetContent: whenAutofitSettled,
		// Chrome names the PDF after `document.title`, so without this every deck
		// this site prints lands in the download folder as "Nexus RPG".
		documentTitle: deckDocumentTitle({
			kind: 'combat-arts',
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
				controlsLabel="Select Arts"
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
									label="Load character's combat arts"
									helperText="Adds the character's combat arts to the selection below."
								/>
								<button
									type="button"
									className={`pt-import-toggle${showJsonImport ? ' is-open' : ''}`}
									onClick={() => setShowJsonImport(!showJsonImport)}
									aria-expanded={showJsonImport}
									aria-controls="pt-import-combat-arts"
								>
									<span
										className="pt-import-toggle__caret"
										aria-hidden="true"
									/>
									Import character as JSON
								</button>
								<div
									id="pt-import-combat-arts"
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
							<FormControl size="small" fullWidth>
								<InputLabel>Combat Arts</InputLabel>
								<Select
									multiple
									value={selectedCombatArts}
									onChange={handleChange}
									input={<OutlinedInput label="Combat Arts" />}
									renderValue={(selected) => `${selected.length} selected`}
									MenuProps={MenuProps}
								>
									{combatArts.map(({ name }) => (
										<MenuItem key={name} value={name}>
											<Checkbox
												checked={selectedCombatArts.indexOf(name) > -1}
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
						<div className="pt-section">
							<div className="pt-count">
								{filteredCombatArts.length === 1
									? '1 card'
									: `${filteredCombatArts.length} cards`}{' '}
								selected
								{/* A spill that doubles a card's paper is stated, not
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
								{filteredCombatArts.length > 0 && (
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
								disabled={filteredCombatArts.length === 0 || settlingCards > 0}
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
									Select combat arts in the controls panel to preview them here.
								</p>
							}
						>
							{printedCards.map(({ combatArt, planKey, part }) => (
								<div
									key={`${planKey}#${part.part}`}
									title={
										combatArt.characterName
											? `For character: ${combatArt.characterName}`
											: undefined
									}
								>
									<CombatArtCard
										{...combatArt}
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

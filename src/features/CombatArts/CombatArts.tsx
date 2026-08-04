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
import combatArtsData from '../../utils/data/json/combat-arts.json'
import {
	CARD_PAGE,
	CARD_PAGE_MARGIN,
	CARD_SIZE,
	CharacterSelector,
	itemsPerPage,
	PrintPages,
	PrintToolShell,
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
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	})
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
	const sheetCount = Math.ceil(
		filteredCombatArts.length /
			itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN),
	)

	return (
		<>
			<style type="text/css" media="print">
				{'@page { size: 192mm 267mm; }'}
			</style>
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
								disabled={filteredCombatArts.length === 0}
							>
								Print
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
							{filteredCombatArts.map((combatArt, index) => (
								<div
									key={`${combatArt.name}-${combatArt.characterName || 'manual'}-${index}`}
									title={
										combatArt.characterName
											? `For character: ${combatArt.characterName}`
											: undefined
									}
								>
									<CombatArtCard {...combatArt} />
								</div>
							))}
						</PrintPages>
					</div>
				}
			/>
		</>
	)
}

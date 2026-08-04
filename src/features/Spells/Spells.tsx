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
import arcaneSpellData from '../../utils/data/json/arcane-spells.json'
import mysticSpellData from '../../utils/data/json/mystic-spells.json'
import {
	CARD_PAGE,
	CARD_PAGE_MARGIN,
	CARD_SIZE,
	CharacterSelector,
	itemsPerPage,
	PrintPages,
	PrintToolShell,
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
	name: string
	type: 'arcane' | 'mystic'
	category: string // discipline or tradition
} & (ArcaneSpell | MysticSpell)

type SpellSelection = {
	name: string
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
				type: 'arcane' as const,
				category: spell.discipline,
			}),
		)
		const mystic: UnifiedSpell[] = (mysticSpellData as MysticSpell[]).map(
			(spell) => ({
				...spell,
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
		const spells = typeof value === 'string' ? value.split(',') : value
		setSelectedSpells(spells)
		// Update the list to match manual selections (no character attribution)
		setSelectedSpellsList((prev) => {
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

	const handleSpellTypeFilterChange = (event: SelectChangeEvent<SpellType>) => {
		setSpellTypeFilter(event.target.value as SpellType)
	}

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		setSelectedCharacter(character)
		if (character) {
			const characterName = character.personal.name
			const characterSpellNames =
				character.spells?.spells?.map((spell) => spell.name) || []
			// Add character's spells to the list with character attribution
			setSelectedSpellsList((prev) => [
				...prev,
				...characterSpellNames.map((name) => ({ name, characterName })),
			])
			// Also update the selected spells for the dropdown
			setSelectedSpells((prev) => {
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
				setSelectedSpellsList((prev) => [
					...prev,
					...characterSpellNames.map((name) => ({ name, characterName })),
				])
				// Also update the selected spells for the dropdown
				setSelectedSpells((prev) => {
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
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	})

	const filteredSpells = useMemo(() => {
		return selectedSpellsList
			.map((selection) => {
				const spell = availableSpells.find((s) => s.name === selection.name)
				if (!spell) return null
				return { ...spell, characterName: selection.characterName }
			})
			.filter((s) => s !== null) as Array<
			UnifiedSpell & { characterName?: string }
		>
	}, [availableSpells, selectedSpellsList])

	const selectAll = () => {
		setSelectedSpells(availableSpells.map((spell) => spell.name))
		// Add all spells as manual selections (no character attribution)
		setSelectedSpellsList((prev) => {
			const characterSelections = prev.filter((s) => s.characterName)
			const allSpells = availableSpells.map((spell) => ({ name: spell.name }))
			return [...characterSelections, ...allSpells]
		})
	}
	const deselectAll = () => {
		setSelectedSpells([])
		setSelectedSpellsList([])
	}

	// From the card and page geometry, not a hand-written 9 — the same call the
	// preview paginates by, so the stated count and the drawn pages cannot drift.
	const sheetCount = Math.ceil(
		filteredSpells.length /
			itemsPerPage(CARD_PAGE, CARD_SIZE, CARD_PAGE_MARGIN),
	)

	return (
		<>
			<style type="text/css" media="print">
				{'@page { size: 192mm 267mm; }'}
			</style>
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
									{availableSpells.map(({ name, type }) => (
										<MenuItem key={name} value={name}>
											<Checkbox checked={selectedSpells.indexOf(name) > -1} />
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
								{filteredSpells.length > 0 && (
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
								disabled={filteredSpells.length === 0}
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
									Select spells in the controls panel to preview them here.
								</p>
							}
						>
							{filteredSpells.map((spell, index) => (
								<div
									key={`${spell.name}-${spell.characterName || 'manual'}-${index}`}
									title={
										spell.characterName
											? `For character: ${spell.characterName}`
											: undefined
									}
								>
									<SpellCard {...spell} />
								</div>
							))}
						</PrintPages>
					</div>
				}
			/>
		</>
	)
}

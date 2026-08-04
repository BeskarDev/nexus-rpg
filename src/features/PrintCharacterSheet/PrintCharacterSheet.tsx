import { Box } from '@mui/material'
import { Character, CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import {
	CharacterSelector,
	itemsPerPage,
	PrintPages,
	PrintToolShell,
	SHEET_PAGE,
	SHEET_PAGE_MARGIN,
	SHEET_SECTION,
} from '../PrintingTools'
import { emptyCharacter } from './assets/emptyCharacter'
import './printCharacterSheetStyles.css'
import { StatisticsSheet } from './sheets/1_Statistics'
import { EquipmentSheet } from './sheets/2_Equipment'
import { SpellsSheet } from './sheets/3_Spells'
import { PersonalSheet } from './sheets/4_Personal'

/** The four sections, in print order. Named once so the stated count, the
 *  preview and the printed output all come from the same list. */
const SHEETS = [
	{ key: 'statistics', Sheet: StatisticsSheet },
	{ key: 'equipment', Sheet: EquipmentSheet },
	{ key: 'spells', Sheet: SpellsSheet },
	{ key: 'personal', Sheet: PersonalSheet },
] as const

const sheetPageCount = Math.ceil(
	SHEETS.length / itemsPerPage(SHEET_PAGE, SHEET_SECTION, SHEET_PAGE_MARGIN),
)

export const PrintCharacterSheet: React.FC = () => {
	const [characterJsonString, setCharacterJsonString] =
		React.useState<string>(emptyCharacter)
	const [selectedCharacter, setSelectedCharacter] =
		React.useState<CharacterDocument | null>(null)
	const [showJsonImport, setShowJsonImport] = React.useState(false)

	const char: Character = useMemo(() => {
		try {
			// Prioritize selected character from Firebase
			if (selectedCharacter) {
				return selectedCharacter as Character
			}
			// Fall back to JSON string
			return characterJsonString
				? (JSON.parse(characterJsonString) as Character)
				: undefined
		} catch (e) {
			console.error(e)
			return undefined
		}
	}, [characterJsonString, selectedCharacter])

	const handleCharacterSelect = (character: CharacterDocument | null) => {
		setSelectedCharacter(character)
	}

	const handleCharacterUpload = (jsonString: string) => {
		setCharacterJsonString(jsonString)
		// Clear selected character when JSON is pasted
		if (jsonString.trim() && jsonString !== emptyCharacter) {
			setSelectedCharacter(null)
		}
	}

	const componentRef = useRef()
	const handlePrint = useReactToPrint({
		documentTitle: char?.personal.name + '-character-sheet',
		content: () => componentRef.current,
	})

	return (
		<Box>
			<style type="text/css" media="print">
				{'@page { size: 267mm 192mm; }'}
			</style>
			<PrintToolShell
				controlsLabel="Select Character"
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
									label="Select character to print"
									helperText="Choose a character from your account to load all their data."
								/>
								<button
									type="button"
									className={`pt-import-toggle${showJsonImport ? ' is-open' : ''}`}
									onClick={() => setShowJsonImport(!showJsonImport)}
									aria-expanded={showJsonImport}
									aria-controls="pt-import-character-sheet"
								>
									<span
										className="pt-import-toggle__caret"
										aria-hidden="true"
									/>
									Import character as JSON
								</button>
								<div
									id="pt-import-character-sheet"
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
							<div className="pt-count">
								{char ? (
									<>
										<strong>
											{char.personal?.name || 'Unnamed character'}
										</strong>{' '}
										— {SHEETS.length} sheets, {sheetPageCount}{' '}
										{sheetPageCount === 1 ? 'page' : 'pages'}
									</>
								) : (
									'No character selected'
								)}
							</div>
							<button
								type="button"
								className="pt-print-verb"
								onClick={handlePrint}
								disabled={!char}
							>
								Print character sheet
							</button>
						</div>
					</>
				}
				preview={
					<Box ref={componentRef}>
						<PrintPages
							page={SHEET_PAGE}
							item={SHEET_SECTION}
							margin={SHEET_PAGE_MARGIN}
							empty={
								<p className="pt-empty">
									Select a character in the controls panel to preview their
									sheet here.
								</p>
							}
						>
							{char
								? SHEETS.map(({ key, Sheet }) => (
										<Sheet key={key} char={char} />
									))
								: []}
						</PrintPages>
					</Box>
				}
			/>
		</Box>
	)
}

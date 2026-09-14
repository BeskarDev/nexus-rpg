import { Box } from '@mui/material'
import { Character, CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import {
	CharacterSelector,
	itemsPerPage,
	PrintPages,
	PrintToolShell,
	usePagePrintStyle,
	sheetDocumentTitle,
	SHEET_PAGE,
	SHEET_PAGE_MARGIN,
	SHEET_SECTION,
} from '../PrintingTools'
import { emptyCharacter } from './assets/emptyCharacter'
import './printCharacterSheetStyles.css'
import { CHARACTER_SHEETS as SHEETS } from './sheets/sheetSections'

/*
 * The page, at A4 landscape and full bleed (M17 D0, D1).
 *
 * The print target is fixed — Chrome, "Print to PDF", margins: none — so the
 * declared size IS the PDF's page size at 1:1 and there is no hardware margin
 * to design around. That is what lets the page be the real A4 landscape
 * (297 × 210mm) and each sheet an exact A5 half (148.5 × 210mm): two sheets
 * tile the page with nothing left over and the fold is the page centre.
 *
 * The nonstandard 267 × 192mm at 0.5mm margins this replaces was sized to
 * survive an unknown printer's unprintable edge. There is no unknown printer.
 *
 * Full bleed is safe because the CONTENT is not: `SheetLayout` keeps the frame
 * inset from the trim, so a PDF later run through a home printer loses white
 * margin and never a rule or a glyph.
 */
const PAGE_CSS = `
	@page { size: A4 landscape; margin: 0; }
`

const sheetPageCount = Math.ceil(
	SHEETS.length / itemsPerPage(SHEET_PAGE, SHEET_SECTION, SHEET_PAGE_MARGIN),
)

export const PrintCharacterSheet: React.FC = () => {
	usePagePrintStyle(PAGE_CSS)

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
		// It read `undefined-character-sheet` with no character loaded, and a
		// blank sheet printed for the table is a real use.
		documentTitle: sheetDocumentTitle(char?.personal.name),
		content: () => componentRef.current,
	})

	return (
		<Box>
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
							/* Nothing here is cut. The page IS the artifact, kept whole or
							   folded once down its centre, and the fold guide is the paper's
							   own edge. Trim marks belong to the card tools, where a page
							   holds many items that really do get separated. */
							cutMarks={false}
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

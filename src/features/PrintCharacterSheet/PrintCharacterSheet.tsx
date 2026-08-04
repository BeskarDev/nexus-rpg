import { Box } from '@mui/material'
import { Character, CharacterDocument } from '@site/src/types/Character'
import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { CharacterSelector, PrintToolShell } from '../PrintingTools'
import { emptyCharacter } from './assets/emptyCharacter'
import './printCharacterSheetStyles.css'
import { StatisticsSheet } from './sheets/1_Statistics'
import { EquipmentSheet } from './sheets/2_Equipment'
import { SpellsSheet } from './sheets/3_Spells'
import { PersonalSheet } from './sheets/4_Personal'

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
								>
									<span className="pt-import-toggle__caret" aria-hidden="true" />
									Import character as JSON
								</button>
								<div className={`pt-import-body${showJsonImport ? "" : " is-hidden"}`}>
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
										<strong>{char.personal?.name || 'Unnamed character'}</strong>{' '}
										— 4 sheets, 2 pages
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
					<Box>
						{Boolean(char) ? (
							<Box sx={{ display: 'flex', flexWrap: 'wrap' }} ref={componentRef}>
								<StatisticsSheet char={char} />
								<EquipmentSheet char={char} />
								<SpellsSheet char={char} />
								<PersonalSheet char={char} />
							</Box>
						) : (
							<p className="pt-empty">
								Select a character in the controls panel to preview their sheet here.
							</p>
						)}
					</Box>
				}
			/>
		</Box>
	)
}


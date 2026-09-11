import React, { useMemo, useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import {
	PrintPages,
	PrintToolShell,
	SHEET_PAGE,
	SHEET_PAGE_MARGIN,
	SHEET_SECTION,
	itemsPerPage,
	usePagePrintStyle,
} from '../PrintingTools'
import './combatReferenceStyles.css'
import { CombatSheet } from './sheets/1_Combat'
import { ConditionsSheet } from './sheets/2_Conditions'

/**
 * THE COMBAT QUICK REFERENCE, BUILT FROM THE RULES (2026-09-11)
 * =============================================================
 *
 * It was a PNG exported from Figma, appended to the Combat Scenes page inside a
 * `<details>`, and it could not be updated by anyone who was not holding the
 * Figma file. So it had not been: it rolled Hide and Distract on Cunning, a
 * skill the game renamed to Stealth; it gave Dash +1 Movement where the rules
 * double it; it let a critical hit break a weapon, which the rules do not; and
 * it was two conditions short.
 *
 * This tool prints the same sheet from the same JSON the docs pages are
 * generated from, so the drift has nowhere to open up.
 *
 * ## ONE PAGE. That is the specification (owner, 2026-09-11)
 *
 * The image put the whole reference on a single A4 landscape page: two halves,
 * two columns each, four columns across the spread. The first build of this tool
 * read that image as two pages and gave each half a single column, which spent
 * two sheets of paper on the same words — rejected, rightly.
 *
 * So the geometry is the character sheet's (`SHEET_PAGE` A4 landscape, two
 * `SHEET_SECTION` halves) with TWO sheets in it, and each half flows its content
 * down two columns. The type size is then whatever the fuller half can carry,
 * found by measuring the rendered page rather than by eye.
 *
 * ## The design constraint that follows from the page count
 *
 * "Explanation texts need to be very brief" (owner). The turn half is BRIEFS —
 * `quickRef` fields written beside the full rules text they compress — and the
 * conditions half is full length, because a condition is read mid-turn to settle
 * what a player may do, and a paraphrase is the wrong thing to hand someone at
 * that moment.
 */

const PAGE_CSS = `
	@page { size: A4 landscape; margin: 0; }
`

export const CombatReference: React.FC = () => {
	usePagePrintStyle(PAGE_CSS)

	const sheets = useMemo(
		() => [<CombatSheet key="combat" />, <ConditionsSheet key="conditions" />],
		[],
	)

	const pageCount = Math.ceil(
		sheets.length / itemsPerPage(SHEET_PAGE, SHEET_SECTION, SHEET_PAGE_MARGIN),
	)

	const componentRef = useRef<HTMLDivElement>(null)
	const handlePrint = useReactToPrint({
		documentTitle: 'nexus-combat-reference',
		content: () => componentRef.current,
	})

	return (
		<PrintToolShell
			controlsLabel="Sheets"
			previewLabel="Preview"
			controls={
				<>
					<div className="pt-section">
						<div className="pt-count">
							{sheets.length} halves on {pageCount}{' '}
							{pageCount === 1 ? 'page' : 'pages'}, A4 landscape
						</div>
						<button
							type="button"
							className="pt-print-verb"
							onClick={handlePrint}
						>
							Print combat reference
						</button>
					</div>
				</>
			}
			preview={
				<div ref={componentRef}>
					<PrintPages
						page={SHEET_PAGE}
						item={SHEET_SECTION}
						margin={SHEET_PAGE_MARGIN}
						/* Nothing here is cut. The page IS the artifact — it is kept whole
						   on the table or folded once down its centre — and a fold needs no
						   guide, because the paper's own edges are the guide. Ticks around
						   a page nobody trims just print ink on it. */
						cutMarks={false}
					>
						{sheets}
					</PrintPages>
				</div>
			}
		/>
	)
}

import { Box, BoxProps } from '@mui/material'
import { SheetFrame, SheetCrest, SHEET_CONTENT_INSET_MM } from './SheetFrame'

/**
 * One printed page of the character sheet: **148.5 × 210mm, an exact A5 half**,
 * four to an A4 landscape sheet, folded (M17 D1).
 *
 * This grew from 133 × 191mm. That number was not derived from the fold — it was
 * sized to survive an unknown printer's unprintable edge, and M16 froze it as
 * inviolable for exactly that reason. The print target is now fixed (Chrome →
 * Print to PDF, margins none, M17 D0), so there is no unknown printer and no
 * edge: two sheets tile the A4 landscape page with nothing left over.
 *
 * ## The frame is the sheet's own, not a card's (owner review)
 *
 * M16 dressed the page in `CardFrame keystone="sheet"` — the four diamond corner
 * rails and cartouche keystone the theme gives a content card in the rules docs.
 * That was the fastest way to make the print carry the codex, and the owner's
 * objection to it is right: the character sheet is not a card inside a chapter,
 * it is the artifact, and it was wearing borrowed clothes.
 *
 * `SheetFrame` replaces it with a surround drawn for this page and nothing else —
 * two hairline keylines with a braid rail running between them on all four edges,
 * a lotus where it turns each corner, and a crest naming which of the four sheets
 * this is. See that file for why the run is line and only the five focal points
 * carry mass, and for why it is drawn at 1:1 rather than through the kit's tiled
 * machinery.
 *
 * ## Two problems the new frame simply removes
 *
 * The old keystone hung ABOVE the frame's top edge, and the section is exactly
 * the printable height, so its overhang had to be bought out of the top margin
 * (`KEYSTONE_CLEARANCE`, 4.5mm against 2mm on the other three sides). Get that
 * wrong and the cartouche is amputated at the section boundary — the M16 clipping
 * bug, which was "fixed" once with `overflow: hidden` and had to be fixed again
 * properly.
 *
 * The new crest sits ON the top register, inside the sheet. Nothing overhangs, so
 * there is no clearance to buy, no asymmetric margin, and nothing to clip. The
 * inset is uniform on all four sides and the page is symmetrical for the first
 * time.
 */

/**
 * Where the content starts, measured from the trim.
 *
 * IMPORTED from `SheetFrame` rather than restated. The frame is drawn in absolute
 * millimetres, so if the register's thickness moves this has to move with it and
 * there is no layout system that will catch the mismatch. It moved twice — once
 * when the register went from one course to three, and again when pass 4 replaced
 * those three courses of mass with line and gave 3.5mm per side back (+7mm of
 * content in each dimension). Both times a hand-kept copy of the number was the
 * thing that had to be remembered.
 */
const CONTENT_INSET = `${SHEET_CONTENT_INSET_MM}mm`

export const SheetLayout: React.FC<BoxProps & { crest: SheetCrest }> = ({
	children,
	crest,
	...props
}) => {
	return (
		<Box
			{...props}
			className="pc-sheet"
			sx={{
				position: 'relative',
				height: '210mm',
				width: '148.5mm',
				backgroundColor: 'white',
				display: 'flex',
				// Deliberately NOT `overflow: hidden`. Clipping here is what hid the
				// sizing bug rather than solving it, and it would hide the next one
				// just as quietly.
				...props.sx,
			}}
		>
			{/* The surround spans the whole sheet at 1:1, so it sits under the content
				rather than around it — which is what lets the register run edge to edge
				without the content box having to reserve a border. */}
			<SheetFrame crest={crest} />
			<Box
				sx={{
					position: 'relative',
					p: CONTENT_INSET,
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					gap: '2mm',
					minHeight: 0,
					minWidth: 0,
				}}
			>
				{children}
			</Box>
		</Box>
	)
}

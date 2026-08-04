import { Box, BoxProps } from '@mui/material'
import { CardFrame } from '@site/src/components/codex/ornaments'

/**
 * One printed page of the character sheet: 133 × 191mm, four to a landscape
 * sheet, folded. **Those dimensions do not move** (M16 constraint 1) — so
 * anything that needs room, such as the keystone's overhang, has to take it out
 * of the inner margins. See `KEYSTONE_CLEARANCE`.
 *
 * ## The codex frame (M16 S3.5, owner review)
 *
 * The first pass drew a plain keyline here and argued that ornament costs ink
 * for nothing. The owner's correction: the print must carry the codex as fully
 * as the screen does, in black and white.
 *
 * So the page takes `CardFrame keystone="sheet"` — the cartouche keystone and
 * matching corner rails that M9 gave the character sheet — and `.pc-sheet`
 * rebinds the theme's colour variables to ink, which turns every ornament,
 * sigil and die polygon inside it black on white without a print-only copy of
 * any of them.
 */
/**
 * Head room the cartouche keystone needs above the inner frame's top border.
 *
 * `.cartoucheKeystone` sits at `top: -15.75px`, and 15.75px is 4.17mm at the
 * CSS 96dpi that print also uses. The section is EXACTLY the printable height —
 * `@page` is 267 × 192mm at 0.5mm margins, so two 133 × 191mm sections fill it
 * with nothing to spare — which means that clearance has to come out of the top
 * margin. There is no slack anywhere else to borrow it from.
 *
 * With the uniform `2mm` this used to carry, the ornament stuck 2.17mm out of
 * the section and off the page. That was "fixed" with `overflow: hidden`, which
 * does not fix it: it amputates the keystone at the section boundary and prints
 * a half cartouche. Give it the room instead.
 */
const KEYSTONE_CLEARANCE = '4.5mm'

export const SheetLayout: React.FC<BoxProps> = ({ children, ...props }) => {
	return (
		<Box
			{...props}
			className="pc-sheet"
			sx={{
				height: '191mm',
				width: '133mm',
				backgroundColor: 'white',
				display: 'flex',
				// Deliberately NOT `overflow: hidden`. Clipping here is what hid the
				// sizing bug rather than solving it, and it would hide the next one
				// just as quietly.
				...props.sx,
			}}
		>
			<Box
				sx={{
					position: 'relative',
					m: '2mm',
					mt: KEYSTONE_CLEARANCE,
					p: '3mm',
					flexGrow: 1,
					border: 'var(--pc-rule-frame) solid var(--pc-ink)',
					backgroundColor: 'white',
					display: 'flex',
					flexDirection: 'column',
					gap: '2mm',
					minHeight: 0,
				}}
			>
				<CardFrame keystone="sheet" />
				{children}
			</Box>
		</Box>
	)
}

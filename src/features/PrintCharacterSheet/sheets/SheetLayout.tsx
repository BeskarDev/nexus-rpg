import { Box, BoxProps } from '@mui/material'
import { CardFrame } from '@site/src/components/codex/ornaments'

/**
 * One printed page of the character sheet: 133 × 191mm, four to a landscape
 * sheet, folded. **Those dimensions do not move** (M16 constraint 1).
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
				...props.sx,
			}}
		>
			<Box
				sx={{
					position: 'relative',
					m: '2mm',
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

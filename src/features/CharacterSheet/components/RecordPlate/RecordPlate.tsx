import React from 'react'
import { Box, Typography } from '@mui/material'
import type { SxProps, Theme } from '@mui/material'
import StatSigil from '@site/src/components/codex/StatSigil'
import type {
	SheetSigilName,
	StatSigilName,
} from '@site/src/components/codex/stat-sigils'

/**
 * The record plate — an entity's numeric facts as an inscribed ledger, one fact
 * per line (M13 S4d, second attempt at the details panel).
 *
 * ## What this replaces, and why the first attempt was not enough
 *
 * The details panel showed seven numeric facts as seven labelled BOXES laid out
 * in wrapping rows: cost, load, amount, quality, location, uses, durability. The
 * first pass at fixing it washed the groups and marked the headings, which helped
 * navigation and left the fundamental problem in place — the panel was still a
 * form, and a form is a shape this theme does not have. Every other numeric
 * surface on the sheet reads as a LEDGER: mark, name, value, one per line, values
 * in a column. The purse band, the ledger rows, the creature stat block's figure
 * rows. This is that shape, applied to one item.
 *
 * Concretely, per row: the fact's **mark**, its **name** in the small-caps label
 * register, and its **value** flush right in a column with every other value. The
 * control is bare at rest and takes its slot on hover, which is the judgement
 * every read-mostly field on this sheet now follows.
 *
 * The gain over seven boxes is not only density. A column of right-aligned
 * figures can be scanned as a column — "what does this cost, what does it weigh"
 * is one downward glance instead of seven separate readings — and the marks make
 * a row findable without reading its name.
 *
 * Deliberately NOT a table element: rows appear and disappear (a slot only
 * applies to worn equipment, mount info only to a mount), and a `<table>` with
 * conditional rows is markup that fights the data.
 */
export interface RecordPlateProps {
	children: React.ReactNode
	/** A caption over the plate — omit when the surrounding panel already names it. */
	label?: string
	/**
	 * Controls that act on the RECORD as a whole — quick-ref, delete.
	 *
	 * They ride in the caption line rather than in a strip along the bottom of the
	 * panel (S4d, owner review). A trailing strip is where a FORM puts its submit
	 * button, and it left the two controls floating in the panel's corner attached to
	 * nothing. Here they sit with the heading of the thing they act on: this is the
	 * item's record, and these are the things you do to it.
	 */
	actions?: React.ReactNode
	sx?: SxProps<Theme>
}

export const RecordPlate: React.FC<RecordPlateProps> = ({
	children,
	label,
	actions,
	sx,
}) => (
	<Box
		className="cs-record-plate"
		sx={{ display: 'flex', flexDirection: 'column', ...sx }}
	>
		{(label || actions) && (
			<Box className="cs-record-plate__head">
				<Typography component="div" className="cs-record-plate__caption">
					{label}
				</Typography>
				{actions && (
					/* The levelled control strip from S3 — the same stamped plates a section
						header wears, so a record's controls and a section's are one register. */
					<Box
						className="cs-section-actions"
						sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
					>
						{actions}
					</Box>
				)}
			</Box>
		)}
		{children}
	</Box>
)

export interface RecordRowProps {
	/** The fact's mark. A row without one still aligns; it just reads slower. */
	sigil?: StatSigilName | SheetSigilName
	label: string
	/** The value or its control — a bare field, a select, a pip row. */
	children: React.ReactNode
	/**
	 * Open a new section of the plate above this row, with a heavier course.
	 *
	 * The plate's facts are not one flat list: some describe what the item IS
	 * (quality, load, cost, amount) and some describe THIS copy of it (where it is,
	 * how worn it is). One heavier rule marks that break, which is the ledger's own
	 * device rather than a second heading — the rows are already named, and a
	 * sub-caption inside a plate of eight lines is more chrome than the split needs.
	 */
	section?: boolean
}

export const RecordRow: React.FC<RecordRowProps> = ({
	sigil,
	label,
	children,
	section,
}) => (
	<Box
		className={
			section ? 'cs-record-row cs-record-row--section' : 'cs-record-row'
		}
	>
		<Typography component="span" className="cs-record-row__label">
			{sigil && <StatSigil name={sigil} size={13} />}
			{label}
		</Typography>
		<Box className="cs-record-row__value">{children}</Box>
	</Box>
)

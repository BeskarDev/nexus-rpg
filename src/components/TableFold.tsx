import React, { useId, useState } from 'react'

export interface TableFoldProps {
	/** What is inside — a culture's syllables, a treasure type's details. */
	label: string
	/** How many rows it holds, so the reader can price opening it. */
	rows?: number
	children: React.ReactNode
}

/**
 * The dice-by-hand fallback (M14 S3, D5).
 *
 * ## Why the data folds
 *
 * A random-table page carries two things that were printed as one: the RULES for
 * using the oracle, which a human reads, and the DATA it rolls on, which a machine
 * picks from. The Names page opened with the two tables a GM actually reads — an
 * 8-row naming pattern and a 6-row family pattern — and then printed **1,266 rows
 * of syllables** beneath them. The reading matter was 0.6% of the page.
 *
 * So the data goes behind this, and the fold says what it is for: rolling by hand,
 * away from a screen. The oracle above it is the instrument; this is the paper
 * copy in case the laptop is shut.
 *
 * ## Rendered and hidden, never unmounted
 *
 * The panel keeps its markup and takes the `hidden` attribute. That is the codex
 * rule for every disclosure on this site, and it has two consequences that matter
 * more here than anywhere else: the table stays in the **static HTML**, so the
 * site search can still find `Shar-` and a browser's find-in-page still works, and
 * it stays in the **printed** page, which is the whole point of a fallback for
 * people away from a screen.
 */
const TableFold: React.FC<TableFoldProps> = ({ label, rows, children }) => {
	const [open, setOpen] = useState(false)
	const panelId = useId()

	return (
		<div className={`table-fold${open ? ' is-open' : ''}`}>
			<button
				type="button"
				className="table-fold__summary"
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen((previous) => !previous)}
			>
				<span className="table-fold__caret" aria-hidden="true" />
				<span className="table-fold__label">{label}</span>
				{rows !== undefined && (
					<span className="table-fold__count">
						{rows} {rows === 1 ? 'row' : 'rows'}
					</span>
				)}
			</button>
			<div className="table-fold__panel" id={panelId} hidden={!open}>
				{children}
			</div>
		</div>
	)
}

export default TableFold

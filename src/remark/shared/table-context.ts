/**
 * Table-structure awareness for the remark plugins.
 *
 * The plugins previously guessed "is this a table header?" from a crude proxy
 * (single-word cell with one child). That both missed multi-word headers
 * (e.g. "AV (light / heavy)", "Weapon Damage") and wrongly skipped legitimate
 * single-word body cells. This reads the actual mdast structure instead:
 *
 *   table > tableRow > tableCell > (text ...)
 *
 * The header is unambiguously the first tableRow (`table.children[0]`).
 *
 * See docs/analysis/keyword-chip-detection-plan.md (Phase 2).
 */

import { Parent } from 'unist'

export interface TableCellContext {
	/** The text node is inside a tableCell. */
	inTableCell: boolean
	/** The cell belongs to the header row (first row of the table). */
	isHeaderRow: boolean
	/** Zero-based column index of the cell, or -1 if unknown. */
	columnIndex: number
	/** Trimmed text of the header cell for this column, or '' if unknown. */
	columnHeader: string
}

const NOT_IN_CELL: TableCellContext = {
	inTableCell: false,
	isHeaderRow: false,
	columnIndex: -1,
	columnHeader: '',
}

/** Concatenates the plain text of a node subtree (header cells are shallow). */
function textOf(node: any): string {
	if (!node) return ''
	if (typeof node.value === 'string') return node.value
	if (Array.isArray(node.children)) {
		return node.children.map(textOf).join('')
	}
	return ''
}

/**
 * Derives table context for a text node from its ancestor chain (as provided
 * by `visitParents`). Returns structural facts only — no policy.
 */
export function getTableCellContext(
	ancestors: (Parent & { type: string })[],
): TableCellContext {
	// Walk from the nearest ancestor outward to find the enclosing cell/row/table.
	let cell: any = null
	let row: any = null
	let table: any = null

	for (let k = ancestors.length - 1; k >= 0; k--) {
		const a = ancestors[k] as any
		if (!cell && a.type === 'tableCell') cell = a
		else if (cell && !row && a.type === 'tableRow') row = a
		else if (row && !table && a.type === 'table') {
			table = a
			break
		}
	}

	if (!cell || !row || !table) {
		return NOT_IN_CELL
	}

	const isHeaderRow = table.children?.[0] === row
	const columnIndex = row.children ? row.children.indexOf(cell) : -1

	let columnHeader = ''
	const headerRow = table.children?.[0]
	if (columnIndex >= 0 && headerRow?.children?.[columnIndex]) {
		columnHeader = textOf(headerRow.children[columnIndex]).trim()
	}

	return { inTableCell: true, isHeaderRow, columnIndex, columnHeader }
}

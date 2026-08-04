import { RollDie } from './codex/RollDie'
import React, { useState, useMemo } from 'react'

interface RollableTableProps {
	children: React.ReactNode
	/**
	 * Roll ONE die for the whole row instead of one die per column.
	 *
	 * **Per column is the default and the common case.** Most multi-column tables
	 * here are several generators printed side by side — Shape, Head Attribute,
	 * Body Attribute, Adaption — and the whole point is to mix them, so that a
	 * Shape meets another row's Adaption. Rolling those as a row just reads the
	 * table back to the reader.
	 *
	 * Set `singleRoll` only when the later columns DESCRIBE the first: a curse and
	 * its effect, a disposition and its modifier, a result and the penance it
	 * demands. There, pairing row 1's name with row 7's effect is nonsense.
	 *
	 * The tie-breaker is `AutoRoller/generators.ts`, which must agree with the
	 * hand-rolled table on the same page: a table the roller draws with one
	 * `pick()` over whole objects is `singleRoll`; one it assembles from several
	 * `pickField()` calls is not.
	 */
	singleRoll?: boolean
	/**
	 * The table is ONE list laid out as two columns, not two columns of results.
	 *
	 * `generate-random-tables.ts`'s `paired` rendering splits a list of 2N entries
	 * into N rows of two, purely so a 40-entry list is not 40 rows long — and the
	 * roller draws from the flat list with a single `pick()`. So the answer is one
	 * cell out of 2N, reached by rolling d2N: the first N land in column one, the
	 * rest in column two.
	 *
	 * Without this the table rolled its two columns independently and handed back
	 * two unrelated items when the reader wanted one.
	 */
	paired?: boolean
}

/*
 * A press of the die resolves one of three ways:
 *
 * - per column (default) — one die per column; the columns are separate
 *   generators and the point is to mix them.
 * - whole row (`singleRoll`) — one die; the later columns describe the first.
 * - one CELL — a `d66` grid (d6 row × d6 column) or a `paired` list (d2N over
 *   the flat list). Neither was representable before, and both were broken.
 */

interface TableRow {
	range: [number, number] // Inclusive
	values: Record<string, string>
	/** Index of this row among the tbody's `tr` children.
	 *
	 * NOT the same as the index in `rows`: a `tr` whose first cell does not parse
	 * as a die range, or that is short a column, is skipped during parsing but is
	 * still rendered. Highlighting by `rows` index therefore lights up the wrong
	 * line on any table carrying a spanning or note row. */
	domIndex: number
}

interface RollResults {
	/** `roll` is the figure to SHOW, so a d66 can print "34" rather than 3 and 4. */
	[header: string]: { value: string; roll: string }
}

/** Rendered `tr` index → the `td` indices within it that the die landed on. */
type RolledCells = Map<number, Set<number>>

const RollableTable: React.FC<RollableTableProps> = ({
	children,
	singleRoll = false,
	paired = false,
}) => {
	const [results, setResults] = useState<RollResults>({})
	const [rolledCells, setRolledCells] = useState<RolledCells>(new Map())

	const { dieSize, headers, rows, isD66 } = useMemo(() => {
		let dieSize = 0
		let isD66 = false
		const headers: string[] = []
		const rows: TableRow[] = []

		const table = React.Children.only(children) as React.ReactElement

		const getText = (node: React.ReactNode): string => {
			if (!React.isValidElement(node)) return String(node ?? '')
			const child = node.props.children
			if (typeof child === 'string') return child
			if (Array.isArray(child)) return child.map(getText).join('')
			if (React.isValidElement(child)) return getText(child)
			return typeof child === 'string' ? child : ''
		}

		const parseRange = (text: string): [number | null, number | null] => {
			const trimmed = text.replace(/\s+/g, '')
			if (/^\d+$/.test(trimmed)) {
				const n = parseInt(trimmed, 10)
				return [n, n]
			}
			const match = trimmed.match(/^(\d+)-(\d+)$/)
			if (match) {
				const a = parseInt(match[1], 10)
				const b = parseInt(match[2], 10)
				return [a, b]
			}
			return [null, null]
		}

		const thead = React.Children.toArray(table.props.children).find(
			(child) => React.isValidElement(child) && child.type === 'thead',
		) as React.ReactElement | undefined

		const headerRow = thead
			? (React.Children.toArray(thead.props.children).find(
					(c) => React.isValidElement(c) && c.type === 'tr',
				) as React.ReactElement | undefined)
			: undefined

		const ths = headerRow
			? (React.Children.toArray(headerRow.props.children).filter(
					(cell) => React.isValidElement(cell) && cell.type === 'th',
				) as React.ReactElement[])
			: []

		ths.forEach((th, i) => {
			const text = getText(th).trim()
			if (i === 0) {
				// `d66` is TWO d6 read as tens-and-units, not a 66-sided die. Taken
				// literally by the `/d(\d+)/` below it gave `dieSize = 66` on a table
				// with six rows, so 60 of every 66 presses matched no row and every
				// column came back "—". Every quest and terrain table is one of these.
				if (/^d66$/i.test(text)) {
					isD66 = true
					dieSize = 6
				} else {
					const match = text.match(/d(\d+)/i)
					if (match) dieSize = parseInt(match[1], 10)
				}
			} else {
				headers.push(text)
			}
		})

		const tbody = React.Children.toArray(table.props.children).find(
			(child) => React.isValidElement(child) && child.type === 'tbody',
		) as React.ReactElement | undefined

		const rowElems = tbody
			? (React.Children.toArray(tbody.props.children).filter(
					(r) => React.isValidElement(r) && r.type === 'tr',
				) as React.ReactElement[])
			: []

		rowElems.forEach((row, domIndex) => {
			const tds = React.Children.toArray(row.props.children).filter(
				(c) => React.isValidElement(c) && c.type === 'td',
			) as React.ReactElement[]

			if (tds.length < headers.length + 1) return

			const rangeText = getText(tds[0]).trim()
			const [from, to] = parseRange(rangeText)
			if (from === null || to === null) return

			const values: Record<string, string> = {}
			for (let i = 0; i < headers.length; i++) {
				const header = headers[i]
				const cellIndex = i + 1
				values[header] =
					cellIndex < tds.length ? getText(tds[cellIndex]).trim() : '—'
			}

			rows.push({ range: [from, to], values, domIndex })
		})

		return { dieSize, headers, rows, isD66 }
	}, [children])

	/**
	 * What to call a single-cell answer, since its column heading is a coordinate
	 * rather than a name: `1`…`6` on a d66 grid, and a layout suffix on a paired
	 * list ("Everyday Object 1" is not a different thing from "Everyday Object 2").
	 */
	const label = useMemo(() => {
		if (paired && headers.length > 0)
			return headers[0].replace(/\s*\d+$/, '').trim() || 'Result'
		return 'Result'
	}, [paired, headers])

	const handleRoll = () => {
		if (dieSize <= 0 || rows.length === 0) return
		const next: RollResults = {}
		const cells: RolledCells = new Map()

		/** Light one cell. Column 0 is the die-range cell, so a header at index
		 *  `i` is column `i + 1`. */
		const mark = (domIndex: number, column: number) => {
			const set = cells.get(domIndex) ?? new Set<number>()
			set.add(column)
			cells.set(domIndex, set)
		}

		const d = (sides: number) => Math.floor(Math.random() * sides) + 1

		if (isD66) {
			// Two d6: the first picks the row, the second the column. One cell.
			const rowDie = d(6)
			const colDie = d(Math.min(6, headers.length))
			const found = rows.find(
				({ range }) => rowDie >= range[0] && rowDie <= range[1],
			)
			const header = headers[colDie - 1]
			next[label] = {
				roll: `${rowDie}${colDie}`,
				value: found?.values[header] ?? '—',
			}
			if (found) {
				mark(found.domIndex, colDie)
				mark(found.domIndex, 0)
			}
		} else if (paired) {
			// One list of 2N shown as N rows of two. Roll d2N over the flat list: the
			// first N are column one, the rest column two.
			const perColumn = rows.length
			const roll = d(perColumn * 2)
			const column = roll > perColumn ? 2 : 1
			const rowNumber = roll > perColumn ? roll - perColumn : roll
			const found = rows.find(
				({ range }) => rowNumber >= range[0] && rowNumber <= range[1],
			)
			const header = headers[column - 1]
			next[label] = {
				roll: String(roll),
				value: found?.values[header] ?? '—',
			}
			if (found) {
				mark(found.domIndex, column)
				mark(found.domIndex, 0)
			}
		} else if (singleRoll) {
			// One roll drives every column, so the whole row is the answer.
			const roll = d(dieSize)
			const found = rows.find(
				({ range }) => roll >= range[0] && roll <= range[1],
			)
			headers.forEach((header, i) => {
				const value = found?.values[header] ?? '—'
				next[header] = { roll: String(roll), value }
				if (found) mark(found.domIndex, i + 1)
			})
			if (found) mark(found.domIndex, 0)
		} else {
			// Each column rolls its own die, so the columns land on DIFFERENT rows.
			// Only the cell that was actually drawn may light up — washing the whole
			// `tr` (as this did for one commit) claims every column hit that row.
			headers.forEach((header, i) => {
				const roll = d(dieSize)
				const found = rows.find(
					({ range }) => roll >= range[0] && roll <= range[1],
				)
				next[header] = {
					roll: String(roll),
					value: found?.values[header] ?? '—',
				}
				if (found) {
					mark(found.domIndex, i + 1)
					// The range cell too, so the reader can see which number was drawn.
					mark(found.domIndex, 0)
				}
			})
		}

		setResults(next)
		setRolledCells(cells)
	}

	/** Clone the table tree, tagging the individual `td`s the die landed on with
	 *  `data-rolled` for the bronze wash. */
	const tableWithHighlights = useMemo(() => {
		if (rolledCells.size === 0) return children

		const table = React.Children.only(children) as React.ReactElement

		const cloneRowCells = (
			row: React.ReactElement,
			columns: Set<number>,
		): React.ReactElement => {
			let cellIdx = 0
			const newCells = React.Children.map(row.props.children, (cell) => {
				if (React.isValidElement(cell) && cell.type === 'td') {
					const column = cellIdx++
					if (columns.has(column)) {
						return React.cloneElement(
							cell as React.ReactElement<Record<string, unknown>>,
							{ 'data-rolled': true },
						)
					}
				}
				return cell
			})
			return React.cloneElement(row, {}, newCells)
		}

		const cloneBodyRows = (tbody: React.ReactElement): React.ReactElement => {
			let rowIdx = 0
			const newChildren = React.Children.map(tbody.props.children, (child) => {
				if (React.isValidElement(child) && child.type === 'tr') {
					// Counted over `tr` children only — the same index space the parse
					// pass records as `domIndex`.
					const columns = rolledCells.get(rowIdx++)
					if (columns)
						return cloneRowCells(child as React.ReactElement, columns)
				}
				return child
			})
			return React.cloneElement(tbody, {}, newChildren)
		}

		const newTableChildren = React.Children.map(
			table.props.children,
			(child) => {
				if (React.isValidElement(child) && child.type === 'tbody') {
					return cloneBodyRows(child as React.ReactElement)
				}
				return child
			},
		)

		return React.cloneElement(table, {}, newTableChildren)
	}, [children, rolledCells])

	return (
		<div style={{ marginBottom: '1.5rem' }}>
			{/* 1) Render the table; rolled rows get data-rolled for the bronze-wash CSS */}
			<div className="rollable-table">{tableWithHighlights}</div>
			{/* 2) The roll die. It was `<Button variant="outlined">🎲</Button>` — a
				Material button carrying a platform EMOJI, which renders as a different
				die on every operating system, on a site with a drawn sigil set and a
				drawn die two files away (M14, owner review). */}
			<RollDie label="Roll on this table" onRoll={handleRoll} />

			{/* 3) Space for showing results */}
			{Object.keys(results).length > 0 && (
				<div className="rollable-result">
					{Object.entries(results).map(([header, { value, roll }]) => (
						<p key={header} className="rollable-result__line">
							<strong>
								{header} ({roll}):
							</strong>{' '}
							{value}
						</p>
					))}
				</div>
			)}
		</div>
	)
}

export default RollableTable

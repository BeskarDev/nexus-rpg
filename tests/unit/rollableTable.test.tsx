import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import RollableTable from '@site/src/components/RollableTable'

/**
 * The four ways a press of the die resolves.
 *
 * All four failures these cover were SILENT: the table rendered, the button
 * worked, and the answer was wrong or blank. A `d66` grid returned "—" for 60
 * of every 66 presses because `d66` was read as a 66-sided die; a `paired` list
 * handed back two unrelated items when the reader wanted one; the per-column
 * mode washed whole rows as if every column had hit the same one.
 */

beforeEach(() => {
	// `RollDie` asks for `prefers-reduced-motion` before it settles, and jsdom
	// ships no `matchMedia`. Answering "reduce" also makes the die deterministic:
	// it draws its own display face once and calls back, instead of tumbling
	// through an unknown number of faces on a timer.
	vi.stubGlobal(
		'matchMedia',
		vi.fn(() => ({
			matches: true,
			addEventListener() {},
			removeEventListener() {},
		})),
	)
})

afterEach(() => {
	vi.restoreAllMocks()
	vi.unstubAllGlobals()
})

/** `Math.random()` value that makes `d(sides)` come up `wanted`. */
const face = (wanted: number, sides: number) => (wanted - 1) / sides + 1e-9

/**
 * Press the die with the table's rolls forced to `faces`.
 *
 * The first draw is spent by `RollDie` on the numeral it shows, before it calls
 * back — so it is queued here rather than left for a test to remember.
 */
const pressWith = (...faces: number[]) => {
	const queue = [0, ...faces]
	vi.spyOn(Math, 'random').mockImplementation(() => {
		const next = queue.shift()
		if (next === undefined) throw new Error('the test ran out of rolls')
		return next
	})
	fireEvent.click(screen.getByRole('button'))
}

const results = () =>
	Array.from(document.querySelectorAll('.rollable-result__line')).map((p) =>
		p.textContent?.replace(/\s+/g, ' ').trim(),
	)

const litCells = () =>
	Array.from(document.querySelectorAll('td[data-rolled]')).map(
		(td) => td.textContent,
	)

/** A d66 grid: six rows, six columns, 36 cells — the quest/terrain shape. */
const D66Grid = (props: Record<string, unknown>) => (
	<RollableTable {...props}>
		<table>
			<thead>
				<tr>
					{['d66', '1', '2', '3', '4', '5', '6'].map((h) => (
						<th key={h}>{h}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{[1, 2, 3, 4, 5, 6].map((r) => (
					<tr key={r}>
						<td>
							<strong>{String(r)}</strong>
						</td>
						{[1, 2, 3, 4, 5, 6].map((c) => (
							<td key={c}>{`cell-${r}${c}`}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</RollableTable>
)

/** A paired list: one list of 8, laid out as 4 rows of two. */
const PairedList = (props: Record<string, unknown>) => (
	<RollableTable {...props}>
		<table>
			<thead>
				<tr>
					<th>d4</th>
					<th>Thing 1</th>
					<th>Thing 2</th>
				</tr>
			</thead>
			<tbody>
				{[1, 2, 3, 4].map((r) => (
					<tr key={r}>
						<td>{String(r)}</td>
						<td>{`first-${r}`}</td>
						<td>{`second-${r}`}</td>
					</tr>
				))}
			</tbody>
		</table>
	</RollableTable>
)

/** Two independent generators side by side — the common shape. */
const TwoAxes = (props: Record<string, unknown>) => (
	<RollableTable {...props}>
		<table>
			<thead>
				<tr>
					<th>d4</th>
					<th>Shape</th>
					<th>Adaption</th>
				</tr>
			</thead>
			<tbody>
				{[1, 2, 3, 4].map((r) => (
					<tr key={r}>
						<td>{String(r)}</td>
						<td>{`shape-${r}`}</td>
						<td>{`adaption-${r}`}</td>
					</tr>
				))}
			</tbody>
		</table>
	</RollableTable>
)

describe('RollableTable — d66 grid', () => {
	it('rolls d6 for the row and d6 for the column, giving ONE cell', () => {
		render(<D66Grid />)
		pressWith(face(3, 6), face(4, 6))

		expect(results()).toEqual(['Result (34): cell-34'])
		expect(litCells()).toEqual(['3', 'cell-34'])
	})

	it('never returns a blank: every face of both dice lands on a cell', () => {
		render(<D66Grid />)
		for (let row = 1; row <= 6; row++) {
			for (let column = 1; column <= 6; column++) {
				pressWith(face(row, 6), face(column, 6))
				expect(results()).toEqual([
					`Result (${row}${column}): cell-${row}${column}`,
				])
			}
		}
	})
})

describe('RollableTable — paired list', () => {
	it('rolls d2N over the flat list; the low half is column one', () => {
		render(<PairedList paired />)
		pressWith(face(3, 8))
		expect(results()).toEqual(['Thing (3): first-3'])
		expect(litCells()).toEqual(['3', 'first-3'])
	})

	it('the high half is column two, offset by the column height', () => {
		render(<PairedList paired />)
		pressWith(face(7, 8))
		// 7 is the 3rd entry of the second column, so it sits on ROW 3.
		expect(results()).toEqual(['Thing (7): second-3'])
		expect(litCells()).toEqual(['3', 'second-3'])
	})

	it('reaches every one of the 2N entries', () => {
		render(<PairedList paired />)
		const seen = new Set<string>()
		for (let roll = 1; roll <= 8; roll++) {
			pressWith(face(roll, 8))
			seen.add(results()[0]!.replace(/^.*: /, ''))
		}
		expect(seen.size).toBe(8)
	})
})

describe('RollableTable — per column (the default)', () => {
	it('rolls each column separately and lights only the drawn cells', () => {
		render(<TwoAxes />)
		pressWith(face(2, 4), face(4, 4))

		expect(results()).toEqual([
			'Shape (2): shape-2',
			'Adaption (4): adaption-4',
		])
		// Two DIFFERENT rows, and only the cell drawn from each — never the whole
		// `tr`, which would claim both columns hit the same row.
		expect(litCells()).toEqual(['2', 'shape-2', '4', 'adaption-4'])
	})
})

describe('RollableTable — singleRoll', () => {
	it('rolls once and takes the whole row', () => {
		render(<TwoAxes singleRoll />)
		pressWith(face(3, 4))

		expect(results()).toEqual([
			'Shape (3): shape-3',
			'Adaption (3): adaption-3',
		])
		expect(litCells()).toEqual(['3', 'shape-3', 'adaption-3'])
	})
})

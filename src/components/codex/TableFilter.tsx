import React, { useEffect, useId, useRef, useState } from 'react'
import styles from './TableFilter.module.css'
import { Cartouche } from './ornaments'

export interface TableFilterProps {
	/** Header cell to match against, exactly as the table writes it. */
	column: string
	/** The values offered, comma-separated. */
	options: string
	/** The control's own label. Defaults to the column name. */
	label?: string
	/** The markdown table. */
	children: React.ReactNode
}

/**
 * A markdown table with a filter bar over one of its columns (M22, owner
 * review).
 *
 * The archetype overview used to answer "what kind of character do I want to
 * be?" with a role-grouped index ABOVE a 25-row table — the same 25 archetypes
 * listed twice, on one page. One table that can be narrowed to a role answers
 * both questions with one surface.
 *
 * ## How it filters
 *
 * The rows are markdown, so they carry links, chips and keyword links like any
 * other table, and the component never reads or rewrites their content: it finds
 * the column by its header text and hides the rows whose cell does not contain
 * the chosen value. A role written `Tank / Striker` therefore answers to both
 * filters, which is the behaviour a reader expects and a data model would have
 * had to encode.
 *
 * **Every row is in the static HTML, and filtering happens after hydration.**
 * Nothing is removed from the DOM, so search indexing and a no-JS reader both
 * see the whole table.
 */
export default function TableFilter({
	column,
	options,
	label,
	children,
}: TableFilterProps) {
	const values = options
		.split(',')
		.map((v) => v.trim())
		.filter(Boolean)
	const [active, setActive] = useState<string | null>(null)
	const [count, setCount] = useState<{ shown: number; total: number } | null>(
		null,
	)
	const wrapper = useRef<HTMLDivElement>(null)
	const statusId = useId()

	useEffect(() => {
		const table = wrapper.current?.querySelector('table')
		if (!table) return
		const headers = Array.from(table.querySelectorAll('thead th'))
		const index = headers.findIndex(
			(th) => th.textContent?.trim().toLowerCase() === column.toLowerCase(),
		)
		// A column that is not there is a generator fault, not a reader's problem:
		// leave every row visible rather than hiding the table behind a control
		// that cannot work.
		if (index === -1) return

		const rows = Array.from(table.querySelectorAll('tbody tr'))
		let shown = 0
		for (const row of rows) {
			// `row.children[index]`, not `row.cells[index]`: the lint env has no DOM
			// table interfaces, and the child list is the same cells in the same order.
			const cell = row.children[index]
			const match =
				!active ||
				(cell?.textContent ?? '').toLowerCase().includes(active.toLowerCase())
			;(row as HTMLElement).hidden = !match
			if (match) shown++
		}
		setCount({ shown, total: rows.length })
	}, [active, column, children])

	return (
		<div className={styles.filtered} ref={wrapper}>
			<div className={styles.bar}>
				<Cartouche compact>{label ?? column}</Cartouche>
				<div
					className={styles.options}
					role="group"
					aria-label={`Filter by ${column}`}
				>
					<button
						type="button"
						className={`${styles.option}${active === null ? ' ' + styles.optionOn : ''}`}
						aria-pressed={active === null}
						onClick={() => setActive(null)}
					>
						All
					</button>
					{values.map((value) => (
						<button
							key={value}
							type="button"
							className={`${styles.option}${active === value ? ' ' + styles.optionOn : ''}`}
							aria-pressed={active === value}
							onClick={() => setActive(active === value ? null : value)}
						>
							{value}
						</button>
					))}
				</div>
				<span className={styles.count} id={statusId} role="status">
					{count && active ? `${count.shown} of ${count.total}` : null}
				</span>
			</div>
			{children}
		</div>
	)
}

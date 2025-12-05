import { Button, Typography } from '@mui/material'
import React, { useState, useMemo } from 'react'

interface RollableTableProps {
	children: React.ReactNode
	singleRoll?: boolean // If true, roll once and apply to all columns; if false, roll each column independently
}

interface TableRow {
	range: [number, number] // Inclusive
	values: Record<string, string>
}

interface RollResults {
	[header: string]: { value: string; roll: number }
}

const RollableTable: React.FC<RollableTableProps> = ({ children, singleRoll = false }) => {
	const [results, setResults] = useState<RollResults>({})

	const { dieSize, headers, rows } = useMemo(() => {
		let dieSize = 0
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
				const match = text.match(/d(\d+)/i)
				if (match) dieSize = parseInt(match[1], 10)
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

		rowElems.forEach((row) => {
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
				values[header] = cellIndex < tds.length ? getText(tds[cellIndex]).trim() : '—'
			}

			rows.push({ range: [from, to], values })
		})

		return { dieSize, headers, rows }
	}, [children])

	const handleRoll = () => {
		if (dieSize <= 0 || rows.length === 0) return
		const next: RollResults = {}

		if (singleRoll) {
			// Roll once for all columns
			const roll = Math.floor(Math.random() * dieSize) + 1
			const found = rows.find(
				({ range }) => roll >= range[0] && roll <= range[1],
			)
			headers.forEach((header) => {
				const value = found?.values[header] ?? '—'
				next[header] = { roll, value }
			})
		} else {
			// Roll each column independently (original behavior)
			headers.forEach((header) => {
				const roll = Math.floor(Math.random() * dieSize) + 1
				const found = rows.find(
					({ range }) => roll >= range[0] && roll <= range[1],
				)
				const value = found?.values[header] ?? '—'
				next[header] = { roll, value }
			})
		}

		setResults(next)
	}

	return (
		<div style={{ marginBottom: '1.5rem' }}>
			{/* 1) Render the original table unchanged */}
			<div>{children}</div>

			{/* 2) “Roll” button */}
			<Button variant="outlined" onClick={handleRoll}>
				🎲
			</Button>

			{/* 3) Space for showing results */}
			{Object.keys(results).length > 0 && (
				<div
					style={{
						marginTop: '0.75rem',
						padding: '0.75rem',
						border: '1px dashed #ccc',
						borderRadius: '4px',
					}}
				>
					{Object.entries(results).map(([header, { value, roll }]) => (
						<Typography
							variant="body2"
							key={header}
							style={{ marginBottom: '0.3rem' }}
						>
							<strong>
								{header} ({roll}):
							</strong>{' '}
							{value}
						</Typography>
					))}
				</div>
			)}
		</div>
	)
}

export default RollableTable

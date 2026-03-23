import React, { useState, useMemo } from 'react'
import { glossary, type GlossaryEntry } from '@site/src/config/glossary'

function GlossaryItem({ entry }: { entry: GlossaryEntry }) {
	return (
		<div
			style={{
				marginBottom: '0.75rem',
				paddingBottom: '0.75rem',
				borderBottom: '1px solid var(--ifm-color-emphasis-200)',
			}}
		>
			<div
				style={{
					display: 'flex',
					alignItems: 'baseline',
					flexWrap: 'wrap',
					gap: '0.5rem',
				}}
			>
				<a href={entry.link}>
					<strong style={{ fontSize: '1.05rem' }}>{entry.term}</strong>
				</a>
				<span
					style={{
						fontSize: '0.8rem',
						color: 'var(--ifm-color-emphasis-600)',
						fontStyle: 'italic',
					}}
				>
					({entry.origin})
				</span>
			</div>
			<div style={{ marginTop: '0.25rem' }}>{entry.summary}</div>
		</div>
	)
}

export default function Glossary(): React.JSX.Element {
	const [filter, setFilter] = useState('')

	const sorted = useMemo(
		() =>
			[...glossary].sort((a, b) =>
				a.term.localeCompare(b.term, undefined, { sensitivity: 'base' })
			),
		[]
	)

	const filtered = useMemo(() => {
		if (!filter) return sorted
		const lower = filter.toLowerCase()
		return sorted.filter(
			(e) =>
				e.term.toLowerCase().includes(lower) ||
				e.summary.toLowerCase().includes(lower) ||
				e.origin.toLowerCase().includes(lower)
		)
	}, [filter, sorted])

	const grouped = useMemo(() => {
		const map: Record<string, GlossaryEntry[]> = {}
		for (const entry of filtered) {
			const letter = entry.term[0].toUpperCase()
			if (!map[letter]) map[letter] = []
			map[letter].push(entry)
		}
		return map
	}, [filtered])

	const letters = Object.keys(grouped).sort()

	return (
		<div>
			<input
				type="text"
				placeholder="Filter glossary…"
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				style={{
					width: '100%',
					padding: '0.5rem 0.75rem',
					marginBottom: '1.5rem',
					border: '1px solid var(--ifm-color-emphasis-300)',
					borderRadius: '4px',
					fontSize: '1rem',
					backgroundColor: 'var(--ifm-background-color)',
					color: 'var(--ifm-font-color-base)',
				}}
			/>

			{letters.length === 0 && (
				<p style={{ color: 'var(--ifm-color-emphasis-600)' }}>
					No matching terms found.
				</p>
			)}

			{letters.map((letter) => (
				<div key={letter} style={{ marginBottom: '1.5rem' }}>
					<h3
						id={`glossary-${letter.toLowerCase()}`}
						style={{
							borderBottom: '2px solid var(--ifm-color-primary)',
							paddingBottom: '0.25rem',
							marginBottom: '0.75rem',
						}}
					>
						{letter}
					</h3>
					{grouped[letter].map((entry) => (
						<GlossaryItem key={entry.term} entry={entry} />
					))}
				</div>
			))}
		</div>
	)
}

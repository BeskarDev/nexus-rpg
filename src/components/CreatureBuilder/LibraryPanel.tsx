import React, { useState } from 'react'

/** Minimum shape every library entry must satisfy. */
export interface BaseEntry {
	id: string
	name: string
	description: string
	tags: string[]
	forTypes?: string[]
}

interface LibraryPanelProps<T extends BaseEntry> {
	entries: T[]
	/** Creature's current type — entries whose forTypes includes this value are
	 *  visually highlighted as good fits. */
	activeType?: string
	onAdd: (entry: T) => void
	/** Render the type- or action-specific metadata line below the name. */
	renderMeta: (entry: T) => React.ReactNode
}

/**
 * A reusable compact library browser (M16).
 *
 * Provides a search box and tag chips to filter a list of library entries,
 * then lets the user click "Add" to append one to the creature being built.
 * Generic over T so both attacks and abilities keep their specific fields.
 */
export function LibraryPanel<T extends BaseEntry>({
	entries,
	activeType,
	onAdd,
	renderMeta,
}: LibraryPanelProps<T>) {
	const [search, setSearch] = useState('')
	const [activeTag, setActiveTag] = useState<string | null>(null)

	const allTags = Array.from(new Set(entries.flatMap((e) => e.tags))).sort()

	const filtered = entries.filter((e) => {
		const q = search.toLowerCase()
		const matchesSearch =
			!q ||
			e.name.toLowerCase().includes(q) ||
			e.description.toLowerCase().includes(q) ||
			e.tags.some((t) => t.includes(q))
		const matchesTag = !activeTag || e.tags.includes(activeTag)
		return matchesSearch && matchesTag
	})

	return (
		<div className="cb-library">
			<div className="cb-library__filters">
				<div className="cb-search">
					<span className="cb-search__mark" aria-hidden="true">
						⌕
					</span>
					<input
						className="cb-search__input"
						value={search}
						placeholder="Search…"
						aria-label="Search library"
						onChange={(e) => setSearch(e.target.value)}
					/>
					{search && (
						<button
							type="button"
							className="cb-search__clear"
							onClick={() => setSearch('')}
							aria-label="Clear search"
						>
							×
						</button>
					)}
				</div>

				{allTags.length > 0 && (
					<div className="cb-library__tags">
						{allTags.map((tag) => (
							<button
								key={tag}
								type="button"
								className="cb-chip"
								aria-pressed={activeTag === tag}
								onClick={() => setActiveTag(activeTag === tag ? null : tag)}
							>
								{tag}
							</button>
						))}
					</div>
				)}
			</div>

			<div className="cb-library__entries">
				{filtered.length === 0 ? (
					<div className="cb-empty">No entries match.</div>
				) : (
					filtered.map((entry) => {
						const isGoodFit = activeType && entry.forTypes?.includes(activeType)
						return (
							<div
								key={entry.id}
								className={`cb-library__entry${isGoodFit ? ' cb-library__entry--fit' : ''}`}
							>
								<div className="cb-library__entry-info">
									<div className="cb-library__entry-name">{entry.name}</div>
									<div className="cb-library__entry-meta">
										{renderMeta(entry)}
									</div>
									<div className="cb-library__entry-desc">
										{entry.description}
									</div>
								</div>
								<button
									type="button"
									className="cb-entry__add"
									onClick={() => onAdd(entry)}
								>
									Add
								</button>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}

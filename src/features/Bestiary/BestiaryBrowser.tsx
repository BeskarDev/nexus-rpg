import React, { useEffect, useId, useMemo, useRef, useState } from 'react'
import creatureIndexJson from '@site/src/utils/data/generated/creature-index.json'
import type {
	CreatureIndex,
	CreatureIndexEntry,
} from '@site/src/types/CreatureIndex'
import { splitAv, splitHp } from '@site/src/components/codex/creatureStats'
import SigilIcon, { type SigilName } from '@site/src/components/codex/SigilIcon'
import StatSigil from '@site/src/components/codex/StatSigil'
import type { StatSigilName } from '@site/src/components/codex/stat-sigils'
import { CreatureDetail } from './CreatureDetail'
import { EncounterPanel } from './EncounterPanel'
import {
	EMPTY_ENCOUNTER,
	Encounter,
	SavedEncounter,
	addMember,
	decodeEncounter,
	encodeEncounter,
	keyedRoster,
	loadSaved,
	saveEncounter,
	writeSaved,
} from './encounter'
import { CIRCUMSTANCES } from './threat'
import {
	BestiaryFacets,
	BestiaryFilters,
	DEFAULT_FILTERS,
	PAGE_SIZES,
	SortKey,
	TIER_MAX,
	TIER_MIN,
	buildFacets,
	decodeFilters,
	encodeFilters,
	filterCreatures,
	isFiltered,
	paginate,
	sortCreatures,
} from './bestiaryFilters'
import styles from './BestiaryBrowser.module.css'

const { creatures } = creatureIndexJson as CreatureIndex
const CIRCUMSTANCE_IDS = CIRCUMSTANCES.map((c) => c.id)

/** Columns that can be sorted, with the label and the class that hides them. */
const COLUMNS: {
	key: SortKey
	label: string
	/** Dropped on a phone, where the stat block carries the same value. */
	secondary?: boolean
	/** Dropped earlier than that: the four attribute dice are the widest block. */
	tertiary?: boolean
	numeric?: boolean
	/**
	 * The stat's own mark, for the five columns that have one.
	 *
	 * Taken from `stat-sigils.ts` rather than drawn here, so a Parry column and a
	 * Parry figure on a stat block carry the same glyph — the header reads as the
	 * same stat a GM already knows from the card.
	 */
	glyph?: StatSigilName
}[] = [
	{ key: 'name', label: 'Name' },
	{ key: 'tier', label: 'Tier', numeric: true },
	{ key: 'category', label: 'Rank' },
	{ key: 'role', label: 'Role', secondary: true },
	{ key: 'type', label: 'Type', secondary: true },
	{ key: 'hp', label: 'HP', numeric: true, glyph: 'hp' },
	{ key: 'av', label: 'AV', numeric: true, secondary: true, glyph: 'av' },
	// The defenses a GM aims at, and the dice a creature rolls. Both are things
	// you want BEFORE deciding to open a stat block, which is why they are
	// columns rather than detail.
	{
		key: 'parry',
		label: 'Parry',
		numeric: true,
		secondary: true,
		glyph: 'parry',
	},
	{
		key: 'dodge',
		label: 'Dodge',
		numeric: true,
		secondary: true,
		glyph: 'dodge',
	},
	{
		key: 'resist',
		label: 'Resist',
		numeric: true,
		secondary: true,
		glyph: 'resist',
	},
	{ key: 'str', label: 'STR', numeric: true, tertiary: true },
	{ key: 'agi', label: 'AGI', numeric: true, tertiary: true },
	{ key: 'spi', label: 'SPI', numeric: true, tertiary: true },
	{ key: 'mnd', label: 'MND', numeric: true, tertiary: true },
]

/** Sortable columns plus the add button's own, which sorts nothing. */
const COLUMN_COUNT = COLUMNS.length + 1

/** The classes that drop a column at a width, shared by its header and cells. */
const columnClass = (column: { secondary?: boolean; tertiary?: boolean }) =>
	[column.secondary && styles.secondary, column.tertiary && styles.tertiary]
		.filter(Boolean)
		.join(' ') || undefined

/** Every tier the game defines, for the tier menu's two selects. */
const TIERS = Array.from(
	{ length: TIER_MAX - TIER_MIN + 1 },
	(_, i) => TIER_MIN + i,
)

/**
 * The facet menus, in the order a GM narrows: what KIND of fight first, then
 * where it happens.
 */
const FACET_MENUS: {
	label: string
	facet: keyof BestiaryFacets
	key: 'categories' | 'roles' | 'types' | 'sizes' | 'regions' | 'sites'
	glyph: SigilName
}[] = [
	// One mark per facet, so a collapsed bar is readable as a row of things
	// rather than a row of words: a standard for rank, a blade for the part a
	// creature plays in a fight, a paw for what they are, scales for how big,
	// mountains for the land and a temple for the place.
	{ label: 'Rank', facet: 'categories', key: 'categories', glyph: 'standard' },
	{ label: 'Role', facet: 'roles', key: 'roles', glyph: 'khopesh' },
	{ label: 'Type', facet: 'types', key: 'types', glyph: 'paw' },
	{ label: 'Size', facet: 'sizes', key: 'sizes', glyph: 'scales' },
	{ label: 'Region', facet: 'regions', key: 'regions', glyph: 'mountains' },
	{ label: 'Site', facet: 'sites', key: 'sites', glyph: 'temple' },
]

/**
 * A filter button that opens its options in a panel.
 *
 * Laid out flat, seven facets cost more vertical space than the table they
 * filter — the roster's own environment terms alone run to two lines of chips.
 * Collapsed, the bar states what is narrowing the list (the count rides on the
 * button) without spending the page on options nobody is currently choosing.
 *
 * It is a DISCLOSURE, not a `role="menu"`. A menu owes the full arrow-key
 * contract and its items are commands; these are toggles that stay open while
 * a GM ticks three of them, which is what a disclosure of buttons already
 * describes honestly.
 */
const FilterMenu: React.FC<{
	label: string
	glyph: SigilName
	/** The count or range shown on the button when the facet is narrowing. */
	summary?: string
	children: React.ReactNode
}> = ({ label, glyph, summary, children }) => {
	const [open, setOpen] = useState(false)
	const panelId = useId()
	const wrapper = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!open) return
		const onPointerDown = (event: PointerEvent) => {
			if (!wrapper.current?.contains(event.target as Node)) setOpen(false)
		}
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return
			setOpen(false)
			// Focus goes back to the button that opened the panel, or it lands on
			// the document and a keyboard user restarts from the top of the page.
			wrapper.current?.querySelector('button')?.focus()
		}
		document.addEventListener('pointerdown', onPointerDown)
		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('pointerdown', onPointerDown)
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [open])

	return (
		<div className={styles.menu} ref={wrapper}>
			<button
				type="button"
				className={styles.menuButton}
				aria-expanded={open}
				aria-controls={open ? panelId : undefined}
				data-active={summary ? 'true' : undefined}
				onClick={() => setOpen((current) => !current)}
			>
				<SigilIcon name={glyph} size={12} className={styles.menuGlyph} />
				{label}
				{summary && <span className={styles.menuCount}>{summary}</span>}
				<span aria-hidden="true" className={styles.menuCaret}>
					▾
				</span>
			</button>
			{open && (
				<div className={styles.menuPanel} id={panelId}>
					{children}
				</div>
			)}
		</div>
	)
}

export const BestiaryBrowser: React.FC = () => {
	const facets = useMemo(() => buildFacets(creatures), [])
	/**
	 * The URL is read ONCE, on mount.
	 *
	 * Reading it on every render would fight the writer below, and reading it
	 * during render at all is a hydration hazard — this component is mounted
	 * inside `<BrowserOnly>`, but the habit is the bug.
	 */
	const [filters, setFilters] = useState<BestiaryFilters>(() =>
		typeof window === 'undefined'
			? DEFAULT_FILTERS
			: decodeFilters(window.location.search, facets),
	)
	const [expanded, setExpanded] = useState<string | null>(null)
	const tableId = useId()
	/** The roster keyed the way a saved encounter refers to it (name and tier). */
	const roster = useMemo(() => keyedRoster(creatures), [])
	const [encounter, setEncounter] = useState<Encounter>(() =>
		typeof window === 'undefined'
			? EMPTY_ENCOUNTER
			: decodeEncounter(window.location.search, roster, CIRCUMSTANCE_IDS),
	)
	const [saved, setSaved] = useState<SavedEncounter[]>(() => loadSaved())

	const persist = (next: SavedEncounter[]) => {
		setSaved(next)
		writeSaved(next)
	}

	// Bookmarkable state, written without a navigation: `replaceState` keeps the
	// back button meaning "the page before this one" rather than "the filter
	// before this one", which is what a GM ticking six boxes actually wants.
	useEffect(() => {
		// One address for the whole view: what is being looked at, and what is
		// being built out of it.
		const query = [encodeFilters(filters), encodeEncounter(encounter)]
			.filter(Boolean)
			.join('&')
		const url = query
			? `${window.location.pathname}?${query}`
			: window.location.pathname
		window.history.replaceState(null, '', `${url}${window.location.hash}`)
	}, [filters, encounter])

	const update = (patch: Partial<BestiaryFilters>) =>
		// Any change to what is SHOWN returns to page 1. Landing on page 4 of a
		// two-page result is the classic filtered-table dead end.
		setFilters((current) => ({
			...current,
			...patch,
			page: patch.page ?? 1,
		}))

	const toggle = (key: keyof BestiaryFilters, value: string) =>
		setFilters((current) => {
			const list = current[key] as string[]
			return {
				...current,
				[key]: list.includes(value)
					? list.filter((v) => v !== value)
					: [...list, value],
				page: 1,
			}
		})

	const sortBy = (key: SortKey) =>
		setFilters((current) => ({
			...current,
			sortKey: key,
			// A new column starts ascending; the same column flips. Tier and HP
			// still start low-to-high, which is the order a GM builds up from.
			sortAscending: current.sortKey === key ? !current.sortAscending : true,
			page: 1,
		}))

	const matched = useMemo(() => filterCreatures(creatures, filters), [filters])
	const sorted = useMemo(
		() => sortCreatures(matched, filters.sortKey, filters.sortAscending),
		[matched, filters.sortKey, filters.sortAscending],
	)
	const page = useMemo(
		() => paginate(sorted, filters.page, filters.pageSize),
		[sorted, filters.page, filters.pageSize],
	)

	return (
		<div className={styles.browser}>
			{/* Above the toolbar on purpose. Sitting between the filters and the
			    table, it pushed the two apart the moment a GM added their first
			    creature, moving the layout they were working in out from under them. */}
			{encounter.members.length > 0 && (
				<EncounterPanel
					encounter={encounter}
					roster={roster}
					saved={saved}
					onChange={setEncounter}
					onSave={(name) => persist(saveEncounter(saved, name, encounter))}
					onLoad={(name) => {
						const found = saved.find((item) => item.name === name)
						if (found) setEncounter(found.encounter)
					}}
					onDelete={(name) =>
						persist(saved.filter((item) => item.name !== name))
					}
					onClear={() =>
						setEncounter((current) => ({
							...EMPTY_ENCOUNTER,
							// The party survives emptying the fight: a GM building three
							// encounters for the same table sets it once.
							party: current.party,
						}))
					}
				/>
			)}

			<div className={styles.toolbar}>
				<div className={styles.searchField}>
					{/* The same eye the site's own search carries, so the two read as the
					    same gesture. Decorative: the input has its own label. */}
					<SigilIcon name="eye" size={13} className={styles.searchGlyph} />
					<input
						type="search"
						className={styles.search}
						placeholder="Search name, trait, or what it does…"
						aria-label="Search creatures"
						value={filters.search}
						onChange={(event) => update({ search: event.target.value })}
					/>
				</div>
				{/* Named, because "Type" and "Role" are also sortable COLUMN headers: the
				    group is what tells a screen-reader user which of the two they are on. */}
				<div className={styles.filters} role="group" aria-label="Filters">
					<FilterMenu
						label="Tier"
						glyph="ziggurat"
						summary={
							filters.tierMin === TIER_MIN && filters.tierMax === TIER_MAX
								? undefined
								: `${filters.tierMin}-${filters.tierMax}`
						}
					>
						<div className={styles.tierRange}>
							<label>
								From
								<select
									aria-label="Lowest tier"
									value={filters.tierMin}
									onChange={(event) => {
										const value = Number(event.target.value)
										update({
											tierMin: value,
											tierMax: Math.max(value, filters.tierMax),
										})
									}}
								>
									{TIERS.map((tier) => (
										<option key={tier} value={tier}>
											{tier}
										</option>
									))}
								</select>
							</label>
							<label>
								To
								<select
									aria-label="Highest tier"
									value={filters.tierMax}
									onChange={(event) => {
										const value = Number(event.target.value)
										update({
											tierMax: value,
											tierMin: Math.min(value, filters.tierMin),
										})
									}}
								>
									{TIERS.map((tier) => (
										<option key={tier} value={tier}>
											{tier}
										</option>
									))}
								</select>
							</label>
						</div>
					</FilterMenu>
					{FACET_MENUS.map(({ label, facet, key, glyph }) => (
						<FilterMenu
							key={key}
							label={label}
							glyph={glyph}
							summary={
								(filters[key] as string[]).length > 0
									? String((filters[key] as string[]).length)
									: undefined
							}
						>
							<div className={styles.options}>
								{facets[facet].map((option) => {
									const selected = (filters[key] as string[]).includes(option)
									return (
										<button
											key={option}
											type="button"
											className={styles.option}
											aria-pressed={selected}
											onClick={() => toggle(key, option)}
										>
											<span aria-hidden="true" className={styles.optionMark}>
												{selected ? '✓' : ''}
											</span>
											{option}
										</button>
									)
								})}
							</div>
						</FilterMenu>
					))}
					{isFiltered(filters) && (
						<button
							type="button"
							className={styles.clear}
							onClick={() =>
								setFilters({
									...DEFAULT_FILTERS,
									sortKey: filters.sortKey,
									sortAscending: filters.sortAscending,
									pageSize: filters.pageSize,
								})
							}
						>
							Clear filters
						</button>
					)}
				</div>
			</div>

			<div className={styles.tableScroll}>
				<table className={styles.table}>
					<thead>
						<tr>
							{COLUMNS.map((column) => (
								<th
									key={column.key}
									scope="col"
									className={columnClass(column)}
									aria-sort={
										filters.sortKey === column.key
											? filters.sortAscending
												? 'ascending'
												: 'descending'
											: 'none'
									}
								>
									<button
										type="button"
										className={styles.sortButton}
										onClick={() => sortBy(column.key)}
									>
										{column.glyph && (
											<StatSigil
												name={column.glyph}
												size={11}
												className={styles.headGlyph}
											/>
										)}
										{column.label}
										<span aria-hidden="true" className={styles.sortMark}>
											{filters.sortKey === column.key
												? filters.sortAscending
													? '▲'
													: '▼'
												: ''}
										</span>
									</button>
								</th>
							))}
							<th scope="col" className={styles.addColumn}>
								<span className={styles.srOnly}>Add to encounter</span>
							</th>
						</tr>
					</thead>
					<tbody>
						{page.entries.map((entry) => (
							<CreatureRow
								key={entry.id}
								entry={entry}
								panelId={`${tableId}-${entry.id}`}
								expanded={expanded === entry.id}
								onToggle={() =>
									setExpanded((current) =>
										current === entry.id ? null : entry.id,
									)
								}
								onAdd={(count) =>
									setEncounter((current) => addMember(current, entry, count))
								}
							/>
						))}
						{page.total === 0 && (
							<tr>
								<td colSpan={COLUMN_COUNT} className={styles.empty}>
									Nothing matches every filter at once. Widening the tier range
									or clearing the region usually brings the list back.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Everything about PAGING sits under the table, where a reader arrives
			    when they run out of rows. The count led the table before, which put the
			    page-size control as far from the pager as the page allowed. */}
			<div className={styles.resultBar}>
				<span aria-live="polite">
					{page.total === 0
						? 'No creatures match'
						: `${page.firstShown}–${page.lastShown} of ${page.total}`}
				</span>
				<div className={styles.resultActions}>
					<label className={styles.pageSize}>
						Show
						<select
							value={filters.pageSize}
							onChange={(event) =>
								update({ pageSize: Number(event.target.value) })
							}
						>
							{PAGE_SIZES.map((size) => (
								<option key={size} value={size}>
									{size === 0 ? 'All' : size}
								</option>
							))}
						</select>
					</label>
				</div>
			</div>

			{page.pageCount > 1 && (
				<nav className={styles.pager} aria-label="Bestiary pages">
					<button
						type="button"
						onClick={() => update({ page: page.page - 1 })}
						disabled={page.page === 1}
					>
						Previous
					</button>
					<span className={styles.pagerPages}>
						{Array.from({ length: page.pageCount }, (_, i) => i + 1).map(
							(number) => (
								<button
									key={number}
									type="button"
									className={styles.pagerPage}
									aria-current={number === page.page ? 'page' : undefined}
									onClick={() => update({ page: number })}
								>
									{number}
								</button>
							),
						)}
					</span>
					<button
						type="button"
						onClick={() => update({ page: page.page + 1 })}
						disabled={page.page === page.pageCount}
					>
						Next
					</button>
				</nav>
			)}
		</div>
	)
}

const CreatureRow: React.FC<{
	entry: CreatureIndexEntry
	panelId: string
	expanded: boolean
	onToggle: () => void
	onAdd: (count: number) => void
}> = ({ entry, panelId, expanded, onToggle, onAdd }) => {
	const hp = splitHp(entry.hp)
	const av = splitAv(entry.av)
	return (
		<>
			<tr className={expanded ? styles.rowOpen : undefined}>
				<th scope="row" className={styles.nameCell}>
					<button
						type="button"
						className={styles.nameButton}
						aria-expanded={expanded}
						aria-controls={expanded ? panelId : undefined}
						onClick={onToggle}
					>
						<span aria-hidden="true" className={styles.caret}>
							{expanded ? '▾' : '▸'}
						</span>
						{entry.name}
					</button>
					<span className={styles.mobileMeta}>
						{entry.role ? `${entry.role} · ` : ''}
						{entry.size} {entry.type}
					</span>
				</th>
				<td className={styles.numeric}>{entry.tier}</td>
				<td>{entry.category}</td>
				<td className={styles.secondary}>{entry.role ?? '—'}</td>
				<td className={styles.secondary}>
					{entry.size} {entry.type}
				</td>
				<td className={styles.numeric}>
					{hp.value}
					{hp.pools > 1 && (
						<span className={styles.pools} title={`${hp.pools} life pools`}>
							{` ×${hp.pools}`}
						</span>
					)}
				</td>
				<td className={`${styles.numeric} ${styles.secondary}`}>{av.value}</td>
				<td className={`${styles.numeric} ${styles.secondary}`}>
					{entry.parry}
				</td>
				<td className={`${styles.numeric} ${styles.secondary}`}>
					{entry.dodge}
				</td>
				<td className={`${styles.numeric} ${styles.secondary}`}>
					{entry.resist}
				</td>
				<td className={`${styles.numeric} ${styles.tertiary}`}>{entry.str}</td>
				<td className={`${styles.numeric} ${styles.tertiary}`}>{entry.agi}</td>
				<td className={`${styles.numeric} ${styles.tertiary}`}>{entry.spi}</td>
				<td className={`${styles.numeric} ${styles.tertiary}`}>{entry.mnd}</td>
				<td className={styles.addColumn}>
					<button
						type="button"
						className={styles.addButton}
						aria-label={`Add ${entry.name} to the encounter`}
						onClick={() => onAdd(1)}
					>
						+
					</button>
				</td>
			</tr>
			{expanded && (
				<tr>
					<td colSpan={COLUMN_COUNT} className={styles.detailCell} id={panelId}>
						<CreatureDetail entry={entry} onAdd={onAdd} />
					</td>
				</tr>
			)}
		</>
	)
}

export default BestiaryBrowser

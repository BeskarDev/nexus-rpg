import type { CreatureIndexEntry } from '@site/src/types/CreatureIndex'
import environmentsJson from '@site/src/utils/data/json/creature-environments.json'
import { splitAv, splitHp } from '@site/src/components/codex/creatureStats'

/**
 * Everything the bestiary browser does to a creature list, as pure functions.
 *
 * Kept out of the component on purpose: filtering, sorting and paging are the
 * parts with rules a GM will notice being wrong ("why is the Ogre missing from
 * tier 3?"), and a rule that lives in a `useMemo` can only be tested by driving
 * a table. These take a list and return a list.
 */

export const TIER_MIN = 0
export const TIER_MAX = 10

/**
 * The two environment axes, split by the vocabulary's own rank.
 *
 * They are separate filters rather than one list because a GM asks TWO
 * questions about where the party is standing, and wants both answered at once:
 * "a tomb in the desert" means region Desert **and** site Tomb, not either. So
 * terms OR within an axis and AND across the two. Folded into a single facet,
 * ticking Desert and Tomb would widen the result instead of narrowing it, which
 * is the opposite of what the ticking felt like.
 */
const RANK_BY_TERM = new Map<string, number>(
	environmentsJson.environments.map((e: { name: string; rank: number }) => [
		e.name,
		e.rank,
	]),
)

export const REGION_TERMS = environmentsJson.environments
	.filter((e: { rank: number }) => e.rank === 1)
	.map((e: { name: string }) => e.name)

export const SITE_TERMS = environmentsJson.environments
	.filter((e: { rank: number }) => e.rank === 2)
	.map((e: { name: string }) => e.name)

export type SortKey =
	| 'name'
	| 'tier'
	| 'category'
	| 'role'
	| 'type'
	| 'size'
	| 'hp'
	| 'av'
	| 'parry'
	| 'dodge'
	| 'resist'
	| 'str'
	| 'agi'
	| 'spi'
	| 'mnd'

export interface BestiaryFilters {
	search: string
	tierMin: number
	tierMax: number
	categories: string[]
	roles: string[]
	types: string[]
	sizes: string[]
	regions: string[]
	sites: string[]
	sortKey: SortKey
	sortAscending: boolean
	page: number
	pageSize: number
}

/** `0` means "all on one page" — the GM who wants to scroll, not click. */
export const PAGE_SIZES = [10, 25, 50, 0] as const

export const DEFAULT_FILTERS: BestiaryFilters = {
	search: '',
	tierMin: TIER_MIN,
	tierMax: TIER_MAX,
	categories: [],
	roles: [],
	types: [],
	sizes: [],
	regions: [],
	sites: [],
	sortKey: 'tier',
	sortAscending: true,
	page: 1,
	// Ten rows is a screen of table with the page controls still in view. A GM
	// scanning for a creature pages rather than scrolls.
	pageSize: 10,
}

/**
 * The options a filter actually offers, built from the creatures present rather
 * than from the vocabularies.
 *
 * The vocabularies are deliberately forward-looking — `creature-environments.json`
 * carries Arctic, Sky and Otherworld, `creature-types.json` carries types no
 * creature has been written for yet. Offering a checkbox that can only ever
 * return nothing tells a GM the bestiary is broken. When the roster grows into
 * a term, its checkbox appears by itself.
 */
export interface BestiaryFacets {
	categories: string[]
	roles: string[]
	types: string[]
	sizes: string[]
	regions: string[]
	sites: string[]
	tiers: number[]
}

export function buildFacets(entries: CreatureIndexEntry[]): BestiaryFacets {
	const collect = (pick: (e: CreatureIndexEntry) => string[] | undefined) =>
		[...new Set(entries.flatMap((e) => pick(e) ?? []))].sort((a, b) =>
			a.localeCompare(b),
		)

	const environments = new Set(entries.flatMap((e) => e.environment))
	return {
		categories: collect((e) => [e.category]),
		roles: collect((e) => (e.role ? [e.role] : [])),
		types: collect((e) => [e.type]),
		sizes: collect((e) => [e.size]),
		// Ordered by the vocabulary, not alphabetically: the vocabulary's order is
		// the map's order, and a GM scanning for "Marsh" looks where the wet places
		// are rather than between Jungle and Mountains.
		regions: REGION_TERMS.filter((t) => environments.has(t)),
		sites: SITE_TERMS.filter((t) => environments.has(t)),
		tiers: [...new Set(entries.map((e) => e.tier))].sort((a, b) => a - b),
	}
}

/**
 * Everything about a creature a GM might type into the search box.
 *
 * Deliberately includes the prose of attacks and abilities, not just names: the
 * real query is "something that grapples" or "something that can set things on
 * fire", and neither word appears in any name or tag. The whole point of typing
 * rather than ticking is to reach what the facets do not model.
 */
function searchableText(entry: CreatureIndexEntry): string {
	return [
		entry.name,
		entry.type,
		entry.size,
		entry.category,
		entry.role ?? '',
		...entry.subtype,
		...entry.traits,
		...entry.skills,
		...entry.environment,
		...entry.immunities,
		...entry.resistances,
		...entry.weaknesses,
		...entry.attacks.flatMap((a) => [
			a.name,
			a.text,
			...(a.properties ?? []),
			...(a.details ?? []),
		]),
		...entry.abilities.flatMap((a) => [
			a.name,
			a.text,
			a.qualifier ?? '',
			...(a.details ?? []),
		]),
	]
		.join(' ')
		.toLowerCase()
}

/**
 * Every word must appear somewhere, in any order.
 *
 * "goblin archer" and "archer goblin" are the same query to a GM, and a
 * substring match on the whole phrase answers only one of them.
 */
export function matchesSearch(
	entry: CreatureIndexEntry,
	search: string,
): boolean {
	const words = search.toLowerCase().split(/\s+/).filter(Boolean)
	if (words.length === 0) return true
	const haystack = searchableText(entry)
	return words.every((word) => haystack.includes(word))
}

const hasAny = (selected: string[], values: string[]): boolean =>
	selected.length === 0 || values.some((v) => selected.includes(v))

export function filterCreatures(
	entries: CreatureIndexEntry[],
	filters: BestiaryFilters,
): CreatureIndexEntry[] {
	return entries.filter((entry) => {
		if (entry.tier < filters.tierMin || entry.tier > filters.tierMax)
			return false
		if (!hasAny(filters.categories, [entry.category])) return false
		if (!hasAny(filters.roles, entry.role ? [entry.role] : [])) return false
		if (!hasAny(filters.types, [entry.type])) return false
		if (!hasAny(filters.sizes, [entry.size])) return false
		// Region and site intersect: see RANK_BY_TERM above.
		const regions = entry.environment.filter((t) => RANK_BY_TERM.get(t) === 1)
		const sites = entry.environment.filter((t) => RANK_BY_TERM.get(t) === 2)
		if (!hasAny(filters.regions, regions)) return false
		if (!hasAny(filters.sites, sites)) return false
		return matchesSearch(entry, filters.search)
	})
}

/**
 * HP sorts on TOTAL life, not the printed pool size.
 *
 * `2×30` prints as one pool of 30 but is 60 HP of fight, and an Elite listed
 * below every Basic with 40 would be a lie about which is tougher.
 */
export function totalHp(entry: CreatureIndexEntry): number {
	const { value, pools } = splitHp(entry.hp)
	return (Number(value) || 0) * pools
}

export function armorValue(entry: CreatureIndexEntry): number {
	return Number(splitAv(entry.av).value) || 0
}

/**
 * An attribute die as a number, so a column of dice can be sorted.
 *
 * `d12+1` and `d12+2` are the top of the ladder and must sort ABOVE `d12`, so
 * the modifier is added rather than dropped. It cannot collide with the next
 * die size, because the sizes step by two.
 */
export function dieValue(die: string): number {
	const match = die.trim().match(/^d(\d+)(?:\s*\+\s*(\d+))?$/i)
	if (!match) return 0
	return Number(match[1]) + Number(match[2] ?? 0)
}

export function sortCreatures(
	entries: CreatureIndexEntry[],
	key: SortKey,
	ascending: boolean,
): CreatureIndexEntry[] {
	// Category sorts by POWER, not alphabetically: Basic, Elite, Lord is the
	// order a GM thinks in, and "Basic, Elite, Lord" happens to be alphabetical
	// only by luck. Spell it out so a future category cannot break it.
	const categoryRank = ['Basic', 'Elite', 'Lord']
	const compare = (a: CreatureIndexEntry, b: CreatureIndexEntry): number => {
		switch (key) {
			case 'tier':
				return a.tier - b.tier
			case 'hp':
				return totalHp(a) - totalHp(b)
			case 'av':
				return armorValue(a) - armorValue(b)
			case 'category':
				return (
					categoryRank.indexOf(a.category) - categoryRank.indexOf(b.category)
				)
			case 'parry':
			case 'dodge':
			case 'resist':
				return a[key] - b[key]
			case 'str':
			case 'agi':
			case 'spi':
			case 'mnd':
				return dieValue(a[key]) - dieValue(b[key])
			case 'role':
				return (a.role ?? '').localeCompare(b.role ?? '')
			case 'type':
				return a.type.localeCompare(b.type)
			case 'size':
				return a.size.localeCompare(b.size)
			default:
				return a.name.localeCompare(b.name)
		}
	}
	// Name is the tiebreak on every other key, so a re-sort never shuffles rows
	// that compare equal — a table that reorders under a GM mid-scan has lost
	// their place for them.
	return [...entries].sort(
		(a, b) =>
			(ascending ? compare(a, b) : -compare(a, b)) ||
			a.name.localeCompare(b.name),
	)
}

export interface Page {
	entries: CreatureIndexEntry[]
	page: number
	pageCount: number
	/** 1-based index of the first row shown, for the "N-M of T" readout. */
	firstShown: number
	lastShown: number
	total: number
}

/**
 * Paging clamps rather than validates.
 *
 * A filter that narrows the list under the current page has no error state —
 * the GM ticked a box, they did not make a mistake — so page 7 of 3 shows
 * page 3.
 */
export function paginate(
	entries: CreatureIndexEntry[],
	page: number,
	pageSize: number,
): Page {
	const total = entries.length
	if (pageSize <= 0) {
		return {
			entries,
			page: 1,
			pageCount: 1,
			firstShown: total === 0 ? 0 : 1,
			lastShown: total,
			total,
		}
	}
	const pageCount = Math.max(1, Math.ceil(total / pageSize))
	const current = Math.min(Math.max(1, page), pageCount)
	const start = (current - 1) * pageSize
	const shown = entries.slice(start, start + pageSize)
	return {
		entries: shown,
		page: current,
		pageCount,
		firstShown: shown.length === 0 ? 0 : start + 1,
		lastShown: start + shown.length,
		total,
	}
}

/**
 * Filter state as a query string, so a view can be bookmarked and pasted.
 *
 * Only what differs from the default is written. A GM who has touched nothing
 * should be able to copy the URL of the page they are on and get a clean link,
 * not forty characters of defaults.
 */
export function encodeFilters(filters: BestiaryFilters): string {
	const params = new URLSearchParams()
	const list = (key: string, values: string[]) => {
		if (values.length > 0) params.set(key, values.join(','))
	}
	if (filters.search.trim()) params.set('q', filters.search.trim())
	if (filters.tierMin !== TIER_MIN || filters.tierMax !== TIER_MAX)
		params.set('tier', `${filters.tierMin}-${filters.tierMax}`)
	list('cat', filters.categories)
	list('role', filters.roles)
	list('type', filters.types)
	list('size', filters.sizes)
	list('region', filters.regions)
	list('site', filters.sites)
	if (
		filters.sortKey !== DEFAULT_FILTERS.sortKey ||
		filters.sortAscending !== DEFAULT_FILTERS.sortAscending
	)
		params.set(
			'sort',
			`${filters.sortKey}:${filters.sortAscending ? 'a' : 'd'}`,
		)
	if (filters.pageSize !== DEFAULT_FILTERS.pageSize)
		params.set('per', String(filters.pageSize))
	if (filters.page > 1) params.set('page', String(filters.page))
	return params.toString()
}

const SORT_KEYS: SortKey[] = [
	'name',
	'tier',
	'category',
	'role',
	'type',
	'size',
	'hp',
	'av',
	'parry',
	'dodge',
	'resist',
	'str',
	'agi',
	'spi',
	'mnd',
]

/**
 * Read filter state back out of a query string.
 *
 * Every value is validated against the facets and falls back to the default,
 * because a URL is user input: a stale bookmark naming a retired creature type,
 * or a hand-edited `tier=99-0`, must land on a working table rather than an
 * empty one with no explanation.
 */
export function decodeFilters(
	query: string,
	facets: BestiaryFacets,
): BestiaryFilters {
	const params = new URLSearchParams(query)
	const list = (key: string, allowed: string[]): string[] => {
		const raw = params.get(key)
		if (!raw) return []
		return raw.split(',').filter((v) => allowed.includes(v))
	}

	let tierMin = DEFAULT_FILTERS.tierMin
	let tierMax = DEFAULT_FILTERS.tierMax
	const tier = params.get('tier')?.match(/^(\d+)-(\d+)$/)
	if (tier) {
		const low = Math.min(Number(tier[1]), Number(tier[2]))
		const high = Math.max(Number(tier[1]), Number(tier[2]))
		if (low >= TIER_MIN && high <= TIER_MAX) {
			tierMin = low
			tierMax = high
		}
	}

	const sort = params.get('sort')?.split(':')
	const sortKey =
		sort && SORT_KEYS.includes(sort[0] as SortKey)
			? (sort[0] as SortKey)
			: DEFAULT_FILTERS.sortKey
	const sortAscending =
		sort?.[1] === 'd' ? false : DEFAULT_FILTERS.sortAscending

	// `has` before `Number`: a MISSING `per` reads as Number(null) === 0, which is
	// itself a valid page size meaning "all on one page". Decoding an untouched
	// URL therefore silently turned paging off entirely.
	const per = params.has('per')
		? Number(params.get('per'))
		: DEFAULT_FILTERS.pageSize
	const pageSize = (PAGE_SIZES as readonly number[]).includes(per)
		? per
		: DEFAULT_FILTERS.pageSize
	const page = Math.max(1, Number(params.get('page')) || 1)

	return {
		search: params.get('q') ?? '',
		tierMin,
		tierMax,
		categories: list('cat', facets.categories),
		roles: list('role', facets.roles),
		types: list('type', facets.types),
		sizes: list('size', facets.sizes),
		regions: list('region', facets.regions),
		sites: list('site', facets.sites),
		sortKey,
		sortAscending,
		page,
		pageSize,
	}
}

/** Whether anything is narrowing the list, for the "clear filters" affordance. */
export function isFiltered(filters: BestiaryFilters): boolean {
	return (
		filters.search.trim() !== '' ||
		filters.tierMin !== TIER_MIN ||
		filters.tierMax !== TIER_MAX ||
		filters.categories.length > 0 ||
		filters.roles.length > 0 ||
		filters.types.length > 0 ||
		filters.sizes.length > 0 ||
		filters.regions.length > 0 ||
		filters.sites.length > 0
	)
}

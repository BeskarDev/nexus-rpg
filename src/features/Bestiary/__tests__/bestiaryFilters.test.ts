import { describe, it, expect } from 'vitest'
import type { CreatureIndexEntry } from '@site/src/types/CreatureIndex'
import {
	DEFAULT_FILTERS,
	buildFacets,
	decodeFilters,
	encodeFilters,
	filterCreatures,
	isFiltered,
	matchesSearch,
	paginate,
	dieValue,
	sortCreatures,
	totalHp,
} from '../bestiaryFilters'

const creature = (
	overrides: Partial<CreatureIndexEntry> & { name: string },
): CreatureIndexEntry => ({
	id: `catalogue:0:${overrides.name}`,
	href: '/docs/creatures/creatures/tier-1#x',
	tier: 1,
	category: 'Basic',
	size: 'Medium',
	type: 'Beast',
	subtype: [],
	armor: 'None',
	hp: '10',
	av: '0 (none)',
	str: 'd6',
	agi: 'd6',
	spi: 'd6',
	mnd: 'd4',
	parry: 7,
	dodge: 7,
	resist: 7,
	skills: [],
	immunities: [],
	resistances: [],
	weaknesses: [],
	traits: [],
	attacks: [],
	abilities: [],
	environment: ['Desert'],
	organization: [],
	...overrides,
})

const jackal = creature({
	name: 'Jackal',
	tier: 0,
	role: 'Skirmisher',
	size: 'Small',
	environment: ['Desert', 'Road', 'Tomb'],
	traits: ['Pack Tactics'],
})
const ghoul = creature({
	name: 'Ghoul',
	tier: 2,
	type: 'Undead',
	role: 'Skirmisher',
	hp: '20',
	av: '2 (natural light)',
	environment: ['Grassland', 'Ruins'],
	attacks: [{ name: 'Claws', text: '6/8/10 damage. The target is grappled.' }],
})
const captain = creature({
	name: 'Captain',
	tier: 3,
	category: 'Elite',
	type: 'Humanoid',
	role: 'Defender',
	hp: '2×30',
	av: '4 (light armor and shield)',
	environment: ['Desert', 'Fortress'],
})
const roster = [jackal, ghoul, captain]

const filters = (overrides: Partial<typeof DEFAULT_FILTERS> = {}) => ({
	...DEFAULT_FILTERS,
	...overrides,
})

describe('facets', () => {
	it('offers only values the roster actually uses', () => {
		const facets = buildFacets(roster)
		expect(facets.types).toEqual(['Beast', 'Humanoid', 'Undead'])
		expect(facets.roles).toEqual(['Defender', 'Skirmisher'])
		// Arctic and Sky are in the vocabulary but in no creature, so no GM is
		// offered a checkbox that can only ever return nothing.
		expect(facets.regions).not.toContain('Arctic')
		expect(facets.regions).toEqual(['Desert', 'Grassland'])
		expect(facets.sites).toEqual(['Road', 'Ruins', 'Fortress', 'Tomb'])
	})

	it('orders environments by the vocabulary, not alphabetically', () => {
		// Region before site is the vocabulary's own order, and inside each axis a
		// GM scans the map rather than the dictionary.
		const { sites } = buildFacets(roster)
		expect(sites.indexOf('Road')).toBeLessThan(sites.indexOf('Tomb'))
	})
})

describe('filtering', () => {
	it('keeps creatures inside the tier range', () => {
		const result = filterCreatures(roster, filters({ tierMin: 1, tierMax: 2 }))
		expect(result.map((c) => c.name)).toEqual(['Ghoul'])
	})

	it('ORs within one facet', () => {
		const result = filterCreatures(
			roster,
			filters({ types: ['Beast', 'Undead'] }),
		)
		expect(result.map((c) => c.name)).toEqual(['Jackal', 'Ghoul'])
	})

	it('ANDs across facets', () => {
		const result = filterCreatures(
			roster,
			filters({ types: ['Undead'], roles: ['Defender'] }),
		)
		expect(result).toEqual([])
	})

	it('intersects region with site rather than widening', () => {
		// The whole reason the two axes are separate filters: "a tomb in the
		// desert" must narrow to the Jackal, not return everything in a desert
		// plus everything in a tomb.
		const result = filterCreatures(
			roster,
			filters({ regions: ['Desert'], sites: ['Tomb'] }),
		)
		expect(result.map((c) => c.name)).toEqual(['Jackal'])

		const mismatch = filterCreatures(
			roster,
			filters({ regions: ['Grassland'], sites: ['Fortress'] }),
		)
		expect(mismatch).toEqual([])
	})

	it('searches rule text, not just names', () => {
		// "something that grapples" is the query facets cannot answer.
		expect(matchesSearch(ghoul, 'grappled')).toBe(true)
		expect(matchesSearch(jackal, 'grappled')).toBe(false)
	})

	it('matches words in any order', () => {
		expect(matchesSearch(jackal, 'pack jackal')).toBe(true)
		expect(matchesSearch(jackal, 'jackal pack')).toBe(true)
	})
})

describe('sorting', () => {
	it('sorts HP by total life, not printed pool size', () => {
		// The Captain prints 2×30 and is 60 HP of fight; listed under a 40 HP
		// Basic it would misstate which is tougher.
		expect(totalHp(captain)).toBe(60)
		const sorted = sortCreatures(roster, 'hp', false)
		expect(sorted[0].name).toBe('Captain')
	})

	it('sorts rank by power rather than alphabetically', () => {
		const sorted = sortCreatures(roster, 'category', false)
		expect(sorted[0].category).toBe('Elite')
	})

	it('sorts a column of dice by die size', () => {
		// `d12+1` and `d12+2` are the top of the ladder and must outrank `d12`.
		expect(dieValue('d6')).toBeLessThan(dieValue('d8'))
		expect(dieValue('d12')).toBeLessThan(dieValue('d12+1'))
		expect(dieValue('d12+1')).toBeLessThan(dieValue('d12+2'))
		expect(dieValue('')).toBe(0)

		const dice = [
			creature({ name: 'Weak', str: 'd4' }),
			creature({ name: 'Strong', str: 'd12+1' }),
			creature({ name: 'Middling', str: 'd8' }),
		]
		expect(sortCreatures(dice, 'str', true).map((c) => c.name)).toEqual([
			'Weak',
			'Middling',
			'Strong',
		])
	})

	it('sorts the defenses a GM aims at', () => {
		const targets = [
			creature({ name: 'Nimble', dodge: 11 }),
			creature({ name: 'Slow', dodge: 5 }),
		]
		expect(sortCreatures(targets, 'dodge', true)[0].name).toBe('Slow')
		expect(sortCreatures(targets, 'dodge', false)[0].name).toBe('Nimble')
	})

	it('breaks ties by name so a re-sort never shuffles equal rows', () => {
		const tie = [
			creature({ name: 'Zebra', tier: 5 }),
			creature({ name: 'Aurochs', tier: 5 }),
		]
		expect(sortCreatures(tie, 'tier', true).map((c) => c.name)).toEqual([
			'Aurochs',
			'Zebra',
		])
		expect(sortCreatures(tie, 'tier', false).map((c) => c.name)).toEqual([
			'Aurochs',
			'Zebra',
		])
	})
})

describe('paging', () => {
	it('splits the list and reports the range', () => {
		const page = paginate(roster, 2, 2)
		expect(page.entries.map((c) => c.name)).toEqual(['Captain'])
		expect(page.firstShown).toBe(3)
		expect(page.lastShown).toBe(3)
		expect(page.pageCount).toBe(2)
	})

	it('clamps a page past the end instead of showing nothing', () => {
		// Narrowing a filter while on page 7 is not an error state.
		const page = paginate(roster, 7, 2)
		expect(page.page).toBe(2)
		expect(page.entries).toHaveLength(1)
	})

	it('treats page size 0 as one page of everything', () => {
		const page = paginate(roster, 3, 0)
		expect(page.entries).toHaveLength(3)
		expect(page.pageCount).toBe(1)
		expect(page.lastShown).toBe(3)
	})

	it('reports an empty result without a phantom first row', () => {
		const page = paginate([], 1, 25)
		expect(page.firstShown).toBe(0)
		expect(page.total).toBe(0)
	})
})

describe('url state', () => {
	const facets = buildFacets(roster)

	it('writes nothing for an untouched view', () => {
		expect(encodeFilters(DEFAULT_FILTERS)).toBe('')
	})

	it('decodes an untouched URL back to the defaults', () => {
		// `per` is the trap: a missing parameter reads as 0, and 0 is a real page
		// size meaning "all on one page", so this silently disabled paging.
		expect(decodeFilters('', facets)).toEqual(DEFAULT_FILTERS)
	})

	it('accepts the defense and attribute columns as sort keys', () => {
		// A URL naming a column the table no longer has must fall back rather than
		// sorting by something the header cannot show as active.
		expect(decodeFilters('sort=dodge:d', facets)).toMatchObject({
			sortKey: 'dodge',
			sortAscending: false,
		})
		expect(decodeFilters('sort=charisma:a', facets).sortKey).toBe(
			DEFAULT_FILTERS.sortKey,
		)
	})

	it('round-trips a filtered view', () => {
		const original = filters({
			search: 'grapple',
			tierMin: 1,
			tierMax: 4,
			types: ['Undead'],
			regions: ['Desert'],
			sites: ['Tomb'],
			sortKey: 'hp' as const,
			sortAscending: false,
			pageSize: 50,
			page: 2,
		})
		expect(decodeFilters(encodeFilters(original), facets)).toEqual(original)
	})

	it('drops values the roster no longer offers', () => {
		// A stale bookmark naming a retired type must land on a working table.
		const decoded = decodeFilters('type=Aberration&region=Sky', facets)
		expect(decoded.types).toEqual([])
		expect(decoded.regions).toEqual([])
	})

	it('repairs an impossible tier range', () => {
		expect(decodeFilters('tier=4-1', facets)).toMatchObject({
			tierMin: 1,
			tierMax: 4,
		})
		expect(decodeFilters('tier=0-99', facets)).toMatchObject({
			tierMin: 0,
			tierMax: 10,
		})
	})

	it('knows when something is narrowing the list', () => {
		expect(isFiltered(DEFAULT_FILTERS)).toBe(false)
		expect(isFiltered(filters({ sortKey: 'hp' as const }))).toBe(false)
		expect(isFiltered(filters({ sites: ['Tomb'] }))).toBe(true)
	})
})

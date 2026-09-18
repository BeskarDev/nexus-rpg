import { describe, it, expect, beforeEach } from 'vitest'
import type { CreatureIndexEntry } from '@site/src/types/CreatureIndex'
import {
	COUNT_MAX,
	EMPTY_ENCOUNTER,
	addMember,
	decodeEncounter,
	encodeEncounter,
	keyedRoster,
	loadSaved,
	memberKey,
	missingMembers,
	presetCount,
	saveEncounter,
	setCount,
	setTroop,
	toLines,
	totalHitPoints,
	writeSaved,
} from '../encounter'
import { CIRCUMSTANCES } from '../threat'

const creature = (
	name: string,
	overrides: Partial<CreatureIndexEntry> = {},
): CreatureIndexEntry =>
	({
		id: `catalogue:0:${name}`,
		name,
		href: '#',
		tier: 2,
		category: 'Basic',
		size: 'Medium',
		type: 'Beast',
		subtype: [],
		armor: 'None',
		hp: '20',
		av: '0 (none)',
		str: 'd6',
		agi: 'd6',
		spi: 'd6',
		mnd: 'd4',
		parry: 8,
		dodge: 8,
		resist: 8,
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
	}) as CreatureIndexEntry

const ghoul = creature('Ghoul')
const captain = creature('Captain', { category: 'Elite', tier: 3, hp: '2×30' })
// The corpus's repeated name: same word, two different creatures.
const manticoreElite = creature('Manticore', { tier: 3, category: 'Elite' })
const manticoreBasic = creature('Manticore', { tier: 4 })
const roster = keyedRoster([ghoul, captain, manticoreElite, manticoreBasic])

const CIRCUMSTANCE_IDS = CIRCUMSTANCES.map((c) => c.id)

describe('membership', () => {
	it('keys a member by name and tier, not by roster position', () => {
		// A saved encounter outlives the roster order. `catalogue:<index>:<name>`
		// would point at a different creature once one is inserted above it.
		expect(memberKey(ghoul)).toBe('Ghoul~2')
		expect(memberKey(manticoreElite)).not.toBe(memberKey(manticoreBasic))
	})

	it('raises the count instead of adding a second row', () => {
		const once = addMember(EMPTY_ENCOUNTER, ghoul)
		const twice = addMember(once, ghoul)
		expect(twice.members).toHaveLength(1)
		expect(twice.members[0].count).toBe(2)
	})

	it('removes a member stepped down to zero', () => {
		const encounter = addMember(EMPTY_ENCOUNTER, ghoul)
		expect(setCount(encounter, 'Ghoul~2', 0).members).toEqual([])
	})

	it('clamps a hand-typed count', () => {
		const encounter = addMember(EMPTY_ENCOUNTER, ghoul)
		expect(setCount(encounter, 'Ghoul~2', 999).members[0].count).toBe(COUNT_MAX)
		expect(setCount(encounter, 'Ghoul~2', -4).members).toEqual([])
	})

	it('disbands a troop stepped below the minimum', () => {
		// The table rules disband at two members. A two-member "troop" priced as
		// one unit would be a discount the rules do not give.
		let encounter = addMember(EMPTY_ENCOUNTER, ghoul, 4)
		encounter = setTroop(encounter, 'Ghoul~2', true)
		expect(setCount(encounter, 'Ghoul~2', 2).members[0].troop).toBe(false)
	})
})

describe('resolving against the roster', () => {
	it('hands the rules one line per member', () => {
		let encounter = addMember(EMPTY_ENCOUNTER, ghoul, 4)
		encounter = addMember(encounter, captain)
		expect(toLines(encounter, roster)).toEqual([
			{ tier: 2, category: 'Basic', count: 4, troop: false },
			{ tier: 3, category: 'Elite', count: 1, troop: false },
		])
	})

	it('drops a creature the roster no longer has, and says which', () => {
		// A retired creature is not a free creature: leaving them in the total at
		// zero would be worse than a shorter list the panel can explain.
		const encounter = {
			...EMPTY_ENCOUNTER,
			members: [{ key: 'Sphinx~6', count: 1, troop: false }],
		}
		expect(toLines(encounter, roster)).toEqual([])
		expect(missingMembers(encounter, roster)).toHaveLength(1)
	})

	it('totals life across pools', () => {
		let encounter = addMember(EMPTY_ENCOUNTER, ghoul, 3)
		encounter = addMember(encounter, captain)
		// Three Ghouls at 20, plus a Captain's two pools of 30.
		expect(totalHitPoints(encounter, roster)).toBe(120)
	})
})

describe('presets', () => {
	it('adds the low end of a designed group', () => {
		// A GM who wants the big version of a pack raises the stepper. One who did
		// not read the range should not be handed the harder fight.
		expect(presetCount('4-6')).toBe(4)
		expect(presetCount('1')).toBe(1)
		expect(presetCount('a few')).toBe(1)
	})
})

describe('url state', () => {
	it('writes nothing for an empty encounter', () => {
		expect(encodeEncounter(EMPTY_ENCOUNTER)).toBe('')
	})

	it('round-trips members, party and circumstances', () => {
		let encounter = addMember(EMPTY_ENCOUNTER, ghoul, 4)
		encounter = setTroop(encounter, 'Ghoul~2', true)
		encounter = addMember(encounter, captain)
		encounter = {
			...encounter,
			party: { size: 5, level: 3 },
			circumstances: ['healer'],
		}
		expect(
			decodeEncounter(encodeEncounter(encounter), roster, CIRCUMSTANCE_IDS),
		).toEqual(encounter)
	})

	it('survives a name containing a hyphen', () => {
		// "Orc Band-Leader" is why the field separator is `~` and not `-`.
		const leader = creature('Orc Band-Leader', { tier: 3, category: 'Elite' })
		const withLeader = keyedRoster([leader])
		const encounter = addMember(EMPTY_ENCOUNTER, leader, 2)
		expect(
			decodeEncounter(encodeEncounter(encounter), withLeader, CIRCUMSTANCE_IDS)
				.members,
		).toEqual([{ key: 'Orc Band-Leader~3', count: 2, troop: false }])
	})

	it('keeps the creatures a stale link can still resolve', () => {
		const decoded = decodeEncounter(
			'enc=Ghoul~2~3,Sphinx~6~1&party=4x2',
			roster,
			CIRCUMSTANCE_IDS,
		)
		expect(decoded.members).toHaveLength(1)
		expect(decoded.members[0].key).toBe('Ghoul~2')
	})

	it('refuses a troop a hand-edited link claims for an Elite', () => {
		const decoded = decodeEncounter(
			'enc=Captain~3~4~t&party=4x3',
			roster,
			CIRCUMSTANCE_IDS,
		)
		expect(decoded.members[0].troop).toBe(false)
	})

	it('clamps party figures and drops unknown circumstances', () => {
		const decoded = decodeEncounter(
			'party=99x99&when=healer,teleportation',
			roster,
			CIRCUMSTANCE_IDS,
		)
		expect(decoded.party).toEqual({ size: 8, level: 10 })
		expect(decoded.circumstances).toEqual(['healer'])
	})
})

describe('saved encounters', () => {
	// The shared test setup stubs `localStorage` with bare `vi.fn()`s that store
	// nothing, so a real round-trip needs a real store behind them.
	beforeEach(() => {
		const store = new Map<string, string>()
		Object.defineProperty(window, 'localStorage', {
			configurable: true,
			value: {
				getItem: (key: string) => store.get(key) ?? null,
				setItem: (key: string, value: string) => store.set(key, value),
				removeItem: (key: string) => store.delete(key),
				clear: () => store.clear(),
			},
		})
	})

	it('round-trips through storage', () => {
		const encounter = addMember(EMPTY_ENCOUNTER, ghoul, 2)
		writeSaved(saveEncounter([], 'Tomb door', encounter))
		expect(loadSaved()).toEqual([{ name: 'Tomb door', encounter }])
	})

	it('replaces an encounter saved under the same name', () => {
		const first = saveEncounter([], 'Ambush', addMember(EMPTY_ENCOUNTER, ghoul))
		const second = saveEncounter(
			first,
			'Ambush',
			addMember(EMPTY_ENCOUNTER, captain),
		)
		expect(second).toHaveLength(1)
		expect(second[0].encounter.members[0].key).toBe('Captain~3')
	})

	it('ignores an unnamed save', () => {
		expect(saveEncounter([], '   ', EMPTY_ENCOUNTER)).toEqual([])
	})

	it('returns an empty list rather than throwing on corrupt storage', () => {
		// A GM with a half-written key, an old format, or storage disabled still
		// gets a working tool.
		window.localStorage.setItem('nexus.bestiary.encounters', '{not json')
		expect(loadSaved()).toEqual([])
		window.localStorage.setItem('nexus.bestiary.encounters', '[{"name":1}]')
		expect(loadSaved()).toEqual([])
	})
})

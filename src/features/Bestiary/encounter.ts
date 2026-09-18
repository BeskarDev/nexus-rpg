import type { CreatureIndexEntry } from '@site/src/types/CreatureIndex'
import type { EncounterLine } from './threat'
import { MIN_TROOP_SIZE } from './threat'

/**
 * The encounter a GM is assembling: who is in it, how many, and who they are up
 * against. State only, with no React and no rules arithmetic (that is
 * `threat.ts`).
 */

export interface EncounterMember {
	/**
	 * `<name>~<tier>`, not the index entry's `catalogue:<i>:<name>` id.
	 *
	 * The catalogue id carries the creature's POSITION in the roster, which
	 * changes every time a creature is written above them. That is harmless
	 * inside one session and fatal in a saved or shared encounter: a link sent
	 * before three tier 2 creatures were added would resolve to the wrong
	 * creatures afterwards. Name and tier together are stable across edits and
	 * still separate the corpus's repeated names, which differ by tier.
	 */
	key: string
	count: number
	/** Fought as one unit under the troop rules. Basic creatures only. */
	troop: boolean
}

export interface Party {
	size: number
	level: number
}

export interface Encounter {
	party: Party
	members: EncounterMember[]
	/** Ids from `CIRCUMSTANCES`, which shift the difficulty a step each. */
	circumstances: string[]
}

export const DEFAULT_PARTY: Party = { size: 4, level: 1 }

export const EMPTY_ENCOUNTER: Encounter = {
	party: DEFAULT_PARTY,
	members: [],
	circumstances: [],
}

export const PARTY_SIZE_MAX = 8
export const PARTY_LEVEL_MAX = 10
/** Twelve of one creature is already a horde; past that a GM wants troops. */
export const COUNT_MAX = 24

export const memberKey = (entry: CreatureIndexEntry): string =>
	`${entry.name}~${entry.tier}`

/** Index the roster by the key a saved encounter stores. */
export function keyedRoster(
	entries: CreatureIndexEntry[],
): Map<string, CreatureIndexEntry> {
	return new Map(entries.map((entry) => [memberKey(entry), entry]))
}

/**
 * Add one of a creature, or raise the count if they are already in the fight.
 *
 * A second Ghoul is never a second row. Two rows of the same creature would
 * each be priced on their own, and a troop is defined by how many stand
 * together, so splitting them would quietly change the total.
 */
export function addMember(
	encounter: Encounter,
	entry: CreatureIndexEntry,
	count = 1,
): Encounter {
	const key = memberKey(entry)
	const existing = encounter.members.find((member) => member.key === key)
	if (existing)
		return setCount(encounter, key, Math.min(COUNT_MAX, existing.count + count))
	return {
		...encounter,
		members: [
			...encounter.members,
			{ key, count: Math.min(COUNT_MAX, count), troop: false },
		],
	}
}

/** Setting a count to zero removes the member, so a stepper can reach empty. */
export function setCount(
	encounter: Encounter,
	key: string,
	count: number,
): Encounter {
	const clamped = Math.min(COUNT_MAX, Math.max(0, Math.round(count)))
	if (clamped === 0)
		return {
			...encounter,
			members: encounter.members.filter((member) => member.key !== key),
		}
	return {
		...encounter,
		members: encounter.members.map((member) =>
			member.key === key
				? {
						...member,
						count: clamped,
						// Dropping below three disbands the troop, the way the table
						// rules do, rather than leaving a two-member "troop" priced as one.
						troop: member.troop && clamped >= MIN_TROOP_SIZE,
					}
				: member,
		),
	}
}

export function setTroop(
	encounter: Encounter,
	key: string,
	troop: boolean,
): Encounter {
	return {
		...encounter,
		members: encounter.members.map((member) =>
			member.key === key ? { ...member, troop } : member,
		),
	}
}

export function toggleCircumstance(
	encounter: Encounter,
	id: string,
): Encounter {
	return {
		...encounter,
		circumstances: encounter.circumstances.includes(id)
			? encounter.circumstances.filter((c) => c !== id)
			: [...encounter.circumstances, id],
	}
}

/**
 * The rules' view of the encounter: one line per member, resolved against the
 * roster.
 *
 * A member whose creature is no longer in the roster is DROPPED rather than
 * priced at zero. A retired creature is not a free creature, and a total that
 * silently counts a missing one is worse than a shorter list.
 */
export function toLines(
	encounter: Encounter,
	roster: Map<string, CreatureIndexEntry>,
): EncounterLine[] {
	return encounter.members.flatMap((member) => {
		const entry = roster.get(member.key)
		if (!entry) return []
		return [
			{
				tier: entry.tier,
				category: entry.category,
				count: member.count,
				troop: member.troop,
			},
		]
	})
}

/**
 * How many a `lore.organization` preset adds.
 *
 * The roster writes counts as ranges ("4-6", "2-3"), and the LOW end is what a
 * preset adds: a GM who wants the big version of a pack raises the stepper,
 * whereas one who did not notice the preset was a range has been handed a
 * harder fight than they asked for. Anything unparseable adds one.
 */
export function presetCount(count: string): number {
	const first = count.match(/\d+/)
	return first ? Math.min(COUNT_MAX, Math.max(1, Number(first[0]))) : 1
}

/** Members whose creature the roster no longer has, so the panel can say so. */
export function missingMembers(
	encounter: Encounter,
	roster: Map<string, CreatureIndexEntry>,
): EncounterMember[] {
	return encounter.members.filter((member) => !roster.has(member.key))
}

/** Total life in the fight, for the "what am I actually chewing through" line. */
export function totalHitPoints(
	encounter: Encounter,
	roster: Map<string, CreatureIndexEntry>,
): number {
	return encounter.members.reduce((sum, member) => {
		const entry = roster.get(member.key)
		if (!entry) return sum
		const match = entry.hp.trim().match(/^(\d+)\s*[x×]\s*(\d+)$/i)
		const each = match ? Number(match[1]) * Number(match[2]) : Number(entry.hp)
		return sum + (Number.isFinite(each) ? each * member.count : sum)
	}, 0)
}

/**
 * The encounter as query parameters, appended to the browser's own filter
 * state so one URL carries the whole view.
 *
 * `~` separates a member's fields because it appears in no creature name, and
 * a hyphen does: "Orc Band-Leader" would have split in the middle.
 */
export function encodeEncounter(encounter: Encounter): string {
	const params = new URLSearchParams()
	if (encounter.members.length === 0 && encounter.circumstances.length === 0)
		return ''
	if (encounter.members.length > 0)
		params.set(
			'enc',
			encounter.members
				.map(
					(member) =>
						`${member.key}~${member.count}${member.troop ? '~t' : ''}`,
				)
				.join(','),
		)
	params.set('party', `${encounter.party.size}x${encounter.party.level}`)
	if (encounter.circumstances.length > 0)
		params.set('when', encounter.circumstances.join(','))
	return params.toString()
}

/**
 * Read an encounter back out of a query string.
 *
 * Every field is clamped and every member checked against the roster, because
 * a URL is user input and a shared link outlives the roster it was built from.
 * A link naming a creature who has since been renamed loses that creature and
 * keeps the rest, rather than failing whole.
 */
export function decodeEncounter(
	query: string,
	roster: Map<string, CreatureIndexEntry>,
	circumstanceIds: string[],
): Encounter {
	const params = new URLSearchParams(query)
	const party = params.get('party')?.match(/^(\d+)x(\d+)$/)
	const members: EncounterMember[] = []
	for (const raw of (params.get('enc') ?? '').split(',').filter(Boolean)) {
		const parts = raw.split('~')
		// name ~ tier ~ count [~ t]
		if (parts.length < 3) continue
		const key = `${parts[0]}~${parts[1]}`
		const entry = roster.get(key)
		if (!entry) continue
		const count = Math.min(COUNT_MAX, Math.max(1, Number(parts[2]) || 1))
		members.push({
			key,
			count,
			troop:
				parts[3] === 't' &&
				entry.category === 'Basic' &&
				count >= MIN_TROOP_SIZE,
		})
	}
	return {
		party: {
			size: party
				? Math.min(PARTY_SIZE_MAX, Math.max(1, Number(party[1])))
				: DEFAULT_PARTY.size,
			level: party
				? Math.min(PARTY_LEVEL_MAX, Math.max(0, Number(party[2])))
				: DEFAULT_PARTY.level,
		},
		members,
		circumstances: (params.get('when') ?? '')
			.split(',')
			.filter((id) => circumstanceIds.includes(id)),
	}
}

/** Saved encounters, by name, in the GM's own browser. */
export interface SavedEncounter {
	name: string
	encounter: Encounter
}

const STORAGE_KEY = 'nexus.bestiary.encounters'

/**
 * Storage is best-effort on purpose.
 *
 * A GM with storage disabled, a full quota, or a private window still gets a
 * working tool. Losing the saved list is a disappointment. A thrown
 * `QuotaExceededError` taking the whole encounter panel down mid-session is a
 * defect.
 */
export function loadSaved(): SavedEncounter[] {
	if (typeof window === 'undefined') return []
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY)
		const parsed = raw ? JSON.parse(raw) : []
		if (!Array.isArray(parsed)) return []
		return parsed.filter(
			(item): item is SavedEncounter =>
				typeof item?.name === 'string' &&
				Array.isArray(item?.encounter?.members),
		)
	} catch {
		return []
	}
}

export function writeSaved(saved: SavedEncounter[]): void {
	if (typeof window === 'undefined') return
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved))
	} catch {
		/* see loadSaved */
	}
}

/** Saving under an existing name replaces it, the way a file dialog does. */
export function saveEncounter(
	saved: SavedEncounter[],
	name: string,
	encounter: Encounter,
): SavedEncounter[] {
	const trimmed = name.trim()
	if (!trimmed) return saved
	const without = saved.filter((item) => item.name !== trimmed)
	return [...without, { name: trimmed, encounter }].sort((a, b) =>
		a.name.localeCompare(b.name),
	)
}

import creaturesJson from '@site/src/utils/data/json/creatures.json'
import type { Ability, Attack, Creature } from '@site/src/types/Creature'
import { splitDamageText } from './creatureEntryText'

/**
 * The three places a printable creature can come from (M21 D1, D6).
 *
 * The deck had two — a character's companions and pasted markdown — and the
 * canonical catalogue that generates every tier page was simply not imported. A
 * GM preparing an encounter had to find the creature in the docs, copy its stat
 * block out as markdown and paste it back in.
 *
 * The companion and paste paths are unchanged in what they produce. What is new
 * is that all three now produce an ENTRY with an ID, because selection keyed by
 * name collapses a Wolf from the catalogue onto a Wolf companion (F7, and the
 * spell tool's F8 scar before it).
 */
export type CreatureSource = 'catalogue' | 'companion' | 'pasted'

export interface CreatureEntry {
	/**
	 * `catalogue:41:Wolf`, `companion:<docId>:Wolf`, `pasted:0:Wolf`.
	 *
	 * Unique across sources by construction, so two creatures of the same name
	 * from different sources are two selectable entries and print two cards.
	 *
	 * The catalogue ID carries the record's index as well as its name, because
	 * **a name is not unique inside `creatures.json` either**: Manticore is two
	 * different creatures (tier 3 Elite and tier 4 Basic) and Harpy is recorded
	 * twice. D6 proposed `catalogue:<name>`; measured against the data, that
	 * collapses three records onto two and React drops the duplicate card.
	 */
	id: string
	source: CreatureSource
	creature: Creature
}

/** A malformed catalogue entry, reported rather than silently dropped (S2). */
export interface CreatureAdaptError {
	index: number
	name: string
	reason: string
}

/** The JSON's own shape. It disagrees with `types/Creature.ts` on three fields (F2). */
interface RawAttack {
	name?: unknown
	properties?: unknown
	text?: unknown
	details?: unknown
}

interface RawAbility {
	name?: unknown
	qualifier?: unknown
	text?: unknown
}

interface RawCreature {
	name?: unknown
	tier?: unknown
	category?: unknown
	type?: unknown
	armor?: unknown
	hp?: unknown
	av?: unknown
	str?: unknown
	agi?: unknown
	spi?: unknown
	mnd?: unknown
	parry?: unknown
	dodge?: unknown
	resist?: unknown
	skills?: unknown
	immunities?: unknown
	resistances?: unknown
	weaknesses?: unknown
	attacks?: unknown
	abilities?: unknown
	quickActions?: unknown
	lore?: unknown
}

const asStrings = (value: unknown): string[] =>
	Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []

const asNumber = (value: unknown): number =>
	typeof value === 'number' ? value : Number(value ?? 0)

/**
 * The JSON's `text` is the app type's `description`, and its `qualifier` — the
 * fact the card has been dropping on the floor (F4) — has no field at all on the
 * app type until now.
 */
function adaptAbility(raw: RawAbility): Ability {
	return {
		name: String(raw.name ?? ''),
		description: String(raw.text ?? ''),
		...(typeof raw.qualifier === 'string' && raw.qualifier.trim()
			? { qualifier: raw.qualifier.trim() }
			: {}),
	}
}

/**
 * An attack's `text` carries both the damage triple and whatever follows it, and
 * the app type splits those into `damage` and `description`. The split is the
 * same one the docs generator makes, so the card can hand the triple to
 * `DamageLadder` and print the rest as prose (D3).
 */
function adaptAttack(raw: RawAttack): Attack {
	// The SAME split the markdown path uses (`creatureEntryText`). Two sources
	// with two ideas of what `damage` holds is what printed the Floating Eye's
	// bite as a ladder reading `12 / 17 / 22 damage.`
	return {
		name: String(raw.name ?? ''),
		properties: asStrings(raw.properties),
		...splitDamageText(String(raw.text ?? '')),
		...(asStrings(raw.details).length > 0
			? { details: asStrings(raw.details) }
			: {}),
	}
}

/**
 * Adapt one raw record, or say why it cannot be adapted.
 *
 * A creature with no name or no tier is a data fault, and the tool states it —
 * dropping it silently is how a GM finds out mid-session that the thing they
 * selected never printed.
 */
export function adaptCreature(
	raw: RawCreature,
): { creature: Creature } | { reason: string } {
	const name = typeof raw.name === 'string' ? raw.name.trim() : ''
	if (!name) return { reason: 'missing name' }
	if (typeof raw.tier !== 'number') return { reason: 'missing or non-numeric tier' }
	if (typeof raw.category !== 'string' || !raw.category.trim())
		return { reason: 'missing category' }

	return {
		creature: {
			name,
			tier: raw.tier,
			category: raw.category,
			type: String(raw.type ?? ''),
			armor: String(raw.armor ?? ''),
			hp: String(raw.hp ?? ''),
			av: String(raw.av ?? ''),
			str: String(raw.str ?? ''),
			agi: String(raw.agi ?? ''),
			spi: String(raw.spi ?? ''),
			mnd: String(raw.mnd ?? ''),
			parry: asNumber(raw.parry),
			dodge: asNumber(raw.dodge),
			resist: asNumber(raw.resist),
			skills: asStrings(raw.skills),
			immunities: asStrings(raw.immunities),
			resistances: asStrings(raw.resistances),
			weaknesses: asStrings(raw.weaknesses),
			attacks: (Array.isArray(raw.attacks) ? raw.attacks : []).map(adaptAttack),
			abilities: (Array.isArray(raw.abilities) ? raw.abilities : []).map(
				adaptAbility,
			),
			quickActions: (Array.isArray(raw.quickActions) ? raw.quickActions : []).map(
				adaptAbility,
			),
			...(raw.lore !== undefined ? { lore: raw.lore } : {}),
		},
	}
}

export interface CreatureCatalogue {
	entries: CreatureEntry[]
	errors: CreatureAdaptError[]
}

/**
 * The whole catalogue, sorted by tier then name — the order a GM browses it in,
 * since an encounter is built at a tier.
 */
export function creatureEntries(
	source: readonly unknown[] = creaturesJson as unknown[],
): CreatureCatalogue {
	const entries: CreatureEntry[] = []
	const errors: CreatureAdaptError[] = []

	source.forEach((raw, index) => {
		const adapted = adaptCreature((raw ?? {}) as RawCreature)
		if ('reason' in adapted) {
			errors.push({
				index,
				name:
					typeof (raw as RawCreature)?.name === 'string'
						? String((raw as RawCreature).name)
						: `#${index}`,
				reason: adapted.reason,
			})
			return
		}
		entries.push({
			id: catalogueId(index, adapted.creature.name),
			source: 'catalogue',
			creature: adapted.creature,
		})
	})

	entries.sort(
		(a, b) =>
			a.creature.tier - b.creature.tier ||
			a.creature.name.localeCompare(b.creature.name),
	)
	return { entries, errors }
}

export const catalogueId = (index: number, name: string) =>
	`catalogue:${index}:${name}`
export const companionId = (docId: string, name: string) =>
	`companion:${docId}:${name}`
export const pastedId = (index: number, name: string) =>
	`pasted:${index}:${name}`

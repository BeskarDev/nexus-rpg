/**
 * How a creature's entries group on a card, in ONE place (D-147, Q8T4.23).
 *
 * A creature is presented by WHEN A GM USES AN ENTRY, not by which array it was
 * authored in: an attack and an ability qualified `Action` are both things you
 * do on your turn, so they share a heading. Ordered by how often a fight needs
 * them, descending — every turn, every round, once at a Wound, then the standing
 * rules.
 *
 * It lived only in `generate-creatures.ts`, so the docs card and the PRINTED
 * card disagreed: the print tool still grouped by `Attacks` / `Abilities` /
 * `Quick Actions`, which is the shape of the RECORD rather than of a turn. Two
 * surfaces naming one section two different things is the drift the entry
 * contract in `creatureEntryText` was written to end, so the definition is
 * shared rather than copied.
 *
 * **The markdown interchange format deliberately does NOT move with it.** The
 * builder emits `**Attacks:**` and `**Abilities:**` because markdown mirrors the
 * record's two arrays, and those arrays carry different fields and different
 * validation (`weapon`, `quality`, `properties`, the damage ladder, D-133's
 * catalogue check). Merging them under one `**Actions:**` heading would make the
 * format unreadable back in — a line under it could be either kind — so grouping
 * stays what it is on both surfaces: presentation, derived from the qualifier at
 * render time.
 */
export const CREATURE_SECTIONS = [
	{ label: 'Actions', qualifiers: ['Action'], withAttacks: true },
	{ label: 'Quick Actions', qualifiers: ['Quick Action'], withAttacks: false },
	{
		label: 'Triggers',
		qualifiers: ['Elite Trigger', 'Lord Trigger'],
		withAttacks: false,
	},
	{ label: 'Passives', qualifiers: ['Passive'], withAttacks: false },
] as const

export type CreatureSectionLabel = (typeof CREATURE_SECTIONS)[number]['label']

/** The section a `Quick Action` markdown heading implies for an entry under it. */
export const QUICK_ACTION_QUALIFIER = 'Quick Action'

/** The section an unrecognised qualifier falls back to on a printed card. */
export const FALLBACK_SECTION: CreatureSectionLabel = 'Passives'

/**
 * The section one qualifier belongs to, or `null` when it names none.
 *
 * A qualifier is a comma-separated run — `Passive, 3/day`, `Action, recharge
 * (d6)` — whose FIRST part says when the entry is used and whose rest is a
 * limit. Only the first part decides the section; the nested parenthetical in
 * `recharge (d6)` carries no comma and stays whole either way.
 *
 * `null` rather than a default, because the two callers want opposite things
 * from an unknown value: the generator treats it as a data fault and fails the
 * build, while a printed card is fed hand-written markdown (Companion Traits
 * writes `**Flying (hover).**`) and must never drop an entry it cannot classify.
 */
export function sectionForQualifier(
	qualifier?: string,
): CreatureSectionLabel | null {
	const when = (qualifier ?? '').split(',')[0].trim()
	if (!when) return null
	const group = CREATURE_SECTIONS.find((section) =>
		(section.qualifiers as readonly string[]).includes(when),
	)
	return group ? group.label : null
}

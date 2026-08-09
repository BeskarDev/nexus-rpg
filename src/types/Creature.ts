export interface Creature {
	name: string
	tier: number
	category: string // Basic, Elite, Lord
	/**
	 * Size, one of `creature-sizes.json`. Split out of `type` so the three axes
	 * a creature is sorted on — size, type, subtype — are each their own field
	 * and each independently checkable.
	 *
	 * Optional because the markdown card parser (Companion Traits, the print
	 * tool) still produces a combined `type` string. Records in
	 * `creatures.json` always carry it.
	 */
	size?: string
	/**
	 * One of the twelve primary types in `creature-types.json`. Legacy markdown
	 * cards put size and type in this one field ("Medium Undead"); JSON records
	 * carry the bare type and put the size in `size`.
	 */
	type: string
	/**
	 * Subtypes from `creature-subtypes.json`, plus any cross-cutting additive
	 * from `creature-additives.json`.
	 *
	 * An **array** because additives compose with the primary value rather than
	 * replacing it: a werewolf is `["Human", "Shapechanger"]`, an Urduk
	 * fire-elemental automaton is `["Vessel", "Intelligent"]`. Undead and
	 * Automaton must carry exactly one of `Mindless` / `Intelligent`.
	 */
	subtype?: string[]
	armor: string // Armor category, e.g. "Light", "Heavy", "None"
	hp: string // Can be a number like "50" or a pattern like "2×50" for elite/lord
	av: string
	str: string
	agi: string
	spi: string
	mnd: string
	parry: number
	dodge: number
	resist: number
	skills: string[]
	immunities: string[]
	resistances: string[]
	weaknesses: string[]
	attacks: Attack[]
	abilities: Ability[]
	/**
	 * **Legacy — markdown cards only.** Quick Actions used to be a separate list
	 * from `abilities` because the stat block presented them as their own block.
	 *
	 * Removed from the creature record (D-005): a Quick Action is an ability
	 * whose `qualifier` says so, and grouping is the qualifier's job. The field
	 * survives here solely because the markdown parser still reads a
	 * `**Quick Actions:**` section out of Companion Traits, whose cleanup is
	 * deferred (D-009). New JSON records never carry it.
	 */
	quickActions?: Ability[]
	/**
	 * Non-mechanical flavour, carried through from `creatures.json` for whatever
	 * reads it next. One creature in the corpus has it, and a printed card does
	 * not show it: a card is for play, and the lore block runs to paragraphs.
	 */
	lore?: unknown
}

export interface Attack {
	name: string
	properties: string[]
	damage: string
	/**
	 * The damage TYPE, when the attack opens with a clean typed triple
	 * (`4/6/8 fire damage.`). It rides inside the `DamageLadder` on the card,
	 * exactly as the docs generator passes it as the ladder's children.
	 */
	damageType?: string
	description?: string
	/**
	 * A sub-list under the attack — the Beholder Spawn's eye rays are the one
	 * consumer in the corpus. The docs generator renders these as a nested list
	 * and so does the card (M21 D3).
	 */
	details?: string[]
}

export interface Ability {
	name: string
	description: string
	recharge?: string
	/**
	 * How the ability is used: `Passive`, `Action`, `Quick Action`,
	 * `Action, recharge (d6)`, `Elite Trigger`. All 402 abilities in
	 * `creatures.json` carry one, and it is load bearing — without it a printed
	 * card cannot tell a Lord's trigger from a passive (M21 F4).
	 *
	 * Comma-separated, and each part prints as its own slab, exactly as the docs
	 * generator splits it into one `StatBadge` each.
	 */
	qualifier?: string
}

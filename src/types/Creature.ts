export interface Creature {
	name: string
	tier: number
	category: string // Basic, Elite, Lord
	type: string // e.g., "Medium Undead"
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
	 * Quick Actions, the creature's off-turn options. A separate list from
	 * `abilities` because the stat block presents them as their own block. They
	 * used to be swallowed into `abilities` by a greedy section regex, so printed
	 * cards showed them unlabeled among the passives.
	 */
	quickActions: Ability[]
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

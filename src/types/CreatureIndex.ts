/**
 * The bestiary browser's data payload: every creature in `creatures.json`
 * stripped of its lore prose.
 *
 * ## Why an index exists at all
 *
 * `creatures.json` is the canonical roster and everything here is derived from
 * it — but it cannot be what the browser imports. Roughly four fifths of its
 * bytes are `lore.narrative`, `ecology`, `tactics`, `physiology` and the
 * treasure tables: paragraphs a GM reads on the creature's own page, not fields
 * anyone filters or sorts on. Importing the canonical file would ship all of it
 * into the site bundle, because a JSON import is opaque to tree-shaking — no
 * bundler can tell that a field is never read. At the roster's target size that
 * is most of a megabyte of prose downloaded to render a table of numbers.
 *
 * So the generator writes this instead: the mechanical fields, the two lore
 * fields that ARE filters (`environment`, `organization`), and a link back to
 * the full entry. Lore stays one click away on the tier page, where it was
 * always meant to be read.
 *
 * ## What is NOT here, deliberately
 *
 * - **Trait text.** Traits are carried by name and resolved against
 *   `creature-traits.json`, which the browser imports directly. `Undead Nature`
 *   is written once and shipped once, not copied into every undead entry.
 * - **Threat points.** How dangerous a creature is for a given party is the
 *   encounter model's job (`threat.ts`), and that model will be revised. Baking
 *   its output into generated data would freeze a policy decision into a cache.
 * - **Search blobs.** A lowercased concatenation of every field is cheap to
 *   build at runtime and expensive to ship.
 */
export interface CreatureIndex {
	/** Do-not-edit banner. JSON has no comments, so it rides as a field. */
	$generated: string
	creatures: CreatureIndexEntry[]
}

export interface CreatureIndexEntry {
	/**
	 * `catalogue:<roster index>:<name>`, the same identity the Creature Cards
	 * print tool builds for the same record.
	 *
	 * It is a within-session identity only, and the ROW's identity rather than
	 * the creature's: the index is the record's position in `creatures.json`,
	 * which moves whenever a creature is written above them. Anything that
	 * outlives a page load keys on `<name>~<tier>` instead, which is what the
	 * encounter builder saves by, shares by, and hands to the print deck. The
	 * tier is part of it because a name is not unique in the roster: Manticore
	 * has existed as both a tier 3 Elite and a tier 4 Basic.
	 */
	id: string
	name: string
	/** Deep link to the creature's heading on its tier page. */
	href: string
	tier: number
	/** Basic, Elite, or Lord. */
	category: string
	/**
	 * Tactical role from `creature-archetypes.json`. Optional in the type because
	 * the field is optional in the roster, though every current entry carries one.
	 */
	role?: string
	size: string
	type: string
	subtype: string[]
	armor: string
	hp: string
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
	/** Trait NAMES; resolve text against `creature-traits.json`. */
	traits: string[]
	attacks: CreatureIndexEntryLine[]
	abilities: CreatureIndexEntryLine[]
	/**
	 * Habitat terms from `creature-environments.json`, ordered region before
	 * site. The primary filter axis: a GM knows where their party is standing.
	 */
	environment: string[]
	/**
	 * How many of this creature are met at once, as authored in the roster.
	 *
	 * The encounter builder offers these as one-click group sizes, so "a pack of
	 * jackals" is a designed number rather than a GM's guess.
	 */
	organization: CreatureIndexOrganization[]
}

/** One attack or ability row, as the stat block renders it. */
export interface CreatureIndexEntryLine {
	name: string
	/** Passive, Quick Action, Action, Elite Trigger, Lord Trigger. */
	qualifier?: string
	/** Attacks only: weapon properties such as `pierce`, `reach`. */
	properties?: string[]
	text: string
	details?: string[]
}

export interface CreatureIndexOrganization {
	name: string
	/** Exactly one of `count` or `composition`, as in the roster. */
	count?: string
	composition?: { count: string; creature: string }[]
}

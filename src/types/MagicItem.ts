/**
 * The item categories a printed card can carry (M19 D8).
 *
 * Extended from the original four (`Weapon | Wearable | Consumable | Spell
 * Scroll`) to the vocabulary the item system itself publishes —
 * `docs/analysis/magic-items/MAGIC_ITEM_SYSTEM_ANALYSIS.md` §2.1 and its
 * catalogs — so a character's lantern has somewhere to go and the model is
 * ready for that work rather than needing a second migration when it lands.
 *
 * Two deliberate omissions. There is no `role` (Offense / Defense / Healing /
 * Control / Support / Utility): that is a treasure-GENERATION axis and means
 * nothing on a printed card. And none of the original four names changed, so
 * every pasted JSON and every existing catalogue keeps parsing.
 */
export type MagicItemCategory =
	| 'Weapon'
	| 'Ammo' // priced per batch of 3
	| 'Armor' // helmets fold in here
	| 'Shield' // split from armor per the analysis §3.1
	| 'Wearable'
	| 'Consumable'
	| 'Spell Scroll'
	| 'Wand' // one spell, 4–20 charges
	| 'Staff' // 3–6 spells
	| 'Utility' // the slotless space: lanterns, tools, scene items
	| 'Material' // special materials
	| 'Artifact' // Q8, GM-built

/** Every category, in the order a filter should list them. */
export const magicItemCategories: MagicItemCategory[] = [
	'Weapon',
	'Ammo',
	'Armor',
	'Shield',
	'Wearable',
	'Consumable',
	'Spell Scroll',
	'Wand',
	'Staff',
	'Utility',
	'Material',
	'Artifact',
]

export type MagicItem = {
	name: string
	category: MagicItemCategory
	quality: number
	type: string
	material?: string
	cost: number
	load: number
	properties?: string
	/**
	 * A weapon's own damage bonus — `+4`.
	 *
	 * NOT a total, and not a formula. A character's damage is the weapon plus
	 * their attribute and their talents, and only the sheet can be right about
	 * that (M19 D7). What the card carries is what the OBJECT contributes, which
	 * is why it reads beside the load and the cost rather than in the head.
	 */
	damage?: string
	/**
	 * CHARGES — what a wand or a consumable has left to spend.
	 *
	 * Not to be confused with the character sheet's `uses`, which is a 0–3
	 * DAMAGE state where 3 means broken (M19 F2). Nothing maps one onto the
	 * other, and `characterTreasure` deliberately leaves this undefined.
	 */
	uses?: number
	description: string
}

import type { SigilName } from '@site/src/components/codex/SigilIcon'
import type { ItemCategory } from '../utils/magicItemsConfig'

/**
 * An item category's mark, and its name in the reader's words (M13 S8).
 *
 * ## What this replaces
 *
 * `weaponCategoryColorMap` — nine weapon categories mapped onto MUI's SEMANTIC
 * palette, so an Axe was `error`, a Bow was `success` and a Crossbow was `info`.
 * Three faults in one device, and all three have been deleted twice already in this
 * milestone (S8's four `get*Color` functions, and the Companion Builder's
 * `getTypeColor`):
 *
 * - it is Material's voice, not the codex's;
 * - the hues carry no meaning — "error" for an axe is the palette's word, not the
 *   game's — while looking exactly like the ones that do;
 * - a saturated fill on carved stone is the colour MASS the theme forbids.
 *
 * Identity lives in the MARK and the word instead. Every sigil here is existing
 * geometry, so nothing is added to `stat-sigils.ts` and the F7 collision check is
 * untouched.
 */
export const CATEGORY_SIGIL: Record<ItemCategory, SigilName> = {
	'one-handed-weapon': 'sword',
	'two-handed-weapon': 'axe',
	'spell-catalyst': 'orb',
	// Leather and cloth, held on by straps and a belt — the knot is the fastening.
	// `breastplate` is the plate armour below it and is also what AV wears, so the
	// two armour categories must not share it.
	'light-armor': 'knot',
	'heavy-armor': 'breastplate',
	shield: 'shield',
	helmet: 'cowl',
	// A worn ornament: a set stone. Same reasoning as the sheet's `slot-ring`.
	wearable: 'gem',
	ammo: 'bolt',
}

/** The category names as a player would say them, not as the union spells them. */
export const CATEGORY_LABEL: Record<ItemCategory, string> = {
	'one-handed-weapon': 'One-handed',
	'two-handed-weapon': 'Two-handed',
	'spell-catalyst': 'Catalyst',
	'light-armor': 'Light armor',
	'heavy-armor': 'Heavy armor',
	shield: 'Shield',
	helmet: 'Helmet',
	wearable: 'Wearable',
	ammo: 'Ammo',
}

export const CATEGORIES = Object.keys(CATEGORY_LABEL) as ItemCategory[]

/** The categories that produce a `Weapon`, which is what gets a damage figure. */
export const WEAPON_CATEGORIES: ItemCategory[] = [
	'one-handed-weapon',
	'two-handed-weapon',
	'shield',
]

/** The categories that carry an Armor Value. */
export const ARMOR_CATEGORIES: ItemCategory[] = [
	'light-armor',
	'heavy-armor',
	'shield',
	'helmet',
]

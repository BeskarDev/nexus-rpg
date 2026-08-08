import type { Item } from '@site/src/types/Character'

/** The Quality rating an item can carry — 1 (primitive) to 8 (mythical). */
export type ItemQuality = NonNullable<Item['quality']>

export const ITEM_QUALITIES: ItemQuality[] = [1, 2, 3, 4, 5, 6, 7, 8]

/**
 * The published Quality descriptors, from `docs/04-equipment/01-items.md` (S4d).
 *
 * The sheet had its own list — "Masterwork", "Lesser Magic", "Potent Magic",
 * "Greater Magic", "Superior Magic", "Supreme Magic" — starting at Q3 and running to
 * Q8. Three things wrong with it: two ratings were **missing** (an item can be Q1 or
 * Q2 and the dropdown could not say so), the words were not the game's words, and
 * they described only magic items, so a Q4 rope was labelled "Lesser Magic".
 *
 * The rule is a table in the equipment chapter and this is that table's naming, so
 * the sheet and the book now agree. `qualityTierLabels` in `magicItemsConfig` is
 * NOT this: it belongs to the magic-item builder's cost maths, which is defined for
 * Q3-Q8 only and keys several `Record`s by that narrower type.
 */
export const ITEM_QUALITY_LABELS: Record<ItemQuality, string> = {
	1: 'primitive',
	2: 'simple',
	3: 'complex',
	4: 'formidable',
	5: 'exceptional',
	6: 'epic',
	7: 'legendary',
	8: 'mythical',
}

/**
 * How a quality reads in a RECORD: the rating alone.
 *
 * The descriptor belongs in the dropdown, where a player is choosing and needs to
 * know what the numbers mean. In the record it is one fact among eight in a narrow
 * column, and "Q4 (formidable)" there is a paragraph where a value goes — the number
 * is the mechanical handle, and the word is recoverable by opening the list (S4d,
 * owner review).
 */
export const qualityShort = (quality: ItemQuality) => `Q${quality}`

/** How it reads in the dropdown: rating and descriptor. */
export const qualityLong = (quality: ItemQuality) =>
	`Q${quality} (${ITEM_QUALITY_LABELS[quality]})`

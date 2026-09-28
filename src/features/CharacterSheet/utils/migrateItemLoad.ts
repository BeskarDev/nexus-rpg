/**
 * Renames an item's legacy `weight` field to `load`.
 *
 * "Load" is the game's term: it folds an item's weight and bulk into one number, so
 * the field carries that name too (owner ruling, 2026-09-28). Older documents stored
 * it as `weight`, because the equipment search imported it under that name, and the
 * row editor wrote both. When both exist, `load` wins, since it is the one every
 * editor has written since. The `weight` key is removed, so a migrated document holds
 * one field and saves back without it.
 */
export const migrateItemLoad = <T extends object>(item: T): T => {
	if (!item || !('weight' in item)) return item
	const { weight, ...rest } = item as T & { weight?: unknown; load?: unknown }
	return {
		...rest,
		load: rest.load ?? (Number(weight) || 0),
	} as unknown as T
}

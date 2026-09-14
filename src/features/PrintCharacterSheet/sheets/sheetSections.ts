import { StatisticsSheet } from './1_Statistics'
import { EquipmentSheet } from './2_Equipment'
import { SpellsSheet } from './3_Spells'
import { PersonalSheet } from './4_Personal'

/**
 * The four sections, in print order (M22 S4).
 *
 * Named once so the stated count, the preview and the printed output all come
 * from the same list — and now so that the Print Everything page prints the
 * same four in the same order as the character sheet tool, rather than its own
 * idea of what a sheet is.
 */
export const CHARACTER_SHEETS = [
	{ key: 'statistics', Sheet: StatisticsSheet },
	{ key: 'equipment', Sheet: EquipmentSheet },
	{ key: 'spells', Sheet: SpellsSheet },
	{ key: 'personal', Sheet: PersonalSheet },
] as const

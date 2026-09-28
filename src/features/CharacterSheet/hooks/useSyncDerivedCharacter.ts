import { useEffect } from 'react'
import { CharacterDocument } from '@site/src/types/Character'
import { DeepPartial } from '../CharacterSheetContainer'
import { characterSheetActions } from '../characterSheetReducer'
import { DerivedCharacter } from '../utils/deriveCharacter'
import { useAppDispatch } from './useAppDispatch'

/**
 * The stored copies of derived values that no longer match the derivation, as one
 * partial update, or `null` when every copy is current.
 *
 * The sheet itself never reads these copies back: every tab and the print sheets
 * read `deriveCharacter`. They are kept because readers OUTSIDE the sheet see only
 * the stored document: the party view reads `skills.xp.spend`, the JSON export is
 * the raw document, and older app versions read the totals.
 */
export const staleDerivedFields = (
	character: CharacterDocument,
	derived: DerivedCharacter,
): DeepPartial<CharacterDocument> | null => {
	const { statistics, skills, spells, items } = character
	const update: DeepPartial<CharacterDocument> = {}
	const stats: DeepPartial<CharacterDocument['statistics']> = {}

	if (skills?.xp && skills.xp.spend !== derived.spentXp) {
		update.skills = { xp: { spend: derived.spentXp } }
	}

	if (statistics.health && statistics.health.auto !== derived.hp.auto) {
		stats.health = { auto: derived.hp.auto }
	}

	const av = statistics.av
	if (
		av &&
		(av.armor !== derived.av.armor ||
			av.helmet !== derived.av.helmet ||
			av.shield !== derived.av.shield ||
			av.auto !== derived.av.auto)
	) {
		stats.av = {
			armor: derived.av.armor,
			helmet: derived.av.helmet,
			shield: derived.av.shield,
			auto: derived.av.auto,
		}
	}

	const pd = statistics.parryDetails
	if (
		pd &&
		(pd.base !== derived.parry.base ||
			pd.levelBonus !== derived.parry.levelBonus ||
			pd.shieldBonus !== derived.parry.shieldBonus)
	) {
		stats.parryDetails = {
			base: derived.parry.base,
			levelBonus: derived.parry.levelBonus,
			shieldBonus: derived.parry.shieldBonus,
		}
	}
	for (const key of ['dodgeDetails', 'resistDetails'] as const) {
		const details = statistics[key]
		const value = key === 'dodgeDetails' ? derived.dodge : derived.resist
		if (
			details &&
			(details.base !== value.base || details.levelBonus !== value.levelBonus)
		) {
			stats[key] = { base: value.base, levelBonus: value.levelBonus }
		}
	}
	if (statistics.parry !== derived.parry.total)
		stats.parry = derived.parry.total
	if (statistics.dodge !== derived.dodge.total)
		stats.dodge = derived.dodge.total
	if (statistics.resist !== derived.resist.total)
		stats.resist = derived.resist.total

	if (Object.keys(stats).length > 0) update.statistics = stats

	if (
		spells?.focus &&
		(spells.focus.auto !== derived.focus.auto ||
			spells.focus.total !== derived.focus.max)
	) {
		update.spells = {
			focus: { auto: derived.focus.auto, total: derived.focus.max },
		}
	}

	const enc = items?.encumbrance
	if (
		enc &&
		(enc.currentLoad !== derived.load.current ||
			enc.encumberedAt !== derived.load.carryCapacity ||
			enc.overencumberedAt !== derived.load.maxCapacity)
	) {
		update.items = {
			encumbrance: {
				currentLoad: derived.load.current,
				encumberedAt: derived.load.carryCapacity,
				overencumberedAt: derived.load.maxCapacity,
			},
		}
	}

	return Object.keys(update).length > 0 ? update : null
}

/**
 * The ONE write-back of derived values, run once at the sheet's root.
 *
 * It replaces six effects spread across the Skills, Items and defence cards, which
 * wrote overlapping fields with different rules (two of them computed "armor
 * equipped" differently) and only ran while their own tab was mounted.
 */
export const useSyncDerivedCharacter = (
	character: CharacterDocument,
	derived: DerivedCharacter,
) => {
	const dispatch = useAppDispatch()
	useEffect(() => {
		const update = staleDerivedFields(character, derived)
		if (update) dispatch(characterSheetActions.updateCharacter(update))
	}, [character, derived, dispatch])
}

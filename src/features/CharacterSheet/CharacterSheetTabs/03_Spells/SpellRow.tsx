import React, { useEffect, useMemo, useState } from 'react'
import { RangeType, Spell, TargetType } from '../../../../types/Character'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { UnifiedListItem } from '@site/src/features/CharacterSheet/components/DynamicList'
import { SpellSummary, SpellDetails } from './components'
import { SPELL_TEMPLATE } from './components/spellColumns'

export type SpellRowProps = {
	spell: Spell
	updateSpell: (update: Partial<Spell>) => void
	deleteSpell: () => void
	isInQuickRef?: boolean
	onToggleQuickRef?: (spellId: string) => void
}

/**
 * One spell, as a ledger row that opens into its record (M13 S5).
 *
 * The local `spell` state is the sheet's standard draft pattern: text fields edit
 * locally and commit on blur, so a name is not dispatched per keystroke. Everything
 * else dispatches immediately, which is why the summary reads `initialSpell` for those
 * fields — the row must show what the store holds, not a draft that never changed.
 */
export const SpellRow: React.FC<SpellRowProps> = ({
	spell: initialSpell,
	updateSpell,
	deleteSpell,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	const [spell, setSpell] = useState<Spell>(initialSpell)
	// Sync local edit state when the spell changes externally (e.g. the
	// "refresh from rulebook" bulk update), otherwise the row keeps showing
	// the stale values it was mounted with.
	useEffect(() => {
		setSpell(initialSpell)
	}, [initialSpell])
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)

	// `rank × 2` is the rule, and the derived value is written back so every other
	// surface (Quick Ref, the cast) reads one number rather than re-deriving it.
	const spellCost = useMemo(() => {
		const newSpellCost = initialSpell.rank * 2
		if (newSpellCost !== initialSpell.cost) {
			updateSpell({ cost: newSpellCost })
		}
		return newSpellCost
	}, [initialSpell])

	const castSpell = () => {
		const newFocusValue = Math.max(
			0,
			activeCharacter.spells.focus.current - spellCost,
		)
		dispatch(
			characterSheetActions.updateCharacter({
				spells: {
					focus: { current: newFocusValue },
				},
			}),
		)
	}

	return (
		<UnifiedListItem
			summaryClassName="cs-ledger-row-grid"
			summarySx={{ gridTemplateColumns: SPELL_TEMPLATE, columnGap: 1 }}
			summaryContent={
				<SpellSummary
					spell={initialSpell}
					spellCost={spellCost}
					onCast={castSpell}
				/>
			}
			detailsContent={
				<SpellDetails
					spell={{
						...spell,
						...initialSpell,
						name: spell.name,
						properties: spell.properties,
						effect: spell.effect,
					}}
					spellCost={spellCost}
					onNameChange={(name) => setSpell((s) => ({ ...s, name }))}
					onNameBlur={() => updateSpell({ name: spell.name })}
					onRankChange={(rank) => updateSpell({ rank })}
					onPropertiesChange={(properties) =>
						setSpell((s) => ({ ...s, properties }))
					}
					onPropertiesBlur={() => updateSpell({ properties: spell.properties })}
					onEffectChange={(effect) => setSpell((s) => ({ ...s, effect }))}
					onEffectBlur={() => updateSpell({ effect: spell.effect })}
					onDealsDamageChange={(dealsDamage) => updateSpell({ dealsDamage })}
					onDamageUpdate={(update) =>
						updateSpell({ damage: { ...initialSpell.damage, ...update } })
					}
					onTargetChange={(target) =>
						updateSpell({ target: target as TargetType })
					}
					onRangeChange={(range) => updateSpell({ range: range as RangeType })}
					onDelete={deleteSpell}
					isInQuickRef={isInQuickRef}
					onToggleQuickRef={onToggleQuickRef}
				/>
			}
		/>
	)
}

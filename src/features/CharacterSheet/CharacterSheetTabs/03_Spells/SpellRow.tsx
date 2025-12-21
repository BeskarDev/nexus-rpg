import React, { useMemo, useState } from 'react'
import { RangeType, Spell, TargetType } from '../../../../types/Character'
import { characterSheetActions } from '../../characterSheetReducer'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { UnifiedListItem } from '@site/src/components/DynamicList'
import { SpellSummary, SpellDetails } from './components'

export type SpellRowProps = {
	spell: Spell
	updateSpell: (update: Partial<Spell>) => void
	deleteSpell: () => void
	isInQuickRef?: boolean
	onToggleQuickRef?: (spellId: string) => void
}

export const SpellRow: React.FC<SpellRowProps> = ({
	spell: initialSpell,
	updateSpell,
	deleteSpell,
	isInQuickRef = false,
	onToggleQuickRef,
}) => {
	const [spell, setSpell] = useState<Spell>(initialSpell)
	const dispatch = useAppDispatch()
	const { activeCharacter } = useAppSelector((state) => state.characterSheet)

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
			activeCharacter.spells.focus.current - spell.cost,
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
			summaryContent={
				<SpellSummary
					spell={{ ...spell, rank: initialSpell.rank, target: initialSpell.target, range: initialSpell.range, dealsDamage: initialSpell.dealsDamage, damage: initialSpell.damage }}
					spellCost={spellCost}
					onCast={castSpell}
					onRankChange={(rank) => updateSpell({ rank })}
					onNameChange={(name) => setSpell((s) => ({ ...s, name }))}
					onNameBlur={() => updateSpell({ name: spell.name })}
					onPropertiesChange={(properties) =>
						setSpell((s) => ({ ...s, properties }))
					}
					onPropertiesBlur={() => updateSpell({ properties: spell.properties })}
					onDamageUpdate={(update) =>
						updateSpell({ damage: { ...initialSpell.damage, ...update } })
					}
				/>
			}
			detailsContent={
				<SpellDetails
					spell={{ ...spell, target: initialSpell.target, range: initialSpell.range, dealsDamage: initialSpell.dealsDamage, id: initialSpell.id }}
					onPropertiesChange={(properties) =>
						setSpell((s) => ({ ...s, properties }))
					}
					onPropertiesBlur={() => updateSpell({ properties: spell.properties })}
					onEffectChange={(effect) => setSpell((s) => ({ ...s, effect }))}
					onEffectBlur={() => updateSpell({ effect: spell.effect })}
					onDealsDamageChange={(dealsDamage) => updateSpell({ dealsDamage })}
					onTargetChange={(target) => updateSpell({ target: target as TargetType })}
					onRangeChange={(range) => updateSpell({ range: range as RangeType })}
					onDelete={deleteSpell}
					isInQuickRef={isInQuickRef}
					onToggleQuickRef={onToggleQuickRef}
				/>
			}
		/>
	)
}

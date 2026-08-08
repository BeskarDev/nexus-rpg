import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import React from 'react'
import { setupCreatureBuilderStore } from '@site/src/features/CreatureBuilder/store'
import { creatureBuilderActions } from '@site/src/features/CreatureBuilder/creatureBuilderReducer'
import { useCreatureBuilderState } from '@site/src/hooks/useCreatureBuilderState'
import { templateToAttack } from '@site/src/components/CreatureBuilder/templates'
import attacksLibrary from '@site/src/utils/data/json/creature-attacks-library.json'
import type { AttackTemplate } from '@site/src/types/CreatureBuilder'

/**
 * Attack damage must follow the tier, and keep following it after the tier is
 * changed again.
 *
 * The builder used to compute the tier's weapon damage and then discard it,
 * passing `state.attacks` through untouched — so an attack added at tier 3 still
 * read as tier 3 on a tier 9 creature, silently, in the copied markdown.
 */

/** A fresh store per test, so one test's creature cannot leak into the next. */
const setUp = (tier: number) => {
	const store = setupCreatureBuilderStore()
	const wrapper = ({ children }: { children: React.ReactNode }) => (
		<Provider store={store}>{children}</Provider>
	)
	const hook = renderHook(() => useCreatureBuilderState(), { wrapper })
	act(() => {
		store.dispatch(creatureBuilderActions.setTier(tier))
	})
	return { store, ...hook }
}

/** Damage figures split out of a `weak/strong/critical` string. */
const figures = (damage: string) => damage.split('/').map(Number)

describe('creature builder — tier-scaled attack damage', () => {
	it('re-derives an attack when the tier changes afterwards', () => {
		const { store, result, rerender } = setUp(3)

		act(() => {
			store.dispatch(
				creatureBuilderActions.setAttacks([
					{ name: 'Bite', properties: [], damage: '' },
				]),
			)
		})
		rerender()
		const atTier3 = result.current.builtCreature!.attacks[0].damage

		act(() => {
			store.dispatch(creatureBuilderActions.setTier(9))
		})
		rerender()
		const atTier9 = result.current.builtCreature!.attacks[0].damage

		expect(atTier3).not.toBe(atTier9)
		// Strictly harder at every success level, not merely different.
		figures(atTier9).forEach((value, i) => {
			expect(value).toBeGreaterThan(figures(atTier3)[i])
		})
	})

	it('leaves an explicitly overridden damage figure alone', () => {
		const { store, result, rerender } = setUp(3)

		act(() => {
			store.dispatch(
				creatureBuilderActions.setAttacks([
					{ name: 'Fixed', properties: [], damage: '1/2/3' },
				]),
			)
		})
		act(() => {
			store.dispatch(creatureBuilderActions.setTier(9))
		})
		rerender()

		expect(result.current.builtCreature!.attacks[0].damage).toBe('1/2/3')
	})

	it('scales a library attack, which used to carry a frozen literal', () => {
		const bite = (attacksLibrary as AttackTemplate[]).find(
			(t) => t.id === 'bite',
		)!
		// The template must not carry a figure at all — that was the bug.
		expect(bite).not.toHaveProperty('damage')

		const { store, result, rerender } = setUp(2)
		act(() => {
			store.dispatch(
				creatureBuilderActions.setAttacks([templateToAttack(bite)]),
			)
		})
		rerender()
		const low = result.current.builtCreature!.attacks[0].damage

		act(() => {
			store.dispatch(creatureBuilderActions.setTier(8))
		})
		rerender()
		const high = result.current.builtCreature!.attacks[0].damage

		figures(high).forEach((value, i) => {
			expect(value).toBeGreaterThan(figures(low)[i])
		})
	})

	it('spaces the three success levels by the weapon damage, as the rules do', () => {
		const { store, result, rerender } = setUp(5)
		act(() => {
			store.dispatch(
				creatureBuilderActions.setAttacks([
					{ name: 'Plain', properties: [], damage: '' },
				]),
			)
		})
		rerender()

		const [weak, strong, critical] = figures(
			result.current.builtCreature!.attacks[0].damage,
		)
		// weak/2×weak/3×weak — a constant step, which is what `creatures.json`
		// shows at every tier. The old placeholder used a fixed +4 step instead.
		expect(strong - weak).toBe(weak)
		expect(critical - strong).toBe(weak)
	})
})

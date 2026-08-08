import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'
import React from 'react'
import { HpCard } from '../HpCard'
import {
	createCharacterDocument,
	createBasicCharacter,
} from '../../../../../../tests/utils/character-test-fixtures'
import {
	createInitialState,
	createTestStore,
} from '../../../../../../tests/utils/character-test-helpers'

/**
 * Damage resolution is the highest-risk logic S11 moved, so it is pinned here
 * rather than trusted to a screenshot: temp HP absorbs first, then the remainder
 * hits current HP, and wounds are reported both for dropping to zero and for
 * damage exceeding max HP once or twice over.
 */
const renderHp = (health: Partial<Record<string, number>>) => {
	const character = createCharacterDocument({
		...createBasicCharacter(),
		statistics: {
			...createBasicCharacter().statistics,
			health: {
				current: 20,
				temp: 0,
				maxHpModifier: 0,
				auto: 0,
				...health,
			} as never,
		},
	})
	const store = createTestStore({
		characterSheet: createInitialState({ activeCharacter: character }),
	})
	render(
		<Provider store={store}>
			<HpCard />
		</Provider>,
	)
	return store
}

const openEditor = async () => {
	await userEvent.click(screen.getByRole('button', { name: 'Edit Hit Points' }))
}

const applyDamage = async (amount: string) => {
	await userEvent.type(screen.getByLabelText('Amount'), amount)
	await userEvent.click(screen.getByRole('button', { name: /damage/i }))
}

const health = (store: ReturnType<typeof createTestStore>) =>
	store.getState().characterSheet.activeCharacter.statistics.health

describe('HpCard damage resolution', () => {
	it('subtracts plain damage from current HP', async () => {
		const store = renderHp({ current: 20 })
		await openEditor()
		await applyDamage('5')
		expect(health(store).current).toBe(15)
	})

	it('never drops current HP below zero', async () => {
		const store = renderHp({ current: 4 })
		await openEditor()
		await applyDamage('9')
		expect(health(store).current).toBe(0)
	})

	it('spends temp HP before current HP', async () => {
		const store = renderHp({ current: 20, temp: 6 })
		await openEditor()
		await applyDamage('4')

		expect(health(store).temp).toBe(2)
		expect(health(store).current).toBe(20)
	})

	it('carries damage past exhausted temp HP into current HP', async () => {
		const store = renderHp({ current: 20, temp: 3 })
		await openEditor()
		await applyDamage('8')

		expect(health(store).temp).toBe(0)
		expect(health(store).current).toBe(15)
	})

	it('reports a wound when HP drops to zero', async () => {
		renderHp({ current: 6 })
		await openEditor()
		await applyDamage('6')
		expect(
			await screen.findByText(/1 wound \(HP dropped to 0 or below\)/),
		).toBeInTheDocument()
	})

	it('reports the extra wounds for damage far exceeding max HP', async () => {
		// This branch was restructured in S11 (the nested if/else became a helper
		// returning '' for "no extra wounds"), so it is pinned explicitly: the
		// excess message must REPLACE the dropped-to-zero one, not sit beside it.
		renderHp({ current: 20 })
		await openEditor()
		await applyDamage('999')
		expect(
			await screen.findByText(
				/2 additional wounds \(damage exceeds twice max HP\)/,
			),
		).toBeInTheDocument()
		expect(
			screen.queryByText(/HP dropped to 0 or below/),
		).not.toBeInTheDocument()
	})

	it('keeps the dropped-to-zero wound when the excess is too small for more', async () => {
		renderHp({ current: 20 })
		await openEditor()
		await applyDamage('21')
		expect(
			await screen.findByText(/1 wound \(HP dropped to 0 or below\)/),
		).toBeInTheDocument()
	})

	it('heals up to max but no further', async () => {
		const store = renderHp({ current: 20 })
		await openEditor()
		await userEvent.type(screen.getByLabelText('Amount'), '999')
		await userEvent.click(screen.getByRole('button', { name: /healing/i }))

		const { current } = health(store)
		expect(current).toBeGreaterThan(20)
		// Clamped to the effective max rather than running away.
		expect(current).toBeLessThanOrEqual(999)
	})
})

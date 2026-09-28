import React from 'react'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'
import { CompanionBuilder } from '..'
import { setupCompanionBuilderStore } from '../../../features/CompanionBuilder/store'

/**
 * The Bond register end to end: prefilled from the owner, editable, and feeding the
 * preview card and the tier warning.
 */
const renderBuilder = (
	owner?: React.ComponentProps<typeof CompanionBuilder>['owner'],
) => {
	const store = setupCompanionBuilderStore()
	render(
		<Provider store={store}>
			<CompanionBuilder owner={owner} onImportCompanion={() => undefined} />
		</Provider>,
	)
	fireEvent.click(screen.getByText('Build Companion'))
	return store
}

describe('Companion Builder bond', () => {
	it('prefills from the owner and warns above their Tier', () => {
		const store = renderBuilder({
			talentRank: 2,
			nature: 1,
			knowsWildCompanion: true,
		})
		expect(store.getState().companionBuilder.bond).toMatchObject({
			talentRank: 2,
			nature: 1,
			wildCompanion: true,
		})
		const tiers = screen.getByRole('radiogroup', { name: 'Tier' })
		fireEvent.click(within(tiers).getByRole('radio', { name: 'Ferocious' }))
		expect(
			screen.getByText(/Tier 3 is above what the owner can control/),
		).toBeTruthy()
	})

	it('starts with no bond on the docs page, and applies choices to the card', () => {
		const store = renderBuilder()
		expect(store.getState().companionBuilder.bond.talentRank).toBe(0)
		// The register starts closed; its summary opens it.
		fireEvent.click(screen.getByText('Choose'))
		const rank = screen.getByRole('radiogroup', {
			name: 'Animal Companion rank',
		})
		fireEvent.click(within(rank).getByRole('radio', { name: 'rank 2' }))
		const option = screen.getByRole('radiogroup', {
			name: 'Animal Companion rank 2 option',
		})
		fireEvent.click(
			within(option).getByRole('radio', { name: 'two Combat Arts' }),
		)
		fireEvent.click(screen.getByRole('option', { name: /Feint/ }))
		expect(store.getState().companionBuilder.bond.combatArts).toEqual(['Feint'])

		fireEvent.click(screen.getByText('Summoned with Wild Companion'))
		expect(store.getState().companionBuilder.bond.wildCompanion).toBe(true)

		// Build a companion and check the card carries the result.
		const sizes = screen.getByRole('radiogroup', { name: 'Size' })
		fireEvent.click(within(sizes).getByRole('radio', { name: 'Tiny' }))
		fireEvent.click(screen.getByRole('option', { name: /Bat/ }))
		expect(screen.getAllByText(/Spirit \(primal\)/).length).toBeGreaterThan(0)
		expect(screen.getAllByText('Combat Arts').length).toBeGreaterThan(0)
		expect(screen.getAllByText(/Psychic Connection/).length).toBeGreaterThan(0)
	})
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { describe, expect, it } from 'vitest'
import React from 'react'
import { AttributeCard } from '../AttributeCard'
import { AvCard } from '../AvCard'
import { DodgeCard } from '../DodgeCard'
import { ParryCard } from '../ParryCard'
import { ResistCard } from '../ResistCard'
import { createBasicCharacter, createCharacterDocument } from '../../../../../../tests/utils/character-test-fixtures'
import { createInitialState, createTestStore } from '../../../../../../tests/utils/character-test-helpers'

/**
 * The stat-card behaviour contract (M9 S11, after owner review).
 *
 * Every card built on `SheetField` must behave the same way, and two of them did
 * not:
 *
 * - The defence cards gated their editor on the migrated `*Details` structure, so
 *   the FIRST click only dispatched the migration. Nothing opened, and the only
 *   visible effect was the save control arming — it read as a dead click, and the
 *   editor needed a second one.
 * - `AttributeCard` rendered a MUI `Select` as its value, which owned its own open
 *   state. It looked identical to the others and dismissed differently.
 *
 * These are pinned per card rather than asserted once, because the bugs were
 * per-card and a shared helper would have hidden which one regressed.
 */
const withStore = (ui: React.ReactNode, character = createCharacterDocument(createBasicCharacter())) => {
	const store = createTestStore({
		characterSheet: createInitialState({ activeCharacter: character }),
	})
	render(<Provider store={store}>{ui}</Provider>)
	return store
}

const cards: [string, string, React.ReactNode][] = [
	['Parry', 'Edit Parry', <ParryCard key="p" />],
	['Dodge', 'Edit Dodge', <DodgeCard key="d" />],
	['Resist', 'Edit Resist', <ResistCard key="r" />],
	['AV', 'Edit AV', <AvCard key="a" />],
]

describe('stat card behaviour is uniform', () => {
	describe.each(cards)('%s', (label, editLabel, element) => {
		it('opens its editor on the FIRST activation', async () => {
			withStore(element)
			await userEvent.click(screen.getByRole('button', { name: editLabel }))
			expect(await screen.findByText(`${label} Calculator`)).toBeInTheDocument()
		})

		it('closes again on Escape', async () => {
			withStore(element)
			await userEvent.click(screen.getByRole('button', { name: editLabel }))
			expect(await screen.findByText(`${label} Calculator`)).toBeInTheDocument()

			await userEvent.keyboard('{Escape}')
			expect(screen.queryByText(`${label} Calculator`)).not.toBeInTheDocument()
		})
	})

	describe('AttributeCard', () => {
		const renderAttribute = () =>
			withStore(
				<AttributeCard
					attribute={{ value: 8, wounded: false } as never}
					label="Strength"
					sigil="strength"
					color="#888"
					totalWounds={0}
					updateAttribute={() => undefined}
				/>,
			)

		it('opens its die chooser on the first activation', async () => {
			renderAttribute()
			await userEvent.click(screen.getByRole('button', { name: 'Change Strength die' }))
			expect(await screen.findByRole('menuitem', { name: /d12/ })).toBeInTheDocument()
		})

		it('closes again on Escape, like every other stat card', async () => {
			renderAttribute()
			await userEvent.click(screen.getByRole('button', { name: 'Change Strength die' }))
			expect(await screen.findByRole('menuitem', { name: /d12/ })).toBeInTheDocument()

			await userEvent.keyboard('{Escape}')
			expect(screen.queryByRole('menuitem', { name: /d12/ })).not.toBeInTheDocument()
		})

		it('closes after picking a die', async () => {
			renderAttribute()
			await userEvent.click(screen.getByRole('button', { name: 'Change Strength die' }))
			await userEvent.click(await screen.findByRole('menuitem', { name: /d10/ }))
			expect(screen.queryByRole('menuitem', { name: /d10/ })).not.toBeInTheDocument()
		})
	})
})

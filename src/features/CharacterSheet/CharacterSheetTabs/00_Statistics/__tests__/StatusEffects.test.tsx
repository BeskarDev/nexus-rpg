import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { statusEffectTypeArray } from '@site/src/types/Character'
import { CONDITION_SIGIL } from '@site/src/components/codex/condition-sigils'
import { SIGIL_INNER } from '@site/src/components/codex/sigil-paths'
import conditionsData from '@site/src/utils/data/json/conditions.json'
import { characterSheetReducer } from '../../../characterSheetReducer'
import { createCharacterDocument } from '../../../../../../tests/utils/character-test-fixtures'
import { StatusEffects } from '../StatusEffects'

/**
 * Rendered against a real store rather than a mocked dispatch, because the part
 * of this feature most likely to break is the reducer's two-field encoding of
 * duration (`duration: 1` for briefly, `narrativeDuration` for the rest). A test
 * that asserted on dispatched actions would pass while the stored condition sat
 * on two rungs at once.
 */
const setup = () => {
	const store = configureStore({
		reducer: { characterSheet: characterSheetReducer },
		middleware: (getDefault) => getDefault({ serializableCheck: false }),
	})
	store.dispatch({
		type: 'characterSheet/setCharacter',
		payload: createCharacterDocument(),
	})

	const view = () =>
		store.getState().characterSheet.activeCharacter!.statistics.statusEffects

	const Harness = () => {
		const effects =
			store.getState().characterSheet.activeCharacter!.statistics.statusEffects
		return <StatusEffects statusEffects={effects} />
	}

	const rendered = render(
		<Provider store={store}>
			<Harness />
		</Provider>,
	)
	// The harness reads the store at render time, so re-render after a dispatch.
	const refresh = () =>
		rendered.rerender(
			<Provider store={store}>
				<Harness />
			</Provider>,
		)
	return { store, view, refresh }
}

const openAddMenu = async () =>
	userEvent.click(screen.getByRole('button', { name: 'Afflict a condition' }))

describe('StatusEffects', () => {
	it('starts empty and says so', () => {
		setup()
		expect(screen.getByText('Unafflicted.')).toBeInTheDocument()
	})

	/**
	 * The whole point of the redesign: the old flow was add, then pencil, then a
	 * Select, then a save tick. One popover has to be enough.
	 */
	describe('afflicting from the add menu', () => {
		it('adds a condition already on the armed rung, in one visit', async () => {
			const { view, refresh } = setup()
			await openAddMenu()
			await userEvent.click(
				screen.getByRole('button', { name: 'Duration Medium' }),
			)
			await userEvent.click(screen.getByRole('button', { name: /^Poisoned/ }))
			refresh()

			expect(view()).toHaveLength(1)
			expect(view()[0]).toMatchObject({
				name: 'poisoned',
				narrativeDuration: 'medium',
			})
			// `briefly` and a narrative rung are mutually exclusive.
			expect(view()[0].duration).toBeUndefined()
		})

		it('defaults to briefly, which is the rung combat uses most', async () => {
			const { view, refresh } = setup()
			await openAddMenu()
			await userEvent.click(screen.getByRole('button', { name: /^Dazed/ }))
			refresh()

			expect(view()[0]).toMatchObject({ name: 'dazed', duration: 1 })
			expect(view()[0].narrativeDuration).toBeUndefined()
		})

		it('can afflict with no duration at all by disarming the rung', async () => {
			const { view, refresh } = setup()
			await openAddMenu()
			// Briefly is armed by default; tapping it again clears it.
			await userEvent.click(
				screen.getByRole('button', { name: 'Duration Briefly' }),
			)
			await userEvent.click(screen.getByRole('button', { name: /^Prone/ }))
			refresh()

			expect(view()[0].duration).toBeUndefined()
			expect(view()[0].narrativeDuration).toBeUndefined()
		})

		it('gives an (X) condition the standard intensity up front', async () => {
			const { view, refresh } = setup()
			await openAddMenu()
			await userEvent.click(screen.getByRole('button', { name: /^Bleeding/ }))
			refresh()

			expect(view()[0]).toMatchObject({ name: 'bleeding', intensity: 2 })
		})

		it('offers no condition that is already afflicted', async () => {
			const { refresh } = setup()
			await openAddMenu()
			await userEvent.click(screen.getByRole('button', { name: /^Stunned/ }))
			refresh()

			await openAddMenu()
			expect(
				screen.queryByRole('button', { name: /^Stunned/ }),
			).not.toBeInTheDocument()
		})

		/**
		 * The menu portals to `document.body`, outside `.character-sheet-page`, so
		 * every `--cs-*` token inside it resolves to nothing without this class —
		 * the same defect M13 S1 found in `SheetField`. Asserted on the class, not a
		 * colour: jsdom does not evaluate the `color-mix()` those tokens are built
		 * from, so a colour assertion would pass either way.
		 */
		it('carries the sheet token class into the portaled menu', async () => {
			setup()
			await openAddMenu()
			expect(document.querySelector('.MuiMenu-paper')).toHaveClass('cs-tokens')
		})
	})

	describe('read state and edit state', () => {
		const afflict = async (refresh: () => void, label: RegExp) => {
			await openAddMenu()
			await userEvent.click(screen.getByRole('button', { name: label }))
			refresh()
		}

		/** Tap the row's duration token. */
		const openRowEditor = async (name: string) =>
			userEvent.click(
				screen.getByRole('button', {
					name: new RegExp(`^${name} (lasts|has no duration)`),
				}),
			)

		/** Tap the row's intensity token — a separate trigger from duration. */
		const openIntensityEditor = async (name: string) =>
			userEvent.click(
				screen.getByRole('button', {
					name: new RegExp(`^${name} intensity \\d+ — change`),
				}),
			)

		/**
		 * A settled condition shows its duration as a value, not as four buttons.
		 * The first draft rendered the whole ladder on every row permanently, which
		 * put five controls on a condition nobody was editing.
		 */
		it('shows duration as one token, with the rungs hidden until asked for', async () => {
			const { refresh } = setup()
			await afflict(refresh, /^Slowed/)

			expect(
				screen.getByRole('button', { name: 'Slowed lasts Briefly — change' }),
			).toBeInTheDocument()
			expect(
				screen.queryByRole('button', { name: 'Slowed duration Long' }),
			).not.toBeInTheDocument()

			await openRowEditor('Slowed')
			expect(
				screen.getByRole('button', { name: 'Slowed duration Long' }),
			).toBeInTheDocument()
		})

		it('offers a target to tap when no duration is set', async () => {
			const { refresh } = setup()
			await openAddMenu()
			await userEvent.click(
				screen.getByRole('button', { name: 'Duration Briefly' }),
			)
			await userEvent.click(screen.getByRole('button', { name: /^Prone/ }))
			refresh()

			await openRowEditor('Prone')
			expect(
				screen.getByRole('button', { name: 'Prone duration Medium' }),
			).toBeInTheDocument()
		})

		it('closes the editor once a rung is picked', async () => {
			const { refresh } = setup()
			await afflict(refresh, /^Slowed/)
			await openRowEditor('Slowed')
			await userEvent.click(
				screen.getByRole('button', { name: 'Slowed duration Medium' }),
			)
			refresh()

			expect(
				screen.queryByRole('button', { name: 'Slowed duration Long' }),
			).not.toBeInTheDocument()
		})

		it('moves a condition to a rung on one tap', async () => {
			const { view, refresh } = setup()
			await afflict(refresh, /^Slowed/)
			await openRowEditor('Slowed')
			await userEvent.click(
				screen.getByRole('button', { name: 'Slowed duration Long' }),
			)
			refresh()

			expect(view()[0].narrativeDuration).toBe('long')
			expect(view()[0].duration).toBeUndefined()
		})

		it('clears the duration when the set rung is tapped again', async () => {
			const { view, refresh } = setup()
			await afflict(refresh, /^Slowed/)
			await openRowEditor('Slowed')
			// Added on `briefly`, so that rung is the set one.
			await userEvent.click(
				screen.getByRole('button', { name: 'Slowed duration Briefly' }),
			)
			refresh()

			expect(view()[0].duration).toBeUndefined()
			expect(view()[0].narrativeDuration).toBeUndefined()
		})

		it('never leaves a condition on two rungs at once', async () => {
			const { view, refresh } = setup()
			await afflict(refresh, /^Slowed/)
			for (const rung of ['Short', 'Long', 'Briefly', 'Medium']) {
				await openRowEditor('Slowed')
				await userEvent.click(
					screen.getByRole('button', { name: `Slowed duration ${rung}` }),
				)
				refresh()
				const stored = view()[0]
				const onLadder =
					(stored.duration === 1 ? 1 : 0) + (stored.narrativeDuration ? 1 : 0)
				expect(onLadder).toBeLessThanOrEqual(1)
			}
		})

		/**
		 * 2/4/6 are 92% of the intensities in the game's content, so they are one tap
		 * each; 8/10/12 exist on high-tier effects and need the field.
		 */
		describe('intensity', () => {
			it('sets a standard intensity on one tap', async () => {
				const { view, refresh } = setup()
				await afflict(refresh, /^Burning/)
				await openIntensityEditor('Burning')

				await userEvent.click(
					screen.getByRole('button', { name: 'Burning intensity 6' }),
				)
				refresh()
				expect(view()[0].intensity).toBe(6)
			})

			it('marks the standard value in use, and only that one', async () => {
				const { refresh } = setup()
				await afflict(refresh, /^Burning/)
				await openIntensityEditor('Burning')

				// Afflicted at the default of 2.
				expect(
					screen.getByRole('button', { name: 'Burning intensity 2' }),
				).toHaveAttribute('aria-pressed', 'true')
				expect(
					screen.getByRole('button', { name: 'Burning intensity 4' }),
				).toHaveAttribute('aria-pressed', 'false')
			})

			it('reaches a non-standard intensity through the field', async () => {
				const { view, refresh } = setup()
				await afflict(refresh, /^Burning/)
				await openIntensityEditor('Burning')

				const field = screen.getByRole('spinbutton', {
					name: 'Burning intensity',
				})
				await userEvent.clear(field)
				await userEvent.type(field, '12')
				await userEvent.tab()
				refresh()

				expect(view()[0].intensity).toBe(12)
			})

			it('closes on a stone, since a standard value is the whole decision', async () => {
				const { refresh } = setup()
				await afflict(refresh, /^Burning/)
				await openIntensityEditor('Burning')
				await userEvent.click(
					screen.getByRole('button', { name: 'Burning intensity 4' }),
				)
				refresh()

				expect(
					screen.queryByRole('button', { name: 'Burning intensity 6' }),
				).not.toBeInTheDocument()
			})

			/**
			 * Intensity and duration are separate triggers. The first draft put both in
			 * one popover behind the token labelled "Brief", which meant changing an
			 * intensity required knowing it hid behind a duration button.
			 */
			it('is reached from its own trigger, not from the duration one', async () => {
				const { refresh } = setup()
				await afflict(refresh, /^Burning/)

				await openRowEditor('Burning')
				expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument()
				await userEvent.keyboard('{Escape}')

				await openIntensityEditor('Burning')
				expect(
					screen.getByRole('spinbutton', { name: 'Burning intensity' }),
				).toBeInTheDocument()
				expect(
					screen.queryByRole('button', { name: 'Burning duration Long' }),
				).not.toBeInTheDocument()
			})

			it('ignores an emptied field rather than storing zero', async () => {
				const { view, refresh } = setup()
				await afflict(refresh, /^Burning/)
				await openIntensityEditor('Burning')

				const field = screen.getByRole('spinbutton', {
					name: 'Burning intensity',
				})
				await userEvent.clear(field)
				await userEvent.tab()
				refresh()

				expect(view()[0].intensity).toBe(2)
			})
		})

		it('shows no intensity control on a condition that takes no intensity', async () => {
			const { refresh } = setup()
			await afflict(refresh, /^Deafened/)
			expect(
				screen.queryByRole('button', { name: /intensity/i }),
			).not.toBeInTheDocument()

			await openRowEditor('Deafened')
			expect(screen.queryByRole('spinbutton')).not.toBeInTheDocument()
		})

		it('removes a condition on one tap', async () => {
			const { view, refresh } = setup()
			await afflict(refresh, /^Grappled/)
			await userEvent.click(
				screen.getByRole('button', { name: 'Remove Grappled' }),
			)
			refresh()
			expect(view()).toHaveLength(0)
		})

		/**
		 * The old chip toggled an `active` flag on a body click, dimming the row to
		 * 60%. That state has no name in the rules and competed with editing for the
		 * same tap, so it is gone from the UI — but still written, so stored
		 * documents keep their shape.
		 */
		it('writes active: true and offers no way to unset it', async () => {
			const { view, refresh } = setup()
			await afflict(refresh, /^Confused/)
			expect(view()[0].active).toBe(true)
			expect(
				screen.queryByRole('button', { name: /suspend|toggle|activate/i }),
			).not.toBeInTheDocument()
		})
	})

	/**
	 * `CONDITION_SIGIL` lives in `src/components/`, which is shared with the docs
	 * site and must not import the character sheet's types — so it cannot be typed
	 * as `Record<StatusEffectType, SigilName>`. This is that missing type check: a
	 * condition added to the type array fails here instead of rendering a blank
	 * gutter on the sheet.
	 */
	describe('sigil coverage', () => {
		it('maps every status condition to a mark that exists', () => {
			for (const type of statusEffectTypeArray) {
				expect(
					CONDITION_SIGIL[type],
					`no sigil mapped for "${type}"`,
				).toBeDefined()
				expect(
					SIGIL_INNER[CONDITION_SIGIL[type]],
					`"${type}" maps to "${CONDITION_SIGIL[type]}", which is not a mark`,
				).toBeDefined()
			}
		})

		it('maps no condition that the sheet cannot afflict', () => {
			const known = new Set<string>(statusEffectTypeArray)
			expect(Object.keys(CONDITION_SIGIL).filter((k) => !known.has(k))).toEqual(
				[],
			)
		})
	})

	/**
	 * `conditions.json` is the source of truth for conditions: the rules page
	 * `docs/05-combat/04-conditions.mdx` is generated from it, and this component
	 * reads it for every tooltip. But the SET the sheet can afflict came from a
	 * hand-maintained array, and it had drifted — `invisible` was documented and
	 * published while being unselectable here.
	 *
	 * Drift in this direction is invisible in the UI (a missing condition looks
	 * like a condition that does not exist), which is why it needs a test rather
	 * than a review.
	 */
	describe('parity with conditions.json', () => {
		const canonical = conditionsData.map((condition) =>
			condition.name.replace(/\s*\(x\)/gi, '').toLowerCase(),
		)

		it('can afflict every condition the rules publish', () => {
			const afflictable = new Set<string>(statusEffectTypeArray)
			expect(canonical.filter((name) => !afflictable.has(name))).toEqual([])
		})

		it('cannot afflict a condition the rules do not have', () => {
			const known = new Set(canonical)
			expect(statusEffectTypeArray.filter((name) => !known.has(name))).toEqual(
				[],
			)
		})
	})
})

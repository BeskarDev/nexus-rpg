import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import React from 'react'
import { AdjustStepper } from '../SheetField'

const setup = (
	props: Partial<React.ComponentProps<typeof AdjustStepper>> = {},
) => {
	const onDecrease = vi.fn()
	const onIncrease = vi.fn()
	render(
		<AdjustStepper
			decreaseLabel="Damage"
			increaseLabel="Healing"
			onDecrease={onDecrease}
			onIncrease={onIncrease}
			{...props}
		/>,
	)
	return { onDecrease, onIncrease }
}

describe('AdjustStepper', () => {
	it('disables both buttons while the amount is zero', () => {
		setup()
		expect(screen.getByRole('button', { name: /damage/i })).toBeDisabled()
		expect(screen.getByRole('button', { name: /healing/i })).toBeDisabled()
	})

	it('applies the typed amount to the decrease side', async () => {
		const { onDecrease, onIncrease } = setup()
		await userEvent.type(screen.getByLabelText('Amount'), '7')
		await userEvent.click(screen.getByRole('button', { name: /damage/i }))

		expect(onDecrease).toHaveBeenCalledExactlyOnceWith(7)
		expect(onIncrease).not.toHaveBeenCalled()
	})

	it('applies the typed amount to the increase side', async () => {
		const { onIncrease } = setup()
		await userEvent.type(screen.getByLabelText('Amount'), '4')
		await userEvent.click(screen.getByRole('button', { name: /healing/i }))

		expect(onIncrease).toHaveBeenCalledExactlyOnceWith(4)
	})

	it('resets the amount after applying, so it cannot be applied twice', async () => {
		const { onDecrease } = setup()
		await userEvent.type(screen.getByLabelText('Amount'), '3')
		await userEvent.click(screen.getByRole('button', { name: /damage/i }))

		expect(screen.getByLabelText('Amount')).toHaveValue(0)
		expect(screen.getByRole('button', { name: /damage/i })).toBeDisabled()
		expect(onDecrease).toHaveBeenCalledTimes(1)
	})

	/**
	 * M13 S1 — the tally row. These pin the two-tap path, which is the whole point
	 * of the redesign: arming must not apply, and applying must use the armed
	 * amount without the keyboard ever being involved.
	 */
	describe('quick-amount stones', () => {
		it('arms an amount without applying it', async () => {
			const { onDecrease, onIncrease } = setup()
			await userEvent.click(screen.getByRole('button', { name: 'Amount 5' }))

			// Nothing has happened to the character yet — a stone is not an action.
			expect(onDecrease).not.toHaveBeenCalled()
			expect(onIncrease).not.toHaveBeenCalled()
			expect(screen.getByLabelText('Amount')).toHaveValue(5)
			expect(screen.getByRole('button', { name: /damage/i })).toBeEnabled()
		})

		it('applies the armed amount in two taps, no typing', async () => {
			const { onDecrease } = setup()
			await userEvent.click(screen.getByRole('button', { name: 'Amount 3' }))
			await userEvent.click(screen.getByRole('button', { name: /damage/i }))

			expect(onDecrease).toHaveBeenCalledExactlyOnceWith(3)
			expect(screen.getByLabelText('Amount')).toHaveValue(0)
		})

		it('marks the armed stone as pressed, and only that one', async () => {
			setup()
			await userEvent.click(screen.getByRole('button', { name: 'Amount 2' }))

			expect(screen.getByRole('button', { name: 'Amount 2' })).toHaveAttribute(
				'aria-pressed',
				'true',
			)
			expect(screen.getByRole('button', { name: 'Amount 5' })).toHaveAttribute(
				'aria-pressed',
				'false',
			)
		})

		it('disarms when the armed stone is tapped again', async () => {
			setup()
			const stone = screen.getByRole('button', { name: 'Amount 5' })
			await userEvent.click(stone)
			await userEvent.click(stone)

			expect(screen.getByLabelText('Amount')).toHaveValue(0)
			expect(screen.getByRole('button', { name: /damage/i })).toBeDisabled()
		})

		it('re-arms rather than accumulating when a second stone is tapped', async () => {
			const { onIncrease } = setup()
			await userEvent.click(screen.getByRole('button', { name: 'Amount 1' }))
			await userEvent.click(screen.getByRole('button', { name: 'Amount 10' }))
			await userEvent.click(screen.getByRole('button', { name: /healing/i }))

			expect(onIncrease).toHaveBeenCalledExactlyOnceWith(10)
		})

		/**
		 * Armed, the plates show the signed amount alone — `− 5` — because
		 * `− Damage 5` wrapped to two lines in half of a 21rem popover and resized
		 * the plates on every stone tap. The verb has to survive in the ACCESSIBLE
		 * name, though: "− 5" announced bare gives no direction.
		 */
		it('shows the signed amount but keeps the verb in the accessible name', async () => {
			setup()
			await userEvent.click(screen.getByRole('button', { name: 'Amount 5' }))

			const damage = screen.getByRole('button', { name: 'Damage 5' })
			const healing = screen.getByRole('button', { name: 'Healing 5' })
			expect(damage).toHaveTextContent('− 5')
			expect(damage).not.toHaveTextContent(/damage/i)
			expect(healing).toHaveTextContent('+ 5')
		})

		it('keeps the verb visible while nothing is armed', () => {
			setup()
			expect(screen.getByRole('button', { name: 'Damage' })).toHaveTextContent(
				'Damage',
			)
		})

		it('takes its stone set from props', () => {
			setup({ quickAmounts: [2, 4] })
			expect(
				screen.getByRole('button', { name: 'Amount 2' }),
			).toBeInTheDocument()
			expect(
				screen.getByRole('button', { name: 'Amount 4' }),
			).toBeInTheDocument()
			expect(
				screen.queryByRole('button', { name: 'Amount 10' }),
			).not.toBeInTheDocument()
		})
	})

	it('takes its verbs from props', () => {
		setup({
			title: 'Spend / Restore',
			decreaseLabel: 'Spend',
			increaseLabel: 'Restore',
		})
		expect(screen.getByText('Spend / Restore')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /spend/i })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /restore/i })).toBeInTheDocument()
	})
})

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import React from 'react'
import { AdjustStepper } from '../SheetField'

const setup = (props: Partial<React.ComponentProps<typeof AdjustStepper>> = {}) => {
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

	it('takes its verbs from props', () => {
		setup({ title: 'Spend / Restore', decreaseLabel: 'Spend', increaseLabel: 'Restore' })
		expect(screen.getByText('Spend / Restore')).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /spend/i })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /restore/i })).toBeInTheDocument()
	})
})

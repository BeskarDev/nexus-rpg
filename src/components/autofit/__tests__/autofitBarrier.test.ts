import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
	autofitPending,
	beginFit,
	endFit,
	resetAutofitBarrier,
	subscribeAutofit,
	whenAutofitSettled,
} from '../autofitBarrier'

describe('the print barrier', () => {
	beforeEach(() => resetAutofitBarrier())

	it('resolves immediately when nothing is measuring', async () => {
		await expect(whenAutofitSettled()).resolves.toBeUndefined()
	})

	it('does not resolve until the last card settles', async () => {
		beginFit()
		beginFit()
		const settled = vi.fn()
		whenAutofitSettled().then(settled)

		endFit()
		await Promise.resolve()
		expect(settled).not.toHaveBeenCalled()
		expect(autofitPending()).toBe(1)

		endFit()
		await Promise.resolve()
		expect(settled).toHaveBeenCalled()
	})

	it('resolves every waiter, so two print attempts both proceed', async () => {
		beginFit()
		const first = vi.fn()
		const second = vi.fn()
		whenAutofitSettled().then(first)
		whenAutofitSettled().then(second)
		endFit()
		await Promise.resolve()
		expect(first).toHaveBeenCalled()
		expect(second).toHaveBeenCalled()
	})

	it('never counts below zero', () => {
		// A card unmounting mid-measure releases in its cleanup, and the barrier
		// must not be left owing a card that no longer exists.
		endFit()
		endFit()
		expect(autofitPending()).toBe(0)
	})

	it('notifies subscribers so the print verb can state why it is waiting', () => {
		const notify = vi.fn()
		const unsubscribe = subscribeAutofit(notify)
		beginFit()
		expect(notify).toHaveBeenCalledTimes(1)
		endFit()
		expect(notify).toHaveBeenCalledTimes(2)
		unsubscribe()
		beginFit()
		expect(notify).toHaveBeenCalledTimes(2)
	})
})

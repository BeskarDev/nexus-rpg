import { describe, expect, it, vi } from 'vitest'
import { fitSize } from '../fitSize'

/**
 * A fake measure: the text fits at any size up to `ceiling`.
 *
 * This is the whole reason the search is a pure function taking a predicate.
 * jsdom has no layout — `scrollHeight` is always 0 there — so a DOM test of
 * fitting would pass on a completely broken engine (pattern file, Testing).
 */
const fitsUpTo = (ceiling: number) => (pt: number) => pt <= ceiling

describe('fitSize', () => {
	it('returns the maximum when the body already fits at full size', () => {
		const result = fitSize(fitsUpTo(12), { min: 5.5, max: 9 })
		expect(result).toEqual({ size: 9, spills: false })
	})

	it('asks about the maximum first, and stops there', () => {
		const fits = vi.fn(fitsUpTo(12))
		fitSize(fits, { min: 5.5, max: 9 })
		// One call: the common case is a short card, and it should not pay for
		// seven layout reads.
		expect(fits).toHaveBeenCalledTimes(1)
	})

	it('lands just under the ceiling for a body between the bounds', () => {
		const result = fitSize(fitsUpTo(7.35), { min: 5.5, max: 9 })
		expect(result.spills).toBe(false)
		expect(result.size).toBeLessThanOrEqual(7.35)
		expect(result.size).toBeGreaterThan(7.2)
	})

	it('never returns a size that does not fit', () => {
		// Every ceiling across the range, at a finer grain than the output.
		for (let ceiling = 5.5; ceiling <= 9; ceiling += 0.05) {
			const { size, spills } = fitSize(fitsUpTo(ceiling), { min: 5.5, max: 9 })
			if (!spills) expect(size).toBeLessThanOrEqual(ceiling + 1e-9)
		}
	})

	it('reports a spill when the body overflows at the floor', () => {
		// M18 D3 exists because of this signal. The character-count ladder could
		// not produce it: it always returned a class, fit or not.
		const result = fitSize(fitsUpTo(4), { min: 5.5, max: 9 })
		expect(result).toEqual({ size: 5.5, spills: true })
	})

	it('holds the floor exactly when the body fits only there', () => {
		const result = fitSize(fitsUpTo(5.5), { min: 5.5, max: 9 })
		expect(result).toEqual({ size: 5.5, spills: false })
	})

	it('rounds down to 0.1pt, so the size returned is one that was measured', () => {
		const result = fitSize(fitsUpTo(7.999), { min: 5.5, max: 9 })
		expect(result.size).toBe(Math.floor(result.size * 10) / 10)
		expect(result.size).toBeLessThan(8)
	})

	it('resolves finely enough that neighbouring cards do not cliff', () => {
		// The ladder's fault (M18 F1): 349 characters set at 9pt and 351 at 8pt,
		// an 11% jump for two characters. Two bodies of near-identical difficulty
		// must now set within a tenth of a point of each other.
		const a = fitSize(fitsUpTo(7.5), { min: 5.5, max: 9 }).size
		const b = fitSize(fitsUpTo(7.52), { min: 5.5, max: 9 }).size
		expect(Math.abs(a - b)).toBeLessThanOrEqual(0.1)
	})

	it('takes a bounded number of measurements', () => {
		const fits = vi.fn(fitsUpTo(6))
		fitSize(fits, { min: 5.5, max: 9 })
		// max + min + seven bisection steps. Two hundred cards is 1800 layout
		// reads, not an unbounded search.
		expect(fits.mock.calls.length).toBeLessThanOrEqual(9)
	})
})

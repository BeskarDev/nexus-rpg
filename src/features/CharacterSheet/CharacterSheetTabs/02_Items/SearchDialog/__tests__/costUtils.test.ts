import { describe, expect, it } from 'vitest'
import { parseCostValue } from '../costUtils'

describe('parseCostValue', () => {
	it('parses plain numbers', () => {
		expect(parseCostValue('20')).toBe(20)
	})

	it('parses numbers with commas', () => {
		expect(parseCostValue('2,500')).toBe(2500)
		expect(parseCostValue('10,000')).toBe(10000)
	})

	it('returns null for empty or invalid', () => {
		expect(parseCostValue('')).toBeNull()
		expect(parseCostValue('abc')).toBeNull()
	})

	it('supports cost filtering with max', () => {
		const cost = parseCostValue('2,500')
		const min = Number.NEGATIVE_INFINITY
		const max = 20
		const matches =
			cost === null ? min === Number.NEGATIVE_INFINITY && max === Number.POSITIVE_INFINITY : cost >= min && cost <= max
		expect(matches).toBe(false)
	})
})

import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useSpillPlan } from '../useSpillPlan'

const fits = { size: 7, spills: false }
const spillsAfter = (fitBlocks: number) => ({
	size: 5.5,
	spills: true,
	fitBlocks,
})

describe('useSpillPlan', () => {
	it('prints one card per entry until something spills', () => {
		const { result } = renderHook(() => useSpillPlan())
		expect(result.current.partsFor('fireball')).toEqual([
			{ start: 0, end: undefined, part: 1, totalParts: 1 },
		])
		expect(result.current.continuations).toBe(0)
	})

	it('cuts where the measurement said the body stopped fitting', () => {
		const { result } = renderHook(() => useSpillPlan())
		act(() => result.current.report('animate-corpse', 0, spillsAfter(4)))

		expect(result.current.partsFor('animate-corpse')).toEqual([
			{ start: 0, end: 4, part: 1, totalParts: 2 },
			{ start: 4, end: undefined, part: 2, totalParts: 2 },
		])
		expect(result.current.continuations).toBe(1)
	})

	it('cuts again when the continuation spills in its turn', () => {
		const { result } = renderHook(() => useSpillPlan())
		act(() => result.current.report('epic', 0, spillsAfter(3)))
		act(() => result.current.report('epic', 3, spillsAfter(2)))

		expect(result.current.partsFor('epic').map((p) => p.start)).toEqual([
			0, 3, 5,
		])
		expect(result.current.continuations).toBe(2)
	})

	it('settles: a part that fits adds nothing', () => {
		const { result } = renderHook(() => useSpillPlan())
		act(() => result.current.report('spell', 0, spillsAfter(4)))
		const cuts = result.current.partsFor('spell')
		act(() => result.current.report('spell', 0, fits))
		act(() => result.current.report('spell', 4, fits))
		expect(result.current.partsFor('spell')).toEqual(cuts)
	})

	it('ignores a repeated report, so a re-render cannot cut twice', () => {
		const { result } = renderHook(() => useSpillPlan())
		act(() => result.current.report('spell', 0, spillsAfter(4)))
		act(() => result.current.report('spell', 0, spillsAfter(4)))
		expect(result.current.continuations).toBe(1)
	})

	it('reports an entry whose first block will not fit alone, and does not split it', () => {
		// D3's safety valve: splitting further means splitting a sentence, so the
		// layout stops and the tool says the rules text is over budget.
		const { result } = renderHook(() => useSpillPlan())
		act(() => result.current.report('wall-of-text', 0, spillsAfter(0)))

		expect(result.current.oversize).toEqual(['wall-of-text'])
		expect(result.current.partsFor('wall-of-text')).toHaveLength(1)
		expect(result.current.continuations).toBe(0)
	})

	it('counts continuations across the whole deck', () => {
		const { result } = renderHook(() => useSpillPlan())
		act(() => result.current.report('a', 0, spillsAfter(2)))
		act(() => result.current.report('b', 0, spillsAfter(5)))
		// 24 cards → 26 printed (2 continuations), the line D3 asks the tools for.
		expect(result.current.continuations).toBe(2)
	})
})

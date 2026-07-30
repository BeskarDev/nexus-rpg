import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useFieldDraft } from '../useFieldDraft'

describe('useFieldDraft', () => {
	it('starts from the store value', () => {
		const { result } = renderHook(() => useFieldDraft('Kael', vi.fn()))
		expect(result.current.value).toBe('Kael')
	})

	it('typing updates the draft without committing', () => {
		const commit = vi.fn()
		const { result } = renderHook(() => useFieldDraft('Kael', commit))

		act(() => result.current.onChange('Kaelen'))
		expect(result.current.value).toBe('Kaelen')
		expect(commit).not.toHaveBeenCalled()
	})

	it('commits the draft on blur', () => {
		const commit = vi.fn()
		const { result } = renderHook(() => useFieldDraft('Kael', commit))

		act(() => result.current.onChange('Kaelen'))
		act(() => result.current.onBlur())
		expect(commit).toHaveBeenCalledExactlyOnceWith('Kaelen')
	})

	it('does NOT commit when the draft is unchanged', () => {
		// The behaviour change this hook makes on purpose: every hand-rolled copy
		// committed unconditionally, so tabbing through a tab dispatched per field
		// and woke the autosave loop for edits nobody made.
		const commit = vi.fn()
		const { result } = renderHook(() => useFieldDraft('Kael', commit))

		act(() => result.current.onBlur())
		expect(commit).not.toHaveBeenCalled()

		act(() => result.current.onChange('Kaelen'))
		act(() => result.current.onChange('Kael'))
		act(() => result.current.onBlur())
		expect(commit).not.toHaveBeenCalled()
	})

	it('re-seeds when the store value changes externally', () => {
		// A character switch, an import, or the "refresh from rulebook" bulk update.
		const { result, rerender } = renderHook(
			({ value }) => useFieldDraft(value, vi.fn()),
			{ initialProps: { value: 'Kael' } },
		)

		act(() => result.current.onChange('half-typed'))
		rerender({ value: 'Thara' })
		expect(result.current.value).toBe('Thara')
	})

	it('works for numbers as well as text', () => {
		const commit = vi.fn()
		const { result } = renderHook(() => useFieldDraft(8, commit))

		act(() => result.current.onChange(12))
		act(() => result.current.onBlur())
		expect(commit).toHaveBeenCalledExactlyOnceWith(12)
	})
})

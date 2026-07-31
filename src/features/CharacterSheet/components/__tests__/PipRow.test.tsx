import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import React from 'react'
import { PipRow, SigilPip } from '../PipRow'

describe('PipRow', () => {
	it('renders one pip per count and fills up to value', () => {
		render(
			<PipRow count={6} value={2} onChange={vi.fn()} sigil="fatigue" tone="orange" label="Fatigue" />,
		)
		const pips = screen.getAllByRole('checkbox')
		expect(pips).toHaveLength(6)
		expect(pips.filter((p) => (p as HTMLInputElement).checked)).toHaveLength(2)
	})

	it('fills up to the clicked pip when it is empty', async () => {
		const onChange = vi.fn()
		render(
			<PipRow count={6} value={2} onChange={onChange} sigil="fatigue" tone="orange" label="Fatigue" />,
		)
		// index 4 is empty (value is 2), so clicking it fills through index 4 => 5
		await userEvent.click(screen.getByLabelText('Fatigue 5 of 6'))
		expect(onChange).toHaveBeenCalledWith(5)
	})

	it('clears back to the clicked pip when it is already filled', async () => {
		const onChange = vi.fn()
		render(
			<PipRow count={6} value={4} onChange={onChange} sigil="fatigue" tone="orange" label="Fatigue" />,
		)
		// index 1 is filled (value is 4), so clicking it clears back to 1
		await userEvent.click(screen.getByLabelText('Fatigue 2 of 6'))
		expect(onChange).toHaveBeenCalledWith(1)
	})

	it('clicking the only filled pip clears the row to zero', async () => {
		const onChange = vi.fn()
		render(
			<PipRow count={3} value={1} onChange={onChange} sigil="resolve" tone="purple" label="Resolve" />,
		)
		await userEvent.click(screen.getByLabelText('Resolve 1 of 3'))
		expect(onChange).toHaveBeenCalledWith(0)
	})

	it('names the row as a group so the pips are not announced bare', () => {
		render(
			<PipRow count={3} value={0} onChange={vi.fn()} sigil="resolve" tone="purple" label="Resolve" />,
		)
		expect(screen.getByRole('group', { name: 'Resolve' })).toBeInTheDocument()
	})

	// M13 S1. Asserted on the declared track count rather than on rendered
	// positions, because jsdom does no layout — a `flexWrap` version of this would
	// pass a "renders 6 pips" test while breaking wherever the container ended,
	// which is the drift `columns` exists to prevent.
	it('lays the pips on a fixed grid when columns is set', () => {
		render(
			<PipRow
				count={6}
				value={2}
				onChange={vi.fn()}
				sigil="fatigue"
				tone="orange"
				label="Fatigue"
				columns={3}
			/>,
		)
		const group = screen.getByRole('group', { name: 'Fatigue' })
		// Emotion applies these through a class, so assert on computed style
		// (`toHaveStyle`) rather than the inline `style` attribute, which is empty.
		expect(group).toHaveStyle({
			display: 'grid',
			gridTemplateColumns: 'repeat(3, max-content)',
		})
		expect(screen.getAllByRole('checkbox')).toHaveLength(6)
	})

	it('stays a single flex row when columns is omitted', () => {
		render(
			<PipRow count={3} value={1} onChange={vi.fn()} sigil="resolve" tone="purple" label="Resolve" />,
		)
		const group = screen.getByRole('group', { name: 'Resolve' })
		expect(group).toHaveStyle({ display: 'flex', flexDirection: 'row' })
	})
})

describe('SigilPip', () => {
	it('toggles when enabled', async () => {
		const onToggle = vi.fn()
		render(
			<SigilPip sigil="wound" emptySigil="hp" tone="red" filled={false} onToggle={onToggle} label="Wounded" />,
		)
		await userEvent.click(screen.getByLabelText('Wounded'))
		expect(onToggle).toHaveBeenCalledTimes(1)
	})

	it('is not operable when disabled', () => {
		// Asserted rather than clicked: MUI disables via `pointer-events: none`, so
		// user-event correctly refuses the click instead of reporting a no-op.
		render(
			<SigilPip sigil="wound" emptySigil="hp" tone="red" filled={false} onToggle={vi.fn()} disabled label="Wounded" />,
		)
		expect(screen.getByLabelText('Wounded')).toBeDisabled()
	})
})

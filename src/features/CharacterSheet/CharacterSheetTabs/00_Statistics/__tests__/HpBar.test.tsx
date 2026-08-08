import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import React from 'react'
import { HpBar } from '../HpBar'

/**
 * M13 S1. The bar's whole job is proportion, so these pin the arithmetic that
 * turns HP into width — the part that was previously spread across a 120px
 * fixed-width footer and could not be read off the rendered result at all.
 *
 * Widths are asserted through `toHaveStyle` (computed style) rather than the
 * `style` attribute: `sx` compiles to an emotion class, so the inline attribute
 * is empty.
 */
describe('HpBar', () => {
	it('fills the whole track at full health', () => {
		render(<HpBar current={28} max={28} temp={0} />)
		expect(screen.getByTestId('hp-bar-fill')).toHaveStyle({ width: '100%' })
	})

	it('fills half the track at half health', () => {
		render(<HpBar current={14} max={28} temp={0} />)
		expect(screen.getByTestId('hp-bar-fill')).toHaveStyle({ width: '50%' })
	})

	it('renders no temp segment when there is no temp HP', () => {
		render(<HpBar current={14} max={28} temp={0} />)
		expect(screen.getByTestId('hp-bar-pool')).toHaveStyle({ width: '100%' })
		expect(screen.queryByTestId('hp-bar-temp')).not.toBeInTheDocument()
	})

	it('splits the track when temp HP extends the pool', () => {
		// 28 real + 12 temp = 40, so the real pool owns 70% of the length and the
		// fill still reads full *of the real pool* rather than of the whole track.
		render(<HpBar current={28} max={28} temp={12} />)
		expect(screen.getByTestId('hp-bar-pool')).toHaveStyle({ width: '70%' })
		expect(screen.getByTestId('hp-bar-temp')).toHaveStyle({ width: '30%' })
		expect(screen.getByTestId('hp-bar-fill')).toHaveStyle({ width: '100%' })
	})

	it('clamps a current value above max instead of overflowing the track', () => {
		render(<HpBar current={40} max={28} temp={0} />)
		expect(screen.getByTestId('hp-bar-fill')).toHaveStyle({ width: '100%' })
	})

	it('survives a zero max without dividing by it', () => {
		// Fatigue 6 drives effective max HP toward zero; the bar must not emit NaN.
		render(<HpBar current={0} max={0} temp={0} />)
		expect(screen.getByTestId('hp-bar-fill')).toHaveStyle({ width: '0%' })
		expect(screen.getByTestId('hp-bar').innerHTML).not.toMatch(/NaN/)
	})

	it('does not announce a second copy of the HP value', () => {
		render(<HpBar current={14} max={28} temp={0} />)
		// The numerals in HpCard are the readout; this is decoration.
		expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
		expect(screen.getByTestId('hp-bar')).toHaveAttribute('aria-hidden', 'true')
	})
})

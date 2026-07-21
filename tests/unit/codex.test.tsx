import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import {
	SigilIcon,
	RuneHeading,
	OrnamentDivider,
	MagicCallout,
} from '@site/src/components/codex'

describe('codex kit', () => {
	it('SigilIcon renders an inline svg using currentColor', () => {
		const { container } = render(<SigilIcon name="rune" />)
		const svg = container.querySelector('svg')
		expect(svg).toBeTruthy()
		expect(svg?.getAttribute('stroke')).toBe('currentColor')
		// Decorative by default: hidden from the a11y tree.
		expect(svg?.getAttribute('aria-hidden')).toBe('true')
	})

	it('SigilIcon exposes a label when given a title', () => {
		const { container } = render(<SigilIcon name="sun" title="Sun disc" />)
		const svg = container.querySelector('svg')
		expect(svg?.getAttribute('aria-label')).toBe('Sun disc')
		expect(svg?.getAttribute('aria-hidden')).toBeNull()
	})

	it('RuneHeading pairs a pulsing magic glyph with readable text', () => {
		const { container, getByText } = render(
			<RuneHeading sigil="rune">Sorcery</RuneHeading>,
		)
		expect(getByText('Sorcery')).toBeTruthy()
		// Glyph carries the global magic-accent + runeGlyph pulse classes.
		const glyph = container.querySelector('.magic-accent.runeGlyph')
		expect(glyph).toBeTruthy()
		expect(glyph?.querySelector('svg')).toBeTruthy()
	})

	it('OrnamentDivider is a static bronze separator by default', () => {
		const { container } = render(<OrnamentDivider />)
		const sep = container.querySelector('[role="separator"]')
		expect(sep).toBeTruthy()
		// No magic accent unless explicitly requested.
		expect(container.querySelector('.magic-accent')).toBeNull()
	})

	it('OrnamentDivider takes the magic accent when magic', () => {
		const { container } = render(<OrnamentDivider magic />)
		expect(container.querySelector('.magic-accent.runeGlyph')).toBeTruthy()
	})

	it('MagicCallout renders the magic admonition with title and body', () => {
		const { container, getByText } = render(
			<MagicCallout title="Omen">A star falls.</MagicCallout>,
		)
		const box = container.querySelector('.alert.alert--magic')
		expect(box).toBeTruthy()
		expect(getByText('Omen')).toBeTruthy()
		expect(getByText('A star falls.')).toBeTruthy()
		expect(container.querySelector('.magic-accent.runeGlyph')).toBeTruthy()
	})
})

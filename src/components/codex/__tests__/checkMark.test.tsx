import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import {
	CHECK_MARK_CLASS,
	CheckMarkChecked,
	CheckMarkEmpty,
	CheckMarkIndeterminate,
} from '../CheckMark'
import { theme } from '@site/src/hooks/createTheme'

/**
 * The checkbox mark is levelled at the THEME (M13 S4d), which is the only reason
 * every checkbox in the app gets it. These assertions guard that wiring — a call
 * site passing its own icon is fine, the default silently reverting to Material's
 * rounded tick is not.
 */
describe('the drawn checkbox is the app default', () => {
	type CheckboxOverrides = {
		defaultProps?: Record<string, unknown>
		styleOverrides?: { root?: Record<string, unknown> }
	}
	const checkbox = theme.components?.MuiCheckbox as
		CheckboxOverrides | undefined

	it.each(['icon', 'checkedIcon', 'indeterminateIcon'])(
		'wires %s to a drawn mark',
		(prop) => {
			expect(checkbox?.defaultProps?.[prop]).toBeTruthy()
		},
	)

	it('has no rounded corners — every control on the site has hard vertices', () => {
		expect(checkbox?.styleOverrides?.root?.borderRadius).toBe(0)
	})

	it('drops the Material ripple', () => {
		expect(checkbox?.defaultProps?.disableRipple).toBe(true)
	})

	it('inks a menu row’s mark from the row’s own checked state', () => {
		// The mark draws in `currentColor` and a menu row's colour is the reading ink,
		// so this rule is what makes a SET inlay bronze. It replaced an `sx` at the
		// call site — the last piece of the category menu's styling in feature code.
		const menuItem = theme.components?.MuiMenuItem as
			CheckboxOverrides | undefined
		expect(
			menuItem?.styleOverrides?.root?.[
				`&[aria-checked="true"] .${CHECK_MARK_CLASS}`
			],
		).toBeTruthy()
	})
})

describe('the marks themselves', () => {
	it('draws an empty socket with no inlay', () => {
		const { container } = render(<CheckMarkEmpty />)
		expect(container.querySelector('polygon')).toBeNull()
		expect(container.querySelectorAll('rect')).toHaveLength(1)
	})

	it('sets a lozenge into the checked socket', () => {
		const { container } = render(<CheckMarkChecked />)
		expect(container.querySelector('polygon')).not.toBeNull()
	})

	it('draws a bar, not a lozenge, when indeterminate', () => {
		const { container } = render(<CheckMarkIndeterminate />)
		expect(container.querySelector('polygon')).toBeNull()
		// wash + frame + bar
		expect(container.querySelectorAll('rect')).toHaveLength(3)
	})

	it('carries the class the theme inks it through', () => {
		const { container } = render(<CheckMarkChecked />)
		expect(container.querySelector('svg')?.getAttribute('class')).toContain(
			CHECK_MARK_CLASS,
		)
	})

	it('keeps the mark out of the accessibility tree', () => {
		const { container } = render(<CheckMarkChecked />)
		expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe(
			'true',
		)
	})
})

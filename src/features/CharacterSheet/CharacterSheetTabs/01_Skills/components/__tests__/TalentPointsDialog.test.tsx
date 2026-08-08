import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { TalentPointsDialog } from '../TalentPointsDialog'
import type { TalentPointSummary } from '../../../../utils/calculateTalentPoints'

/**
 * These assert the three STATES the dialog was rebuilt to say (M13 S3, second
 * pass), not its styling. The old dialog listed only skills with points left to
 * spend, so "overspent" and "fully spent" had no surface anywhere on the sheet —
 * that is the behaviour worth pinning.
 */
const summary = (
	skill: string,
	available: number,
	spent: number,
): TalentPointSummary => ({
	skill,
	xp: available * 2,
	available,
	spent,
	missing: Math.max(available - spent, 0),
	overspent: Math.max(spent - available, 0),
})

const renderDialog = (
	summaries: TalentPointSummary[],
	overrides: Partial<React.ComponentProps<typeof TalentPointsDialog>> = {},
) => {
	const props = {
		open: true,
		onClose: vi.fn(),
		summaries,
		unassignedSpent: 0,
		characterLevel: 3,
		maxXpPerSkill: 6,
		onBrowseTalents: vi.fn(),
		...overrides,
	}
	render(<TalentPointsDialog {...props} />)
	return props
}

/** The plate a given caption heads, so a row is asserted in the right group. */
const plate = (caption: string) =>
	screen.getByText(caption).closest('.cs-record-plate') as HTMLElement

describe('TalentPointsDialog', () => {
	it('groups a skill into overspent, to spend, or fully spent', () => {
		renderDialog([
			summary('Fighting', 2, 3),
			summary('Arcana', 3, 1),
			summary('Stealth', 2, 2),
		])

		expect(within(plate('Overspent')).getByText('Fighting')).toBeTruthy()
		expect(within(plate('To spend')).getByText('Arcana')).toBeTruthy()
		expect(within(plate('Fully spent')).getByText('Stealth')).toBeTruthy()
	})

	it('shows the open balance signed, and omits it when settled', () => {
		renderDialog([summary('Arcana', 3, 1), summary('Stealth', 2, 2)])

		expect(within(plate('To spend')).getByText('(+2)')).toBeTruthy()
		expect(within(plate('Fully spent')).queryByText(/\(/)).toBeNull()
	})

	it('drops a trained skill that has earned and spent nothing', () => {
		renderDialog([summary('Survival', 0, 0)])

		expect(screen.queryByText('Survival')).toBeNull()
		expect(screen.getByText(/No talent points yet/)).toBeTruthy()
	})

	it('names points spent on talents that carry no skill', () => {
		renderDialog([summary('Arcana', 3, 1)], { unassignedSpent: 2 })

		expect(screen.getByRole('note').textContent).toContain(
			'2 talent points are spent',
		)
	})

	it('hands off to the talent search rather than dead-ending on Close', () => {
		const { onBrowseTalents } = renderDialog([summary('Arcana', 3, 1)])

		fireEvent.click(screen.getByRole('button', { name: 'Browse talents' }))

		expect(onBrowseTalents).toHaveBeenCalledTimes(1)
	})
})

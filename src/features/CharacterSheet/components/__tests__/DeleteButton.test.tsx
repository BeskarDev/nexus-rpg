import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { DeleteButton } from '../DeleteButton'

/**
 * The delete gate (2026-08-02, owner call).
 *
 * The contract these hold is not "a dialog exists" but **that a single press can
 * no longer destroy a content entity**. That used to depend on each of seven call
 * sites remembering to wrap its own delete, which is the kind of discipline a test
 * exists to replace.
 */
describe('DeleteButton', () => {
	it('does not delete on the press alone', () => {
		const onDelete = vi.fn()
		render(<DeleteButton onDelete={onDelete} entityKind="ability" />)
		fireEvent.click(screen.getByLabelText('delete'))
		expect(onDelete).not.toHaveBeenCalled()
	})

	it('deletes once the confirmation is confirmed', () => {
		const onDelete = vi.fn()
		render(
			<DeleteButton
				onDelete={onDelete}
				entityKind="ability"
				entityName="Cleave"
			/>,
		)
		fireEvent.click(screen.getByLabelText('delete'))
		fireEvent.click(screen.getByRole('button', { name: 'Delete ability' }))
		expect(onDelete).toHaveBeenCalledTimes(1)
	})

	it('names what is about to go, so a mis-press is recognisable', () => {
		// The dialog appears after an accidental click; "Delete entry?" tells the
		// reader nothing about which of the twelve rows they hit.
		render(
			<DeleteButton
				onDelete={vi.fn()}
				entityKind="weapon"
				entityName="Bronze Khopesh"
			/>,
		)
		fireEvent.click(screen.getByLabelText('delete'))
		expect(screen.getByRole('dialog').textContent).toContain('Bronze Khopesh')
		expect(screen.getByRole('dialog').textContent).toContain('cannot be undone')
	})

	it('keeps the entity after a cancel', () => {
		const onDelete = vi.fn()
		render(<DeleteButton onDelete={onDelete} entityKind="spell" />)
		fireEvent.click(screen.getByLabelText('delete'))
		fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))
		expect(onDelete).not.toHaveBeenCalled()
	})

	it('deletes straight through when a caller owns the confirmation', () => {
		// `PartyMemberItem` only: two dialogs for one press is worse than none.
		const onDelete = vi.fn()
		render(<DeleteButton onDelete={onDelete} confirm={false} />)
		fireEvent.click(screen.getByLabelText('delete'))
		expect(onDelete).toHaveBeenCalledTimes(1)
		expect(screen.queryByRole('dialog')).toBeNull()
	})
})

/**
 * The half a component test cannot reach: whether the CALLERS said what they are
 * deleting. A `DeleteButton` with no `entityKind` still confirms, but it asks
 * "Delete entry?" over a row the reader has to guess at.
 */
describe('DeleteButton call sites', () => {
	it('every sheet caller names its entity or opts out explicitly', async () => {
		const fs = await import('node:fs')
		const path = await import('node:path')
		const root = path.resolve(__dirname, '../..')

		const walk = (dir: string): string[] =>
			fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
				const full = path.join(dir, entry.name)
				if (entry.isDirectory()) {
					return entry.name === '__tests__' ? [] : walk(full)
				}
				return entry.name.endsWith('.tsx') ? [full] : []
			})

		const uses: string[] = []
		const offenders = walk(root).flatMap((file) => {
			const source = fs.readFileSync(file, 'utf8')
			// The component's own definition, not a use of it.
			if (file.endsWith('components/DeleteButton.tsx')) return []
			const matches = [...source.matchAll(/<DeleteButton\b[\s\S]*?\/>/g)]
			uses.push(...matches.map(() => path.relative(root, file)))
			return matches
				.filter(
					(match) =>
						!match[0].includes('entityKind') &&
						!match[0].includes('confirm={false}'),
				)
				.map(() => path.relative(root, file))
		})

		expect(offenders).toEqual([])
		// The second assertion the S8c grid-parity test learned to carry: a scan
		// that silently matches nothing passes forever.
		expect(uses.length).toBeGreaterThanOrEqual(7)
	})
})

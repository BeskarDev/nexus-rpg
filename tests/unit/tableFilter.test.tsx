import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { render, fireEvent } from '@testing-library/react'
import TableFilter from '@site/src/components/codex/TableFilter'

const OVERVIEW = fs.readFileSync(
	path.resolve(
		__dirname,
		'../../docs/01-basic-rules/03-quickstart-characters/00-overview.mdx',
	),
	'utf-8',
)

function table() {
	return (
		<TableFilter column="Role" options="Tank, Striker, Support">
			<table>
				<thead>
					<tr>
						<th>Archetype</th>
						<th>Role</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Fighter</td>
						<td>Tank / Striker</td>
					</tr>
					<tr>
						<td>Bard</td>
						<td>Support / Controller</td>
					</tr>
					<tr>
						<td>Rogue</td>
						<td>Striker / Utility</td>
					</tr>
				</tbody>
			</table>
		</TableFilter>
	)
}

const visible = (c: HTMLElement) =>
	Array.from(c.querySelectorAll('tbody tr'))
		.filter((r) => !(r as HTMLElement).hidden)
		.map((r) => r.children[0].textContent)

describe('TableFilter (M22, owner review)', () => {
	it('shows every row until a filter is chosen', () => {
		const { container } = render(table())
		expect(visible(container)).toEqual(['Fighter', 'Bard', 'Rogue'])
	})

	it('keeps a row that claims the role ANYWHERE in the cell', () => {
		// `Tank / Striker` has to answer both filters — the reader's question is
		// "can this fill the seat", not "is this its primary job".
		const { container, getByText } = render(table())
		fireEvent.click(getByText('Striker'))
		expect(visible(container)).toEqual(['Fighter', 'Rogue'])
		fireEvent.click(getByText('Tank'))
		expect(visible(container)).toEqual(['Fighter'])
	})

	it('restores every row on All, and on pressing the active filter again', () => {
		const { container, getByText } = render(table())
		fireEvent.click(getByText('Support'))
		expect(visible(container)).toEqual(['Bard'])
		fireEvent.click(getByText('Support'))
		expect(visible(container)).toEqual(['Fighter', 'Bard', 'Rogue'])
		fireEvent.click(getByText('Support'))
		fireEvent.click(getByText('All'))
		expect(visible(container)).toEqual(['Fighter', 'Bard', 'Rogue'])
	})

	it('leaves the table alone when the column is not there', () => {
		const { container } = render(
			<TableFilter column="Nope" options="Tank">
				<table>
					<thead>
						<tr>
							<th>Role</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Tank</td>
						</tr>
					</tbody>
				</table>
			</TableFilter>,
		)
		expect(visible(container)).toEqual(['Tank'])
	})

	it('states the count only while a filter is active', () => {
		const { getByText, queryByText } = render(table())
		expect(queryByText('3 of 3')).toBeNull()
		fireEvent.click(getByText('Striker'))
		expect(getByText('2 of 3')).toBeTruthy()
	})
})

describe('the generated overview (owner review)', () => {
	it('leads with the filterable table, then the rules that produced it', () => {
		const glance = OVERVIEW.indexOf('## Archetypes at a Glance')
		const using = OVERVIEW.indexOf('## Using These Examples')
		const tips = OVERVIEW.indexOf('## Customization Tips')
		expect(glance).toBeGreaterThan(0)
		expect(using).toBeGreaterThan(glance)
		expect(tips).toBeGreaterThan(using)
	})

	it('lists the 25 archetypes ONCE, through the filter', () => {
		expect(OVERVIEW).toContain(
			'<TableFilter column="Role" options="Tank, Striker, Support, Controller">',
		)
		// The role-grouped index listed the same 25 a second time.
		expect(OVERVIEW).not.toContain('<ToolIndex>')
		expect(OVERVIEW).not.toContain('## Choose a Role')
	})
})

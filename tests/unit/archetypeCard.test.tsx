import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'
import { render } from '@testing-library/react'
import ArchetypeCard, {
	ArchetypeSection,
	ArchetypeField,
	ArchetypeTally,
} from '@site/src/components/codex/ArchetypeCard'
import { deriveAll } from '@site/src/utils/content-gen/archetype-derivation'

const DOC_DIR = path.resolve(
	__dirname,
	'../../docs/01-basic-rules/03-quickstart-characters',
)

const page = (slug: string) =>
	fs.readFileSync(path.join(DOC_DIR, `${slug}.mdx`), 'utf-8')

describe('ArchetypeCard (M22 S3)', () => {
	it('draws the gate family: four corners and its own keystone', () => {
		const { container } = render(
			<ArchetypeCard role="Tank / Striker" str="d8" agi="d6" spi="d6" mnd="d4">
				<p>body</p>
			</ArchetypeCard>,
		)
		// Four corner marks plus the keystone; the keystone is the only 100x30 box.
		const svgs = [...container.querySelectorAll('svg')]
		expect(
			svgs.filter((s) => s.getAttribute('viewBox') === '0 0 96 96'),
		).toHaveLength(4)
		expect(
			svgs.filter((s) => s.getAttribute('viewBox') === '0 0 100 30'),
		).toHaveLength(1)
	})

	it('renders one role tag per job, not one string with a slash in it', () => {
		const { getByText, queryByText } = render(
			<ArchetypeCard role="Tank / Striker" str="d8" agi="d6" spi="d6" mnd="d4">
				<p>body</p>
			</ArchetypeCard>,
		)
		expect(getByText('Tank')).toBeTruthy()
		expect(getByText('Striker')).toBeTruthy()
		expect(queryByText('Tank / Striker')).toBeNull()
	})

	it('states every attribute as a die token AND a readable value', () => {
		const { container, getByText } = render(
			<ArchetypeCard role="Striker" str="d8" agi="d10" spi="d6" mnd="d4">
				<p>body</p>
			</ArchetypeCard>,
		)
		for (const label of ['STR', 'AGI', 'SPI', 'MND']) {
			expect(getByText(label)).toBeTruthy()
		}
		// A custom mark is never the only carrier of meaning: DieToken puts the full
		// value in a screen-reader span beside the polygon.
		expect(container.textContent).toContain('d10')
	})

	it('keeps section and field contents as children, so the plugins still see them', () => {
		// Pattern 1: anything a player could look up has to arrive as markdown
		// children. A link standing in for a chip here proves the element survives
		// rather than being flattened into an attribute string.
		const { getByRole } = render(
			<ArchetypeCard role="Support" str="d6" agi="d6" spi="d8" mnd="d4">
				<ArchetypeSection label="Skills">
					<ArchetypeField label="Rank 1" block>
						<a href="/docs/skills#nature">Nature</a>
					</ArchetypeField>
				</ArchetypeSection>
			</ArchetypeCard>,
		)
		expect(getByRole('link', { name: 'Nature' }).getAttribute('href')).toBe(
			'/docs/skills#nature',
		)
	})
})

describe('generated archetype pages (M22 S3)', () => {
	const all = deriveAll()

	it('renders every archetype through exactly one card', () => {
		for (const a of all) {
			const source = page(a.slug)
			expect(source.match(/<ArchetypeCard/g) ?? []).toHaveLength(1)
			expect(source.match(/<\/ArchetypeCard>/g) ?? []).toHaveLength(1)
			// Every section opened is closed.
			expect(source.match(/<ArchetypeSection/g)?.length).toBe(
				source.match(/<\/ArchetypeSection>/g)?.length,
			)
		}
	})

	it('states the derived tally inside the Equipment block, never in the prose', () => {
		for (const a of all) {
			const source = page(a.slug)
			const equipment = source.match(
				/<ArchetypeSection label="Equipment">([\s\S]*?)<\/ArchetypeSection>/,
			)
			expect(equipment).toBeTruthy()
			expect(equipment![1]).toContain(`coins={${a.equipment.coinsRemaining}}`)
			expect(equipment![1]).toContain(`load={${a.equipment.totalLoad}}`)
			expect(equipment![1]).toContain(`capacity={${a.equipment.carryCapacity}}`)
			// The old hand-typed run-ins are gone from every page.
			expect(source).not.toContain('**Total Load:**')
			expect(source).not.toContain('**Remaining Coins:**')
			expect(source).not.toContain('label="Totals"')
		}
	})

	it('names body armor with the noun the catalogue leaves off', () => {
		// The catalogue entry is `Leather`; a kit list reading "Longsword, Light
		// Shield, Leather" is missing a word. The JSON reference stays verbatim.
		const source = page('fighter')
		expect(source).toContain('Leather Armor (50 coins, 1 load)')
		// And nothing that already says armor gets it twice.
		for (const a of all) {
			expect(page(a.slug)).not.toMatch(/(Mail|Harness|Breastplate) Armor/)
		}
	})

	it('never bolds a skill name, which would hide it from the chip plugin', () => {
		// Both plugins skip text inside a `strong` ancestor, so `**Fighting**` was
		// the one thing on these pages the skill-chip plugin could never see — and
		// it also defeated the `†` mark, which was matched against the bolded
		// string rather than the skill name.
		for (const a of all) {
			const rank1 = page(a.slug).match(
				/<ArchetypeField label="Rank 1" block>([\s\S]*?)<\/ArchetypeField>/,
			)
			expect(rank1).toBeTruthy()
			for (const skill of a.skills.rank1) {
				expect(rank1![1]).not.toContain(`**${skill}**`)
				expect(rank1![1]).toContain(skill)
			}
		}
	})

	it('marks a customised skill at BOTH ranks, one rule for the page', () => {
		for (const a of all) {
			const source = page(a.slug)
			for (const skill of a.skills.customised) {
				expect(source).toContain(`${skill} †`)
			}
		}
	})

	it('keeps playstyle and advancement outside the card (Q4)', () => {
		for (const a of all) {
			const source = page(a.slug)
			const close = source.indexOf('</ArchetypeCard>')
			expect(close).toBeGreaterThan(0)
			expect(source.indexOf('## Playstyle')).toBeGreaterThan(close)
			expect(source.indexOf('## Advancement')).toBeGreaterThan(close)
		}
	})
})

describe('ArchetypeTally (owner review)', () => {
	it('puts each derivation under the number it produces', () => {
		const { getByText } = render(
			<ArchetypeTally
				coins={0}
				coinsFrom="350 - 350 spent"
				load={9}
				loadFrom="equipment 4 + standard gear 5"
				capacity={12}
				capacityFrom="1/2 STR 4 + 8"
			/>,
		)
		expect(getByText('Coins left')).toBeTruthy()
		expect(getByText('350 - 350 spent')).toBeTruthy()
		expect(getByText('equipment 4 + standard gear 5')).toBeTruthy()
		expect(getByText('1/2 STR 4 + 8')).toBeTruthy()
	})
})

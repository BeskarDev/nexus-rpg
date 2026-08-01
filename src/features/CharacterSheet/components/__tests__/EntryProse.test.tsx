import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import {
	EntryProse,
	TalentLadder,
	entrySummary,
	talentRankSpan,
} from '../EntryProse'
import talentsData from '@site/src/utils/data/json/talents.json'
import arcaneData from '@site/src/utils/data/json/arcane-spells.json'
import mysticData from '@site/src/utils/data/json/mystic-spells.json'
import artsData from '@site/src/utils/data/json/combat-arts.json'

/**
 * M13 S8b — the structure the flattened `sanitizeHtml` string was throwing away.
 *
 * The corpus assertions matter more than the rendering ones. These components
 * call the CONTENT GENERATORS' parsers, which fail loudly by contract: that is
 * right at build time and would be a white screen for a player here. So the
 * tests pin both halves — that the whole live corpus parses today, and that an
 * entry which does not still renders something.
 */

const talents = talentsData as { name: string; description: string }[]
const arcane = arcaneData as { name: string; effect: string }[]
const mystic = mysticData as { name: string; effect: string }[]
const arts = artsData as { name: string; effect: string }[]

describe('TalentLadder', () => {
	it('renders the rank ladder rather than one flattened paragraph', () => {
		const laddered = talents.find((t) => t.name === 'Arcane Spell Knowledge')!
		render(<TalentLadder source={laddered.description} name={laddered.name} />)

		// The ladder is the talent's shape; a single paragraph is a different fact.
		expect(screen.getByText('Rank 1')).toBeTruthy()
		expect(screen.getByText('Rank 2')).toBeTruthy()
		expect(document.querySelectorAll('.cs-talent-rung').length).toBeGreaterThan(
			1,
		)
	})

	it('lifts a whole-talent rule above the ladder instead of into rung 1', () => {
		const withPreamble = talents.find(
			(t) => t.name === 'Arcane Spell Knowledge',
		)!
		render(
			<TalentLadder
				source={withPreamble.description}
				name={withPreamble.name}
			/>,
		)

		const preamble = document.querySelector('.cs-entry-prose__preamble')
		expect(preamble).toBeTruthy()
		expect(preamble?.textContent).toContain(
			'without having taken its lower ranks',
		)
	})

	it('falls back to plain prose rather than throwing on unparseable data', () => {
		render(
			<TalentLadder source="<p>No rank labels at all.</p>" name="Broken" />,
		)

		expect(screen.getByText(/No rank labels at all/)).toBeTruthy()
		expect(document.querySelector('.cs-talent-rung')).toBeNull()
	})

	it('parses every talent in the live corpus', () => {
		const unparsed = talents.filter((talent) => {
			const { container } = render(
				<TalentLadder source={talent.description} name={talent.name} />,
			)
			const ok = container.querySelector('.cs-talent-rung') !== null
			container.remove()
			return !ok
		})

		expect(unparsed.map((t) => t.name)).toEqual([])
	})
})

describe('EntryProse', () => {
	it('renders a spell’s success tiers as their own rows', () => {
		const tiered = arcane.find((s) => /<strong>\s*Weak/i.test(s.effect ?? ''))!
		render(<EntryProse source={tiered.effect} name={tiered.name} />)

		expect(screen.getByText('Weak')).toBeTruthy()
		expect(screen.getByText('Strong')).toBeTruthy()
		expect(screen.getByText('Critical')).toBeTruthy()
	})

	/**
	 * A REAL entry, not a hand-written fixture.
	 *
	 * The first draft of this test invented `<p><strong>…</strong></p><ul><li>…`
	 * and fell straight to the fallback: the corpus contains no `<li>` at all, and
	 * the bullet lists come out of the parser's own markdown conversion of
	 * `<br/>`-separated runs. Inventing input for a parser tests the invention.
	 */
	it('renders bold runs and bullet lists, the corpus’s only other markup', () => {
		const listed = arcane.find((s) => s.name === 'Temper Heat')!
		render(<EntryProse source={listed.effect} name={listed.name} />)

		expect(screen.getByText('Warm.').tagName).toBe('STRONG')
		expect(
			document.querySelectorAll('.cs-entry-prose__list li').length,
		).toBeGreaterThan(1)
	})

	/**
	 * `Deep Cut` opens a run at Strong with no Weak. Spells forbid that — a gap
	 * means the data lost a line — but a combat art's prose above the run IS the
	 * base case, so the tiers only add to it. Parsed with the spell rule it throws,
	 * which is why the caller passes the flag and this pins it.
	 */
	it('needs allowPartialRuns for a combat art, and says so by failing without it', () => {
		const deepCut = arts.find((a) => a.name === 'Deep Cut')!

		const { container: strict } = render(
			<EntryProse source={deepCut.effect} name={deepCut.name} />,
		)
		expect(strict.querySelector('[class*="successLabel"]')).toBeNull()

		const { container: relaxed } = render(
			<EntryProse
				source={deepCut.effect}
				name={deepCut.name}
				allowPartialRuns
			/>,
		)
		expect(relaxed.querySelector('[class*="successLabel"]')).toBeTruthy()
	})

	it.each([
		['arcane spells', arcane, false],
		['mystic spells', mystic, false],
		['combat arts', arts, true],
	] as const)('parses every entry in %s', (_label, rows, partial) => {
		const failed = rows.filter((row) => {
			const { container } = render(
				<EntryProse
					source={row.effect ?? ''}
					name={row.name}
					allowPartialRuns={partial}
				/>,
			)
			// The fallback is the only path that emits an inline `white-space`.
			const fellBack = container.querySelector('p[style]') !== null
			container.remove()
			return fellBack
		})

		expect(failed.map((r) => r.name)).toEqual([])
	})
})

describe('entrySummary (the row lead)', () => {
	it('flows the text instead of keeping the breaks that ate the clamp', () => {
		// `sanitizeHtml` turned each `<br/>` into a newline and the cell rendered
		// `white-space: pre-line`, so a talent's rank breaks spent one or two of its
		// three clamped lines on blank space.
		const out = entrySummary('One.<br/><br/>Two.<br/><br/>Three.')

		expect(out).toBe('One. Two. Three.')
		expect(out).not.toContain('\n')
	})

	it('drops the rank labels for a talent, now that the span has its own column', () => {
		const source =
			'<strong>(Rank 1)</strong> Gain a thing.<br/><br/><strong>(Rank 2)</strong> Gain more.'

		expect(entrySummary(source, { stripRankLabels: true })).toBe(
			'Gain a thing. Gain more.',
		)
		// Off by default: only talents have them.
		expect(entrySummary(source)).toContain('(Rank 1)')
	})

	it('leaves every live talent with a non-empty lead', () => {
		const empty = talents.filter(
			(t) => !entrySummary(t.description, { stripRankLabels: true }).trim(),
		)
		expect(empty.map((t) => t.name)).toEqual([])
	})
})

describe('talentRankSpan', () => {
	it('reads a contiguous ladder as the span the docs card shows', () => {
		const laddered = talents.find((t) => t.name === 'Arcane Spell Knowledge')!
		expect(talentRankSpan(laddered.description, laddered.name)).toMatch(
			/^1-\d$/,
		)
	})

	it('uses an ASCII hyphen, since CLAUDE.md bars en dashes from game content', () => {
		for (const talent of talents) {
			const span = talentRankSpan(talent.description, talent.name)
			if (span) expect(span).not.toMatch(/[–—]/)
		}
	})

	it('returns null rather than lying when the ladder has a gap', () => {
		// The generator FAILS THE BUILD here, because a span over a gap misstates
		// what you can buy. In a dialog the honest move is to show nothing.
		const gapped =
			'<strong>(Rank 1)</strong> A.<br/><br/><strong>(Rank 3)</strong> C.'
		expect(talentRankSpan(gapped, 'Gapped')).toBeNull()
		expect(talentRankSpan('<p>no ladder</p>', 'None')).toBeNull()
	})

	it('gives every live talent a span', () => {
		const missing = talents.filter(
			(t) => talentRankSpan(t.description, t.name) === null,
		)
		expect(missing.map((t) => t.name)).toEqual([])
	})
})

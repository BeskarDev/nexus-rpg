import { describe, expect, it } from 'vitest'
import type { Ability, Character } from '@site/src/types/Character'
import {
	catalogueEntries,
	characterAbilities,
	folkEntries,
	rankSpan,
	talentEntries,
	talentRanks,
} from '../abilitySources'
import { bodyChunks } from '../abilityBody'

/** A three-rung ladder in the corpus's own shape (F4). */
const LADDER =
	'You cannot use this while encumbered.' +
	'<br/><br/><strong>(Rank 1)</strong> Gain +1 AV.' +
	'<br/><br/><strong>(Rank 2)</strong> Gain +2 AV.' +
	'<br/><br/><strong>(Rank 3)</strong> Gain +3 AV.'

const ability = (overrides: Partial<Ability> = {}): Ability => ({
	id: 'a1',
	title: 'Stone Hide',
	description: LADDER,
	tag: 'Talent',
	...overrides,
})

const character = (
	abilities: Ability[],
	personal: Partial<Character['personal']> = {},
): Pick<Character, 'personal' | 'skills'> =>
	({
		personal: { name: 'Nabu-shum', folk: 'Dwarf', ...personal },
		skills: { abilities },
	}) as Pick<Character, 'personal' | 'skills'>

describe('talentRanks — the D5 trim', () => {
	it('trims a rank-1 purchase of a 1–3 talent to one rung', () => {
		const trimmed = talentRanks(LADDER, 1)
		expect(trimmed).toContain('(Rank 1)')
		expect(trimmed).not.toContain('(Rank 2)')
		expect(trimmed).not.toContain('(Rank 3)')
		// The preamble is a rule that spans every rank, so it survives the cut.
		expect(trimmed).toContain('encumbered')
	})

	it('leaves no trailing break behind the cut', () => {
		expect(talentRanks(LADDER, 1)).not.toMatch(/<br\s*\/?>\s*$/i)
	})

	it('keeps every rung a rank-5 talent has', () => {
		const five = Array.from(
			{ length: 5 },
			(_, i) => `<strong>(Rank ${i + 1})</strong> Rung ${i + 1}.`,
		).join('<br/><br/>')
		const trimmed = talentRanks(five, 5)
		expect(trimmed).toBe(five)
		expect(trimmed).toContain('(Rank 5)')
	})

	it('prints the whole ladder when no rank is given — the full-ladder toggle', () => {
		expect(talentRanks(LADDER, undefined)).toBe(LADDER)
	})

	it('falls back to the untrimmed description on a parse failure', () => {
		// `(<strong>Rank 1)</strong>` is one of the four ways the Notion export
		// corrupted a label, and the generator's parser fails loudly on it. A
		// hand-edited sheet is not the frozen corpus, so a card with one rung too
		// many beats a missing card.
		const mangled =
			'Preamble.<br/><br/>(<strong>Rank 1)</strong> Something.' +
			'<br/><br/><strong>(Rank 2)</strong> More.'
		expect(talentRanks(mangled, 1)).toBe(mangled)
	})

	it('falls back when the description carries no ladder at all', () => {
		const prose = 'A boon from a patron. No ranks anywhere.'
		expect(talentRanks(prose, 2)).toBe(prose)
	})

	it('falls back rather than printing a preamble alone', () => {
		// A capstone talent opens at rank 4. A sheet whose rank was hand-edited to
		// 1 would otherwise cut every rung and leave a card with no rule text.
		const capstone =
			'<em>Requires Athletics 6.</em>' +
			'<br/><br/><strong>(Rank 4)</strong> Leap any distance you can run.' +
			'<br/><br/><strong>(Rank 5)</strong> And do it as a quick action.'
		expect(talentRanks(capstone, 1)).toBe(capstone)
	})

	it('returns empty for an empty description rather than throwing', () => {
		expect(talentRanks('', 1)).toBe('')
	})
})

describe('rankSpan', () => {
	it('states a span when the ladder has several rungs', () => {
		expect(rankSpan(LADDER)).toBe('R1–R3')
	})

	it('states a single rank when the trim left one rung', () => {
		expect(rankSpan(talentRanks(LADDER, 1))).toBe('R1')
	})

	it('says nothing when there is no ladder', () => {
		expect(rankSpan('Just prose.')).toBe('')
	})
})

describe('characterAbilities', () => {
	it('skips combat arts with a count rather than silently (D8)', () => {
		const { entries, skippedCombatArts } = characterAbilities(
			character([
				ability({ id: 'a1' }),
				ability({ id: 'a2', tag: 'Combat Art', title: 'Cleave' }),
				ability({ id: 'a3', tag: 'Combat Art', title: 'Riposte' }),
			]),
			'doc1',
		)
		expect(skippedCombatArts).toBe(2)
		expect(entries).toHaveLength(1)
		expect(entries[0].title).toBe('Stone Hide')
	})

	it('lands an untagged ability in Other (F1)', () => {
		const { entries } = characterAbilities(
			character([
				{
					id: 'a1',
					title: 'Patron Boon',
					description: 'Once per session, reroll.',
				} as Ability,
			]),
			'doc1',
		)
		expect(entries[0].group).toBe('Other')
	})

	it('groups Folk rows into one card titled from personal.folk (F6)', () => {
		const { entries } = characterAbilities(
			character([
				ability({ id: 'f1', tag: 'Folk', title: 'Dwarven Sight' }),
				ability({ id: 'f2', tag: 'Folk', title: 'Stoneskin' }),
				ability({ id: 'f3', tag: 'Folk', title: 'Squat Build' }),
			]),
			'doc1',
		)
		expect(entries).toHaveLength(1)
		expect(entries[0].group).toBe('Folk')
		expect(entries[0].title).toBe('Dwarf')
		expect(entries[0].id).toBe('char:doc1:folk')
		expect(entries[0].abilities?.map((a) => a.name)).toEqual([
			'Dwarven Sight',
			'Stoneskin',
			'Squat Build',
		])
	})

	it('still groups Folk rows the player renamed (D6)', () => {
		// The sheet's text wins over the catalogue, so a renamed row is carried
		// through as written rather than reconciled with `folk.json`.
		const { entries } = characterAbilities(
			character([
				ability({ id: 'f1', tag: 'Folk', title: 'Heat Sight (homebrew)' }),
				ability({ id: 'f2', tag: 'Folk', title: 'Stoneskin' }),
			]),
			'doc1',
		)
		expect(entries).toHaveLength(1)
		expect(entries[0].abilities?.[0].name).toBe('Heat Sight (homebrew)')
	})

	it('titles the folk card even when the sheet records no folk', () => {
		const { entries } = characterAbilities(
			character([ability({ id: 'f1', tag: 'Folk' })], { folk: '' }),
			'doc1',
		)
		expect(entries[0].title).toBe('Folk Abilities')
	})

	it('handles a character with no abilities at all', () => {
		const { entries, skippedCombatArts } = characterAbilities(
			character([]),
			'doc1',
		)
		expect(entries).toEqual([])
		expect(skippedCombatArts).toBe(0)
	})

	it('gives two characters holding one talent two distinct ids (D7)', () => {
		const first = characterAbilities(
			character([ability({ id: 'x', rank: 1 })], { name: 'Nabu-shum' }),
			'doc1',
		)
		const second = characterAbilities(
			character([ability({ id: 'x', rank: 3 })], { name: 'Ereshkigal' }),
			'doc2',
		)
		expect(first.entries[0].id).not.toBe(second.entries[0].id)
		expect(first.entries[0].rank).toBe(1)
		expect(second.entries[0].rank).toBe(3)
		expect(second.entries[0].characterName).toBe('Ereshkigal')
	})

	it('carries the action type and the owning skill through (F7)', () => {
		const { entries } = characterAbilities(
			character([
				ability({ tag: 'Other', actionType: 'Quick Action', skill: 'Arcana' }),
			]),
			'doc1',
		)
		expect(entries[0].actionType).toBe('Quick Action')
		expect(entries[0].category).toBe('Arcana')
	})
})

describe('the catalogues', () => {
	it('gives every talent an id and its skill requirement', () => {
		const talents = talentEntries()
		expect(talents.length).toBeGreaterThan(100)
		talents.forEach((entry) => {
			expect(entry.id.startsWith('talent:')).toBe(true)
			expect(entry.group).toBe('Talent')
			expect(entry.category).toBeTruthy()
			expect(entry.description).toBeTruthy()
		})
	})

	it('gives every folk its roster and languages, and no flavour (Q3)', () => {
		const folk = folkEntries()
		expect(folk.length).toBeGreaterThan(0)
		folk.forEach((entry) => {
			expect(entry.id.startsWith('folk:')).toBe(true)
			expect(entry.abilities?.length).toBeGreaterThan(0)
			expect(entry).not.toHaveProperty('cultures')
			expect(entry.description).toBeUndefined()
		})
	})

	it('holds the worst folk card under the measured budget (F5)', () => {
		// The grouping decision that was measured rather than assumed: one card per
		// folk holds because the largest roster is well under a spell-sized body.
		const worst = Math.max(
			...folkEntries().map((entry) =>
				(entry.abilities ?? []).reduce(
					(total, a) =>
						total +
						a.name.length +
						a.description.replace(/<[^>]*>/g, '').length,
					0,
				),
			),
		)
		expect(worst).toBeLessThan(900)
	})

	it('sorts the combined catalogue by name and gives every entry a unique id', () => {
		const all = catalogueEntries()
		const titles = all.map((entry) => entry.title)
		expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)))
		expect(new Set(all.map((entry) => entry.id)).size).toBe(all.length)
	})
})

describe('bodyChunks — the two encodings (abilityBody.tsx)', () => {
	it('splits HTML on <br/>, as every other deck does', () => {
		expect(bodyChunks('One.<br/><br/>Two.')).toEqual(['One.', 'Two.'])
	})

	it('splits plain text on a blank line', () => {
		expect(bodyChunks('One.\n\nTwo.')).toEqual(['One.', 'Two.'])
	})

	it('keeps a bullet list with the lead-in that introduces it', () => {
		// The rule D4 rests on: a card never cuts between "…the following
		// effects:" and the effects.
		expect(bodyChunks('Lead in:\n\n- One.\n- Two.')).toEqual([
			'Lead in:\n- One.\n- Two.',
		])
	})

	it('returns nothing for an empty body', () => {
		expect(bodyChunks('')).toEqual([])
	})
})

describe('folk.json holds whole rules, not lead-ins (2026-08-07)', () => {
	// Four abilities shipped as a sentence pointing at a list that was only in
	// docs/02-adventurers/01-folk.md — Gnome and Goblin `Small Stature`, Hune and
	// Minotaur `Giant's Blood`. `PersonalTab` copies these onto every character
	// of that folk, so the truncation was on real sheets, not just on a card.
	// There is no generator and no `content:check` gate for folk, so this test is
	// the gate.
	const abilities = folkEntries().flatMap((folk) =>
		(folk.abilities ?? []).map((ability) => ({
			folk: folk.title,
			...ability,
		})),
	)

	it('has no ability that ends on a colon', () => {
		const dangling = abilities.filter((a) => /:\s*$/.test(a.description))
		expect(dangling.map((a) => `${a.folk} / ${a.name}`)).toEqual([])
	})

	it('follows every "the following effects:" with a bullet list', () => {
		const promised = abilities.filter((a) =>
			/following effects:/.test(a.description),
		)
		expect(promised.length).toBeGreaterThan(0)
		promised.forEach((a) => {
			expect(a.description, `${a.folk} / ${a.name}`).toMatch(/\n\s*-\s+\S/)
		})
	})

	it("agrees with the docs on Small Stature and Giant's Blood", () => {
		const small = abilities.filter((a) => a.name === 'Small Stature')
		expect(small).toHaveLength(2)
		small.forEach((a) => {
			expect(a.description).toContain('+1 boon on Agility rolls to hide')
			expect(a.description).toContain('versatile weapons two-handed')
			expect(a.description).toContain('+1d (max. d12)')
		})
		const giant = abilities.filter((a) => a.name === "Giant's Blood")
		expect(giant).toHaveLength(2)
		giant.forEach((a) => {
			expect(a.description).toContain('+2 to your carrying capacity')
			expect(a.description).toContain('-1d (min. d4)')
		})
	})
})

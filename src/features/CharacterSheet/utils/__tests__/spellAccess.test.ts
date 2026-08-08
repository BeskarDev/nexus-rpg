import { describe, it, expect } from 'vitest'
import { maxLearnableSpellRank, SPELL_GRANTING_TALENTS } from '../spellAccess'
import talentsData from '@site/src/utils/data/json/talents.json'
import type { Ability, Skill } from '@site/src/types/Character'

const skill = (name: string, rank: number): Skill =>
	({ id: name, name, rank, xp: rank * 2 }) as Skill

const talent = (title: string, rank: number): Ability =>
	({ id: title, title, description: '', tag: 'Talent', rank }) as Ability

describe('maxLearnableSpellRank', () => {
	it('reads the magic skill when nothing else grants spells', () => {
		expect(maxLearnableSpellRank('Arcana', [skill('Arcana', 3)], [])).toBe(3)
	})

	it('says null — not zero — when there is no access at all', () => {
		// "No Mysticism whatsoever" and "Mysticism at rank 0" are different
		// statements, and only the first should bar every spell.
		expect(
			maxLearnableSpellRank('Mysticism', [skill('Arcana', 4)], []),
		).toBeNull()
		expect(
			maxLearnableSpellRank('Mysticism', [skill('Mysticism', 0)], []),
		).toBe(0)
	})

	/**
	 * The owner's correction. `Divine Scholar` sits under LORE and grants MYSTIC
	 * spells, so a character with no Mysticism at all can legitimately know them —
	 * which the first pass barred outright.
	 */
	it('grants mystic access through Divine Scholar with no Mysticism at all', () => {
		const character = [skill('Lore', 3)]
		const abilities = [talent('Divine Scholar', 3)]

		// Rank 3 grants "one spell of rank 2 or lower" — one below the talent rank.
		expect(maxLearnableSpellRank('Mysticism', character, abilities)).toBe(2)
		// And it says nothing about arcane spells.
		expect(maxLearnableSpellRank('Arcana', character, abilities)).toBeNull()
	})

	it('takes whichever of skill and talent reaches higher', () => {
		const abilities = [talent('Arcane Spell Knowledge', 5)]
		expect(
			maxLearnableSpellRank('Arcana', [skill('Arcana', 2)], abilities),
		).toBe(5)
		expect(
			maxLearnableSpellRank(
				'Arcana',
				[skill('Arcana', 5)],
				[talent('Arcane Spell Knowledge', 1)],
			),
		).toBe(5)
	})

	it('never reports a negative ceiling', () => {
		// Divine Scholar at rank 0 computes to -1, which would read as no access
		// rather than as the rank-0 access it is.
		expect(
			maxLearnableSpellRank('Mysticism', [], [talent('Divine Scholar', 0)]),
		).toBe(0)
	})

	it('ignores a granting title that is not a Talent', () => {
		const asCombatArt = {
			...talent('Arcane Spell Knowledge', 4),
			tag: 'Combat Art',
		} as Ability
		expect(maxLearnableSpellRank('Arcana', [], [asCombatArt])).toBeNull()
	})
})

/**
 * The guard that keeps the table from silently falling behind the rulebook.
 *
 * `SPELL_GRANTING_TALENTS` is hand-written because the grants live in prose and
 * parsing an English sentence for a number that gates a rules check is a guess.
 * Hand-written tables rot, so this fails when `talents.json` gains a spell-granter
 * that nobody added — the same shape as the `DAMAGE_SIGIL` parity test.
 */
describe('SPELL_GRANTING_TALENTS covers the rulebook', () => {
	const talents = talentsData as { name: string; description: string }[]

	it('names every talent whose text grants a spell', () => {
		const granters = talents
			.filter((entry) =>
				/learn\s+(?:\w+\s+){0,4}spell/i.test(entry.description),
			)
			.map((entry) => entry.name)

		const missing = granters.filter((name) => !SPELL_GRANTING_TALENTS[name])

		expect(missing).toEqual([])
	})

	it('has no entry for a talent that no longer exists', () => {
		const names = new Set(talents.map((entry) => entry.name))
		const stale = Object.keys(SPELL_GRANTING_TALENTS).filter(
			(name) => !names.has(name),
		)

		expect(stale).toEqual([])
	})
})

import { Ability, Skill } from '@site/src/types/Character'

export type MagicType = 'Arcana' | 'Mysticism'

/**
 * A talent that lets you learn spells, and the rank it lets you learn them to.
 *
 * ## Why this table exists (M13 S8b, owner correction)
 *
 * The first pass barred a spell whenever its rank exceeded the character's Arcana
 * or Mysticism, on the magic chapter's rule:
 *
 * > Whenever you gain a rank in Arcana, learn two new spells of equal or lower
 * > rank for any discipline you learned.
 * > — docs/07-magic/01-magic-spells/index.md
 *
 * That is the rule, and it is not the whole rule: **talents grant spells too.**
 * Reading the three that do turned up two distinct shapes, and one of them breaks
 * the skill check outright —
 *
 * - `Arcane Spell Knowledge` / `Mystical Spell Knowledge` grant spells up to their
 *   OWN rank, and their preamble requires the matching skill at that rank anyway
 *   ("provided your Arcana also has the required rank"), so they never reach past
 *   it. Included regardless, because relying on a prose precondition to keep a
 *   number in range is not a check.
 * - **`Divine Scholar` is a LORE talent that grants MYSTIC spells.** A character
 *   with no Mysticism at all can legitimately know them, so the untrained case is
 *   not a bar. Its ladder also grants one rank LOWER than it sits at: rank 1 gives
 *   a rank 0 spell, rank 2 a rank 1, rank 3 a rank 2.
 *
 * ## Why a table rather than a parser
 *
 * The grants live in prose (`Learn two rank 3 or lower spells`), and parsing an
 * English sentence for a number that gates a rules check is the kind of guess this
 * milestone keeps refusing. Three entries, named. `spellAccess.test.ts` fails if
 * `talents.json` gains a fourth, so the table cannot silently fall behind.
 */
export const SPELL_GRANTING_TALENTS: Record<
	string,
	{ grants: MagicType; maxRank: (talentRank: number) => number }
> = {
	'Arcane Spell Knowledge': {
		grants: 'Arcana',
		maxRank: (rank) => rank,
	},
	'Mystical Spell Knowledge': {
		grants: 'Mysticism',
		maxRank: (rank) => rank,
	},
	'Divine Scholar': {
		grants: 'Mysticism',
		// Rank 1 grants a rank 0 spell, rank 2 a rank 1, rank 3 a rank 2.
		maxRank: (rank) => rank - 1,
	},
}

/**
 * The highest spell rank this character can have learned for `magicType`.
 *
 * `null` means no access at all — neither the skill nor a granting talent — which
 * is a different statement from "rank 0 only" and is why this is not just a
 * number.
 */
export const maxLearnableSpellRank = (
	magicType: MagicType,
	skills: Skill[],
	abilities: Ability[],
): number | null => {
	const ceilings: number[] = []

	const skillRank = skills.find((skill) => skill.name === magicType)?.rank
	if (typeof skillRank === 'number') ceilings.push(skillRank)

	for (const ability of abilities) {
		if (ability.tag !== 'Talent') continue
		const granter = SPELL_GRANTING_TALENTS[ability.title.trim()]
		if (!granter || granter.grants !== magicType) continue
		ceilings.push(granter.maxRank(ability.rank ?? 1))
	}

	if (!ceilings.length) return null
	// A granter can compute below zero (Divine Scholar at rank 0), which would read
	// as "no access" rather than as the rank-0 access it actually is.
	return Math.max(0, ...ceilings)
}

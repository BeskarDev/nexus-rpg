import type {
	BondRank2Choice,
	BondRank3Choice,
	CompanionBond,
	CompanionBuild,
	CompanionOwner,
	CompanionStats,
	CompanionTrait,
} from '../../../types/companion'
import companionTraits from '../../data/json/companion-traits.json'
import {
	COMPANION_COMBAT_ARTS,
	MAX_COMPANION_COMBAT_ARTS,
	NO_BOND,
} from './companionBond'
import {
	TIER_NAMES,
	calculateStats,
	getAvailableSizes,
} from './companionCalculations'
import { generateMarkdown } from './companionFormatting'

/**
 * A companion's saved build, and the ONE path from a build to its stat block.
 *
 * The builder's preview, a row's Rebuild and the Companions tab's Refresh all go
 * through `companionMarkdown`, so the three produce byte-identical output for the
 * same choices.
 */

const TRAITS = companionTraits as CompanionTrait[]
export const COMPANION_SIZES = ['Tiny', 'Small', 'Medium', 'Large', 'Huge']

export const findCompanionTrait = (name: string) =>
	TRAITS.find((trait) => trait.name === name)

/** Whether a creature allows a size: `any`, or the one size it is locked to. */
const traitAllowsSize = (trait: CompanionTrait, size: string) =>
	trait.size === 'any' || trait.size.toLowerCase() === size.toLowerCase()

/** Tier, size and creature that the builder itself could have produced. */
export const isValidCommission = (
	tier: number,
	size: string,
	trait: CompanionTrait,
) =>
	Number.isInteger(tier) &&
	TIER_NAMES[tier] !== undefined &&
	getAvailableSizes(tier).includes(size) &&
	traitAllowsSize(trait, size)

/** The stats and markdown for one commission and bond. */
export const companionMarkdown = (
	tier: number,
	size: string,
	trait: CompanionTrait,
	bond: CompanionBond,
): { stats: CompanionStats; markdown: string } => {
	const stats: CompanionStats = {
		tier,
		size,
		trait,
		calculatedStats: calculateStats(tier, size, trait, bond),
	}
	return { stats, markdown: generateMarkdown(stats) }
}

/**
 * The bond a saved build implies for an owner as they are NOW.
 *
 * Talent rank, Nature and Wild Companion known come from the owner. Saved choices
 * the owner can no longer make are dropped quietly: a rank 2 or rank 3 option above
 * the current talent rank, Combat Arts without the Combat Arts option (or no longer
 * in the Basic list), Wild Companion without the talent or the spell.
 */
export const bondFromBuild = (
	build: CompanionBuild,
	owner: CompanionOwner | undefined,
): CompanionBond => {
	const talentRank = owner?.talentRank ?? 0
	const rank2Choice = talentRank >= 2 ? build.rank2Choice : null
	const rank3Choice = talentRank >= 3 ? build.rank3Choice : null
	const combatArts =
		rank2Choice === 'combat-arts'
			? build.combatArts
					.filter((name) =>
						COMPANION_COMBAT_ARTS.some((art) => art.name === name),
					)
					.slice(0, MAX_COMPANION_COMBAT_ARTS)
			: []
	return {
		...NO_BOND,
		talentRank,
		nature: owner?.nature ?? null,
		rank2Choice,
		rank3Choice,
		combatArts,
		wildCompanion:
			build.wildCompanion &&
			talentRank >= 1 &&
			Boolean(owner?.knowsWildCompanion),
		wildCompanionRank: build.wildCompanionRank,
	}
}

/** The build the builder's current state amounts to. */
export const buildFromBuilder = (
	tier: number,
	size: string,
	trait: CompanionTrait,
	bond: CompanionBond,
	owner?: CompanionOwner,
): CompanionBuild => ({
	trait: trait.name,
	tier,
	size,
	rank2Choice: bond.talentRank >= 2 ? bond.rank2Choice : null,
	rank3Choice: bond.talentRank >= 3 ? bond.rank3Choice : null,
	combatArts:
		bond.talentRank >= 2 && bond.rank2Choice === 'combat-arts'
			? [...bond.combatArts]
			: [],
	wildCompanion: bond.talentRank >= 1 && bond.wildCompanion,
	wildCompanionRank: bond.wildCompanionRank,
	builtWith: {
		talentRank: bond.talentRank,
		nature: bond.nature,
		knowsWildCompanion: owner?.knowsWildCompanion ?? bond.wildCompanion,
	},
})

/**
 * Regenerate a saved build's stat block for the owner as they are now.
 *
 * Returns the markdown and the build to store with it: the same choices minus any
 * that were dropped, and `builtWith` updated to the owner values used. Null when
 * the build no longer describes a valid commission (a creature removed from the
 * data, a size the tier no longer reaches), which leaves the companion alone.
 */
export const regenerateCompanion = (
	build: CompanionBuild,
	owner: CompanionOwner | undefined,
): { markdown: string; build: CompanionBuild } | null => {
	const trait = findCompanionTrait(build.trait)
	if (!trait || !isValidCommission(build.tier, build.size, trait)) return null
	const bond = bondFromBuild(build, owner)
	const { markdown } = companionMarkdown(build.tier, build.size, trait, bond)
	return {
		markdown,
		build: buildFromBuilder(build.tier, build.size, trait, bond, owner),
	}
}

/** Compare two stat blocks, ignoring whitespace differences. */
export const sameMarkdown = (a: string, b: string) =>
	a.replace(/\s+/g, ' ').trim() === b.replace(/\s+/g, ' ').trim()

const RANK2_OPTIONS: Record<string, BondRank2Choice> = {
	'two companions': 'two-companions',
	'two combat arts': 'combat-arts',
}
const RANK3_OPTIONS: Record<string, BondRank3Choice> = {
	'pack coordination': 'pack-coordination',
	'+4 damage': 'damage',
}

/**
 * Recover the build behind a builder-made stat block, for companions saved before
 * builds were stored.
 *
 * Reads the header (`#### **Trait** (Size Type)`), the `**Tier:**` line, the
 * optional `**Bond:**` line and the `**Combat Arts:**` names. Returns null unless
 * the creature is in `companion-traits.json` and the tier and size are ones the
 * builder could have produced, so a hand-written block is never claimed.
 */
export const parseCompanionBuild = (
	markdown: string,
): CompanionBuild | null => {
	if (!markdown) return null
	const header = markdown.match(
		/^#{2,6}\s+\*\*(.+?)\*\*\s*\((\w+)\s+(.+)\)\s*$/m,
	)
	const tierLine = markdown.match(/^\*\*Tier:\*\*\s*(\d+)\b/m)
	if (!header || !tierLine) return null

	const trait = findCompanionTrait(header[1].trim())
	const size = COMPANION_SIZES.find(
		(name) => name.toLowerCase() === header[2].toLowerCase(),
	)
	const tier = Number(tierLine[1])
	if (!trait || !size || !isValidCommission(tier, size, trait)) return null

	const bondLine = markdown.match(/^\*\*Bond:\*\*[ \t]*([^\n]*)$/m)?.[1] ?? ''
	const talent = bondLine.match(/Animal Companion rank (\d)(?:\s*\(([^)]*)\))?/)
	const options = (talent?.[2] ?? '')
		.split(',')
		.map((option) => option.trim().toLowerCase())
		.filter(Boolean)
	const rank2Choice =
		options.map((option) => RANK2_OPTIONS[option]).find(Boolean) ?? null
	const rank3Choice =
		options.map((option) => RANK3_OPTIONS[option]).find(Boolean) ?? null
	const wild = bondLine.match(/Wild Companion rank (\d)/)
	const nature = bondLine.match(/Owner’s Nature (\d)/)

	const combatArtsSection =
		markdown.split(/^\*\*Combat Arts:\*\*[ \t]*$/m)[1] ?? ''
	const combatArts: string[] = []
	for (const line of combatArtsSection.split('\n')) {
		const item = line.match(/^-\s+\*\*(.+?)\.?\*\*/)
		if (item) combatArts.push(item[1].replace(/\.$/, '').trim())
		else if (line.trim() && !/^\s/.test(line)) break
	}

	const talentRank = talent
		? (Math.min(3, Math.max(1, Number(talent[1]))) as 1 | 2 | 3)
		: 0
	const wildRank = wild
		? (Math.min(3, Math.max(1, Number(wild[1]))) as 1 | 2 | 3)
		: 1

	return {
		trait: trait.name,
		tier,
		size,
		rank2Choice,
		rank3Choice,
		combatArts,
		wildCompanion: Boolean(wild),
		wildCompanionRank: wildRank,
		...(bondLine
			? {
					builtWith: {
						talentRank,
						nature: nature ? Number(nature[1]) : null,
						knowsWildCompanion: Boolean(wild),
					},
				}
			: {}),
	}
}

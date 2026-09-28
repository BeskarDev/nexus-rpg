import type { CombatArt } from '../../../types/CombatArt'
import type { Character } from '../../../types/Character'
import type { CompanionBond, CompanionOwner } from '../../../types/companion'
import combatArtsData from '../../data/json/combat-arts.json'

/**
 * The owner's side of a companion: the Animal Companion talent (all three ranks and
 * both of their choices) and the Wild Companion spell.
 *
 * Source rules: `talents.json` "Animal Companion" (Nature) and `mystic-spells.json`
 * "Wild Companion". Everything here is pure so the builder, the stat block and the
 * tests read one definition.
 */

export const NO_BOND: CompanionBond = {
	talentRank: 0,
	nature: null,
	rank2Choice: null,
	rank3Choice: null,
	combatArts: [],
	wildCompanion: false,
	wildCompanionRank: 1,
}

/** Animal Companion rank 2 lets the companion learn two Combat Arts. */
export const MAX_COMPANION_COMBAT_ARTS = 2

/** Animal Companion rank 3's damage option: +4 to total damage (ability bonus). */
export const PACK_DAMAGE_BONUS = 4

export const WILD_COMPANION_TYPE = 'Spirit (primal)'

/**
 * The Combat Arts a companion can learn.
 *
 * Basic only. Supreme Combat Arts need the Art of Fighting or Art of Archery talent at
 * rank 4 or higher (Combat Arts overview), which a companion cannot have, and the
 * talent says "the normal rules for how and when to use Combat Arts also apply".
 */
export const COMPANION_COMBAT_ARTS: CombatArt[] = (
	combatArtsData as CombatArt[]
).filter((art) => art.category === 'Basic')

/** The rank 2 choice, only once the talent reaches it. */
export const activeRank2 = (bond: CompanionBond) =>
	bond.talentRank >= 2 ? bond.rank2Choice : null

/** The rank 3 choice, only once the talent reaches it. */
export const activeRank3 = (bond: CompanionBond) =>
	bond.talentRank >= 3 ? bond.rank3Choice : null

/** Wild Companion cannot be cast without the Animal Companion talent. */
export const hasWildCompanion = (bond: CompanionBond) =>
	bond.talentRank >= 1 && bond.wildCompanion

/** The arts that actually apply: rank 2, the Combat Arts option, two at most. */
export const activeCombatArts = (bond: CompanionBond): CombatArt[] => {
	if (activeRank2(bond) !== 'combat-arts') return []
	return bond.combatArts
		.map((name) => COMPANION_COMBAT_ARTS.find((art) => art.name === name))
		.filter((art): art is CombatArt => Boolean(art))
		.slice(0, MAX_COMPANION_COMBAT_ARTS)
}

/** The +4 total damage of the rank 3 damage option, or 0. */
export const bondDamageBonus = (bond: CompanionBond) =>
	activeRank3(bond) === 'damage' ? PACK_DAMAGE_BONUS : 0

/**
 * The highest Tier the owner can control, or null when it cannot be stated (no
 * talent, or the owner's Nature is unknown).
 *
 * Rank 1: a Tier equal to or lower than their Nature. Rank 2's two-companions
 * option: both of a Tier equal to or lower than their Nature - 1.
 */
export const bondTierLimit = (bond: CompanionBond): number | null => {
	if (bond.talentRank < 1 || bond.nature === null) return null
	return activeRank2(bond) === 'two-companions' ? bond.nature - 1 : bond.nature
}

/** "the owner's Nature (3)", or "the owner's Nature" when the rank is unknown. */
const ownersNature = (bond: CompanionBond) =>
	bond.nature === null
		? 'the owner’s Nature'
		: `the owner’s Nature (${bond.nature})`

/**
 * Flatten a Combat Art's HTML effect onto one line.
 *
 * Its `<br/>` breaks separate the Weak / Strong / Critical outcomes. Kept as line
 * breaks they would reach the companion renderers as numbered sub-options, which is
 * the Floating Eye's eye-ray shape and would number an art's outcomes 1, 2, 3.
 */
const flattenEffect = (html: string) =>
	html
		.replace(/<br\s*\/?>/gi, ' ')
		.replace(/\s+/g, ' ')
		.trim()

/** The companion's Combat Arts as HTML entries, in the builder's attack format. */
export const combatArtEntries = (bond: CompanionBond): string[] =>
	activeCombatArts(bond).map(
		(art) => `<strong>${art.name}.</strong> ${flattenEffect(art.effect)}`,
	)

/**
 * The abilities the bond grants, as HTML entries appended after the creature's own.
 *
 * Wording follows the source rules, restated about "this companion" and "the owner"
 * because the block is the companion's.
 */
export const bondAbilities = (bond: CompanionBond): string[] => {
	const abilities: string[] = []
	if (bond.talentRank >= 1) {
		abilities.push(
			`<strong>Bonded.</strong> While their owner can see and hear this companion, any test the owner rolls for them can use ${ownersNature(bond)} instead of the required skill.`,
		)
	}
	if (activeRank3(bond) === 'pack-coordination') {
		abilities.push(
			'<strong>Pack Coordination.</strong> When this companion, their owner or another companion under the owner’s control hits a target, the others gain +1 boon on attacks against that same target during their turn this round.',
		)
	}
	if (hasWildCompanion(bond)) {
		abilities.push(
			'<strong>Psychic Connection.</strong> While this companion and their owner are on the same sphere of existence, they intuitively share emotions. The owner can tell this companion what to do and where to go nonverbally. The owner can also spend their turn meditating to fully experience all of this companion’s senses. While meditating this way, the owner is unconscious and unaware of their own body’s surroundings.',
			'<strong>Primal Spirit.</strong> Any creature capable of sensing magical auras notices this companion’s primal nature. This companion remains until killed and can be summoned again with another ritual.',
		)
		const nature = ownersNature(bond)
		if (bond.wildCompanionRank === 2) {
			abilities.push(
				`<strong>Spirit Casting.</strong> This companion can cast any rank 0 or 1 spells their owner knows. They cast them with their Spirit + ${nature}. Instead of spending Focus, they can only cast a number of rank 1 spells per day equal to ${nature}.`,
			)
		} else if (bond.wildCompanionRank === 3) {
			abilities.push(
				`<strong>Spirit Casting.</strong> This companion can cast any rank 0, 1 or 2 spells their owner knows, with rank 1 spells heightened to rank 2. They cast them with their Spirit + ${nature}. Instead of spending Focus, they can only cast a combined number of rank 1 or 2 spells per day equal to ${nature}.`,
			)
		}
	}
	return abilities
}

/**
 * The bond as one line, written into the stat block as `**Bond:**` so a saved
 * companion says which options it was built with. Empty when there is no bond.
 */
export const bondSummary = (bond: CompanionBond): string => {
	const parts: string[] = []
	if (bond.talentRank >= 1) {
		const options: string[] = []
		const rank2 = activeRank2(bond)
		if (rank2 === 'two-companions') options.push('two companions')
		if (rank2 === 'combat-arts') options.push('two Combat Arts')
		const rank3 = activeRank3(bond)
		if (rank3 === 'pack-coordination') options.push('pack coordination')
		if (rank3 === 'damage') options.push(`+${PACK_DAMAGE_BONUS} damage`)
		parts.push(
			`Animal Companion rank ${bond.talentRank}${
				options.length > 0 ? ` (${options.join(', ')})` : ''
			}.`,
		)
		if (rank2 === 'combat-arts') {
			parts.push(
				'Combat Arts work only while under the owner’s control, by the normal rules for Combat Arts.',
			)
		}
	}
	if (hasWildCompanion(bond)) {
		parts.push(`Wild Companion rank ${bond.wildCompanionRank}.`)
	}
	if (parts.length > 0 && bond.nature !== null) {
		parts.push(`Owner’s Nature ${bond.nature}.`)
	}
	return parts.join(' ')
}

/**
 * What the character sheet can tell the builder about the owner.
 *
 * The talent is matched by title among the owner's `Talent` abilities (rank
 * defaults to 1 when unset), Nature by skill name, the spell by name.
 */
export const ownerFromCharacter = (
	character: Character | null | undefined,
): CompanionOwner | undefined => {
	if (!character) return undefined
	const talent = character.skills?.abilities?.find(
		(ability) =>
			ability.tag === 'Talent' &&
			ability.title?.trim().toLowerCase() === 'animal companion',
	)
	const rank = talent ? Math.min(3, Math.max(1, talent.rank ?? 1)) : 0
	const nature = character.skills?.skills?.find(
		(skill) => skill.name?.trim().toLowerCase() === 'nature',
	)
	const knowsWildCompanion = Boolean(
		character.spells?.spells?.some(
			(spell) => spell.name?.trim().toLowerCase() === 'wild companion',
		),
	)
	return {
		talentRank: rank as CompanionOwner['talentRank'],
		nature: nature ? nature.rank : null,
		knowsWildCompanion,
	}
}

/** The bond an owner implies, before any editing in the builder. */
export const bondFromOwner = (owner: CompanionOwner): CompanionBond => ({
	...NO_BOND,
	talentRank: owner.talentRank,
	nature: owner.nature,
	wildCompanion: owner.knowsWildCompanion && owner.talentRank >= 1,
})

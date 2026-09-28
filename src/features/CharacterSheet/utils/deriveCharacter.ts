import { useMemo } from 'react'
import { Character } from '@site/src/types/Character'
import { ItemLocation } from '@site/src/types/ItemLocation'
import {
	calculateCurrentLoad,
	calculateLocationLoad,
	extractArmorValues,
	extractShieldParryBonus,
	organizeItemsByLocation,
	OrganizedItems,
} from '../CharacterSheetTabs/02_Items/utils/itemUtils'
import { calculateCharacterLevel } from './calculateCharacterLevel'
import {
	calculateDefenseLevelBonus,
	calculateDodgeBase,
	calculateParryBase,
	calculateResistBase,
} from './calculateDefenses'
import { calculateMaxFocus } from './calculateFocus'
import { calculateFolkAvBonus } from './calculateFolkAvBonus'
import { calculateBaseHpFromStrength, calculateMaxHp } from './calculateHp'
import { calculateTalentFocusBonus } from './calculateTalentFocusBonus'
import { calculateTalentHpBonus } from './calculateTalentHpBonus'
import { calculateSkillRank, calculateSpentXp } from './skillUtils'

/**
 * Every number the character sheet COMPUTES rather than stores, from one place.
 *
 * ## Why this exists
 *
 * The digital sheet and the Print Character Sheet used to arrive at the same values
 * by different roads, and the roads disagreed:
 *
 * - **Max HP** read `health.auto`, which only an effect in the Skills tab ever wrote.
 *   A character whose Skills tab had not mounted since gaining a +HP talent (or an
 *   exported character with no `auto` at all) printed the wrong HP.
 * - **Level** came from spent XP in the header and from TOTAL XP inside the HP and
 *   defence formulas. Level is spent XP everywhere (owner ruling).
 * - **Load** summed `weight` alone, so items carrying only `load` weighed nothing.
 * - **Parry, Dodge, Resist, AV, Max Focus and the load limits** printed stored copies
 *   that effects wrote back (or, for the load limits, never wrote at all).
 *
 * So the derivation is a pure function of the document. Both surfaces call it, and
 * a parity test pins the printed numbers to it. The stored copies still exist for
 * readers outside the sheet (exports, the party view); `useSyncDerivedCharacter`
 * mirrors this result into them from one place.
 *
 * ## What is input and what is derived
 *
 * The user-editable inputs are the modifiers: `health.maxHpModifier`, `av.other`,
 * the `other` of each defence, `focusDetails.maxFocusModifier` and
 * `encumbrance.carryModifier`. Everything else below is recomputed from attributes,
 * skill XP, abilities and items, and never read back from storage.
 */
export type DerivedCharacter = {
	/** Sum of every skill's XP. What `skills.xp.spend` stores. */
	spentXp: number
	/** From spent XP (owner ruling). */
	level: number
	/** Rank per skill name, from that skill's XP. */
	skillRanks: Record<string, number>
	hp: {
		base: number
		levelBonus: number
		/** Talent and folk HP bonuses (what `health.auto` stores). */
		auto: number
		modifier: number
		max: number
		fatiguePenalty: number
		/** Max HP minus 2 per Fatigue: the ceiling both sheets show. */
		effectiveMax: number
	}
	av: {
		armor: number
		helmet: number
		shield: number
		/** Folk AV bonuses (what `av.auto` stores). */
		auto: number
		other: number
		total: number
	}
	parry: {
		base: number
		levelBonus: number
		shieldBonus: number
		other: number
		total: number
	}
	dodge: { base: number; levelBonus: number; other: number; total: number }
	resist: { base: number; levelBonus: number; other: number; total: number }
	focus: {
		/** Talent Focus bonuses (what `spells.focus.auto` stores). */
		auto: number
		modifier: number
		max: number
	}
	load: {
		/** Worn plus carried: the load that counts against capacity. */
		current: number
		byLocation: Record<ItemLocation, number>
		/** Encumbered from this load on: STR/2 + 8 + carry modifier. */
		carryCapacity: number
		/** Twice carry capacity, the hard limit. */
		maxCapacity: number
	}
	itemsByLocation: OrganizedItems
}

const num = (value: unknown, fallback = 0): number => {
	const n = Number(value)
	return Number.isFinite(n) ? n : fallback
}

/**
 * A defence whose details were never initialised is a legacy MANUAL total: the
 * number the player typed is the truth, so `other` is whatever the auto parts do
 * not explain. That is the same reading `migrateCharacterDefenses` persists, so a
 * character reads identically before and after their details are created.
 */
const defenceOther = (
	details: { other?: number } | undefined,
	storedTotal: unknown,
	autoParts: number,
): number =>
	details ? num(details.other) : num(storedTotal, autoParts) - autoParts

export const deriveCharacter = (char: Character): DerivedCharacter => {
	const statistics = char.statistics
	const skillsList = char.skills?.skills ?? []
	const abilities = char.skills?.abilities ?? []
	const weapons = char.items?.weapons ?? []
	const items = char.items?.items ?? []

	// Ranks are what the XP buys. A stored `rank` can be stale on a document that
	// has not been through `migrateCharacterData`, which is what the print path
	// used to read.
	const rankedSkills = skillsList.map((skill) => ({
		...skill,
		rank: calculateSkillRank(num(skill.xp)),
	}))
	const skillRanks = Object.fromEntries(
		rankedSkills.map((skill) => [skill.name, skill.rank]),
	)
	const ranked: Character = {
		...char,
		skills: { ...char.skills, skills: rankedSkills },
	}

	const spentXp = calculateSpentXp(skillsList)
	const level = calculateCharacterLevel(spentXp)

	// HP
	const mysticismRank = skillRanks['Mysticism'] ?? 0
	const autoHp = calculateTalentHpBonus(abilities, mysticismRank)
	const hpModifier = num(statistics.health?.maxHpModifier)
	const maxHp = calculateMaxHp(
		statistics.strength.value,
		spentXp,
		hpModifier,
		autoHp,
	)
	const fatiguePenalty = num(statistics.fatigue?.current) * 2

	// Items and AV
	const itemsByLocation = organizeItemsByLocation(weapons, items)
	const { armorAV, helmetAV, shieldAV } = extractArmorValues(itemsByLocation)
	const autoAv = calculateFolkAvBonus(abilities, armorAV > 0)
	const avOther = num(statistics.av?.other)

	// Defences
	const levelBonus = calculateDefenseLevelBonus(spentXp)

	const parryBase = calculateParryBase(ranked)
	const shieldBonus = extractShieldParryBonus(itemsByLocation)
	const parryOther = defenceOther(
		statistics.parryDetails,
		statistics.parry,
		parryBase + levelBonus + shieldBonus,
	)

	const dodgeBase = calculateDodgeBase(ranked)
	const dodgeOther = defenceOther(
		statistics.dodgeDetails,
		statistics.dodge,
		dodgeBase + levelBonus,
	)

	const resistBase = calculateResistBase(ranked)
	const resistOther = defenceOther(
		statistics.resistDetails,
		statistics.resist,
		resistBase + levelBonus,
	)

	// Focus
	const autoFocus = calculateTalentFocusBonus(abilities)
	const focusModifier = num(char.spells?.focusDetails?.maxFocusModifier)
	const maxFocus = char.spells
		? calculateMaxFocus(ranked, focusModifier, autoFocus)
		: 0

	// Load
	const carryCapacity =
		num(statistics.strength.value) / 2 +
		8 +
		num(char.items?.encumbrance?.carryModifier)

	return {
		spentXp,
		level,
		skillRanks,
		hp: {
			base: calculateBaseHpFromStrength(statistics.strength.value),
			levelBonus: (level - 1) * 2,
			auto: autoHp,
			modifier: hpModifier,
			max: maxHp,
			fatiguePenalty,
			effectiveMax: maxHp - fatiguePenalty,
		},
		av: {
			armor: armorAV,
			helmet: helmetAV,
			shield: shieldAV,
			auto: autoAv,
			other: avOther,
			total: armorAV + helmetAV + shieldAV + autoAv + avOther,
		},
		parry: {
			base: parryBase,
			levelBonus,
			shieldBonus,
			other: parryOther,
			total: parryBase + levelBonus + shieldBonus + parryOther,
		},
		dodge: {
			base: dodgeBase,
			levelBonus,
			other: dodgeOther,
			total: dodgeBase + levelBonus + dodgeOther,
		},
		resist: {
			base: resistBase,
			levelBonus,
			other: resistOther,
			total: resistBase + levelBonus + resistOther,
		},
		focus: { auto: autoFocus, modifier: focusModifier, max: maxFocus },
		load: {
			current: calculateCurrentLoad(itemsByLocation),
			byLocation: {
				worn: calculateLocationLoad(itemsByLocation.worn),
				carried: calculateLocationLoad(itemsByLocation.carried),
				mount: calculateLocationLoad(itemsByLocation.mount),
				storage: calculateLocationLoad(itemsByLocation.storage),
			},
			carryCapacity,
			maxCapacity: carryCapacity * 2,
		},
		itemsByLocation,
	}
}

/*
 * Redux replaces the document on every edit and never mutates it, so the object
 * itself is a safe cache key: every card that asks about the same document shares
 * one derivation instead of each running its own.
 */
const cache = new WeakMap<object, DerivedCharacter>()

/** `deriveCharacter`, cached per document object. For immutable (store) documents only. */
export const deriveCharacterCached = (char: Character): DerivedCharacter => {
	let derived = cache.get(char)
	if (!derived) {
		derived = deriveCharacter(char)
		cache.set(char, derived)
	}
	return derived
}

/** `deriveCharacter`, memoised on the document. */
export const useDerivedCharacter = (char: Character): DerivedCharacter =>
	useMemo(() => deriveCharacterCached(char), [char])

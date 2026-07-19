import { Spell, targetTypeArray, rangeTypeArray } from '../../../types/Character'
import { sanitizeHtml } from '../../../utils/typescript/htmlSanitizer'
import { parseDamageFromEffect } from '../../../utils/typescript/spellDamageParser'
import arcaneSpellsData from '../../../utils/data/json/arcane-spells.json'
import mysticSpellsData from '../../../utils/data/json/mystic-spells.json'

export type MagicType = 'Arcana' | 'Mysticism'

export type SpellData = {
	name: string
	discipline?: string // arcane spells
	tradition?: string // mystic spells
	rank: string
	focus: string
	target: string
	range: string
	properties: string
	effect: string
	heightened?: string
}

// "Medium (8)" → "8", "vs. Dodge" → "Dodge", "Special" → "special"
export const mapTargetType = (val: string): Spell['target'] => {
	if (!val) return ''
	let v = val.trim()
	const parenMatch = v.match(/\((\d+)\)/)
	if (parenMatch) {
		v = parenMatch[1]
	}
	const vsMatch = v.match(/vs\.?\s*(Parry|Dodge|Resist)/i)
	if (vsMatch) {
		v = vsMatch[1].charAt(0).toUpperCase() + vsMatch[1].slice(1).toLowerCase()
	}
	if (/^special$/i.test(v)) {
		v = 'special'
	}
	return targetTypeArray.includes(v as any) ? (v as any) : ''
}

export const mapRangeType = (val: string): Spell['range'] => {
	if (!val) return ''
	const lower = val.trim().toLowerCase()
	return rangeTypeArray.includes(lower as any) ? (lower as any) : ''
}

const detectsDamage = (effect: string): boolean =>
	/deal(s)?\s*\+?\d+\s*(\w+)?\s*damage|take(s)?\s*\+?\d+\s*(\w+)?\s*damage|inflict(s)?\s*damage/i.test(
		effect,
	)

/**
 * Builds the canonical Spell fields (minus id) from a raw JSON spell entry.
 * Single source of truth shared by the spell search dialog import and the
 * "refresh spells" update flow, so both produce identical damage parsing,
 * target/range mapping, and effect sanitization.
 */
export const buildSpellFromData = (
	spell: SpellData,
	magicType: MagicType,
): Omit<Spell, 'id'> => {
	const parsedDamage = parseDamageFromEffect(spell.effect, magicType)
	return {
		name: spell.name,
		rank: parseInt(spell.rank) || 0,
		cost: parseInt(spell.focus) || 0,
		target: mapTargetType(spell.target),
		range: mapRangeType(spell.range),
		properties: spell.properties,
		dealsDamage: detectsDamage(spell.effect),
		damage: {
			base: parsedDamage.base,
			weapon: parsedDamage.weapon,
			other: parsedDamage.other,
			otherWeak: parsedDamage.otherWeak,
			otherStrong: parsedDamage.otherStrong,
			otherCritical: parsedDamage.otherCritical,
			type: parsedDamage.type,
			staticDamage: parsedDamage.staticDamage,
		},
		effect: sanitizeHtml(spell.effect),
	}
}

/**
 * Locates a spell by name in the JSON source. Searches both arcane and mystic
 * data and returns which magicType it came from (needed for damage base).
 * When a name exists in both, prefers the character's own magicSkill.
 */
export const findSpellSource = (
	name: string,
	preferredMagicType: MagicType | null,
): { data: SpellData; magicType: MagicType } | null => {
	const key = name.trim().toLowerCase()
	const arcane = (arcaneSpellsData as SpellData[]).find(
		(s) => s.name.trim().toLowerCase() === key,
	)
	const mystic = (mysticSpellsData as SpellData[]).find(
		(s) => s.name.trim().toLowerCase() === key,
	)

	if (arcane && mystic) {
		return preferredMagicType === 'Mysticism'
			? { data: mystic, magicType: 'Mysticism' }
			: { data: arcane, magicType: 'Arcana' }
	}
	if (arcane) return { data: arcane, magicType: 'Arcana' }
	if (mystic) return { data: mystic, magicType: 'Mysticism' }
	return null
}

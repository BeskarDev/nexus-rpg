import { Damage, DamageType, damageTypeArray } from '../../types/Character'

/**
 * What a spell deals, stated by the designer rather than guessed from prose
 * (M19, owner-reported).
 *
 * ## Why this field exists
 *
 * `dealsDamage` and the whole `damage` object used to be inferred by regex from
 * the effect text at import time. Prose cannot carry that distinction: "Deals +2
 * fire damage" under **Weak.** and "You deal +2 damage with Strength-based
 * attacks" in a transformation's bullet list are the same words, and the reader
 * that tells them apart is a person, not a pattern. The measured result over the
 * 486-spell corpus was 74 flagged spells with no damage clause at all (*Law of
 * the Strongest*, *Infuse Item*, the whole *Flaming/Radiant/Lunar Weapon* buff
 * family) and 67 unflagged spells that mention damage, some of which deal it
 * (*Knife Behind the Mask* writes "add the following damage: **Weak.** +3
 * damage", which the pattern needs a verb to see).
 *
 * So the JSON says it outright. **No block means the spell deals no direct
 * damage** — a buff that grants a damage bonus simply has none, and there is
 * nothing left to misread.
 *
 * ## The two shapes
 *
 * - **Scaling** (`weak`/`strong`/`critical`): the ordinary attack spell, whose
 *   damage is read off the success level of the casting roll.
 * - **Flat** (`flat`): damage that does not read the success level at all — a
 *   ward that lashes back, a zone that burns whatever stands in it.
 *
 * `attribute` is whether the caster's magic attribute adds its half — 1/2 Mind
 * for arcane, 1/2 Spirit for mystic, as `docs/05-combat/02-attacking.md` § Damage
 * states it. The corpus writes that distinction into the prose: `+N damage` adds
 * on top of the base, a bare `N damage` IS the whole number. So the flag defaults
 * true for scaling damage and false for flat, and a block only states it when the
 * spell departs from its shape's usual reading.
 */
export type SpellDamage = {
	type: DamageType
	/** Damage by success level. Mutually exclusive with `flat`. */
	weak?: number
	strong?: number
	critical?: number
	/** Damage that ignores success level. Mutually exclusive with the triple. */
	flat?: number
	/** Whether half the caster's magic attribute adds. See above for defaults. */
	attribute?: boolean
}

export const isScalingDamage = (
	d: SpellDamage,
): d is SpellDamage & { weak: number; strong: number; critical: number } =>
	d.flat === undefined

/** Whether the attribute half applies, resolving each shape's default. */
export const usesAttribute = (d: SpellDamage): boolean =>
	d.attribute ?? isScalingDamage(d)

const fail = (context: string, reason: string): never => {
	throw new Error(`[spell-damage] ${context}: ${reason}`)
}

/**
 * Shape-check an authored damage block, loudly. Called by the content generator
 * for every spell, so malformed data stops the build instead of reaching a
 * character sheet as a wrong number at the table.
 */
export function validateSpellDamage(raw: unknown, context: string): SpellDamage {
	if (typeof raw !== 'object' || raw === null)
		fail(context, 'damage must be an object')
	const d = raw as Record<string, unknown>

	if (typeof d.type !== 'string' || !damageTypeArray.includes(d.type as any))
		fail(
			context,
			`damage.type must be one of ${damageTypeArray.join(', ')}, got ${JSON.stringify(d.type)}`,
		)

	const hasFlat = d.flat !== undefined
	const levels = ['weak', 'strong', 'critical'] as const
	const statedLevels = levels.filter((l) => d[l] !== undefined)

	if (hasFlat && statedLevels.length)
		fail(context, 'damage states both `flat` and success levels; pick one shape')
	if (!hasFlat && statedLevels.length !== 3)
		fail(
			context,
			`damage needs all of weak/strong/critical, or a single flat value (has ${statedLevels.join(', ') || 'none'})`,
		)

	for (const key of hasFlat ? (['flat'] as const) : levels) {
		const value = d[key]
		if (typeof value !== 'number' || !Number.isInteger(value) || value < 0)
			fail(
				context,
				`damage.${key} must be a non-negative whole number, got ${JSON.stringify(value)}`,
			)
	}

	if (d.attribute !== undefined && typeof d.attribute !== 'boolean')
		fail(context, 'damage.attribute must be a boolean')

	for (const key of Object.keys(d)) {
		if (!['type', 'weak', 'strong', 'critical', 'flat', 'attribute'].includes(key))
			fail(context, `damage has unknown field "${key}"`)
	}

	return raw as SpellDamage
}

/**
 * Turn an authored block into the sheet's `Damage` object.
 *
 * The sheet computes `base + weapon×level + catalyst×level + other + otherLevel`
 * (`calculateDamageDisplay`), so a spell whose numbers run X/2X/3X maps onto
 * `weapon`, where the spell catalyst scales with it the way the rules intend.
 * Anything else is carried per level, and flat damage sets `staticDamage`, which
 * collapses the reading to one number.
 */
export function spellDamageToSheetDamage(
	damage: SpellDamage,
	magicType: 'Arcana' | 'Mysticism',
): Damage {
	const base = usesAttribute(damage)
		? magicType === 'Mysticism'
			? 'SPI'
			: 'MND'
		: ''

	const empty = {
		base,
		weapon: 0,
		other: 0,
		otherWeak: 0,
		otherStrong: 0,
		otherCritical: 0,
		type: damage.type,
		staticDamage: false,
	} as Damage

	if (!isScalingDamage(damage)) {
		return { ...empty, other: damage.flat ?? 0, staticDamage: true }
	}

	const { weak, strong, critical } = damage
	if (weak > 0 && strong === weak * 2 && critical === weak * 3) {
		return { ...empty, weapon: weak }
	}

	return {
		...empty,
		otherWeak: weak,
		otherStrong: strong,
		otherCritical: critical,
	}
}

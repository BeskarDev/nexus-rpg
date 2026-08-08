import conditionsData from '@site/src/utils/data/json/conditions.json'
import { StatusEffect } from '@site/src/types/Character'

/**
 * The duration ladder, from `docs/06-scenes/02-effect-durations.md`.
 *
 * Duration in this game is an **ordered ladder**, not a set of unrelated
 * choices: "some effects extend a duration by one step… briefly, then short,
 * then medium, then long, then very long". That is why the sheet shows it as a
 * row of rungs rather than a dropdown — the ordering is a real part of the rule,
 * and a `<Select>` hides it.
 *
 * The rules ladder has a fifth rung, **very long** (one downtime turn), which
 * `StatusEffect.narrativeDuration` cannot store. Conditions lasting a whole
 * downtime turn are not a combat concern, so the gap is left rather than
 * migrating every stored character for a rung nothing sets today.
 */
export const DURATION_RUNGS = ['briefly', 'short', 'medium', 'long'] as const

export type DurationRung = (typeof DURATION_RUNGS)[number]

/**
 * Rung labels. Abbreviated because four of them plus a name and an intensity
 * stepper share one row on a phone, and "Medium" is the only one that has to
 * give ground.
 */
export const DURATION_LABEL: Record<DurationRung, string> = {
	briefly: 'Brief',
	short: 'Short',
	medium: 'Med',
	long: 'Long',
}

/** Full names, for accessible labels and tooltips — the row shows abbreviations. */
export const DURATION_FULL: Record<DurationRung, string> = {
	briefly: 'Briefly',
	short: 'Short',
	medium: 'Medium',
	long: 'Long',
}

/** What each rung means in play, straight from the durations chapter. */
export const DURATION_GLOSS: Record<DurationRung, string> = {
	briefly: 'Until the end of your next encounter turn.',
	short: 'Until a short break, or one delving turn.',
	medium: 'One hour, or one exploration turn.',
	long: "Until the end of a night's rest, or one travel turn.",
}

/**
 * Which rung a stored condition is on, or `undefined` for one with no duration
 * set.
 *
 * Two fields encode one value, which is the awkward part of this shape:
 * `briefly` is `duration: 1` while the other three are `narrativeDuration`.
 * A legacy `duration` of anything other than 1 was a turn count that the UI
 * stopped being able to produce; it reads as unset rather than being silently
 * rounded to a rung, so nothing is claimed about a value the player did not pick.
 */
export function readRung(effect: StatusEffect): DurationRung | undefined {
	if (effect.duration === 1) return 'briefly'
	if (effect.narrativeDuration) return effect.narrativeDuration
	return undefined
}

/**
 * The field changes that put a condition on a rung, or clear it.
 *
 * Kept here rather than at the call site because the two-field encoding above
 * needs both a write and a delete to stay consistent — leaving `narrativeDuration`
 * behind while setting `duration: 1` produces a condition that is on two rungs at
 * once, which is exactly what the old edit form risked every time it grew a branch.
 */
export function rungFields(rung: DurationRung | undefined): {
	update: Partial<StatusEffect>
	clearFields: string[]
} {
	if (rung === undefined)
		return { update: {}, clearFields: ['duration', 'narrativeDuration'] }
	if (rung === 'briefly')
		return { update: { duration: 1 }, clearFields: ['narrativeDuration'] }
	return { update: { narrativeDuration: rung }, clearFields: ['duration'] }
}

/**
 * The conditions that take an intensity — the ones written "bleeding (X)" in the
 * rules, where X is a number the effect needs.
 *
 * Derived from `conditions.json` rather than listed here, so a new (X) condition
 * gets its stepper by being written down once. The old hardcoded list had
 * drifted into checking both `name.includes('(X)')` and a literal array of three.
 */
export const INTENSITY_CONDITIONS: ReadonlySet<string> = new Set(
	conditionsData
		.filter((condition) => /\(x\)/i.test(condition.name))
		.map((condition) => condition.name.replace(/\s*\(x\)/gi, '').toLowerCase()),
)

/**
 * The one-tap intensities.
 *
 * Measured, not guessed: across every "bleeding (N)" / "burning (N)" /
 * "marked (N)" in `docs/` and the content JSON, **2, 4 and 6 account for 159 of
 * 173 uses (92%)**. The remaining 8% are 8, 10 and 12 on high-tier spells and
 * combat arts — which is why a free field stays alongside these rather than the
 * stones being the only way in. Every value in the content is even; that is a
 * strong pattern rather than a rule, so nothing enforces it.
 */
export const INTENSITY_STEPS = [2, 4, 6] as const

/**
 * What an (X) condition gets when afflicted without a stated intensity — the
 * lowest standard value, which is also the most common alongside 4.
 */
export const DEFAULT_INTENSITY = 2

/** Intensity floor. The rules have no intensity-zero condition. */
export const MIN_INTENSITY = 1

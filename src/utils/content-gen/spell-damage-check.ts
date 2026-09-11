/**
 * The truthfulness gate for authored spell damage (M19, owner-reported).
 *
 * The JSON states what a spell deals; the effect text says it in prose. Those
 * two can drift, and a drifted number is a wrong number at the table. This
 * compares them at generation time, so `content:check` fails on a mismatch the
 * way it already fails on a stale page.
 *
 * What it can and cannot assert:
 *
 * - Damage numbers inside a **Weak./Strong./Critical.** run are unambiguous —
 *   that IS the spell's own damage, so a block is required and must match.
 * - Damage mentioned only in prose is ambiguous by nature: the zone that burns,
 *   the ward that lashes back, and the transformation that grants a bonus to
 *   Strength attacks all read alike. Prose therefore never forces a block. It
 *   only has to CONTAIN a flat block's number, which catches the drift case
 *   without demanding the parser understand the sentence.
 */
import { DamageType } from '../../types/Character'
import {
	isScalingDamage,
	SpellDamage,
	usesAttribute,
} from '../typescript/spellDamage'
import { parseSpellEffect, SuccessLevelName } from './spell-effect-parser'

/** Type words the corpus uses, including the ones that are not `DamageType`. */
const TYPE_WORD =
	'(?:acid|blast|cold|electric|fire|force|frost|ice|lightning|necrotic|physical|poison|psychic|radiant|shock|weapon)'

/*
 * `+4 damage`, `+4 fire damage`, and `+2 blast (ignore 1/2 AV) damage` — the
 * corpus writes the AV parenthetical on either side of the noun, so the pattern
 * steps over one parenthetical rather than losing the number to it.
 */
const DAMAGE_NUMBER = new RegExp(
	`([+-]?\\d+)\\s*(?:${TYPE_WORD}\\s*)?(?:\\([^)]*\\)\\s*)?damage`,
	'gi',
)

/** Every damage number stated in one run of text, in order. */
export const damageNumbersIn = (text: string): number[] =>
	[...text.matchAll(DAMAGE_NUMBER)].map((m) => Math.abs(parseInt(m[1], 10)))

/**
 * A triple written inline — "+2/4/6 force damage", "+2/+4/+6 damage" — which is
 * how a spell states success-level scaling when the scaling does not belong to
 * the casting roll itself (a glyph that goes off later, plants that attack on
 * your command).
 */
const PROSE_TRIPLE = new RegExp(
	`\\+?(\\d+)\\s*/\\s*\\+?(\\d+)\\s*/\\s*\\+?(\\d+)\\s*(?:${TYPE_WORD}\\s*)?(?:\\([^)]*\\)\\s*)?damage`,
	'gi',
)

/**
 * "deals 2 weapon damage" — the rules' own shorthand for damage that scales
 * 1/2/3 with the success level, the same thing the sheet's `weapon` field does.
 */
const WEAPON_SCALE = /(\d+)\s*weapon\s*damage/gi

/** Every scaling triple the prose states, however it writes it. */
export const proseTriplesIn = (text: string): number[][] => [
	...[...text.matchAll(PROSE_TRIPLE)].map((m) => [
		parseInt(m[1], 10),
		parseInt(m[2], 10),
		parseInt(m[3], 10),
	]),
	...[...text.matchAll(WEAPON_SCALE)].map((m) => {
		const n = parseInt(m[1], 10)
		return [n, n * 2, n * 3]
	}),
]

/** The damage type word nearest a damage number, if the text names one. */
export const damageTypeIn = (text: string): string | null => {
	const m = text.match(new RegExp(`(${TYPE_WORD})\\s+damage`, 'i'))
	return m ? m[1].toLowerCase() : null
}

export interface EffectDamageClaims {
	/**
	 * How many Weak/Strong/Critical runs the effect has. More than one means the
	 * spell offers modes (Force Surge's Constrict / Slam / Burst), and no single
	 * number is "the" damage — those need a person.
	 */
	successRuns: number
	/** Damage numbers stated under each success level, in reading order. */
	levels: Record<SuccessLevelName, number[]>
	/** Damage numbers stated in prose, outside any success level run. */
	prose: number[]
	/** Scaling triples stated in prose, as `+2/4/6` or as `2 weapon damage`. */
	proseTriples: number[][]
	/** Whether the effect says the word "damage" anywhere. */
	mentionsDamage: boolean
	/** The damage type word the success runs name, if any. */
	type: string | null
}

/**
 * Read the damage claims out of an effect string, using the same node split the
 * MDX generator renders from — so what the gate reads is what the book prints.
 */
export function damageClaimsFromEffect(
	effect: string,
	context: string,
): EffectDamageClaims {
	const { nodes } = parseSpellEffect(effect, context)
	const levels: Record<SuccessLevelName, number[]> = {
		weak: [],
		strong: [],
		critical: [],
	}
	const prose: number[] = []
	const proseTriples: number[][] = []
	let type: string | null = null

	for (const node of nodes) {
		if (node.kind === 'success') {
			levels[node.level].push(...damageNumbersIn(node.text))
			type = type ?? damageTypeIn(node.text)
		} else {
			prose.push(...damageNumbersIn(node.text))
			proseTriples.push(...proseTriplesIn(node.text))
		}
	}

	return {
		successRuns: nodes.filter((n) => n.kind === 'success' && n.level === 'weak')
			.length,
		levels,
		prose,
		proseTriples,
		mentionsDamage: /damage/i.test(effect),
		type,
	}
}

export interface DamageCheckInput {
	name: string
	effect: string
	damage?: unknown
	magicType: 'Arcana' | 'Mysticism'
}

/**
 * Compare an authored block against its effect text. Returns one line per
 * problem; an empty array means the two agree.
 */
export function checkSpellDamage(
	spell: DamageCheckInput,
	context: string,
): string[] {
	const claims = damageClaimsFromEffect(spell.effect, context)
	const block = spell.damage as SpellDamage | undefined
	const problems: string[] = []

	const levelClaims = (['weak', 'strong', 'critical'] as const).filter(
		(l) => claims.levels[l].length > 0,
	)

	if (!block) {
		/*
		 * A spell with several success-level runs offers modes, and the sheet
		 * carries one damage line. Demanding a block would force a choice between
		 * Force Surge's Constrict, Slam and Burst, and any of the three is a wrong
		 * number two thirds of the time. The designer states one deliberately or
		 * states none.
		 */
		if (levelClaims.length > 0 && claims.successRuns === 1) {
			problems.push(
				`states damage under ${levelClaims.join('/')} but has no "damage" block. ` +
					`Add one, or rewrite the clause if the number is a bonus to something else.`,
			)
		}
		return problems
	}

	if (!claims.mentionsDamage) {
		problems.push(
			'has a "damage" block but the effect text never mentions damage.',
		)
		return problems
	}

	if (isScalingDamage(block)) {
		const triple = [block.weak, block.strong, block.critical]
		const matchesProse = claims.proseTriples.some(
			(t) => t.length === 3 && t.every((n, i) => n === triple[i]),
		)
		if (levelClaims.length === 0 && !matchesProse) {
			problems.push(
				'has a scaling "damage" block that matches neither a success-level clause ' +
					'nor a scaling triple in the prose. Use a flat block if the damage does ' +
					'not read the success level.',
			)
		}
		for (const level of ['weak', 'strong', 'critical'] as const) {
			const stated = claims.levels[level]
			if (stated.length === 0) continue
			if (!stated.includes(block[level] as number)) {
				problems.push(
					`damage.${level} is ${block[level]}, but the ${level} clause states ${stated.join('/')}.`,
				)
			}
		}
	} else {
		const everywhere = [
			...claims.prose,
			...claims.levels.weak,
			...claims.levels.strong,
			...claims.levels.critical,
		]
		if (!everywhere.includes(block.flat as number)) {
			problems.push(
				`damage.flat is ${block.flat}, which appears nowhere in the effect text (${everywhere.join('/') || 'no numbers'}).`,
			)
		}
	}

	if (claims.type) {
		const normalized = normalizeTypeWord(claims.type)
		if (normalized !== block.type) {
			problems.push(
				`damage.type is "${block.type}", but the effect says "${claims.type}".`,
			)
		}
	}

	// Stated only to be readable in the review table; the sheet resolves it.
	void usesAttribute(block)

	return problems
}

/** The corpus's type words, mapped onto the eleven the rules publish. */
export const normalizeTypeWord = (word: string): DamageType => {
	const map: Record<string, DamageType> = {
		cold: 'frost',
		ice: 'frost',
		electric: 'lightning',
		shock: 'lightning',
		// "deals 2 weapon damage" states a scale, not an element (the Telekinesis
		// spells hurl an object); the element it lands as is plain physical.
		weapon: 'physical',
	}
	return (map[word] ?? word) as DamageType
}

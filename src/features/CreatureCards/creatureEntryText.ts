import type { Ability, Attack } from '@site/src/types/Creature'

/**
 * The ONE normalisation of an entry's text, shared by both sources (M21, owner
 * review 2026-08-07).
 *
 * The card's two sources disagreed about what `Attack.damage` even held. The
 * JSON adapter put a bare triple in it; `parseCreatureMarkdown` put the whole
 * first sentence — `"12/17/22 damage."` — so the Floating Eye companion's bite
 * reached `DamageLadder` as three cells reading `12`, `17`, `22 damage.` and
 * printed as garbage. A component cannot defend itself against two contracts, so
 * there is one contract now and both sources produce it here.
 *
 * The rules, in one place:
 *
 * - `damage` is a bare triple or empty. Never prose.
 * - `damageType` is the one qualifying word before "damage", when the text opens
 *   with a clean typed triple. The literal word "damage" is dropped, exactly as
 *   the docs generator drops it, because the ladder's own W/S/C ticks say it.
 * - `description` is whatever is left, with any FURTHER triples still in place —
 *   the card ladders those inline (see `withInlineLadders`), which is how
 *   "6/9/12 poison damage, or 5/7/9 if this swarm has already lost half its max
 *   HP" gets both of its numbers set rather than neither.
 */

/**
 * A leading triple and at most one qualifying word before "damage".
 *
 * Deliberately strict about the HEAD, and the docs generator uses the identical
 * pattern: anything more involved keeps its prose, because a ladder that ate
 * half a clause would be worse than no ladder. What is new is that the rest of
 * the clause is no longer thrown away.
 */
const LEADING_TRIPLE = /^(\d+\/\d+\/\d+)\s+((?:\w+\s+)?damage)\.?\s*/

/** Any damage triple, anywhere. Used for the ones the head pattern leaves behind. */
export const ANY_TRIPLE = /(\d+\/\d+\/\d+)/g

const dropDamageWord = (text: string): string =>
	text
		.replace(/\bdamage\b/g, '')
		.replace(/\s{2,}/g, ' ')
		.trim()

export interface SplitDamage {
	damage: string
	damageType?: string
	description?: string
}

/** Split an entry's text into its leading ladder and the prose after it. */
export function splitDamageText(text: string): SplitDamage {
	const trimmed = text.trim()
	const match = trimmed.match(LEADING_TRIPLE)
	if (!match)
		return trimmed ? { damage: '', description: trimmed } : { damage: '' }
	const type = dropDamageWord(match[2])
	const rest = trimmed.slice(match[0].length).trim()
	return {
		damage: match[1],
		...(type ? { damageType: type } : {}),
		...(rest ? { description: rest } : {}),
	}
}

/**
 * An entry's head: its name, and the parenthetical that follows or ends it.
 *
 * Four shapes appear across the two sources, and the old markdown parser
 * silently dropped two of them:
 *
 * | Written | Where |
 * |---|---|
 * | `**Bite** (*crush*). 12/17/22 damage` | companion attacks |
 * | `**Eye Rays.** Roll once per ray:` | companion attacks — **dropped**, the period sits inside the bold and the old pattern demanded one after it |
 * | `**Keen Scent (Passive).** …` | published abilities |
 * | `**Name** (Recharge d6). …` | published abilities |
 *
 * The Floating Eye's whole Eye Rays attack vanished from its card because of the
 * second row, with no warning — the same class of silent drop F7 was about.
 */
const ENTRY_HEAD = /^-\s*\*\*(.+?)\*\*\s*(?:\(([^)]*)\))?\.?\s*(.*)$/

export interface ParsedEntryHead {
	name: string
	/** The parenthetical, wherever it was written. Properties or a qualifier. */
	parenthetical: string
	text: string
}

export function parseEntryHead(line: string): ParsedEntryHead | null {
	const match = line.trim().match(ENTRY_HEAD)
	if (!match) return null
	let name = match[1].trim()
	let parenthetical = (match[2] ?? '').trim()

	// `**Keen Scent (Passive).**` — the parenthetical is inside the bold.
	const inside = name.match(/^(.*?)\s*\(([^)]*)\)\s*\.?$/)
	if (inside) {
		name = inside[1].trim()
		parenthetical = parenthetical || inside[2].trim()
	}
	// `**Eye Rays.**` — a trailing period belongs to the sentence, not the name.
	name = name.replace(/\.$/, '').trim()

	return {
		name,
		parenthetical: parenthetical.replace(/\*/g, '').trim(),
		text: match[3].trim(),
	}
}

const splitList = (value: string): string[] =>
	value
		.split(',')
		.map((item) => item.trim())
		.filter(Boolean)

/** Build an attack from a parsed head and its sub-lines. */
export function toAttack(head: ParsedEntryHead, details: string[]): Attack {
	return {
		name: head.name,
		properties: head.parenthetical ? splitList(head.parenthetical) : [],
		...splitDamageText(head.text),
		...(details.length > 0 ? { details } : {}),
	}
}

/** Build an ability from a parsed head and its sub-lines. */
export function toAbility(head: ParsedEntryHead, details: string[]): Ability {
	// A sub-list under an ability is a spell list far more often than a menu of
	// outcomes, and it reads as a run — so it joins the description rather than
	// becoming its own blocks the way an attack's numbered options do.
	const description = [head.text, ...details].filter(Boolean).join(' ')
	return {
		name: head.name,
		description,
		...(head.parenthetical ? { qualifier: head.parenthetical } : {}),
	}
}

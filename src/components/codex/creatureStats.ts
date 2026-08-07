/**
 * The two stat splits a creature's vitals need, shared by the SCREEN stat block
 * and the PRINTED card (M21 D3).
 *
 * They lived inside `CreatureStatBlock.tsx` and the card had neither, printing
 * `2×50` and `0 (natural light)` as literals. Lifted rather than copied: three
 * spell cards drifting apart is the lesson M18 wrote down, and these are exactly
 * the functions that would have drifted next.
 */

/** Short forms for the armor parenthetical, so the tag fits beside a numeral. */
export const ARMOR_ABBR: Record<string, string> = {
	light: 'L',
	heavy: 'H',
	// Two letters, never five (owner, 2026-08-07). `NAT L` beside a numeral was
	// wider than the AV figure it qualified and made the tag a different size on
	// every creature; `NL` reads the same way and holds one width.
	'natural light': 'NL',
	'natural heavy': 'NH',
}

/** `"0 (natural light)"` → `{ value: "0", note: "natural light" }`. */
export function armorAbbr(note: string): string {
	return ARMOR_ABBR[note.toLowerCase()] ?? note
}

/**
 * Split `"0 (natural light)"` into its number and its parenthetical.
 *
 * AV is the one stat whose value is not a bare number — it runs to 35 characters
 * against 2 for a defense. Left inline it forced the whole band to size for its
 * longest member. Split, the numeral joins the other figures and the qualifier
 * drops to a short tag.
 */
export function splitAv(av: string): { value: string; note?: string } {
	const match = av.trim().match(/^(\S+)\s*\((.+)\)$/)
	return match ? { value: match[1], note: match[2] } : { value: av.trim() }
}

/**
 * Split a life-pool HP value (`"3x100"`) into pool count and pool size.
 *
 * Elite and Lord creatures fight through several pools in sequence, so the count
 * is a structural fact about the fight, not a multiplier to be read as one
 * number. Rendered as pips beside the pool size.
 */
export function splitHp(hp: string): { value: string; pools: number } {
	const match = hp.trim().match(/^(\d+)\s*[x×]\s*(\d+)$/i)
	return match
		? { value: match[2], pools: Number(match[1]) }
		: { value: hp.trim(), pools: 1 }
}
